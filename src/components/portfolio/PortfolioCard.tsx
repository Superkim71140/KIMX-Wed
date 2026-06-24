"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { PortfolioItem } from "@/data/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  onDetailClick?: () => void;
  onQuoteClick: () => void;
}

export default function PortfolioCard({
  item,
  onDetailClick,
  onQuoteClick,
}: PortfolioCardProps) {
  return (
    <article
      className="w-full shrink-0 group relative bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] portfolio-card-gpu overflow-hidden flex flex-col h-full"
    >
      {/* Stable layout container — no transforms here to avoid reflow during Swiper autoplay */}
      <div className="relative flex flex-col h-full z-10">
        
        {/* Browser Mockup Image Frame */}
        <div className="flex flex-col group/image border-b border-slate-200/60 bg-slate-50">
          
          {/* Browser Chrome Header Mockup */}
          <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center gap-2 select-none">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            </div>
          </div>

          {/* Image Area */}
          <div className="relative w-full aspect-4/3 overflow-hidden bg-slate-100">
            {/* Scale wrapper isolated here — only the image layer scales, layout boundary is stable */}
            <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" style={{ willChange: "transform", transform: "translateZ(0)" }}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                quality={90}
                className="object-cover object-top"
                loading="lazy"
              />

              {/* Badge Overlay (Floating Glass) */}
              {item.badge && (
                <div className="absolute bottom-4 left-4 px-4 py-1.5 bg-white/95 backdrop-blur-md border border-slate-200/40 rounded-full text-[11px] font-bold text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.06)] z-10 pointer-events-none tracking-wide">
                  {item.badge}
                </div>
              )}
            </div>{/* end scale wrapper */}
          </div>
        </div>

        {/* Portfolio Card Content */}
        <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2.5 tracking-tight font-sans">
              {item.title}
            </h3>
            <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
              {item.description}
            </p>

            <ul className="flex flex-col gap-3 py-5 border-t border-b border-slate-100/80 my-4">
              {item.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-800 font-bold leading-normal">
                  <div className="w-5 h-5 rounded-full bg-[#14b8a6]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-[#14b8a6] stroke-[3]" />
                  </div>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons: Exactly 2 Buttons */}
          <div className="mt-5 flex flex-col gap-3">
            {item.liveUrl ? (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block text-center py-3 rounded-xl bg-white text-slate-700 font-bold text-sm border border-slate-200 hover:bg-slate-50 btn-slow-smooth cursor-pointer"
              >
                เข้าชมเว็บไซต์จริง
              </a>
            ) : (
              <button
                onClick={onDetailClick}
                className="w-full py-3 rounded-xl bg-white text-slate-700 font-bold text-sm border border-slate-200 hover:bg-slate-50 btn-slow-smooth cursor-pointer"
              >
                ดูรายละเอียดผลงาน
              </button>
            )}
            
            <button
              onClick={onQuoteClick}
              className="w-full py-3 rounded-xl bg-[#14b8a6] hover:bg-[#0d9488] text-white font-extrabold text-sm shadow-sm hover:shadow-md btn-slow-smooth cursor-pointer"
            >
              ประเมินราคาแนวนี้
            </button>
          </div>
        </div>

      </div>
    </article>
  );
}
