-- Run this in Supabase SQL Editor
create extension if not exists "pgcrypto";

create table if not exists public.business_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  business_name text,
  phone text,
  website text,
  about text,
  updated_at timestamptz default now()
);

create table if not exists public.cart_items (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null,
  name text not null,
  type text,
  price text,
  amount integer default 0,
  features jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter table public.business_profiles enable row level security;
alter table public.cart_items enable row level security;

create policy "business profile select own"
on public.business_profiles for select
using (auth.uid() = user_id);

create policy "business profile insert own"
on public.business_profiles for insert
with check (auth.uid() = user_id);

create policy "business profile update own"
on public.business_profiles for update
using (auth.uid() = user_id);

create policy "cart select own"
on public.cart_items for select
using (auth.uid() = user_id);

create policy "cart insert own"
on public.cart_items for insert
with check (auth.uid() = user_id);

create policy "cart delete own"
on public.cart_items for delete
using (auth.uid() = user_id);
