import { notFound } from "next/navigation";
import { getHostBySlug } from "@/lib/queries/operators";
import LandingPageClient from "./LandingPageClient";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const host = await getHostBySlug(slug);
  if (!host) notFound();

  return <LandingPageClient host={host} />;
}
