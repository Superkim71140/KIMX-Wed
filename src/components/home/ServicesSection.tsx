"use client";

import React from "react";
import Image from "next/image";
import Container from "../ui/Container";
import { siteConfig } from "@/data/site";
import { useQuoteModal } from "@/context/QuoteModalContext";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  imagePath: string;
}

const servicesData: ServiceCard[] = [
  {
    id: "uiux-experience",
    title: "เว็บไซต์สวย ทันสมัย ใช้งานง่าย ไม่ใช้เทมเพลตสำเร็จรูป",
    description:
      "ออกแบบเว็บไซต์โดยทีมดีไซเนอร์ วาง UI สวยงาม ใช้งานง่าย โดดเด่น ไม่ซ้ำใคร สร้างประสบการณ์ผู้ใช้ที่ดี (UX) เหมาะกับการใช้งานในแต่ละธุรกิจ โดยไม่พึ่งพาเทมเพลตเว็บสำเร็จรูป",
    imagePath: "/images/portfolio/A2Custom UIUX Experience.webp",
  },
  {
    id: "nextgen-arch",
    title: "เว็บโหลดเร็ว รองรับการทำ SEO",
    description:
      "พัฒนาเว็บไซต์ให้โหลดเร็วที่สุด เพื่อลดอัตราการปิดหน้าเว็บไซค์ (Bounce Rate) สร้างประสบการณ์ใช้งานเว็บที่ลื่นไหล และทำ On-Page SEO เพิ่ม Organic Traffic ให้กับเว็บไซต์ของคุณ",
    imagePath: "/images/portfolio/A1Next-Gen Architecture.webp",
  },
  {
    id: "endtoend-hardening",
    title: "ความปลอดภัยของเว็บไซต์ ทั้งหน้าบ้านและหลังบ้าน",
    description:
      "การป้องกันข้อมูลและความเป็นส่วนตัว ด้วยการติดตั้ง SSL Certificate, อัปเดตระบบและปลั๊กอินอย่างสม่ำเสมอ และเว็บไซต์อยู่บนระบบ Cloud ที่ไว้ใจได้ ป้องกันข้อมูลเว็บไซต์ศูนย์หาย",
    imagePath: "/images/portfolio/A3End-to-End Hardening.webp",
  },
];

export default function ServicesSection() {
  const { openModal } = useQuoteModal();

  return (
    <section className="py-24 bg-transparent relative" id="services" aria-labelledby="services-heading">
      <Container>
        {/* Section Header */}
        <div className="relative text-center max-w-3xl mx-auto z-10">
          {/* Centered glowing ambient backdrop shape */}
          <div className="section-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Elite 3-Orb Overlapping Layering Cluster */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible">
            <div className="absolute top-[-20%] left-[35%] w-48 h-48 rounded-full bg-teal-400/12 blur-2xl animate-float-slow" />
            <div className="absolute top-[0%] left-[48%] w-44 h-44 rounded-full bg-cyan-400/10 blur-2xl animate-float-slower" />
            <div className="absolute top-[-30%] left-[58%] w-3 h-3 rounded-full bg-teal-400/30 blur-xs animate-float-slow" style={{ animationDelay: '-4s' }} />
          </div>

          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900 relative z-10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            3 รากฐานทางวิศวกรรม
            <br />
            <span className="kimx-gradient-text">
              เบื้องหลังเว็บไซต์ระดับ High-End
            </span>
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed font-medium relative z-10" data-aos="fade-up" data-aos-delay="400">
            เจาะลึก 3 ปัจจัยสำคัญในการขับเคลื่อนสถาปัตยกรรมเว็บยุคใหม่ ที่ออกแบบขึ้นมาเพื่อสร้างความน่าเชื่อถือและความเติบโตอย่างยั่งยืนให้กับแบรนด์คุณ
          </p>
        </div>

        {/* Cards Grid: 3-column system */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mt-16 relative z-10">
          {servicesData.map((card, index) => (
            <div
              key={card.id}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              className="h-full"
            >
              <div
                className="service-card-gpu flex flex-col items-center text-center p-10 bg-white/95 backdrop-blur-xs border border-slate-100/50 rounded-4xl h-full transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_32px_64px_-16px_rgba(15,23,42,0.03)]"
              >
                {/* Visual Mockup Illustration Image */}
                <div className="relative aspect-16/10 w-full max-w-xs mx-auto overflow-hidden rounded-2xl mb-8 group/illust shrink-0">
                  <Image
                    src={card.imagePath}
                    alt={card.title}
                    fill={true}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover/illust:scale-105"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Capsule Bar */}
        <div data-aos="fade-up" data-aos-delay="200" className="w-full max-w-5xl mx-auto mt-12 px-4 relative z-10">
          <div
            className="w-full rounded-full bg-linear-to-r from-teal-500/5 to-cyan-500/5 border border-slate-200/60 px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs hover:shadow-sm hover:border-slate-300 transition-colors duration-300"
          >
            <div className="text-slate-700 font-bold text-xs sm:text-sm text-center md:text-left flex items-center gap-2">
              <span>ยังไม่แน่ใจว่าต้องใช้บริการไหน? ให้เราช่วยวิเคราะห์ความต้องการและโครงสร้างเว็บฟรี</span>
            </div>
            <div className="flex items-center gap-4 shrink-0 justify-center w-full md:w-auto">
              <button
                type="button"
                onClick={openModal}
                className="text-[#14b8a6] font-extrabold text-xs sm:text-sm whitespace-nowrap hover:underline cursor-pointer focus-visible:outline-2"
              >
                ขอใบเสนอราคาด่วนที่นี่ →
              </button>
              <div className="h-4 w-px bg-slate-200 hidden md:block" />
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[#06c755] hover:bg-[#05b34c] text-white text-xs font-bold shadow-xs hover:shadow-md transition-transform duration-300 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
              >
                <Image src="/line-ar21.svg" alt="LINE" width={16} height={16} className="w-4 h-4 object-contain inline shrink-0" />
                <span>คุยไลน์ด่วน</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
