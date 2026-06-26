"use server";

import { generateArticleDraft, ComposerInput } from "@/lib/articles/composer";
import { validateArticleStyle } from "@/lib/articles/style-guard";

export async function generateArticleDraftAction(input: ComposerInput) {
  try {
    // Generate draft using AI composer
    const result = await generateArticleDraft(input);

    // Run style guard validation on the generated draft
    const issues = validateArticleStyle(result.draft);

    return {
      success: true,
      data: {
        draft: result.draft,
        generatedAt: result.generatedAt,
        provider: result.provider,
        issues
      }
    };
  } catch (error) {
    console.error("Draft generation action failed:", error);
    return {
      success: false,
      error: "Failed to generate article draft."
    };
  }
}
