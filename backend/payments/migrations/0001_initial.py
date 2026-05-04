from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="PaymentOrder",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("receipt", models.CharField(max_length=100, unique=True)),
                ("amount_paise", models.PositiveIntegerField()),
                ("currency", models.CharField(default="INR", max_length=10)),
                (
                    "status",
                    models.CharField(
                        choices=[("created", "Created"), ("paid", "Paid"), ("failed", "Failed")],
                        default="created",
                        max_length=20,
                    ),
                ),
                ("razorpay_order_id", models.CharField(max_length=100, unique=True)),
                ("razorpay_payment_id", models.CharField(blank=True, max_length=100)),
                ("razorpay_signature", models.CharField(blank=True, max_length=255)),
                ("notes", models.JSONField(blank=True, default=dict)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="PaymentWebhookEvent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("event_id", models.CharField(max_length=100, unique=True)),
                ("event_type", models.CharField(max_length=100)),
                ("payload", models.JSONField(blank=True, default=dict)),
                ("processed", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
