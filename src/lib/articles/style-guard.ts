import { NormalizedArticle } from "./types";
import { SEMANTIC_CLUSTERS } from "./taxonomy";

export type StyleGuardIssueLevel = "error" | "warning";

export interface StyleGuardIssue {
  field: string;
  level: StyleGuardIssueLevel;
  message: string;
}

export function validateArticleStyle(article: Partial<NormalizedArticle>): StyleGuardIssue[] {
  const issues: StyleGuardIssue[] = [];

  // 1. Title Validation
  if (!article.title) {
    issues.push({ field: "title", level: "error", message: "Title is required." });
  } else {
    if (article.title.length < 20) {
      issues.push({ field: "title", level: "warning", message: "Title is too short (< 20 chars). It may underperform in SEO." });
    }
    if (article.title.length > 100) {
      issues.push({ field: "title", level: "warning", message: "Title is too long (> 100 chars). It may be truncated in search results." });
    }
    if (article.title.endsWith(" ")) {
      issues.push({ field: "title", level: "error", message: "Title has trailing whitespace." });
    }
  }

  // 2. Description Validation
  if (!article.description) {
    issues.push({ field: "description", level: "error", message: "Description (excerpt) is required for SEO." });
  } else {
    if (article.description.length < 50) {
      issues.push({ field: "description", level: "warning", message: "Description is too short (< 50 chars)." });
    }
    if (article.description.length > 160) {
      issues.push({ field: "description", level: "warning", message: "Description exceeds 160 chars, which may truncate in Google Search." });
    }
  }

  // 3. Category Validation
  const validCategories = Object.keys(SEMANTIC_CLUSTERS);
  if (!article.categorySlug) {
    issues.push({ field: "categorySlug", level: "error", message: "Category Slug is required." });
  } else if (!validCategories.includes(article.categorySlug) && article.categorySlug !== "automotive" && article.categorySlug !== "phone" && article.categorySlug !== "game" && article.categorySlug !== "how-to" && article.categorySlug !== "digital-business" && article.categorySlug !== "cyber-security" && article.categorySlug !== "tech" && article.categorySlug !== "ai") {
    // Note: taxonomy.ts has limited clusters, so we also allow known slugs from articles.ts
    issues.push({ field: "categorySlug", level: "warning", message: `Category '${article.categorySlug}' is not in the primary taxonomy clusters.` });
  }

  // 4. Content Validation (Typography & Fact-checking)
  if (!article.content || article.content.length === 0) {
    issues.push({ field: "content", level: "error", message: "Article has no content blocks." });
  } else {
    let hasFactCheck = false;
    let hasDoubleSpaces = false;

    article.content.forEach((block) => {
      // Find missing facts
      const blockStr = JSON.stringify(block);
      if (blockStr.includes("[FACT-CHECK REQUIRED]")) {
        hasFactCheck = true;
      }
      
      // Thai typography check: consecutive spaces which usually means bad copy-pasting
      if (block.type === "paragraph" && block.text.includes("  ")) {
        hasDoubleSpaces = true;
      }
    });

    if (hasFactCheck) {
      issues.push({ 
        field: "content", 
        level: "error", 
        message: "Article contains missing facts flagged as [FACT-CHECK REQUIRED]. Please resolve them before publishing." 
      });
    }

    if (hasDoubleSpaces) {
      issues.push({
        field: "content",
        level: "warning",
        message: "Content contains consecutive spaces. Check typography for clean formatting."
      });
    }
  }

  // 5. Image & Alt Text Validation
  if (!article.coverImage) {
    issues.push({ field: "coverImage", level: "warning", message: "Cover image is missing." });
  }
  
  // Note: we might not always pass imageAlt in NormalizedArticle if it's not strictly mapped, but we should enforce it
  const asAny = article as Record<string, unknown>;
  if (!asAny.imageAlt && !asAny.coverAlt) {
    issues.push({ field: "imageAlt", level: "warning", message: "Image Alt text is missing. Crucial for accessibility and SEO." });
  } else {
    const alt = String(asAny.imageAlt || asAny.coverAlt || "");
    if (alt && alt.toLowerCase().includes("image of")) {
      issues.push({ field: "imageAlt", level: "warning", message: "Avoid using generic phrases like 'image of' in Alt text." });
    }
  }

  return issues;
}
