import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { buildArticleMetadata } from "@/lib/seo";
import { getArticleSchema } from "@/lib/schema";
import ArticleHero from "@/components/articles/ArticleHero";
import ArticleContent from "@/components/articles/ArticleContent";
import ArticleCTA from "@/components/articles/ArticleCTA";
import ArticleCard from "@/components/articles/ArticleCard";
import Container from "@/components/ui/Container";

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

  return buildArticleMetadata(article);
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

  const articleSchema = getArticleSchema(article);

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="bg-transparent">
        {/* Article Hero */}
        <ArticleHero article={article} />

        {/* Dynamic Rich Text Content Nodes */}
        <ArticleContent article={article} />

        {/* Related Action Box */}
        <ArticleCTA slug={article.slug} accentColor={article.accentColor} />

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
