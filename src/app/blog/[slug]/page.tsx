import type { Metadata } from "next";
import { blogPosts, getBlogBySlug } from "@/data/blogs";
import BlogPostClient from "./BlogPostClient";

/* ─── Static params for SSG ─── */
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

/* ─── Dynamic metadata per blog post ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) {
    return { title: "Post Not Found | Belum Platform" };
  }

  return {
    title: `${post.title} | Belum Platform Blog`,
    description: post.excerpt,
    keywords: [
      post.title,
      post.category,
      "Temenggor Lake",
      "Royal Belum",
      "houseboat",
      "Perak Malaysia",
    ],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://belumplatform.com/blog/${post.slug}`,
      siteName: "Belum Platform",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1280,
          height: 720,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://belumplatform.com/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <BlogPostClient params={params} />;
}
