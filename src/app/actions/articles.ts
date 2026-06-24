"use server";

import { getExecutiveSummary } from "@/lib/articles/ai-summary";

/**
 * Server action to generate AI article summaries securely on the server.
 */
export async function getExecutiveSummaryAction(
  articleId: string,
  title: string,
  contentText: string
) {
  try {
    const result = await getExecutiveSummary(articleId, title, contentText);
    return { success: true, summary: result.summary, source: result.source };
  } catch (error) {
    console.error("Failed to generate AI summary in Server Action:", error);
    return { success: false, error: "ไม่สามารถสร้างสรุปบทความได้ในขณะนี้" };
  }
}
