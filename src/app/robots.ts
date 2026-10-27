import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Category + product routes (/shop/**) and legal pages stay crawlable.
      allow: "/",
      disallow: [
        "/api/",
        "/cart",
        "/checkout",
        "/admin",
        "/account",
        "/login",
        "/search/analytics",
        // internal-search result URLs create duplicate/thin content
        "/*?q=",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}