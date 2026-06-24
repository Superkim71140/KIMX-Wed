"use client";

import React, { useEffect, useState } from "react";

interface HeadingItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    // Use IntersectionObserver to highlight the active section
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find all intersecting entries
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
      
      if (intersectingEntries.length > 0) {
        // If there are multiple, sort by intersection ratio or Y position to pick the best
        // Simply picking the first intersecting one or the one closest to top is usually enough
        setActiveId(intersectingEntries[0].target.id);
      }
    };

    const observerOptions = {
      root: null,
      // Create a margin that essentially considers the "active area" slightly below the navbar
      rootMargin: "-100px 0px -60% 0px",
      threshold: [0, 0.5, 1],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-32 p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hidden lg:block motion-editorial">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
        หัวข้อในบทความ
      </h3>
      <ul className="space-y-3">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`text-[15px] block transition-all duration-300 ${
                  isActive
                    ? "text-teal-600 font-semibold translate-x-2"
                    : "text-slate-500 hover:text-slate-800 hover:translate-x-1"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
