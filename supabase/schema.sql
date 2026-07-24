create type purchase_status as enum ('created', 'pending', 'approved', 'rejected', 'cancelled', 'delivered', 'failed');
create type payment_gateway as enum ('mercadopago', 'paypal');

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  storage_path text not null,
  price_ars integer,
  price_usd integer,
  active boolean not null default false,
  created_at timestamptz not null default now()
);

create table purchases (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id),
  customer_name text not null,
  customer_email text not null,
  amount integer not null,
  currency text not null check (currency in ('ARS', 'USD')),
  gateway payment_gateway not null,
  gateway_payment_id text unique,
  status purchase_status not null default 'created',
  idempotency_key text unique not null,
  download_token_hash text,
  download_expires_at timestamptz,
  delivered_at timestamptz,
  email_message_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index purchases_customer_email_idx on purchases (customer_email);
create index purchases_status_idx on purchases (status);
create index purchases_product_id_idx on purchases (product_id);

alter table products enable row level security;
alter table purchases enable row level security;

-- Keep paid files in a private bucket named by SUPABASE_STORAGE_BUCKET.
-- Server-side code must use the service role key. Do not expose it to the browser.
