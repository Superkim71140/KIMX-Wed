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
      <div className="relative rounded-2xl md:rounded-3xl p-5 md:p-6 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-700 ease-in-out">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-4 transition-all duration-700">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-xs transition-transform duration-700 hover:scale-105">
            <Cookie className="w-5 h-5 text-teal-500 animate-[pulse_3s_ease-in-out_infinite]" />
          </div>
          <div className="space-y-4 flex-1">
            <div>
              <h3 className="text-base md:text-lg font-extrabold text-slate-900 leading-snug tracking-tight">
                การตั้งค่าความเป็นส่วนตัว
              </h3>
              <p className="text-[11px] sm:text-xs font-medium text-slate-600 leading-relaxed mt-1">
                เราใช้คุกกี้เพื่อมอบประสบการณ์การใช้งานที่ราบรื่นยิ่งขึ้นและนำเสนอโฆษณาที่ตรงใจคุณ ท่านสามารถศึกษาเพิ่มเติมได้ที่{" "}
                <a
                  href="/about"
                  className="text-teal-600 underline hover:text-teal-700 transition-colors font-semibold"
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
                className="w-full sm:w-auto !bg-slate-100 !text-slate-700 hover:!bg-slate-200 border-transparent transition-all duration-700 ease-in-out"
              >
                คุกกี้ที่จำเป็นเท่านั้น
              </CTAButton>
              <CTAButton
                variant="primary"
                size="sm"
                onClick={() => dismiss("all")}
                className="w-full sm:w-auto !bg-teal-500 hover:!bg-teal-400 !text-white font-bold border-transparent transition-all duration-700 ease-in-out"
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
