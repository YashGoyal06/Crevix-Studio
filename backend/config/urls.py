from django.contrib import admin
from django.urls import include, path

from payments import views as payment_views


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/create-order", payment_views.create_order, name="create_order_alias"),
    path("api/verify-payment", payment_views.verify_payment, name="verify_payment_alias"),
    path("api/payments/", include("payments.urls")),
]
