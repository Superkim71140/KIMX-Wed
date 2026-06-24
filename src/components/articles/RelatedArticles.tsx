import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NormalizedArticle } from "@/lib/articles/types";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import { getCategoryColorStyles, renderArticleCover } from "@/lib/news-presentation";

interface RelatedArticlesProps {
  relatedArticles: NormalizedArticle[];
}

export default function RelatedArticles({ relatedArticles }: RelatedArticlesProps) {
  if (!relatedArticles || relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 pb-24 border-t border-slate-100 bg-transparent">
      <Container className="max-w-6xl">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-10 border-b border-slate-200 pb-4 font-sans">
          บทความอื่น ๆ ที่น่าสนใจ
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {relatedArticles.map((relatedArt) => (
            <Link
              key={relatedArt.slug}
              href={`/news/${relatedArt.categorySlug}/${relatedArt.slug}`}
              className="group block h-full"
            >
              <GlassCard
                className="flex flex-col h-full p-0! bg-white border border-transparent shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                hoverScale={false}
                hoverGlow={true}
              >
                {/* Image container */}
                <div className="relative w-full aspect-16/10 overflow-hidden bg-slate-50">
                  {renderArticleCover(relatedArt.coverImage, relatedArt.title, relatedArt.category, relatedArt.coverFit)}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md border backdrop-blur-md ${getCategoryColorStyles(relatedArt.categorySlug)}`}>
                      {relatedArt.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-[10px] sm:text-xs font-light text-slate-500 font-sans mb-3">
                    <span>
                      {new Date(relatedArt.publishedAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span>{relatedArt.readingTime}</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#14B8A6] transition-colors duration-300 line-clamp-2 mb-2 font-sans">
                    {relatedArt.title}
                  </h4>

                  <p className="text-xs font-light text-slate-600 leading-relaxed line-clamp-2 mb-4 font-sans">
                    {relatedArt.description}
                  </p>

                  <div className="mt-auto pt-3 border-t border-sky-50 flex items-center justify-between text-xs text-slate-500 font-sans">
                    <span>โดย {relatedArt.author}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800 group-hover:text-[#14B8A6] transition-colors duration-300">
                      อ่านต่อ <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
