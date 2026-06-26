"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { label: "ทั้งหมด", href: "/news" },
  { label: "ข่าว AI", href: "/news/ai" },
  { label: "โทรศัพท์", href: "/news/phone" },
  { label: "เกมส์", href: "/news/game" },
  { label: "Tech Update", href: "/news/tech" },
  { label: "ยานยนต์", href: "/news/automotive" },
  { label: "Cyber Security", href: "/news/cyber-security" },
  { label: "ธุรกิจดิจิทัล", href: "/news/digital-business" },
  { label: "How-to", href: "/news/how-to" }
];

export default function NewsCategoryBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    handleScroll(); // Initialize scroll status on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll active element into view on mount or path change
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const activeEl = container.querySelector(".active-news-tab");
    if (activeEl) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      
      const scrollLeft = 
        activeRect.left - containerRect.left - (containerRect.width / 2) + (activeRect.width / 2);
      
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      container.scrollBy({
        left: scrollLeft,
        behavior: prefersReduced ? "auto" : "smooth"
      });
    }
  }, [pathname]);

  // Only display on paths starting with /news
  const isNewsPath = pathname === "/news" || pathname.startsWith("/news/");
  if (!isNewsPath) return null;

  return (
    <div
      className={`fixed left-0 w-full z-40 transition-[top,background-color,box-shadow] duration-300 border-b border-transparent ${
        scrolled
          ? "top-[72px] sm:top-[88px] bg-white/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
          : "top-[72px] sm:top-[88px] bg-[#F5F5F7]/40 backdrop-blur-md"
      }`}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Left fade overlay on mobile */}
        <div className={`absolute left-4 top-0 bottom-0 w-8 bg-gradient-to-r ${scrolled ? 'from-white via-white/50' : 'from-[#F5F5F7] via-[#F5F5F7]/50'} to-transparent pointer-events-none z-10 sm:hidden`} />
        
        {/* Right fade overlay on mobile */}
        <div className={`absolute right-4 top-0 bottom-0 w-8 bg-gradient-to-l ${scrolled ? 'from-white via-white/50' : 'from-[#F5F5F7] via-[#F5F5F7]/50'} to-transparent pointer-events-none z-10 sm:hidden`} />

        <nav
          ref={scrollContainerRef}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 sm:py-3 scrollbar-none scroll-smooth relative"
        >
          {categories.map((cat) => {
            // Check if active: exact match, or if not the root /news page, verify it starts with path prefix
            const isActive = 
              pathname === cat.href || 
              (cat.href !== "/news" && pathname.startsWith(cat.href + "/"));

            return (
              <Link
                key={cat.href}
                href={cat.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap ${
                  isActive
                    ? "active-news-tab bg-slate-900 text-white shadow-sm font-semibold px-4 py-1.5 rounded-full text-xs sm:text-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 px-4 py-1.5 rounded-full font-medium text-xs sm:text-sm transition-colors duration-300 ease-in-out"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
