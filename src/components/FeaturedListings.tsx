"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ShieldCheck, Users } from "lucide-react";
import type { Host } from "@/data/hosts";
import FavoriteButton from "@/components/FavoriteButton";

export default function FeaturedListings({ hosts }: { hosts: Host[] }) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-900">
              Houseboats & Operators
            </h2>
            <p className="mt-1 text-slate-500">
              {hosts.length} houseboat operators on Temenggor Lake &amp; Royal Belum.
            </p>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-2 text-sm font-bold text-navy-900 transition hover:text-blue-600 md:flex"
          >
            View all packages →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {hosts.map((host, i) => {
            const pricedPackages = host.packages.filter((p) => p.price > 0);
            const fromPrice = pricedPackages.length
              ? Math.min(...pricedPackages.map((p) => p.price))
              : null;
            return (
            <motion.div
              key={host.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <Link href={`/host/${host.slug}`} className="block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={host.image}
                    alt={host.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <FavoriteButton
                    operatorId={host.id}
                    className="absolute right-3 top-3"
                  />
                  {host.verified && (
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-navy-900/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy-900 backdrop-blur-sm">
                    {host.category}
                  </div>
                </div>

                {/* Info */}
                <div className="mt-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-display font-bold text-navy-900 transition group-hover:text-blue-600">
                      {host.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-navy-900">
                        {host.rating}
                      </span>
                    </div>
                  </div>

                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-3 w-3" /> {host.location}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <Users className="h-3 w-3" /> Up to {host.capacity} guests
                    &middot; {host.captain}
                  </p>

                  {/* price range from packages */}
                  <div className="mt-3 flex items-baseline gap-1">
                    {fromPrice !== null ? (
                      <>
                        <span className="font-display text-lg font-bold text-navy-900">
                          From RM {fromPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-500">/ trip</span>
                      </>
                    ) : (
                      <span className="font-display text-lg font-bold text-navy-900">
                        Custom pricing
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <Link
                href={`/landing/${host.slug}`}
                className="mt-2 block text-center text-xs font-semibold uppercase tracking-wider text-navy-900 transition hover:text-blue-600"
              >
                View Landing Page →
              </Link>
            </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/search"
            className="inline-block rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-navy-900 transition hover:bg-slate-50"
          >
            View all packages
          </Link>
        </div>
      </div>
    </section>
  );
}
