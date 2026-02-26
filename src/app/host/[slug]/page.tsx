"use client";

import { use } from "react";
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
  ChevronLeft,
  User,
  ShieldCheck,
  Calendar,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { getHostBySlug, getListingsByHost } from "@/data/hosts";

export default function HostProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const host = getHostBySlug(slug);
  if (!host) return notFound();

  const listings = getListingsByHost(host.id);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero banner */}
      <div className="relative h-64 overflow-hidden md:h-80">
        <Image
          src={host.gallery[0]}
          alt={host.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/search"
              className="mb-4 inline-flex items-center gap-1 text-sm text-white/70 transition hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" /> All hosts
            </Link>
            <div className="flex items-end gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 text-amber-400 ring-4 ring-white/20">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
                  {host.name}
                </h1>
                <p className="text-white/70">{host.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left – main content */}
          <div className="space-y-10 lg:col-span-2">
            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="font-display text-lg font-bold text-navy-900">
                  {host.rating}
                </span>
                <span className="text-sm text-slate-500">
                  ({host.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" /> {host.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users className="h-4 w-4" /> Up to {host.capacity} guests
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="h-4 w-4" /> Joined {host.joinedYear}
              </div>
              {host.verified && (
                <div className="flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-sm font-bold text-emerald-600">
                  <ShieldCheck className="h-4 w-4" /> Verified
                </div>
              )}
            </div>

            {/* About */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-bold text-navy-900">
                About {host.name}
              </h2>
              <p className="leading-relaxed text-slate-600">
                {host.longDescription}
              </p>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-bold text-navy-900">
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {host.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl"
                  >
                    <Image
                      src={img}
                      alt={`${host.name} ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="mb-4 font-display text-2xl font-bold text-navy-900">
                Onboard Amenities
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

            {/* Packages */}
            <div>
              <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">
                Available Packages
              </h2>
              <div className="space-y-4">
                {listings.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/listing/${listing.id}`}
                    className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-navy-900 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-navy-900 transition group-hover:text-blue-600">
                        {listing.packageName}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {listing.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> Up to {listing.pax}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {listing.highlights.slice(0, 4).map((h) => (
                          <span
                            key={h}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="font-display text-2xl font-bold text-navy-900">
                          RM {listing.price.toLocaleString()}
                        </span>
                        <span className="block text-xs text-slate-500">
                          per trip
                        </span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:text-navy-900" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar – host card */}
          <div className="relative">
            <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {/* Captain */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-amber-400">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-display font-bold text-navy-900">
                    {host.captain}
                  </p>
                  <p className="text-sm text-slate-500">
                    {host.category} &middot; Joined {host.joinedYear}
                  </p>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                {host.captainBio}
              </p>

              <div className="mb-6 space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Response rate</span>
                  <span className="font-bold text-navy-900">
                    {host.responseRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Response time</span>
                  <span className="font-bold text-navy-900">
                    {host.responseTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity</span>
                  <span className="font-bold text-navy-900">
                    {host.capacity} pax
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/60108692982?text=Hi%2C%20I%E2%80%99m%20interested%20in%20a%20houseboat%20trip%20with%20" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-navy-900 py-3 font-bold text-navy-900 transition hover:bg-slate-50"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Host
              </a>

              <Link
                href={`/landing/${host.slug}`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 py-3 font-bold text-white transition hover:bg-navy-800"
              >
                <ArrowRight className="h-4 w-4" />
                Visit Landing Page
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
