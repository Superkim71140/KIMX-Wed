"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import Container from "../ui/Container";
import CarouselSlider from "../ui/CarouselSlider";
import Image from "next/image";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "คุณกิตติศักดิ์",
    role: "Marketing Director",
    company: "มหาชัย ซีฟู้ดส์ คอร์ปอเรชั่น",
    content: "KIMX Web ช่วยออกแบบเว็บไซต์ธุรกิจแบบ Premium โหลดเร็วมาก ลูกค้าใช้งานง่ายและช่วยให้เราติดหน้าแรกบน Google ในคีย์เวิร์ดสำคัญของสมุทรสาครได้รวดเร็วมากครับ ทีมงานทำงานรวดเร็วและมืออาชีพสุดๆ",
    rating: 5,
    avatar: "/images/portfolio/คุณกิตติศักดิ์.webp",
  },
  {
    name: "คุณรัญลักษ์",
    role: "CEO & Co-founder",
    company: "กระทุ่มแบน แพ็คเกจจิ้ง จำกัด",
    content: "ประทับใจระบบหลังบ้านที่เข้าใจง่ายมากค่ะ หน้าเว็บสวยงามมีมิติ ดีไซน์กระจก (Glassmorphism) สวยดูพรีเมียมมากๆ ทางแบรนด์ของเราน่าเชื่อถือขึ้นเยอะเลยค่ะ แนะนำร้านค้าหรือบริษัทที่อยากทำเว็บคุณภาพสูงเลยค่ะ",
    rating: 5,
    avatar: "/images/portfolio/คุณรัญลักษ์.webp",
  },
  {
    name: "คุณธีรเดช",
    role: "Business Owner",
    company: "บ้านแพ้ว ออร์แกนิค ฟาร์ม",
    content: "ขอบคุณทีมงาน KIMX สำหรับ Landing Page ที่ช่วยทำยอดขายถล่มทลายและระบบ Google Ads Tracking ทำงานร่วมกับเว็บแบบไม่มีสะดุด ช่วยเราปิดการขายได้เยอะขึ้น คุ้มค่าแก่การลงทุนทำเว็บกับที่นี่มากๆ ครับ",
    rating: 5,
    avatar: "/images/portfolio/review.jpg",
  },
  {
    name: "คุณพัชราภา",
    role: "เจ้าของธุรกิจขนส่ง",
    company: "พัชราภา ทรานสปอร์ต มหาชัย",
    content: "ทีมงานดูแลดีมากค่ะ ตั้งแต่ออกแบบ โครงสร้าง SEO ไปจนถึงสอนการใช้งานระบบ โฮสติ้งคลาวด์เร็วมาก โหลดปุ๊บมาปั๊บ คุ้มค่าที่สุดสำหรับเว็บธุรกิจ SME",
    rating: 5,
    avatar: "/images/portfolio/คุณพัชราภา.webp",
  }
];

export default function TestimonialsSection() {
  const slides = testimonials.map((t, idx) => (
    <div key={idx} className="group relative h-full w-full testimonial-outer-wrapper cursor-pointer py-4 px-2">
      {/* 
        Kinetic Inner Card 
        We use an inner mask for the laser border sweep.
      */}
      <div className="relative h-full flex flex-col p-8 rounded-3xl transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 group-hover:shadow-[0_24px_48px_rgba(20,184,166,0.12)] border border-slate-200/50 bg-white/40 overflow-hidden z-10 testimonial-card-gpu">
        
        {/* Laser Border Sweep (Hidden until hover) */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] pointer-events-none z-0 rounded-3xl">
          <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_80%,var(--color-primary)_100%)]" />
        </div>

        {/* Inner Mask to hollow out the laser center, forming a glowing border */}
        <div className="absolute inset-[1.5px] bg-white/90 backdrop-blur-xl rounded-[calc(1.5rem-1.5px)] z-0 transition-colors duration-[1000ms] group-hover:bg-white/95" />

        {/* Quote Watermark */}
        <Quote className="absolute top-8 right-8 w-16 h-16 text-teal-500/5 -rotate-12 pointer-events-none z-0" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* 1. Profile at top */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-4 ring-white shadow-sm">
              <Image src={t.avatar} alt={t.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-slate-900 font-bold text-base tracking-tight">
                {t.name}
              </span>
              <span className="text-teal-600 font-medium text-xs sm:text-sm tracking-wide">
                {t.role}, {t.company}
              </span>
            </div>
          </div>

          {/* 2. Rating */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={16} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
            ))}
          </div>

          {/* 3. Review Content */}
          <div className="mt-auto">
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              &ldquo;{t.content}&rdquo;
            </p>
          </div>
          
        </div>
      </div>
    </div>
  ));

  return (
    // Section has no data-aos — Swiper's position must not be affected by ancestor transform/opacity
    <section className="relative py-24 bg-transparent overflow-hidden" id="testimonials">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            สิ่งที่ลูกค้าพึงพอใจใน <span className="kimx-gradient-text">KIMX Web</span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed font-medium">
            ความสำเร็จของธุรกิจคุณคือเป้าหมายสูงสุดของเรา นี่คือเสียงยืนยันส่วนหนึ่งจากลูกค้าผู้มีอุปการคุณ
          </p>
        </div>

        {/* Carousel Slider with Sibling Dimming Wrapper */}
        <div className="testimonial-carousel-wrapper">
          <CarouselSlider
            slides={slides}
            autoplay={true}
            autoplayDelay={5000}
            showNavigation={true}
            showPagination={true}
            slidesPerViewMobile={1}
            slidesPerViewTablet={2}
            slidesPerViewDesktop={3}
            className="px-4 md:px-0"
          />
        </div>
      </Container>
    </section>
  );
}

