import React from "react";
import { Clock, User, Calendar, RefreshCcw, AlertCircle } from "lucide-react";
import { formatThaiDate } from "@/lib/utils";

interface ArticleTrustBarProps {
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  category: string;
  editorialStatus?: string; // e.g. "อยู่ระหว่างพิจารณา"
  theme?: "light" | "dark";
}

export default function ArticleTrustBar({
  author,
  publishedAt,
  updatedAt,
  readingTime,
  category,
  editorialStatus,
  theme = "light"
}: ArticleTrustBarProps) {
  const isDark = theme === "dark";
  
  return (
    <div className={`flex flex-wrap items-center gap-4 text-[13px] font-medium mb-6 pb-6 border-b font-sans ${isDark ? "text-slate-300 border-white/20" : "text-slate-500 border-slate-100"}`}>
      <div className="flex items-center gap-1.5">
        <User size={15} className={isDark ? "text-sky-400" : "text-slate-400"} />
        <span className={isDark ? "text-white" : "text-slate-700"}>{author}</span>
      </div>
      <div className={`hidden sm:block w-1 h-1 rounded-full ${isDark ? "bg-slate-500" : "bg-slate-300"}`} />
      <div className="flex items-center gap-1.5">
        <Calendar size={15} className={isDark ? "text-sky-400" : "text-slate-400"} />
        <span>{formatThaiDate(publishedAt)}</span>
      </div>
      {updatedAt !== publishedAt && (
        <>
          <div className={`hidden sm:block w-1 h-1 rounded-full ${isDark ? "bg-slate-500" : "bg-slate-300"}`} />
          <div className="flex items-center gap-1.5" title="ปรับปรุงล่าสุด">
            <RefreshCcw size={14} className={isDark ? "text-sky-400" : "text-slate-400"} />
            <span>{formatThaiDate(updatedAt)}</span>
          </div>
        </>
      )}
      <div className={`hidden sm:block w-1 h-1 rounded-full ${isDark ? "bg-slate-500" : "bg-slate-300"}`} />
      <div className="flex items-center gap-1.5">
        <Clock size={15} className={isDark ? "text-sky-400" : "text-slate-400"} />
        <span>{readingTime}</span>
      </div>
      
      {editorialStatus && (
        <>
          <div className={`hidden sm:block w-1 h-1 rounded-full ${isDark ? "bg-slate-500" : "bg-slate-300"}`} />
          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${isDark ? "text-amber-300 bg-amber-500/20 border-amber-400/30" : "text-amber-600 bg-amber-50 border-amber-200/60"}`}>
            <AlertCircle size={14} />
            <span className="font-semibold">{editorialStatus}</span>
          </div>
        </>
      )}
    </div>
  );
}
