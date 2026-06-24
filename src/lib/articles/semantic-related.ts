import { NormalizedArticle } from "./types";
import { SEMANTIC_CLUSTERS } from "./taxonomy";
import { getArticleTimestamp } from "./registry";

/**
 * Placeholder interface for future AI-powered embeddings relevance provider.
 */
export interface EmbeddingsRelevanceProvider {
  getRelatedByEmbeddings(articleId: string, limit: number): Promise<string[] | null>;
}

/**
 * Normalizes text to lowercase and removes punctuation.
 */
function cleanAndNormalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
}

/**
 * Extracts meaningful words (length > 2) from text using Intl.Segmenter for Thai support.
 */
function extractMeaningfulWords(text: string): Set<string> {
  const words = new Set<string>();
  const normalized = text.toLowerCase();
  
  // Extract English alphanumeric words
  const engMatches = normalized.match(/[a-z0-9]{3,}/g) || [];
  for (const m of engMatches) {
    words.add(m);
  }
  
  // Use Intl.Segmenter for Thai words
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    try {
      const segmenter = new Intl.Segmenter("th", { granularity: "word" });
      const segments = segmenter.segment(normalized);
      for (const segment of segments) {
        if (segment.isWordLike && segment.segment.length > 2) {
          // Exclude purely numeric or common particles if needed
          const word = segment.segment.trim();
          if (word && !/^[0-9]+$/.test(word)) {
            words.add(word);
          }
        }
      }
    } catch {
      // Fallback if segmenter fails
    }
  }
  
  return words;
}

/**
 * Identifies which semantic clusters an article belongs to.
 */
function getArticleClusters(article: NormalizedArticle): Set<string> {
  const clusters = new Set<string>();
  const titleAndDesc = `${article.title} ${article.description}`.toLowerCase();
  const tagsText = article.tags.join(" ").toLowerCase();
  const searchText = `${titleAndDesc} ${tagsText}`;

  for (const [clusterName, keywords] of Object.entries(SEMANTIC_CLUSTERS)) {
    for (const keyword of keywords) {
      const cleanKeyword = keyword.toLowerCase();
      if (searchText.includes(cleanKeyword)) {
        clusters.add(clusterName);
        break; // Stop at first match for this cluster
      }
    }
  }
  return clusters;
}

/**
 * Calculates a weighted semantic relevance score between the current article and a candidate article.
 */
export function calculateSemanticScore(
  current: NormalizedArticle,
  candidate: NormalizedArticle,
  newestTimestamp: number
): number {
  // Exclude current article or invalid states
  if (current.slug === candidate.slug || current.id === candidate.id) {
    return -1;
  }

  let score = 0;

  // 1. Same category: +30
  if (current.category === candidate.category) {
    score += 30;
  }

  // 2. Same categorySlug: +20
  if (current.categorySlug === candidate.categorySlug) {
    score += 20;
  }

  // 3. Shared normalized tags: +15 per match
  const currentTags = new Set(current.tags.map(t => cleanAndNormalize(t)));
  const candidateTags = candidate.tags.map(t => cleanAndNormalize(t));
  let sharedTags = 0;
  for (const tag of candidateTags) {
    if (currentTags.has(tag)) {
      sharedTags++;
    }
  }
  score += sharedTags * 15;

  // 4. Shared semantic cluster: +18 per matching cluster
  const currentClusters = getArticleClusters(current);
  const candidateClusters = getArticleClusters(candidate);
  let sharedClusters = 0;
  for (const cluster of currentClusters) {
    if (candidateClusters.has(cluster)) {
      sharedClusters++;
    }
  }
  score += sharedClusters * 18;

  // 5. Title keyword overlap: +8 per meaningful match
  const currentTitleWords = extractMeaningfulWords(current.title);
  const candidateTitleWords = extractMeaningfulWords(candidate.title);
  let titleMatches = 0;
  for (const word of candidateTitleWords) {
    if (currentTitleWords.has(word)) {
      titleMatches++;
    }
  }
  score += titleMatches * 8;

  // 6. Description keyword overlap: +4 per meaningful match
  const currentDescWords = extractMeaningfulWords(current.description);
  const candidateDescWords = extractMeaningfulWords(candidate.description);
  let descMatches = 0;
  for (const word of candidateDescWords) {
    if (currentDescWords.has(word)) {
      descMatches++;
    }
  }
  score += descMatches * 4;

  // 7. Content keyword overlap: low capped score (e.g. +1 per match, max +10)
  // To avoid performance issues, check overlap in paragraph blocks only, up to a limit
  let contentMatches = 0;
  const currentContentText = current.content
    .filter(b => b.type === "paragraph")
    .map(b => b.text)
    .join(" ")
    .toLowerCase();
  
  const candidateContentWords = extractMeaningfulWords(
    candidate.content
      .filter(b => b.type === "paragraph")
      .map(b => b.text)
      .join(" ")
  );

  for (const word of candidateContentWords) {
    if (currentContentText.includes(word)) {
      contentMatches++;
      if (contentMatches >= 10) break;
    }
  }
  score += contentMatches * 1;

  // 8. Recency boost: small capped score (max +5)
  const candidateTime = getArticleTimestamp(candidate.publishedAt);
  if (newestTimestamp > 0 && candidateTime > 0) {
    const timeDiffRatio = candidateTime / newestTimestamp; // 0 to 1
    score += Math.round(timeDiffRatio * 5);
  }

  return score;
}

/**
 * Returns a list of semantically related articles for the given article, sorted by relevance.
 */
export function getSemanticRelatedArticles(
  currentArticle: NormalizedArticle,
  allArticles: NormalizedArticle[],
  limit: number = 3
): NormalizedArticle[] {
  // Find newest timestamp to compute recency boost
  let newestTimestamp = 0;
  for (const art of allArticles) {
    const time = getArticleTimestamp(art.publishedAt);
    if (time > newestTimestamp) {
      newestTimestamp = time;
    }
  }

  // Calculate scores for all candidates
  const scoredCandidates = allArticles
    .map(candidate => ({
      article: candidate,
      score: calculateSemanticScore(currentArticle, candidate, newestTimestamp)
    }))
    .filter(item => item.score >= 0) // Exclude current and invalid items
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // Higher score first
      }
      // Deterministic tie-breaker: newest first
      const timeA = getArticleTimestamp(a.article.publishedAt);
      const timeB = getArticleTimestamp(b.article.publishedAt);
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return b.article.slug.localeCompare(a.article.slug);
    });

  // Return the top N articles
  return scoredCandidates.slice(0, limit).map(item => item.article);
}
