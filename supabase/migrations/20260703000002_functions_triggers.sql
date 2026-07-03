-- ============================================================
-- Belum Platform — Phase 1: Functions & triggers
-- ============================================================

-- Role check helper. SECURITY DEFINER so it can read profiles without being
-- blocked by (or recursing into) the profiles RLS policies.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- True if the current user owns the given operator.
create or replace function public.owns_operator(op_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.operators
    where id = op_id and owner_id = auth.uid()
  );
$$;

-- Auto-create a profiles row whenever a new auth user signs up.
-- Role and full_name can be supplied via signup metadata:
--   supabase.auth.signUp({ email, password,
--     options: { data: { full_name, role: 'operator' } } })
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    coalesce(
      nullif(new.raw_user_meta_data ->> 'role', '')::public.user_role,
      'customer'
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
