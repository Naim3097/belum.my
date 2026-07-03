-- ============================================================
-- Belum Platform — Phase 3: Fix ineffective role-column revoke
--
-- The previous `revoke update (role)` did nothing because a TABLE-level
-- UPDATE grant still implicitly covers every column. Remove the table-level
-- UPDATE, then re-grant UPDATE only on the safe, user-editable columns so a
-- user can never change their own `role` (which is_admin() trusts).
-- Admins change roles via the service-role client, which bypasses grants.
-- ============================================================

revoke update on public.profiles from anon, authenticated;
grant update (full_name, phone, avatar_url) on public.profiles to authenticated;
