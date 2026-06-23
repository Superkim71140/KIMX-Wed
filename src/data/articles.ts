export type ArticleContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'highlight'; title?: string; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'stats'; items: Array<{ value: string; label: string }> }
  | { type: "benchmark"; items: Array<{ label: string; score: number; maxScore: number; color?: string }> };

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt: string;
  accentColor: string; // CSS color or hex used for shadows/borders/badges
  content: Array<ArticleContentBlock>;
};

export const articles: Article[] = [
  {
    slug: "seo",
    title: "เทคนิคทำ SEO สายขาว ให้ติดหน้าแรก Google แบบยั่งยืน (ฉบับปี 2025)",
    description: "เลิกยิงแอดแพงๆ แล้วหันมาสร้าง Traffic ฟรีๆ ด้วยการทำ SEO ที่ถูกต้อง ปรับโครงสร้างเว็บยังไงให้ Google รัก?",
    category: "MARKETING & SEO",
    readingTime: "3 นาที",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    imageAlt: "SEO Strategy Planning and Digital Marketing Data",
    publishedAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-06-04T02:00:00Z",
    accentColor: "#38bdf8", // neon blue
    content: [
      {
        type: "paragraph",
        text: "หลายคนคงเคยได้ยินคำว่า 'Content is King' แต่ในโลกความเป็นจริง ถ้าคอนเทนต์ดีแค่ไหนแต่ไม่มีคนเห็น ก็ไร้ความหมาย นั่นคือเหตุผลที่การทำ SEO (Search Engine Optimization) จึงสำคัญมากสำหรับธุรกิจในยุคนี้"
      },
      {
        type: "heading",
        text: "1. โครงสร้างเว็บไซต์ต้อง 'คลีน' (Technical SEO)"
      },
      {
        type: "paragraph",
        text: "Google ไม่ได้อ่านเว็บด้วยตาเหมือนมนุษย์ แต่อ่านผ่าน Code สิ่งแรกที่เราต้องทำคือการวางโครงสร้าง HTML ให้ถูกต้อง ใช้ Heading Tags (H1, H2, H3) ให้เป็นลำดับ และที่สำคัญคือเว็บต้องโหลดไว (Page Speed) เพราะ Google ให้คะแนนเว็บที่โหลดเร็วมากกว่า"
      },
      {
        type: "highlight",
        title: "เคล็ดลับจาก KIMX Web",
        text: "เราปรับแต่งเว็บไซต์ลูกค้าทุกรายให้ได้คะแนน Google PageSpeed เกิน 90/100 เพื่อการันตีว่าบอทของ Google จะเข้ามาเก็บข้อมูลได้ง่ายที่สุด"
      },
      {
        type: "heading",
        text: "2. เลือก Keyword ที่ 'ใช่' ไม่ใช่แค่ 'ชอบ'"
      },
      {
        type: "paragraph",
        text: "อย่าเดาเอาเองว่าลูกค้าจะค้นหาคำว่าอะไร ให้ใช้เครื่องมืออย่าง Google Keyword Planner หรือ Ubersuggest เพื่อดูว่าจริงๆ แล้วคนค้นหาคำว่าอะไรกันแน่ และเลือกคำที่มี Search Volume สูงแต่คู่แข่งไม่เยอะจนเกินไป (Niche Keyword)"
      },
      {
        type: "heading",
        text: "3. คุณภาพเนื้อหาต้องมาก่อน (Content Quality)"
      },
      {
        type: "paragraph",
        text: "หมดยุคของการอัด Keyword ซ้ำๆ ลงไปในบทความแล้ว Google ยุคใหม่ฉลาดพอที่จะรู้ว่าบทความไหนมีประโยชน์จริงๆ เขียนให้คนอ่านรู้เรื่อง ตอบโจทย์สิ่งที่เขาสงสัย และมีความยาวที่เหมาะสม (แนะนำ 800 คำขึ้นไป)"
      }
    ]
  },
  {
    slug: "speed-performance",
    title: "เว็บโหลดช้า = ลูกค้าหนี! ความสำคัญของ Speed Performance ที่คุณมองข้ามไม่ได้",
    description: "รู้หรือไม่? ลูกค้าจะปิดเว็บทันทีถ้าโหลดนานเกิน 3 วินาที มาดูวิธีที่ KIMX Web ใช้รีดประสิทธิภาพเว็บให้โหลดไวเหมือนสายฟ้า",
    category: "WEB TECHNOLOGY & PERFORMANCE",
    readingTime: "4 นาที",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Speedy Web Application Code Performance Interface",
    publishedAt: "2025-01-15T09:00:00Z",
    updatedAt: "2025-06-04T02:00:00Z",
    accentColor: "#fbbf24", // amber
    content: [
      {
        type: "paragraph",
        text: "เคยไหมครับ? กดเข้าเว็บไซต์นึงแล้วหน้าจอหมุนติ้วๆ... ผ่านไป 3 วินาที 5 วินาที ก็ยังไม่มา สุดท้ายคุณทำยังไง? 'กดปิด' แล้วไปเข้าเว็บอื่นแทนใช่มั้ยครับ?"
      },
      {
        type: "paragraph",
        text: "นั่นคือสิ่งที่เกิดขึ้นกับลูกค้าของคุณเช่นกัน ถ้าเว็บไซต์ธุรกิจของคุณโหลดช้า มันไม่ใช่แค่เรื่องน่ารำคาญ แต่มันหมายถึง 'เงินที่หายไป' ในทุกวินาที"
      },
      {
        type: "stats",
        items: [
          { value: "53%", label: "ของลูกค้าจะปิดเว็บทันที ถ้าโหลดนานเกิน 3 วินาที" },
          { value: "-7%", label: "ยอดขายลดลง 7% ทุกๆ 1 วินาทีที่เว็บโหลดช้า" }
        ]
      },
      {
        type: "heading",
        text: "1. Google เกลียดเว็บอืด (Core Web Vitals)"
      },
      {
        type: "paragraph",
        text: "ตั้งแต่ปี 2021 เป็นต้นมา Google ประกาศชัดเจนว่าใช้เกณฑ์ Core Web Vitals ในการจัดอันดับเว็บไซต์ ซึ่งประกอบด้วยความเร็วในการโหลด (LCP), ความนิ่งของหน้าเว็บ (CLS) และการตอบสนอง (FID/INP)"
      },
      {
        type: "paragraph",
        text: "พูดง่ายๆ คือ ต่อให้เนื้อหาดีแค่ไหน สินค้าดียังไง 'ถ้าเว็บช้า = อันดับร่วง' ทำให้ลูกค้าหาคุณไม่เจอตั้งแต่แรกครับ"
      },
      {
        type: "heading",
        text: "2. ความเร็วสร้างความเชื่อมั่น (First Impression)"
      },
      {
        type: "paragraph",
        text: "เว็บไซต์ที่โหลดปุ๊บมาปั๊บ ให้ความรู้สึกถึงความเป็น 'มืออาชีพ' และความน่าเชื่อถือ ในทางกลับกัน เว็บที่โหลดช้า ภาพแตก ฟอนต์เพี้ยน จะทำให้ลูกค้าตั้งคำถามทันทีว่า 'บริษัทนี้เชื่อถือได้จริงหรอ? ระบบหลังบ้านจะปลอดภัยมั้ย?'"
      },
      {
        type: "highlight",
        title: "KIMX Web ทำอะไรให้บ้าง?",
        text: "เราไม่ได้แค่ทำเว็บให้สวย แต่เรา Optimize ระดับ Code ตั้งแต่การย่อรูปภาพ (Next-Gen Format), การทำ Caching, การลดขนาด JS/CSS และเลือกใช้ Server คุณภาพสูง เพื่อให้เว็บของคุณได้คะแนน Google Speed Score ระดับ A+ (90-100 คะแนน)"
      },
      {
        type: "heading",
        text: "3. มือถือคือสนามรบหลัก"
      },
      {
        type: "paragraph",
        text: "ปัจจุบันคนเข้าเว็บผ่านมือถือมากกว่า 80% และอินเทอร์เน็ตมือถือ (4G/5G) อาจไม่ได้เสถียรตลอดเวลา การทำเว็บให้เบาและโหลดเร็วบนมือถือ จึงเป็นกุญแจสำคัญในการเอาชนะคู่แข่งครับ"
      }
    ]
  },
  {
    slug: "web-design-2025",
    title: "เจาะลึกเทรนด์ Web Design 2025: น้อยแต่มาก เรียบแต่โก้ (Minimalism Evolution)",
    description: "การออกแบบเว็บไซต์ยุคใหม่ไม่ใช่แค่ความสวย แต่ต้อง User Friendly ใช้งานง่าย บนมือถือต้องลื่นไหล",
    category: "DESIGN TRENDS 2025",
    readingTime: "3 นาที",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Modern UX UI Responsive Design Workspace with Smartphones",
    publishedAt: "2025-01-20T10:00:00Z",
    updatedAt: "2025-06-04T02:00:00Z",
    accentColor: "#f43f5e", // rose/red
    content: [
      {
        type: "paragraph",
        text: "ถ้าพูดถึงเทรนด์การออกแบบเว็บไซต์ในปี 2025 คำนิยามเดียวที่ครอบคลุมที่สุดคือ 'Clutter-Free' หรือการตัดสิ่งรกตาออกไปให้หมด เหลือไว้แค่สิ่งที่สำคัญจริงๆ เพื่อให้ผู้ใช้งาน (User) โฟกัสกับเนื้อหาได้ทันทีโดยไม่ต้องคิดเยอะ"
      },
      {
        type: "quote",
        text: "Good design is obvious. Great design is transparent.",
        author: "Joe Sparano"
      },
      {
        type: "heading",
        text: "1. Minimalist แต่ไม่น่าเบื่อ"
      },
      {
        type: "paragraph",
        text: "ความเรียบง่าย (Minimal) ในปี 2025 ไม่ได้แปลว่า 'โล่งจนจืดชืด' แต่คือการใช้พื้นที่ว่าง (White Space) อย่างชาญฉลาด ผสมผสานกับการใช้ Typography (ตัวอักษร) ขนาดใหญ่ และสีสันที่โดดเด่นเพียงจุดเดียว เพื่อนำสายตาลูกค้าไปยังปุ่ม 'สั่งซื้อ' หรือ 'ติดต่อเรา'"
      },
      {
        type: "heading",
        text: "2. Dark Mode คือมาตรฐานใหม่"
      },
      {
        type: "paragraph",
        text: "หมดยุคที่ Dark Mode เป็นแค่ทางเลือก เพราะตอนนี้มันคือ 'มาตรฐาน' ที่ทุกเว็บต้องมี การออกแบบเว็บโทนสีเข้ม (Dark UI) นอกจากจะช่วยถนอมสายตาแล้ว ยังให้ความรู้สึกหรูหรา พรีเมียม และดูล้ำสมัย (Futuristic) ซึ่งเป็นสไตล์ถนัดของ KIMX Web เลยครับ"
      },
      {
        type: "heading",
        text: "3. Micro-Interactions (ลูกเล่นเล็กๆ ที่ยิ่งใหญ่)"
      },
      {
        type: "paragraph",
        text: "เว็บไซต์ยุคใหม่ต้อง 'โต้ตอบ' กับผู้ใช้ได้ ไม่ว่าจะเป็นปุ่มที่ขยับนิดๆ ตอนเอาเมาส์ไปชี้, รูปภาพที่ซูมเข้าเบาๆ, หรือแถบโหลดที่วิ่งตามการเลื่อนหน้าจอ สิ่งเหล่านี้เรียกว่า Micro-Interactions ที่ช่วยให้เว็บดู 'มีชีวิต' และไม่แข็งกระด้าง"
      },
      {
        type: "heading",
        text: "4. Mobile First ไม่ใช่แค่คำพูด"
      },
      {
        type: "paragraph",
        text: "เพราะคนดูเว็บผ่านมือถือมากกว่าคอมพิวเตอร์ การออกแบบปุ่มกด เมนู และตัวหนังสือ ต้องใหญ่พอที่จะใช้นิ้วโป้งกดได้ถนัด (Thumb-friendly zone) ไม่ต้องถ่างนิ้วขยาย นี่คือหัวใจสำคัญที่จะทำให้ลูกค้าไม่กดปิดเว็บหนี"
      }
    ]
  }
];
