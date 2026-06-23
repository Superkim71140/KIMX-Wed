"use client";

import React from "react";
import Image from "next/image";
import Container from "../ui/Container";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { siteConfig } from "@/data/site";

export default function WhyNeedWebsite() {
  const { openModal } = useQuoteModal();

  const items = [
    {
      image: "/images/portfolio/commemt.webp",
      title: "สร้างความน่าเชื่อถือระดับมืออาชีพ",
    },
    {
      image: "/images/portfolio/message.webp",
      title: "ลูกค้าค้นหาเจอง่ายบน Google",
    },
    {
      image: "/images/portfolio/clock.webp",
      title: "เปิดหน้าร้านออนไลน์ 24 ชั่วโมง",
    },
    {
      image: "/images/portfolio/hands.webp",
      title: "ขยายฐานลูกค้าไร้ขีดจำกัด",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden z-0 border-t border-white/[0.05] kimx-dark-section">

      {/* Ambient Glows (Layer 2) */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] bg-teal-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[60%] bg-sky-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"></div>
      
      {/* Subtle Noise Overlay */}
      <div className="noise-overlay pointer-events-none" />

      {/* Main Content Wrapper (Layer 3) */}
      <Container className="relative z-10">
        <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            ทำไมธุรกิจยุคใหม่ ถึงต้องมีเว็บไซต์เป็นของตัวเอง?
          </h2>
        </div>

        {/* Constrained Grid & Cards Wrapper */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-xl group"
              >
                {/* Circular image placeholder (Compact & Round) */}
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border border-white/10 mb-4 shadow-[0_0_20px_rgba(56,189,248,0.15)] group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>

                {/* Typography (Compact Title) */}
                <h3 className="text-white/90 font-medium text-sm sm:text-base text-center leading-snug max-w-[180px]">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Refined Buttons CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={siteConfig.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-transparent text-white bg-[#06C755] hover:bg-[#05b34c] shadow-lg shadow-[#06C755]/20 rounded-full px-6 py-2.5 sm:px-8 sm:py-3 transition-all duration-500 font-bold text-sm sm:text-base"
          >
            <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-sm" />
            ปรึกษาผู้เชี่ยวชาญ
          </a>
          <button
            onClick={openModal}
            className="w-full sm:w-auto bg-white text-[#0B1220] font-semibold hover:bg-sky-50 rounded-full px-6 py-2.5 sm:px-8 sm:py-3 transition-colors shadow-lg hover:shadow-white/20 text-sm sm:text-base cursor-pointer"
          >
            ขอใบเสนอราคาฟรี
          </button>
        </div>
        </div>
      </Container>
    </section>
  );
}
