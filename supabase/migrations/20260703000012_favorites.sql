-- ── favorites (wishlist: houseboats a user has saved) ───
create table public.favorites (
  user_id     uuid not null references public.profiles (id) on delete cascade,
  operator_id uuid not null references public.operators (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, operator_id)
);
comment on table public.favorites is 'Per-user saved houseboats (wishlist).';

create index idx_favorites_user on public.favorites (user_id);

alter table public.favorites enable row level security;

-- A user may only see and manage their own saved houseboats.
create policy "favorites: owner read"
  on public.favorites for select
  using (user_id = auth.uid());

create policy "favorites: owner insert"
  on public.favorites for insert
  with check (user_id = auth.uid());

create policy "favorites: owner delete"
  on public.favorites for delete
  using (user_id = auth.uid());
