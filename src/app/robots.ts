import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/drafts/"], // Prevent search engine crawling on APIs and drafts
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
