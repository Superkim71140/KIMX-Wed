import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ChevronRight, BookOpen, ArrowLeft, User, Sparkles } from "lucide-react";
import { newsArticles } from "@/data/news";
import { buildMetadata, siteUrl } from "@/lib/seo";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import CTAButton from "@/components/ui/CTAButton";
import ShareButtons from "@/components/news/ShareButtons";
import BenchmarkBar from "@/components/articles/BenchmarkBar";
import { getCategoryColorStyles, renderArticleCover } from "../../page";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    category: article.categorySlug,
    slug: article.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = newsArticles.find(
    (art) => art.slug === slug && art.categorySlug === category
  );

  if (!article) {
    return {
      title: "บทความไม่พบ - KIMX Web",
    };
  }

  return buildMetadata({
    title: `${article.title} | KIMX Web`,
    description: article.excerpt,
    path: `/news/${article.categorySlug}/${article.slug}`,
  });
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const article = newsArticles.find(
    (art) => art.slug === slug && art.categorySlug === category
  );

  if (!article) {
    notFound();
  }

  // Related articles in the same category (or fallback to other articles) to fill exactly 3 cards
  let relatedArticles = newsArticles.filter(
    (art) => art.categorySlug === category && art.slug !== slug
  );
  if (relatedArticles.length < 3) {
    const fallbacks = newsArticles.filter(
      (art) => art.slug !== slug && !relatedArticles.some((r) => r.slug === art.slug)
    );
    relatedArticles = [...relatedArticles, ...fallbacks].slice(0, 3);
  }

  // Generate Table of Contents
  const headingBlocks = article.content.filter((block) => block.type === "heading");
  const firstParagraphIndex = article.content.findIndex((block) => block.type === "paragraph");

  // JSON-LD Schemas
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
        "name": article.category,
        "item": `${siteUrl}/news/${article.categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": article.title,
        "item": `${siteUrl}/news/${article.categorySlug}/${article.slug}`
      }
    ]
  };

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/news/${article.categorySlug}/${article.slug}`
    },
    "headline": article.title,
    "description": article.excerpt,
    "image": article.coverImage.startsWith("http")
      ? article.coverImage
      : `${siteUrl}/assets/images/logo%20kimxwed.png`,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": {
      "@type": "Person",
      "name": article.author
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

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, newsArticleSchema]),
        }}
      />

      {/* Adjust paddingTop to 40 (approx 160px) to clear both navbar & sub-navbar */}
      <div className="relative pt-48 pb-24 overflow-hidden bg-transparent font-sans">
        {/* Glow - Ultra Minimalist */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-200/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Container className="relative z-10">
          
          {/* ===== BREADCRUMBS ===== */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-4 font-sans">
            <Link href="/" className="hover:text-sky-600 transition-colors duration-200">
              หน้าหลัก
            </Link>
            <span>&gt;</span>
            <Link href="/news" className="hover:text-sky-600 transition-colors duration-200">
              ข่าวสาร
            </Link>
            <span>&gt;</span>
            <span className="text-slate-500 font-medium">{article.category}</span>
          </div>

          {/* ===== CATEGORY BADGE ===== */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-bold text-teal-600 bg-teal-500/10 rounded-full">
              {article.category}
            </span>
          </div>

          {/* ===== ARTICLE HEADER HERO ===== */}
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6 mt-2 max-w-4xl">
              {article.title}
            </h1>

            {/* Consolidated Metadata Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 mb-6 pb-6 border-b border-slate-100 font-sans">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-slate-300" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-300" />
                <span>{new Date(article.publishedAt).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-slate-300" />
                <span>{article.readingTime}</span>
              </div>
              {article.updatedAt !== article.publishedAt && (
                <span className="text-slate-300 font-light font-sans">(อัปเดตล่าสุด: {new Date(article.updatedAt).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })})</span>
              )}
            </div>
              
            <div className="mb-8">
              <Link
                href="https://www.facebook.com/profile.php?id=61588114826420"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0674E8] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-700 hover:bg-[#045cb8] hover:shadow-md"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                <span>FOLLOW KIMX ON FACEBOOK</span>
              </Link>
            </div>
          </header>

          {/* ===== ARTICLE COVER IMAGE ===== */}
          <div className={`relative w-full overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-100/50 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.03)] mb-10 ${article.coverFit === 'contain' ? 'aspect-video p-4 sm:p-8' : 'aspect-[16/9]'}`}>
            {article.coverImage.startsWith("linear-gradient") || article.coverImage.includes("gradient") ? (
              <div
                className="w-full h-full flex items-center justify-center p-8 relative rounded-2xl overflow-hidden"
                style={{ background: article.coverImage }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
                <div className="z-10 bg-white/95 border border-sky-100/60 backdrop-blur-md px-6 py-4 rounded-2xl text-center shadow-md">
                  <span className="text-xs tracking-[0.25em] uppercase font-bold text-sky-600 font-sans block mb-1">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-500 font-light tracking-wider uppercase">
                    KIMX TECH HUB
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    priority
                    className={`${article.coverFit === 'contain' ? 'object-contain scale-95 drop-shadow-2xl' : 'object-cover object-center'} transition-transform duration-700 group-hover:scale-105`}
                  />
                  {article.coverFit !== 'contain' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                  )}
                </div>
              </>
            )}
          </div>

          {/* ===== 2-COLUMN STRUCTURAL GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 relative items-start">
            
            {/* LEFT COLUMN - MAIN EDITORIAL CANVAS (7 cols) */}
            <div className="lg:col-span-7 w-full max-w-3xl mx-auto lg:mx-0">
              
              {/* Takeaways / AI Summary Component */}
              <div className="mb-10 font-sans">
                <div className="bg-white/80 border border-slate-200/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.02)] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-400 to-indigo-500" />
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Sparkles size={14} className="text-sky-500" />
                    สรุปประเด็นสำคัญ (Takeaways)
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                      <span className="text-sky-500 font-bold shrink-0">•</span>
                      เนื้อหานี้ถูกประมวลผลเพื่อดึงแก่นสำคัญมาช่วยย่นเวลาการอ่านของคุณ
                    </li>
                    <li className="flex gap-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                      <span className="text-sky-500 font-bold shrink-0">•</span>
                      คุณสามารถทำความเข้าใจสาระสำคัญของข่าวสารได้ภายในไม่กี่นาที
                    </li>
                  </ul>
                </div>
              </div>

              {/* ===== MAIN RICH CONTENT ===== */}
              <main className="w-full text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
            {article.content.map((block, idx) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p
                      key={idx}
                      className="font-sans whitespace-pre-line text-base md:text-[1.05rem] text-slate-600/90 font-normal leading-relaxed mb-6 antialiased max-w-3xl mx-auto px-4 md:px-0"
                    >
                      {block.text}
                    </p>
                  );
                case "heading":
                  return (
                    <h2
                      key={idx}
                      id={encodeURIComponent(block.text)}
                      className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mt-10 mb-4 max-w-3xl mx-auto px-4 md:px-0 flex items-center gap-2 font-sans scroll-mt-36"
                    >
                      {block.text}
                    </h2>
                  );
                case "highlight":
                  return (
                    <GlassCard
                      key={idx}
                      className={`my-10 !p-6 sm:!p-8 rounded-3xl relative overflow-hidden ${getCategoryColorStyles(article.categorySlug)}`}
                      hoverScale={false}
                    >
                      {block.title && (
                        <h4 className="text-sm sm:text-base font-bold mb-3 font-sans">
                          {block.title}
                        </h4>
                      )}
                      <p className="text-sm font-medium leading-relaxed font-sans whitespace-pre-line opacity-90">
                        {block.text}
                      </p>
                    </GlassCard>
                  );
                case "quote":
                  return (
                    <blockquote
                      key={idx}
                      className="my-8 pl-5 sm:pl-6 border-l-4 border-sky-500 italic text-slate-800 font-sans"
                    >
                      <p className="text-base sm:text-lg font-light leading-relaxed mb-2">
                        &ldquo;{block.text}&rdquo;
                      </p>
                      {block.author && (
                        <cite className="text-xs text-slate-600 not-italic block font-normal font-sans">
                          — {block.author}
                        </cite>
                      )}
                    </blockquote>
                  );
                case "stats":
                  return (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
                      {block.items.map((item, index) => (
                        <div
                          key={index}
                          className="p-6 rounded-3xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-transparent flex flex-col justify-center"
                        >
                          <span className="text-2xl sm:text-3xl font-extrabold text-sky-600 font-sans">
                            {item.value}
                          </span>
                          <span className="text-xs text-slate-550 font-light font-sans mt-1">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                case "table":
                  return (
                    <div key={idx} className="my-10 overflow-x-auto rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-transparent bg-white font-sans text-xs sm:text-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-sky-50/50 border-b border-sky-100">
                            {block.headers.map((h, i) => (
                              <th key={i} className="px-4 py-3 font-semibold text-slate-900">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-sky-50 last:border-0 hover:bg-sky-50/10 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-3 font-light text-slate-700">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                case "features-grid":
                  return (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-10">
                      {block.items.map((item, index) => (
                        <div
                          key={index}
                          className="p-6 sm:p-8 rounded-3xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-transparent flex flex-col gap-3 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
                        >
                          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold font-sans">✓</span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h4>
                          <p className="text-xs sm:text-sm font-light text-slate-650 leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  );
                case "green-box":
                  return (
                    <div
                      key={idx}
                      className="my-8 p-5 sm:p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/50 shadow-[inner_0_4px_12px_rgba(16,185,129,0.02)] relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-emerald-500" />
                      <h4 className="text-sm sm:text-base font-bold text-emerald-800 mb-3 font-sans flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{block.title}</span>
                      </h4>
                      <p className="text-xs sm:text-sm font-light text-emerald-850 leading-relaxed font-sans whitespace-pre-line">
                        {block.text}
                      </p>
                    </div>
                  );
                case "image":
                  return (
                    <figure key={idx} className="my-12 relative max-w-3xl mx-auto px-4 md:px-0">
                      <div className="relative w-full aspect-[16/10] sm:aspect-video overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-100/50 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.03)] mb-10 group">
                        <Image
                          src={block.src}
                          alt={block.alt}
                          fill
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="mt-3 text-center text-[13px] text-slate-500 font-light font-sans px-4">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                case "share-buttons":
                  return (
                    <ShareButtons
                      key={idx}
                      shareUrl={block.shareUrl}
                      reviewUrl={block.reviewUrl}
                    />
                  );
                case "benchmark":
                  return (
                    <GlassCard
                      key={idx}
                      className="my-12 !p-6 sm:!p-8 rounded-3xl bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-200/60"
                      hoverScale={false}
                    >
                      <div className="mb-6 flex items-center gap-2">
                        <div className="w-2 h-6 rounded-full bg-slate-900" />
                        <h4 className="text-lg font-bold text-slate-900 tracking-tight font-sans">
                          Performance Benchmark
                        </h4>
                      </div>
                      <div className="flex flex-col gap-2">
                        {block.items.map((item, bIdx) => (
                          <BenchmarkBar
                            key={bIdx}
                            label={item.label}
                            score={item.score}
                            maxScore={item.maxScore}
                            color={item.color}
                            accentColor="#14B8A6"
                          />
                        ))}
                      </div>
                    </GlassCard>
                  );
                default:
                  return null;
              }
            })}
          </main>

          {/* ===== TAGS ===== */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-sky-100 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-sans font-medium text-slate-700 bg-slate-100 border border-slate-200/60 px-3 py-1.5 rounded-md hover:bg-slate-200/70 hover:border-slate-300 transition-colors duration-400 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - SIDEBAR (3 cols) */}
        {headingBlocks.length > 0 && (
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 bg-white/80 border border-slate-200/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.02)] rounded-2xl p-6 sm:p-8 font-sans">
              <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase mb-6 flex items-center gap-2">
                <BookOpen size={16} className="text-sky-600" />
                <span>สารบัญเนื้อหา</span>
              </h3>
              <ul className="space-y-3">
                {headingBlocks.map((block, i) => (
                  <li key={i}>
                    <a
                      href={`#${encodeURIComponent(block.text)}`}
                      className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500/50 mt-1.5 flex-shrink-0" />
                      <span className="font-medium line-clamp-2">{block.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

          {/* ===== BOTTOM CTA ACTION PANEL ===== */}
          <section className="my-24">
            <GlassCard
              className="!border-none bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] !p-10 sm:!p-16 text-center relative overflow-hidden rounded-3xl"
              hoverScale={false}
              hoverGlow={true}
            >
              {/* Decorative side glows */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-sky-200/5 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-indigo-200/5 rounded-full blur-xl pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4 leading-snug font-sans">
                อยากให้เว็บไซต์ธุรกิจของคุณมีบทความ SEO แบบนี้ทุกสัปดาห์?
              </h3>
              
              <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto font-sans">
                ปรึกษา KIMX Web ได้เลย! เราให้บริการรับทำเว็บไซต์บริษัท ออกแบบระบบธุรกิจ และมีบริการผลิตเนื้อหา SEO ช่วยสร้างยอดขาย ดึงดูดลูกค้าคุณภาพมาสู่หน้าร้านออนไลน์ของคุณแบบยั่งยืน
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <CTAButton
                  variant="primary"
                  size="md"
                  href="/#contact"
                  className="flex items-center justify-center gap-2 font-sans"
                >
                  <span>ปรึกษา KIMX Web</span>
                </CTAButton>
                
                <CTAButton
                  variant="outline"
                  size="md"
                  href="/#services"
                  className="border-sky-200 text-slate-800 hover:bg-sky-100/50 font-sans"
                >
                  <span>ดูบริการของเรา</span>
                </CTAButton>
              </div>
            </GlassCard>
          </section>
        </Container>

        {/* ===== RELATED ARTICLES SECTION ===== */}
        {relatedArticles.length > 0 && (
          <section className="py-20 pb-24 border-t border-slate-100 bg-transparent">
            <Container className="max-w-6xl">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-10 border-b border-slate-200 pb-4 font-sans">
                บทความอื่น ๆ ที่น่าสนใจ
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {relatedArticles.map((relatedArt) => (
                  <Link
                    key={relatedArt.slug}
                    href={`/news/${relatedArt.categorySlug}/${relatedArt.slug}`}
                    className="group block h-full"
                  >
                    <GlassCard
                      className="flex flex-col h-full !p-0 bg-white border border-transparent shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                      hoverScale={false}
                      hoverGlow={true}
                    >
                      {/* Image container */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-50">
                        {renderArticleCover(relatedArt.coverImage, relatedArt.title, relatedArt.category)}
                        <div className="absolute top-3.5 left-3.5 z-20">
                          <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md border backdrop-blur-md ${getCategoryColorStyles(relatedArt.categorySlug)}`}>
                            {relatedArt.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-[10px] sm:text-xs font-light text-slate-500 font-sans mb-3">
                          <span>
                            {new Date(relatedArt.publishedAt).toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span>•</span>
                          <span>{relatedArt.readingTime}</span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-sky-600 transition-colors duration-300 line-clamp-2 mb-2 font-sans">
                          {relatedArt.title}
                        </h4>

                        <p className="text-xs font-light text-slate-600 leading-relaxed line-clamp-2 mb-4 font-sans">
                          {relatedArt.excerpt}
                        </p>

                        <div className="mt-auto pt-3 border-t border-sky-50 flex items-center justify-between text-xs text-slate-550 font-sans">
                          <span>โดย {relatedArt.author}</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-slate-850 group-hover:text-sky-600 transition-colors duration-300">
                            อ่านต่อ <ChevronRight size={12} />
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </div>
    </>
  );
}
