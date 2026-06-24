"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Cookie } from "lucide-react";
import CTAButton from "../ui/CTAButton";

/**
 * CookieConsent — hydration-safe banner with CSS transition-driven unmount and timeout fallback.
 *
 * We use `hasHydrated` client state to prevent SSR mismatch.
 * Entrance transitions are triggered via double requestAnimationFrame.
 * Exit transitions are handled via `transitionend` events to clean up DOM mount.
 * Exit fallback timers ensure unmounting even if transition events do not fire.
 */
export default function CookieConsent() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let frameId1: number;
    let frameId2: number;

    const timer = setTimeout(() => {
      setHasHydrated(true);

      const consent = localStorage.getItem("kimx-cookie-consent-v1");
      if (!consent) {
        setShouldRender(true);

        frameId1 = requestAnimationFrame(() => {
          frameId2 = requestAnimationFrame(() => {
            setIsVisible(true);
          });
        });
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      if (frameId1) cancelAnimationFrame(frameId1);
      if (frameId2) cancelAnimationFrame(frameId2);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  // Wire transitionend → unmount when the exit animation finishes
  useEffect(() => {
    const el = bannerRef.current;
    if (!el || isVisible || !shouldRender) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === "opacity") {
        setShouldRender(false);
      }
    };

    el.addEventListener("transitionend", handleTransitionEnd);
    return () => el.removeEventListener("transitionend", handleTransitionEnd);
  }, [isVisible, shouldRender]);

  const dismiss = useCallback((type: "all" | "necessary") => {
    localStorage.setItem("kimx-cookie-consent-v1", type);
    setIsVisible(false); // triggers CSS exit → transitionend → unmount

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setShouldRender(false);
      return;
    }

    // Exit animation fallback: force unmount if transitionend fails
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    exitTimeoutRef.current = setTimeout(() => {
      setShouldRender(false);
    }, 850);
  }, []);

  if (!hasHydrated || !shouldRender) return null;

  return (
    <div
      ref={bannerRef}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%_-_2rem)] max-w-md z-9999 transition-[opacity,transform] duration-700 ease-in-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95 pointer-events-none"
      }`}
    >
      <div className="relative rounded-4xl p-6 md:p-8 bg-slate-950/90 text-white backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-700 ease-in-out">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-glow/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-4 transition-all duration-700">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-white/20 flex items-center justify-center shrink-0 shadow-lg transition-transform duration-700 hover:scale-105">
            <Cookie className="w-6 h-6 text-teal-400 animate-[pulse_3s_ease-in-out_infinite]" />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-white leading-snug tracking-tight">
                การตั้งค่าความเป็นส่วนตัว
              </h3>
              <p className="text-xs sm:text-sm font-light text-slate-300 leading-relaxed mt-1.5">
                เราใช้คุกกี้เพื่อมอบประสบการณ์การใช้งานที่ราบรื่นยิ่งขึ้นและนำเสนอโฆษณาที่ตรงใจคุณ ท่านสามารถศึกษาเพิ่มเติมได้ที่{" "}
                <a
                  href="/about"
                  className="text-primary-glow underline hover:text-white transition-colors font-medium"
                >
                  นโยบายความเป็นส่วนตัว
                </a>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <CTAButton
                variant="outline"
                size="sm"
                onClick={() => dismiss("necessary")}
                className="w-full sm:w-auto !bg-slate-900 border-white/20 !text-slate-300 hover:!bg-slate-800 hover:border-white/40 hover:!text-white transition-all duration-700 ease-in-out"
              >
                คุกกี้ที่จำเป็นเท่านั้น
              </CTAButton>
              <CTAButton
                variant="primary"
                size="sm"
                onClick={() => dismiss("all")}
                className="w-full sm:w-auto !bg-teal-500 hover:!bg-teal-400 !text-slate-950 font-bold border-transparent !shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:!shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all duration-700 ease-in-out"
              >
                ยอมรับทั้งหมด
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
