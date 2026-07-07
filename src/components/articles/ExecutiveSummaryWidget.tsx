"use client";

import React, { useState, useTransition } from "react";
import { getExecutiveSummaryAction } from "@/app/actions/articles";
import GlassCard from "@/components/ui/GlassCard";

interface ExecutiveSummaryWidgetProps {
  articleId: string;
  title: string;
  slug?: string;
  contentText?: string;
  initialSummary?: string[];
}

export default function ExecutiveSummaryWidget({
  articleId,
  title,
  slug,
  initialSummary = [],
}: ExecutiveSummaryWidgetProps) {
  const [summary, setSummary] = useState<string[]>(initialSummary);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState<boolean>(initialSummary.length > 0);

  const handleGenerate = () => {
    setError(null);
    startTransition(async () => {
      const res = await getExecutiveSummaryAction(slug || articleId);
      if (res.success && res.summary) {
        setSummary(res.summary);
        setHasGenerated(true);
      } else {
        setError(res.error || "เกิดข้อผิดพลาดในการสรุปบทความด้วย AI");
      }
    });
  };

  // Determine if this article is a rumor or leak based on keywords in title
  const isRumor = /(ลือ|หลุด|ข่าวลือ|leak|rumor)/i.test(title);

  return (
    <div className="mb-10 font-sans">
      <GlassCard
        className="relative overflow-hidden p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        hoverScale={false}
      >
        {/* Mint-turquoise left accent border */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#14B8A6] shadow-[0_0_12px_rgba(20,184,166,0.5)]" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-75 ${isPending ? 'block' : 'hidden'}`}></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14B8A6]"></span>
            </span>
            <h4 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-widest bg-linear-to-r from-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent">
              KIMX AI Quick Brief
            </h4>
          </div>

          {hasGenerated && (
            <button
              onClick={handleGenerate}
              disabled={isPending}
              className="text-xs font-bold text-[#14B8A6] hover:text-[#0f8a7c] transition-colors duration-300 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer select-none"
              aria-label="สร้างสรุปใหม่ด้วย AI"
            >
              {isPending ? (
                <span className="w-3 h-3 border-2 border-[#14B8A6] border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              )}
              <span>{isPending ? "กำลังอัปเดต..." : "อัปเดตสรุป"}</span>
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-500 font-semibold mb-4 animate-fade-in">
            {error}
          </p>
        )}

        {!hasGenerated ? (
          // Initial Screen: Trigger Button
          <div className="py-4 flex flex-col items-center text-center animate-fade-in">
            <p className="text-sm sm:text-base text-slate-600 font-medium mb-5 max-w-lg leading-relaxed">
              อ่านสรุปประเด็นสำคัญของบทความนี้แบบกระชับ 3 ประเด็นอย่างรวดเร็วด้วยระบบปัญญาประดิษฐ์
            </p>
            <button
              onClick={handleGenerate}
              disabled={isPending}
              className="relative inline-flex items-center gap-2 bg-linear-to-r from-[#14B8A6] to-[#0EA5E9] hover:from-[#0f8a7c] hover:to-[#0284c7] text-white px-7 py-3 rounded-full text-sm font-bold shadow-[0_4px_16px_rgba(20,184,166,0.35)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,184,166,0.5)] active:scale-98 cursor-pointer select-none"
            >
              {isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>กำลังประมวลผลสรุป...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                  </svg>
                  <span>สรุปเนื้อหาด้วย AI Quick Brief</span>
                </>
              )}
            </button>
          </div>
        ) : isPending ? (
          // Loading Skeleton
          <div className="space-y-4 py-2 animate-pulse duration-700">
            <div className="h-4 bg-slate-200/60 rounded-md w-11/12" />
            <div className="h-4 bg-slate-200/60 rounded-md w-10/12" />
            <div className="h-4 bg-slate-200/60 rounded-md w-full" />
          </div>
        ) : (
          // Summary Bullets List
          <div className="space-y-4 py-2 animate-fade-in duration-500">
            <ul className="space-y-4">
              {summary.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-slate-900 text-sm sm:text-base leading-relaxed font-semibold transition-all duration-500 ease-in-out hover:translate-x-1"
                >
                  <span className="text-[#14B8A6] font-bold shrink-0 mt-0.5">•</span>
                  <span>{line.replace(/^•\s*/, "")}</span>
                </li>
              ))}
            </ul>

            {/* Premium Disclosures */}
            <div className="mt-6 pt-5 border-t border-slate-200/50 flex flex-col gap-3 font-sans">
              {/* AI Disclosure */}
              <p className="text-[11px] font-semibold text-slate-400">
                สรุปโดย AI Quick Brief ของ KIMX Tech อ้างอิงจากเนื้อหาในบทความนี้เท่านั้น
              </p>

              {/* Rumor warning disclosure if applicable */}
              {isRumor && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs flex gap-2.5 items-start shadow-[inner_0_2px_8px_rgba(245,158,11,0.02)]">
                  <span className="shrink-0 text-sm leading-none mt-0.5">⚠️</span>
                  <span className="font-semibold leading-relaxed">
                    คำชี้แจงข่าวลือ: บทความนี้มีเนื้อหาเกี่ยวกับข่าวลือหรือข้อมูลหลุดที่ยังไม่ได้รับการยืนยันอย่างเป็นทางการจากผู้ผลิต โปรดใช้วิจารณญาณในการอ่าน
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
