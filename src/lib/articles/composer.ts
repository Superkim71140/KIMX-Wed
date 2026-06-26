import { NormalizedArticle } from "./types";
import { SEMANTIC_CLUSTERS } from "./taxonomy";
import { NewsArticleContentBlock } from "@/data/news";

export interface ComposerInput {
  topic: string;
  keywords: string[];
  tone?: "professional" | "conversational" | "technical";
}

export interface ComposerOutput {
  draft: Partial<NormalizedArticle>;
  generatedAt: string;
  provider: "openai" | "mock";
}

/**
 * Predicts the best taxonomy category based on keyword matching
 */
export function predictTaxonomy(topic: string, keywords: string[]): { categorySlug: string; tags: string[] } {
  const combinedText = `${topic} ${keywords.join(" ")}`.toLowerCase();
  
  let bestCluster = "tech"; // default fallback
  let maxMatches = 0;

  for (const [clusterId, clusterKeywords] of Object.entries(SEMANTIC_CLUSTERS)) {
    let matches = 0;
    for (const kw of clusterKeywords) {
      if (combinedText.includes(kw.toLowerCase())) {
        matches++;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCluster = clusterId;
    }
  }

  // Derive human-readable category based on cluster
  return {
    categorySlug: bestCluster,
    tags: keywords.length > 0 ? keywords : ["KIMX Draft"],
  };
}

export async function generateArticleDraft(input: ComposerInput): Promise<ComposerOutput> {
  const { topic, keywords } = input;
  const taxonomy = predictTaxonomy(topic, keywords);

  // If OpenAI API key is present, we could invoke it here. 
  // For safety and lack of external SDKs, we default to the Mock pipeline if no key.
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (apiKey && apiKey.length > 0) {
    try {
      // Direct REST call to OpenAI
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an expert Thai SEO copywriter and Editorial Assistant for KIMX Web.
Your task is to generate a draft news article based on the provided topic and keywords.
Return the result strictly as a JSON object matching this TypeScript interface:
{
  "title": "string (catchy Thai headline)",
  "description": "string (SEO meta description 120-160 chars)",
  "content": [
    { "type": "paragraph" | "heading" | "highlight" | "quote" | "stats", ... }
  ]
}
If any factual data is missing or uncertain, insert the exact string "[FACT-CHECK REQUIRED]" in the text.`
            },
            {
              role: "user",
              content: `Topic: ${topic}\nKeywords: ${keywords.join(", ")}\nTone: ${input.tone || "professional"}`
            }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        
        return {
          draft: {
            title: parsed.title,
            description: parsed.description,
            content: parsed.content as NewsArticleContentBlock[],
            categorySlug: taxonomy.categorySlug,
            tags: taxonomy.tags,
            isPinned: false,
            slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
            readingTime: "3 นาที",
          },
          generatedAt: new Date().toISOString(),
          provider: "openai"
        };
      }
    } catch (error) {
      console.error("OpenAI generation failed, falling back to mock:", error);
    }
  }

  // MOCK FALLBACK
  const mockContent: NewsArticleContentBlock[] = [
    {
      type: "highlight",
      title: "สรุปประเด็นสำคัญ",
      text: "• ร่างบทความนี้สร้างขึ้นโดย AI Composer\n• โปรดตรวจสอบข้อเท็จจริงทั้งหมดก่อนเผยแพร่จริง\n• ข้อมูลตัวเลขอาจต้องการการแก้ไข"
    },
    {
      type: "paragraph",
      text: `นี่คือบทความร่างสำหรับหัวข้อ "${topic}" ซึ่งถูกสร้างขึ้นโดยอัตโนมัติ ระบบได้วิเคราะห์คีย์เวิร์ด: ${keywords.join(", ")} เพื่อเป็นแนวทางในการเขียน`
    },
    {
      type: "heading",
      text: "รายละเอียดเพิ่มเติมที่ต้องตรวจสอบ"
    },
    {
      type: "paragraph",
      text: `โปรดระบุข้อมูลสถิติที่แน่นอนตรงนี้ [FACT-CHECK REQUIRED] เนื่องจาก AI ไม่สามารถยืนยันตัวเลขปัจจุบันได้`
    }
  ];

  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  return {
    draft: {
      title: `(ร่าง) ${topic}`,
      description: `คำอธิบายบทความฉบับร่างสำหรับ ${topic}. [FACT-CHECK REQUIRED] สำหรับ SEO Description`,
      content: mockContent,
      categorySlug: taxonomy.categorySlug,
      tags: taxonomy.tags,
      isPinned: false,
      slug: slug || "draft-article",
      readingTime: "2 นาที",
    },
    generatedAt: new Date().toISOString(),
    provider: "mock"
  };
}
