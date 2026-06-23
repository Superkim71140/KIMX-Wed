import React from "react";
import type { Metadata } from "next";
import { Sparkles, Check, MessageSquare } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import CTAButton from "@/components/ui/CTAButton";
import GlassCard from "@/components/ui/GlassCard";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";

// Specific SEO Metadata for Portfolio page
export const metadata: Metadata = buildMetadata({
  title: "ผลงานรับทำเว็บไซต์ | Portfolio - KIMX Web",
  description: "ชมผลงานออกแบบและพัฒนาเว็บไซต์จาก KIMX Web ทั้งเว็บไซต์บริษัท E-commerce Landing Page และ Custom Web System พร้อมดีไซน์ทันสมัย โหลดเร็ว และรองรับ SEO",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const trustMetrics = [
    "ออกแบบตามเป้าหมายธุรกิจ",
    "Responsive ทุกอุปกรณ์",
    "Technical SEO-Ready",
    "สิทธิ์ขาดความเป็นเจ้าของ 100%",
  ];

  return (
    <>
      {/* 1. Hero Section (Premium Light Theme) */}
      <section className="relative overflow-hidden pt-32 pb-16 bg-transparent">
        {/* Background grids and glows */}
        <div className="absolute inset-0 kimx-soft-grid opacity-80 z-0" />
        <div className="noise-overlay" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[130px] pointer-events-none" />

        <Container className="relative z-10 text-center max-w-4xl mx-auto py-12 lg:py-20">
          <div className="space-y-6" data-aos="fade-up">
            <div className="inline-block">
              <Badge className="bg-[#14b8a6]/10 border-[#14b8a6]/20 text-[#14b8a6]">
                <Sparkles className="w-4 h-4 text-[#14b8a6] animate-pulse" />
                <span>PORTFOLIO • ผลงานของเรา</span>
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              ผลงานเว็บไซต์ที่ออกแบบมา <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#14b8a6] via-[#0ea5e9] to-[#0d9488]">
                เพื่อธุรกิจจริง
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              ดูตัวอย่างแนวทางเว็บไซต์ที่ KIMX Web สามารถออกแบบและพัฒนาให้ธุรกิจของคุณได้ ตั้งแต่เว็บไซต์บริษัท ร้านค้าออนไลน์ หน้า Sale Page ไปจนถึงระบบเฉพาะทางหลังบ้าน
            </p>

            {/* Quick CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton variant="primary" size="md" href="#contact-portfolio" className="btn-slow-smooth">
                อยากได้เว็บแนวนี้
              </CTAButton>
              <CTAButton variant="outline" size="md" href="/#pricing" className="btn-slow-smooth">
                ดูแพ็กเกจราคา
              </CTAButton>
            </div>

            {/* Mini Trust indicators */}
            <div className="pt-6 flex flex-wrap justify-center gap-3">
              {trustMetrics.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/70 border border-slate-200/50 text-xs font-bold text-slate-700 shadow-sm"
                >
                  <Check size={13} className="text-[#14b8a6] stroke-[3]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Portfolio Gallery (Swiper Slider & Filters) */}
      <section className="relative py-16 bg-transparent overflow-hidden">
        <Container>
          <PortfolioGallery />
        </Container>
      </section>

      {/* 3. Reusable Quality Checklist / Trust Strip (Light Tech layout) */}
      <section className="relative py-16 bg-slate-100/50 border-t border-b border-slate-200/40">
        <div className="absolute inset-0 bg-linear-to-r from-[#14b8a6]/5 via-sky-500/5 to-transparent pointer-events-none" />
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            <GlassCard className="border-slate-200/60 bg-white p-6 text-center" hoverScale={true} hoverGlow={true}>
              <h3 className="text-base font-bold text-slate-900 mb-2">ออกแบบตามเป้าหมาย</h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                ไม่ได้ลอกแบบสำเร็จรูป ทุกโครงสร้างปูตามวัตถุประสงค์ธุรกิจเพื่อกระตุ้นยอดขาย
              </p>
            </GlassCard>
            <GlassCard className="border-slate-200/60 bg-white p-6 text-center" hoverScale={true} hoverGlow={true}>
              <h3 className="text-base font-bold text-slate-900 mb-2">รองรับมือถือ 100%</h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                หน้าเว็บสวยสมบูรณ์แบบ ปุ่มกดถนัดนิ้วและจัดลำดับรูปภาพได้อย่างสมดุลบนสมาร์ทโฟน
              </p>
            </GlassCard>
            <GlassCard className="border-slate-200/60 bg-white p-6 text-center" hoverScale={true} hoverGlow={true}>
              <h3 className="text-base font-bold text-slate-900 mb-2">Technical SEO</h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                โครงสร้าง HTML คลีน วาง Schema Markup และ Heading ให้สอดคล้องกับเสิร์ชบอท Google
              </p>
            </GlassCard>
            <GlassCard className="border-slate-200/60 bg-white p-6 text-center" hoverScale={true} hoverGlow={true}>
              <h3 className="text-base font-bold text-slate-900 mb-2">ต่อยอดได้ไม่ผูกมัด</h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                ส่งมอบโค้ดจริง สิทธิ์โดเมนและโฮสติ้งเป็นของคุณ 100% ไม่มีค่าเช่ารายเดือน
              </p>
            </GlassCard>
          </div>
        </Container>
      </section>

      {/* 4. Final CTA Section (Light Elegant layout) */}
      <section id="contact-portfolio" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
        {/* Glow behind final CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-tr from-transparent via-[#14b8a6]/5 to-transparent filter blur-[100px] pointer-events-none" />

        <Container>
          <div className="max-w-4xl mx-auto">
            <GlassCard
              className="p-8! sm:p-12! text-center bg-white border border-slate-200/60 relative overflow-hidden shadow-xl"
              hoverScale={false}
              hoverGlow={true}
            >
              <div className="max-w-2xl mx-auto space-y-6">
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  อยากให้เว็บไซต์ของคุณ <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#14b8a6] to-sky-600">
                    เป็นผลงานชิ้นต่อไปของเรา?
                  </span>
                </h2>

                <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                  เล่าไอเดียหรือส่งตัวอย่างเว็บไซต์ที่คุณชื่นชอบมาให้ทีมงาน KIMX Web เราจะช่วยวิเคราะห์รูปแบบที่เหมาะสม ออกแบบแผนผังระบบ และประเมินราคาพร้อมขอบเขตการทำงานให้อย่างเสร็จสรรพโดยไม่มีเงื่อนไขผูกมัด
                </p>

                {/* Submit buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <CTAButton
                    href={siteConfig.lineUrl}
                    external={true}
                    variant="line"
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 shadow-md shadow-green-500/10 btn-slow-smooth"
                  >
                    <MessageSquare size={16} className="fill-current" />
                    <span>ทัก LINE เพื่อคุยโปรเจกต์</span>
                  </CTAButton>
                  <CTAButton
                    href="/#contact"
                    variant="primary"
                    className="w-full sm:w-auto px-8 py-3.5 btn-slow-smooth"
                  >
                    ขอใบเสนอราคา
                  </CTAButton>
                </div>

                <div className="pt-2 text-[10.5px] text-slate-400 font-semibold">
                  * ปรึกษาฟรีทุกความต้องการ โทรคุยบรีฟกับทีมสถาปนิกเว็บโดยตรงได้ที่ {siteConfig.telephone}
                </div>

              </div>
            </GlassCard>
          </div>
        </Container>
      </section>
    </>
  );
}
