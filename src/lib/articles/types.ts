import { NewsArticleContentBlock } from "@/data/news";

export interface NormalizedArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: NewsArticleContentBlock[];
  category: string;
  categorySlug: string;
  subCategory?: "car" | "motorcycle";
  publishedAt: string; // ISO date timestamp, e.g. 2026-06-22T07:00:00+07:00
  updatedAt: string; // ISO date timestamp
  readingTime: string;
  author: string;
  tags: string[];
  coverImage: string;
  coverFit?: "cover" | "contain";
  isPinned: boolean;
  accentColor?: string; // Optional custom brand styling color
}
