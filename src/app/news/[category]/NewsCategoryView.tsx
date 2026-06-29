import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getArticleRegistry } from "@/lib/articles/registry";
import { getLatestArticles } from "@/lib/articles/featured";
import { buildMetadata, siteUrl } from "@/lib/seo";
import Container from "@/components/ui/Container";
import CategoryArticleGrid from "@/components/news/CategoryArticleGrid";
import { safeJsonLd } from "@/lib/schema";

// Category Details Mapping
const categoryMap: Record<string, { label: string; description: string }> = {
  "ai": {
    label: "ข่าว AI",
    description: "อัปเดตข่าวสารในวงการปัญญาประดิษฐ์ (Artificial Intelligence) เทคโนโลยี และการปฏิวัติวงการไอทีล่าสุด"
  },
  "phone": {
    label: "โทรศัพท์",
    description: "ข่าวสาร อัปเดต และรีวิวโทรศัพท์มือถือ สมาร์ทโฟนรุ่นใหม่ล่าสุด ตลอดจนฟีเจอร์ AI บนมือถือ"
  },
  "game": {
    label: "เกมส์",
    description: "อัปเดตข่าวสารวงการเกมส์ อีสปอร์ต รีวิวอุปกรณ์เกมมิ่งเกียร์ และเทคโนโลยีที่เกมเมอร์ต้องรู้"
  },
  "tech": {
    label: "Tech Update",
    description: "อัปเดตกระแสข่าวสารเทคโนโลยี อุปกรณ์ และซอฟต์แวร์ใหม่ ๆ สำหรับชีวิตประจำวันและธุรกิจยุคดิจิทัล"
  },
  "automotive": {
    label: "หมวดยานยนต์",
    description: "อัปเดตข่าวสารในวงการยานยนต์ รีวิวรถยนต์ใหม่ มอเตอร์ไซค์ และกระแสอุตสาหกรรมยานยนต์ที่น่าสนใจ"
  },
  "cyber-security": {
    label: "Cyber Security",
    description: "แนวทางการรักษาความปลอดภัยทางไซเบอร์ การป้องกันระบบหลังบ้าน และการปกป้องฐานข้อมูลสำหรับเจ้าของเว็บ"
  },
  "digital-business": {
    label: "ธุรกิจดิจิทัล",
    description: "เทคนิคการตลาดออนไลน์ กลยุทธ์อีคอมเมิร์ซ และการนำดิจิทัลเทคโนโลยีมาลดต้นทุนเพิ่มยอดขายให้ SMEs"
  },
  "how-to": {
    label: "How-to",
    description: "คู่มืออธิบายการตั้งค่าและการสอนระบบดิจิทัลแบบเป็นขั้นตอน ทำตามง่าย ได้ผลลัพธ์จริง"
  }
};

export const revalidate = 86400;

interface ViewProps {
  params: Promise<{ category: string }>;
}

// Generate Static Params for build pre-rendering
export async function generateStaticParams() {
  return Object.keys(categoryMap).map((cat) => ({
    category: cat,
  }));
}

// Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: ViewProps): Promise<Metadata> {
  const { category } = await params;
  const catInfo = categoryMap[category];

  if (!catInfo) {
    return buildMetadata({
      title: "ไม่พบหมวดหมู่",
      noIndex: true,
      path: `/news/${category}`,
    });
  }

  return buildMetadata({
    title: `${catInfo.label} | ข่าวสารและบทความ`,
    description: catInfo.description,
    path: `/news/${category}`,
  });
}

export default async function NewsCategoryView({ params }: ViewProps) {
  const { category } = await params;
  const catInfo = categoryMap[category];

  if (!catInfo) {
    notFound();
  }

  // Filter articles belonging to this category using registry and selector
  const articles = getArticleRegistry();
  const filteredArticles = getLatestArticles(articles, { categorySlug: category });

  // Injected JSON-LD breadcrumbs and list
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/news/${category}#breadcrumb`,
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
        "name": "ข่าวสารและบทความ",
        "item": `${siteUrl}/news`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": catInfo.label,
        "item": `${siteUrl}/news/${category}`
      }
    ]
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/news/${category}#collection-page`,
    "url": `${siteUrl}/news/${category}`,
    "name": `${catInfo.label} | ข่าวสารและบทความ - KIMX Web`,
    "description": catInfo.description,
    "publisher": {
      "@type": "Organization",
      "name": "KIMX Web Agency",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/assets/images/logo%20kimxwed.png`
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filteredArticles.map((art, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `${siteUrl}/news/${art.categorySlug}/${art.slug}`,
        "name": art.title
      }))
    }
  };

  const schemas = [breadcrumbsSchema, collectionSchema];

  return (
    <>
      {/* Schema Injection */}
      {Array.isArray(schemas) ? (
        schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
          />
        ))
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(schemas) }}
        />
      )}

      {/* Adjust paddingTop for Apple-tier spacing to clear navbar cleanly */}
      <div className="relative pt-28 pb-24 overflow-hidden bg-transparent min-h-screen">
        {/* ===== BREADCRUMBS ===== */}
        <div className="mb-6 relative z-10">
          <Container>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm font-medium text-slate-600 font-sans m-0 p-0 list-none">
                <li>
                  <Link href="/" className="hover:text-slate-900 transition-colors duration-200">
                    หน้าหลัก
                  </Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={14} className="text-slate-400" /></li>
                <li>
                  <Link href="/news" className="hover:text-slate-900 transition-colors duration-200">
                    ข่าวสารและบทความ
                  </Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={14} className="text-slate-400" /></li>
                <li>
                  <span className="text-slate-800 font-medium" aria-current="page">{catInfo.label}</span>
                </li>
              </ol>
            </nav>
          </Container>
        </div>

        {/* ===== HEADER ===== */}
        <header className="relative z-10 text-center pt-2 pb-6 md:pt-4 md:pb-8 mb-6 sm:mb-8">
          <Container>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-sans">
              {catInfo.label}
            </h1>
            <p className="text-slate-500 font-normal text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              {catInfo.description}
            </p>
          </Container>
        </header>

        {/* ===== MAIN LISTING ===== */}
        <main className="relative z-10">
          <Container>
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-500 font-light font-sans">ยังไม่มีบทความในหมวดหมู่นี้</p>
                <Link href="/news" className="inline-block mt-4 text-sky-600 text-sm hover:underline font-sans">
                  กลับสู่หน้าข่าวสารทั้งหมด
                </Link>
              </div>
            ) : (
              <CategoryArticleGrid articles={filteredArticles} category={category} />
            )}
          </Container>
        </main>
      </div>
    </>
  );
}
