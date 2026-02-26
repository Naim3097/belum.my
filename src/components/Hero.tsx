"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Calendar, Users, MapPin, Star, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { hosts } from "@/data/hosts";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const router = useRouter();
  const featured = hosts[0]; // The Temenggor as hero host

  const [houseboat, setHouseboat] = useState("");
  const [duration, setDuration] = useState("");
  const [groupSize, setGroupSize] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (houseboat) params.set("host", houseboat);
    if (duration) params.set("duration", duration);
    if (groupSize) params.set("pax", groupSize);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left – copy + search */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h1
              custom={0}
              variants={fadeUp}
              className="font-display text-5xl font-bold leading-[1.08] text-navy-900 md:text-6xl lg:text-7xl"
            >
              Book a Houseboat
              <br />
              <span className="bg-gradient-to-r from-navy-900 to-blue-600 bg-clip-text text-transparent">
                on Temenggor Lake
              </span>
            </motion.h1>

            <motion.p
              custom={1}
              variants={fadeUp}
              className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600"
            >
              {hosts.length} houseboat operators. Kayaking, bamboo rafting,
              jungle trekking, fishing, Orang Asli village visits — the
              community around Royal Belum, all bookable from one place.
            </motion.p>

            {/* Search widget */}
            <motion.div
              custom={2}
              variants={fadeUp}
              className="mt-10 max-w-xl rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
            >
              <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">
                {/* Houseboat */}
                <div className="rounded-xl p-4 transition hover:bg-slate-50">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-navy-900">
                    Houseboat
                  </label>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                    <select
                      value={houseboat}
                      onChange={(e) => setHouseboat(e.target.value)}
                      className="w-full appearance-none bg-transparent text-navy-900 outline-none"
                    >
                      <option value="">All operators</option>
                      {hosts.map((h) => (
                        <option key={h.id} value={h.slug}>
                          {h.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="h-3 w-3 shrink-0 text-slate-400" />
                  </div>
                </div>

                {/* Duration */}
                <div className="rounded-xl p-4 transition hover:bg-slate-50">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-navy-900">
                    Duration
                  </label>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full appearance-none bg-transparent text-navy-900 outline-none"
                    >
                      <option value="">Any duration</option>
                      <option value="2D1N">2 Days 1 Night</option>
                      <option value="3D2N">3 Days 2 Nights</option>
                    </select>
                    <ChevronDown className="h-3 w-3 shrink-0 text-slate-400" />
                  </div>
                </div>

                {/* Group Size + Search */}
                <div className="relative rounded-xl p-4 transition hover:bg-slate-50">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-navy-900">
                    Group Size
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 shrink-0 text-slate-400" />
                      <select
                        value={groupSize}
                        onChange={(e) => setGroupSize(e.target.value)}
                        className="w-full appearance-none bg-transparent text-navy-900 outline-none"
                      >
                        <option value="">Any size</option>
                        <option value="10">1 – 10 pax</option>
                        <option value="20">11 – 20 pax</option>
                        <option value="25">21 – 25 pax</option>
                        <option value="30">25+ pax</option>
                      </select>
                    </div>
                    <button
                      onClick={handleSearch}
                      className="absolute right-2 top-2 rounded-xl bg-navy-900 p-3 text-white shadow-md transition hover:bg-navy-800"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              custom={3}
              variants={fadeUp}
              className="mt-8 flex items-center gap-6 text-sm text-slate-500"
            >
              <span className="font-medium">Departs from:</span>
              <div className="flex gap-4 font-display font-bold opacity-60">
                <span>JETI AWAM PULAU BANDING</span>
                <span>&middot; GERIK, PERAK</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right – image grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative grid h-[520px] grid-cols-2 gap-4 lg:h-[600px]"
          >
            {/* Large left */}
            <div className="relative col-span-1 row-span-2 overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                priority
              />
              <div className="absolute bottom-6 left-6 rounded-xl border border-white/20 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
                <p className="font-display font-bold text-navy-900">
                  {featured.name}
                </p>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-600">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-amber-500">{featured.rating}</span>
                  <span>({featured.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Top right */}
            <div className="relative col-span-1 row-span-1 overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={hosts[3].image}
                alt={hosts[3].name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute right-4 top-4 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-md">
                Adventure
              </div>
            </div>

            {/* Bottom right – stat card */}
            <div className="group col-span-1 row-span-1 flex cursor-pointer items-center justify-center overflow-hidden rounded-3xl bg-navy-900 p-8 text-center shadow-xl transition hover:bg-navy-800">
              <div>
                <h3 className="font-display text-3xl font-bold text-white">
                  {hosts.length}
                </h3>
                <p className="mb-4 text-sm text-slate-300">Houseboats</p>
                <Link
                  href="/search"
                  className="text-xs font-bold uppercase tracking-widest text-amber-400 transition hover:text-amber-300"
                >
                  Browse All Packages →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
