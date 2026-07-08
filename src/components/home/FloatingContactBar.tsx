"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, FileSpreadsheet, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";
import { useQuoteModal } from "@/context/QuoteModalContext";

export default function FloatingContactBar() {
  const { openModal } = useQuoteModal();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Robust scroll detection for mobile and desktop devices
    const checkScroll = () => {
      const scrollPos = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
      setShowScrollTop(scrollPos > 400);
    };

    checkScroll(); // run once on mount
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("touchmove", checkScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("touchmove", checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Primary: window.scrollTo — works in all modern browsers
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Fallback: documentElement for older Safari/WebKit routing
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    // Belt-and-suspenders: direct body fallback
    document.body.scrollTop = 0;
  };

  return (
    <>
      {/* Desktop Floating Actions Panel (macOS-style Vertical Glass Dock) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 p-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-full">
        {/* Scroll to Top Button — only visible after scrolling 400px */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <button
                onClick={scrollToTop}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 shadow-sm border border-slate-700/50 transition-all duration-300 hover:scale-110 hover:bg-slate-700 hover:text-white hover:shadow-lg"
                aria-label="เลื่อนขึ้นบนสุดของหน้า"
              >
                <ChevronUp size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Telephone Call Icon */}
        <a
          href={siteConfig.telephoneRaw}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 shadow-sm border border-slate-700/50 transition-all duration-300 hover:scale-110 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-blue-500/30 hover:shadow-lg"
          title="โทรติดต่อ"
        >
          <Phone size={18} />
        </a>

        {/* LINE Chat Icon */}
        <a
          href={siteConfig.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 shadow-sm border border-slate-700/50 transition-all duration-300 hover:scale-110 hover:bg-[#06C755] hover:border-[#06C755] hover:text-white hover:shadow-[#06C755]/30 hover:shadow-lg"
          title="คุยไลน์"
        >
          <Image 
            src="/line-ar21.svg" 
            alt="LINE" 
            width={36} 
            height={36} 
            className="w-8 h-8 object-contain shrink-0 drop-shadow-sm transition-all duration-300 group-hover:brightness-0 group-hover:invert" 
          />
        </a>

        {/* Quote Request Icon */}
        <button
          onClick={openModal}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 text-slate-300 shadow-sm border border-slate-700/50 transition-all duration-300 hover:scale-110 hover:bg-[#38bdf8] hover:text-[#020617] hover:border-[#38bdf8] hover:shadow-[#38bdf8]/30 hover:shadow-lg"
          title="ขอใบเสนอราคา"
        >
          <FileSpreadsheet size={18} />
        </button>
      </div>

      {/* Mobile Fixed Bottom Contact Dock with Framer Motion Entrance & Exit */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              mass: 1.1
            }}
            className="md:hidden fixed bottom-0 left-0 right-0 h-[calc(64px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-slate-950/85 backdrop-blur-lg border-t border-white/[0.08] grid grid-cols-3 z-[100] shadow-[0_-5px_25px_rgba(0,0,0,0.6)]"
          >
            {/* Call CTA */}
            <a
              href={siteConfig.telephoneRaw}
              className="flex flex-col items-center justify-center text-slate-300 hover:text-white transition-colors duration-200 border-r border-white/[0.04]"
            >
              <Phone size={18} className="text-blue-400 mb-1" />
              <span className="text-[10px] font-bold tracking-tight">โทรคุย</span>
            </a>

            {/* LINE CTA */}
            <a
              href={siteConfig.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center text-slate-300 hover:text-white transition-colors duration-200 border-r border-white/[0.04]"
            >
              <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-6.5 h-6.5 mb-1 object-contain shrink-0 drop-shadow-sm" />
              <span className="text-[10px] font-bold tracking-tight">คุยไลน์</span>
            </a>

            {/* Request Quote Modal CTA */}
            <button
              onClick={openModal}
              className="flex flex-col items-center justify-center text-slate-950 bg-primary-glow font-bold hover:bg-sky-400 transition-colors duration-200"
            >
              <FileSpreadsheet size={18} className="mb-1" />
              <span className="text-[10px] tracking-tight">ขอใบเสนอราคา</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
