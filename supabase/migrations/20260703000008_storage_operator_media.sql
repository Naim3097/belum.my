-- ============================================================
-- Belum Platform — Phase 5: operator-media storage bucket
--
-- Public-read bucket for operator images (profile + gallery). Authenticated
-- users may only write within their own top-level folder: <auth.uid()>/...
-- ============================================================

insert into storage.buckets (id, name, public)
values ('operator-media', 'operator-media', true)
on conflict (id) do nothing;

create policy "operator-media public read"
  on storage.objects for select
  using (bucket_id = 'operator-media');

create policy "operator-media owner insert"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'operator-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "operator-media owner update"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'operator-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "operator-media owner delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'operator-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
