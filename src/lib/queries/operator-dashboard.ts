import { createClient } from "@/lib/supabase/server";
import type {
  OperatorRow,
  PackageRow,
  BookingRow,
} from "@/types/database.types";

/**
 * Operator-facing queries. All run with the operator's authed session, so RLS
 * scopes every result to the operator that the signed-in user owns.
 */

/** The operator row owned by the current user, or null (not onboarded yet). */
export async function getMyOperator(): Promise<OperatorRow | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("operators")
    .select("*")
    .eq("owner_id", user.id)
    .maybeSingle();
  return data;
}

export async function getMyPackages(operatorId: string): Promise<PackageRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("operator_id", operatorId)
    .order("price", { ascending: true });
  return data ?? [];
}

export type OperatorBooking = BookingRow & {
  package: { name: string } | null;
};

export async function getMyOperatorBookings(
  operatorId: string
): Promise<OperatorBooking[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookings")
    .select("*, package:packages(name)")
    .eq("operator_id", operatorId)
    .order("created_at", { ascending: false });
  return (data as OperatorBooking[]) ?? [];
}

export type OperatorMetrics = {
  totalBookings: number;
  pendingBookings: number;
  upcomingTrips: number;
  earned: number; // operator keeps the package base price on paid bookings
  grossValue: number; // total transacted value across all bookings
};

export function computeMetrics(bookings: OperatorBooking[]): OperatorMetrics {
  const today = new Date().toISOString().slice(0, 10);
  let pending = 0;
  let upcoming = 0;
  let earned = 0;
  let gross = 0;

  for (const b of bookings) {
    gross += Number(b.total_amount);
    if (b.status === "pending") pending += 1;
    if (
      (b.status === "pending" || b.status === "confirmed") &&
      b.checkin &&
      b.checkin >= today
    ) {
      upcoming += 1;
    }
    if (b.payment_status === "paid") earned += Number(b.base_price);
  }

  return {
    totalBookings: bookings.length,
    pendingBookings: pending,
    upcomingTrips: upcoming,
    earned,
    grossValue: gross,
  };
}
