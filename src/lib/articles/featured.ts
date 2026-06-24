import { NormalizedArticle } from "./types";
import { getArticleTimestamp } from "./registry";

/**
 * Returns the featured article based on pinning status and publication timestamp.
 * Selection priority:
 * 1. Pinned articles (isPinned === true), taking the newest pinned article first.
 * 2. Fallback to the newest published article by timestamp.
 * 3. Uses slug as secondary deterministic tie-breaker.
 */
export function getFeaturedArticle(articles: NormalizedArticle[]): NormalizedArticle | undefined {
  if (articles.length === 0) {
    return undefined;
  }

  // Find all pinned articles
  const pinnedArticles = articles.filter(a => a.isPinned);

  if (pinnedArticles.length > 0) {
    // Sort pinned articles newest first
    const sortedPinned = [...pinnedArticles].sort((a, b) => {
      const timeA = getArticleTimestamp(a.publishedAt);
      const timeB = getArticleTimestamp(b.publishedAt);
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return b.slug.localeCompare(a.slug);
    });
    return sortedPinned[0];
  }

  // No pinned article, sort all articles newest first
  const sortedAll = [...articles].sort((a, b) => {
    const timeA = getArticleTimestamp(a.publishedAt);
    const timeB = getArticleTimestamp(b.publishedAt);
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return b.slug.localeCompare(a.slug);
  });

  return sortedAll[0];
}

export interface GetLatestArticlesOptions {
  excludeSlug?: string;
  categorySlug?: string;
  limit?: number;
}

/**
 * Retrieves the latest articles list sorted newest first.
 * Respects exclude criteria (e.g. to filter out the featured article) and category filters.
 * Returns a new array to preserve immutability.
 */
export function getLatestArticles(
  articles: NormalizedArticle[],
  options?: GetLatestArticlesOptions
): NormalizedArticle[] {
  let list = [...articles];

  if (options?.excludeSlug) {
    list = list.filter(a => a.slug !== options.excludeSlug);
  }

  if (options?.categorySlug) {
    list = list.filter(a => a.categorySlug === options.categorySlug);
  }

  // Sort newest first
  list.sort((a, b) => {
    const timeA = getArticleTimestamp(a.publishedAt);
    const timeB = getArticleTimestamp(b.publishedAt);
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return b.slug.localeCompare(a.slug);
  });

  if (options?.limit !== undefined) {
    list = list.slice(0, options.limit);
  }

  return list;
}
