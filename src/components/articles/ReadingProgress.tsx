"use client";

import React, { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        // Clamp between 0 and 100
        const rawProgress = (currentScrollY / scrollHeight) * 100;
        setProgress(Math.min(100, Math.max(0, rawProgress)));
      } else {
        setProgress(0);
      }
    };

    // Use passive listener for performance
    window.addEventListener("scroll", updateProgress, { passive: true });
    
    // Initial check
    updateProgress();
    
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none bg-transparent">
      <div 
        className="h-full bg-teal-500 origin-left transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
