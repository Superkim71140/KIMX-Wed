"use client";

import React, { useState, useTransition } from "react";
import { getExecutiveSummaryAction } from "@/app/actions/articles";

interface ExecutiveSummaryWidgetProps {
  articleId: string;
  title: string;
  contentText: string;
  initialSummary: string[];
}

export default function ExecutiveSummaryWidget({
  articleId,
  title,
  contentText,
  initialSummary,
}: ExecutiveSummaryWidgetProps) {
  const [summary, setSummary] = useState<string[]>(initialSummary);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleRefresh = () => {
    setError(null);
    startTransition(async () => {
      const res = await getExecutiveSummaryAction(articleId, title, contentText);
      if (res.success && res.summary) {
        setSummary(res.summary);
      } else {
        setError(res.error || "เกิดข้อผิดพลาดในการสรุปบทความ");
      }
    });
  };

  return (
    <div className="mb-10 font-sans">
      <div className="bg-white border border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
        {/* Mint-turquoise left accent border */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[#14B8A6]" />

        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
            สรุปประเด็นสำคัญ
          </h4>
          
          <button
            onClick={handleRefresh}
            disabled={isPending}
            className="text-xs font-semibold text-[#14B8A6] hover:text-[#0f8a7c] transition-colors duration-300 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer select-none"
            aria-label="สร้างสรุปใหม่ด้วย AI"
          >
            {isPending ? (
              <span className="w-3 h-3 border-2 border-[#14B8A6] border-t-transparent rounded-full animate-spin" />
            ) : null}
            <span>{isPending ? "กำลังอัปเดต..." : "อัปเดตสรุป"}</span>
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium mb-3 transition-opacity duration-700">
            {error}
          </p>
        )}

        {isPending ? (
          <div className="space-y-4 animate-pulse duration-700">
            <div className="h-4 bg-slate-100 rounded-sm w-11/12" />
            <div className="h-4 bg-slate-100 rounded-sm w-10/12" />
            <div className="h-4 bg-slate-100 rounded-sm w-full" />
          </div>
        ) : (
          <ul className="space-y-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {summary.map((line, i) => (
              <li
                key={i}
                className="flex gap-3 text-slate-900 text-sm sm:text-base leading-relaxed font-medium transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <span className="text-[#14B8A6] font-bold shrink-0">•</span>
                <span>{line.replace(/^•\s*/, "")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
