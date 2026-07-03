import { notFound } from "next/navigation";
import { getHostBySlug } from "@/lib/queries/operators";
import LandingBookClient from "./LandingBookClient";

export default async function LandingBookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const host = await getHostBySlug(slug);
  if (!host) notFound();

  return <LandingBookClient host={host} />;
}
