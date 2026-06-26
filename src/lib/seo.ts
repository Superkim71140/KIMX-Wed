import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://kimx-wed.vercel.app").replace(/\/$/, "");
export const defaultTitle = "รับทำเว็บไซต์ สมุทรสาคร | ออกแบบเว็บไซต์ SEO พร้อมระบบธุรกิจ - KIMX Web";
export const defaultDescription = "KIMX Web รับทำเว็บไซต์สมุทรสาคร มหาชัย กระทุ่มแบน บ้านแพ้ว และกรุงเทพฯ ออกแบบเว็บไซต์บริษัท เว็บไซต์ธุรกิจ ระบบ E-commerce SEO และดูแลเว็บครบวงจร โทร 092-837-1926";

interface MetadataInput {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * formatTitle — Formats page titles by appending the brand suffix exactly once,
 * avoiding duplicate brand names like "KIMX Web | KIMX Web".
 */
export function formatTitle(title?: string): string {
  if (!title) return defaultTitle;
  
  if (title.includes("KIMX Web")) {
    return title;
  }
  
  return `${title} | KIMX Web`;
}

/**
 * buildMetadata — Central metadata factory. Constructs canonical absolute URLs
 * using the safe URL constructor and sets up uniform SEO configurations.
 */
export function buildMetadata({
  title,
  description,
  path = "",
  noIndex = false,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: MetadataInput = {}): Metadata {
  // Enforce leading slash on paths for clean URL construction
  const sanitizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = new URL(sanitizedPath, siteUrl).toString();
  
  const displayTitle = formatTitle(title);
  const displayDescription = description || defaultDescription;

  // Resolve absolute preview image URL
  let imageUrl = new URL("/assets/images/logo kimxwed.png", siteUrl).toString();
  if (image) {
    imageUrl = image.startsWith("http")
      ? image
      : new URL(image.startsWith("/") ? image : `/${image}`, siteUrl).toString();
  }

  const openGraph: Record<string, any> = {
    type,
    locale: "th_TH",
    siteName: "KIMX Web",
    url: canonicalUrl,
    title: displayTitle,
    description: displayDescription,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title || "KIMX Web",
      },
    ],
  };

  // Add Article-specific parameters if rendering an editorial canvas
  if (type === "article") {
    if (publishedTime) openGraph.publishedTime = publishedTime;
    if (modifiedTime) openGraph.modifiedTime = modifiedTime;
    if (author) openGraph.authors = [author];
  }

  return {
    title: displayTitle,
    description: displayDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: displayDescription,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    applicationName: "KIMX Web",
    creator: "KIMX Web Agency",
    metadataBase: new URL(siteUrl),
  };
}

/**
 * buildArticleMetadata — Legacy wrapper kept for backwards compatibility.
 * Delegates to buildMetadata under the hood.
 */
export function buildArticleMetadata(
  article: {
    title: string;
    description: string;
    slug: string;
    image: string;
    updatedAt: string;
    publishedAt: string;
    categorySlug?: string;
  }
): Metadata {
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: article.categorySlug 
      ? `/news/${article.categorySlug}/${article.slug}`
      : `/articles/${article.slug}`,
    image: article.image,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    author: "KIMX Team",
  });
}

