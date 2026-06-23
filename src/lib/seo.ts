import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kimxweb.com";
export const defaultTitle = "รับทำเว็บไซต์ สมุทรสาคร | ออกแบบเว็บไซต์ SEO พร้อมระบบธุรกิจ - KIMX Web";
export const titleTemplate = "%s | KIMX Web";
export const defaultDescription = "KIMX Web รับทำเว็บไซต์สมุทรสาคร มหาชัย กระทุ่มแบน บ้านแพ้ว และกรุงเทพฯ ออกแบบเว็บไซต์บริษัท เว็บไซต์ธุรกิจ ระบบ E-commerce SEO และดูแลเว็บครบวงจร โทร 092-837-1926";

interface MetadataInput {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: MetadataInput = {}): Metadata {
  const canonicalUrl = `${siteUrl}${path}`;
  const displayTitle = title ? title : defaultTitle;
  const displayDescription = description || defaultDescription;

  return {
    title: title ? {
      absolute: displayTitle,
    } : {
      default: defaultTitle,
      template: titleTemplate,
    },
    description: displayDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: displayTitle,
      description: displayDescription,
      url: canonicalUrl,
      siteName: "KIMX Web Agency",
      locale: "th_TH",
      type: "website",
      images: [
        {
          url: `${siteUrl}/assets/images/logo kimxwed.png`,
          width: 800,
          height: 800,
          alt: "KIMX Web Agency Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: displayDescription,
      images: [`${siteUrl}/assets/images/logo kimxwed.png`],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    metadataBase: new URL(siteUrl),
  };
}

export function buildArticleMetadata(
  article: {
    title: string;
    description: string;
    slug: string;
    image: string;
    updatedAt: string;
    publishedAt: string;
  }
): Metadata {
  const path = `/articles/${article.slug}`;
  const canonicalUrl = `${siteUrl}${path}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonicalUrl,
      siteName: "KIMX Web Agency",
      locale: "th_TH",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: ["KIMX Team"],
      images: [
        {
          url: article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`],
    },
    metadataBase: new URL(siteUrl),
  };
}
