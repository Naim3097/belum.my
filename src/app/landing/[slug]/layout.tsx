import type { Metadata } from "next";
import { hosts } from "@/data/hosts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const host = hosts.find((h) => h.slug === slug);

  if (!host) {
    return { title: "Host Not Found" };
  }

  const title = `${host.name} — Houseboat Cruises on Temenggor Lake`;
  const description = `${host.tagline}. Explore ${host.packages.length} cruise packages aboard ${host.name} on Temenggor Lake, Royal Belum State Park. Captain ${host.captain}, up to ${host.capacity} guests.`;

  return {
    title,
    description,
    keywords: [
      host.name,
      "houseboat cruise",
      "Temenggor Lake",
      "Royal Belum",
      host.captain,
      "Perak",
      "Malaysia",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://belumplatform.com/landing/${slug}`,
      images: host.gallery.slice(0, 3).map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: `${host.name} — Houseboat on Temenggor Lake`,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [host.gallery[0]],
    },
    alternates: {
      canonical: `https://belumplatform.com/landing/${slug}`,
    },
  };
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
