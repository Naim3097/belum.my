-- ============================================================
-- Belum Platform — Phase 1: Row Level Security
--
-- Model:
--   public   → can read published operators, their active packages, activities
--   customer → can read/write own bookings, transactions on own bookings
--   operator → can read/write their own operator, packages, and see bookings
--              made against their operator
--   admin    → full access to everything
-- ============================================================

alter table public.profiles     enable row level security;
alter table public.operators     enable row level security;
alter table public.packages      enable row level security;
alter table public.activities    enable row level security;
alter table public.bookings      enable row level security;
alter table public.transactions  enable row level security;
alter table public.reviews       enable row level security;

-- ── profiles ────────────────────────────────────────────
create policy "profiles: read own or admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles: insert own"
  on public.profiles for insert
  with check (id = auth.uid());

create policy "profiles: update own or admin"
  on public.profiles for update
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- ── operators ───────────────────────────────────────────
create policy "operators: public read published"
  on public.operators for select
  using (is_published or owner_id = auth.uid() or public.is_admin());

create policy "operators: owner insert"
  on public.operators for insert
  with check (owner_id = auth.uid());

create policy "operators: owner or admin update"
  on public.operators for update
  using (owner_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or public.is_admin());

create policy "operators: owner or admin delete"
  on public.operators for delete
  using (owner_id = auth.uid() or public.is_admin());

-- ── packages ────────────────────────────────────────────
create policy "packages: public read active of published operator"
  on public.packages for select
  using (
    public.is_admin()
    or public.owns_operator(operator_id)
    or (
      is_active
      and exists (
        select 1 from public.operators o
        where o.id = packages.operator_id and o.is_published
      )
    )
  );

create policy "packages: owner or admin insert"
  on public.packages for insert
  with check (public.owns_operator(operator_id) or public.is_admin());

create policy "packages: owner or admin update"
  on public.packages for update
  using (public.owns_operator(operator_id) or public.is_admin())
  with check (public.owns_operator(operator_id) or public.is_admin());

create policy "packages: owner or admin delete"
  on public.packages for delete
  using (public.owns_operator(operator_id) or public.is_admin());

-- ── activities (global catalog) ─────────────────────────
create policy "activities: public read"
  on public.activities for select
  using (true);

create policy "activities: admin write"
  on public.activities for all
  using (public.is_admin())
  with check (public.is_admin());

-- ── bookings ────────────────────────────────────────────
create policy "bookings: customer/operator/admin read"
  on public.bookings for select
  using (
    customer_id = auth.uid()
    or public.owns_operator(operator_id)
    or public.is_admin()
  );

create policy "bookings: customer insert own"
  on public.bookings for insert
  with check (customer_id = auth.uid());

create policy "bookings: customer/operator/admin update"
  on public.bookings for update
  using (
    customer_id = auth.uid()
    or public.owns_operator(operator_id)
    or public.is_admin()
  )
  with check (
    customer_id = auth.uid()
    or public.owns_operator(operator_id)
    or public.is_admin()
  );

-- ── transactions ────────────────────────────────────────
create policy "transactions: related party read"
  on public.transactions for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.bookings b
      where b.id = transactions.booking_id
        and (b.customer_id = auth.uid() or public.owns_operator(b.operator_id))
    )
  );

create policy "transactions: customer/admin insert"
  on public.transactions for insert
  with check (
    public.is_admin()
    or exists (
      select 1 from public.bookings b
      where b.id = transactions.booking_id and b.customer_id = auth.uid()
    )
  );

-- ── reviews ─────────────────────────────────────────────
create policy "reviews: public read"
  on public.reviews for select
  using (true);

create policy "reviews: customer insert own"
  on public.reviews for insert
  with check (customer_id = auth.uid());

create policy "reviews: owner or admin update"
  on public.reviews for update
  using (customer_id = auth.uid() or public.is_admin())
  with check (customer_id = auth.uid() or public.is_admin());

create policy "reviews: owner or admin delete"
  on public.reviews for delete
  using (customer_id = auth.uid() or public.is_admin());
