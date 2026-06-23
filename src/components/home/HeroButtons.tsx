"use client";

import React from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function HeroButtons() {
  const { openModal } = useQuoteModal();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 z-20 relative">
      <a
        href={siteConfig.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto h-[52px] px-6 flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(6,199,85,0.25)] hover:shadow-[0_6px_25px_rgba(6,199,85,0.35)] hover:-translate-y-0.5"
      >
        <Image 
          src="/line-ar21.svg" 
          alt="LINE" 
          width={36} 
          height={36} 
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-sm" 
        />
        ปรึกษาโปรเจกต์ผ่าน LINE
      </a>
      
      <button
        onClick={openModal}
        className="w-full sm:w-auto h-[52px] px-6 flex items-center justify-center gap-2 bg-white text-slate-800 border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-500 hover:text-teal-600 font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5"
      >
        <FileText size={20} className="text-current" />
        ขอใบเสนอราคา ฟรี
      </button>
    </div>
  );
}

