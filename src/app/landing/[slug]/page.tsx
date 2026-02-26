"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { hosts } from "@/data/hosts";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingPackages from "@/components/landing/LandingPackages";
import LandingActivities from "@/components/landing/LandingActivities";
import LandingContact from "@/components/landing/LandingContact";
import LandingFooter from "@/components/landing/LandingFooter";

export default function LandingPage() {
  const params = useParams();
  const slug = params.slug as string;
  const host = hosts.find((h) => h.slug === slug);

  if (!host) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-forest-900 mb-4">
            Host Not Found
          </h1>
          <p className="text-stone-600 mb-8">
            The houseboat you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="px-8 py-3 bg-forest-900 text-stone-50 uppercase tracking-widest text-sm hover:bg-forest-700 transition-colors"
          >
            Browse All Houseboats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <LandingNavbar host={host} />

      {/* ─── Hero Section ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={host.gallery[0]}
            alt={host.name}
            className="w-full h-full object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-forest-900/40 to-forest-900/80" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-earth-600 tracking-[0.3em] uppercase text-sm mb-6 block">
              Tasik Temenggor · Royal Belum
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-50 mb-6 leading-[1.1]"
          >
            {host.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-xl md:text-2xl text-stone-300 mb-4 font-light italic"
          >
            {host.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-stone-400 mb-12 max-w-2xl mx-auto text-lg"
          >
            {host.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <a
              href="#packages"
              className="px-10 py-4 border border-earth-600 text-earth-600 uppercase tracking-[0.2em] text-sm hover:bg-earth-600 hover:text-stone-50 transition-all duration-500"
            >
              Begin Your Journey
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-stone-400/40 mx-auto mb-3" />
          <span className="text-stone-400/60 text-xs tracking-[0.3em] uppercase">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ─── Philosophy / About Section ─── */}
      <section id="experience" className="py-32 bg-stone-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-earth-600 tracking-widest uppercase text-sm mb-6 block">
                The Experience
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-forest-900 mb-8 leading-tight">
                Where the rainforest
                <br />
                meets the water.
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-8">
                {host.longDescription}
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-forest-900 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={host.gallery[1] || host.image}
                    alt={host.captain}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-forest-900">{host.captain}</p>
                  <p className="text-stone-500 text-sm">{host.name}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={host.gallery[2] || host.gallery[0]}
                  alt={`${host.name} scenery`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-forest-900 text-stone-50 p-8 w-48">
                <p className="text-4xl font-serif mb-1">130M</p>
                <p className="text-earth-600 tracking-widest uppercase text-xs">
                  Years Old
                </p>
                <p className="text-stone-400 text-sm mt-2">
                  One of the oldest rainforests on Earth
                </p>
              </div>
            </motion.div>
          </div>

          {/* Captain Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 max-w-4xl mx-auto text-center"
          >
            <span className="text-earth-600 tracking-widest uppercase text-sm mb-6 block">
              Your Captain
            </span>
            <h3 className="text-3xl md:text-4xl font-serif text-forest-900 mb-8">
              {host.captain}
            </h3>
            <p className="text-stone-600 text-lg leading-relaxed">
              {host.captainBio}
            </p>
          </motion.div>

          {/* Gallery strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {host.gallery.slice(0, 4).map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${host.name} gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Packages ─── */}
      <LandingPackages host={host} />

      {/* ─── Activities ─── */}
      <LandingActivities host={host} />

      {/* ─── Contact ─── */}
      <LandingContact host={host} />

      {/* ─── Footer ─── */}
      <LandingFooter host={host} />
    </div>
  );
}
