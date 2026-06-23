"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import Container from "../ui/Container";
import { useQuoteModal } from "@/context/QuoteModalContext";
import Image from "next/image";

export default function WhyChooseUs() {
  const { openModal } = useQuoteModal();

  const features = [
    "ฟรี! โดเมนเนม 1 ปี",
    "พื้นที่เก็บข้อมูล 2GB (Cloud Server)",
    "ฟรี! ใบรับรองความปลอดภัย SSL",
    "รองรับการแสดงผลทุกหน้าจอ (Responsive)",
    "เชื่อมต่อช่องทางติดต่อ (LINE, Facebook, โทรศัพท์)",
    "ระบบจัดการหลังบ้าน (CMS) เบื้องต้น",
    "ปรับแต่งโครงสร้าง Technical SEO เบื้องต้น",
    "ดูแลและรับประกันระบบ 1 ปีเต็ม"
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-transparent overflow-hidden scroll-mt-20">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-200/10 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Premium Social Proof */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight" data-aos="fade-right" data-aos-delay="0">
              สิ่งที่ลูกค้าพูดถึง <span className="text-[#14b8a6]">KIMX</span>
            </h2>
            
            <div className="lg:col-span-5 bg-slate-900 rounded-[24px] p-10 border border-slate-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col justify-between" data-aos="fade-right" data-aos-delay="200">
              <span className="absolute -top-4 -left-2 text-[120px] leading-none text-slate-800 font-serif font-black select-none z-0">“</span>
              
              <div className="flex gap-1 relative z-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-slate-300 font-medium leading-relaxed italic mt-4 mb-6 relative z-10">
                &ldquo;ทีมงาน KIMX ใส่ใจในการออกแบบเว็บ มีความเข้าใจในความต้องการของเรา งานออกแบบทันสมัยมากและที่สำคัญระบบใช้งานได้จริง โหลดไว และช่วยเรื่อง SEO ได้เยอะมาก แนะนำเลยสำหรับธุรกิจที่ต้องการอัพเกรดภาพลักษณ์&rdquo;
              </p>
              
              <div className="flex items-center gap-4 mt-8 relative z-10">
                <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden ring-4 ring-slate-800">
                  <Image src="/images/portfolio/review.jpg" alt="คุณพัชราภา" className="object-cover w-full h-full" height={56} width={56} />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-base">คุณพัชราภา</span>
                  <span className="text-slate-400 font-medium text-sm">เจ้าของธุรกิจขนส่ง สมุทรสาคร</span>
                </div>
              </div>
            </div>
          </div>
 
          {/* Right Column: The Ultimate Package Board */}
          <div className="lg:col-span-7 bg-white rounded-[24px] p-10 border-t-8 border-t-[#14B8A6] border-x border-b border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col h-full" data-aos="fade-left" data-aos-delay="400">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              เว็บไซต์หน้าเดียว (Single Page)
            </h3>
            <p className="text-[#14b8a6] font-bold text-sm mb-8">
              ** เว็บด่วน พร้อมใช้งาน เสร็จภายใน 3 วัน **
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10 grow">
              {features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 font-semibold text-[15px]">
                  <CheckCircle2 className="text-[#14b8a6] shrink-0 mt-0.5" size={18} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-slate-900 to-slate-600">
                  ฿3,500
                </span>
                <span className="text-slate-500 font-medium text-[13px] mt-1.5">(รายปีถัดไป ปีละ 1,500 บาท)</span>
              </div>
              <button 
                onClick={openModal}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-linear-to-r from-[#14B8A6] to-[#0D9488] text-white font-extrabold text-[15px] shadow-[0_8px_20px_rgba(20,184,166,0.3)] hover:shadow-[0_12px_25px_rgba(20,184,166,0.45)] hover:-translate-y-1 transition-all duration-300"
              >
                ปรึกษาและจองคิว
              </button>
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
