"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Check, X, Briefcase, Calendar, Code2, Wrench, Layers } from "lucide-react";
import { portfolioItems, portfolioCategories, PortfolioItem, PortfolioCategory } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { useQuoteModal } from "@/context/QuoteModalContext";
import CarouselSlider from "../ui/CarouselSlider";
import PortfolioCard from "./PortfolioCard";
import CTAButton from "../ui/CTAButton";

export default function PortfolioGallery() {
  const { openModal } = useQuoteModal();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);

  const filteredItems = selectedCategory === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category.includes(selectedCategory as PortfolioCategory));

  // Close modals on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const slides = filteredItems.map((item) => (
    <div key={item.slug} className="h-full px-1">
      <PortfolioCard
        item={item}
        onDetailClick={() => setActiveProject(item)}
        onQuoteClick={openModal}
      />
    </div>
  ));

  return (
    <div className="space-y-12">
      
      {/* Category Filter Tabs */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-100/80 border border-slate-200/50 shadow-sm max-w-full overflow-x-auto scrollbar-none snap-x snap-mandatory">
          {portfolioCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`snap-center px-5 py-2 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-[#14b8a6]/10 text-[#14b8a6] font-bold border border-[#14b8a6]/20 shadow-[0_2px_8px_rgba(20,184,166,0.05)]"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 border border-transparent"
                }`}
                aria-pressed={isActive}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Swiper Slider Carousel of Portfolio Cards */}
      <div className="max-w-6xl mx-auto">
        {slides.length > 0 ? (
          <CarouselSlider
            slides={slides}
            autoplay={true}
            slidesPerViewMobile={1}
            slidesPerViewTablet={2}
            slidesPerViewDesktop={3}
            className="px-4 md:px-0 portfolio-swiper-lock"
          />
        ) : (
          <div className="text-center py-12 text-slate-500 font-medium">
            ไม่พบรายการผลงานในหมวดหมู่นี้
          </div>
        )}
      </div>

      {/* Detail Modal: Project Case Study (Premium Light-themed glass overlay) */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-3xl w-full rounded-4xl border border-slate-200/60 bg-white/95 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 md:space-y-8 my-8 text-left transition-all duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer bg-slate-50 p-2.5 rounded-full transition-all duration-300 hover:scale-105"
              aria-label="ปิดกล่องข้อมูล"
            >
              <X size={18} />
            </button>

            {/* Header: Project Category & Title */}
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#14b8a6]/20 bg-[#14b8a6]/5 text-[#14b8a6] text-[10.5px] font-bold tracking-wider uppercase">
                <Briefcase size={11} className="stroke-[2.5]" />
                <span>CASE STUDY: {activeProject.badge || activeProject.category[0]}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {activeProject.title}
              </h2>
            </div>

            {/* Grid of stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div className="space-y-1">
                <div className="text-slate-500 flex items-center gap-1"><Layers size={12} /><span>ผู้ว่าจ้าง</span></div>
                <div className="font-bold text-slate-800">{activeProject.clientName || "-"}</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-500 flex items-center gap-1"><Briefcase size={12} /><span>กลุ่มธุรกิจ</span></div>
                <div className="font-bold text-slate-800">{activeProject.industry || "-"}</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-500 flex items-center gap-1"><Calendar size={12} /><span>ปีที่ส่งมอบ</span></div>
                <div className="font-bold text-slate-800">{activeProject.year || "-"}</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-500 flex items-center gap-1"><Code2 size={12} /><span>สถาปัตยกรรม</span></div>
                <div className="font-bold text-slate-800">{activeProject.techStack?.[0] || "NextJS"} + Tailwind</div>
              </div>
            </div>

            {/* Image Preview inside detail modal */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200/40 bg-slate-50 flex items-center justify-center">
              <Image
                src={activeProject.image}
                alt={activeProject.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>

            {/* Copy columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
              
              {/* Left text column */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>รายละเอียดโครงการ</span>
                </h4>
                <p className="text-xs sm:text-sm font-medium text-slate-600">
                  {activeProject.description}
                </p>
                {activeProject.services && activeProject.services.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><Wrench size={12} /><span>บริการที่ให้:</span></div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.services.map((serv, idx) => (
                        <span key={idx} className="text-[10.5px] text-slate-700 bg-slate-100 py-1 px-3 rounded-lg border border-slate-200/60 font-medium">
                          {serv}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right checklist column */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  ขอบเขตการพัฒนาระบบ
                </h4>
                <ul className="space-y-2.5">
                  {activeProject.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-[#14b8a6]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} className="text-[#14b8a6] stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {activeProject.techStack && activeProject.techStack.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><Code2 size={12} /><span>Technology Stack:</span></div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.techStack.map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-[#14b8a6] bg-[#14b8a6]/5 py-1 px-2.5 rounded-lg border border-[#14b8a6]/10 font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions inside detail modal */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <span className="text-[11.5px] text-slate-500 font-medium max-w-sm text-center sm:text-left leading-normal">
                ต้องการปรึกษาโครงสร้างระบบเฉพาะทางเพื่อนำมาปรับใช้กับรูปแบบงานธุรกิจของคุณ?
              </span>
              <div className="flex gap-3 w-full sm:w-auto">
                <CTAButton
                  href={siteConfig.lineUrl}
                  external={true}
                  variant="line"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-2.5 shadow-sm"
                >
                  <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-sm" />
                  <span>คุยไลน์ด่วน</span>
                </CTAButton>
                <CTAButton
                  onClick={() => {
                    setActiveProject(null);
                    openModal();
                  }}
                  variant="primary"
                  className="w-full sm:w-auto px-6 py-2.5"
                >
                  ขอใบเสนอราคา
                </CTAButton>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
