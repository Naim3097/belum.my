-- ============================================================
-- Belum Platform — Phase 7: LeanX credentials + transaction fields
--
-- Operator LeanX credentials live in their OWN table (not on `operators`,
-- which is publicly readable) so secrets are never exposed. RLS restricts
-- access to the owning operator and admins; there is NO public/anon policy.
-- The webhook / bill-creation read these via the service-role client.
-- ============================================================

create table public.operator_leanx (
  operator_id      uuid primary key references public.operators (id) on delete cascade,
  api_key          text,   -- LP-...  (sent as auth-token header)
  secret_key       text,   -- whsec_... (webhook HMAC secret)
  collection_uuid  text,   -- Dc-/CL-... (sent in the bill body)
  merchant_id      text,
  enabled          boolean not null default false,
  environment      text not null default 'live', -- 'test' | 'live'
  updated_at       timestamptz not null default now()
);

alter table public.operator_leanx enable row level security;

create policy "operator_leanx owner/admin select"
  on public.operator_leanx for select
  using (private.owns_operator(operator_id) or private.is_admin());

create policy "operator_leanx owner/admin insert"
  on public.operator_leanx for insert
  with check (private.owns_operator(operator_id) or private.is_admin());

create policy "operator_leanx owner/admin update"
  on public.operator_leanx for update
  using (private.owns_operator(operator_id) or private.is_admin())
  with check (private.owns_operator(operator_id) or private.is_admin());

-- ── transactions: fields LeanX needs ────────────────────
alter table public.transactions
  add column if not exists order_id     text,        -- our invoice_ref
  add column if not exists redirect_url text,        -- LeanX hosted payment URL
  add column if not exists completed_at timestamptz;

-- bill_no (provider_ref) is LeanX's id — unique for idempotent webhooks.
create unique index if not exists uniq_transactions_provider_ref
  on public.transactions (provider_ref)
  where provider_ref is not null;
