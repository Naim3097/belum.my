import type { Metadata } from "next";
import { getListingById, getHostById } from "@/data/hosts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    return { title: "Listing Not Found" };
  }

  const host = getHostById(listing.hostId);
  const title = `${listing.title} — ${listing.hostName}`;
  const description = `${listing.description} ${listing.duration} for up to ${listing.pax} guests from RM${listing.price}. Book on Temenggor Lake, Royal Belum.`;

  return {
    title,
    description,
    keywords: [
      listing.title,
      listing.hostName,
      listing.duration,
      "houseboat package",
      "Temenggor Lake",
      "Royal Belum",
      ...listing.tags,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://belumplatform.com/listing/${id}`,
      images: [
        {
          url: listing.image,
          width: 1200,
          height: 630,
          alt: `${listing.title} — ${listing.hostName}`,
        },
        ...(host?.gallery.slice(0, 2).map((img) => ({
          url: img,
          width: 1200,
          height: 630,
          alt: `${listing.hostName} houseboat`,
        })) ?? []),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [listing.image],
    },
    alternates: {
      canonical: `https://belumplatform.com/listing/${id}`,
    },
  };
}

export default function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
