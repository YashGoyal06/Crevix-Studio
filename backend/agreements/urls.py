from django.urls import path

from . import views


urlpatterns = [
    path("email", views.send_agreement_email, name="send_agreement_email"),
]
