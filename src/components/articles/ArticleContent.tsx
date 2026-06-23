"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lightbulb, Sun, Moon, Sparkles } from "lucide-react";
import { Article } from "@/data/articles";
import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import BenchmarkBar from "./BenchmarkBar";

const TECH_KEYWORDS = [
  { term: "SEO", desc: "Search Engine Optimization: การปรับแต่งเว็บไซต์เพื่อให้ติดอันดับผลการค้นหาของ Google" },
  { term: "One UI 8.5", desc: "ระบบปฏิบัติการเวอร์ชันใหม่ที่มาพร้อมฟีเจอร์ AI อัจฉริยะ" },
  { term: "Schema Markup", desc: "โค้ดโครงสร้างข้อมูลที่ช่วยให้ Google เข้าใจบริบทบนเว็บไซต์ได้ดียิ่งขึ้น" }
];

const KeywordTooltip = ({ term, desc, children }: { term: string, desc: string, children: React.ReactNode }) => (
  <span className="relative inline-block group cursor-help z-20">
    <span className="relative inline-block font-semibold text-slate-800 border-b border-slate-300/60 border-dashed hover:border-sky-400 hover:text-sky-700 transition-colors duration-300">
      {children}
    </span>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none">
      <div className="glass-panel bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-xl p-3 text-left relative">
        <div className="text-[10px] font-bold tracking-widest text-sky-600 mb-1 uppercase">{term}</div>
        <div className="text-slate-600 text-xs font-sans font-medium leading-relaxed">{desc}</div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200/60 transform rotate-45" />
      </div>
    </div>
  </span>
);

interface ArticleContentProps {
  article: Article;
}

// Counter component for soft numerical count-up
function Counter({ from, to, prefix = "", suffix = "" }: { from: number; to: number; prefix?: string; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const springValue = useSpring(from, { damping: 20, stiffness: 40, mass: 1.5 });
  
  useEffect(() => {
    springValue.set(to);
  }, [springValue, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
}

const AnimatedStat = ({ value, label, accentColor }: { value: string; label: string; accentColor: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const match = value.match(/([+-]?\d+)(.*)/);
  const numValue = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const prefix = value.startsWith('-') || value.startsWith('+') ? value[0] : '';
  const displayNum = match ? Math.abs(numValue) : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-2xl p-6 bg-white border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-center flex flex-col justify-center items-center relative overflow-hidden group transition-shadow duration-500"
    >
      <div
        className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 transition-transform duration-500 group-hover:scale-105 font-sans"
        style={{ color: accentColor }}
      >
        {isInView ? (
          <Counter from={0} to={displayNum} prefix={prefix} suffix={suffix} />
        ) : (
          "0" + suffix
        )}
      </div>
      <div className="text-xs sm:text-sm font-medium text-slate-500 font-sans">
        {label}
      </div>
    </motion.div>
  );
};

export default function ArticleContent({ article }: ArticleContentProps) {
  const headings = article.content.filter((b) => b.type === "heading");
  const [activeId, setActiveId] = useState("");
  const [isEyeShieldOn, setIsEyeShieldOn] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => {
        const id = h.text!.replace(/\s+/g, '-').toLowerCase();
        return document.getElementById(id);
      });
      
      let currentActive = "";
      for (const el of headingElements) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          currentActive = el.id;
        }
      }
      
      if (currentActive) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const renderTextWithTooltips = (text: string) => {
    let result: React.ReactNode[] = [text];
    
    TECH_KEYWORDS.forEach(({ term, desc }) => {
      result = result.flatMap((part, idx) => {
        if (typeof part !== "string") return [part] as React.ReactNode[];
        const parts = part.split(new RegExp(`(${term})`, 'gi'));
        return parts.map((sub, i) => {
          if (sub.toLowerCase() === term.toLowerCase()) {
            return <KeywordTooltip key={`${idx}-${i}`} term={term} desc={desc}>{sub}</KeywordTooltip>;
          }
          return sub;
        }) as React.ReactNode[];
      });
    });
    return result;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 20 } }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ scaleX, backgroundColor: article.accentColor, boxShadow: `0 0 10px ${article.accentColor}` }}
      />
      <section 
        className={`py-12 relative transition-colors duration-[1500ms] ease-in-out font-sans ${isEyeShieldOn ? 'bg-[#FDFBF7]' : 'bg-transparent'}`}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 relative items-start">
            
            {/* LEFT COLUMN - MAIN EDITORIAL CANVAS (7 cols) */}
            <motion.div 
              className="lg:col-span-7 w-full max-w-3xl mx-auto lg:mx-0"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              
              {/* Eye-Shield Toggle */}
              <motion.div variants={itemVariants} className="flex justify-end mb-8 relative z-20">
                <button
                  onClick={() => setIsEyeShieldOn(!isEyeShieldOn)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-500 border ${isEyeShieldOn ? 'bg-amber-100/50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                >
                  {isEyeShieldOn ? <Sun size={14} className="text-amber-500" /> : <Moon size={14} className="text-slate-400" />}
                  <span>{isEyeShieldOn ? 'Eye-Shield On' : 'Eye-Shield Off'}</span>
                </button>
              </motion.div>

              {/* Takeaways / AI Summary Component */}
              <motion.div variants={itemVariants} className="mb-10 font-sans">
                <div className="bg-white/80 border border-slate-200/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.02)] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-sky-400 to-indigo-500" />
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Sparkles size={14} className="text-sky-500" />
                    สรุปประเด็นสำคัญ (Takeaways)
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                      <span className="text-sky-500 font-bold shrink-0">•</span>
                      เนื้อหานี้อธิบายวิธีการใช้กลยุทธ์และการตั้งค่าต่างๆ ให้เกิดประโยชน์สูงสุดกับธุรกิจ
                    </li>
                    <li className="flex gap-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                      <span className="text-sky-500 font-bold shrink-0">•</span>
                      รวมไปถึงทิปส์ลับที่นักพัฒนามักใช้เพื่อเร่งประสิทธิภาพและการเติบโตอย่างยั่งยืน
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Main Content Nodes */}
              <div className={`space-y-8 font-normal text-base sm:text-lg leading-relaxed relative z-10 transition-colors duration-1000 ${isEyeShieldOn ? 'text-slate-700' : 'text-slate-600'}`}>
                {article.content.map((block, index) => {
                  switch (block.type) {
                    case "paragraph":
                      return (
                        <motion.p
                          variants={itemVariants}
                          key={index}
                          className="text-base md:text-[1.05rem] text-slate-600/90 font-normal leading-relaxed mb-6 antialiased max-w-3xl mx-auto px-4 md:px-0"
                        >
                          {block.text.split(/<strong>(.*?)<\/strong>/g).map((part, i) => {
                            const isBold = i % 2 === 1;
                            if (isBold) {
                              return <strong key={i} className="font-extrabold text-slate-900">{part}</strong>;
                            }
                            return part.split(/<em>(.*?)<\/em>/g).map((subpart, j) => {
                              const isItalic = j % 2 === 1;
                              if (isItalic) {
                                return <em key={j} className="italic text-sky-700 font-semibold">{subpart}</em>;
                              }
                              return renderTextWithTooltips(subpart);
                            });
                          })}
                        </motion.p>
                      );

                    case "heading":
                      const id = block.text!.replace(/\s+/g, '-').toLowerCase();
                      return (
                        <motion.h2
                          variants={itemVariants}
                          key={index}
                          id={id}
                          className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mt-10 mb-4 max-w-3xl mx-auto px-4 md:px-0 flex items-center gap-2 font-sans"
                        >
                          {block.text}
                        </motion.h2>
                      );

                    case "highlight":
                      return (
                        <motion.div variants={itemVariants} key={index}>
                          <GlassCard
                            className={`bg-white/80! backdrop-blur-md p-6! sm:p-8! my-8 border-y-transparent! border-r-transparent! border-l-4! rounded-2xl! shadow-[0_8px_30px_rgba(0,0,0,0.04)]`}
                            style={{ borderLeftColor: article.accentColor }}
                            hoverScale={false}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5" style={{ color: article.accentColor }}>
                                <Lightbulb className="w-5 h-5" />
                              </div>
                              <div>
                                {block.title && (
                                  <h4 className="text-slate-900 font-bold text-base sm:text-lg mb-2">
                                    {block.title}
                                  </h4>
                                )}
                                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                  {block.text}
                                </p>
                              </div>
                            </div>
                          </GlassCard>
                        </motion.div>
                      );

                    case "quote":
                      return (
                        <motion.blockquote
                          variants={itemVariants}
                          key={index}
                          className="border-l-4 border-slate-200 pl-6 my-10 py-2 italic text-slate-800 text-lg sm:text-xl font-medium leading-relaxed max-w-xl mx-auto"
                        >
                          &ldquo;{block.text}&rdquo;
                          {block.author && (
                            <cite className="block text-sm text-slate-500 font-semibold not-italic mt-3">
                              &mdash; {block.author}
                            </cite>
                          )}
                        </motion.blockquote>
                      );

                    case "stats":
                      return (
                        <motion.div variants={itemVariants} key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
                          {block.items.map((stat, sIdx) => (
                            <AnimatedStat key={sIdx} value={stat.value} label={stat.label} accentColor={article.accentColor} />
                          ))}
                        </motion.div>
                      );

                    case "benchmark":
                      return (
                        <motion.div variants={itemVariants} key={index}>
                          <GlassCard
                            className="my-12 p-6! sm:p-8! rounded-3xl bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-200/60"
                            hoverScale={false}
                          >
                            <div className="mb-6 flex items-center gap-2">
                              <div className="w-2 h-6 rounded-full" style={{ backgroundColor: article.accentColor }} />
                              <h4 className="text-lg font-bold text-slate-900 tracking-tight font-sans">
                                Performance Benchmark
                              </h4>
                            </div>
                            <div className="flex flex-col gap-2">
                              {block.items.map((item, bIdx) => (
                                <BenchmarkBar
                                  key={bIdx}
                                  label={item.label}
                                  score={item.score}
                                  maxScore={item.maxScore}
                                  color={item.color}
                                  accentColor={article.accentColor}
                                />
                              ))}
                            </div>
                          </GlassCard>
                        </motion.div>
                      );

                    default:
                      return null;
                  }
                })}
              </div>
            </motion.div>

            {/* RIGHT COLUMN - SIDEBAR (3 cols) */}
            {headings.length > 0 && (
              <motion.div 
                className="hidden lg:block lg:col-span-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="sticky top-32 bg-white/80 border border-slate-200/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.02)] rounded-2xl p-6 sm:p-8 font-sans">
                  <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: article.accentColor }} />
                    สารบัญเนื้อหา
                  </h3>
                  <ul className="space-y-3">
                    {headings.map((h, i) => {
                      const id = h.text!.replace(/\s+/g, '-').toLowerCase();
                      const isActive = activeId === id;
                      return (
                        <li key={i}>
                          <button
                            onClick={() => scrollToId(id)}
                            className={`text-sm text-left transition-all duration-300 hover:text-slate-900 ${isActive ? 'font-bold' : 'font-medium text-slate-500'}`}
                            style={{ color: isActive ? article.accentColor : undefined }}
                          >
                            {h.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            )}
            
          </div>
        </Container>
      </section>
    </>
  );
}
