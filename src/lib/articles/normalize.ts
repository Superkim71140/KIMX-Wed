import { Article } from "@/data/articles";
import { NewsArticle, NewsArticleContentBlock } from "@/data/news";
import { NormalizedArticle } from "./types";
import { calculateReadingTime } from "./reading-time";

/**
 * Adapter mapping legacy Article & NewsArticle structures into a unified internal format.
 */
export function normalizeArticle(article: Article | NewsArticle): NormalizedArticle {
  const isNewsArticle = "excerpt" in article;
  
  // Extract id, defaulting to slug if missing
  const id = ("id" in article && article.id) ? article.id : article.slug;
  const slug = article.slug;
  const title = article.title;
  const description = isNewsArticle ? article.excerpt : article.description;
  const category = article.category;
  const categorySlug = article.categorySlug || "tech";
  const publishedAt = article.publishedAt;
  const updatedAt = article.updatedAt;
  
  // Dynamically calculate reading time as the primary source of truth
  const content = article.content as NewsArticleContentBlock[];
  const readingTime = calculateReadingTime(content);

  const author = article.author || "KIMX Team";
  const tags = article.tags || [];
  
  // Resolve cover image from either property
  const coverImage = isNewsArticle 
    ? article.coverImage 
    : (article.coverImage || article.image);
    
  const coverFit = article.coverFit;
  const isPinned = !!article.isPinned;
  const accentColor = "accentColor" in article ? article.accentColor : undefined;
  const subCategory = article.subCategory;

  return {
    id,
    slug,
    title,
    description,
    content,
    category,
    categorySlug,
    subCategory,
    publishedAt,
    updatedAt,
    readingTime,
    author,
    tags,
    coverImage,
    coverFit,
    isPinned,
    accentColor
  };
}
