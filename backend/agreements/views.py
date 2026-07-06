import json
import os
import ssl
import urllib.error
import urllib.request

from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt


SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send"


def _json_body(request: HttpRequest) -> dict:
    if not request.body:
        return {}
    return json.loads(request.body.decode("utf-8"))


def _build_message(payload: dict) -> tuple[str, str]:
    client_name = payload.get("client_name", "Client")
    project_name = payload.get("project_name", "Agreement")
    document_id = payload.get("document_id", "Agreement")
    signed_at = payload.get("signed_at", "Not available")
    email_type = payload.get("type", "AGREEMENT_SIGNED")

    if email_type == "AGREEMENT_SENT":
        subject = f"Service Agreement Sent - {project_name}"
        body = (
            f"Hello {client_name},\n\n"
            f"Your Crevix Studio service agreement for {project_name} has been generated.\n"
            f"Document ID: {document_id}\n\n"
            "Please open the secure agreement link shared with you to review and sign.\n\n"
            "Regards,\nCrevix Studio"
        )
        return subject, body

    subject = f"Agreement Signed - {project_name}"
    body = (
        "A Crevix Studio agreement has been signed.\n\n"
        f"Client: {client_name}\n"
        f"Project: {project_name}\n"
        f"Document ID: {document_id}\n"
        f"Signed At: {signed_at}\n\n"
        "The signed agreement and audit trail are available from the agreement system.\n\n"
        "Regards,\nCrevix Studio"
    )
    return subject, body


@csrf_exempt
def send_agreement_email(request: HttpRequest) -> JsonResponse:
    if request.method != "POST":
        return JsonResponse({"error": "Only POST is allowed."}, status=405)

    api_key = os.getenv("SENDGRID_API_KEY")
    from_email = os.getenv("SENDGRID_FROM_EMAIL")
    company_email = os.getenv("AGREEMENT_COMPANY_EMAIL", from_email or "")

    if not api_key:
        return JsonResponse({"error": "SENDGRID_API_KEY is missing on server."}, status=500)
    if not from_email:
        return JsonResponse({"error": "SENDGRID_FROM_EMAIL is missing on server."}, status=500)

    try:
        payload = _json_body(request)
        client_email = payload.get("client_email")
        if not client_email:
            return JsonResponse({"error": "client_email is required."}, status=400)

        subject, body = _build_message(payload)
        recipients = [{"email": client_email}]
        if company_email and company_email != client_email:
            recipients.append({"email": company_email})

        sendgrid_payload = {
            "personalizations": [
                {
                    "to": recipients,
                    "subject": subject,
                }
            ],
            "from": {"email": from_email, "name": "Crevix Studio"},
            "content": [{"type": "text/plain", "value": body}],
        }

        request_data = json.dumps(sendgrid_payload).encode("utf-8")
        sendgrid_request = urllib.request.Request(
            SENDGRID_API_URL,
            data=request_data,
            method="POST",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
        )

        verify_ssl = os.getenv("SENDGRID_VERIFY_SSL", "true").lower() not in {"0", "false", "no"}
        context = None if verify_ssl else ssl._create_unverified_context()

        with urllib.request.urlopen(sendgrid_request, timeout=15, context=context) as response:
            return JsonResponse(
                {
                    "queued": True,
                    "status": response.status,
                    "recipients": [recipient["email"] for recipient in recipients],
                }
            )
    except urllib.error.HTTPError as exc:
        details = exc.read().decode("utf-8", errors="replace")
        return JsonResponse({"error": "SendGrid rejected the email.", "details": details}, status=exc.code)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload."}, status=400)
    except Exception as exc:  # noqa: BLE001
        return JsonResponse({"error": f"Unable to send agreement email: {exc}"}, status=500)
