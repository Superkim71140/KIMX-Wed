import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Article } from "@/data/articles";
import { getCanonicalArticlePath } from "@/lib/content-url";
import SpotlightCard from "../ui/SpotlightCard";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const canonicalUrl = getCanonicalArticlePath(article);

  // Helper to format dates cleanly without client/server hydration mismatches
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const baseDate = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
    const parts = baseDate.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const months = [
        "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
      ];
      const monthIndex = parseInt(month, 10) - 1;
      const thaiYear = parseInt(year, 10) + 543;
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${parseInt(day, 10)} ${months[monthIndex]} ${thaiYear}`;
      }
    }
    return baseDate;
  };

  const displayDate = formatDate(article.date || article.publishedAt);

  return (
    <SpotlightCard
      className="flex flex-col h-full border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-md group overflow-hidden rounded-2xl hover:border-teal-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out"
      spotlightColor="rgba(20, 184, 166, 0.15)"
    >
      {/* Thumbnail Image Wrapper */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        {/* Soft light vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/10 to-transparent" />
      </div>

      {/* Dedicated Lower Content Padding Block */}
      <div className="p-5 sm:p-6 pt-4 sm:pt-4 flex flex-col grow">
        {/* Category Badge */}
        <div className="mb-3">
          <div className="inline-block bg-slate-900 border border-slate-800 rounded-full px-2.5 py-0.5">
            <span className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white">
              {article.category}
            </span>
          </div>
        </div>

        {/* Heading */}
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 mt-2 mb-2 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2 leading-snug">
          <Link href={canonicalUrl}>
            {article.title}
          </Link>
        </h3>

        {/* Description summary */}
        <p className="text-sm font-light text-slate-600 leading-relaxed tracking-normal line-clamp-3 mb-5">
          {article.description}
        </p>

        {/* Metadata Footer Strip & Action Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100/80">
          <div className="flex flex-col gap-0.5 min-w-0 pr-2">
            {article.author && (
              <span className="text-[11px] font-medium text-slate-500 truncate">
                {article.author}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              {displayDate && <span className="shrink-0">{displayDate}</span>}
              {displayDate && article.readingTime && <span className="shrink-0">•</span>}
              {article.readingTime && <span className="shrink-0">{article.readingTime}</span>}
            </div>
          </div>

          <Link
            href={canonicalUrl}
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors duration-300 group/link shrink-0"
          >
            <span>อ่านต่อ</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </SpotlightCard>
  );
}

