-- ============================================================
-- Belum Platform — Phase 5: tighten operator-media bucket
--
-- A public bucket already serves objects via their public URLs without any
-- storage.objects SELECT policy. The broad "public read" SELECT policy only
-- enabled clients to LIST/enumerate every file, which we don't want. Drop it —
-- image display via public URL is unaffected.
-- ============================================================

drop policy if exists "operator-media public read" on storage.objects;
