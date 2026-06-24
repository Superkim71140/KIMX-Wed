import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, ChevronRight } from "lucide-react";
import { getArticleRegistry } from "@/lib/articles/registry";
import { getFeaturedArticle, getLatestArticles } from "@/lib/articles/featured";
import { buildMetadata, siteUrl } from "@/lib/seo";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";

// SEO Metadata for the News Hub
export const metadata: Metadata = buildMetadata({
  title: "ข่าวไอที ข่าว AI และบทความเทคโนโลยีสำหรับธุรกิจ - KIMX Web",
  description: "อัปเดตข่าว AI เครื่องมือดิจิทัล เว็บไซต์ SEO และเทคโนโลยีที่เจ้าของธุรกิจควรรู้จาก KIMX Web",
  path: "/news",
});

import { getCategoryColorStyles, renderArticleCover } from "@/lib/news-presentation";
export { getCategoryColorStyles, renderArticleCover };

export default function NewsHubPage() {
  const articles = getArticleRegistry();
  const featuredArticle = getFeaturedArticle(articles);
  const regularArticles = getLatestArticles(articles, {
    excludeSlug: featuredArticle?.slug
  });

  const sortedArticles = featuredArticle ? [featuredArticle, ...regularArticles] : regularArticles;

  // Injected JSON-LD Schema
  const schemaList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/news#collection-page`,
    "url": `${siteUrl}/news`,
    "name": "ข่าวไอที ข่าว AI และบทความเทคโนโลยีสำหรับธุรกิจ - KIMX Web",
    "description": "อัปเดตข่าว AI เครื่องมือดิจิทัล เว็บไซต์ SEO และเทคโนโลยีที่เจ้าของธุรกิจควรรู้จาก KIMX Web",
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
      "itemListElement": sortedArticles.map((art, idx) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaList) }}
      />

      {/* Adjust paddingTop for Apple-tier spacing to clear navbar cleanly */}
      <div className="relative pt-24 pb-24 overflow-hidden bg-transparent">
        {/* Decorative tech background lines/glow - Ultra Minimalist (5% opacity) */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[800px] h-[400px] bg-sky-200/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-slate-200/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        {/* ===== BREADCRUMBS ===== */}
        <div className="mb-6 relative z-10">
          <Container>
            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 font-sans">
              <Link href="/" className="hover:text-slate-900 transition-colors duration-200">
                หน้าหลัก
              </Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-slate-800">ข่าวสารและบทความ</span>
            </div>
          </Container>
        </div>

        {/* ===== HERO TITLE ===== */}
        <header className="relative z-10 text-center pt-2 pb-6 md:pt-4 md:pb-8 mb-6 sm:mb-8">
          <Container>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight md:leading-tight tracking-tighter mb-3 sm:mb-4 max-w-4xl mx-auto font-sans">
              ข่าวไอที ข่าว AI และบทความเทคโนโลยีสำหรับธุรกิจ
            </h1>
            <p className="text-slate-600 font-medium text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-sans tracking-tight">
              อัปเดตข่าวสารเทคโนโลยี ปัญญาประดิษฐ์ เครื่องมือดิจิทัล เว็บไซต์ และเทรนด์ SEO ล่าสุดจากผู้เชี่ยวชาญ KIMX Web
            </p>
          </Container>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main className="relative z-10">
          <Container className="space-y-12 sm:space-y-16">
            
            {/* FEATURED ARTICLE (Big Premium Glass Card) */}
            {featuredArticle && (
              <section className="mt-8 md:mt-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-6 sm:mb-8 font-sans">
                  บทความแนะนำ
                </h2>
                <Link href={`/news/${featuredArticle.categorySlug}/${featuredArticle.slug}`} className="group block">
                  <GlassCard className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-0! bg-white border border-transparent shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                    {/* Cover Image Wrapper */}
                    <div className={`relative w-full lg:w-3/5 aspect-16/10 lg:aspect-auto min-h-[260px] lg:min-h-[380px] overflow-hidden ${featuredArticle.coverFit === 'contain' ? 'bg-slate-100/50 border-r border-sky-100/50' : 'bg-slate-50'}`}>
                      {renderArticleCover(featuredArticle.coverImage, featuredArticle.title, featuredArticle.category, featuredArticle.coverFit)}
                      {/* Floating Category Tag */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-md border backdrop-blur-md ${getCategoryColorStyles(featuredArticle.categorySlug)}`}>
                          {featuredArticle.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-center">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500 font-sans mb-3 sm:mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          <span>
                            {new Date(featuredArticle.publishedAt).toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" />
                          <span>{featuredArticle.readingTime}</span>
                        </div>
                      </div>

                      {/* Heading */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight mb-4 group-hover:text-slate-700 transition-colors duration-300 font-sans">
                        {featuredArticle.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 text-sm font-normal leading-relaxed mb-6 font-sans">
                        {featuredArticle.description}
                      </p>

                      {/* Author */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-sky-50">
                        <span className="text-xs text-slate-500 font-sans">โดย {featuredArticle.author}</span>
                        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors duration-300 font-sans">
                          <span>อ่านต่อ</span>
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </section>
            )}

            {/* ARTICLES GRID */}
            <section className="mt-16 sm:mt-24">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-6 sm:mb-8 font-sans">
                บทความล่าสุดทั้งหมด
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {regularArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/news/${article.categorySlug}/${article.slug}`}
                    className="group block h-full"
                  >
                    <GlassCard
                      className="flex flex-col h-full p-0! bg-white border border-transparent shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                      hoverScale={false}
                      hoverGlow={false}
                    >
                      {/* Image Container */}
                      <div className={`relative w-full aspect-16/10 overflow-hidden ${article.coverFit === 'contain' ? 'bg-slate-100/50 border-b border-sky-100/50' : 'bg-slate-50'}`}>
                        {renderArticleCover(article.coverImage, article.title, article.category, article.coverFit)}
                        {/* Floating tag */}
                        <div className="absolute top-3.5 left-3.5 z-20">
                          <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md border backdrop-blur-md ${getCategoryColorStyles(article.categorySlug)}`}>
                            {article.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 flex flex-col flex-grow">
                        {/* Meta row */}
                        <div className="flex items-center gap-3 text-[10px] sm:text-xs font-medium text-slate-500 font-sans mb-3">
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span>•</span>
                          <span>{article.readingTime}</span>
                        </div>

                        {/* Heading */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-slate-700 transition-colors duration-300 line-clamp-2 mb-3 font-sans">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed line-clamp-3 mb-6 font-sans">
                          {article.description}
                        </p>

                        {/* CTA / Author strip */}
                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sans font-medium">
                          <span>โดย {article.author}</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-slate-800 group-hover:text-slate-600 transition-colors duration-300">
                            อ่านต่อ <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </section>
          </Container>
        </main>
      </div>
    </>
  );
}
