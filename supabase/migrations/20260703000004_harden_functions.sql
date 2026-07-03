-- ============================================================
-- Belum Platform — Phase 1: Harden helper functions
--
-- Move SECURITY DEFINER helper functions out of the API-exposed `public`
-- schema into a `private` schema so they can't be called via PostgREST RPC.
-- They remain usable inside RLS policies and the auth trigger (references are
-- kept by internal OID, so moving the schema is transparent to them).
-- Fixes advisor lints 0028 / 0029.
-- ============================================================

create schema if not exists private;

-- Keep these callable during RLS policy evaluation, but only through the
-- (unexposed) private schema — never via the public REST API.
grant usage on schema private to anon, authenticated, service_role;

alter function public.is_admin() set schema private;
alter function public.owns_operator(uuid) set schema private;
alter function public.handle_new_user() set schema private;

grant execute on function private.is_admin() to anon, authenticated, service_role;
grant execute on function private.owns_operator(uuid) to anon, authenticated, service_role;
