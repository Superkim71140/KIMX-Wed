"use client";

import React from "react";
import { FileText, Palette, Code, SearchCheck, ShieldCheck, Rocket, Check } from "lucide-react";
import Container from "../ui/Container";
import CarouselSlider from "../ui/CarouselSlider";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      icon: <FileText className="w-6 h-6" />,
      title: "บรีฟ & วางแผนกลยุทธ์",
      bullets: [
        "พูดคุยสรุปโครงสร้างหน้าเว็บและความต้องการ",
        "กำหนดทิศทางอัตลักษณ์แบรนด์และกลุ่มเป้าหมาย",
        "วางทิศทางแผนงานและข้อตกลงราคาอย่างโปร่งใส"
      ]
    },
    {
      num: "02",
      icon: <Palette className="w-6 h-6" />,
      title: "ออกแบบ UI/UX ดีไซน์",
      bullets: [
        "ส่งมอบ Figma Mockup ดีไซน์เฉพาะตัวให้คุณตรวจทาน",
        "ตรวจสอบและปรับแก้โครงร่างก่อนเริ่มเขียนโค้ดจริง",
        "เน้นสุนทรียศาสตร์ที่ผสานฟังก์ชันใช้งานระดับสากล"
      ]
    },
    {
      num: "03",
      icon: <Code className="w-6 h-6" />,
      title: "พัฒนาความเร็วสูง Custom Code",
      bullets: [
        "เขียนโค้ดสถาปัตยกรรมเว็บด้วย Next.js และ Tailwind CSS",
        "วางโครงสร้างสไตล์โมเดิร์น คลีน ไร้โค้ดส่วนเกิน",
        "มอบอัตราความเร็วการดาวน์โหลดโหลดที่ลื่นไหลเต็มสปีด"
      ]
    },
    {
      num: "04",
      icon: <SearchCheck className="w-6 h-6" />,
      title: "ติดตั้ง Technical SEO",
      bullets: [
        "วางระบบจัดระเบียบโครงสร้างเนื้อหาและ Heading (H1-H3)",
        "ฝังโครงสร้าง Schema Markup ให้ Google รักและเข้าใจง่าย",
        "นำส่งเว็บบราวเซอร์เข้าสู่ระบบ Google Search Console"
      ]
    },
    {
      num: "05",
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "ตรวจสอบประสิทธิภาพ & บั๊ก",
      bullets: [
        "ควบคุมการทดสอบการทำงานของปุ่ม ฟอร์ม และเมนูระบบ",
        "สอบทานการแสดงผลบนสมาร์ทโฟน แท็บเล็ต และคอมพิวเตอร์",
        "ตรวจสอบความสมบูรณ์แบบและการเก็บงาน 100% ก่อนใช้งาน"
      ]
    },
    {
      num: "06",
      icon: <Rocket className="w-6 h-6" />,
      title: "Launch เปิดตัว & ส่งมอบระบบ",
      bullets: [
        "ผูกระบบโดเมนเนมและย้ายขึ้นระบบ Cloud Hosting จริง",
        "ส่งมอบสิทธิ์การเป็นเจ้าของโครงสร้างระบบทั้งหมดให้คุณ",
        "คู่มือสอนการใช้งานเนื้อหาหลังบ้าน พร้อมดูแลฟรี 1 ปีเต็ม"
      ]
    },
  ];

  const slides = steps.map((step, index) => (
    <div key={index} className="h-full px-2 py-4">
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 relative flex flex-col items-start h-full min-h-[380px] hover-slow-smooth shadow-[0_4px_20px_rgba(0,0,0,0.03)] group portfolio-card-gpu">
        {/* Giant background number watermark */}
        <span className="absolute top-6 right-8 text-5xl font-black text-slate-100/70 tracking-tight select-none font-sans transition-all duration-700 ease-out group-hover:text-teal-500/10 group-hover:scale-110">
          {step.num}
        </span>
        
        {/* Branded Icon Circle */}
        <div className="w-14 h-14 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center mb-6 shadow-inner transition-transform duration-700 group-hover:scale-110">
          {step.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-slate-900 mt-2 mb-4 tracking-tight">
          {step.title}
        </h3>

        {/* Checklists */}
        <ul className="flex flex-col gap-3 flex-grow justify-start w-full">
          {step.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-500 font-medium text-sm leading-relaxed">
              <div className="w-5 h-5 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} className="text-teal-600 stroke-[3]" />
              </div>
              <span className="leading-snug">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ));

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-transparent overflow-hidden scroll-mt-20">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-tr from-transparent via-sky-200/10 to-transparent filter blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Customized Section Header with Gradient */}
        <div className="text-center max-w-3xl mx-auto z-10 relative mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4" data-aos="fade-up">
            ขั้นตอนการทำงานร่วมกัน{" "}
            <span className="bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent inline-block">
              อย่างเป็นระบบ
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-400/90 font-medium leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            เราทำงานอย่างเป็นมืออาชีพ มีความชัดเจนในทุกระยะ เพื่อให้งานส่งมอบตรงตามเวลาและคุณภาพสูงสุดที่คุณต้องการ
          </p>
        </div>

        {/* Carousel Slider Layout */}
        <div className="mt-12 w-full max-w-7xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          <CarouselSlider
            slides={slides}
            autoplay={true}
            showNavigation={true}
            showPagination={true}
            slidesPerViewMobile={1}
            slidesPerViewTablet={2}
            slidesPerViewDesktop={3}
            className="pb-12"
          />
        </div>
      </Container>
    </section>
  );
}
