import type { Metadata } from "next";
import { getHostBySlug } from "@/lib/queries/operators";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const host = await getHostBySlug(slug);

  if (!host) {
    return { title: "Booking" };
  }

  return {
    title: `Book ${host.name} — Temenggor Lake Houseboat`,
    description: `Complete your booking for ${host.name} houseboat cruise on Temenggor Lake.`,
    robots: { index: false, follow: false },
  };
}

export default function LandingBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
