import { articles } from "./articles";

export type NewsArticleContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "highlight"; title?: string; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "stats"; items: Array<{ value: string; label: string }> }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "features-grid"; items: Array<{ title: string; description: string }> }
  | { type: "green-box"; title: string; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "share-buttons"; shareUrl: string; reviewUrl: string }
  | { type: "benchmark"; items: Array<{ label: string; score: number; maxScore: number; color?: string }> };

export interface NewsArticle {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  subCategory?: "car" | "motorcycle";
  coverImage: string; // Dynamic CSS gradient classes or premium image URL
  coverFit?: "cover" | "contain";
  publishedAt: string;
  updatedAt: string;
  author: string;
  readingTime: string;
  tags: string[];
  featured: boolean;
  isPinned?: boolean; // Optional flag to pin articles to the top of selectors
  content: NewsArticleContentBlock[];
}

const exciseEvFinanceSupport2026 = articles.find(a => a.id === "excise-ev-finance-support-2026");

const mappedEvFinanceArticle: NewsArticle | null = exciseEvFinanceSupport2026 ? {
  title: exciseEvFinanceSupport2026.title,
  slug: exciseEvFinanceSupport2026.slug,
  excerpt: exciseEvFinanceSupport2026.description,
  category: exciseEvFinanceSupport2026.category,
  categorySlug: exciseEvFinanceSupport2026.categorySlug || "tech",
  subCategory: "car",
  coverImage: exciseEvFinanceSupport2026.coverImage || exciseEvFinanceSupport2026.image || "",
  coverFit: exciseEvFinanceSupport2026.coverFit || "cover",
  publishedAt: exciseEvFinanceSupport2026.publishedAt,
  updatedAt: exciseEvFinanceSupport2026.updatedAt,
  author: exciseEvFinanceSupport2026.author || "KIMX Team",
  readingTime: exciseEvFinanceSupport2026.readingTime || "3 นาที",
  tags: exciseEvFinanceSupport2026.tags || [],
  featured: exciseEvFinanceSupport2026.featured || false,
  isPinned: exciseEvFinanceSupport2026.isPinned || false,
  // Since ArticleContentBlock is a subset of NewsArticleContentBlock, we can safely cast or map it.
  content: exciseEvFinanceSupport2026.content as unknown as NewsArticleContentBlock[],
} : null;

const hondaCity2026 = articles.find(a => a.id === "new-honda-city-2026-launch-thailand");

const mappedHondaCityArticle: NewsArticle | null = hondaCity2026 ? {
  title: hondaCity2026.title,
  slug: hondaCity2026.slug,
  excerpt: hondaCity2026.description,
  category: hondaCity2026.category,
  categorySlug: hondaCity2026.categorySlug || "automotive",
  subCategory: "car",
  coverImage: hondaCity2026.coverImage || hondaCity2026.image || "",
  coverFit: hondaCity2026.coverFit || "cover",
  publishedAt: hondaCity2026.publishedAt,
  updatedAt: hondaCity2026.updatedAt,
  author: hondaCity2026.author || "KIMX Team",
  readingTime: hondaCity2026.readingTime || "7 นาที",
  tags: hondaCity2026.tags || [],
  featured: hondaCity2026.featured || false,
  isPinned: hondaCity2026.isPinned || false,
  content: hondaCity2026.content as unknown as NewsArticleContentBlock[],
} : null;

export const newsArticles: NewsArticle[] = [
  ...(mappedEvFinanceArticle ? [mappedEvFinanceArticle] : []),
  ...(mappedHondaCityArticle ? [mappedHondaCityArticle] : []),
  {
    title: "New ZONTES 368E ETC เปิดราคา 163,800 บาท สปอร์ตลักชัวรีสกู๊ตเตอร์ อัดเทคโนโลยีเพื่อสายเดินทาง",
    slug: "new-zontes-368e-etc-2026-launch",
    excerpt: "เปิดตัว New ZONTES 368E ETC สปอร์ตลักชัวรีสกู๊ตเตอร์พิกัด 368 cc คันเร่งไฟฟ้า กล้อง DVR หน้า-หลัง ในราคาแนะนำเพียง 163,800 บาท",
    category: "ยานยนต์",
    categorySlug: "automotive",
    subCategory: "motorcycle",
    coverImage: "/images/news/zontes-368e/Zontespage.webp",
    coverFit: "contain",
    publishedAt: "2026-06-26T15:03:00+07:00",
    updatedAt: "2026-06-26T15:03:00+07:00",
    author: "KIMX Moto Editor",
    readingTime: "5 นาที",
    tags: ["Zontes", "368E ETC", "Big Scooter", "บิ๊กสกู๊ตเตอร์"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "ZONTES เปิดตัว **New ZONTES 368E ETC** อย่างเป็นทางการในประเทศไทย พร้อมราคาแนะนำ **163,800 บาท** วางตำแหน่งเป็นสกู๊ตเตอร์พิกัดกลางที่เน้นการใช้งานได้ทั้งในเมืองและการเดินทางระยะไกล โดยรอบนี้ไม่ได้ปรับเพียงรายละเอียดภายนอก แต่เพิ่มระบบควบคุมและอุปกรณ์ใหม่เข้ามาหลายรายการ"
      },
      {
        type: "paragraph",
        text: "จุดที่น่าสนใจของ 368E ETC คือแนวคิดการรวมความคล่องตัวของสกู๊ตเตอร์เข้ากับอุปกรณ์ที่ช่วยให้การขี่ทางไกลสะดวกและปลอดภัยขึ้น ไม่ว่าจะเป็น**คันเร่งไฟฟ้า** **Cruise Control** **กล้องบันทึกภาพหน้า-หลัง** **ชิลด์ปรับไฟฟ้า** ระบบเชื่อมต่อสมาร์ตโฟน รวมถึงชุดช่วงล่างและระบบเบรกที่อัปเกรดมาให้ครบกว่าเดิม"
      },
      {
        type: "image",
        src: "/images/news/zontes-368e/Zontes-368e1.webp",
        alt: "รถจักรยานยนต์ New ZONTES 368E ETC บิ๊กสกู๊ตเตอร์สปอร์ตลักชัวรีสีเทาหรูหราขณะเปิดตัวอย่างเป็นทางการในประเทศไทย"
      },
      {
        type: "heading",
        text: "เครื่องยนต์ 368 cc เน้นแรงบิดและการตอบสนอง"
      },
      {
        type: "paragraph",
        text: "New ZONTES 368E ETC ใช้เครื่องยนต์สูบเดียว High Compression Engine ขนาด **368 cc** ระบายความร้อนด้วยน้ำ และมีระบบ **Oil Cooling** เข้ามาช่วยดูแลอุณหภูมิของน้ำมันเครื่องในช่วงที่ใช้งานต่อเนื่องหรือขี่ด้วยความเร็วสูง"
      },
      {
        type: "paragraph",
        text: "เครื่องยนต์รุ่นนี้มีอัตราส่วนกำลังอัด **11.8:1** พร้อมระบบหัวฉีดอิเล็กทรอนิกส์ **Bosch** โดยผู้ผลิตระบุกำลังสูงสุดไว้ที่ **38.75 แรงม้า** ที่ **7,500 รอบต่อนาที** และแรงบิดสูงสุด **40 นิวตันเมตร** ที่ **6,000 รอบต่อนาที**"
      },
      {
        type: "paragraph",
        text: "อีกส่วนที่ได้รับการปรับปรุงคือระบบส่งกำลัง ซึ่งถูกออกแบบให้ทำงานนุ่มนวลขึ้นในช่วงออกตัว พร้อมลดเสียงรบกวนระหว่างใช้งาน เพื่อให้เหมาะกับทั้งการขี่ในชีวิตประจำวันและการเดินทางไกลที่ต้องใช้ความต่อเนื่องของกำลังเครื่องยนต์"
      },
      {
        type: "image",
        src: "/images/news/zontes-368e/Zontes-368e2.webp",
        alt: "เครื่องยนต์ขนาด 368 cc แบบ High Compression อัตราส่วนกำลังอัด 11.8:1 ของ ZONTES 368E ETC"
      },
      {
        type: "heading",
        text: "ETC เพิ่มความละเอียดในการควบคุมคันเร่ง"
      },
      {
        type: "paragraph",
        text: "ไฮไลต์สำคัญของรุ่น ETC คือการเปลี่ยนมาใช้ระบบ **Electronic Throttle Control** หรือ**คันเร่งไฟฟ้า** ซึ่งส่งคำสั่งจากผู้ขี่ไปยังระบบจัดการเครื่องยนต์ผ่านเซ็นเซอร์แทนการใช้สายคันเร่งแบบเดิม"
      },
      {
        type: "paragraph",
        text: "ผลที่ได้คือการตอบสนองของคันเร่งมีความละเอียดมากขึ้น ช่วยให้ผู้ขี่ควบคุมจังหวะเปิดคันเร่งได้ง่ายขึ้น ทั้งตอนขี่ในเมืองที่ต้องเร่งและผ่อนคันเร่งบ่อย หรือช่วงใช้ความเร็วต่อเนื่องบนถนนเปิด"
      },
      {
        type: "paragraph",
        text: "ระบบ ETC ยังทำงานร่วมกับโหมดขับขี่ 2 รูปแบบ ได้แก่ **Touring Mode** และ **Sport Mode** โดยโหมด Touring จะให้บุคลิกการตอบสนองที่นุ่มนวล เหมาะกับการใช้งานทั่วไปหรือขี่ทางไกล ส่วน Sport Mode จะเพิ่มความกระฉับกระเฉงของการตอบสนอง เพื่อรองรับผู้ขี่ที่ต้องการฟีลลิ่งสนุกขึ้นในจังหวะเร่งแซง"
      },
      {
        type: "image",
        src: "/images/news/zontes-368e/Zontes-368e3.webp",
        alt: "แฮนด์บาร์และสวิตช์ควบคุมของ New ZONTES 368E ETC ที่มีปุ่มปรับระดับและเลือกโหมดการขับขี่ Touring และ Sport"
      },
      {
        type: "heading",
        text: "Cruise Control ช่วยลดภาระเมื่อต้องขี่ไกล"
      },
      {
        type: "paragraph",
        text: "สำหรับผู้ที่ใช้รถเดินทางต่างจังหวัดหรือขี่บนเส้นทางยาว ระบบ **Cruise Control** เป็นอีกฟีเจอร์ที่ช่วยเพิ่มความสะดวกในการใช้งาน เพราะสามารถรักษาความเร็วให้คงที่โดยไม่ต้องกำคันเร่งไว้ตลอดเวลา"
      },
      {
        type: "paragraph",
        text: "ฟังก์ชันนี้ช่วยลดความเมื่อยล้าบริเวณข้อมือขวาได้ในระดับหนึ่ง โดยเฉพาะช่วงขี่ทางตรงต่อเนื่อง และทำให้คาแรกเตอร์ของ 368E ETC แตกต่างจากสกู๊ตเตอร์ทั่วไปที่เน้นเพียงการใช้งานในเมือง"
      },
      {
        type: "image",
        src: "/images/news/zontes-368e/Zontes-368e4.webp",
        alt: "ปุ่มสวิตช์เปิดปิดระบบควบคุมความเร็วอัตโนมัติ Cruise Control บนประกับแฮนด์ขวาของ Zontes 368E"
      },
      {
        type: "heading",
        text: "กล้อง DVR หน้า-หลัง พร้อมบันทึกภาพ Full HD"
      },
      {
        type: "paragraph",
        text: "ZONTES 368E ETC มาพร้อม**กล้องบันทึกภาพด้านหน้าและด้านหลัง**แบบติดตั้งจากโรงงาน รองรับการบันทึกวิดีโอความละเอียด **1080P Full HD** ตลอดเวลาการใช้งาน"
      },
      {
        type: "paragraph",
        text: "ชุดกล้องใช้เลนส์มุมกว้าง **140 องศา** พร้อมรูรับแสง **F1.8** และมีหน่วยความจำภายในขนาด **128GB** ช่วยให้ผู้ขี่สามารถเก็บภาพเส้นทางหรือใช้เป็นข้อมูลประกอบในกรณีเกิดเหตุไม่คาดคิดระหว่างเดินทางได้"
      },
      {
        type: "image",
        src: "/images/news/zontes-368e/Zontes-368e5.webp",
        alt: "กล้องบันทึกการเดินทางหน้ารถ DVR แบบ Built-in ติดตั้งจากโรงงานใต้ไฟหน้ารถ Zontes 368E ETC"
      },
      {
        type: "heading",
        text: "หน้าจอ TFT 6.75 นิ้ว รองรับข้อมูลการขี่และการเชื่อมต่อ"
      },
      {
        type: "paragraph",
        text: "บริเวณหน้าปัดใช้จอ Full Color **TFT 6.75 นิ้ว** ซึ่งทำหน้าที่แสดงข้อมูลการขี่และการตั้งค่าระบบต่าง ๆ ของรถ โดยมีการพัฒนาการตอบสนองของหน้าจอให้รวดเร็วขึ้น"
      },
      {
        type: "paragraph",
        text: "หน้าจอรองรับการเชื่อมต่อกับสมาร์ตโฟน รวมถึงการแสดงผลนำทาง การสะท้อนหน้าจอ การแจ้งเตือนสายเรียกเข้า การเล่นเพลง การปรับความสว่างอัตโนมัติ และการแสดงข้อมูลรถแบบเรียลไทม์"
      },
      {
        type: "image",
        src: "/images/news/zontes-368e/Zontes-368e6.webp",
        alt: "หน้าจอแสดงผลอัจฉริยะ Full Color TFT ขนาด 6.75 นิ้ว รองรับการนำทางผ่านแอปและสถานะเซ็นเซอร์วัดลมยาง TPMS ของ ZONTES 368E"
      },
      {
        type: "heading",
        text: "ช่วงล่างหน้า USD ปรับได้ ช่วงล่างหลังตั้งค่าได้ 5 ระดับ"
      },
      {
        type: "paragraph",
        text: "ด้านช่วงล่าง ZONTES 368E ETC ใช้โช้กหน้าแบบหัวกลับ **Upside-down ขนาด 41 มม.** สามารถปรับค่า **Compression** และ **Rebound** ได้ เพื่อให้ผู้ขี่ปรับบุคลิกของรถให้เหมาะกับสภาพถนนหรือรูปแบบการใช้งานของตัวเอง"
      },
      {
        type: "paragraph",
        text: "ส่วนโช้กหลังได้รับการปรับเซ็ตติ้งใหม่ โดยสามารถตั้งค่าพรีโหลดได้ **5 ระดับ** รองรับทั้งการขี่คนเดียว การมีผู้ซ้อน หรือการเดินทางพร้อมสัมภาระ"
      },
      {
        type: "image",
        src: "/images/news/zontes-368e/Zontes-368e7.webp",
        alt: "ระบบกันสะเทือนหลังแบบสปริงคู่ปรับพรีโหลดได้ 5 ระดับ พร้อมจานดิสก์เบรกและยาง Continental ของรถ ZONTES 368E ETC"
      },
      {
        type: "heading",
        text: "ABS, TCS, TPMS และเบรก J.Juan"
      },
      {
        type: "paragraph",
        text: "ระบบเบรกของ 368E ETC ใช้ดิสก์เบรกหน้า-หลัง พร้อม **Dual-channel ABS** ซึ่งช่วยลดโอกาสล้อล็อกเมื่อต้องเบรกกะทันหัน"
      },
      {
        type: "paragraph",
        text: "รถยังติดตั้งระบบ **Traction Control System** หรือ **TCS** เพื่อช่วยควบคุมการยึดเกาะของล้อในจังหวะเปิดคันเร่ง โดยเฉพาะเมื่อต้องขี่บนพื้นผิวที่มีความลื่นหรือมีสภาพถนนแตกต่างกัน"
      },
      {
        type: "paragraph",
        text: "ด้านคาลิเปอร์เบรกเป็นแบบ **Radial Mount** จาก **J.Juan** ทำงานร่วมกับจานเบรกขนาดใหญ่ ขณะที่ยางเป็นแบบ Tubeless จาก **Continental** ซึ่งช่วยเสริมภาพลักษณ์ของรถให้มีความพร้อมสำหรับการเดินทางมากขึ้น"
      },
      {
        type: "image",
        src: "/images/news/zontes-368e/Zontes-368e8.webp",
        alt: "คาลิเปอร์เบรกหน้า J.Juan แบบ Radial Mount จับคู่กับจานดิสก์เบรกและระบบเบรก ABS หน้าของ ZONTES 368E"
      },
      {
        type: "heading",
        text: "ชิลด์ไฟฟ้า ถังน้ำมัน 17 ลิตร และพอร์ตชาร์จอุปกรณ์"
      },
      {
        type: "paragraph",
        text: "New ZONTES 368E ETC ติดตั้งชิลด์หน้าปรับระดับด้วยระบบไฟฟ้า ช่วยให้ผู้ขี่ปรับตำแหน่งของชิลด์ให้เหมาะกับส่วนสูงหรือรูปแบบการเดินทางได้"
      },
      {
        type: "paragraph",
        text: "รถใช้ถังน้ำมันขนาด **17 ลิตร** รองรับแก๊สโซฮอล์ 91 และ 95 ซึ่งเป็นความจุที่เหมาะกับการเดินทางในระยะยาวโดยไม่ต้องแวะเติมน้ำมันบ่อยเกินไป"
      },
      {
        type: "heading",
        text: "พื้นที่เก็บของใต้เบาะ รองรับหมวกกันน็อก 2 ใบ"
      },
      {
        type: "paragraph",
        text: "ในด้านการใช้งานประจำวัน ZONTES 368E ETC ให้พื้นที่ใต้เบาะขนาดใหญ่ สามารถเก็บหมวกกันน็อกเต็มใบได้ 2 ใบ เหมาะกับผู้ที่ใช้รถเดินทางพร้อมผู้ซ้อนหรือจำเป็นต้องพกอุปกรณ์ติดตัว"
      },
      {
        type: "heading",
        text: "Keyless 3.0 และ ZONTES Smart App"
      },
      {
        type: "paragraph",
        text: "ระบบกุญแจของรถเป็น **Keyless 3.0** ที่ใช้เซ็นเซอร์ตรวจจับกุญแจ เมื่อผู้ขี่อยู่ในระยะใกล้ รถสามารถปลดล็อกได้โดยไม่จำเป็นต้องหยิบกุญแจออกจากกระเป๋า"
      },
      {
        type: "heading",
        text: "ไฟ Full LED พร้อมดีไซน์ที่เน้นความทันสมัย"
      },
      {
        type: "paragraph",
        text: "ระบบไฟรอบคันเป็น **Full LED** โดยไฟหน้าถูกออกแบบให้มีชุดเลนส์ LED หลายตำแหน่ง เพื่อเพิ่มความสว่างและขยายระยะการมองเห็นขณะขี่ในเวลากลางคืน"
      },
      {
        type: "heading",
        text: "ราคาและการรับประกันในประเทศไทย"
      },
      {
        type: "paragraph",
        text: "New ZONTES 368E ETC เปิดราคาแนะนำในประเทศไทยที่ **163,800 บาท** พร้อมการรับประกันเครื่องยนต์สูงสุด **5 ปี หรือ 50,000 กิโลเมตร** แล้วแต่ว่าระยะใดถึงก่อน"
      }
    ]
  },
  {
    title: "อัปเดตล่าสุด Samsung Galaxy S25 กับฟีเจอร์ One UI 8.5: มีอะไรใหม่และเปิดตัวเมื่อไหร่?",
    slug: "samsung-galaxy-s25-one-ui-8-5-update",
    excerpt: "เจาะลึกข่าวลือล่าสุด ฟีเจอร์ AI ใหม่บน One UI 8.5 และวันเปิดตัวอัปเกรดประสิทธิภาพที่แฟน ๆ Samsung Galaxy S25 รอคอย",
    category: "โทรศัพท์",
    categorySlug: "phone",
    coverImage: "/assets/images/IT/one-ui-galaxy-s25-ai-features.png",
    coverFit: "contain",
    publishedAt: "2026-06-17T08:00:00Z",
    updatedAt: "2026-06-17T08:00:00Z",
    author: "KIMX Tech Editor",
    readingTime: "5 นาที",
    tags: ["Samsung", "Galaxy S25", "One UI 8.5", "Galaxy AI", "Android 16"],
    featured: true,
    content: [
      {
        type: "highlight",
        title: "สรุปประเด็นสำคัญ (Takeaways)",
        text: "• คาดการณ์เปิดตัว One UI 8.5 ในช่วงไตรมาสแรกของปี 2026 พร้อมกับประสิทธิภาพที่ลื่นไหลกว่าเดิม\n• โฟกัสหลักที่การอัปเกรดฟีเจอร์ปัญญาประดิษฐ์ Galaxy AI ใหม่ ๆ เช่น Real-time Translation และ Advanced Photo Assist\n• รองรับบน Samsung Galaxy S25 series ครบครันและขยายผลไปยังรุ่นเรือธงรุ่นก่อนหน้า"
      },
      {
        type: "paragraph",
        text: "กระแสข่าวลือในฝั่งสมาร์ทโฟนแอนดรอยด์กำลังคึกคักเป็นพิเศษเมื่อมีข้อมูลอัปเดตเกี่ยวกับระบบปฏิบัติการ One UI 8.5 รุ่นใหม่ล่าสุดของ Samsung ที่พัฒนาอยู่บนสถาปัตยกรรม Android 16 โดยไฮไลท์สำคัญจะอยู่ในการเปิดตัวพร้อมกับเรือธงตระกูล Galaxy S25 ที่จะสร้างมาตรฐานใหม่ให้กับวงการสมาร์ทโฟนอัจฉริยะ"
      },
      {
        type: "image",
        src: "/assets/images/IT/galaxy-s25-one-1.webp",
        alt: "ดีไซน์ใหม่ล่าสุดของ Samsung Galaxy S25 Series",
        caption: "ภาพคอนเซปต์จำลองดีไซน์ของ Samsung Galaxy S25 Series ที่มาพร้อมขอบเครื่องแบนเรียบและบางลง"
      },
      {
        type: "heading",
        text: "คุณสมบัติเด่นของ One UI 8.5 (Key Upgrades)"
      },
      {
        type: "features-grid",
        items: [
          {
            title: "Galaxy AI Gen 2",
            description: "ปรับปรุงโมเดล AI ในเครื่องให้ฉลาดขึ้น ตอบโต้การสื่อสารสองภาษาพร้อมกันได้อย่างเป็นธรรมชาติแบบเรียลไทม์"
          },
          {
            title: "Smooth UI Motion",
            description: "ปรับแต่ง Frame-rate อัตราการตอบสนองหน้าจอ และ Dynamic Motion Physics ใหม่ทั้งหมด ให้มีความรู้สึกติดนิ้วและสมูทลื่นไหลสูงสุด"
          },
          {
            title: "Privacy Shield",
            description: "เสริมระบบความปลอดภัย Knox Matrix แบบเข้ารหัสต้นทางถึงปลายทางสำหรับผู้ทำธุรกรรมผ่านหน้าจอมือถือ"
          }
        ]
      },
      {
        type: "image",
        src: "/assets/images/IT/galaxy-s25-one-2.webp",
        alt: "ฟีเจอร์ AI อัจฉริยะบนหน้าจอ Samsung Galaxy",
        caption: "ฟีเจอร์ Galaxy AI ที่คาดว่าจะได้รับการอัปเกรดความฉลาดยิ่งขึ้นใน One UI 8.5"
      },
      {
        type: "heading",
        text: "เปรียบเทียบสเปกข่าวลือ Samsung Galaxy S25 Series"
      },
      {
        type: "table",
        headers: ["คุณสมบัติ", "Galaxy S25", "Galaxy S25+", "Galaxy S25 Ultra"],
        rows: [
          ["ขนาดหน้าจอ", "6.2 นิ้ว Dynamic AMOLED", "6.7 นิ้ว Dynamic AMOLED", "6.9 นิ้ว Dynamic AMOLED"],
          ["ชิปประมวลผล", "Snapdragon 8 Gen 4", "Snapdragon 8 Gen 4 / Exynos 2500", "Snapdragon 8 Gen 4 (Custom)"],
          ["กล้องหลังหลัก", "50 ล้านพิกเซล", "50 ล้านพิกเซล", "200 ล้านพิกเซล (Super Zoom)"],
          ["ระบบระบายความร้อน", "Vapor Chamber เล็ก", "Vapor Chamber กลาง", "Vapor Chamber ใหญ่พิเศษ"]
        ]
      },
      {
        type: "image",
        src: "/assets/images/IT/galaxy-s25-one-3.webp",
        alt: "ภาพโปรโมท Samsung Galaxy S25 Ultra",
        caption: "การปรับแต่งหน้าจอที่ยืดหยุ่นและรองรับวิดเจ็ตแบบไดนามิก"
      },
      {
        type: "heading",
        text: "คำแนะนำ: วิธีเตรียมพร้อมสำหรับการอัปเดตระบบในอนาคต"
      },
      {
        type: "green-box",
        title: "ขั้นตอนเตรียมตัวดาวน์โหลด One UI 8.5 อย่างปลอดภัย",
        text: "1. สำรองข้อมูลสำคัญ (Backup) ไปยัง Samsung Cloud หรือ Smart Switch เสมอเพื่อป้องกันข้อมูลสูญหาย\n2. ตรวจสอบพื้นที่ว่างในตัวเครื่อง โดยควรมีหน่วยความจำคงเหลืออย่างน้อย 10GB\n3. ชาร์จแบตเตอรี่โทรศัพท์ให้มีระดับเกิน 60% หรือเสียบสายชาร์จขณะทำการอัปเกรดระบบปฏิบัติการ\n4. เชื่อมต่อเครือข่าย Wi-Fi ที่เสถียรเพื่อป้องกันการเชื่อมต่อขาดตอนขณะดาวน์โหลดไฟล์ระบบขนาดใหญ่"
      },
      {
        type: "quote",
        text: "การผสาน Galaxy AI เข้าไปใน One UI 8.5 จะช่วยให้ผู้ใช้งานสัมผัสโลกแห่งอนาคตผ่านการควบคุมในชีวิตประจำวันอย่างเป็นธรรมชาติที่สุด",
        author: "Samsung Mobile Software VP"
      },
      {
        type: "share-buttons",
        shareUrl: "https://kimx-wed.vercel.app/news/phone/samsung-galaxy-s25-one-ui-8-5-update",
        reviewUrl: "https://www.samsung.com/th/"
      }
    ]
  },
  {
    title: "5 เครื่องมือ AI ที่เจ้าของธุรกิจควรรู้ในปีนี้ เพื่อก้าวนำคู่แข่ง",
    slug: "ai-tools-for-business",
    excerpt: "เพิ่มประสิทธิภาพการทำงานและลดต้นทุนให้กับธุรกิจของคุณ ด้วย 5 สุดยอดเครื่องมือ AI อัจฉริยะที่ปฏิวัติวงการบริหารงานในปัจจุบัน",
    category: "โทรศัพท์",
    categorySlug: "phone",
    coverImage: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
    publishedAt: "2026-06-10T09:00:00Z",
    updatedAt: "2026-06-15T03:00:00Z",
    author: "KIMX Tech Team",
    readingTime: "4 นาที",
    tags: ["AI Tools", "Business", "Automation", "ChatGPT"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "ในยุคที่เทคโนโลยีขับเคลื่อนไปอย่างรวดเร็ว การนำปัญญาประดิษฐ์ (AI) เข้ามาประยุกต์ใช้ในธุรกิจไม่ใช่ทางเลือกอีกต่อไป แต่เป็นทางรอดที่ช่วยเพิ่มประสิทธิภาพการผลิต ลดต้นทุน และยกระดับขีดความสามารถการแข่งขันอย่างยั่งยืน วันนี้ KIMX Web จะพาคุณมารู้จักกับ 5 เครื่องมือ AI ที่มีศักยภาพปฏิวัติการทำงานของคุณแบบหน้ามือเป็นหลังมือ"
      },
      {
        type: "heading",
        text: "1. ChatGPT Plus / Claude 3.5 Sonnet - เลขาส่วนตัวอัจฉริยะ"
      },
      {
        type: "paragraph",
        text: "สำหรับการร่างอีเมลธุรกิจ การเขียนรายงาน การวิเคราะห์เอกสารความยาวหลายสิบหน้า หรือแม้กระทั่งการเขียนโปรแกรมเบื้องต้น AI ด้านภาษาเหล่านี้สามารถทำหน้าที่เสมือนทีมผู้ช่วยมืออาชีพที่พร้อมทำงานให้คุณตลอด 24 ชั่วโมง ช่วยย่นเวลาการคิดคอนเทนต์และการจัดระเบียบความคิดได้ถึง 80%"
      },
      {
        type: "heading",
        text: "2. Midjourney & v0.dev - การปฏิวัติวงการครีเอทีฟและ UI"
      },
      {
        type: "paragraph",
        text: "ไม่ว่าจะเป็นการสร้างภาพประกอบสินค้าเกรดพรีเมียม โปสเตอร์โฆษณา หรือแม้แต่การขึ้นโครงสร้างหน้าตาเว็บไซต์ (UI) เครื่องมืออย่าง Midjourney และ v0 โดย Vercel ช่วยให้เจ้าของธุรกิจสามารถสื่อสารภาพในหัวออกมาเป็นชิ้นงานจริงได้อย่างรวดเร็ว โดยแทบไม่ต้องพึ่งกราฟิกดีไซเนอร์ในขั้นตอนร่างแบบ"
      },
      {
        type: "highlight",
        title: "คำแนะนำสำหรับการเริ่มต้น",
        text: "เริ่มต้นจากจุดเล็ก ๆ เสมอ ลองมอบหมายงานประเภทแอดมินหรืองานเตรียมข้อมูลดิบให้ AI ทำก่อน เมื่อทีมเริ่มคุ้นเคยแล้ว จึงค่อยขยายขอบเขตไปสู่งานที่ต้องใช้ความคิดสร้างสรรค์ร่วมกับมนุษย์"
      },
      {
        type: "heading",
        text: "3. Make.com & Zapier - เชื่อมต่อและทำงานอัตโนมัติ"
      },
      {
        type: "paragraph",
        text: "ระบบ Automation แบบไร้โค้ด (No-code Automation) ที่เชื่อม AI เข้ากับแอปพลิเคชันที่คุณใช้ในทุก ๆ วัน เช่น เมื่อลูกค้ากรอกฟอร์มหน้าเว็บ ให้ AI ส่งข้อความสรุปวิเคราะห์ตรงเข้า LINE กลุ่มของฝ่ายขายทันที ซึ่งช่วยลดความผิดพลาดและเพิ่มความเร็วในการตอบสนองลูกค้าได้เป็นอย่างดี"
      },
      {
        type: "stats",
        items: [
          { value: "40%", label: "เวลาทำงานที่ลดลงจากการตอบงานแอดมินอัตโนมัติ" },
          { value: "3x", label: "โอกาสปิดการขายได้เร็วขึ้นจากระบบตอบกลับทันที" }
        ]
      }
    ]
  },
  {
    title: "Prompt คืออะไร? เทคนิคเขียนสั่งงาน AI ให้ได้ผลลัพธ์แม่นยำและได้งานเร็วขึ้น",
    slug: "prompt-guide-for-content",
    excerpt: "เรียนรู้วิธีการเขียน Prompt ระดับมืออาชีพด้วยหลักการเชิงวิศวกรรมการป้อนคำสั่ง เพื่อผลลัพธ์ที่ถูกต้องและใช้งานได้ทันที",
    category: "เกมส์",
    categorySlug: "game",
    coverImage: "linear-gradient(135deg, #090d16 0%, #1e293b 50%, #0d9488 100%)",
    publishedAt: "2026-06-11T08:30:00Z",
    updatedAt: "2026-06-11T08:30:00Z",
    author: "SEO Specialist",
    readingTime: "3 นาที",
    tags: ["Prompt Engineering", "AI Command", "ChatGPT Guide"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "หัวใจสำคัญของการใช้งาน AI ในปัจจุบันไม่ได้ขึ้นอยู่กับความฉลาดของตัวแบบจำลองเพียงอย่างเดียว แต่ยังขึ้นอยู่กับผู้ใช้งานว่าสามารถเขียนคำสั่ง หรือที่เราเรียกว่า 'Prompt' ได้ชัดเจนและตรงจุดมากแค่ไหน การเขียน Prompt ที่ไม่ชัดเจนจะส่งผลให้ได้คำตอบที่วกวนและใช้งานจริงไม่ได้"
      },
      {
        type: "heading",
        text: "โครงสร้าง Prompt ระดับเทพ: หลักการ R-T-C-O"
      },
      {
        type: "paragraph",
        text: "เพื่อให้ได้งานที่คมชัดและถูกต้องที่สุด แนะนำให้ใช้สูตรโครงสร้าง R-T-C-O ในการป้อนคำสั่ง AI ทุกครั้ง ดังนี้:"
      },
      {
        type: "highlight",
        title: "สูตรลับ R-T-C-O",
        text: "1. Role (บทบาท): กำหนดตำแหน่งให้ AI เช่น 'สวมบทบาทเป็นผู้เชี่ยวชาญด้าน Copywriting'\n2. Task (งานที่สั่ง): ระบุงานที่ต้องการทำ เช่น 'เขียนโพสต์ขายคอนโดหรู'\n3. Context (บริบท): ข้อมูลเบื้องหลัง เช่น 'กลุ่มเป้าหมายคือคนทำงานสีลมงบ 5-8 ล้านบาท'\n4. Output (ผลลัพธ์): รูปแบบที่ต้องการ เช่น 'เขียนในความยาว 3 ย่อหน้า พร้อมแฮชแท็ก'"
      },
      {
        type: "heading",
        text: "ทำไมคุณจึงควรหลีกเลี่ยงการสั่งงานคำสั้น ๆ"
      },
      {
        type: "paragraph",
        text: "การสั่งแค่ 'เขียนบทความเกี่ยวกับ SEO' จะทำให้ AI สุ่มข้อมูลมหาศาลมาตอบ ส่งผลให้อ่านแล้วจืดชืด ไร้ทิศทาง การปรับปรุง Prompt ให้ใส่เป้าหมายชัดเจนจะช่วยย่นระยะเวลาการแก้ไขงานลงได้มหาศาล"
      }
    ]
  },
  {
    title: "ทำไมเว็บไซต์ธุรกิจควรมีบทความ SEO ทุกสัปดาห์? ไขข้อข้องใจด้านการทำอันดับ Google",
    slug: "why-business-needs-weekly-seo-articles",
    excerpt: "เปิดเหตุผลเบื้องหลังทำไมการอัปเดตบทความ SEO อย่างสม่ำเสมอจึงเป็นกลยุทธ์ที่คุ้มค่าที่สุดในการดึงดูดลูกค้าคุณภาพสูงมาสู่ธุรกิจ",
    category: "ข่าวรถยนต์",
    categorySlug: "automotive",
    coverImage: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #2563eb 100%)",
    publishedAt: "2026-06-12T10:00:00Z",
    updatedAt: "2026-06-16T04:30:00Z",
    author: "SEO Specialist",
    readingTime: "5 นาที",
    tags: ["SEO", "Content Marketing", "Website Traffic", "KIMX Strategy"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "เจ้าของธุรกิจหลายคนมักเข้าใจว่า การทำเว็บไซต์เสร็จแล้วคือจบกระบวนการ แต่ในความเป็นจริง เว็บไซต์ที่ไม่มีความเคลื่อนไหว ไม่มีเนื้อหาใหม่ ๆ เข้าไปอัปเดตเลย เปรียบเสมือนหน้าร้านที่ปิดไฟมืดสนิทและไม่มีพนักงานคอยบริการ การเขียนและอัปเดตบทความ SEO เป็นประจำคือเครื่องยนต์ขับเคลื่อนทราฟฟิกชั้นยอด"
      },
      {
        type: "heading",
        text: "1. Google รักความสดใหม่ (Query Deserves Freshness)"
      },
      {
        type: "paragraph",
        text: "อัลกอริทึมของ Google จะส่งบอทมาสำรวจเว็บไซต์เพื่อเก็บข้อมูล (Crawl) อยู่ตลอดเวลา หากเว็บของคุณอัปเดตบทความสัปดาห์ละ 1-2 ครั้ง บอทจะเข้ามาเก็บข้อมูลบ่อยขึ้น ส่งผลดีต่อความเร็วในการดึงหน้าเว็บใหม่ ๆ ไปแสดงผลการค้นหา และช่วยรักษาอันดับเดิมให้มั่นคง"
      },
      {
        type: "heading",
        text: "2. ขยายขอบเขตการเข้าถึงคีย์เวิร์ด (Long-tail Keywords)"
      },
      {
        type: "paragraph",
        text: "หน้าบริการปกติอาจรองรับคีย์เวิร์ดหลักได้เพียงไม่กี่คำ แต่ 'บทความ' เปิดโอกาสให้คุณดึงผู้ใช้งานที่กำลังเจอปัญหาต่าง ๆ เข้ามายังเว็บไซต์ เช่น หากคุณขายเครื่องกรองน้ำ บทความแนะนำ 'วิธีแก้ไขน้ำประปามีกลิ่น' จะพาลูกค้ากลุ่มเป้าหมายที่มีปัญหานี้ให้มารู้จักแบรนด์ของคุณทันที"
      },
      {
        type: "quote",
        text: "SEO ไม่ใช่การตกแต่งหน้าเว็บเพียงครั้งเดียว แต่เป็นวินัยในการสร้างเนื้อหาที่มีคุณค่าต่อผู้ใช้อย่างต่อเนื่อง",
        author: "KIMX Web SEO Lead"
      },
      {
        type: "stats",
        items: [
          { value: "434%", label: "จำนวนหน้าที่ถูกดัชนี (Index) บน Google มากขึ้นเมื่ออัปเดตบล็อกสม่ำเสมอ" },
          { value: "97%", label: "โอกาสได้รับ Backlink กลับคืนมาสู่เว็บมากขึ้น" }
        ]
      }
    ]
  },
  {
    title: "AI Search จะเปลี่ยนวิธีทำ SEO อย่างไร? และธุรกิจต้องปรับตัวอย่างไรเพื่อไม่ให้อันดับร่วง",
    slug: "ai-search-and-seo",
    excerpt: "เจาะลึกทิศทางใหม่เมื่อ Google นำระบบ AI Overview เข้ามาตอบคำถามผู้ใช้งานโดยตรง วิธีเอาตัวรอดของเว็บไซต์ธุรกิจในยุคใหม่",
    category: "ข่าวรถยนต์",
    categorySlug: "automotive",
    coverImage: "linear-gradient(135deg, #090514 0%, #1e1136 50%, #7c3aed 100%)",
    publishedAt: "2026-06-13T09:15:00Z",
    updatedAt: "2026-06-13T09:15:00Z",
    author: "KIMX Tech Team",
    readingTime: "4 นาที",
    tags: ["AI Search", "SGE", "Google AI", "SEO 2026"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "การเปิดตัว Google Search Generative Experience (SGE) และ AI Overviews กำลังเปลี่ยนพฤติกรรมการค้นหาของผู้คน จากเดิมที่ผู้ใช้จะคลิกดูลิงก์อันดับ 1-3 ตอนนี้ AI จะสรุปคำตอบแบบกระชับขึ้นมาแสดงด้านบนสุดทันที สิ่งนี้กระทบยอดคนคลิกเข้าเว็บแบบดั้งเดิมอย่างแน่นอน"
      },
      {
        type: "heading",
        text: "การเปลี่ยนผ่านจาก Keyword Matching สู่ Intent Understanding"
      },
      {
        type: "paragraph",
        text: "ในยุค AI Search การพึ่งพาคีย์เวิร์ดเดี่ยว ๆ แบบเดิมจะไม่เพียงพอ อัลกอริทึมต้องการคำตอบที่มีมิติ อ้างอิงแหล่งข้อมูลที่น่าเชื่อถือ และมีสไตล์การเขียนที่แสดงออกถึงความเชี่ยวชาญจริงจากตัวบุคคล (EEAT Factor - Experience, Expertise, Authoritativeness, Trustworthiness)"
      },
      {
        type: "highlight",
        title: "3 สิ่งที่ต้องเริ่มทำวันนี้",
        text: "1. ทำบทความตอบคำถามเชิงลึกที่ AI ไม่สามารถสรุปได้ง่าย ๆ\n2. เขียนสไตล์บทวิเคราะห์แชร์ประสบการณ์จริง\n3. โครงสร้าง Schema Markup ในหลังบ้านต้องชัดเจน เพื่อให้บอท AI นำข้อมูลไปอ้างอิงเป็นแหล่งข้อมูลแหล่งสรุป"
      }
    ]
  },
  {
    title: "รวมเทคนิคใช้ ChatGPT ช่วยคิดคอนเทนต์เพจ ดึงดูดลูกค้าและสร้างยอดขายถล่มทลาย",
    slug: "chatgpt-techniques-for-content-creation",
    excerpt: "เผยวิธีใช้ประโยชน์จาก ChatGPT ในการวางปฏิทินคอนเทนต์รายเดือน คิดพาดหัวสะดุดตา และแต่งสคริปต์โฆษณาใน 5 นาที",
    category: "ข่าว AI",
    categorySlug: "ai",
    coverImage: "linear-gradient(135deg, #03001e 0%, #7303c0 50%, #ec38bc 100%)",
    publishedAt: "2026-06-14T11:00:00Z",
    updatedAt: "2026-06-14T11:00:00Z",
    author: "KIMX Copywriter",
    readingTime: "3 นาที",
    tags: ["ChatGPT", "Content Strategy", "Social Media", "AI Writing"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "ปัญหาคลาสสิกของคนทำเพจธุรกิจคือ 'วันนี้จะลงคอนเทนต์อะไรดี?' สมองตื้อ คิดพาดหัวไม่ออก เขียนไปแล้วเงียบสนิท ChatGPT ช่วยคุณแก้ปัญหานี้ได้แบบ 100% หากรู้วิธีไกด์ประเด็นที่ถูกต้อง"
      },
      {
        type: "heading",
        text: "ขั้นตอนที่ 1: การสั่งวางแผนปฏิทินเนื้อหารายเดือน (Content Calendar)"
      },
      {
        type: "paragraph",
        text: "แทนที่จะให้คิดเป็นเรื่อง ๆ สั่งให้ ChatGPT วางแผนภาพรวมล่วงหน้า 30 วัน โดยระบุเป้าหมาย เช่น 'ช่วยวางแผนคอนเทนต์ขายครีมกันแดดสำหรับคนผิวแพ้ง่ายเป็นเวลา 30 วัน โดยแบ่งประเภทเป็น ความรู้ 40% รีวิว 30% และขายตรง 30%'"
      },
      {
        type: "heading",
        text: "ขั้นตอนที่ 2: ใช้เทคนิค Hook ในการดึงสายตาคนเลื่อนฟีด"
      },
      {
        type: "paragraph",
        text: "ความลับของการขายของออนไลน์คือพาดหัว 3 บรรทัดแรก คุณสามารถสั่งให้ ChatGPT ร่างไอเดียพาดหัวแบบ Click-Worthy แต่ไม่ Clickbait เช่น 'เสนอไอเดียเขียนพาดหัวสะดุดตา 5 รูปแบบ สำหรับดึงดูดลูกค้าให้อยากอ่านเกี่ยวกับบริการบัญชีธุรกิจ'"
      }
    ]
  },
  {
    title: "เว็บไซต์ช้า ส่งผลเสียต่อยอดขายอย่างไร? สถิติชี้ชัดทุก 1 วินาทีที่ช้าลง ลูกค้าพร้อมเปลี่ยนใจ",
    slug: "website-speed-affects-sales",
    excerpt: "เปิดตัวเลขสถิติผลกระทบความเร็วเว็บไซต์ที่มีผลต่ออัตราการเปลี่ยนเป็นยอดขาย (Conversion Rate) และอันดับบน Google ค้นหา",
    category: "Tech Update",
    categorySlug: "tech",
    coverImage: "linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #48cae4 100%)",
    publishedAt: "2026-06-15T07:45:00Z",
    updatedAt: "2026-06-16T02:00:00Z",
    author: "KIMX Web Architect",
    readingTime: "3 นาที",
    tags: ["Web Speed", "Conversion Rate", "Tech Trends", "Core Web Vitals"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "ในสมรภูมิการค้าออนไลน์ที่ดุเดือด ความน่าเชื่อถือของแบรนด์เริ่มสร้างได้ตั้งแต่วินาทีแรกที่ลูกค้ากดลิงก์เข้าหน้าเว็บ หากหน้าเว็บหมุนค้างนานเกินไป ลูกค้าจะกดปุ่มย้อนกลับและเปลี่ยนไปอุดหนุนร้านคู่แข่งทันที ความเร็วไม่ได้เป็นแค่เรื่องของความพึงพอใจ แต่คือรายได้โดยตรงของบริษัท"
      },
      {
        type: "stats",
        items: [
          { value: "1 ใน 4", label: "ของผู้ใช้งานจะกดออกทันทีหากหน้าเว็บใช้เวลาโหลดเกิน 4 วินาที" },
          { value: "-7%", label: "ของอัตราการเปลี่ยนลูกค้าเป้าหมาย (Conversion Rate) ต่อทุกๆ วินาทีที่โหลดช้า" }
        ]
      },
      {
        type: "heading",
        text: "ปัจจัยหลักที่ดึงความเร็วของหน้าเว็บ"
      },
      {
        type: "paragraph",
        text: "สาเหตุที่พบบ่อยที่สุดในเว็บไซต์สัญชาติไทยคือ 1. รูปภาพมีขนาดใหญ่เกินความจำเป็น ไม่ผ่านกระบวนการบีบอัดไฟล์ 2. การเรียกใช้ปลั๊กอิน (Plugins) ฟุ่มเฟือยในแพลตฟอร์มสำเร็จรูป 3. โครงสร้างโค้ดส่วนหน้า (Frontend CSS/JS) ที่ซ้ำซ้อนและไร้ระบบจัดระเบียบ"
      },
      {
        type: "highlight",
        title: "การแก้ปัญหาโดยทีมวิศวกร KIMX Web",
        text: "เราเลือกพัฒนาเว็บด้วย Next.js และใช้เทคโนโลยี Server-Side Rendering (SSR) คู่กับการย่อรูปภาพให้เป็นฟอร์แมต WebP/AVIF แบบอัตโนมัติ เพื่อให้หน้าเว็บพร้อมแสดงผลในเวลาต่ำกว่า 1.5 วินาที"
      }
    ]
  },
  {
    title: "Cyber Security เบื้องต้นสำหรับเจ้าของเว็บธุรกิจ ป้องกันความเสียหายก่อนโดนแฮกข้อมูล",
    slug: "cyber-security-for-business-website",
    excerpt: "แนวทางง่าย ๆ ในการเสริมเกราะป้องกันภัยคุกคามทางไซเบอร์สำหรับผู้เริ่มต้นทำเว็บธุรกิจขนาดเล็กและขนาดกลาง",
    category: "Cyber Security",
    categorySlug: "cyber-security",
    coverImage: "linear-gradient(135deg, #020617 0%, #1e1b4b 60%, #10b981 100%)",
    publishedAt: "2026-06-15T10:00:00Z",
    updatedAt: "2026-06-15T10:00:00Z",
    author: "KIMX Security Expert",
    readingTime: "4 นาที",
    tags: ["Cyber Security", "SSL Certificate", "Database Protection"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "เมื่อธุรกิจเริ่มย้ายขึ้นสู่ระบบคลาวด์และออนไลน์ ข้อมูลสำคัญของลูกค้า ข้อมูลธุรกรรมการเงิน และความลับทางการค้าก็ตกเป็นเป้าหมายของมิจฉาชีพ ความปลอดภัยทางไซเบอร์ไม่ใช่เรื่องไกลตัว หรือจำกัดเฉพาะบริษัทเทคโนโลยียักษ์ใหญ่เท่านั้น"
      },
      {
        type: "heading",
        text: "1. ติดตั้ง SSL Certificate ทุกครั้ง (ไอคอนแม่กุญแจเขียว)"
      },
      {
        type: "paragraph",
        text: "การเข้ารหัสข้อมูลที่รับส่งระหว่างเบราว์เซอร์ของลูกค้าและเซิร์ฟเวอร์เว็บไซต์ (HTTPS) เป็นเกราะป้องกันด่านแรก เว็บที่ยังเป็น HTTP แบบเดิมจะโดนแจ้งเตือน 'ไม่ปลอดภัย (Not Secure)' ส่งผลให้ลูกค้ากังวลในการกรอกบัตรเครดิตหรือเบอร์โทรศัพท์"
      },
      {
        type: "heading",
        text: "2. กำหนดนโยบายรหัสผ่านขั้นต่ำและจำกัดสิทธิ์แอดมิน"
      },
      {
        type: "paragraph",
        text: "หลีกเลี่ยงการใช้รหัสผ่านยอดฮิตอย่าง '123456' หรือชื่อบริษัท ควรใช้ระบบ Two-Factor Authentication (2FA) และจำกัดสิทธิ์ผู้เขียนบทความ (Author) ไม่ให้เข้าถึงการตั้งค่าฐานข้อมูลหลังบ้าน เพื่อลดความเสี่ยงกรณีรหัสผ่านหลุด"
      }
    ]
  },
  {
    title: "Google ชอบบทความแบบไหนในยุค AI? เทคนิคการผลิตคอนเทนต์ให้ติดอันดับท็อป 3",
    slug: "what-kind-of-articles-google-likes-in-ai-era",
    excerpt: "ถอดรหัสคู่มือการประเมินคุณภาพเนื้อหาของ Google เพื่อการสร้างคอนเทนต์คุณภาพสูงที่บอทยอมรับและผู้ใช้งานชื่นชอบ",
    category: "How-to",
    categorySlug: "how-to",
    coverImage: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #e11d48 100%)",
    publishedAt: "2026-06-16T08:00:00Z",
    updatedAt: "2026-06-16T12:00:00Z",
    author: "SEO Specialist",
    readingTime: "5 นาที",
    tags: ["Google algorithm", "Content Quality", "SEO Writing", "EEAT"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "ในวันที่เน็ตเวิร์กเต็มไปด้วยคอนเทนต์ขยะที่ผลิตขึ้นมาด้วย AI แบบขอไปที หลายคนเริ่มสงสัยว่า Google จะจัดการอย่างไร และจะเขียนเนื้อหาแบบไหนให้รอดพ้นจากบทลงโทษของ Google Search Core Update ล่าสุด คำตอบอยู่ในแนวคิดเรื่อง 'เนื้อหาที่เป็นประโยชน์ต่อผู้ใช้อย่างแท้จริง'"
      },
      {
        type: "heading",
        text: "คุณค่าทางประสบการณ์จริงที่ไม่มีทางหาได้จากการสังเคราะห์ข้อมูล"
      },
      {
        type: "paragraph",
        text: "AI เก่งในการรวบรวมข้อมูลที่มีอยู่แล้ว แต่ AI ไม่มีประสบการณ์ตรง (Experience) เช่น ความรู้สึกหลังทดสอบใช้งานรถรุ่นใหม่ หรือข้อดีข้อเสียของโปรแกรมหลังเอาไปรันโปรเจกต์ระดับล้าน การมีภาพถ่ายประกอบ ประสบการณ์จริงของคุณลงไป จะเป็นสัญญาณบวกที่สำคัญที่สุดที่ทำให้ Google ชื่นชอบเนื้อหาของคุณ"
      },
      {
        type: "highlight",
        title: "เช็คลิสต์ตรวจสุขภาพคอนเทนต์",
        text: "1. มีข้อมูลเชิงลึกใหม่ ๆ ที่ไม่ใช่แค่คัดลอกหน้าอื่นมาเรียบเรียงใหม่หรือไม่?\n2. มีการวิเคราะห์เชิงลึกจากประสบการณ์ตรงหรือไม่?\n3. ผู้เขียนเป็นผู้เชี่ยวชาญในสายงานนั้นจริง ๆ หรือเปล่า?"
      }
    ]
  },
  {
    title: "ธุรกิจขนาดเล็กจะใช้ AI ลดต้นทุนการตลาดได้อย่างไรในงบประมาณจำกัด",
    slug: "how-small-business-uses-ai-to-reduce-marketing-costs",
    excerpt: "รวมแนวทางปฏิบัติที่เป็นรูปธรรมและเครื่องมือราคาประหยัด เพื่อให้ธุรกิจ SMEs สามารถมีเครื่องมือวิเคราะห์ทราฟฟิกและทำการตลาดได้ดีเท่าเจ้าใหญ่",
    category: "ธุรกิจดิจิทัล",
    categorySlug: "digital-business",
    coverImage: "linear-gradient(135deg, #050510 0%, #0f1026 50%, #059669 100%)",
    publishedAt: "2026-06-16T09:00:00Z",
    updatedAt: "2026-06-16T09:00:00Z",
    author: "KIMX Consultant",
    readingTime: "4 นาที",
    tags: ["Business Growth", "AI Marketing", "SMEs Strategy", "ROI"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "ในอดีต การเข้าถึงเครื่องมือการตลาดประสิทธิภาพสูงต้องใช้เงินทุนมหาศาลจ้างเอเจนซี่ภายนอก แต่ในปัจจุบัน เทคโนโลยี AI กำลังช่วยปลดล็อกข้อจำกัดทางทรัพยากร ให้แบรนด์เล็กสามารถมีเครื่องมือและการทำงานที่เทียบเท่ากับแบรนด์ใหญ่ในตลาด"
      },
      {
        type: "heading",
        text: "การแบ่งกลุ่มลูกค้าและส่งอีเมลโปรโมชันส่วนบุคคลแบบอัตโนมัติ"
      },
      {
        type: "paragraph",
        text: "การเขียนอีเมลทักทายลูกค้าแบบเจาะกลุ่มเป้าหมาย (Personalized Email) โดยใช้เครื่องมือส่งอีเมลที่มีฟีเจอร์ AI ช่วยเขียน จะดึงดูดลูกค้าเดิมให้กลับมาซื้อซ้ำได้สูงกว่าการหว่านส่งแบบเดิมถึง 3 เท่า โดยใช้ต้นทุนเพียงเศษเสี้ยวของการซื้อโฆษณาโซเชียลมีเดียใหม่ทั้งหมด"
      },
      {
        type: "quote",
        text: "AI ไม่ได้เข้ามาแทนที่นักการตลาด แต่คนใช้นักการตลาดที่ใช้ AI จะเข้ามาแทนที่คนที่ไม่ใช้",
        author: "KIMX Marketing Director"
      }
    ]
  },
  {
    title: "วิธีตั้งค่า Google Search Console สำหรับมือใหม่ เพื่อวัดผลสถิติคนเข้าเว็บไซต์ฟรี",
    slug: "how-to-setup-google-search-console",
    excerpt: "คู่มืออธิบายอย่างเป็นขั้นตอนในการสมัครและเชื่อมโยงเว็บไซต์กับเครื่องมือ Google Search Console เพื่อตรวจสอบคะแนน SEO และคำค้นหา",
    category: "How-to",
    categorySlug: "how-to",
    coverImage: "linear-gradient(135deg, #020617 0%, #1e293b 50%, #f97316 100%)",
    publishedAt: "2026-06-16T10:00:00Z",
    updatedAt: "2026-06-16T10:00:00Z",
    author: "SEO Specialist",
    readingTime: "5 นาที",
    tags: ["Google Search Console", "SEO Tutorial", "Website Analytics"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "หากต้องการทราบความจริงว่าคนค้นหาคำว่าอะไรแล้วเจอเว็บของเรา และ Google มองเห็นเว็บของเราปกติดีหรือไม่ Google Search Console (GSC) คือเครื่องมือฟรีชิ้นสำคัญที่สุดที่คุณต้องติดตั้งทันทีที่ทำเว็บไซต์เสร็จสมบูรณ์"
      },
      {
        type: "heading",
        text: "ขั้นตอนที่ 1: ลงทะเบียนและยืนยันความเป็นเจ้าของโดเมน"
      },
      {
        type: "paragraph",
        text: "เข้าไปที่เว็บไซต์ Google Search Console ล็อกอินด้วยบัญชี Gmail จากนั้นให้ทำการกรอก URL หรือโดเมนของคุณ วิธีที่ง่ายและเสถียรที่สุดคือการดาวน์โหลดไฟล์ HTML Verification ของกูเกิลไปอัปโหลดเข้าเซิร์ฟเวอร์ หรือกรอกค่า TXT Record ใน DNS Management ของผู้ให้บริการจดโดเมน"
      },
      {
        type: "heading",
        text: "ขั้นตอนที่ 2: การอัปโหลดไฟล์ Sitemap XML"
      },
      {
        type: "paragraph",
        text: "หลังจากเชื่อมต่อเสร็จสิ้น ให้เข้าไปที่หัวข้อ 'Sitemaps' เมนูด้านซ้าย และพิมพ์คำว่า `sitemap.xml` ในหน้าต่างอัปโหลดฟอร์ม เพื่อเป็นการยื่นคู่มือแผนผังเว็บไซต์อย่างเป็นทางการให้บอทของกูเกิลรับรู้ วิธีนี้ทำให้กูเกิลจัดดัชนีเนื้อหาเร็วขึ้นอย่างมีนัยสำคัญ"
      }
    ]
  },
  {
    title: "Xiaomi 18 Pro Max ลือแบตฯ ใหญ่กว่า 8,000mAh รองรับชาร์จไว 100W",
    slug: "xiaomi-18-pro-max-specs-leak-8000mah-battery",
    excerpt: "Xiaomi 18 Pro Series ถูกคาดหมายว่าจะเป็นเรือธงรุ่นถัดไป และอาจเปิดตัวในช่วงเดือนกันยายน 2026 ล่าสุดมีข้อมูลหลุดเวอร์ชันต้นแบบจัดเต็มด้วยแบตเตอรี่ระดับมหาศาลกว่า 8,000mAh",
    category: "โทรศัพท์",
    categorySlug: "phone",
    coverImage: "/images/news/phone/xiaomi18.png",
    coverFit: "contain",
    publishedAt: "2026-07-07T08:00:00Z",
    updatedAt: "2026-07-07T08:00:00Z",
    author: "KIMX Tech Editor",
    readingTime: "3 นาที",
    tags: ["Xiaomi 18 Pro Max", "Xiaomi", "ข่าวลือ", "สมาร์ทโฟน", "แบตเตอรี่"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Xiaomi 18 Pro Series ถูกคาดหมายว่าจะเป็นเรือธงรุ่นถัดไปของแบรนด์ และอาจเปิดตัวในประเทศจีนช่วงเดือนกันยายน 2026 ล่าสุดมีข้อมูลใหม่เกี่ยวกับ Xiaomi 18 Pro Max หลุดออกมา โดยเน้นไปที่ความจุแบตเตอรี่และสเปกระดับท็อปของรุ่นใหญ่"
      },
      {
        type: "paragraph",
        text: "รายงานจาก Digital Chat Station บน Weibo ระบุว่า Xiaomi 18 Pro Max เวอร์ชันต้นแบบ อาจมาพร้อมแบตเตอรี่ระดับ “8K++” หรือมากกว่า 8,000mAh รองรับการชาร์จเร็วแบบมีสาย 100W รวมถึงระบบชาร์จไร้สาย"
      },
      {
        type: "heading",
        text: "ลุ้นชิป 2nm พร้อมกล้อง 200MP คู่"
      },
      {
        type: "paragraph",
        text: "ข้อมูลที่หลุดออกมายังพูดถึงชิปประมวลผลระดับ 2nm ซึ่งมีความเป็นไปได้ว่าจะเป็นชิปเรือธงรุ่นใหม่จาก Qualcomm อย่าง Snapdragon 8 Elite Gen 6 หรือรุ่นย่อยที่แรงกว่า"
      },
      {
        type: "paragraph",
        text: "ด้านหน้าจอมีข่าวว่าจะใช้จอแบนขนาดใหญ่ ขอบจอบางเท่ากันทั้ง 4 ด้าน ขณะที่กล้องหลังอาจจัดเต็มด้วยกล้องหลัก 200MP ที่ใช้เทคโนโลยี LOFIC และกล้องเทเลโฟโตแบบปริทรรศน์ความละเอียด 200MP"
      },
      {
        type: "paragraph",
        text: "นอกจากนี้ยังมีรายงานเรื่องลำโพงสเตอริโอที่อัปเกรดใหม่ และมอเตอร์สั่นขนาดใหญ่ขึ้น เพื่อเพิ่มประสบการณ์ใช้งานโดยรวม อย่างไรก็ตาม รายละเอียดทั้งหมดในตอนนี้ยังเป็นเพียงข่าวลือจากต้นแบบเท่านั้น สเปกจริง ราคา และกำหนดการเปิดตัว ต้องรอการยืนยันจาก Xiaomi อีกครั้ง"
      },
      {
        type: "paragraph",
        text: "ที่มา: Digital Chat Station / Notebookcheck / Gizmochina"
      }
    ]
  }
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((art) => art.slug === slug);
}

export function getNewsArticlesByCategory(categorySlug: string): NewsArticle[] {
  return newsArticles.filter((art) => art.categorySlug === categorySlug);
}

export function getFeaturedNewsArticle(): NewsArticle | undefined {
  return newsArticles.find((art) => art.featured);
}
