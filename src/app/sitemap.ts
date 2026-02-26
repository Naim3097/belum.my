import type { MetadataRoute } from "next";
import { hosts } from "@/data/hosts";
import { blogPosts } from "@/data/blogs";
import { activities } from "@/data/activities";

const BASE = "https://belumplatform.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /* ─── Static pages ─── */
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${BASE}/search`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/activities`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/help`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE}/safety`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE}/cancellation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  /* ─── Host profiles ─── */
  const hostPages: MetadataRoute.Sitemap = hosts.map((h) => ({
    url: `${BASE}/host/${h.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  /* ─── Landing pages ─── */
  const landingPages: MetadataRoute.Sitemap = hosts.flatMap((h) => [
    {
      url: `${BASE}/landing/${h.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE}/landing/${h.slug}/book`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]);

  /* ─── Blog posts ─── */
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  /* ─── Activity pages ─── */
  const activityPages: MetadataRoute.Sitemap = activities.map((a) => ({
    url: `${BASE}/activity/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  /* ─── Listing detail pages ─── */
  const listingPages: MetadataRoute.Sitemap = hosts.flatMap((h) =>
    h.packages
      .filter((p) => p.price > 0)
      .map((p) => ({
        url: `${BASE}/listing/${p.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
  );

  return [
    ...staticPages,
    ...hostPages,
    ...landingPages,
    ...blogPages,
    ...activityPages,
    ...listingPages,
  ];
}
