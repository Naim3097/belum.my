"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  MapPin,
  Calendar,
  Users,
  Mail,
  Phone,
  Download,
  ArrowRight,
} from "lucide-react";
import { getListingById, getHostById } from "@/data/hosts";

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listing");
  const listing = listingId ? getListingById(listingId) : null;

  const name = searchParams.get("name") || "Guest";
  const email = searchParams.get("email") || "";
  const checkin = searchParams.get("checkin") || "";
  const guestsParam = searchParams.get("guests") || "1";
  const totalParam = searchParams.get("total") || "0";

  // Generate a random booking reference
  const bookingRef = `BLM-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  if (!listing) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-2xl font-bold text-navy-900">
          Booking not found
        </h1>
        <Link
          href="/search"
          className="rounded-xl bg-navy-900 px-6 py-3 font-bold text-white transition hover:bg-navy-800"
        >
          Browse Packages
        </Link>
      </div>
    );
  }

  const host = getHostById(listing.hostId)!;

  function formatDate(dateStr: string) {
    if (!dateStr) return "TBC";
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-MY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Success header */}
      <div className="mb-10 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
          Booking Confirmed!
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-slate-500">
          Your houseboat trip has been booked. A confirmation email will be sent
          to <strong className="text-navy-900">{email}</strong>.
        </p>
      </div>

      {/* Booking reference */}
      <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-sm font-medium text-emerald-700">Booking Reference</p>
        <p className="mt-1 font-display text-3xl font-bold tracking-wider text-emerald-800">
          {bookingRef}
        </p>
        <p className="mt-2 text-xs text-emerald-600">
          Save this reference — you&rsquo;ll need it to contact your operator
        </p>
      </div>

      {/* Trip details card */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
          Trip Details
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-navy-900">
                {listing.title}
              </p>
              <p className="text-sm text-slate-500">{listing.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-navy-900">
                {formatDate(checkin)}
              </p>
              <p className="text-sm text-slate-500">{listing.duration}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-navy-900">
                {guestsParam} {Number(guestsParam) === 1 ? "guest" : "guests"}
              </p>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between text-lg font-bold text-navy-900">
              <span>Total Paid</span>
              <span>RM {Number(totalParam).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* What's next */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
          What Happens Next
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              1
            </div>
            <div>
              <p className="font-medium text-navy-900">
                Confirmation email sent
              </p>
              <p className="text-sm text-slate-500">
                Check your inbox at {email} for the full itinerary and packing
                list.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              2
            </div>
            <div>
              <p className="font-medium text-navy-900">
                Operator will contact you
              </p>
              <p className="text-sm text-slate-500">
                {host.captain} from {host.name} will reach out within{" "}
                {host.responseTime} to confirm logistics and answer questions.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              3
            </div>
            <div>
              <p className="font-medium text-navy-900">
                Arrive at Jeti Awam Pulau Banding
              </p>
              <p className="text-sm text-slate-500">
                On your departure date, head to {listing.location}. The crew
                will brief you on safety and board you onto the houseboat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="mb-8 rounded-2xl bg-navy-950 p-6 text-center text-white">
        <p className="text-sm text-slate-400">Need help? Contact us</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-6">
          <a
            href="tel:+60108692982"
            className="flex items-center gap-2 text-sm font-medium transition hover:text-amber-400"
          >
            <Phone className="h-4 w-4" /> +6010 869 2982
          </a>
          <a
            href="mailto:the.temenggor@gmail.com"
            className="flex items-center gap-2 text-sm font-medium transition hover:text-amber-400"
          >
            <Mail className="h-4 w-4" /> the.temenggor@gmail.com
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-xl bg-navy-900 px-8 py-3 font-bold text-white transition hover:bg-navy-800"
        >
          Back to Home
        </Link>
        <Link
          href="/activities"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-3 font-bold text-navy-900 transition hover:border-navy-900"
        >
          Explore Activities <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
