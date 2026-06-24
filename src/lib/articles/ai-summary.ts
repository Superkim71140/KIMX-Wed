export type ExecutiveSummaryResult = {
  summary: string[];
  source: "article" | "mock" | "ai";
  generatedAt?: string;
};

export type ExecutiveSummaryProvider = {
  summarize(input: {
    articleId: string;
    title: string;
    contentText: string;
    maxBullets: number;
  }): Promise<ExecutiveSummaryResult>;
};

/**
 * Predictable mock summary provider that extracts content sentences from article body.
 */
export const MockSummaryProvider: ExecutiveSummaryProvider = {
  async summarize({ title, contentText, maxBullets = 4 }) {
    // Generate a clean summary based on headings and paragraph texts in the content text
    const sentences = contentText
      .split(/[।|.!?\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 15 && s.length < 150 && !s.includes("http"));

    const bullets: string[] = [];
    
    // Add introductory bullet point
    bullets.push(`ข้อมูลวิเคราะห์และสรุปสาระสำคัญเกี่ยวกับ "${title}" ในเชิงลึกสำหรับธุรกิจและผู้อ่าน`);

    // Add unique sentences as bullets
    for (const sentence of sentences) {
      if (bullets.length >= maxBullets) {
        break;
      }
      
      const cleanSentence = sentence.replace(/^[-*•\d.\s]+/, "").trim();
      if (
        cleanSentence.length > 20 && 
        !bullets.some(b => b.includes(cleanSentence.substring(0, 15)))
      ) {
        bullets.push(cleanSentence);
      }
    }

    // Add fallback items if sentences are insufficient
    if (bullets.length < 3) {
      bullets.push("ข้อมูลและประเด็นเชิงลึกที่จะช่วยสนับสนุนการตัดสินใจทางธุรกิจและกลยุทธ์การเปลี่ยนผ่าน");
      bullets.push("เทคนิคการนำเทคโนโลยีปัญญาประดิษฐ์และเครื่องมือดิจิทัลเข้ามาช่วยเพิ่มขีดความสามารถการแข่งขัน");
    }

    return {
      summary: bullets.slice(0, maxBullets),
      source: "mock",
      generatedAt: new Date().toISOString()
    };
  }
};

/**
 * Server-safe Gemini summary provider using native fetch.
 */
export const GeminiSummaryProvider: ExecutiveSummaryProvider = {
  async summarize({ title, contentText, maxBullets }) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `สรุปประเด็นหลักของบทความชื่อ "${title}" ออกมาเป็นหัวข้อภาษาไทย 3 ถึง 4 หัวข้อ โดยมีความกระชับ อ่านง่าย และสอดคล้องกับเนื้อหาบทความต่อไปนี้ (ไม่ต้องเขียนสัญลักษณ์หัวข้อ เช่น •, -, * และไม่ต้องอธิบายเยอะ):\n\n${contentText.slice(0, 4000)}`
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.2
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API failed with status ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const summary = text
      .split("\n")
      .map((line: string) => line.replace(/^[-*•\d.\s]+/, "").trim())
      .filter((line: string) => line.length > 0)
      .slice(0, maxBullets);

    return {
      summary,
      source: "ai",
      generatedAt: new Date().toISOString()
    };
  }
};

/**
 * Server-safe OpenAI summary provider using native fetch.
 */
export const OpenAISummaryProvider: ExecutiveSummaryProvider = {
  async summarize({ title, contentText, maxBullets }) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not configured.");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert editorial writer. Summarize the given article into exactly 3 to 4 concise Thai bullet points. Do not prepend any bullet point characters or markdown list symbols.`
          },
          {
            role: "user",
            content: `Title: ${title}\nContent:\n${contentText.slice(0, 4000)}`
          }
        ],
        max_tokens: 500,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API failed with status ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";

    const summary = text
      .split("\n")
      .map((line: string) => line.replace(/^[-*•\d.\s]+/, "").trim())
      .filter((line: string) => line.length > 0)
      .slice(0, maxBullets);

    return {
      summary,
      source: "ai",
      generatedAt: new Date().toISOString()
    };
  }
};

/**
 * Generates an executive summary based on the environment provider settings.
 * Securely calls OpenAI or Gemini on the server side, or falls back to the mock provider.
 */
export async function getExecutiveSummary(
  articleId: string,
  title: string,
  contentText: string,
  maxBullets: number = 4
): Promise<ExecutiveSummaryResult> {
  const providerType = process.env.AI_SUMMARY_PROVIDER || "mock";

  if (providerType === "openai" && process.env.OPENAI_API_KEY) {
    try {
      return await OpenAISummaryProvider.summarize({ articleId, title, contentText, maxBullets });
    } catch (e) {
      console.error("OpenAI summary failed, falling back:", e);
    }
  }

  if (providerType === "gemini" && process.env.GEMINI_API_KEY) {
    try {
      return await GeminiSummaryProvider.summarize({ articleId, title, contentText, maxBullets });
    } catch (e) {
      console.error("Gemini summary failed, falling back:", e);
    }
  }

  // Fallback to local mock generator
  return await MockSummaryProvider.summarize({ articleId, title, contentText, maxBullets });
}
