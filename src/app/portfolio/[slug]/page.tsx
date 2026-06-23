import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2, MessageSquare, ArrowLeft, Calendar, Layers, Briefcase, Code2, Wrench, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { portfolioItems } from "@/data/portfolio";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import CTAButton from "@/components/ui/CTAButton";
import GlassCard from "@/components/ui/GlassCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate Static Params for build pre-rendering
export async function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.slug,
  }));
}

// Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) {
    return {
      title: "ไม่พบผลงาน - KIMX Web",
    };
  }

  return buildMetadata({
    title: `${item.title} | Portfolio Case Study - KIMX Web`,
    description: item.description,
    path: `/portfolio/${item.slug}`,
  });
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      {/* Detail Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 bg-bg-base border-b border-white/[0.03]">
        {/* Background grids and glows */}
        <div className="absolute inset-0 section-bg-grid opacity-75 z-0" />
        <div className="noise-overlay" />
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-blue-glow/5 rounded-full blur-[130px] pointer-events-none`} />

        <Container className="relative z-10 max-w-4xl mx-auto py-8">
          
          {/* Back button */}
          <div className="mb-6 flex justify-start">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              <span>กลับหน้าผลงานทั้งหมด</span>
            </Link>
          </div>

          <div className="space-y-6 text-left">
            <div className="inline-block">
              <Badge>
                <Sparkles className="w-4 h-4 text-blue-glow animate-pulse" />
                <span>CASE STUDY: {item.category}</span>
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {item.title}
            </h1>

            <p className="text-sm sm:text-base text-text-muted font-light leading-relaxed max-w-3xl">
              {item.description}
            </p>

            {/* Grid of stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/5 text-xs sm:text-sm">
              <div className="space-y-1">
                <div className="text-slate-500 flex items-center gap-1"><Layers size={14} /><span>ผู้ว่าจ้าง</span></div>
                <div className="font-semibold text-white">{item.clientName || "SME Client"}</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-500 flex items-center gap-1"><Briefcase size={14} /><span>กลุ่มธุรกิจ</span></div>
                <div className="font-semibold text-white">{item.industry || "General Industry"}</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-500 flex items-center gap-1"><Calendar size={14} /><span>ปีส่งมอบ</span></div>
                <div className="font-semibold text-white">{item.year || "2025"}</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-500 flex items-center gap-1"><Code2 size={14} /><span>สถาปัตยกรรม</span></div>
                <div className="font-semibold text-white">Next.js + Custom Code</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Showcase Image Display */}
      <section className="relative py-12 bg-slate-950/40">
        <Container className="max-w-4xl mx-auto">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl flex items-center justify-center p-2 group">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
              priority
            />
          </div>
        </Container>
      </section>

      {/* Project details and Tech Stack */}
      <section className="relative py-16 bg-slate-950 overflow-hidden">
        <Container className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Challenge and details */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  จุดประสงค์และขอบเขตงาน
                </h2>
                <p className="text-sm font-light text-slate-300 leading-relaxed">
                  ทาง KIMX Web ได้เข้ามาช่วยเหลือลูกค้าปรับแต่งกระบวนการและทิศทางบนโลกออนไลน์ โดยเน้นวางโครงสร้างความเร็ว ปลดล็อกความเร็วหน้าเว็บให้เป็นมิตรต่อผู้ใช้งาน และออกแบบ UX/UI ที่เป็นระเบียบ เรียบร้อยเพื่อปิดยอดขายง่ายขึ้น
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench size={14} className="text-blue-glow" />
                  <span>บริการที่ให้บริการในโครงการนี้:</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.services?.map((serv, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-slate-300 bg-white/5 py-1.5 px-3.5 rounded-lg border border-white/5"
                    >
                      {serv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical specifications and features */}
            <div className="md:col-span-5 bg-white/[0.01] border border-white/5 rounded-2xl p-6 space-y-6">
              <h3 className="text-base font-bold text-white border-b border-white/5 pb-3">
                ฟังก์ชันหลักของระบบ
              </h3>
              
              <ul className="space-y-3">
                {item.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-light text-slate-300">
                    <CheckCircle2 size={16} className="text-primary-glow flex-shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2.5 pt-4 border-t border-white/5">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Code2 size={12} />
                  <span>Technology Stack:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.techStack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-primary-glow bg-primary-glow/5 py-1 px-2.5 rounded-lg border border-primary-glow/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Detail Case study CTA */}
      <section className="relative py-20 bg-slate-950 overflow-hidden border-t border-white/[0.02]">
        <Container className="max-w-4xl mx-auto">
          <GlassCard
            className="premium-border-pan p-8! sm:p-10! text-center bg-slate-900/60"
            hoverScale={false}
            hoverGlow={true}
          >
            <div className="max-w-xl mx-auto space-y-5">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                ต้องการออกแบบเว็บไซต์แบบโครงการนี้?
              </h3>
              <p className="text-xs sm:text-sm font-light text-slate-300 leading-relaxed">
                บรีฟรายละเอียดโครงการของคุณเพื่อให้ทีมงานช่วยคำนวณสเป็กและวางแผนงบประมาณที่เหมาะสมด่วน
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <CTAButton
                  href={siteConfig.lineUrl}
                  external={true}
                  variant="line"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3"
                >
                  <MessageSquare size={16} />
                  <span>พูดคุยกับทีมบรีฟทาง LINE</span>
                </CTAButton>
                <CTAButton
                  href="/#contact"
                  variant="primary"
                  className="w-full sm:w-auto px-8 py-3"
                >
                  <span>ขอใบเสนอราคาโครงการ</span>
                </CTAButton>
              </div>
            </div>
          </GlassCard>
        </Container>
      </section>
    </>
  );
}
