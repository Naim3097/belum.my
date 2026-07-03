-- ============================================================
-- Belum Platform — Phase 1: Initial schema
-- Enums + core tables + indexes
-- ============================================================

-- ── Enums ───────────────────────────────────────────────
create type public.user_role as enum ('customer', 'operator', 'admin');
create type public.operator_category as enum ('Houseboat', 'Adventure', 'Eco', 'Family', 'Fishing');
create type public.activity_difficulty as enum ('Easy', 'Moderate', 'Challenging');
create type public.activity_category as enum ('Water', 'Jungle', 'Culture', 'Wildlife');
create type public.booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
create type public.payment_status as enum ('unpaid', 'paid', 'refunded');
create type public.transaction_status as enum ('pending', 'succeeded', 'failed', 'refunded');

-- ── profiles (1:1 with auth.users) ──────────────────────
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  role        public.user_role not null default 'customer',
  full_name   text,
  email       text,
  phone       text,
  avatar_url  text,
  created_at  timestamptz not null default now()
);
comment on table public.profiles is 'Application profile per auth user; holds role for RLS.';

-- ── operators (formerly the hardcoded "Host") ───────────
create table public.operators (
  id                uuid primary key default gen_random_uuid(),
  owner_id          uuid references public.profiles (id) on delete set null,
  slug              text unique not null,
  name              text not null,
  tagline           text,
  description       text,
  long_description  text,
  captain           text,
  captain_bio       text,
  capacity          int,
  image             text,
  gallery           text[] not null default '{}',
  amenities         text[] not null default '{}',
  rating            numeric(2,1) not null default 0,
  reviews_count     int not null default 0,
  verified          boolean not null default false,
  location          text,
  category          public.operator_category not null default 'Houseboat',
  response_time     text,
  response_rate     int,
  joined_year       int,
  is_published      boolean not null default true,  -- auto-publish
  created_at        timestamptz not null default now()
);
comment on column public.operators.owner_id is 'Null for seeded operators with no auth account yet.';

-- ── packages (formerly nested HostPackage; the bookable unit) ──
create table public.packages (
  id           uuid primary key default gen_random_uuid(),
  operator_id  uuid not null references public.operators (id) on delete cascade,
  name         text not null,
  duration     text,
  price        numeric(10,2) not null,
  pax          int not null default 1,
  highlights   text[] not null default '{}',
  image        text,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ── activities (global catalog) ─────────────────────────
create table public.activities (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  description  text,
  image        text,
  duration     text,
  difficulty   public.activity_difficulty not null default 'Easy',
  category     public.activity_category not null default 'Water',
  price        numeric(10,2) not null default 0,
  included     boolean not null default false
);

-- ── bookings (persisted reservations) ───────────────────
create table public.bookings (
  id             uuid primary key default gen_random_uuid(),
  package_id     uuid references public.packages (id) on delete set null,
  operator_id    uuid references public.operators (id) on delete set null,
  customer_id    uuid references public.profiles (id) on delete set null,
  guest_name     text,
  guest_email    text,
  guest_phone    text,
  checkin        date,
  checkout       date,
  nights         int,
  guests_count   int not null default 1,
  base_price     numeric(10,2) not null,
  service_fee    numeric(10,2) not null default 0,  -- platform commission
  permit_fee     numeric(10,2) not null default 0,  -- pass-through
  total_amount   numeric(10,2) not null,
  currency       text not null default 'MYR',
  status         public.booking_status not null default 'pending',
  payment_status public.payment_status not null default 'unpaid',
  created_at     timestamptz not null default now()
);

-- ── transactions (money records; LeanX-ready) ───────────
create table public.transactions (
  id           uuid primary key default gen_random_uuid(),
  booking_id   uuid references public.bookings (id) on delete cascade,
  amount       numeric(10,2) not null,
  currency     text not null default 'MYR',
  provider     text not null default 'leanx',
  provider_ref text,
  method       text,
  status       public.transaction_status not null default 'pending',
  raw_payload  jsonb,
  created_at   timestamptz not null default now()
);

-- ── reviews (real ratings; wired up in a later phase) ───
create table public.reviews (
  id           uuid primary key default gen_random_uuid(),
  booking_id   uuid references public.bookings (id) on delete set null,
  operator_id  uuid not null references public.operators (id) on delete cascade,
  customer_id  uuid references public.profiles (id) on delete set null,
  rating       int not null check (rating between 1 and 5),
  comment      text,
  created_at   timestamptz not null default now()
);

-- ── Indexes ─────────────────────────────────────────────
create index idx_operators_owner       on public.operators (owner_id);
create index idx_packages_operator      on public.packages (operator_id);
create index idx_bookings_operator      on public.bookings (operator_id);
create index idx_bookings_customer      on public.bookings (customer_id);
create index idx_bookings_package       on public.bookings (package_id);
create index idx_transactions_booking   on public.transactions (booking_id);
create index idx_reviews_operator       on public.reviews (operator_id);
