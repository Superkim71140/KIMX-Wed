"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { NormalizedArticle } from "@/lib/articles/types";
import GlassCard from "@/components/ui/GlassCard";
import { getCategoryColorStyles, renderArticleCover } from "@/lib/news-presentation";

interface CategoryArticleGridProps {
  articles: NormalizedArticle[];
  category: string;
}

export default function CategoryArticleGrid({ articles, category }: CategoryArticleGridProps) {
  const [filter, setFilter] = useState<"all" | "car" | "motorcycle">("all");

  const displayArticles = category === "automotive" && filter !== "all"
    ? articles.filter(a => a.subCategory === filter)
    : articles;

  return (
    <div className="w-full">
      {/* Sub-tab Filter for Automotive */}
      {category === "automotive" && (
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1.5 bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <button
              onClick={() => setFilter("all")}
              className={`relative px-5 py-2 text-sm font-medium font-sans rounded-full transition-colors duration-300 ${
                filter === "all" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {filter === "all" && (
                <motion.div layoutId="activeSubTab" className="absolute inset-0 bg-slate-900/5 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10">ทั้งหมด</span>
            </button>
            <button
              onClick={() => setFilter("car")}
              className={`relative px-5 py-2 text-sm font-medium font-sans rounded-full transition-colors duration-300 ${
                filter === "car" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {filter === "car" && (
                <motion.div layoutId="activeSubTab" className="absolute inset-0 bg-slate-900/5 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10">รถยนต์</span>
            </button>
            <button
              onClick={() => setFilter("motorcycle")}
              className={`relative px-5 py-2 text-sm font-medium font-sans rounded-full transition-colors duration-300 ${
                filter === "motorcycle" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {filter === "motorcycle" && (
                <motion.div layoutId="activeSubTab" className="absolute inset-0 bg-slate-900/5 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10">มอเตอร์ไซค์</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid with Smooth Framer Motion transitions to prevent CLS */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {displayArticles.map((article) => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="h-full"
            >
              <Link
                href={`/news/${article.categorySlug}/${article.slug}`}
                className="group block h-full"
              >
                <GlassCard
                  className="flex flex-col h-full p-0! bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-2xl border-none transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                  hoverScale={false}
                  hoverGlow={false}
                >
                  <div className={`relative w-full aspect-16/10 overflow-hidden rounded-t-2xl transition-all duration-700 ease-in-out ${
                    article.coverFit === 'contain' ? 'bg-slate-950 border-b border-sky-100/50' : 'bg-slate-50'
                  }`}>
                    {renderArticleCover(article.coverImage, article.title, article.category, article.coverFit)}
                    <div className="absolute top-3.5 left-3.5 z-20">
                      <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md border backdrop-blur-md ${getCategoryColorStyles(article.categorySlug)}`}>
                        {article.subCategory === "motorcycle" ? "Motorcycle" : article.subCategory === "car" ? "Car" : article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-[10px] sm:text-xs font-light text-slate-500 font-sans mb-3">
                      <Calendar size={12} className="text-slate-400" />
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <Clock size={12} className="text-slate-400" />
                      <span>{article.readingTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-sky-600 transition-colors duration-300 line-clamp-2 mb-3 font-sans">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-light text-slate-600 leading-relaxed line-clamp-3 mb-6 font-sans">
                      {article.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-sky-50 flex items-center justify-between text-xs text-slate-500 font-sans">
                      <span>โดย {article.author}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-800 group-hover:text-sky-600 transition-colors duration-300">
                        อ่านต่อ <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
