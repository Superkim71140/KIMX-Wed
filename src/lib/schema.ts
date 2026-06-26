import { siteConfig } from "@/data/site";
import { siteUrl } from "./seo";
import { Article } from "@/data/articles";
import { NewsArticle } from "@/data/news";
import { NormalizedArticle } from "@/lib/articles/types";

/**
 * safeJsonLd — Serializes structured data objects to a JSON string and replaces
 * '<' characters with Unicode escape sequences to prevent script injection.
 */
export function safeJsonLd(data: any): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * getHomepageSchema — Constructs a single connected @graph containing metadata
 * for Organization, WebSite, WebPage, ProfessionalService, and FAQPage.
 */
export function getHomepageSchema() {
  const orgId = `${siteUrl}/#organization`;
  const webSiteId = `${siteUrl}/#website`;
  const webPageId = `${siteUrl}/#webpage`;
  const serviceId = `${siteUrl}/#service`;

  const organization = {
    "@type": "Organization",
    "@id": orgId,
    "name": "KIMX Web Agency",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      "url": `${siteUrl}/assets/images/logo%20kimxwed.png`,
      "caption": "KIMX Web Agency"
    },
    "sameAs": [
      siteConfig.facebookUrl,
      siteConfig.lineUrl
    ]
  };

  const website = {
    "@type": "WebSite",
    "@id": webSiteId,
    "name": "KIMX Web",
    "url": siteUrl,
    "publisher": {
      "@id": orgId
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const webpage = {
    "@type": "WebPage",
    "@id": webPageId,
    "url": siteUrl,
    "name": "รับทำเว็บไซต์ สมุทรสาคร | ออกแบบเว็บไซต์ SEO พร้อมระบบธุรกิจ - KIMX Web",
    "isPartOf": {
      "@id": webSiteId
    },
    "about": {
      "@id": orgId
    },
    "description": "KIMX Web รับทำเว็บไซต์สมุทรสาคร มหาชัย กระทุ่มแบน บ้านแพ้ว และกรุงเทพฯ ออกแบบเว็บไซต์บริษัท เว็บไซต์ธุรกิจ ระบบ E-commerce SEO และดูแลเว็บครบวงจร"
  };

  const localBusiness = {
    "@type": "ProfessionalService",
    "@id": serviceId,
    "name": "KIMX Web Agency",
    "image": `${siteUrl}/assets/images/logo%20kimxwed.png`,
    "telephone": siteConfig.telephone,
    "email": siteConfig.email,
    "url": siteUrl,
    "priceRange": "฿3,000 - ฿50,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "เมืองสมุทรสาคร",
      "addressLocality": "Mueang Samut Sakhon",
      "addressRegion": "Samut Sakhon",
      "postalCode": "74000",
      "addressCountry": "TH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.5475,
      "longitude": 100.2736
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Samut Sakhon" },
      { "@type": "AdministrativeArea", "name": "Bangkok" }
    ],
    "sameAs": [
      siteConfig.facebookUrl,
      siteConfig.lineUrl
    ]
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    "isPartOf": {
      "@id": webPageId
    },
    "mainEntity": [
      {
        "@type": "Question",
        "name": "รับทำเว็บไซต์ราคาเริ่มต้นเท่าไหร่?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ราคาเริ่มต้นที่ ฿3,000 สำหรับแพ็กเกจ Starter Kickoff (One Page) และ ฿3,500 สำหรับแพ็กเกจ Business Growth (สูงสุด 10 หน้า) ครับ"
        }
      },
      {
        "@type": "Question",
        "name": "ใช้เวลาทำเว็บไซต์กี่วัน?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "โดยทั่วไปแพ็กเกจ Starter ใช้เวลาประมาณ 3-7 วันทำการ ส่วนแพ็กเกจ Business ใช้เวลาประมาณ 7-14 วันทำการ ขึ้นอยู่กับปริมาณข้อมูลและคิวงานในขณะนั้นครับ"
        }
      },
      {
        "@type": "Question",
        "name": "ทำเว็บไซต์แล้วติด Google เลยไหม?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "เราวางโครงสร้าง Technical SEO และสร้าง Sitemap ส่งให้ Google Search Console ตั้งแต่ส่งมอบงาน ซึ่งช่วยให้ Google เข้ามาเก็บข้อมูลได้ไวขึ้น แต่การติดอันดับคีย์เวิร์ดที่มีการแข่งขันสูงจะขึ้นอยู่กับกลยุทธ์คอนเทนต์และการทำ SEO ในระยะยาวต่อไปครับ"
        }
      },
      {
        "@type": "Question",
        "name": "รองรับมือถือหรือไม่?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "เว็บไซต์ของเรารองรับการแสดงผลบนอุปกรณ์มือถือ แท็บเล็ต และคอมพิวเตอร์อย่างลื่นไหล 100% (Responsive Web Design) ครับ"
        }
      },
      {
        "@type": "Question",
        "name": "มีบริการดูแลเว็บไซต์หลังส่งมอบไหม?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "มีครับ ทุกแพ็กเกจดูแลฟรี 1 ปีเต็ม ครอบคลุมการสำรองข้อมูล ตรวจเช็คความปลอดภัย และอัปเดตข้อมูลทั่วไปตามขอบเขตแพ็กเกจ"
        }
      },
      {
        "@type": "Question",
        "name": "รับทำเว็บไซต์นอกสมุทรสาครไหม?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "รับทำครับ ถึงแม้เราจะเน้นให้บริการในสมุทรสาคร มหาชัย กระทุ่มแบน บ้านแพ้ว แต่เราดูแลลูกค้าทั่วประเทศและปริมณฑลผ่านช่องทางออนไลน์ได้อย่างรวดเร็วและเป็นระบบ"
        }
      }
    ]
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      webpage,
      localBusiness,
      faqPage
    ]
  };
}

export function getArticleSchema(article: Article | NewsArticle | NormalizedArticle) {
  const isNews = "categorySlug" in article && !!article.categorySlug;
  const canonicalUrl = isNews
    ? `${siteUrl}/news/${article.categorySlug}/${article.slug}`
    : `${siteUrl}/articles/${article.slug}`;

  const rawImage = "coverImage" in article && article.coverImage
    ? article.coverImage
    : ("image" in article && article.image ? article.image : "/images/og-fallback-brand.png");

  const absoluteImageUrl = rawImage.startsWith("http")
    ? rawImage
    : `${siteUrl}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

  const schemaType = isNews ? "NewsArticle" : "Article";
  const desc = "excerpt" in article ? article.excerpt : article.description;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${canonicalUrl}#article`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": article.title,
    "description": desc,
    "image": [absoluteImageUrl],
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": {
      "@type": "Person",
      "name": article.author || "KIMX Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KIMX Web Agency",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/assets/images/logo%20kimxwed.png`
      }
    }
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "หน้าหลัก",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isNews ? "ข่าวสาร" : "บทความ",
        "item": isNews ? `${siteUrl}/news` : `${siteUrl}/articles`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": canonicalUrl
      }
    ]
  };

  return [articleSchema, breadcrumbs];
}

export function getBreadcrumbsSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`
    }))
  };
}
