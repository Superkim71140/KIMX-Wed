import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Article } from "@/data/articles";
import { getCanonicalArticlePath } from "@/lib/content-url";
import SpotlightCard from "../ui/SpotlightCard";

interface ArticleCardProps {
  article: Article;
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

export default function ArticleCard({ article }: ArticleCardProps) {
  const canonicalUrl = getCanonicalArticlePath(article);
  const displayDate = formatThaiDate(article.date || article.publishedAt);

  return (
    <SpotlightCard
      className="group flex h-full min-h-[500px] flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 shadow-md backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-xl"
      spotlightColor="rgba(20, 184, 166, 0.15)"
    >
      <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-t-2xl bg-slate-50 sm:h-56 md:h-[220px] lg:h-[210px]">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
          loading="lazy"
          className="object-contain transition-opacity duration-300 group-hover:opacity-95"
        />
      </div>

      <div className="flex grow flex-col p-5 pt-4 sm:p-6 sm:pt-4">
        <div className="mb-3">
          <div className="inline-block rounded-full border border-slate-800 bg-slate-900 px-2.5 py-0.5">
            <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white">
              {article.category}
            </span>
          </div>
        </div>

        <h3 className="mb-2 min-h-[3.5rem] font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-teal-600 sm:text-lg line-clamp-2">
          <Link
            href={canonicalUrl}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mb-5 min-h-[4.5rem] text-sm font-light leading-relaxed tracking-normal text-slate-600 line-clamp-3">
          {article.description}
        </p>

        <div className="mt-auto flex min-h-[2.5rem] items-center justify-between gap-3 border-t border-slate-100/80 pt-4">
          <div className="min-w-0 pr-2">
            {article.author && (
              <span
                className="block truncate text-[11px] font-medium text-slate-500"
                title={article.author}
              >
                {article.author}
              </span>
            )}

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              {displayDate && (
                <span className="shrink-0">{displayDate}</span>
              )}

              {displayDate && article.readingTime && (
                <span className="shrink-0">•</span>
              )}

              {article.readingTime && (
                <span className="truncate">{article.readingTime}</span>
              )}
            </div>
          </div>

          <Link
            href={canonicalUrl}
            className="group/link inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-teal-600 transition-colors duration-300 hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4"
          >
            <span>อ่านต่อ</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </SpotlightCard>
  );
}
