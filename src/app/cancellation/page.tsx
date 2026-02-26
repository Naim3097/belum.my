import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description:
    "Cancellation terms and refund policies for houseboat bookings on Temenggor Lake made through Belum Platform.",
  alternates: { canonical: "https://belumplatform.com/cancellation" },
};

export default function CancellationPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="bg-navy-950 px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Cancellation Policy
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Understand your options if your plans change.
        </p>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Timeline */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">
              Cancellation Timeline
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 font-display font-bold text-emerald-700">
                  7+
                </div>
                <div>
                  <p className="font-bold text-navy-900">
                    More than 7 days before departure
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Full refund of the trip fee. Permit fees are non-refundable
                    if already purchased.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 font-display font-bold text-amber-700">
                  3-7
                </div>
                <div>
                  <p className="font-bold text-navy-900">
                    3 to 7 days before departure
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    50% cancellation fee applies. Remaining 50% refunded. Permit
                    fees non-refundable.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 font-display font-bold text-rose-700">
                  &lt;3
                </div>
                <div>
                  <p className="font-bold text-navy-900">
                    Less than 3 days / 48 hours before departure
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    No refund. The full booking fee is forfeited as the operator
                    has already committed resources, crew, and supplies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
              Weather-Related Changes
            </h2>
            <p className="leading-relaxed text-slate-600">
              If weather conditions make the trip unsafe (severe storms, flood
              warnings), the operator will offer to reschedule to the next
              available date at no extra cost. If rescheduling is not possible, a
              full refund will be provided. Individual activity adjustments due
              to weather (e.g. swapping a waterfall visit for a different
              activity) are normal and not grounds for cancellation.
            </p>
          </div>

          {/* Date changes */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
              Date Changes & Rescheduling
            </h2>
            <p className="leading-relaxed text-slate-600">
              Want to change your trip dates instead of cancelling? Contact your
              operator at least 5 days before your original departure date.
              Date changes are subject to availability and at the operator&rsquo;s
              discretion. No rescheduling fee applies for the first date change.
            </p>
          </div>

          {/* Permits */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
              Non-Refundable Items
            </h2>
            <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-slate-600">
              <li>
                <strong>Royal Belum Pass</strong> — Once purchased, permit fees
                are non-refundable as they are issued by the authorities.
              </li>
              <li>
                <strong>Fishing Pass</strong> — Non-refundable once issued.
              </li>
              <li>
                <strong>Service fee</strong> — The platform service fee is
                non-refundable after booking confirmation.
              </li>
            </ul>
          </div>

          {/* How to cancel */}
          <div className="rounded-2xl bg-navy-950 p-8 text-center">
            <h2 className="font-display text-xl font-bold text-white">
              Need to Cancel?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
              Contact your houseboat operator directly through their listing
              page, or reach out to us and we&rsquo;ll help coordinate.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-8 py-3 font-bold text-white transition hover:bg-blue-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
