export type Service = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: "Code" | "TrendingUp" | "ShieldCheck" | "Target";
};

export const services: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "พัฒนาเว็บไซต์ด้วย Tech Stack ทันสมัย ออกแบบ UX/UI ระดับพรีเมียม ตอบโจทย์ทุกฟังก์ชันการใช้งาน เพื่อภาพลักษณ์ธุรกิจที่เหนือกว่าคู่แข่ง",
    longDescription: "บริการรับทำเว็บไซต์ ออกแบบดีไซน์ล้ำสมัย ดึงดูดสายตา มีระบบความปลอดภัยและรองรับ Core Web Vitals โหลดเร็วสะใจในทุกดีไวซ์",
    iconName: "Code"
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description: "ดันอันดับเว็บไซต์สู่หน้าแรกด้วยกลยุทธ์ SEO เชิงลึก เพิ่ม Traffic คุณภาพแบบ Organic สร้างการเติบโตที่ยั่งยืนโดยไม่ต้องพึ่งพาโฆษณาตลอดไป",
    longDescription: "วางโครงสร้าง SEO ที่เหมาะสม ตั้งแต่การทำ On-Page, Off-Page, Schema Markup, และความเร็ว เพื่อให้อัลกอริทึมของ Google ให้คะแนนดีที่สุด",
    iconName: "TrendingUp"
  },
  {
    id: "maintenance",
    title: "System Maintenance",
    description: "บริการดูแลและอัปเดตระบบให้ทันสมัย ปลอดภัย และรวดเร็วอยู่เสมอ พร้อมทีม Support ที่คอยช่วยเหลือคุณ เพื่อให้ธุรกิจไม่สะดุด",
    longDescription: "บริการตรวจเช็คระบบความปลอดภัย สำรองข้อมูลสม่ำเสมอ แก้ไขบั๊ก และอัปเกรดประสิทธิภาพเซิร์ฟเวอร์เพื่อให้เว็บมี Uptime สูงสุด",
    iconName: "ShieldCheck"
  },
  {
    id: "ads",
    title: "Performance Ads",
    description: "บริหารจัดการแคมเปญโฆษณา Google Ads อย่างแม่นยำ เจาะกลุ่มเป้าหมายที่ใช่ ลดต้นทุน เพิ่มยอดขาย วัดผลได้จริงทุกคลิก",
    longDescription: "วิเคราะห์และวางกลยุทธ์ยิงแอดในทุกแพลตฟอร์มอย่างคุ้มค่า เพื่อเจาะหากลุ่มเป้าหมายที่พร้อมซื้อและเกิดการซื้อซ้ำ",
    iconName: "Target"
  }
];
