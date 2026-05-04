from django.urls import path

from . import views


urlpatterns = [
    path("create-order/", views.create_order, name="create_order"),
    path("verify/", views.verify_payment, name="verify_payment"),
    path("webhook/", views.webhook, name="webhook"),
    path("admin-login", views.admin_login, name="admin_login"),
    path("admin-stats", views.admin_stats, name="admin_stats"),
]
