from django.contrib import admin

from .models import PaymentOrder, PaymentWebhookEvent


@admin.register(PaymentOrder)
class PaymentOrderAdmin(admin.ModelAdmin):
    list_display = ("receipt", "razorpay_order_id", "amount_paise", "currency", "status", "created_at")
    search_fields = ("receipt", "razorpay_order_id", "razorpay_payment_id")
    list_filter = ("status", "currency")


@admin.register(PaymentWebhookEvent)
class PaymentWebhookEventAdmin(admin.ModelAdmin):
    list_display = ("event_id", "event_type", "processed", "created_at")
    search_fields = ("event_id", "event_type")
    list_filter = ("processed", "event_type")
