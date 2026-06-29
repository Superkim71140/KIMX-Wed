import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { newsArticles, getNewsArticleBySlug } from "@/data/news";
import NewsArticleDetailView from './NewsArticleDetailView';

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
  const rawArticle = getNewsArticleBySlug(slug);

  if (!rawArticle || rawArticle.categorySlug !== category) {
    return buildMetadata({
      title: "ไม่พบข่าวสาร",
      noIndex: true,
      path: `/news/${category}/${slug}`,
    });
  }

  return buildMetadata({
    title: rawArticle.title,
    description: rawArticle.excerpt,
    path: `/news/${rawArticle.categorySlug}/${rawArticle.slug}`,
    image: rawArticle.coverImage,
    type: "article",
    publishedTime: rawArticle.publishedAt,
    modifiedTime: rawArticle.updatedAt,
    author: rawArticle.author || "KIMX Team",
  });
}

export default async function Page({ params }: PageProps) {
  return <NewsArticleDetailView params={params} />;
}
