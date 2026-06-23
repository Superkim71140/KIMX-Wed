export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  promoText?: string;
  btnText: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Kickoff",
    price: "3,000",
    description: "เหมาะสำหรับเริ่มต้นสร้างตัวตน",
    features: [
      "เว็บไซต์ One Page (1 หน้า)",
      "ดีไซน์ทันสมัย UX/UI Standard",
      "รองรับมือถือ 100% (Responsive)",
      "พื้นที่ Hosting 10 GB (High Speed)",
      "ฟรี Domain Name 1 ปี",
      "ติดตั้งระบบความปลอดภัย SSL",
      "เชื่อมต่อ Social Media พื้นฐาน"
    ],
    btnText: "ติดต่อประเมินราคา"
  },
  {
    id: "business",
    name: "Business Growth",
    price: "3,500",
    originalPrice: "5,500",
    description: "ยอดนิยม",
    isPopular: true,
    promoText: "โปรโมชั่นปีใหม่",
    features: [
      "เว็บไซต์สูงสุด 10 หน้า",
      "ระบบจัดการบทความ (CMS)",
      "Advanced SEO โครงสร้างสมบูรณ์",
      "รองรับระบบหลายภาษา (Multi-lang)",
      "ติดตั้ง Google Analytics/Pixel",
      "พื้นที่ Hosting ไม่จำกัด (SSD)",
      "ดูแลระบบฟรี 1 ปีเต็ม"
    ],
    btnText: "ติดต่อประเมินราคา"
  },
  {
    id: "corporate",
    name: "Corporate & Custom",
    price: "12,500+",
    description: "ระบบอัจฉริยะสำหรับองค์กรใหญ่",
    features: [
      "ออกแบบระบบ Custom Function",
      "ระบบสมาชิก / E-commerce เต็มรูปแบบ",
      "เชื่อมต่อ API ภายนอก / Payment Gateway",
      "Web Performance ระดับ A+",
      "ระบบความปลอดภัยขั้นสูง (High Security)",
      "Cloud Server ส่วนตัว (Private VPS)",
      "บริการ Priority Support 24/7"
    ],
    btnText: "ติดต่อประเมินราคา"
  }
];
export const pricingDisclaimer = "*ราคาอาจมีการเปลี่ยนแปลงตามฟังก์ชันพิเศษเพิ่มเติมที่ลูกค้าต้องการ";
