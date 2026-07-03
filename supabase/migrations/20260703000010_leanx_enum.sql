-- ============================================================
-- Belum Platform — Phase 7: extend transaction_status for LeanX
-- LeanX maps to processing / completed / cancelled in addition to the
-- existing pending / succeeded / failed / refunded.
-- (Kept in its own migration: new enum values can't be used in the same
-- transaction that adds them.)
-- ============================================================

alter type public.transaction_status add value if not exists 'processing';
alter type public.transaction_status add value if not exists 'completed';
alter type public.transaction_status add value if not exists 'cancelled';
