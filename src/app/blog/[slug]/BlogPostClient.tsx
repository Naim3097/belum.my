"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogBySlug, blogPosts } from "@/data/blogs";

export default function BlogPostClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // JSON-LD structured data for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Belum Platform",
      url: "https://belumplatform.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://belumplatform.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Navbar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] pt-20">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-navy-950/40 to-navy-950/60" />
      </section>

      {/* Article */}
      <section className="relative z-10 -mt-32 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl bg-white p-8 shadow-lg md:p-12"
          >
            {/* Back */}
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-navy-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Category */}
            <span className="mb-4 inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="mb-6 font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-slate-200 pb-8 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-MY", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            {/* Content */}
            <div
              className="prose prose-slate prose-lg max-w-none
                prose-headings:font-display prose-headings:font-bold prose-headings:text-navy-900
                prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl
                prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl
                prose-p:leading-relaxed prose-p:text-slate-600
                prose-strong:text-navy-900
                prose-li:text-slate-600
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700
                prose-table:text-sm
                prose-th:bg-navy-900/5 prose-th:px-4 prose-th:py-2 prose-th:font-medium prose-th:text-navy-900
                prose-td:border-slate-200 prose-td:px-4 prose-td:py-2
              "
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />
          </motion.article>
        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl font-bold text-navy-900">
            More Articles
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {relatedPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-500 hover:shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-amber-600">
                    {p.category}
                  </span>
                  <h3 className="mt-1 line-clamp-2 font-display text-base font-bold text-navy-900 transition-colors group-hover:text-blue-600">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400">{p.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/**
 * Simple markdown-to-HTML converter for blog content.
 * Handles headings, bold, italic, lists, ordered lists, tables, links, paragraphs.
 */
function markdownToHtml(md: string): string {
  const lines = md.trim().split("\n");
  let html = "";
  let inList = false;
  let inOl = false;
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === "") {
      if (inList) { html += "</ul>"; inList = false; }
      if (inOl) { html += "</ol>"; inOl = false; }
      if (inTable) { html += "</tbody></table>"; inTable = false; }
      continue;
    }

    // Table separator
    if (/^\|[\s\-:|]+\|$/.test(line.trim())) continue;

    // Table rows
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line.trim().slice(1, -1).split("|").map((c) => c.trim());
      if (!inTable) {
        html += "<table><thead><tr>";
        cells.forEach((c) => { html += `<th>${inlineFmt(c)}</th>`; });
        html += "</tr></thead><tbody>";
        inTable = true;
        continue;
      }
      html += "<tr>";
      cells.forEach((c) => { html += `<td>${inlineFmt(c)}</td>`; });
      html += "</tr>";
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h3>${inlineFmt(line.slice(4))}</h3>`;
      continue;
    }
    if (line.startsWith("## ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h2>${inlineFmt(line.slice(3))}</h2>`;
      continue;
    }

    // Unordered list
    if (line.trim().startsWith("- ")) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${inlineFmt(line.trim().slice(2))}</li>`;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      if (!inOl) { html += "<ol>"; inOl = true; }
      html += `<li>${inlineFmt(line.trim().replace(/^\d+\.\s/, ""))}</li>`;
      continue;
    }

    // Paragraph
    if (inList) { html += "</ul>"; inList = false; }
    if (inOl) { html += "</ol>"; inOl = false; }
    html += `<p>${inlineFmt(line)}</p>`;
  }

  if (inList) html += "</ul>";
  if (inOl) html += "</ol>";
  if (inTable) html += "</tbody></table>";

  return html;
}

function inlineFmt(text: string): string {
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
  text = text.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return text;
}
