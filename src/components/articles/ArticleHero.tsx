"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, Calendar } from "lucide-react";
import { Article } from "@/data/articles";
import { formatThaiDate } from "@/lib/utils";
import Container from "../ui/Container";
import { motion } from "framer-motion";

interface ArticleHeroProps {
  article: Article;
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "MARKETING & SEO":
        return { text: "text-cyan-400", glow: "from-cyan-400/0 via-cyan-500/80 to-cyan-400/0" };
      case "WEB TECHNOLOGY & PERFORMANCE":
        return { text: "text-amber-400", glow: "from-amber-400/0 via-amber-500/80 to-amber-400/0" };
      case "DESIGN TRENDS 2025":
        return { text: "text-rose-400", glow: "from-rose-400/0 via-rose-500/80 to-rose-400/0" };
      default:
        return { text: "text-slate-400", glow: "from-slate-400/0 via-slate-500/80 to-slate-400/0" };
    }
  };

  return (
    <div className="relative pt-32 pb-12 overflow-hidden bg-transparent">
      <style>{`
        ::selection {
          background-color: ${article.accentColor}4D;
          color: #ffffff;
        }
      `}</style>
      
      {/* Visual dynamic gradient background based on accentColor (Breathing Bloom) */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${article.accentColor} 0%, transparent 70%)`
        }}
        animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-4 font-sans">
          <Link href="/" className="hover:text-sky-600 transition-colors duration-200">
            หน้าหลัก
          </Link>
          <span>&gt;</span>
          <Link href="/articles" className="hover:text-sky-600 transition-colors duration-200">
            บทความ
          </Link>
          <span>&gt;</span>
          <span className="text-slate-500 font-medium">{article.category}</span>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-bold text-teal-600 bg-teal-500/10 rounded-full">
            {article.category}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6 mt-2 max-w-4xl font-sans">
          {article.title}
        </h1>

        {/* Metadata Details Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 mb-6 pb-6 border-b border-slate-100 font-sans">
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-slate-300" />
            <span>KIMX Team</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-slate-300" />
            <span>{formatThaiDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-slate-300" />
            <span>{article.readingTime}</span>
          </div>
        </div>

        {/* Social CTA Button Row */}
        <div className="mb-8">
          <Link
            href="https://www.facebook.com/profile.php?id=61588114826420"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0674E8] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-700 hover:bg-[#045cb8] hover:shadow-md"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
            <span>FOLLOW KIMX ON FACEBOOK</span>
          </Link>
        </div>

        {/* Featured Image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-100/50 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.03)] mb-10 group">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </Container>
    </div>
  );
}
