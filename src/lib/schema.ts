import { siteConfig } from "@/data/site";
import { siteUrl } from "./seo";

export function getHomepageSchema() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#local-business`,
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
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      siteConfig.facebookUrl,
      siteConfig.lineUrl
    ],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Samut Sakhon"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Bangkok"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "System Maintenance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Website"
          }
        }
      ]
    }
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "KIMX Web Agency",
    "url": siteUrl,
    "logo": `${siteUrl}/assets/images/logo%20kimxwed.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.telephone,
      "contactType": "customer service",
      "areaServed": "TH",
      "availableLanguage": "Thai"
    },
    "sameAs": [
      siteConfig.facebookUrl,
      siteConfig.lineUrl
    ]
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "name": "KIMX Web",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

  return [localBusiness, organization, website, faqPage];
}

export function getArticleSchema(article: {
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
}) {
  const articleUrl = `${siteUrl}/articles/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "headline": article.title,
    "description": article.description,
    "image": article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": {
      "@type": "Person",
      "name": "KIMX Team"
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
        "name": "บทความ",
        "item": `${siteUrl}/articles`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": articleUrl
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
