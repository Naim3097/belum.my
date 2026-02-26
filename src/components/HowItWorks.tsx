"use client";

import { motion } from "framer-motion";
import { Search, UserCheck, CalendarCheck, Ship } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Pick a Houseboat",
    description:
      "Browse houseboats by type — standard, eco, adventure, family, or fishing. Each operator lists their boat capacity, amenities, and included activities.",
  },
  {
    icon: UserCheck,
    title: "Choose Your Activities",
    description:
      "Every houseboat package includes kayaking, bamboo rafting, and visit activities. Add on fishing passes, Sewang experiences, camping, or water tubing.",
  },
  {
    icon: CalendarCheck,
    title: "Book Your Trip",
    description:
      "Select 2D1N, 3D2N, or custom duration. Pricing is per boat (not per person). Confirm your group size and preferred dates directly with the operator.",
  },
  {
    icon: Ship,
    title: "Board at Pulau Banding",
    description:
      "Meet your captain at Jeti Awam Pulau Banding, Gerik. Your houseboat crew handles everything — meals, speedboat transfers, guides, equipment, and the adventure.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
            How Booking Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            From choosing your houseboat to boarding at the jetty — book your
            Temenggor Lake trip in a few steps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl bg-white p-8 shadow-sm border border-slate-100"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-amber-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="absolute right-6 top-6 font-display text-4xl font-bold text-slate-100">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-navy-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
