-- ============================================================
-- Belum Platform — Phase 1: Fix operators.rating precision
-- numeric(2,1) would round seeded ratings like 4.87 -> 4.9.
-- Widen to numeric(3,2) to preserve two decimals (0.00 - 9.99).
-- ============================================================
alter table public.operators
  alter column rating type numeric(3,2);
