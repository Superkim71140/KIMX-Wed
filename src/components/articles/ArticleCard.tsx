import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Article } from "@/data/articles";
import { getCanonicalArticlePath } from "@/lib/content-url";
import GlassCard from "../ui/GlassCard";
import SpotlightCard from "../ui/SpotlightCard";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const canonicalUrl = getCanonicalArticlePath(article);

  return (
    <SpotlightCard className="h-full rounded-3xl overflow-hidden" spotlightColor="rgba(20, 184, 166, 0.15)">
      <GlassCard className="flex flex-col h-full border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-md group !p-0 overflow-hidden hover:border-teal-500/30 hover:shadow-xl transition-[box-shadow,border-color] duration-500">
      {/* Thumbnail Image Wrapper */}
      <div className={`relative w-full aspect-[16/10] overflow-hidden ${
        article.coverFit === "contain" ? "bg-slate-950 border-b border-sky-100/50" : "bg-slate-100"
      }`}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className={`w-full h-full ${
            article.coverFit === "contain"
              ? "object-contain p-4"
              : "object-cover"
          } transition-transform duration-700 ease-in-out group-hover:scale-105`}
        />
        {/* Soft light vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/10 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 sm:pt-4 flex flex-col grow">
        {/* Category Badge */}
        <div className="mb-3">
          <div className="inline-block bg-slate-900 border border-slate-800 rounded-full px-3 py-1">
            <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white">
              {article.category}
            </span>
          </div>
        </div>

        {/* Heading */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-4 mb-3 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2 leading-snug">
          <Link href={canonicalUrl}>
            {article.title}
          </Link>
        </h3>

        {/* Description summary */}
        <p className="text-xs sm:text-sm font-light text-slate-600 leading-relaxed line-clamp-3 mb-6">
          {article.description}
        </p>

        {/* Action button */}
        <Link
          href={canonicalUrl}
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
