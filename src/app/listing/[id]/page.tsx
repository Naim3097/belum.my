import { notFound } from "next/navigation";
import {
  getListingById,
  getHostById,
  getListingsByHost,
} from "@/lib/queries/operators";
import ListingDetailClient from "./ListingDetailClient";

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  const host = await getHostById(listing.hostId);
  if (!host) notFound();

  const otherPackages = (await getListingsByHost(host.id)).filter(
    (l) => l.id !== listing.id
  );

  return (
    <ListingDetailClient
      listing={listing}
      host={host}
      otherPackages={otherPackages}
    />
  );
}
