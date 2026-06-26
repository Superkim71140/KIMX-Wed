export interface TopicClusterNode {
  title: string;
  url: string;
  description: string;
}

export interface TopicCluster {
  id: string;
  name: string;
  categorySlug: string;
  commercialPillars: TopicClusterNode[];
  educationalGuides: TopicClusterNode[];
}

export const topicClusters: TopicCluster[] = [
  {
    id: "automotive",
    name: "Automotive & Transportation Cluster",
    categorySlug: "automotive",
    commercialPillars: [
      {
        title: "กรณีศึกษา: เว็บไซต์ขนส่งรถมอเตอร์ไซค์ N&M18 Transport",
        url: "/portfolio/nm18",
        description: "บริการขนส่งบิ๊กไบค์ ทั่วประเทศ พร้อมฟอร์มสมัครงานออนไลน์"
      },
      {
        title: "กรณีศึกษา: เว็บไซต์ระบบจองคิวรถขนส่ง MJ-TH Express",
        url: "/portfolio/mj-express",
        description: "ระบบจองคิวรถบรรทุกและรถรับจ้างระดับประเทศ"
      }
    ],
    educationalGuides: [
      {
        title: "เปิดตัว New ZONTES 368E ETC สปอร์ตลักชัวรีสกู๊ตเตอร์ ราคา 163,800 บาท",
        url: "/news/automotive/new-zontes-368e-etc-2026-launch",
        description: "รายละเอียดเครื่องยนต์ 368cc คันเร่งไฟฟ้า ETC และกล้อง DVR บันทึกภาพในตัว"
      },
      {
        title: "ทำไมเว็บไซต์ธุรกิจควรมีบทความ SEO ทุกสัปดาห์?",
        url: "/news/automotive/why-business-needs-weekly-seo-articles",
        description: "วินัยสร้างเนื้อหาที่มีคุณค่าต่อผู้ใช้ช่วยดันอันดับ Google"
      },
      {
        title: "AI Search จะเปลี่ยนวิธีทำ SEO อย่างไร?",
        url: "/news/automotive/ai-search-and-seo",
        description: "วิธีปรับตัวของเว็บไซต์ธุรกิจยุค AI Overviews เพื่อเอาตัวรอด"
      }
    ]
  },
  {
    id: "web-development",
    name: "Web Development & Custom Application Hub",
    categorySlug: "web-development",
    commercialPillars: [
      {
        title: "บริการรับทำเว็บไซต์ธุรกิจความเร็วสูง",
        url: "/#services",
        description: "ดีไซน์พรีเมียม วางโครงสร้าง SEO และรองรับ Core Web Vitals"
      },
      {
        title: "กรณีศึกษา: ออกแบบเว็บดีไซน์ High-Contrast WMS Transport",
        url: "/portfolio/wms",
        description: "ดีไซน์หรูหราพร้อมระบบหลังบ้าน (CMS) และการจัดการสื่อผ่าน Cloud"
      }
    ],
    educationalGuides: [
      {
        title: "ทำไมเว็บไซต์ธุรกิจควรมีบทความ SEO ทุกสัปดาห์?",
        url: "/news/automotive/why-business-needs-weekly-seo-articles",
        description: "วิเคราะห์เชิงลึกว่าการอัปเดตสม่ำเสมอมีผลกับความเร็วบอทอย่างไร"
      }
    ]
  },
  {
    id: "seo",
    name: "Search Engine Optimization & Visibility Hub",
    categorySlug: "seo",
    commercialPillars: [
      {
        title: "บริการทำ SEO เชิงลึกเพื่อธุรกิจ",
        url: "/#services",
        description: "เพิ่มทราฟฟิกคุณภาพ ค้นหาติดหน้าแรก Google ด้วยหลักการยั่งยืน"
      },
      {
        title: "วิเคราะห์บริการวิจัยคีย์เวิร์ด (Keyword Research)",
        url: "/#services",
        description: "วางกลยุทธ์หัวข้อให้สร้างยอดขายได้จริงสำหรับธุรกิจ SME"
      }
    ],
    educationalGuides: [
      {
        title: "AI Search จะเปลี่ยนวิธีทำ SEO อย่างไร?",
        url: "/news/automotive/ai-search-and-seo",
        description: "เจาะลึกผลกระทบของ Generative AI และทราฟฟิกตกต่ำ"
      }
    ]
  }
];

export function getTopicClusterByCategory(categorySlug: string): TopicCluster | undefined {
  if (categorySlug === "automotive") {
    return topicClusters.find(c => c.id === "automotive");
  }
  if (categorySlug === "seo" || categorySlug === "digital-business") {
    return topicClusters.find(c => c.id === "seo");
  }
  // Default fallback is Web Development
  return topicClusters.find(c => c.id === "web-development");
}
