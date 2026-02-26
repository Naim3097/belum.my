"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Mountain, Waves, TreePine, Eye, SlidersHorizontal, X } from "lucide-react";
import { activities, type Activity } from "@/data/activities";
import { motion } from "framer-motion";

const categories = ["All", "Water", "Jungle", "Culture", "Wildlife"] as const;

const catIcons: Record<string, React.ElementType> = {
  Water: Waves,
  Jungle: TreePine,
  Culture: Mountain,
  Wildlife: Eye,
};

export default function ActivitiesPage() {
  const [selected, setSelected] = useState<string>("All");

  const filtered = useMemo(() => {
    if (selected === "All") return activities;
    return activities.filter((a) => a.category === selected);
  }, [selected]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <section className="bg-navy-950 px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Houseboat Activities
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Everything you can do from the houseboat — water activities, jungle
          treks, cultural visits, and wildlife encounters. Most are included
          in standard packages.
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                selected === cat
                  ? "bg-navy-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-navy-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((activity, i) => (
            <Link key={activity.id} href={`/activity/${activity.slug}`}>
              <ActivityCard activity={activity} index={i} />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-lg text-slate-500">
            No activities found for this category.
          </p>
        )}
      </div>

      <Footer />
    </main>
  );
}

function ActivityCard({
  activity,
  index,
}: {
  activity: Activity;
  index: number;
}) {
  const Icon = catIcons[activity.category] || Mountain;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy-900 backdrop-blur-sm">
          <Icon className="h-3 w-3" />
          {activity.category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-navy-900 transition group-hover:text-blue-600">
          {activity.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {activity.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {activity.duration}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                activity.difficulty === "Easy"
                  ? "bg-emerald-50 text-emerald-600"
                  : activity.difficulty === "Moderate"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-rose-50 text-rose-600"
              }`}
            >
              {activity.difficulty}
            </span>
          </div>
          <span className="font-display font-bold text-navy-900">
            {activity.included ? (
              <span className="text-emerald-600">Included</span>
            ) : (
              <>RM {activity.price}</>  
            )}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
