# Django Backend (Payments)

This folder contains a complete Django backend for payment processing with Razorpay (UPI, cards, netbanking).

## 1) Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 2) Environment

```bash
cp .env.example .env
```

Then export env variables (or use your preferred env loader):

```bash
export $(grep -v '^#' .env | xargs)
```

## 3) Run migrations and server

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## 4) API endpoints

- `POST /api/payments/create-order/`
  - body: `{ "amount_paise": 49900, "currency": "INR", "notes": { "user_id": "abc" } }`
- `POST /api/payments/verify/`
  - body: `{ "razorpay_order_id": "...", "razorpay_payment_id": "...", "razorpay_signature": "..." }`
- `POST /api/payments/webhook/`
  - configure this URL in Razorpay dashboard webhooks with your webhook secret

## 5) Production notes

- Keep `DJANGO_DEBUG=False` in production.
- Configure `DJANGO_ALLOWED_HOSTS`.
- Keep Razorpay secrets only on backend.
- Always rely on webhook + signature verification before final delivery.
