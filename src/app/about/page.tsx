import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Zap, TrendingUp, HeartHandshake } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import CTAButton from "@/components/ui/CTAButton";

export const metadata: Metadata = buildMetadata({
  title: "เกี่ยวกับ KIMX Web | ทีมรับทำเว็บไซต์และ SEO สำหรับธุรกิจไทย",
  description: "รู้จัก KIMX Web Agency ทีมออกแบบและพัฒนาเว็บไซต์ที่เน้นความเร็ว SEO ความปลอดภัย และการเติบโตของธุรกิจในสมุทรสาครและทั่วประเทศ",
  path: "/about",
});

export default function AboutPage() {
  const stats = [
    { value: "100+", label: "โปรเจกต์ที่ส่งมอบสำเร็จ" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "A+", label: "Performance Score" },
  ];

  const values = [
    {
      icon: <Zap className="w-8 h-8 text-primary-glow" />,
      title: "เร็วตั้งแต่โครงสร้างเว็บ",
      desc: "เราออกแบบเว็บไซต์ให้โหลดไว รองรับมือถือ และวางโครงสร้าง Core Web Vitals ตั้งแต่เริ่มต้น"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-secondary-glow" />,
      title: "SEO พร้อมเติบโต",
      desc: "ทุกหน้าถูกออกแบบให้ Google เข้าใจง่าย มีโครงสร้าง Heading, Metadata, Schema และ Content ที่เหมาะกับคำค้นธุรกิจ"
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-red-400" />,
      title: "ดูแลเหมือนพาร์ทเนอร์",
      desc: "ให้คำแนะนำตรงไปตรงมา วางระบบให้ต่อยอดได้จริง และดูแลหลังส่งมอบอย่างเป็นระบบ"
    }
  ];

  return (
    <div className="relative pt-32 pb-16 overflow-hidden bg-slate-950">
      {/* Background aurora glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary-glow/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-secondary-glow/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ===== HEADER ===== */}
      <section className="relative text-center py-12 md:py-20 border-b border-white/[0.03]">
        <Container>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 max-w-4xl mx-auto">
            เบื้องหลังความสำเร็จของคุณ คือภารกิจของเรา
          </h1>
          <p className="text-slate-300 font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            เราไม่ใช่แค่คนเขียนโค้ด แต่เราคือพาร์ทเนอร์ที่จะช่วยเปลี่ยนไอเดียทางธุรกิจ ให้กลายเป็นสินทรัพย์ดิจิทัลที่ทรงพลัง
          </p>
        </Container>
      </section>

      {/* ===== CONTENT SECTION ===== */}
      <section className="py-16 sm:py-24">
        <Container>
          {/* Back button */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 mb-12 group"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>กลับหน้ารวมบทความ</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-900 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="KIMX Web Agency Team Working on Project"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
            </div>

            {/* Right Story */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                จุดเริ่มต้นของ <span className="text-primary-glow italic">KIMX Web</span>
              </h2>

              <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
                ในยุคดิจิทัล 2025 การมีเว็บไซต์ไม่ใช่เรื่องยาก แต่การมีเว็บไซต์ที่{" "}
                <span className="text-primary-glow font-bold">&quot;ขายของได้จริง&quot;</span> และ{" "}
                <span className="text-secondary-glow font-bold">&quot;เติบโตยั่งยืน&quot;</span> กลับเป็นเรื่องท้าทาย
              </p>

              <p className="text-sm sm:text-base font-light text-slate-400 leading-relaxed">
                KIMX Web ก่อตั้งขึ้นด้วยความเชื่อที่ว่า เว็บไซต์ที่ดีต้องไม่ใช่แค่สวย แต่ต้อง{" "}
                <strong className="text-white font-semibold">เร็ว (Fast)</strong>,{" "}
                <strong className="text-white font-semibold">ปลอดภัย (Secure)</strong> และ{" "}
                <strong className="text-white font-semibold">ค้นหาเจอง่าย (SEO Friendly)</strong> เราจึงพัฒนาระบบการทำงานที่ผสานศาสตร์แห่งการออกแบบ (Design) เข้ากับวิศวกรรมซอฟต์แวร์ (Engineering) เพื่อส่งมอบผลงานที่เหนือกว่ามาตรฐานตลาดทั่วไป
              </p>

              <p className="text-sm sm:text-base font-light text-slate-400 leading-relaxed">
                เราเชี่ยวชาญในการดูแลธุรกิจตั้งแต่ระดับ SME ไปจนถึงองค์กรขนาดใหญ่ ในพื้นที่สมุทรสาคร มหาชัย กระทุ่มแบน บ้านแพ้ว และทั่วประเทศ ด้วยความใส่ใจและพร้อมสนับสนุนให้ธุรกิจท่านทะยานข้ามขีดจำกัดด้วยเทคโนโลยีแห่งอนาคต
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-12 border-y border-white/[0.03] bg-slate-900/20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <GlassCard
                key={index}
                className="text-center border-white/[0.04] !p-8 sm:!p-10"
                hoverScale={false}
                hoverGlow={true}
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-primary-glow mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-light text-slate-400">
                  {stat.label}
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== VALUES SECTION (FIXED AGENT WORK COPIES) ===== */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ทำไมต้องให้เราออกแบบและพัฒนาเว็บไซต์ให้คุณ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((val, index) => (
              <GlassCard
                key={index}
                className="text-center border-white/[0.04] flex flex-col items-center !p-8"
                hoverScale={true}
                hoverGlow={true}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center mb-6 shadow-inner">
                  {val.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-sm font-light text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== CTA BOTTOM ===== */}
      <section className="py-12 text-center relative">
        <Container>
          <GlassCard className="border-white/[0.04] max-w-3xl mx-auto !p-8 sm:!p-12" hoverScale={false} hoverGlow={false}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              พร้อมเริ่มต้นโปรเจกต์ของคุณหรือยัง?
            </h2>
            <p className="text-sm font-light text-slate-400 leading-relaxed mb-8 max-w-md mx-auto">
              ปรึกษาไอเดียเว็บไซต์ประเมินราคาฟรี ไม่มีข้อผูกมัดใดๆ เพื่อก้าวแรกสู่ความสำเร็จออนไลน์
            </p>
            <CTAButton variant="primary" size="lg" href="/#contact">
              ขอใบเสนอราคาฟรี
            </CTAButton>
          </GlassCard>
        </Container>
      </section>
    </div>
  );
}
