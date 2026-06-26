import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleRegistry } from "@/lib/articles/registry";
import { getSemanticRelatedArticles } from "@/lib/articles/semantic-related";
import { getExecutiveSummary } from "@/lib/articles/ai-summary";
import ExecutiveSummaryWidget from "@/components/articles/ExecutiveSummaryWidget";
import RelatedArticles from "@/components/articles/RelatedArticles";
import { siteUrl } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import CTAButton from "@/components/ui/CTAButton";
import ShareButtons from "@/components/news/ShareButtons";
import BenchmarkBar from "@/components/articles/BenchmarkBar";
import ArticleFooterActions from "@/components/articles/ArticleFooterActions";
import ArticleTrustBar from "@/components/articles/ArticleTrustBar";
import ReadingProgress from "@/components/articles/ReadingProgress";
import TableOfContents from "@/components/articles/TableOfContents";
import { getCategoryColorStyles } from "@/lib/news-presentation";

const renderWithHighlights = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="relative inline-block z-0 mx-0.5 px-1 font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
          <span className="absolute -z-10 bottom-1 left-0 w-full h-2/3 bg-[#14B8A6]/20 -rotate-1 rounded-sm"></span>
          {part.slice(2, -2)}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const enhanceHeadingText = (text: string) => {
  if (!text) return null;
  // Match common patterns for numbers with Thai/Eng labels, or specific keywords to highlight
  const regex = /(3 รูปแบบ|ตัวอย่างวงเงิน|\d+(?:\.\d+)?\s?[a-zA-Zก-๙]+|[A-Za-z]+\s\d+(?:\.\d+)?)/g;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (part.match(/(3 รูปแบบ|ตัวอย่างวงเงิน|\d+(?:\.\d+)?\s?[a-zA-Zก-๙]+|[A-Za-z]+\s\d+(?:\.\d+)?)/)) {
      return (
        <span key={i} className="bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent drop-shadow-sm">
          {part}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const getCategoryHeadingAccent = (categorySlug: string) => {
  switch (categorySlug) {
    case "ai": return "border-purple-500";
    case "phone": return "border-sky-500";
    case "game": return "border-teal-500";
    case "tech": return "border-blue-500";
    case "automotive": return "border-emerald-500";
    case "cyber-security": return "border-rose-500";
    case "digital-business": return "border-amber-500";
    case "how-to": return "border-indigo-500";
    default: return "border-slate-500";
  }
};

const getCategoryGradientStyles = (categorySlug: string) => {
  switch (categorySlug) {
    case "ai": return "bg-linear-to-br from-purple-50 to-white border-purple-200/80";
    case "phone": return "bg-linear-to-br from-sky-50 to-white border-sky-200/80";
    case "game": return "bg-linear-to-br from-teal-50 to-white border-teal-200/80";
    case "tech": return "bg-linear-to-br from-blue-50 to-white border-blue-200/80";
    case "automotive": return "bg-linear-to-br from-emerald-50 to-white border-emerald-200/80";
    case "cyber-security": return "bg-linear-to-br from-rose-50 to-white border-rose-200/80";
    case "digital-business": return "bg-linear-to-br from-amber-50 to-white border-amber-200/80";
    case "how-to": return "bg-linear-to-br from-indigo-50 to-white border-indigo-200/80";
    default: return "bg-linear-to-br from-slate-50 to-white border-slate-200/80";
  }
};

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = getArticleRegistry();
  return articles.map((article) => ({
    category: article.categorySlug,
    slug: article.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const articles = getArticleRegistry();
  const article = articles.find(
    (art) => art.slug === slug && art.categorySlug === category
  );

  if (!article) {
    return {
      title: "บทความไม่พบ - KIMX Web",
    };
  }

  const imagePath = article.coverImage || "/images/og-fallback-brand.png";
  const absoluteImageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${siteConfig.siteUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;

  const imageType = absoluteImageUrl.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";

  const canonicalUrl = `${siteConfig.siteUrl}/news/${article.categorySlug}/${article.slug}`;

  return {
    title: `${article.title} | KIMX Web`,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "th_TH",
      siteName: "KIMX Web",
      url: canonicalUrl,
      title: `${article.title} | KIMX Web`,
      description: article.description,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: imageType,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | KIMX Web`,
      description: article.description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const articles = getArticleRegistry();
  const article = articles.find(
    (art) => art.slug === slug && art.categorySlug === category
  );

  if (!article) {
    notFound();
  }

  // Related articles using the semantic related engine
  const relatedArticles = getSemanticRelatedArticles(article, articles, 3);

  // Find Takeaways block
  const takeawaysBlock = article.content.find(block => block.type === "highlight" && block.title === "สรุปประเด็นสำคัญ") as { type: "highlight"; title?: string; text: string } | undefined;

  // Extract content text for AI/Mock Summary
  const contentText = article.content
    .filter(block => block.type === "paragraph" || block.type === "heading")
    .map(block => block.text)
    .join("\n");

  // Server-side summary generation with no hydration mismatch
  let initialSummary: string[] = [];
  if (takeawaysBlock) {
    initialSummary = takeawaysBlock.text.split("\n").filter(Boolean).map(line => line.replace(/^•\s*/, ''));
  } else {
    const summaryRes = await getExecutiveSummary(article.id, article.title, contentText, 4);
    initialSummary = summaryRes.summary;
  }

  // Generate Table of Contents
  const headingBlocks = article.content.filter((block) => block.type === "heading");

  // JSON-LD Schemas
  const canonicalUrl = `${siteUrl}/news/${article.categorySlug}/${article.slug}`;
  
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
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
        "item": canonicalUrl
      }
    ]
  };

  // Calculate absolute image URL
  const imagePath = article.coverImage || "/images/og-fallback-brand.png";
  const absoluteImageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${siteConfig.siteUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${canonicalUrl}#article`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": article.title,
    "description": article.description,
    "url": canonicalUrl,
    "image": [absoluteImageUrl],
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt || article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.author || "KIMX Tech Editor",
      "url": `${siteUrl}/about`,
      "jobTitle": "Tech Editor"
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "KIMX Web Agency",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/assets/images/logo%20kimxwed.png`,
        "width": 800,
        "height": 800
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
      <ReadingProgress />
      <div className="relative pt-48 pb-24 bg-transparent font-sans">
        {/* Glow - Ultra Minimalist */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-200/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Large, highly blurred fluid orbs */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#14B8A6]/25 rounded-full blur-[140px] opacity-25 pointer-events-none -z-10" />
        <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] bg-[#0EA5E9]/20 rounded-full blur-[140px] opacity-25 pointer-events-none -z-10" />

        <Container className="relative z-10">
          
          {/* ===== BREADCRUMBS ===== */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-1.5 text-xs font-medium text-slate-400 font-sans m-0 p-0 list-none">
              <li>
                <Link href="/" className="hover:text-sky-600 transition-colors duration-200">
                  หน้าหลัก
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li>
                <Link href="/news" className="hover:text-sky-600 transition-colors duration-200">
                  ข่าวสาร
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li>
                <span className="text-slate-500 font-medium" aria-current="page">{article.category}</span>
              </li>
            </ol>
          </nav>

          {/* ===== CATEGORY BADGE ===== */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-bold text-teal-700 bg-teal-500/10 border border-teal-200/60 rounded-full">
              {article.category}
            </span>
          </div>

          {/* ===== MAIN HEADLINE ===== */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6 max-w-4xl font-sans"
            style={{ wordBreak: "normal", overflowWrap: "anywhere" }}
          >
            {article.title}
          </h1>

          {/* ===== TRUST BAR — light theme ===== */}
          <ArticleTrustBar
            author={article.author || "KIMX Team"}
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
            readingTime={article.readingTime}
            category={article.category}
            editorialStatus={article.slug === "excise-ev-finance-support-2026" ? "อยู่ระหว่างพิจารณา" : undefined}
            theme="light"
          />

          {/* ===== FACEBOOK CTA ===== */}
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

        {/* ===== PRISTINE COVER IMAGE — centered, bounded editorial canvas layout ===== */}
        <figure className="w-full max-w-3xl mx-auto px-4 md:px-0 mb-12">
          {article.coverImage.startsWith("linear-gradient") || article.coverImage.includes("gradient") ? (
            <div
              className="w-full aspect-video md:max-h-[420px] bg-slate-50 border border-slate-200/60 rounded-none overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              style={{ background: article.coverImage }}
            />
          ) : (
            <div
              className="w-full aspect-video md:max-h-[420px] bg-slate-50 border border-slate-200/60 rounded-none overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.02)] group"
            >
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                className="object-contain w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-102"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
        </figure>

        <Container className="relative z-10">

          {/* ===== 2-COLUMN STRUCTURAL GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 relative items-start">
            
            {/* LEFT COLUMN - MAIN EDITORIAL CANVAS (7 cols) */}
            <div className="lg:col-span-7 w-full max-w-3xl mx-auto lg:mx-0">
              
              {/* Takeaways / AI Summary Component */}
              <ExecutiveSummaryWidget
                articleId={article.id}
                title={article.title}
                contentText={contentText}
                initialSummary={initialSummary}
              />

              {/* ===== MAIN RICH CONTENT ===== */}
              <main className="w-full text-slate-900 font-normal text-base sm:text-lg leading-relaxed" style={{ wordBreak: 'normal', overflowWrap: 'anywhere' }}>
            {article.content.map((block, idx) => {
              switch (block.type) {
                case "paragraph": {
                  const pTextLines = block.text.split('\n');
                  const pIsList = pTextLines.length > 0 && pTextLines.every(line => line.trim().startsWith('•'));
                  const isFirstParagraph = article.content.findIndex(b => b.type === "paragraph") === idx;
                  const dropCapClasses = isFirstParagraph ? "first-letter:text-5xl first-letter:font-black first-letter:text-[#14B8A6] first-letter:float-left first-letter:mr-3 first-letter:mt-1" : "";

                  if (pIsList) {
                    return (
                      <ul key={idx} className={`list-disc list-outside ml-6 font-sans text-base md:text-[1.05rem] font-normal leading-relaxed mb-9 antialiased max-w-3xl mx-auto px-4 md:px-0 space-y-2`}>
                        {pTextLines.map((line, i) => (
                          <li key={i}>{renderWithHighlights(line.trim().replace(/^•\s*/, ''))}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={idx}
                      className={`font-sans whitespace-pre-line text-base md:text-[1.05rem] font-normal leading-relaxed mb-9 antialiased max-w-3xl mx-auto px-4 md:px-0 ${dropCapClasses}`}
                    >
                      {renderWithHighlights(block.text)}
                    </p>
                  );
                }
                case "heading":
                  return (
                    <h2
                      key={idx}
                      id={encodeURIComponent(block.text)}
                      className={`text-xl md:text-2xl font-black text-slate-950 tracking-tight mt-14 mb-6 max-w-3xl mx-auto px-4 md:px-0 flex items-center gap-2 font-sans scroll-mt-36 relative pl-5 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[4px] before:rounded-full before:bg-gradient-to-b before:from-[#14B8A6] before:to-[#0EA5E9] before:shadow-[0_0_12px_rgba(20,184,166,0.6)]`}
                    >
                      {enhanceHeadingText(block.text)}
                    </h2>
                  );
                case "highlight": {
                  if (block === takeawaysBlock) return null;
                  const hlTextLines = block.text.split('\n');
                  const hlIsList = hlTextLines.length > 0 && hlTextLines.every(line => line.trim().startsWith('•'));
                  return (
                    <GlassCard
                      key={idx}
                      className="my-12 p-6! sm:p-8! rounded-3xl relative overflow-hidden text-slate-800 backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)]"
                      hoverScale={false}
                    >
                      {block.title && (
                        <h3 className="text-sm sm:text-base font-bold mb-4 font-sans">
                          {enhanceHeadingText(block.title)}
                        </h3>
                      )}
                      {hlIsList ? (
                        <ul className="flex flex-col gap-3 font-sans">
                          {hlTextLines.map((line, i) => (
                            <li key={i} className="flex gap-3 text-sm font-medium leading-relaxed opacity-95">
                              <span className="w-5 h-5 rounded-md flex items-center justify-center bg-sky-100/60 text-[#14B8A6] shrink-0 mt-0.5 shadow-sm border border-sky-200/50">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              </span>
                              <span>{renderWithHighlights(line.trim().replace(/^•\s*/, ''))}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm font-medium leading-relaxed font-sans whitespace-pre-line opacity-95">
                          {renderWithHighlights(block.text)}
                        </p>
                      )}
                    </GlassCard>
                  );
                }
                case "quote":
                  return (
                    <blockquote
                      key={idx}
                      className="my-10 p-8 sm:p-10 relative overflow-hidden rounded-[2rem] bg-slate-50/70 border border-slate-200/50 italic text-slate-800 font-sans max-w-4xl mx-auto shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
                    >
                      {/* Oversized Background Quote */}
                      <div className="absolute -top-6 -left-2 text-[12rem] leading-none font-serif text-slate-200/40 select-none pointer-events-none" aria-hidden="true">
                        &ldquo;
                      </div>
                      <div className="relative z-10">
                        <p className="text-lg sm:text-xl font-light leading-relaxed mb-4">
                          {renderWithHighlights(block.text)}
                        </p>
                        {block.author && (
                          <cite className="text-sm text-slate-500 font-semibold not-italic flex items-center gap-2 font-sans before:content-[''] before:w-6 before:h-[2px] before:bg-[#14B8A6]">
                            {block.author}
                          </cite>
                        )}
                      </div>
                    </blockquote>
                  );
                case "stats":
                  return (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
                      {block.items.map((item, index) => (
                        <div
                          key={index}
                          className="p-6 rounded-3xl backdrop-blur-xl bg-white/60 border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-center hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all duration-500"
                        >
                          <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent font-sans drop-shadow-sm">
                            {item.value}
                          </span>
                          <span className="text-xs text-slate-500 font-medium font-sans mt-2 tracking-wide uppercase">
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
                          <tr className="bg-[#14B8A6] text-white">
                            {block.headers.map((h, i) => (
                              <th key={i} className="px-5 py-4 font-bold uppercase tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-slate-100 last:border-0 even:bg-slate-50 hover:bg-slate-100/50 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-5 py-4 font-medium text-slate-700">{cell}</td>
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
                          <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h3>
                          <p className="text-xs sm:text-sm font-light text-slate-600 leading-relaxed">{item.description}</p>
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
                      <h3 className="text-sm sm:text-base font-bold text-emerald-800 mb-3 font-sans flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{block.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm font-light text-emerald-800 leading-relaxed font-sans whitespace-pre-line">
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
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight font-sans">
                          Performance Benchmark
                        </h3>
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

          {/* ===== GLOBAL SHARE AND FOOTER ACTIONS ===== */}
          <ArticleFooterActions 
            returnUrl="/news"
            title={article.title}
            canonicalUrl={`${siteConfig.siteUrl}/news/${article.categorySlug}/${article.slug}`}
          />
        </div>

        {/* RIGHT COLUMN - SIDEBAR (3 cols) */}
        {headingBlocks.length > 0 && (
          <div className="hidden lg:block lg:col-span-3">
            <TableOfContents 
              headings={headingBlocks.map(block => ({
                id: encodeURIComponent(block.text),
                text: block.text
              }))} 
            />
          </div>
        )}
      </div>

          {/* ===== BOTTOM CTA ACTION PANEL ===== */}
          <section className="my-24">
            <GlassCard
              className="border-none! bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-10! sm:p-16! text-center relative overflow-hidden rounded-3xl"
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
        <RelatedArticles relatedArticles={relatedArticles} />
      </div>
    </>
  );
}
