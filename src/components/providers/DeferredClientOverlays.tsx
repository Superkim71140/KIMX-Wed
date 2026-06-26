"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useQuoteModal } from "@/context/QuoteModalContext";

import { scheduleIdleTask } from "@/lib/browser-scheduler";

// Dynamically import QuoteModal so it is split from the main entry bundle
const LazyQuoteModal = dynamic(() => import("../home/QuoteModal"), {
  loading: () => null,
});

export default function DeferredClientOverlays() {
  const { isOpen } = useQuoteModal();
  const [shouldRender, setShouldRender] = useState(false);

  // If the context state says open, render immediately
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  // Set up listeners to preload the modal chunk when a user hovers or focuses on a CTA
  useEffect(() => {
    let handlePreload: (e: MouseEvent | FocusEvent) => void;
    let isAttached = false;

    // Defer only non-user-critical work; preserve first viewport motion.
    const cancelIdle = scheduleIdleTask(() => {
      handlePreload = (e: MouseEvent | FocusEvent) => {
        if (shouldRender) return; // Already loading/loaded

        const target = e.target as HTMLElement;
        if (!target) return;

        const interactiveElement = target.closest("button, a");
        if (!interactiveElement) return;

        const text = (interactiveElement.textContent || "").trim();
        
        // Match keywords in Thai and English that relate to requesting quotes/consultation/contacts
        const isCta = /ขอใบเสนอราคา|ประเมินราคา|ขอรับใบเสนอราคา|ติดต่อเรา|รับคำปรึกษา|ขอคำปรึกษา|โทรเลย|แชทถาม|LINE|Request a Quote|Get a Consultation|Contact Us/i.test(text);

        if (isCta) {
          setShouldRender(true);
        }
      };

      window.addEventListener("mouseover", handlePreload, { passive: true });
      window.addEventListener("focusin", handlePreload, { passive: true });
      isAttached = true;
    });

    return () => {
      cancelIdle();
      if (isAttached && handlePreload) {
        window.removeEventListener("mouseover", handlePreload);
        window.removeEventListener("focusin", handlePreload);
      }
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return <LazyQuoteModal />;
}
