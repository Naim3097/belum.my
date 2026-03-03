import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://belumplatform.com"),
  title: {
    default: "Belum Platform — Houseboat Booking for Temenggor Lake & Royal Belum",
    template: "%s | Belum Platform",
  },
  description:
    "Book houseboats and activities on Temenggor Lake, Perak. Kayaking, bamboo rafting, jungle trekking, fishing, and Orang Asli village visits from verified local operators in the Royal Belum Rainforest — the oldest in the world.",
  keywords: [
    "Temenggor Lake",
    "Royal Belum",
    "houseboat booking",
    "houseboat Malaysia",
    "Tasik Temenggor",
    "Royal Belum Rainforest",
    "Gerik Perak",
    "Pulau Banding",
    "jungle trekking Perak",
    "bamboo rafting",
    "Temenggor fishing",
    "Orang Asli village visit",
    "rainforest experience Malaysia",
    "houseboat cruise",
  ],
  authors: [{ name: "Belum Platform", url: "https://belumplatform.com" }],
  creator: "The Temenggor Ventures",
  publisher: "Belum Platform",
  formatDetection: { telephone: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://belumplatform.com",
    siteName: "Belum Platform",
    title: "Belum Platform — Houseboat Booking for Temenggor Lake & Royal Belum",
    description:
      "6 curated houseboats on Temenggor Lake. Gateway to the 130-million-year-old Royal Belum Rainforest, Perak, Malaysia.",
    images: [
      {
        url: "/images/houseboat-01.png",
        width: 1280,
        height: 853,
        alt: "Temenggor Lake, Royal Belum Rainforest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Belum Platform — Houseboat Booking for Temenggor Lake",
    description:
      "6 curated houseboats. Kayaking, jungle trekking, fishing, and more on Malaysia's oldest rainforest lake.",
    images: [
      "/images/houseboat-01.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://belumplatform.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://belumplatform.com/#org",
        name: "Belum Platform",
        alternateName: "The Temenggor Ventures",
        url: "https://belumplatform.com",
        logo: "https://belumplatform.com/logo.png",
        description:
          "The booking platform for houseboats and activities on Temenggor Lake & Royal Belum Rainforest, Perak, Malaysia.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+60108692982",
          contactType: "customer service",
          email: "the.temenggor@gmail.com",
          availableLanguage: ["English", "Malay"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jeti Awam Pulau Banding",
          addressLocality: "Gerik",
          addressRegion: "Perak",
          postalCode: "33200",
          addressCountry: "MY",
        },
        sameAs: [
          "https://www.facebook.com/profile.php?id=100064088498498",
          "https://www.instagram.com/thetemenggor",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://belumplatform.com/#website",
        url: "https://belumplatform.com",
        name: "Belum Platform",
        publisher: { "@id": "https://belumplatform.com/#org" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://belumplatform.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "TouristDestination",
        name: "Temenggor Lake & Royal Belum Rainforest",
        description:
          "A 130-million-year-old tropical rainforest surrounding a 15,000-hectare freshwater lake in Perak, Malaysia. Home to 10 hornbill species, Asian elephants, Malayan tigers, and indigenous Orang Asli communities.",
        geo: {
          "@type": "GeoCoordinates",
          latitude: 5.4672,
          longitude: 101.3431,
        },
        touristType: [
          "Eco-tourists",
          "Anglers",
          "Nature photographers",
          "Families",
          "Adventure travellers",
        ],
        includesAttraction: [
          {
            "@type": "NaturalFeature",
            name: "Royal Belum State Park",
          },
          {
            "@type": "BodyOfWater",
            name: "Temenggor Lake (Tasik Temenggor)",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
