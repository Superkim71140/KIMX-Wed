"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FeaturedArticle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <GlassCard className="!p-0 border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xl overflow-hidden hover:border-teal-500/30 hover:shadow-2xl transition-all duration-500" hoverScale={true} hoverGlow={true}>
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left image column */}
        <div ref={containerRef} className="relative lg:col-span-5 min-h-[250px] lg:min-h-full aspect-[16/10] lg:aspect-auto bg-slate-100 overflow-hidden">
          <motion.div style={{ y, width: "100%", height: "130%", top: "-15%", position: "absolute" }}>
            <Image
              src="/assets/images/kimxwed_11zon.webp"
              alt="ทำไมต้อง KIMX Web Agency"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        </div>

        {/* Right content column */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-md border text-primary-glow bg-primary-glow/10 border-primary-glow/20">
              ABOUT US
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-snug">
            ทำไมต้อง KIMX Web? คำตอบของธุรกิจยุคดิจิทัล 2025
          </h2>

          <p className="text-sm font-light text-slate-600 leading-relaxed mb-6 sm:mb-8">
            ในยุคที่ใครๆ ก็มีเว็บไซต์ได้ แต่ไม่ใช่ทุกเว็บที่จะ &quot;ขายของได้จริง&quot; ที่ KIMX Web เราไม่ได้แค่เขียนโค้ด แต่เราสร้าง &quot;สินทรัพย์ดิจิทัล&quot; ที่ออกแบบมาเพื่อปิดการขาย รองรับ SEO ตั้งแต่โครงสร้าง และมีความเร็วระดับ A+ เพื่อประสบการณ์การใช้งานที่ดีที่สุดของลูกค้าคุณ
          </p>

          <div>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-slate-900 text-white hover:bg-teal-500 hover:text-white transition-all duration-300 px-6 py-3 rounded-full shadow-lg"
            >
              <span>อ่านเรื่องราวของเรา</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
