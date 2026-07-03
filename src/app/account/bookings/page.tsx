import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { MapPin, Calendar, Users, ArrowRight, CalendarX } from "lucide-react";

export const metadata: Metadata = {
  title: "My Bookings",
  robots: { index: false, follow: false },
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-emerald-50 text-emerald-700",
  completed: "bg-slate-100 text-slate-600",
  cancelled: "bg-rose-50 text-rose-700",
};

const paymentStyles: Record<string, string> = {
  unpaid: "bg-slate-100 text-slate-600",
  paid: "bg-emerald-50 text-emerald-700",
  refunded: "bg-slate-100 text-slate-500",
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return "TBC";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-MY", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function MyBookingsPage() {
  // Middleware guarantees an authenticated user reaches this route.
  const supabase = await createClient();

  // RLS scopes this to the signed-in customer's own bookings.
  const { data: bookings } = await supabase
    .from("bookings")
    .select(
      "*, package:packages(name, duration), operator:operators(name, slug, image, location)"
    )
    .order("created_at", { ascending: false });

  const list = bookings ?? [];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-2 font-display text-3xl font-bold text-navy-900">
          My Bookings
        </h1>
        <p className="mb-8 text-slate-500">
          Your houseboat trips on Temenggor Lake & Royal Belum.
        </p>

        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <CalendarX className="h-10 w-10 text-slate-300" />
            <div>
              <p className="font-medium text-navy-900">No bookings yet</p>
              <p className="text-sm text-slate-500">
                Browse houseboats and reserve your first trip.
              </p>
            </div>
            <Link
              href="/search"
              className="rounded-xl bg-navy-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-800"
            >
              Browse houseboats
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {list.map((b) => (
              <div
                key={b.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h2 className="font-display font-bold text-navy-900">
                      {b.operator?.name}
                      {b.package?.name ? ` — ${b.package.name}` : ""}
                    </h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                        statusStyles[b.status] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {b.status}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                        paymentStyles[b.payment_status] ??
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {b.payment_status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                    {b.operator?.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {b.operator.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatDate(b.checkin)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {b.guests_count}{" "}
                      {b.guests_count === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <span className="font-display text-lg font-bold text-navy-900">
                    RM {Number(b.total_amount).toLocaleString()}
                  </span>
                  <Link
                    href={`/booking/confirmation/${b.id}`}
                    className="flex items-center gap-1 text-sm font-semibold text-navy-900 transition hover:text-blue-600"
                  >
                    Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
