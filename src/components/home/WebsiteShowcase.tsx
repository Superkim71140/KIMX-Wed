"use client";

import React, { useState } from "react";
import { portfolioItems, portfolioCategories, PortfolioCategory } from "@/data/portfolio";
import { useQuoteModal } from "@/context/QuoteModalContext";
import Container from "../ui/Container";
import CarouselSlider from "../ui/CarouselSlider";
import PortfolioCard from "../portfolio/PortfolioCard";
import CTAButton from "../ui/CTAButton";
import Image from "next/image";
import { siteConfig } from "@/data/site";

export default function WebsiteShowcase() {
  const { openModal } = useQuoteModal();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category.includes(activeFilter as PortfolioCategory));

  const slides = filteredItems.map((item) => (
    <div key={item.slug} className="h-full flex flex-col justify-between px-1">
      <PortfolioCard
        item={item}
        onQuoteClick={openModal}
      />
    </div>
  ));

  return (
    <section id="showcase" className="relative overflow-hidden py-20 sm:py-24 bg-transparent scroll-mt-20">
      {/* Background soft glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-200/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            ผลงานออกแบบและ<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9]">พัฒนาเว็บไซต์จริง</span>
          </h2>
          
          <p className="text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
            ตัวอย่างเว็บไซต์ขนส่งสินค้า โลจิสติกส์ และธุรกิจทั่วไปที่เราส่งมอบเรียบร้อยแล้ว ทุกระบบรองรับการแสดงผลบนมือถือ โหลดเสร็จไว และวางโครงสร้างทางเทคนิคสำหรับไต่อันดับ SEO
          </p>
        </div>

        {/* Filter Buttons Section */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/80 rounded-full mx-auto w-fit mb-12 border border-slate-200/50 shadow-sm" data-aos="fade-up" data-aos-delay="100">
          {portfolioCategories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                aria-pressed={isActive}
                className={`transition-all duration-300 cursor-pointer text-xs sm:text-sm px-5 py-2 rounded-full ${
                  isActive 
                    ? "bg-[#14b8a6]/10 text-[#14b8a6] font-bold border border-[#14b8a6]/20 shadow-[0_2px_8px_rgba(20,184,166,0.05)]" 
                    : "text-slate-500 font-medium hover:text-slate-800 hover:bg-slate-200/50 border border-transparent"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Carousel Slider */}
        <div className="max-w-6xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          {slides.length > 0 ? (
            <CarouselSlider
              slides={slides}
              autoplay={true}
              slidesPerViewMobile={1}
              slidesPerViewTablet={2}
              slidesPerViewDesktop={3}
              className="px-4 md:px-0 pb-16 portfolio-swiper-lock"
            />
          ) : (
            <div className="text-center py-12 text-slate-500 font-medium">
              ไม่พบรายการผลงานในหมวดหมู่นี้
            </div>
          )}
        </div>

        {/* View all portfolio button */}
        <div className="mt-14 text-center" data-aos="fade-up" data-aos-delay="300">
          <CTAButton variant="outline" size="md" href="/portfolio" className="border-sky-200 text-slate-800 hover:bg-sky-50">
            ดูผลงานทั้งหมด
          </CTAButton>
        </div>

        {/* Bottom CTA Panel */}
        <div className="mt-16 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="400">
          <div className="relative rounded-3xl border border-transparent bg-white p-6 sm:p-8 text-center overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-sky-200/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-200/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                ยังไม่แน่ใจว่าเว็บแบบไหนเหมาะกับธุรกิจคุณ?
              </h3>
              
              <p className="text-xs sm:text-sm font-light text-slate-600 leading-relaxed">
                ส่งไอเดียหรือธุรกิจของคุณมาให้เราช่วยวิเคราะห์ฟรี ว่าควรเริ่มจากเว็บไซต์บริษัททั่วไป, ร้านค้าออนไลน์, หน้าเซลเพจด่วน หรือระบบเฉพาะทาง
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CTAButton
                  href={siteConfig.lineUrl}
                  external={true}
                  variant="line"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3 shadow-[0_4px_15px_rgba(6,199,85,0.25)]"
                >
                  <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-sm" />
                  <span>ปรึกษาผ่าน LINE ฟรี</span>
                </CTAButton>
                
                <CTAButton
                  onClick={openModal}
                  variant="primary"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3"
                >
                  <span>ขอใบเสนอราคา</span>
                </CTAButton>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
