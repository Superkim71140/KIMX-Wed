"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Article } from "@/data/articles";
import GlassCard from "../ui/GlassCard";
import SpotlightCard from "../ui/SpotlightCard";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <SpotlightCard className="h-full rounded-3xl" spotlightColor="rgba(20, 184, 166, 0.15)">
      <GlassCard className="flex flex-col h-full border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-md group !p-0 overflow-hidden hover:border-teal-500/30 hover:shadow-xl transition-all duration-500">
      {/* Thumbnail Image Wrapper */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        {/* Category Badge overlay (Absolute Glass Overlay) */}
        <div className="absolute top-4 left-4 z-10 backdrop-blur-md bg-slate-950/40 border border-white/10 rounded-full px-3 py-1">
          <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white">
            {article.category}
          </span>
        </div>

        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-1"
        />
        {/* Soft light vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        {/* Heading */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-4 mb-3 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2 leading-snug">
          {article.title}
        </h3>

        {/* Description summary */}
        <p className="text-xs sm:text-sm font-light text-slate-600 leading-relaxed line-clamp-3 mb-6">
          {article.description}
        </p>

        {/* Action button */}
        <Link
          href={`/articles/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-300 mt-auto group/link"
        >
          <span>อ่านบทความ</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </GlassCard>
    </SpotlightCard>
  );
}
