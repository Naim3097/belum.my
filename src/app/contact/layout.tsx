import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Belum Platform",
  description:
    "Get in touch with Belum Platform for houseboat booking enquiries, partnership opportunities, or general questions about Temenggor Lake and Royal Belum.",
  alternates: { canonical: "https://belumplatform.com/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
