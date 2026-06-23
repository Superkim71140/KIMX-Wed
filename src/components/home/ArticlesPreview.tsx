"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { newsArticles } from "@/data/news";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import CTAButton from "../ui/CTAButton";

export default function ArticlesPreview() {
  // Sort by date and take first 3 articles
  const previewArticles = [...newsArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section id="articles" className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-sky-100/40 scroll-mt-20">
      {/* Background soft glows */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-purple-200/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[250px] h-[250px] bg-sky-200/20 rounded-full blur-[80px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeader
          title="อัปเดตข่าว AI และบทความเว็บไซต์"
          description="เทรนด์เทคโนโลยี SEO และเครื่องมือ AI ที่เจ้าของธุรกิจควรรู้ เพื่อติดปีกให้ธุรกิจเติบโตอย่างมีประสิทธิภาพ"
        />

        {/* Articles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {previewArticles.map((article) => (
            <Link key={article.slug} href={`/news/${article.categorySlug}/${article.slug}`} className="group block h-full">
              <GlassCard
                className="flex flex-col h-full !p-0 bg-white border border-transparent shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                hoverScale={false}
                hoverGlow={true}
              >
                {/* Article Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-sky-100">
                  {article.coverImage.startsWith("linear-gradient") || article.coverImage.includes("gradient") ? (
                    <div 
                      className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ background: article.coverImage }}
                    >
                      {/* Category Badge overlay (Absolute Glass Overlay) */}
                      <div className="z-10 backdrop-blur-md bg-slate-950/40 border border-white/10 rounded-full px-3 py-1">
                        <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white font-sans">
                          {article.category}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  
                  {/* Category Badge overlay (Absolute Glass Overlay) */}
                  <div className="absolute top-4 left-4 z-10 backdrop-blur-md bg-slate-950/40 border border-white/10 rounded-full px-3 py-1">
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white font-sans">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content Body */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-3">
                    {/* Date and Reading Time row */}
                    <div className="flex items-center gap-3 text-[10px] sm:text-xs font-light text-slate-500 font-sans">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" />
                        <span>{article.readingTime}</span>
                      </div>
                      <span>•</span>
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-sky-600 transition-colors duration-200 line-clamp-2 font-sans">
                      {article.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm font-light text-slate-600 leading-relaxed line-clamp-3 font-sans">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Read More link anchor */}
                  <div className="pt-6 mt-auto flex items-center gap-2 text-xs font-bold text-slate-700 group-hover:text-sky-600 transition-colors duration-200 font-sans">
                    <span>อ่านบทความเต็ม</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="mt-12 text-center">
          <CTAButton
            variant="outline"
            size="md"
            href="/news"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-sky-200 text-slate-800 hover:bg-sky-50 font-sans"
          >
            <BookOpen size={16} />
            <span>ดูบทความทั้งหมดในคลังความรู้</span>
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
