import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/", // Prevent search engine crawling on backend endpoint paths
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
