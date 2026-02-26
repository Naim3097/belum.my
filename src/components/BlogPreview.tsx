"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogs";

export default function BlogPreview() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-amber-600">
              Journal
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-900">
              Stories from the Rainforest
            </h2>
            <p className="mt-1 text-slate-500">
              Guides, travel stories, and insights from the lake.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-bold text-navy-900 transition hover:text-blue-600 md:flex"
          >
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Posts */}
        <div className="grid gap-8 md:grid-cols-3">
          {latest.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full overflow-hidden rounded-2xl bg-slate-50 shadow-sm transition-all duration-500 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm">
                    <span className="text-xs font-medium text-navy-900">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="line-clamp-2 font-display text-lg font-bold text-navy-900 transition-colors group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-400">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-block rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-navy-900 transition hover:bg-slate-50"
          >
            Read all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
