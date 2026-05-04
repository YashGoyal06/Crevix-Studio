import hashlib
import hmac
import json
import uuid
import os

import razorpay
from django.conf import settings
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.db.models import Sum
from supabase import create_client, Client
from .models import PaymentOrder, PaymentWebhookEvent


def _get_razorpay_client() -> razorpay.Client:
    key_id = settings.RAZORPAY_KEY_ID
    key_secret = settings.RAZORPAY_KEY_SECRET
    if not key_id or not key_secret:
        raise ValueError("Razorpay keys are missing in environment variables.")
    return razorpay.Client(auth=(key_id, key_secret))


def _json_body(request: HttpRequest) -> dict:
    if not request.body:
        return {}
    return json.loads(request.body.decode("utf-8"))


def _get_supabase_client() -> Client:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_ANON_KEY")
    if not url or not key:
        raise ValueError("Supabase credentials missing.")
    return create_client(url, key)


def _sync_to_supabase(payment_order: PaymentOrder):
    try:
        supabase = _get_supabase_client()
        data = {
            "razorpay_order_id": payment_order.razorpay_order_id,
            "razorpay_payment_id": payment_order.razorpay_payment_id,
            "amount": float(payment_order.amount_paise) / 100,
            "status": payment_order.status,
            "email": payment_order.notes.get("email", "N/A"),
            "currency": payment_order.currency,
        }
        
        # Upsert based on razorpay_order_id
        supabase.table("payment_orders").upsert(
            data, on_conflict="razorpay_order_id"
        ).execute()
    except Exception as exc:
        print(f"Failed to sync to Supabase: {exc}")


@csrf_exempt
def create_order(request: HttpRequest) -> JsonResponse:
    if request.method != "POST":
        return JsonResponse({"error": "Only POST is allowed."}, status=405)

    try:
        payload = _json_body(request)
        amount_paise = int(payload.get("amount_paise", 0))
        currency = payload.get("currency", "INR")
        notes = payload.get("notes", {})

        if amount_paise < 100:
            return JsonResponse({"error": "amount must be at least 100 paise."}, status=400)

        receipt = payload.get("receipt") or f"order_{uuid.uuid4().hex[:14]}"
        client = _get_razorpay_client()
        razorpay_order = client.order.create(
            {
                "amount": amount_paise,
                "currency": currency,
                "receipt": receipt,
                "notes": notes if isinstance(notes, dict) else {},
            }
        )

        payment_order = PaymentOrder.objects.create(
            receipt=receipt,
            amount_paise=amount_paise,
            currency=currency,
            razorpay_order_id=razorpay_order["id"],
            notes=notes if isinstance(notes, dict) else {},
        )

        _sync_to_supabase(payment_order)

        return JsonResponse(
            {
                "success": True,
                "key_id": settings.RAZORPAY_KEY_ID,
                "local_order_id": str(payment_order.id),
                "receipt": payment_order.receipt,
                "razorpay_order_id": payment_order.razorpay_order_id,
                "amount_paise": payment_order.amount_paise,
                "currency": payment_order.currency,
            },
            status=201,
        )
    except razorpay.errors.BadRequestError as exc:
        message = str(exc)
        if "authentication" in message.lower() or "key" in message.lower():
            return JsonResponse({"error": "Razorpay authentication failed."}, status=401)
        return JsonResponse({"error": f"Razorpay order creation failed: {message}"}, status=500)
    except ValueError as exc:
        return JsonResponse({"error": str(exc)}, status=500)
    except Exception as exc:  # noqa: BLE001
        return JsonResponse({"error": f"Failed to create order: {exc}"}, status=500)


@csrf_exempt
def verify_payment(request: HttpRequest) -> JsonResponse:
    if request.method != "POST":
        return JsonResponse({"error": "Only POST is allowed."}, status=405)

    try:
        payload = _json_body(request)
        razorpay_order_id = payload["razorpay_order_id"]
        razorpay_payment_id = payload["razorpay_payment_id"]
        razorpay_signature = payload["razorpay_signature"]

        key_secret = settings.RAZORPAY_KEY_SECRET
        if not key_secret:
            return JsonResponse({"error": "Razorpay secret is missing on server."}, status=500)

        message = f"{razorpay_order_id}|{razorpay_payment_id}".encode("utf-8")
        expected_signature = hmac.new(
            key_secret.encode("utf-8"),
            message,
            hashlib.sha256,
        ).hexdigest()

        if not hmac.compare_digest(expected_signature, razorpay_signature):
            return JsonResponse({"error": "Invalid signature."}, status=400)

        payment_order = PaymentOrder.objects.get(razorpay_order_id=razorpay_order_id)
        payment_order.razorpay_payment_id = razorpay_payment_id
        payment_order.razorpay_signature = razorpay_signature
        payment_order.status = PaymentOrder.Status.CAPTURED
        payment_order.save(update_fields=["razorpay_payment_id", "razorpay_signature", "status", "updated_at"])
        
        _sync_to_supabase(payment_order)

        return JsonResponse({"success": True, "message": "Payment verified and marked as paid."})
    except KeyError:
        return JsonResponse({"error": "razorpay_order_id, razorpay_payment_id and razorpay_signature are required."}, status=400)
    except PaymentOrder.DoesNotExist:
        return JsonResponse({"error": "Matching local order not found."}, status=404)
    except ValueError as exc:
        return JsonResponse({"error": str(exc)}, status=500)
    except Exception as exc:  # noqa: BLE001
        return JsonResponse({"error": f"Payment verification failed: {exc}"}, status=500)


@csrf_exempt
def webhook(request: HttpRequest) -> JsonResponse:
    if request.method != "POST":
        return JsonResponse({"error": "Only POST is allowed."}, status=405)

    webhook_secret = settings.RAZORPAY_WEBHOOK_SECRET
    if not webhook_secret:
        return JsonResponse({"error": "RAZORPAY_WEBHOOK_SECRET is missing."}, status=500)

    signature = request.headers.get("X-Razorpay-Signature", "")
    body = request.body or b""
    expected = hmac.new(webhook_secret.encode("utf-8"), body, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(signature, expected):
        return JsonResponse({"error": "Invalid webhook signature."}, status=400)

    try:
        payload = json.loads(body.decode("utf-8"))
        event_id = payload.get("payload", {}).get("payment", {}).get("entity", {}).get("id") or payload.get("id")
        event_type = payload.get("event", "unknown")

        if not event_id:
            return JsonResponse({"error": "Missing webhook event id."}, status=400)

        webhook_event, created = PaymentWebhookEvent.objects.get_or_create(
            event_id=event_id,
            defaults={"event_type": event_type, "payload": payload},
        )
        if not created and webhook_event.processed:
            return JsonResponse({"success": True, "message": "Duplicate webhook ignored."})

        if event_type in {"payment.captured", "payment.authorized"}:
            payment_entity = payload.get("payload", {}).get("payment", {}).get("entity", {})
            razorpay_order_id = payment_entity.get("order_id")
            razorpay_payment_id = payment_entity.get("id", "")
            
            # Map event to specific status
            new_status = PaymentOrder.Status.CAPTURED if event_type == "payment.captured" else PaymentOrder.Status.AUTHORIZED
            
            if razorpay_order_id:
                PaymentOrder.objects.filter(razorpay_order_id=razorpay_order_id).update(
                    status=new_status,
                    razorpay_payment_id=razorpay_payment_id,
                )
        elif event_type == "payment.failed":
            payment_entity = payload.get("payload", {}).get("payment", {}).get("entity", {})
            razorpay_order_id = payment_entity.get("order_id")
            if razorpay_order_id:
                PaymentOrder.objects.filter(razorpay_order_id=razorpay_order_id).update(
                    status=PaymentOrder.Status.FAILED
                )

        webhook_event.event_type = event_type
        webhook_event.payload = payload
        webhook_event.processed = True
        webhook_event.save(update_fields=["event_type", "payload", "processed"])

        # Final sync for webhook updates
        if razorpay_order_id:
            try:
                po = PaymentOrder.objects.get(razorpay_order_id=razorpay_order_id)
                _sync_to_supabase(po)
            except Exception:
                pass

        return JsonResponse({"success": True})
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON webhook payload."}, status=400)
    except Exception as exc:  # noqa: BLE001
        return JsonResponse({"error": f"Webhook processing failed: {exc}"}, status=500)

@csrf_exempt
def admin_login(request: HttpRequest) -> JsonResponse:
    if request.method != "POST":
        return JsonResponse({"error": "Only POST is allowed."}, status=405)
    
    try:
        payload = _json_body(request)
        username = payload.get("username")
        password = payload.get("password")
        
        # In a real app, you'd use Django's auth system properly.
        # Here we follow the user's specific requirement for special id/pass.
        if username == "admin123" and password == "admin@123":
            return JsonResponse({"success": True, "token": "admin-secret-session-token-v1"})
        return JsonResponse({"error": "Invalid admin credentials."}, status=401)
    except Exception as exc:
        return JsonResponse({"error": str(exc)}, status=500)


@csrf_exempt
def admin_stats(request: HttpRequest) -> JsonResponse:
    # Check for our secret token in the headers
    token = request.headers.get("X-Admin-Token")
    if token != "admin-secret-session-token-v1":
        return JsonResponse({"error": "Unauthorized"}, status=403)

    try:
        supabase = _get_supabase_client()
        
        # Fetch from Supabase for the admin portal as requested
        response = supabase.table("payment_orders").select("*").order("created_at", desc=True).limit(20).execute()
        orders = response.data or []
        
        # Count both captured and authorized as revenue (though captured is final)
        paid_orders = [o for o in orders if o["status"] in ["captured", "authorized", "paid"]]
        total_revenue = sum(float(o["amount"]) for o in paid_orders)
        
        recent_orders = []
        for order in orders:
            recent_orders.append({
                "id": order["razorpay_order_id"],
                "amount": order["amount"],
                "email": order.get("email", "N/A"),
                "date": order["created_at"],
                "razorpay_id": order.get("razorpay_payment_id", "N/A"),
                "status": order["status"]
            })

        return JsonResponse({
            "total_revenue": total_revenue,
            "order_count": len(paid_orders),
            "recent_orders": recent_orders
        })
    except Exception as exc:
        return JsonResponse({"error": str(exc)}, status=500)
