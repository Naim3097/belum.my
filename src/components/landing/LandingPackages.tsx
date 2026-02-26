"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Clock } from "lucide-react";
import type { Host } from "@/data/hosts";

interface Props {
  host: Host;
}

export default function LandingPackages({ host }: Props) {
  // Build display packages from host data
  const displayPackages = host.packages.map((pkg, i) => ({
    id: String(i + 1).padStart(2, "0"),
    title: pkg.name,
    duration: pkg.duration === "Custom" ? "Custom Duration" : pkg.duration,
    price: pkg.price > 0 ? `RM ${pkg.price.toLocaleString()}` : "Bespoke Pricing",
    capacity: pkg.pax > 0 ? `Up to ${pkg.pax} Persons` : "Flexible",
    description:
      pkg.highlights.length > 0
        ? `${pkg.highlights.slice(0, 2).join(". ")}. A curated experience on Temenggor Lake.`
        : host.description,
    image: host.gallery[i] || host.image,
    features: pkg.highlights,
    bookable: pkg.price > 0,
    packageId: pkg.id,
  }));

  return (
    <section id="packages" className="py-32 bg-stone-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-earth-700 tracking-widest uppercase text-sm mb-6 block">
              Curated Journeys
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-forest-900 leading-tight">
              Choose your level of immersion.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 md:mt-0"
          >
            <p className="text-stone-600 max-w-md text-lg">
              Every package is designed to provide a seamless transition from
              the noise of the city to the silence of the wild.
            </p>
          </motion.div>
        </div>

        <div className={`grid grid-cols-1 gap-10 ${displayPackages.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {displayPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group bg-stone-50 flex flex-col h-full"
            >
              <div className="relative h-80 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-stone-50/90 backdrop-blur-sm px-4 py-2">
                  <span className="font-serif text-forest-900">
                    Package {pkg.id}
                  </span>
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-3xl font-serif text-forest-900 mb-4">
                  {pkg.title}
                </h3>

                <div className="flex flex-wrap gap-4 mb-6 text-sm text-stone-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-earth-700" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-earth-700" />
                    <span>{pkg.capacity}</span>
                  </div>
                </div>

                <p className="text-stone-600 mb-8 leading-relaxed flex-grow">
                  {pkg.description}
                </p>

                <div className="space-y-3 mb-10">
                  {pkg.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-earth-600 mt-2" />
                      <span className="text-stone-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  {pkg.features.length > 3 && (
                    <div className="text-sm text-earth-700 italic mt-2">
                      + {pkg.features.length - 3} more inclusions
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-stone-200 flex items-center justify-between mt-auto">
                  <div>
                    <span className="block text-xs tracking-widest uppercase text-stone-500 mb-1">
                      {pkg.bookable ? "Starting from" : "Pricing"}
                    </span>
                    <span className="text-xl font-serif text-forest-900">
                      {pkg.price}
                    </span>
                  </div>
                  {pkg.bookable ? (
                    <Link
                      href={`/landing/${host.slug}/book?package=${pkg.id}`}
                      className="w-12 h-12 rounded-full border border-forest-900 flex items-center justify-center text-forest-900 group-hover:bg-forest-900 group-hover:text-stone-50 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  ) : (
                    <a
                      href="#contact"
                      className="w-12 h-12 rounded-full border border-forest-900 flex items-center justify-center text-forest-900 group-hover:bg-forest-900 group-hover:text-stone-50 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
