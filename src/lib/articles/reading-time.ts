import { NewsArticleContentBlock } from "@/data/news";

/**
 * Calculates reading time in minutes for the given set of article content blocks.
 * Uses word count segmenter with a stable fallback.
 */
export function calculateReadingTime(
  contentBlocks: NewsArticleContentBlock[],
  wordsPerMinute: number = 190
): string {
  if (!contentBlocks || contentBlocks.length === 0) {
    return "1 นาที";
  }

  let fullText = "";

  for (const block of contentBlocks) {
    switch (block.type) {
      case "paragraph":
      case "heading":
      case "highlight":
      case "quote":
        fullText += " " + block.text;
        break;
      case "green-box":
        if (block.title) {
          fullText += " " + block.title;
        }
        fullText += " " + block.text;
        break;
      case "stats":
        for (const item of block.items) {
          fullText += " " + item.label + " " + item.value;
        }
        break;
      case "features-grid":
        for (const item of block.items) {
          fullText += " " + item.title + " " + item.description;
        }
        break;
      case "table":
        for (const header of block.headers) {
          fullText += " " + header;
        }
        for (const row of block.rows) {
          for (const cell of row) {
            fullText += " " + cell;
          }
        }
        break;
      case "image":
      case "image-pair":
        if (block.caption) {
          fullText += " " + block.caption;
        }
        break;
      case "benchmark":
        for (const item of block.items) {
          fullText += " " + item.label;
        }
        break;
      default:
        break;
    }
  }

  const cleanedText = fullText.trim();
  if (!cleanedText) {
    return "1 นาที";
  }

  let wordCount = 0;

  // Use Intl.Segmenter when available for accurate Thai word segmentation
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    try {
      const segmenter = new Intl.Segmenter("th", { granularity: "word" });
      const segments = segmenter.segment(cleanedText);
      for (const segment of segments) {
        if (segment.isWordLike) {
          wordCount++;
        }
      }
    } catch {
      wordCount = estimateWordsFallback(cleanedText);
    }
  } else {
    wordCount = estimateWordsFallback(cleanedText);
  }

  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} นาที`;
}

/**
 * Robust fallback for estimating word count in mixed Thai/English texts when Segmenter is missing.
 */
function estimateWordsFallback(text: string): number {
  // Extract and count English words
  const englishWords = text.match(/[a-zA-Z0-9]+/g) || [];
  const englishWordCount = englishWords.length;

  // Remove English characters, numbers and whitespace to isolate Thai characters
  const remainingText = text.replace(/[a-zA-Z0-9\s]+/g, "");
  
  // Assume average Thai word is 4 characters long
  const thaiWordCount = Math.ceil(remainingText.length / 4);

  return englishWordCount + thaiWordCount;
}
