import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operator Dashboard — Manage Your Houseboat Listings",
  description:
    "Vendor dashboard for houseboat operators on Temenggor Lake. Manage bookings, listings, revenue, and guest communications.",
  robots: { index: false, follow: false },
};

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
