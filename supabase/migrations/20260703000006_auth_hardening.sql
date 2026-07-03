-- ============================================================
-- Belum Platform — Phase 3: Auth security hardening
--
-- 1. Prevent privilege escalation: a signed-in user must NOT be able to
--    change their own `role` (the "profiles: update own" policy would
--    otherwise allow it, and is_admin() trusts profiles.role). Revoke the
--    column-level UPDATE. Admins change roles via the service-role client.
--
-- 2. Sanitize signup: only 'customer' or 'operator' may be self-assigned via
--    signup metadata; anything else (e.g. a crafted 'admin') falls back to
--    'customer'. Admins are promoted manually.
-- ============================================================

revoke update (role) on public.profiles from anon, authenticated;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested text := new.raw_user_meta_data ->> 'role';
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    case
      when requested in ('customer', 'operator') then requested::public.user_role
      else 'customer'
    end
  );
  return new;
end;
$$;
