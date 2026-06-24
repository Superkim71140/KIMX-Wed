import { articles as rawArticles } from "@/data/articles";
import { newsArticles as rawNewsArticles } from "@/data/news";
import { normalizeArticle } from "./normalize";
import { NormalizedArticle } from "./types";

let cachedRegistry: NormalizedArticle[] | null = null;

/**
 * Returns the authoritative registry of all normalized articles.
 * De-duplicates by slug and caches the results.
 */
export function getArticleRegistry(): NormalizedArticle[] {
  if (cachedRegistry) {
    return cachedRegistry;
  }

  const registryMap = new Map<string, NormalizedArticle>();

  // Process data/articles.ts
  for (const rawArt of rawArticles) {
    const normalized = normalizeArticle(rawArt);
    registryMap.set(normalized.slug, normalized);
  }

  // Process data/news.ts (will overwrite/enrich overlapping items, preserving custom block fields)
  for (const rawNews of rawNewsArticles) {
    const normalized = normalizeArticle(rawNews);
    registryMap.set(normalized.slug, normalized);
  }

  cachedRegistry = Array.from(registryMap.values());
  return cachedRegistry;
}

/**
 * Safely parses a string date/timestamp into milliseconds.
 * Returns 0 as a deterministic fallback for missing or invalid dates.
 */
export function getArticleTimestamp(publishedAt: string): number {
  if (!publishedAt) {
    return 0;
  }
  const date = new Date(publishedAt);
  const time = date.getTime();
  return isNaN(time) ? 0 : time;
}

/**
 * Sorts articles by timestamp (newest first).
 * Uses slugs as a secondary deterministic key to prevent unstable sorting.
 */
export function sortArticlesNewestFirst(articles: NormalizedArticle[]): NormalizedArticle[] {
  return [...articles].sort((a, b) => {
    const timeA = getArticleTimestamp(a.publishedAt);
    const timeB = getArticleTimestamp(b.publishedAt);
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return b.slug.localeCompare(a.slug);
  });
}
