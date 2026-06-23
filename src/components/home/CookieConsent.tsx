"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Cookie } from "lucide-react";
import CTAButton from "../ui/CTAButton";

/**
 * CookieConsent — hydration-safe banner with CSS transition-driven unmount.
 *
 * We use `hasHydrated` client state to prevent SSR mismatch.
 * Entrance transitions are triggered via double requestAnimationFrame.
 * Exit transitions are handled via `transitionend` events to clean up DOM mount.
 */
export default function CookieConsent() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  if (!hasHydrated || !shouldRender) return null;

  return (
    <div
      ref={bannerRef}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-[9999] transition-[opacity,transform] duration-700 ease-in-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95 pointer-events-none"
      }`}
    >
      <div className="relative rounded-3xl p-6 md:p-8 bg-slate-950/90 text-white backdrop-blur-xl border border-white/8 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-glow/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white/6 border border-white/8 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-primary-glow animate-pulse" />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-base font-bold text-white leading-snug">
                การตั้งค่าความเป็นส่วนตัว
              </h4>
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
                className="w-full sm:w-auto bg-transparent border-white/15 text-white hover:bg-white/8 hover:border-white hover:text-white"
              >
                คุกกี้ที่จำเป็นเท่านั้น
              </CTAButton>
              <CTAButton
                variant="primary"
                size="sm"
                onClick={() => dismiss("all")}
                className="w-full sm:w-auto"
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
