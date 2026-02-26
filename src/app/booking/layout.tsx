import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Houseboat — Temenggor Lake",
  description:
    "Complete your houseboat booking on Temenggor Lake. Select dates, guests, and confirm your Royal Belum rainforest experience.",
  robots: { index: false, follow: true },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
