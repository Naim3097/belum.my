import { createClient } from "@/lib/supabase/server";
import type {
  BookingRow,
  OperatorRow,
  TransactionRow,
} from "@/types/database.types";

/**
 * Platform-wide (superadmin) queries. These run with the admin's authed
 * session; every table's RLS includes `is_admin()`, so an admin reads across
 * all operators, bookings, transactions, and profiles.
 */

export type AdminBooking = BookingRow & {
  operator: { name: string; slug: string } | null;
  package: { name: string } | null;
};

export async function getAllBookings(): Promise<AdminBooking[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*, operator:operators(name, slug), package:packages(name)")
    .order("created_at", { ascending: false });
  return (data as AdminBooking[]) ?? [];
}

export type AdminOperator = OperatorRow & {
  owner: { email: string | null; full_name: string | null } | null;
};

export async function getAllOperators(): Promise<AdminOperator[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("operators")
    .select("*, owner:profiles(email, full_name)")
    .order("created_at", { ascending: false });
  return (data as AdminOperator[]) ?? [];
}

export type AdminTransaction = TransactionRow & {
  booking: {
    guest_name: string | null;
    operator: { name: string } | null;
  } | null;
};

export async function getAllTransactions(): Promise<AdminTransaction[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("transactions")
    .select("*, booking:bookings(guest_name, operator:operators(name))")
    .order("created_at", { ascending: false });
  return (data as AdminTransaction[]) ?? [];
}

export type PlatformCounts = {
  operators: number;
  customers: number;
};

export async function getPlatformCounts(): Promise<PlatformCounts> {
  const supabase = await createClient();
  const [{ count: operators }, { count: customers }] = await Promise.all([
    supabase.from("operators").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "customer"),
  ]);
  return { operators: operators ?? 0, customers: customers ?? 0 };
}

export type PlatformMetrics = {
  gmv: number; // gross booking value
  revenue: number; // platform commission = sum of service fees
  bookings: number;
  pendingBookings: number;
  paidBookings: number;
  operators: number;
  customers: number;
};

export function computePlatformMetrics(
  bookings: AdminBooking[],
  counts: PlatformCounts
): PlatformMetrics {
  let gmv = 0;
  let revenue = 0;
  let pending = 0;
  let paid = 0;
  for (const b of bookings) {
    gmv += Number(b.total_amount);
    revenue += Number(b.service_fee);
    if (b.status === "pending") pending += 1;
    if (b.payment_status === "paid") paid += 1;
  }
  return {
    gmv,
    revenue,
    bookings: bookings.length,
    pendingBookings: pending,
    paidBookings: paid,
    operators: counts.operators,
    customers: counts.customers,
  };
}

export type TrendPoint = { month: string; label: string; gmv: number; count: number };

/** Last `months` months of GMV + booking counts, oldest → newest. */
export function computeMonthlyTrend(
  bookings: AdminBooking[],
  months = 6
): TrendPoint[] {
  const now = new Date();
  const buckets: TrendPoint[] = [];
  const index = new Map<string, TrendPoint>();

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const point: TrendPoint = {
      month: key,
      label: d.toLocaleDateString("en-MY", { month: "short" }),
      gmv: 0,
      count: 0,
    };
    buckets.push(point);
    index.set(key, point);
  }

  for (const b of bookings) {
    const key = b.created_at.slice(0, 7); // YYYY-MM
    const point = index.get(key);
    if (point) {
      point.gmv += Number(b.total_amount);
      point.count += 1;
    }
  }

  return buckets;
}
