export interface InternalLinkTarget {
  title: string;
  description: string;
  url: string;
  ctaText: string;
  topicBadge: string;
}

export const COMMERCIAL_LINKS: InternalLinkTarget[] = [
  {
    title: "บริการรับทำเว็บไซต์ธุรกิจ / บริษัท",
    description: "สร้างความน่าเชื่อถือให้องค์กรของคุณด้วยเว็บไซต์บริษัทดีไซน์พรีเมียม โครงสร้าง Technical SEO ครบครัน โหลดไว 100%",
    url: "/#services",
    ctaText: "ดูแพ็กเกจทำเว็บ",
    topicBadge: "รับทำเว็บไซต์"
  },
  {
    title: "บริการปรับแต่งและทำ SEO ให้ติดหน้าแรก Google",
    description: "วางระบบและโครงสร้าง SEO ให้เว็บไซต์ธุรกิจของคุณเติบโตอย่างยั่งยืน เพิ่มการมองเห็นใน Google Search แบบ Organic",
    url: "/#services",
    ctaText: "ศึกษาบริการ SEO",
    topicBadge: "ทำ SEO"
  },
  {
    title: "ผลงานเว็บไซต์ระบบจองคิวรถขนส่ง MJ-TH Express",
    description: "เจาะลึกกรณีศึกษาการพัฒนาเว็บจองคิวรถขนส่งออนไลน์ ความเร็วระดับ A+ พร้อมวางโครงสร้าง SEO คีย์เวิร์ดรถรับจ้าง",
    url: "/portfolio/mj-express",
    ctaText: "ดูเคสศึกษา MJ-TH",
    topicBadge: "ผลงานเว็บขนส่ง"
  },
  {
    title: "ผลงานเว็บไซต์ขนส่งรถมอเตอร์ไซค์ N&M18 Transport",
    description: "ตัวอย่างเว็บขนส่งมอเตอร์ไซค์และบิ๊กไบค์เฉพาะทาง รองรับมือถือ 100% พร้อมระบบสมัครงานขับรถออนไลน์ด่วน",
    url: "/portfolio/nm18",
    ctaText: "ดูเคสศึกษา N&M18",
    topicBadge: "ผลงานเว็บบิ๊กไบค์"
  },
  {
    title: "ผลงานเว็บไซต์ WMS Transport บริการตู้คอนเทนเนอร์",
    description: "ตัวอย่างการออกแบบเว็บดีไซน์ High-Contrast พรีเมียม พร้อมระบบจัดการอัปโหลดผลงานหลังบ้าน (CMS) ผ่านคลาวด์",
    url: "/portfolio/wms",
    ctaText: "ดูเคสศึกษา WMS",
    topicBadge: "ผลงานเว็บตู้คอนเทนเนอร์"
  },
  {
    title: "เกี่ยวกับ KIMX Web Agency ทีมพัฒนาผู้เชี่ยวชาญ",
    description: "ทำความรู้จักกับทีมงานที่มุ่งมั่นพัฒนาเว็บความเร็วสูง วางโครงสร้าง SEO และช่วยผลักดันธุรกิจของคุณสู่ออนไลน์อย่างแท้จริง",
    url: "/about",
    ctaText: "รู้จักทีมงานเรา",
    topicBadge: "เกี่ยวกับเรา"
  }
];

export function getInternalLinksForArticle(
  articleSlug: string,
  categorySlug?: string,
  tags?: string[]
): InternalLinkTarget[] {
  const links: InternalLinkTarget[] = [];
  const lowercaseTags = (tags || []).map(t => t.toLowerCase());

  // Helper to add if not already added
  const addLink = (url: string) => {
    if (links.some(l => l.url === url)) return;
    const target = COMMERCIAL_LINKS.find(l => l.url === url);
    if (target && links.length < 3) {
      links.push(target);
    }
  };

  // Rule 1: If article belongs to automotive/motorcycle or tags contain vehicle terms
  if (
    categorySlug === "automotive" ||
    lowercaseTags.some(t => t.includes("รถ") || t.includes("มอเตอร์ไซค์") || t.includes("บิ๊กไบค์") || t.includes("ev"))
  ) {
    addLink("/portfolio/nm18");
    addLink("/portfolio/mj-express");
    addLink("/portfolio/wms");
  }

  // Rule 2: If tags or content contains SEO or search engine optimization
  if (
    categorySlug === "seo" ||
    lowercaseTags.some(t => t.includes("seo") || t.includes("google") || t.includes("ค้นหา") || t.includes("อันดับ"))
  ) {
    addLink("/#services"); // Map to SEO service (anchor)
    addLink("/portfolio/mj-express"); // It had 100/100 SEO
  }

  // Rule 3: Web design/development topics
  if (
    categorySlug === "web-development" ||
    lowercaseTags.some(t => t.includes("เว็บ") || t.includes("design") || t.includes("coding") || t.includes("code"))
  ) {
    addLink("/#services"); // Map to Web development service
    addLink("/portfolio/wms");
  }

  // Fallbacks: fill up to 3 links
  const fallbacks = [
    "/#services",
    "/portfolio/mj-express",
    "/about",
    "/portfolio/nm18",
    "/portfolio/wms"
  ];

  for (const url of fallbacks) {
    if (links.length >= 3) break;
    addLink(url);
  }

  return links;
}
