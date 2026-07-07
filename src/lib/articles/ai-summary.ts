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
  async summarize({ title, contentText }) {
    // Generate a clean summary based on headings and paragraph texts in the content text
    const sentences = contentText
      .split(/[।|.!?\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 15 && s.length < 150 && !s.includes("http"));

    const bullets: string[] = [];
    
    // Check if title has uncertainty terms and add introductory bullet preserving it
    const hasUncertainty = /(ลือ|หลุด|คาดว่า|อาจ|ยังไม่ยืนยัน)/.test(title);
    if (hasUncertainty) {
      bullets.push(`ข้อมูลวิเคราะห์จากกระแสข่าวลือและรายละเอียดสเปกหลุดเบื้องต้นเกี่ยวกับ "${title.replace(/ลือ|หลุด|คาดว่า|อาจ|ยังไม่ยืนยัน/g, "").trim()}"`);
    } else {
      bullets.push(`สรุปประเด็นหลักและข้อมูลสำคัญของ "${title}" เพื่อประกอบการติดตามแนวโน้มเทคโนโลยี`);
    }

    // Add unique sentences as bullets
    for (const sentence of sentences) {
      if (bullets.length >= 3) {
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
    while (bullets.length < 3) {
      if (bullets.length === 1) {
        bullets.push("ข้อมูลและประเด็นเชิงลึกที่จะช่วยสนับสนุนการตัดสินใจทางธุรกิจและเทคโนโลยี");
      } else {
        bullets.push("เทคนิคและการนำเทคโนโลยีใหม่ๆ เข้ามาประยุกต์ใช้เพื่อการเปลี่ยนผ่านสู่ดิจิทัล");
      }
    }

    return {
      summary: bullets.slice(0, 3),
      source: "mock",
      generatedAt: new Date().toISOString()
    };
  }
};

/**
 * Server-safe Gemini summary provider using native fetch.
 */
export const GeminiSummaryProvider: ExecutiveSummaryProvider = {
  async summarize({ title, contentText }) {
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
                  text: `คุณคือผู้เชี่ยวชาญการเขียนข่าวเทคโนโลยี สรุปประเด็นหลักของบทความข่าวไอทีเรื่อง "${title}" ออกมาเป็นข้อสรุปภาษาไทย 3 ข้อถัดไปนี้ โดยมีเกณฑ์ดังนี้:
1. สรุปเป็นหัวข้อภาษาไทยจำนวน "ตรงกับ 3 ข้อพอดี" (ไม่ต้องใส่สัญลักษณ์หัวข้อ เช่น •, -, * หรือตัวเลขนำหน้า และไม่ต้องเขียนเกริ่นนำ)
2. อ้างอิงและใช้เฉพาะข้อมูลที่มีอยู่จริงในเนื้อหาที่ระบุเท่านั้น ห้ามสร้างข้อมูลปลอม ห้ามเพิ่มเติมสเปกสินค้า ราคา วันเปิดตัว ตัวเลขประสิทธิภาพ หรือข้อเท็จจริงใดๆ ที่ไม่ตรงกับเอกสาร
3. หากข่าวนี้เป็นข่าวลือ หรือข่าวหลุด ต้องคงคำศัพท์ที่ระบุถึงความไม่แน่นอน เช่น "ลือ", "หลุด", "คาดว่า", "อาจ", "ยังไม่ยืนยัน" ไว้อย่างเคร่งครัด ห้ามตัดคำเหล่านี้ออกเพื่อให้ดูเป็นข่าวทางการหรือความจริงที่ยืนยันแล้ว

เนื้อหาบทความ:\n\n${contentText.slice(0, 4000)}`
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
      .slice(0, 3);

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
  async summarize({ title, contentText }) {
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
            content: `You are an expert technology editorial writer. Summarize the given IT news article into exactly 3 concise Thai bullet points.
Rules:
1. Output exactly 3 lines/bullet points. Do not prepend any bullet point characters or markdown list symbols or numbers.
2. Rely ONLY on the facts mentioned in the text. Never invent specifications, prices, launch dates, performance metrics, or external facts not in the source text.
3. If the article describes rumors, leaks, or unconfirmed specs, you MUST strictly preserve uncertainty words like "ลือ", "หลุด", "คาดว่า", "อาจ", "ยังไม่ยืนยัน" in your summary. Do not state them as confirmed facts.`
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
      .slice(0, 3);

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
  maxBullets: number = 3
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
