import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { siteConfig } from "@/data/site";
import ArticleHero from "@/components/articles/ArticleHero";
import ArticleContent from "@/components/articles/ArticleContent";
import ArticleCTA from "@/components/articles/ArticleCTA";
import ArticleCard from "@/components/articles/ArticleCard";
import Container from "@/components/ui/Container";
import ArticleFooterActions from "@/components/articles/ArticleFooterActions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate Static Params for build pre-rendering
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((art) => art.slug === slug);

  if (!article) {
    return {
      title: "บทความไม่พบ - KIMX Web",
    };
  }

  const imagePath = article.image || "/images/og-fallback-brand.png";
  const absoluteImageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${siteConfig.siteUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;

  const imageType = absoluteImageUrl.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      locale: "th_TH",
      siteName: "KIMX Web",
      title: article.title,
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
      title: article.title,
      description: article.description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((art) => art.slug === slug);

  if (!article) {
    notFound();
  }

  // Related articles (excluding current article)
  const relatedArticles = articles
    .filter((art) => art.slug !== slug)
    .slice(0, 3);

  // Absolute Image URL for schema
  const imagePath = article.image || "/images/og-fallback-brand.png";
  const absoluteImageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${siteConfig.siteUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.title,
            "image": [absoluteImageUrl],
            "datePublished": article.publishedAt,
            "author": {
              "@type": "Person",
              "name": "KIMX Tech Editor"
            }
          })
        }}
      />

      <article className="bg-transparent">
        {/* Article Hero */}
        <ArticleHero article={article} />

        {/* Dynamic Rich Text Content Nodes */}
        <ArticleContent article={article} />

        {/* Related Action Box */}
        <ArticleCTA slug={article.slug} accentColor={article.accentColor} />

        <Container>
          <ArticleFooterActions 
            returnUrl="/articles"
            title={article.title}
            canonicalUrl={`${siteConfig.siteUrl}/articles/${article.slug}`}
          />
        </Container>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="py-12 pb-24 border-t border-slate-200/60 bg-transparent">
            <Container>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 font-sans">
                บทความอื่นๆ ที่น่าสนใจ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {relatedArticles.map((relatedArt) => (
                  <ArticleCard key={relatedArt.slug} article={relatedArt} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </article>
    </>
  );
}
