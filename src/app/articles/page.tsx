import React from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import Container from "@/components/ui/Container";
import FeaturedArticle from "@/components/articles/FeaturedArticle";
import ArticleCard from "@/components/articles/ArticleCard";
import GlassCard from "@/components/ui/GlassCard";
import CTAButton from "@/components/ui/CTAButton";
import StaggeredTextReveal from "@/components/ui/StaggeredTextReveal";
import Image from "next/image";

export const metadata: Metadata = buildMetadata({
  title: "บทความ SEO และ Web Design | คลังความรู้จาก KIMX Web",
  description: "รวมบทความเทคนิค SEO, Web Performance, Web Design และกลยุทธ์เว็บไซต์สำหรับธุรกิจที่ต้องการเติบโตบน Google",
  path: "/articles",
});

export const revalidate = 86400;

export default function ArticlesPage() {
  return (
    <div className="relative pt-32 pb-16 overflow-hidden bg-transparent">
      {/* Background Decorative Grids & Orbs */}
      <div className="absolute inset-0 kimx-soft-grid opacity-80 z-0 pointer-events-none" />
      <div className="noise-overlay" />
      
      {/* Premium Ambient Glow Orbs (Extremely slow and smooth) */}
      <div 
        className="section-orb w-[400px] h-[400px] bg-teal-500/10 top-[10%] left-[-10%] animate-[badge-beam-spin_15s_linear_infinite]" 
        style={{ filter: "blur(140px)" }}
      />
      <div 
        className="section-orb w-[500px] h-[500px] bg-sky-500/10 top-[40%] right-[-15%] animate-[badge-beam-spin_20s_linear_infinite_reverse]" 
        style={{ filter: "blur(160px)" }}
      />
      <div 
        className="section-orb w-[300px] h-[300px] bg-blue-500/10 bottom-[-5%] left-[20%] animate-[badge-float_8s_ease-in-out_infinite]" 
        style={{ filter: "blur(120px)" }}
      />

      {/* ===== HEADER ===== */}
      <header className="relative text-center pt-20 pb-28 z-0">
        <Container>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 max-w-4xl mx-auto relative z-10">
            <StaggeredTextReveal text="คลังความรู้ & อัปเดตเทคโนโลยี" />
          </h1>
          <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto relative z-10">
            เจาะลึกเบื้องหลังการทำเว็บไซต์ เทคนิค SEO และกลยุทธ์ดิจิทัลที่จะช่วยให้ธุรกิจของคุณเติบโตอย่างก้าวกระโดด
          </p>
        </Container>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="relative py-8 z-10 -mt-16">
        <Container className="space-y-16">
          {/* Featured Article (About us card) */}
          <div className="relative">
            <FeaturedArticle />
          </div>

          {/* Grid list of posts */}
          <div className="space-y-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4 relative z-10">
              บทความล่าสุด
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.map((art) => (
                <ArticleCard key={art.slug} article={art} />
              ))}
            </div>
          </div>
        </Container>
      </main>

      {/* ===== CTA: FREE CONSULTATION ===== */}
      <section className="py-12 mt-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <GlassCard className="text-center border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl !p-8 sm:!p-12 relative z-10" hoverScale={false} hoverGlow={false}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                มีโปรเจกต์ในใจ? ปรึกษาเราได้ฟรี!
              </h2>
              <p className="text-sm font-light text-slate-600 leading-relaxed mb-8 max-w-md mx-auto">
                ไม่ว่าจะเป็นเว็บไซต์ใหม่ ปรับปรุงเว็บเก่า หรือแค่อยากคุยไอเดีย เรายินดีให้คำปรึกษาฟรี ไม่มีค่าใช้จ่ายใดๆ
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-md mx-auto">
                  <CTAButton
                    variant="line"
                    size="md"
                    href={siteConfig.lineUrl}
                    external
                    className="w-full sm:w-auto"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Image 
                        src="/images/portfolio/line-ar21.svg" 
                        alt="LINE" 
                        width={24} 
                        height={24} 
                        className="object-contain shrink-0" 
                      />
                      <span>แชทผ่าน LINE</span>
                    </span>
                  </CTAButton>
                
                <div className="hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out rounded-full w-full sm:w-auto">
                  <CTAButton
                    variant="outline"
                    size="md"
                    href="/#services"
                    className="flex items-center justify-center gap-1 w-full"
                  >
                    <span>ดูบริการทั้งหมด</span>
                    <ArrowRight size={16} />
                  </CTAButton>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </section>
    </div>
  );
}
