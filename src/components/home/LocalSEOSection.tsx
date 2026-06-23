"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import Container from "../ui/Container";
import { siteConfig } from "@/data/site";

const serviceAreas = [
  "มหาชัย",
  "สมุทรสาคร",
  "กระทุ่มแบน",
  "บ้านแพ้ว",
  "พระราม 2",
  "กรุงเทพฯ",
  "นนทบุรี",
  "นครปฐม",
];

export default function LocalSEOSection() {
  const [inView, setInView] = useState(false);
  const [score, setScore] = useState(0);
  const [hoveredChip, setHoveredChip] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = 99;
    const duration = 2000;
    const incrementTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      if (start > end) {
        clearInterval(timer);
      } else {
        setScore(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section
      id="local-seo"
      aria-labelledby="local-seo-heading"
      className="relative py-24 overflow-hidden bg-transparent font-prompt text-[#1D1D1F]"
    >
      <Container>
        <div className="max-w-7xl mx-auto px-6">
          {/* A. Header Area */}
          <div className="flex flex-col items-center justify-center mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] -tracking-[0.02em] leading-tight mb-6 font-inter">
              รับทำเว็บไซต์สมุทรสาคร<br />
              <span className="kimx-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9]">
                พร้อมวางระบบให้ธุรกิจติด Google ง่ายขึ้น
              </span>
            </h2>
            
            <p className="text-[#64748b] font-medium text-[16px] max-w-3xl mx-auto">
              KIMX Web Agency ออกแบบและพัฒนาเว็บไซต์สำหรับธุรกิจ ครบทั้งเว็บไซต์บริษัท 
              ระบบร้านค้าออนไลน์ และโครงสร้าง SEO สำหรับการค้นหาบน Google ให้คุณโดดเด่นในทุกพื้นที่
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Slot A: Performance Gauge */}
            <div 
              ref={sectionRef}
              className="glass-panel lg:col-span-4 rounded-[32px] p-8 sm:p-10 relative overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg hover:border-teal-500/30 hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center text-center min-h-[300px]"
            >
              {/* Subtle slow-moving scanner line */}
              <div className="cyber-scanline opacity-10 pointer-events-none" />
              
              <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(20,184,166,0.25)]" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14B8A6" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                  </defs>
                  <circle
                    className="text-slate-100"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="42"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    strokeDasharray="264"
                    strokeDashoffset={inView ? 2.64 : 264}
                    strokeLinecap="round"
                    fill="transparent"
                    r="42"
                    cx="50"
                    cy="50"
                    className="transition-all duration-[2000ms] ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-800 font-inter tracking-tighter">
                    {score}
                    <span className="text-lg text-slate-400">/100</span>
                  </span>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-slate-800 font-bold text-base tracking-wide mb-1">Google PageSpeed</h4>
                <p className="text-slate-500 text-xs font-light">โครงสร้างความเร็วและคะแนน SEO ดีที่สุด</p>
              </div>
            </div>

            {/* Slot B: Technical Specifications */}
            <div className="glass-panel lg:col-span-8 rounded-[32px] p-8 sm:p-10 relative overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg hover:border-teal-500/30 hover:shadow-xl transition-all duration-500 flex flex-col group justify-between">
              <h3 className="text-xl font-black text-slate-850 mb-6 font-inter">โครงสร้างเทคนิคัลและมาตรฐาน SEO</h3>
              
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50/50 border border-slate-100/80">
                <Image
                  src="/images/portfolio/โครงสร้างเทคนิค.webp"
                  alt="โครงสร้างเทคนิคัลและมาตรฐาน SEO"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* Slot C: Geo-Targeted Locations */}
            <div className="glass-panel lg:col-span-12 rounded-[32px] p-8 sm:p-10 relative overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg hover:border-teal-500/30 hover:shadow-xl transition-all duration-500 flex flex-col">
              <div className="relative z-10">
                <h3 className="text-xl font-black text-slate-800 mb-6 font-inter">พื้นที่บริการครอบคลุมระบบ Local SEO</h3>
                <p className="text-slate-500 text-sm font-light mb-6 max-w-2xl">
                  เราวางโครงสร้าง Local SEO เจาะลึกรายพื้นที่ได้อย่างแม่นยำ พร้อมขับเคลื่อนระบบดันเว็บไซต์ให้ติดหน้าแรก Google รองรับทุกธุรกิจในทุกจังหวัดทั่วประเทศไทย
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {/* Master Nationwide Chip */}
                  <span
                    onMouseEnter={() => setHoveredChip(-1)}
                    onMouseLeave={() => setHoveredChip(null)}
                    className="kimx-chip relative px-5 py-3 rounded-full bg-slate-900 border border-teal-500/30 text-white text-[13px] font-extrabold transition-all duration-500 cursor-default hover:scale-105 shadow-[0_0_15px_rgba(20,184,166,0.15)] hover:shadow-[0_0_25px_rgba(20,184,166,0.35)] flex items-center gap-2"
                  >
                    <span>ทุกจังหวัดทั่วประเทศไทย (Nationwide)</span>
                    {hoveredChip === -1 && (
                      <span 
                        className="absolute inset-0 rounded-full bg-teal-400 animate-ping pointer-events-none" 
                        style={{ animationDuration: "2s", opacity: 0.08 }} 
                      />
                    )}
                  </span>

                  {serviceAreas.map((area, idx) => (
                    <span
                      key={idx}
                      onMouseEnter={() => setHoveredChip(idx)}
                      onMouseLeave={() => setHoveredChip(null)}
                      className="kimx-chip relative px-5 py-3 rounded-full bg-[#F4F8FB] border border-slate-200 text-[#334155] text-[13px] font-bold transition-all duration-300 cursor-default hover:scale-105"
                    >
                      {area}
                      {/* Slow-spreading faint radial pulse wave aura */}
                      {hoveredChip === idx && (
                        <span 
                          className="absolute inset-0 rounded-full bg-teal-400 animate-ping pointer-events-none" 
                          style={{ animationDuration: "2s", opacity: 0.05 }} 
                        />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* E. Bottom Actions Row */}
            <div className="glass-panel lg:col-span-12 rounded-[32px] p-6 sm:p-8 bg-white/60 backdrop-blur-xl border border-slate-200/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#06C755] text-white font-extrabold text-[16px] shadow-[0_8px_20px_rgba(6,199,85,0.2)] hover:shadow-[0_12px_25px_rgba(6,199,85,0.3)] hover:scale-105 active:scale-95 transition-all duration-500 ease-out"
                >
                  <Image 
                    src="/images/portfolio/line-ar21.svg" 
                    alt="LINE" 
                    width={32} 
                    height={32} 
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0" 
                  />
                  <span>คุยรายละเอียดผ่าน LINE</span>
                </a>
                <a
                  href="#free-audit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-800 font-bold text-[16px] hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 transition-all duration-500 ease-out"
                >
                  ขอตรวจ SEO ฟรี
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-500 font-medium text-[12px] sm:text-[13px]">
                <Info size={16} className="text-teal-500 shrink-0" />
                <span>ทุกเว็บไซต์ส่งมอบพร้อมระบบวิเคราะห์และคำแนะนำ Google Search Console ฟรี</span>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
