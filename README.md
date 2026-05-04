# Crevix App

Frontend for Crevix Studio with:
- Supabase authentication (Google OAuth)
- Business profile management
- User-scoped cart (each signed-in user sees only their own cart)

## 1) Environment setup

Copy `.env.example` to `.env` and add:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
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
