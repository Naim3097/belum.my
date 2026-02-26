import type { Metadata } from "next";
import { getHostBySlug } from "@/data/hosts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const host = getHostBySlug(slug);

  if (!host) {
    return { title: "Host Not Found" };
  }

  const title = `${host.name} — Houseboat on Temenggor Lake`;
  const description = `${host.tagline}. ${host.description} Book ${host.name} for ${host.capacity} guests on Temenggor Lake, Royal Belum.`;

  return {
    title,
    description,
    keywords: [
      host.name,
      "houseboat",
      "Temenggor Lake",
      "Royal Belum",
      host.category,
      host.captain,
      ...host.amenities.slice(0, 5),
    ],
    openGraph: {
      title,
      description,
      type: "profile",
      url: `https://belumplatform.com/host/${slug}`,
      images: host.gallery.slice(0, 3).map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: `${host.name} houseboat on Temenggor Lake`,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [host.gallery[0]],
    },
    alternates: {
      canonical: `https://belumplatform.com/host/${slug}`,
    },
  };
}

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
