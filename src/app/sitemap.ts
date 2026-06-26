import { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { newsArticles } from "@/data/news";
import { portfolioItems } from "@/data/portfolio";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Static routes
  const routes = [
    {
      url: `${siteUrl}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic article routes
  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic portfolio routes
  const portfolioRoutes = portfolioItems.map((item) => ({
    url: `${siteUrl}/portfolio/${item.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // News Hub main route
  const newsRoutes = [
    {
      url: `${siteUrl}/news`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // News Category routes
  const categories = [
    "ai",
    "phone",
    "game",
    "tech",
    "automotive",
    "cyber-security",
    "digital-business",
    "how-to"
  ];
  const newsCategoryRoutes = categories.map((cat) => ({
    url: `${siteUrl}/news/${cat}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // News Article detail routes
  const newsArticleRoutes = newsArticles.map((art) => ({
    url: `${siteUrl}/news/${art.categorySlug}/${art.slug}`,
    lastModified: new Date(art.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...routes,
    ...articleRoutes,
    ...portfolioRoutes,
    ...newsRoutes,
    ...newsCategoryRoutes,
    ...newsArticleRoutes,
  ];
}
