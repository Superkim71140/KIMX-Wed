import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { newsArticles } from "@/data/news";
import { buildMetadata, siteUrl } from "@/lib/seo";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import { getCategoryColorStyles, renderArticleCover } from "../page";

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
    label: "ข่าวรถยนต์",
    description: "อัปเดตข่าวสารในวงการรถยนต์ รีวิวรถยนต์ใหม่ เทคโนโลยียานยนต์ และกระแสอุตสาหกรรมยานยนต์ที่น่าสนใจ"
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

interface PageProps {
  params: Promise<{ category: string }>;
}

// Generate Static Params for build pre-rendering
export async function generateStaticParams() {
  return Object.keys(categoryMap).map((cat) => ({
    category: cat,
  }));
}

// Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const catInfo = categoryMap[category];

  if (!catInfo) {
    return {
      title: "ไม่พบหมวดหมู่ - KIMX Web",
    };
  }

  return buildMetadata({
    title: `${catInfo.label} | ข่าวสารและบทความ - KIMX Web`,
    description: catInfo.description,
    path: `/news/${category}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const catInfo = categoryMap[category];

  if (!catInfo) {
    notFound();
  }

  // Filter articles belonging to this category
  const filteredArticles = newsArticles.filter(
    (art) => art.categorySlug === category
  ).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Injected JSON-LD breadcrumbs and list
  const breadcrumbsSchema = {
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

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbsSchema, collectionSchema]) }}
      />

      {/* Adjust paddingTop for Apple-tier spacing to clear navbar cleanly */}
      <div className="relative pt-28 pb-24 overflow-hidden bg-transparent min-h-screen">
        {/* Glow orb removed */}

        {/* ===== BREADCRUMBS ===== */}
        <div className="mb-6 relative z-10">
          <Container>
            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 font-sans">
              <Link href="/" className="hover:text-slate-900 transition-colors duration-200">
                หน้าหลัก
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <Link href="/news" className="hover:text-slate-900 transition-colors duration-200">
                ข่าวสารและบทความ
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-slate-800 font-medium">{catInfo.label}</span>
            </div>
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
                <p className="text-slate-550 font-light font-sans">ยังไม่มีบทความในหมวดหมู่นี้</p>
                <Link href="/news" className="inline-block mt-4 text-sky-600 text-sm hover:underline font-sans">
                  กลับสู่หน้าข่าวสารทั้งหมด
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/news/${article.categorySlug}/${article.slug}`}
                    className="group block h-full"
                  >
                    <GlassCard
                      className="flex flex-col h-full !p-0 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-2xl border-none transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out"
                      hoverScale={false}
                      hoverGlow={false}
                    >
                      {/* Cover image */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-50">
                        {renderArticleCover(article.coverImage, article.title, article.category)}
                        <div className="absolute top-3.5 left-3.5 z-20">
                          <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md border backdrop-blur-md ${getCategoryColorStyles(article.categorySlug)}`}>
                            {article.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-[10px] sm:text-xs font-light text-slate-500 font-sans mb-3">
                          <Calendar size={12} className="text-slate-400" />
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span>•</span>
                          <Clock size={12} className="text-slate-400" />
                          <span>{article.readingTime}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-sky-600 transition-colors duration-300 line-clamp-2 mb-3 font-sans">
                          {article.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-light text-slate-650 leading-relaxed line-clamp-3 mb-6 font-sans">
                          {article.excerpt}
                        </p>

                        <div className="mt-auto pt-4 border-t border-sky-50 flex items-center justify-between text-xs text-slate-550 font-sans">
                          <span>โดย {article.author}</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-slate-850 group-hover:text-sky-600 transition-colors duration-300">
                            อ่านต่อ <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </main>
      </div>
    </>
  );
}
