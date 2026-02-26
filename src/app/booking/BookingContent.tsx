"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Check,
  ShieldCheck,
  ChevronLeft,
  CreditCard,
  Lock,
  AlertCircle,
} from "lucide-react";
import { getListingById, getHostById } from "@/data/hosts";

export default function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const listingId = searchParams.get("listing");
  const listing = listingId ? getListingById(listingId) : null;

  // Read date/guest params from listing page
  const paramCheckin = searchParams.get("checkin") || "";
  const paramCheckout = searchParams.get("checkout") || "";
  const paramGuests = searchParams.get("guests") || "";

  // Form state
  const [checkin, setCheckin] = useState(paramCheckin);
  const [checkout, setCheckout] = useState(paramCheckout);
  const [guests, setGuests] = useState(paramGuests || (listing ? String(listing.pax) : "1"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [payMethod, setPayMethod] = useState<"card" | "fpx">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [fpxBank, setFpxBank] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [editDates, setEditDates] = useState(!paramCheckin);

  if (!listing) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-2xl font-bold text-navy-900">
          No package selected
        </h1>
        <p className="text-slate-500">
          Please choose a package from our listings first.
        </p>
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
  const serviceFee = Math.round(listing.price * 0.05);
  const permitFee = 300;
  const total = listing.price + serviceFee + permitFee;

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  function validate(): string[] {
    const errs: string[] = [];
    if (!checkin) errs.push("Please select a check-in date.");
    if (!firstName.trim()) errs.push("First name is required.");
    if (!lastName.trim()) errs.push("Last name is required.");
    if (!email.trim() || !email.includes("@")) errs.push("A valid email is required.");
    if (!phone.trim()) errs.push("Phone number is required.");
    if (payMethod === "card") {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length < 13)
        errs.push("Please enter a valid card number.");
      if (!cardExpiry.trim()) errs.push("Card expiry is required.");
      if (!cardCvv.trim() || cardCvv.length < 3) errs.push("CVV is required.");
    }
    return errs;
  }

  function handleConfirm() {
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSubmitting(true);
    // Simulate payment processing
    setTimeout(() => {
      const confirmParams = new URLSearchParams({
        listing: listing!.id,
        name: `${firstName} ${lastName}`,
        email,
        checkin,
        guests,
        total: total.toString(),
      });
      router.push(`/booking/confirmation?${confirmParams.toString()}`);
    }, 1500);
  }

  // Format date for display
  function formatDate(dateStr: string) {
    if (!dateStr) return "Not selected";
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-MY", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back */}
      <Link
        href={`/listing/${listing.id}`}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-navy-900"
      >
        <ChevronLeft className="h-4 w-4" /> Back to listing
      </Link>

      <h1 className="mb-8 font-display text-3xl font-bold text-navy-900">
        Confirm & Pay
      </h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        {/* Left – form */}
        <div className="space-y-8 lg:col-span-3">
          {/* Validation errors */}
          {errors.length > 0 && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
              <div className="mb-2 flex items-center gap-2 font-bold text-rose-700">
                <AlertCircle className="h-5 w-5" /> Please fix the following:
              </div>
              <ul className="list-inside list-disc space-y-1 text-sm text-rose-600">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Trip details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
              Your Trip
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-navy-900">Dates</p>
                  {editDates ? (
                    <div className="mt-2 flex items-center gap-3">
                      <div>
                        <label className="block text-xs text-slate-400">Check-in</label>
                        <input
                          type="date"
                          value={checkin}
                          min={minDate}
                          onChange={(e) => {
                            setCheckin(e.target.value);
                            if (e.target.value) {
                              const d = new Date(e.target.value);
                              const nights = listing.duration.includes("3 Days") ? 2 : 1;
                              d.setDate(d.getDate() + nights + 1);
                              setCheckout(d.toISOString().split("T")[0]);
                            }
                          }}
                          className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400">Check-out</label>
                        <input
                          type="date"
                          value={checkout}
                          min={checkin || minDate}
                          onChange={(e) => setCheckout(e.target.value)}
                          className="mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-navy-900"
                        />
                      </div>
                      {checkin && (
                        <button
                          onClick={() => setEditDates(false)}
                          className="mt-5 text-sm font-bold text-blue-600"
                        >
                          Done
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">
                      {formatDate(checkin)} → {formatDate(checkout)}
                    </p>
                  )}
                </div>
                {!editDates && (
                  <button
                    onClick={() => setEditDates(true)}
                    className="text-sm font-bold text-blue-600 underline"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-navy-900">Guests</p>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-navy-900"
                  >
                    {Array.from({ length: listing.pax }, (_, i) => i + 1).map(
                      (n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                          {n === listing.pax ? " (max)" : ""}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
              Pay with
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => setPayMethod("card")}
                className={`flex w-full items-center gap-3 rounded-xl border p-4 transition ${
                  payMethod === "card"
                    ? "border-navy-900 bg-slate-50"
                    : "border-slate-200 hover:border-navy-900"
                }`}
              >
                <CreditCard className="h-5 w-5 text-navy-900" />
                <div className="text-left">
                  <p className="font-medium text-navy-900">Credit or Debit Card</p>
                  <p className="text-xs text-slate-500">
                    Visa, Mastercard, American Express
                  </p>
                </div>
              </button>
              <button
                onClick={() => setPayMethod("fpx")}
                className={`flex w-full items-center gap-3 rounded-xl border p-4 transition ${
                  payMethod === "fpx"
                    ? "border-navy-900 bg-slate-50"
                    : "border-slate-200 hover:border-navy-900"
                }`}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">
                  FP
                </div>
                <div className="text-left">
                  <p className="font-medium text-navy-900">
                    FPX Online Banking
                  </p>
                  <p className="text-xs text-slate-500">
                    Direct debit from Malaysian banks
                  </p>
                </div>
              </button>
            </div>

            {/* Card form */}
            {payMethod === "card" && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-900">
                    Card number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-navy-900">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-navy-900">
                      CVV
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {payMethod === "fpx" && (
              <div className="mt-6">
                <label className="mb-1 block text-sm font-medium text-navy-900">
                  Select your bank
                </label>
                <select
                  value={fpxBank}
                  onChange={(e) => setFpxBank(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                >
                  <option value="">Choose bank…</option>
                  <option>Maybank2u</option>
                  <option>CIMB Clicks</option>
                  <option>Public Bank</option>
                  <option>RHB Now</option>
                  <option>Hong Leong Connect</option>
                  <option>AmOnline</option>
                  <option>Bank Islam</option>
                  <option>Bank Rakyat</option>
                </select>
              </div>
            )}
          </div>

          {/* Guest info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
              Guest Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-900">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="Ahmad"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-900">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Ibrahim"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy-900">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="ahmad@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy-900">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+60 12 345 6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                />
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
              Cancellation Policy
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Free cancellation up to 7 days before your trip. After that, a 50%
              cancellation fee applies. No refunds within 48 hours of departure.
              Permit fees are non-refundable.{" "}
              <Link href="/cancellation" className="font-medium text-blue-600 underline">
                Full policy
              </Link>
            </p>
          </div>

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            disabled={submitting}
            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing…
              </span>
            ) : (
              <>Confirm & Pay — RM {total.toLocaleString()}</>
            )}
          </button>

          <p className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Lock className="h-3 w-3" /> Your payment is secured with 256-bit
            SSL encryption
          </p>
        </div>

        {/* Right – summary */}
        <div className="relative lg:col-span-2">
          <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Listing thumbnail */}
            <div className="mb-4 flex gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-navy-900 line-clamp-2">
                  {listing.title}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {listing.rating} ({listing.reviews} reviews)
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" /> {listing.location}
                </p>
              </div>
            </div>

            {/* Package details */}
            <div className="space-y-2 border-t border-slate-200 pt-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> {listing.duration}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5" /> Up to {listing.pax} guests
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />{" "}
                Verified Host
              </div>
            </div>

            {/* Price breakdown */}
            <div className="mt-6 space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>
                  RM {listing.price.toLocaleString()} × 1 trip
                </span>
                <span>RM {listing.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>RM {serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Permit fees</span>
                <span>RM {permitFee}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-bold text-navy-900">
              <span>Total</span>
              <span>RM {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
