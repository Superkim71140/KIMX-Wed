"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { NormalizedArticle } from "@/lib/articles/types";
import { getArticleRegistry } from "@/lib/articles/registry";
import Container from "@/components/ui/Container";

interface RelatedArticlesProps {
  currentArticle: NormalizedArticle;
}

const getSafeRelatedImageUrl = (art: any): string => {
  // Check all potential image data keys securely
  const rawPath = art.coverImage || art.image || "/assets/images/logo%20kimxwed.png";
  
  if (!rawPath || typeof rawPath !== "string") {
    return "/assets/images/logo%20kimxwed.png";
  }
  
  const trimmedPath = rawPath.trim();
  
  // Safeguard: Ensure local assets have a proper leading slash if they are missing one
  if (!trimmedPath.startsWith("/") && !trimmedPath.startsWith("http://") && !trimmedPath.startsWith("https://")) {
    return encodeURI("/" + trimmedPath);
  }
  
  return encodeURI(trimmedPath);
};

export default function RelatedArticles({ currentArticle }: RelatedArticlesProps) {
  const allArticles = getArticleRegistry();

  const relatedArticles = useMemo(() => {
    const filtered = allArticles.filter((art) => art.slug !== currentArticle.slug);
    
    const scoredArticles = filtered.map((art) => {
      let score = 0;
      
      // Tier 1 (+5 Points): Subcategory match
      if (currentArticle.subCategory && art.subCategory === currentArticle.subCategory) {
        score += 5;
      }
      
      // Tier 2 (+3 Points Each): Overlapping tags
      if (currentArticle.tags && art.tags) {
        const matchingTags = art.tags.filter(tag => currentArticle.tags!.includes(tag));
        score += matchingTags.length * 3;
      }
      
      // Tier 3 (+2 Points): Category match
      if (currentArticle.categorySlug && art.categorySlug === currentArticle.categorySlug) {
        score += 2;
      }
      
      return { article: art, score };
    });
    
    // Sort by score (descending), then fallback to publishedAt (newest first)
    scoredArticles.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Tied scores: append freshest historical articles by publishedAt
      const dateA = new Date(a.article.publishedAt).getTime();
      const dateB = new Date(b.article.publishedAt).getTime();
      return dateB - dateA;
    });
    
    return scoredArticles.slice(0, 3).map((item) => item.article);
  }, [allArticles, currentArticle]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 30, damping: 22 }}
      className="border-t border-slate-100 pt-16 mt-16 font-sans"
    >
      <Container className="max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-8">
          บทความที่เกี่ยวข้อง
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedArticles.map((article) => (
            <Link className="group block" href={`/news/${article.categorySlug}/${article.slug}`} key={article.slug}>
              <div className="flex flex-col h-full space-y-4">
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-slate-50/50 border border-slate-100">
                  <Image
                    alt={article.title}
                    className="object-contain w-full h-full bg-slate-50/50 transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={getSafeRelatedImageUrl(article)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                    {article.subCategory === "car" ? "ข่าวรถยนต์" : article.subCategory === "motorcycle" ? "ข่าวในวงการรถยนต์" : article.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-teal-600 line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
