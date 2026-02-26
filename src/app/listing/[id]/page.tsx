"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Star,
  MapPin,
  Users,
  Clock,
  Check,
  Heart,
  Share,
  ChevronLeft,
  User,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { getListingById, getHostById, getAllListings } from "@/data/hosts";

export default function ListingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const listing = getListingById(id);
  if (!listing) return notFound();

  const host = getHostById(listing.hostId)!;
  const serviceFee = Math.round(listing.price * 0.05);
  const permitFee = 300;
  const total = listing.price + serviceFee + permitFee;

  // State for save/share
  const [isSaved, setIsSaved] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: listing!.title, url });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setShareMsg("Link copied!");
      setTimeout(() => setShareMsg(""), 2000);
    }
  }

  // State for booking widget
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(listing.pax);

  // Build booking URL with params
  const bookingParams = new URLSearchParams({
    listing: listing.id,
    ...(checkIn && { checkin: checkIn }),
    ...(checkOut && { checkout: checkOut }),
    ...(guests && { guests: guests.toString() }),
  });

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Other packages from this host
  const otherPackages = getAllListings().filter(
    (l) => l.hostId === host.id && l.id !== listing.id
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/search"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-navy-900"
          >
            <ChevronLeft className="h-4 w-4" /> Back to search
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-navy-900"
            >
              <Share className="h-4 w-4" /> {shareMsg || "Share"}
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-2 text-sm font-medium transition ${
                isSaved ? "text-rose-500" : "text-slate-600 hover:text-rose-500"
              }`}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-rose-500" : ""}`} /> {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="mb-3 font-display text-3xl font-bold text-navy-900 md:text-4xl">
            {listing.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1 font-bold text-navy-900">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {listing.rating}
              <span className="font-normal text-slate-500">
                ({listing.reviews} reviews)
              </span>
            </div>
            <span>&middot;</span>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {listing.location}
            </div>
            {listing.verified && (
              <>
                <span>&middot;</span>
                <div className="flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 font-bold text-emerald-600">
                  <ShieldCheck className="h-4 w-4" /> Verified Host
                </div>
              </>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-12 grid h-[320px] grid-cols-1 gap-3 overflow-hidden rounded-2xl md:h-[460px] md:grid-cols-4 md:grid-rows-2">
          <div
            className="group relative cursor-pointer md:col-span-2 md:row-span-2"
            onClick={() => setLightbox(0)}
          >
            <Image
              src={host.gallery[0]}
              alt={host.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {host.gallery.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="group relative hidden cursor-pointer md:block"
              onClick={() => setLightbox(i + 1)}
            >
              <Image
                src={img}
                alt={`${host.name} gallery ${i + 2}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="25vw"
              />
              {i === 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-navy-900/40">
                  <span className="rounded-lg border-2 border-white px-4 py-2 font-bold text-white backdrop-blur-sm">
                    All photos
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 text-3xl text-white/80 transition hover:text-white"
            >
              &times;
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + host.gallery.length) % host.gallery.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-2xl text-white backdrop-blur transition hover:bg-white/40"
            >
              &#8249;
            </button>
            <div className="relative h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <Image
                src={host.gallery[lightbox]}
                alt={`${host.name} photo ${lightbox + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % host.gallery.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-2xl text-white backdrop-blur transition hover:bg-white/40"
            >
              &#8250;
            </button>
            <div className="absolute bottom-6 text-sm text-white/70">
              {lightbox + 1} / {host.gallery.length}
            </div>
          </div>
        )}

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left – details */}
          <div className="space-y-10 lg:col-span-2">
            {/* Host */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
              <div>
                <h2 className="mb-1 font-display text-xl font-bold text-navy-900">
                  Hosted by {host.captain}
                </h2>
                <p className="text-slate-600">
                  Up to {listing.pax} guests &middot; {listing.duration}
                </p>
              </div>
              <Link
                href={`/host/${host.slug}`}
                className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-500 transition hover:ring-2 hover:ring-amber-500"
              >
                <User className="h-7 w-7" />
              </Link>
            </div>

            {/* Highlights */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
                Package Highlights
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {listing.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <Check className="h-5 w-5 text-emerald-500" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
                About {host.name}
              </h2>
              <p className="leading-relaxed text-slate-600">
                {host.longDescription}
              </p>
            </div>

            {/* Amenities */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="mb-6 font-display text-xl font-bold text-navy-900">
                What&rsquo;s included
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {host.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <Check className="h-5 w-5 text-emerald-500" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Captain bio */}
            <div className="border-b border-slate-200 pb-6">
              <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
                Your Captain
              </h2>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-amber-400">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-navy-900">{host.captain}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {host.captainBio}
                  </p>
                  <div className="mt-3 flex gap-4 text-xs text-slate-500">
                    <span>Response rate: {host.responseRate}%</span>
                    <span>Responds {host.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Other packages */}
            {otherPackages.length > 0 && (
              <div>
                <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
                  Other packages from {host.name}
                </h2>
                <div className="space-y-3">
                  {otherPackages.map((pkg) => (
                    <Link
                      key={pkg.id}
                      href={`/listing/${pkg.id}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-navy-900 hover:shadow-sm"
                    >
                      <div>
                        <p className="font-bold text-navy-900">
                          {pkg.packageName}
                        </p>
                        <p className="mt-0.5 flex items-center gap-2 text-sm text-slate-500">
                          <Clock className="h-3 w-3" /> {pkg.duration}
                          <span>&middot;</span>
                          <Users className="h-3 w-3" /> Up to {pkg.pax}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-navy-900">
                          RM {pkg.price.toLocaleString()}
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right – booking widget */}
          <div className="relative">
            <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <span className="font-display text-2xl font-bold text-navy-900">
                    RM {listing.price.toLocaleString()}
                  </span>
                  <span className="text-slate-500"> / trip</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-navy-900">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />{" "}
                  {listing.rating}
                </div>
              </div>

              {/* Date / guests */}
              <div className="mb-4 overflow-hidden rounded-xl border border-slate-300">
                <div className="grid grid-cols-2 border-b border-slate-300">
                  <div className="border-r border-slate-300 p-3">
                    <label className="block text-[10px] font-bold uppercase text-navy-900">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={minDate}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        // Auto-set checkout based on duration
                        if (e.target.value) {
                          const d = new Date(e.target.value);
                          const nights = listing.duration.includes("3 Days") ? 2 : 1;
                          d.setDate(d.getDate() + nights + 1);
                          setCheckOut(d.toISOString().split("T")[0]);
                        }
                      }}
                      className="mt-1 w-full text-sm outline-none"
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-[10px] font-bold uppercase text-navy-900">
                      Checkout
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || minDate}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="mt-1 w-full text-sm outline-none"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-[10px] font-bold uppercase text-navy-900">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="mt-1 w-full bg-transparent text-sm outline-none"
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

              <Link
                href={`/booking?${bookingParams.toString()}`}
                className="mb-4 block w-full rounded-xl bg-blue-600 py-4 text-center text-lg font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500"
              >
                Reserve
              </Link>
              <p className="mb-6 text-center text-sm text-slate-500">
                You won&rsquo;t be charged yet
              </p>

              <div className="space-y-3 border-b border-slate-200 pb-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span className="underline">
                    RM {listing.price.toLocaleString()} × 1 trip
                  </span>
                  <span>RM {listing.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Service fee</span>
                  <span>RM {serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Permit fees</span>
                  <span>RM {permitFee}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 text-lg font-bold text-navy-900">
                <span>Total</span>
                <span>RM {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}