"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);

  useEffect(() => {
    // Instantiate Lenis with autoRaf disabled to control the animation loop manually
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for buttery smoothness
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: false, // Turn off auto RAF to run manual lifecycle management
    });

    lenisRef.current = lenis;

    // Manual RAF loop that handles scrolling updates
    function startRafLoop() {
      if (isRunningRef.current) return;
      isRunningRef.current = true;

      function raf(time: number) {
        if (!isRunningRef.current) return;
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }

      rafIdRef.current = requestAnimationFrame(raf);
    }

    function stopRafLoop() {
      if (!isRunningRef.current) return;
      isRunningRef.current = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    }

    // Visibility change handler:
    // When the tab becomes invisible (document.hidden === true), we cancel the RAF loop
    // to save CPU/GPU resources. When visible again, we resume it.
    // This optimization preserves buttery scrolling while avoiding unnecessary background-tab animation work.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRafLoop();
      } else {
        startRafLoop();
      }
    };

    // Start initial RAF loop since the page is visible on load
    if (!document.hidden) {
      startRafLoop();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up all resources during unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopRafLoop();
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}

