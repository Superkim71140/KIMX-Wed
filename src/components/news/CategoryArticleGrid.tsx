"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { NormalizedArticle } from "@/lib/articles/types";
import GlassCard from "@/components/ui/GlassCard";

interface CategoryArticleGridProps {
  articles: NormalizedArticle[];
  category: string;
}

const THAI_MONTHS = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

function formatThaiDate(dateValue?: string) {
  if (!dateValue) return "";

  const dateOnly = dateValue.includes("T")
    ? dateValue.split("T")[0]
    : dateValue;

  const [yearString, monthString, dayString] = dateOnly.split("-");

  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);

  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day) ||
    month < 1 ||
    month > 12
  ) {
    return dateOnly;
  }

  return `${day} ${THAI_MONTHS[month - 1]} ${year + 543}`;
}

const getSafeImageUrl = (art: NormalizedArticle | { coverImage?: string; image?: string }): string => {
  const rawPath = ('coverImage' in art ? art.coverImage : undefined) || ('image' in art ? art.image : undefined) || "/assets/images/logo%20kimxwed.png";
  if (!rawPath || typeof rawPath !== "string") return "/assets/images/logo%20kimxwed.png";
  // Safely intercept gradient strings that would crash next/image
  if (rawPath.includes("gradient")) return "/assets/images/logo%20kimxwed.png";
  // Safely encode URI to convert raw spaces to %20, preventing Next.js URL constructor crashes.
  return encodeURI(rawPath);
};

export default function CategoryArticleGrid({
  articles,
  category,
}: CategoryArticleGridProps) {
  const [filter, setFilter] = useState<"all" | "car" | "motorcycle">(
    "all"
  );

  const displayArticles = useMemo(() => {
    if (category === "automotive" && filter !== "all") {
      return articles.filter((article) => article.subCategory === filter);
    }

    return articles;
  }, [articles, category, filter]);

  return (
    <div className="w-full">
      {category === "automotive" && (
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-slate-200/60 bg-white/60 p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`relative rounded-full px-5 py-2 font-sans text-sm font-medium transition-colors duration-300 ${
                filter === "all"
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {filter === "all" && (
                <motion.div
                  layoutId="activeSubTab"
                  className="absolute inset-0 rounded-full bg-slate-900/5"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
              <span className="relative z-10">ทั้งหมด</span>
            </button>

            <button
              type="button"
              onClick={() => setFilter("car")}
              className={`relative rounded-full px-5 py-2 font-sans text-sm font-medium transition-colors duration-300 ${
                filter === "car"
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {filter === "car" && (
                <motion.div
                  layoutId="activeSubTab"
                  className="absolute inset-0 rounded-full bg-slate-900/5"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
              <span className="relative z-10">รถยนต์</span>
            </button>

            <button
              type="button"
              onClick={() => setFilter("motorcycle")}
              className={`relative rounded-full px-5 py-2 font-sans text-sm font-medium transition-colors duration-300 ${
                filter === "motorcycle"
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {filter === "motorcycle" && (
                <motion.div
                  layoutId="activeSubTab"
                  className="absolute inset-0 rounded-full bg-slate-900/5"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
              <span className="relative z-10">มอเตอร์ไซค์</span>
            </button>
          </div>
        </div>
      )}

      <motion.div
        layout
        className="grid min-h-[400px] auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {displayArticles.map((article) => {
            const publishedDate = formatThaiDate(article.publishedAt);

            return (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.6,
                }}
                className="h-full min-w-0"
              >
                <Link
                  href={`/news/${article.categorySlug}/${article.slug}`}
                  className="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4"
                >
                  <GlassCard
                    className="flex h-full min-w-0 min-h-[520px] flex-col overflow-hidden rounded-2xl border-none bg-white p-0 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                    hoverScale={false}
                    hoverGlow={false}
                  >
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-2xl bg-slate-50">
                      <Image
                        src={getSafeImageUrl(article)}
                        alt={article.title}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        loading="lazy"
                        className="object-contain object-center w-full h-full bg-slate-50/60 transition-opacity duration-300 group-hover:opacity-95"
                      />
                    </div>

                    <div className="flex min-w-0 grow flex-col p-5 sm:p-6">
                      <div className="mb-3 flex h-5 items-center gap-3 font-sans text-[10px] font-light text-slate-500 sm:text-xs">
                        <Calendar
                          size={12}
                          className="shrink-0 text-slate-400"
                        />
                        <span className="truncate">{publishedDate}</span>
                        <span aria-hidden="true">•</span>
                        <Clock
                          size={12}
                          className="shrink-0 text-slate-400"
                        />
                        <span className="truncate">{article.readingTime}</span>
                      </div>

                      <h3 className="mb-3 min-w-0 min-h-[3.5rem] break-words font-sans text-base font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-300 [overflow-wrap:anywhere] group-hover:text-sky-600 sm:text-lg line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="mb-6 min-w-0 min-h-[4.5rem] break-words font-sans text-xs font-light leading-relaxed text-slate-600 sm:text-sm line-clamp-3 [overflow-wrap:anywhere]">
                        {article.description}
                      </p>

                      <div className="mt-auto flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-sky-50 pt-4 font-sans text-xs text-slate-500">
                        <span
                          className="min-w-0 truncate flex-1"
                          title={`โดย ${article.author}`}
                        >
                          โดย {article.author}
                        </span>

                        <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-slate-800 transition-colors duration-300 group-hover:text-sky-600">
                          อ่านต่อ <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
