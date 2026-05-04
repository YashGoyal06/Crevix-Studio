# Crevix App

Frontend for Crevix Studio with:
- Supabase authentication (Google OAuth)
- Business profile management
- User-scoped cart (each signed-in user sees only their own cart)
- Django backend for Razorpay payments (in `backend/`)

## 1) Environment setup

Copy `.env.example` to `.env` and add:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_BACKEND_URL=http://127.0.0.1:8000
```

## 2) Supabase setup

1. Create a Supabase project.
2. In Supabase SQL Editor, run `supabase/schema.sql`.
3. In **Authentication > Providers > Google**, enable Google provider.
4. Add redirect URLs:
   - `http://localhost:5173/profile`
   - your production URL `/profile`

## 3) Run app

```bash
npm install
npm run dev
```

## Implemented routes

- `/login` - Google sign-in page
- `/profile` - protected business profile page
- `/cart` - account-scoped cart
- `/checkout` - protected checkout

## Backend (Django)

A dedicated Django backend now exists in `backend/` for all payment logic and APIs.

Quick start:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

## Razorpay integration flow

- Frontend checkout calls Django `create-order` API.
- Django creates Razorpay order and returns `razorpay_order_id`.
- Frontend opens Razorpay popup (UPI/cards/netbanking).
- On success, frontend calls Django `verify` API with signature data.
- Django verifies signature and marks payment as paid.
- Razorpay webhook calls Django `webhook` API for final source of truth.
