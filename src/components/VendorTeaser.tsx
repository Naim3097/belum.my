"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LineChart, Users, BarChart3, Shield } from "lucide-react";

export default function VendorTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy-950 px-4 py-24 text-slate-50 sm:px-6 lg:px-8">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -left-64 -top-64 h-[500px] w-[500px] rounded-full bg-blue-600 blur-[120px]" />
        <div className="absolute -bottom-64 -right-64 h-[500px] w-[500px] rounded-full bg-amber-500 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy-700 bg-navy-800 px-4 py-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                For Houseboat Operators
              </span>
            </div>

            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              List your houseboat
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                with the community.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
              Own a houseboat on Temenggor Lake? Join Belum and get your
              packages in front of travellers looking for exactly what you
              offer — cruises, fishing, activities, and the rainforest experience.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "List your houseboat & packages",
                "Receive booking requests directly",
                "Showcase your activities & community",
                "Manage crew, schedules & availability",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-800 text-emerald-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/vendor"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-900/50 transition hover:bg-blue-500"
            >
              List Your Houseboat
            </Link>
          </motion.div>

          {/* Right mock dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-xl flex-1"
          >
            <div className="relative rounded-2xl border border-navy-700 bg-navy-900 p-6 shadow-2xl">
              {/* Header skeleton */}
              <div className="mb-8 flex items-center justify-between border-b border-navy-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-800" />
                  <div>
                    <div className="mb-2 h-2 w-24 rounded bg-slate-700" />
                    <div className="h-2 w-16 rounded bg-slate-800" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded bg-navy-800" />
                  <div className="h-8 w-8 rounded bg-navy-800" />
                </div>
              </div>

              {/* Stats */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-navy-800 p-4">
                  <LineChart className="mb-2 h-6 w-6 text-emerald-400" />
                  <div className="font-display text-2xl font-bold">RM 12,450</div>
                  <div className="text-xs text-slate-400">Revenue (Feb)</div>
                </div>
                <div className="rounded-xl bg-navy-800 p-4">
                  <Users className="mb-2 h-6 w-6 text-blue-400" />
                  <div className="font-display text-2xl font-bold">86%</div>
                  <div className="text-xs text-slate-400">Occupancy Rate</div>
                </div>
              </div>

              {/* Recent bookings */}
              <div className="space-y-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recent Bookings
                </div>
                {["The Temenggor", "Blue Fern", "Casuarina"].map((name) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-lg bg-navy-800/50 p-3 transition hover:bg-navy-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-xs font-bold text-blue-400">
                        HB
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200">
                          {name}
                        </div>
                        <div className="text-xs text-slate-500">
                          Feb 24 – Feb 26
                        </div>
                      </div>
                    </div>
                    <div className="rounded bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-400">
                      Upcoming
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating notification */}
              <div className="absolute -bottom-6 -right-6 hidden animate-bounce rounded-xl bg-amber-500 p-4 shadow-lg md:block">
                <span className="text-sm font-bold text-navy-900">
                  New Booking! +RM 3,500
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
