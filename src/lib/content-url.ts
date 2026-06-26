import { Article } from "@/data/articles";
import { NewsArticle } from "@/data/news";

/**
 * getCanonicalArticlePath — Returns the canonical route path for an article.
 * 
 * News articles (or articles with categorySlug) map to: `/news/[categorySlug]/[slug]`
 * Evergreen guides and educational articles map to: `/articles/[slug]`
 */
export function getCanonicalArticlePath(article: Article | NewsArticle): string {
  if ("categorySlug" in article && article.categorySlug) {
    return `/news/${article.categorySlug}/${article.slug}`;
  }
  
  return `/articles/${article.slug}`;
}
