import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/data/articles";
import ArticleTrustBar from "./ArticleTrustBar";
import Container from "../ui/Container";

interface ArticleHeroProps {
  article: Article;
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <div className="relative pt-32 pb-0 overflow-hidden bg-transparent">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-slate-50 rounded-full blur-[140px] pointer-events-none -z-10" />

      <Container className="relative z-10">
        {/* 1. Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-5 font-sans">
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

        {/* 2. Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-bold text-teal-700 bg-teal-500/10 border border-teal-200/60 rounded-full">
            {article.category}
          </span>
        </div>

        {/* 3. Main Headline */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6 max-w-4xl font-sans"
          style={{ wordBreak: "normal", overflowWrap: "anywhere" }}
        >
          {article.title}
        </h1>

        {/* 4. ArticleTrustBar — light theme */}
        <ArticleTrustBar
          author={article.author || "KIMX Team"}
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
          readingTime={article.readingTime}
          category={article.category}
          editorialStatus={article.slug === "excise-ev-finance-support-2026" ? "อยู่ระหว่างพิจารณา" : undefined}
          theme="light"
        />

        {/* 5. Facebook CTA */}
        <div className="mb-10">
          <a
            href="https://www.facebook.com/profile.php?id=61588114826420"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0674E8] text-white px-5 py-2.5 rounded-full text-sm font-bold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(6,116,232,0.3)] cursor-pointer font-sans"
            aria-label="ติดตาม KIMX บน Facebook"
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
            <span>ติดตาม KIMX บน Facebook</span>
          </a>
        </div>
      </Container>

      {/* 6. Pristine flat-edge cover image — centered, bounded editorial canvas layout */}
      <figure className="w-full max-w-3xl mx-auto px-4 md:px-0 mb-0">
        {article.image && (article.image.startsWith("linear-gradient") || article.image.includes("gradient")) ? (
          <div
            className="w-full aspect-video md:max-h-[420px] bg-slate-50 border border-slate-200/60 rounded-none overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ background: article.image }}
          />
        ) : (
          <div
            className="w-full aspect-video md:max-h-[420px] bg-slate-50 border border-slate-200/60 rounded-none overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.02)] group"
          >
            <Image
              src={article.image}
              alt={article.imageAlt || article.title}
              fill
              priority
              className="object-contain w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-102"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}
      </figure>
    </div>
  );
}
