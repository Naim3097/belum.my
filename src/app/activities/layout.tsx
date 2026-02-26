import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities — Things to Do at Temenggor Lake & Royal Belum",
  description:
    "Discover 19 activities at Temenggor Lake and Royal Belum Rainforest — kayaking, bamboo rafting, jungle trekking, sport fishing, Orang Asli village visits, waterfall hikes, bird watching, and more.",
  keywords: [
    "Temenggor activities",
    "Royal Belum things to do",
    "kayaking Temenggor",
    "bamboo rafting Royal Belum",
    "fishing Temenggor Lake",
    "jungle trekking Perak",
    "Orang Asli visit",
    "bird watching Royal Belum",
  ],
  alternates: { canonical: "https://belumplatform.com/activities" },
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
