create table if not exists agreements (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  document_id text not null unique,
  status text not null default 'SENT',
  client_name text not null,
  client_email text not null,
  brand_name text not null,
  project_name text not null,
  service_type text not null,
  deliverables text not null,
  project_description text,
  timeline text not null,
  revision_count integer not null default 0,
  project_cost numeric not null default 0,
  advance_amount numeric not null default 0,
  remaining_amount numeric not null default 0,
  agreement_date timestamptz not null default now(),
  expires_at timestamptz,
  ai_content jsonb,
  unsigned_pdf_url text,
  signed_pdf_url text,
  signed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists agreement_signatures (
  id uuid primary key default gen_random_uuid(),
  agreement_id uuid not null references agreements(id) on delete cascade,
  signature_image text not null,
  signature_method text not null,
  signed_at timestamptz not null default now(),
  timezone text not null,
  ip_address text,
  email text not null,
  browser_info text,
  created_at timestamptz not null default now(),
  unique (agreement_id)
);

create table if not exists agreement_audit_logs (
  id uuid primary key default gen_random_uuid(),
  agreement_id uuid not null references agreements(id) on delete cascade,
  event_type text not null,
  event_at timestamptz not null default now(),
  actor_email text,
  ip_address text,
  browser_info text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists agreement_emails (
  id uuid primary key default gen_random_uuid(),
  agreement_id uuid not null references agreements(id) on delete cascade,
  email_type text not null,
  recipient text not null,
  status text not null,
  provider_response jsonb,
  sent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists agreements_token_idx on agreements(token);
create index if not exists agreement_audit_logs_agreement_id_idx on agreement_audit_logs(agreement_id);
