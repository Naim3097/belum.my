"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const categories = [
  "All",
  "Guide",
  "Nature",
  "Culture",
  "Adventure",
  "News",
] as const;

export default function BlogPageClient() {
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === filter);

  const featured = blogPosts[0];
  const rest =
    filter === "All"
      ? filtered.filter((p) => p.slug !== featured.slug)
      : filtered;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-navy-950 pt-28 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">
              Journal
            </p>
            <h1 className="mb-4 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Stories from the Rainforest
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              Guides, travel stories, and insights from the people who know
              Temenggor Lake and Royal Belum best.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {filter === "All" && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="mb-16"
            >
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-0 overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl md:grid-cols-2"
              >
                <div className="relative h-64 overflow-hidden md:h-auto">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white">
                    Featured
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <span className="mb-2 text-xs font-medium uppercase tracking-wider text-amber-600">
                    {featured.category}
                  </span>
                  <h2 className="mb-3 font-display text-2xl font-bold text-navy-900 transition-colors group-hover:text-blue-600 sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mb-4 leading-relaxed text-slate-500">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                      {featured.author} &middot;{" "}
                      {new Date(featured.date).toLocaleDateString("en-MY", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <span className="text-sm text-slate-400">
                      {featured.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Category Filter */}
          <div className="mb-10 flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-navy-900 text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                layout
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm">
                      <span className="text-xs font-medium text-navy-900">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col p-6">
                    <h3 className="mb-2 line-clamp-2 font-display text-lg font-bold text-navy-900 transition-colors group-hover:text-blue-600">
                      {post.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 flex-1 text-sm text-slate-500">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {rest.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-500">
                No articles in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
