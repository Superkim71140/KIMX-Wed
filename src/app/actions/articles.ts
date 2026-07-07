"use server";

import { getExecutiveSummary } from "@/lib/articles/ai-summary";
import { getNewsArticleBySlug } from "@/data/news";
import { normalizeArticle } from "@/lib/articles/normalize";

/**
 * Server action to generate AI article summaries securely on the server by slug.
 */
export async function getExecutiveSummaryAction(slug: string) {
  try {
    const rawArticle = getNewsArticleBySlug(slug);
    if (!rawArticle) {
      return { success: false, error: "ไม่พบข้อมูลบทความ" };
    }
    const article = normalizeArticle(rawArticle);
    
    const contentText = article.content
      .filter(block => block.type === "paragraph" || block.type === "heading")
      .map(block => block.text)
      .join("\n");

    const result = await getExecutiveSummary(article.id, article.title, contentText, 3);
    return { success: true, summary: result.summary, source: result.source };
  } catch (error) {
    console.error("Failed to generate AI summary in Server Action:", error);
    return { success: false, error: "ไม่สามารถสร้างสรุปบทความได้ในขณะนี้" };
  }
}
