import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/vendor", "/booking/confirmation"],
      },
    ],
    sitemap: "https://belumplatform.com/sitemap.xml",
  };
}
