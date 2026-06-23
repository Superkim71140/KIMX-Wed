export type PortfolioCategory =
  | "corporate"
  | "hire"
  | "bike"
  | "moving"
  | "seo";

export type PortfolioItem = {
  slug: string;
  title: string;
  clientName?: string;
  category: PortfolioCategory[];
  industry?: string;
  year?: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  features: string[];
  services?: string[];
  techStack?: string[];
  liveUrl?: string;
  accent: string;
  badge?: string;
};

export const portfolioCategories = [
  { id: "all", label: "ทั้งหมด" },
  { id: "corporate", label: "เว็บธุรกิจ" },
  { id: "hire", label: "รถรับจ้าง" },
  { id: "bike", label: "มอเตอร์ไซค์ / บิ๊กไบค์" },
  { id: "moving", label: "ย้ายบ้าน / ย้ายของ" },
  { id: "seo", label: "SEO พร้อมใช้งาน" }
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "mj-express",
    title: "MJ-TH Express",
    clientName: "บริษัท เอ็มเจ-ทีเอช เอ็กซ์เพรส จำกัด",
    category: ["hire", "moving", "seo"],
    industry: "ขนส่งสินค้า & โลจิสติกส์",
    year: "2025",
    description: "ผู้เชี่ยวชาญบริการรถรับจ้าง ขนส่งสินค้าและกระจายสินค้าด่วนทั่วประเทศ ด้วยระบบจองคิวออนไลน์และระบบจัดสรรคิวงานอัจฉริยะ",
    image: "/images/portfolio/M&J.png",
    alt: "ตัวอย่างดีไซน์เว็บไซต์จริง MJ-TH Express ขนส่งสินค้า โดย KIMX Web",
    tags: ["รถรับจ้าง", "ย้ายบ้าน", "SEO พร้อมใช้งาน"],
    metrics: [
      { label: "ความเร็วเว็บ", value: "A+ Performance" },
      { label: "คะแนน SEO", value: "100/100" },
      { label: "ระบบเสริม", value: "จองคิวรถออนไลน์" }
    ],
    features: [
      "ระบบจองคิวรถขนส่งออนไลน์",
      "คำนวณราคาค่าส่งเบื้องต้น",
      "หน้าแผงควบคุมรถร่วมบริการ",
      "Technical SEO ความเร็ว A+"
    ],
    services: ["UI/UX Design", "Custom Frontend Dev", "On-Page SEO", "LINE Booking API"],
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    liveUrl: "https://www.mj-th-express.com/",
    accent: "from-blue-500 via-sky-500 to-indigo-600",
    badge: "รถรับจ้าง & ย้ายบ้าน"
  },
  {
    slug: "nm18",
    title: "N&M18 Transport",
    clientName: "บริษัท เอ็นแอนด์เอ็ม 18 ทรานสปอร์ต จำกัด",
    category: ["bike", "hire", "seo"],
    industry: "ขนส่งรถจักรยานยนต์ & บิ๊กไบค์",
    year: "2025",
    description: "บริการขนส่งสินค้าด้วยรถเทรลเลอร์ รถพ่วง ตู้คอนเทนเนอร์ และรถเฉพาะทางสำหรับขนส่งมอเตอร์ไซค์ / บิ๊กไบค์ ทั่วประเทศ",
    image: "/images/portfolio/N18M.png",
    alt: "ตัวอย่างดีไซน์เว็บไซต์จริง N&M18 Transport ขนส่งสินค้า โดย KIMX Web",
    tags: ["บิ๊กไบค์", "รถพ่วง", "ตู้คอนเทนเนอร์"],
    metrics: [
      { label: "ประเภท", value: "ขนส่งเฉพาะทาง" },
      { label: "สมัครงาน", value: "ระบบรับสมัครออนไลน์" },
      { label: "ความเร็ว", value: "LCP 0.8s" }
    ],
    features: [
      "ตารางเดินรถตู้คอนเทนเนอร์",
      "ระบบรับสมัครงานคนขับออนไลน์",
      "ระบบขอใบเสนอราคาด่วน",
      "รองรับทุกอุปกรณ์เคลื่อนที่"
    ],
    services: ["Web Development", "Recruitment Form Integration", "SEO Architecture"],
    techStack: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    liveUrl: "https://www.nm18transport.com/",
    accent: "from-sky-500 via-blue-600 to-cyan-500",
    badge: "มอเตอร์ไซค์ / บิ๊กไบค์"
  },
  {
    slug: "wms",
    title: "WMS Transport",
    clientName: "บริษัท ดับบลิวเอ็มเอส ทรานสปอร์ต จำกัด",
    category: ["corporate", "hire", "seo"],
    industry: "ขนส่งสินค้าทางบก & ตู้คอนเทนเนอร์",
    year: "2025",
    description: "เว็บไซต์ธุรกิจบริการขนส่งรถบรรทุก 10 ล้อ รถพ่วง และรถเทรลเลอร์ระดับมืออาชีพ ดีไซน์พรีเมียม โครงสร้าง SEO ครบครัน",
    image: "/images/portfolio/WMS.png",
    alt: "ตัวอย่างดีไซน์เว็บไซต์จริง WMS Transport ขนส่งสินค้า โดย KIMX Web",
    tags: ["สิบล้อ", "รถพ่วง", "เว็บองค์กร"],
    metrics: [
      { label: "ดีไซน์", value: "High-Contrast" },
      { label: "ติดต่อ", value: "LINE API Link" },
      { label: "หลังบ้าน", value: "CMS อัปโหลดรูป" }
    ],
    features: [
      "แกลเลอรีผลงานขบวนรถสิบล้อ",
      "ระบบจองคิวแชทด่วน LINE",
      "ดีไซน์ High-Contrast พรีเมียม",
      "ระบบจัดการอัปโหลดภาพหลังบ้าน"
    ],
    services: ["UI/UX Design", "Custom Frontend Dev", "Content Management System"],
    techStack: ["NextJS App Router", "Tailwind v4", "Cloudinary"],
    liveUrl: "https://wms-transport.com/",
    accent: "from-blue-600 via-indigo-600 to-sky-500",
    badge: "เว็บธุรกิจขนส่ง"
  },
  {
    slug: "corporate-business-website",
    title: "Corporate Website สำหรับธุรกิจบริการ",
    clientName: "SME Service Group",
    category: ["corporate", "seo"],
    industry: "ธุรกิจบริการ & อุตสาหกรรม",
    year: "2025",
    description: "เว็บไซต์องค์กรดีไซน์พรีเมียมหรูหราสำหรับสร้างความน่าเชื่อถือ แนะนำข้อมูลบริษัท บริการ แกลเลอรีผลงาน และช่องทางติดต่อด่วนครบวงจร",
    image: "/assets/images/a1-corporate-website.png",
    alt: "ตัวอย่างผลงาน Corporate Website",
    tags: ["Corporate", "SEO-ready", "Responsive"],
    metrics: [
      { label: "ประเภท", value: "เว็บไซต์บริษัท" },
      { label: "ความเร็ว", value: "A+ Performance" },
      { label: "รองรับ", value: "มือถือ 100%" }
    ],
    features: [
      "หน้าเกี่ยวกับเรา & ข้อมูลติดต่อ",
      "รายการบริการ & แคตตาล็อก",
      "แกลเลอรีภาพผลงาน & ลูกค้า",
      "แบบฟอร์มขอใบเสนอราคาระบบ"
    ],
    services: ["UI/UX Design", "Custom Frontend Dev", "On-Page SEO"],
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    accent: "from-rose-400 via-pink-500 to-orange-400",
    badge: "เว็บธุรกิจบริการ"
  },
  {
    slug: "ecommerce-online-store",
    title: "E-commerce Website สำหรับร้านค้าออนไลน์",
    clientName: "Modern Retail Brand",
    category: ["corporate", "seo"],
    industry: "ค้าปลีก & ร้านค้าออนไลน์",
    year: "2025",
    description: "เว็บไซต์จำหน่ายสินค้าออนไลน์ พร้อมหน้าแสดงรายการ สินค้าแนะนำ ระบบตะกร้าสินค้า ระบบชำระเงินออนไลน์ และหลังบ้านจัดการคำสั่งซื้อและสต็อกสินค้า",
    image: "/assets/images/a2-ecommerce-website.png",
    alt: "ตัวอย่างผลงาน E-commerce Website",
    tags: ["E-commerce", "Cart", "Payment Gateway"],
    metrics: [
      { label: "ประเภท", value: "ร้านค้าออนไลน์" },
      { label: "ระบบ", value: "ตะกร้า + ชำระเงิน" },
      { label: "ชำระเงิน", value: "QR/Credit Card" }
    ],
    features: [
      "ระบบแสดงรายละเอียดและตัวเลือกสินค้า",
      "ระบบตะกร้าสินค้าและคำนวณราคาสุทธิ",
      "ระบบเชื่อมต่อ Gateway ชำระเงินด่วน",
      "หลังบ้านจัดการใบส่งสินค้าและการขนส่ง"
    ],
    services: ["E-commerce Logic Setup", "Database Schema", "Security Hardening"],
    techStack: ["React", "Next.js", "Tailwind v4", "PostgreSQL", "Stripe API"],
    accent: "from-cyan-400 via-blue-500 to-violet-500",
    badge: "ร้านค้าออนไลน์"
  },
  {
    slug: "landing-sale-page",
    title: "Landing Page สำหรับยิงแอดปิดการขาย",
    clientName: "Direct Response Campaign",
    category: ["seo"],
    industry: "เครื่องสำอาง & อาหารเสริม",
    year: "2025",
    description: "หน้า Sale Page สไตล์ฟังก์ชันนัลเน้นอัตราการปิดการขาย (Conversion Rate) มีดีไซน์กระตุ้นการตัดสินใจ แบนเนอร์โปรโมชัน และเชื่อมโยงส่งบรีฟเข้า LINE ทันที",
    image: "/assets/images/a3-landing-page.png",
    alt: "ตัวอย่างผลงาน Landing Page Sale Page",
    tags: ["Landing Page", "Ads", "Conversion Focus"],
    metrics: [
      { label: "เป้าหมาย", value: "ปิดการขายด่วน" },
      { label: "จุดเด่น", value: "CTA ปิดดีลง่าย" },
      { label: "เชื่อมต่อ", value: "LINE API" }
    ],
    features: [
      "ดีไซน์ Layout เน้น Conversion Rate",
      "แบนเนอร์โปรโมชันพร้อมนับเวลาถอยหลัง",
      "สไลด์โชว์รีวิวและใบรับรองคุณภาพ",
      "ฟอร์มสั่งซื้อด่วนเชื่อมแจ้งเตือนไลน์"
    ],
    services: ["Copywriting", "Fast LCP Optimization", "LINE Webhook Setup"],
    techStack: ["Next.js Static Export", "Tailwind CSS", "CSS Animations"],
    accent: "from-red-400 via-orange-500 to-amber-400",
    badge: "Landing/Sale Page"
  },
  {
    slug: "custom-web-system",
    title: "Custom Web System สำหรับระบบเฉพาะธุรกิจ",
    clientName: "Logistics & Warehouse Corp",
    category: ["corporate"],
    industry: "ขนส่ง & คลังสินค้า",
    year: "2025",
    description: "ระบบเว็บแอปพลิเคชันจัดการข้อมูลหลังบ้านของธุรกิจ มีระบบสมัครสมาชิก แดชบอร์ดสรุปสถิติ กราฟข้อมูล การจัดแจงสิทธิ์ และฟังก์ชันส่งออก Excel/PDF",
    image: "/assets/images/a4-custom-web-system.png",
    alt: "ตัวอย่างผลงาน Custom Web System",
    tags: ["Custom System", "Dashboard", "API Integration"],
    metrics: [
      { label: "ระบบ", value: "เว็บเฉพาะทาง" },
      { label: "เชื่อมต่อ", value: "API Platform" },
      { label: "รายงาน", value: "PDF & Excel" }
    ],
    features: [
      "ระบบความปลอดภัยสิทธิ์การเข้าถึงข้อมูล",
      "แดชบอร์ดแสดงผลสรุปกราฟธุรกิจ",
      "ระบบ API หลังบ้านดึงข้อมูลเรียลไทม์",
      "ระบบ Export รายงานการทำงานส่งออกเมล์"
    ],
    services: ["System Architecture", "API Engineering", "Excel/PDF Generators"],
    techStack: ["Next.js App Router", "NodeJS", "ChartJS", "Tailwind CSS"],
    accent: "from-teal-400 via-cyan-400 to-lime-400",
    badge: "Custom System"
  }
];
