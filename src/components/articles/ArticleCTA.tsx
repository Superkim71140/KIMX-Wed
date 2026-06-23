"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { useQuoteModal } from "@/context/QuoteModalContext";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import CTAButton from "../ui/CTAButton";

interface ArticleCTAProps {
  slug: string;
  accentColor: string;
}

export default function ArticleCTA({ slug, accentColor }: ArticleCTAProps) {
  const { openModal } = useQuoteModal();

  const getCtaContent = () => {
    switch (slug) {
      case "seo":
        return {
          title: "อยากให้เว็บติดหน้าแรก Google?",
          desc: "ปรึกษาเราวันนี้ เพื่อวิเคราะห์เว็บไซต์และวางแผน SEO ฟรี!",
          btnText: "ขอคำปรึกษาแผน SEO ฟรี",
          variant: "primary" as const
        };
      case "speed-performance":
        return {
          title: "อย่าปล่อยให้เว็บช้า ทำเงินหล่นหาย!",
          desc: "ตรวจเช็คความเร็วเว็บไซต์และรับคำแนะนำในการปรับปรุงฟรี กับผู้เชี่ยวชาญจาก KIMX Web",
          btnText: "อัปเกรดความเร็วเว็บไซต์",
          variant: "secondary" as const
        };
      case "web-design-2025":
        return {
          title: "อยากได้เว็บสวย ทันสมัย แบบนี้ไหม?",
          desc: "ให้ KIMX Web ช่วยรีโนเวทเว็บไซต์ของคุณให้ดูโปร ทันสมัย และชนะคู่แข่ง",
          btnText: "ออกแบบเว็บไซต์ใหม่",
          variant: "primary" as const
        };
      default:
        return {
          title: "มีโปรเจกต์ในใจ? ปรึกษาเราได้ฟรี!",
          desc: "ไม่ว่าจะเป็นเว็บไซต์ใหม่ ปรับปรุงเว็บเก่า หรือแค่อยากคุยไอเดีย เรายินดีให้คำปรึกษาฟรี ไม่มีค่าใช้จ่ายใดๆ",
          btnText: "ขอใบเสนอราคาฟรี",
          variant: "primary" as const
        };
    }
  };

  const content = getCtaContent();

  return (
    <section className="py-12 pb-24 bg-slate-950">
      <Container>
        <div className="max-w-3xl mx-auto">
          <GlassCard
            className="text-center border-white/[0.05] !p-8 sm:!p-12 relative overflow-hidden"
            hoverScale={false}
            hoverGlow={false}
            style={{
              boxShadow: `0 10px 40px -15px ${accentColor}25`
            }}
          >
            {/* Ambient background glow */}
            <div 
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none"
              style={{ backgroundColor: accentColor }}
            />

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {content.title}
            </h3>
            
            <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed mb-8 max-w-lg mx-auto">
              {content.desc}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-md mx-auto">
              {/* Primary action */}
              <CTAButton
                variant={content.variant}
                size="md"
                onClick={openModal}
                className="flex items-center justify-center gap-2"
                style={slug === "web-design-2025" ? { backgroundColor: accentColor, color: "white" } : {}}
              >
                <span>{content.btnText}</span>
              </CTAButton>

              {/* Chat on LINE action */}
              <CTAButton
                variant="line"
                size="md"
                href={siteConfig.lineUrl}
                external
                className="flex items-center justify-center gap-3"
              >
                <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-sm" />
                <span>แชทผ่าน LINE</span>
              </CTAButton>
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
