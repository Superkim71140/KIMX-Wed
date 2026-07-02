"use client";
import React, { useEffect, useRef, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

interface AOSContextType {
  scheduleAOSRefresh: (mode: "soft" | "hard") => void;
}

const AOSContext = createContext<AOSContextType | undefined>(undefined);

export function useAOS() {
  const context = useContext(AOSContext);
  if (!context) {
    throw new Error("useAOS must be used within an AOSProvider");
  }
  return context;
}

/**
 * AOSProvider — lifecycle-safe AOS initialization for Next.js App Router.
 *
 * Strategy: double-requestAnimationFrame ensures AOS.init runs *after* the
 * browser has committed a paint frame. This avoids the race condition where
 * AOS calculates element offsets before React's SSR-hydrated DOM is laid out.
 */
export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const rafId1Ref = useRef<number | null>(null);
  const rafId2Ref = useRef<number | null>(null);
  const lastRefreshTimeRef = useRef<number>(0);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingModeRef = useRef<"soft" | "hard">("soft");

  const scheduleAOSRefresh = (mode: "soft" | "hard") => {
    // Elevate to "hard" if any pending refresh is "hard"
    if (mode === "hard") {
      pendingModeRef.current = "hard";
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTimeRef.current;
    const delay = Math.max(0, 120 - timeSinceLastRefresh);

    debounceTimeoutRef.current = setTimeout(() => {
      executeRefresh();
    }, delay);
  };

  const executeRefresh = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }

    // Cancel existing RAFs
    if (rafId1Ref.current !== null) {
      cancelAnimationFrame(rafId1Ref.current);
      rafId1Ref.current = null;
    }
    if (rafId2Ref.current !== null) {
      cancelAnimationFrame(rafId2Ref.current);
      rafId2Ref.current = null;
    }

    const mode = pendingModeRef.current;
    pendingModeRef.current = "soft"; // Reset back to default soft

    // Double requestAnimationFrame strategy
    rafId1Ref.current = requestAnimationFrame(() => {
      rafId2Ref.current = requestAnimationFrame(() => {
        if (mode === "hard") {
          AOS.refreshHard();
        } else {
          AOS.refresh();
        }
        lastRefreshTimeRef.current = Date.now();
        rafId1Ref.current = null;
        rafId2Ref.current = null;
      });
    });
  };

  // Initialize AOS once
  useEffect(() => {
    AOS.init({
      duration: 450,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      disable: false,
      disableMutationObserver: true, // Controlled manual refresh replaces automatic observation
    });

    // Font load handler
    if (typeof document !== "undefined") {
      document.fonts?.ready.then(() => {
        scheduleAOSRefresh("soft");
      }).catch(() => {
        // Safe fallback
      });
    }

    // Image load handler (load event)
    const handleWindowLoad = () => {
      // Defer only non-user-critical work; preserve first viewport motion.
      scheduleAOSRefresh("soft");
    };

    window.addEventListener("load", handleWindowLoad);

    // Initial soft refresh
    scheduleAOSRefresh("soft");

    return () => {
      window.removeEventListener("load", handleWindowLoad);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (rafId1Ref.current !== null) {
        cancelAnimationFrame(rafId1Ref.current);
      }
      if (rafId2Ref.current !== null) {
        cancelAnimationFrame(rafId2Ref.current);
      }
    };
  }, []);

  // Route changes must refresh through the scheduler using hard mode
  useEffect(() => {
    scheduleAOSRefresh("hard");
  }, [pathname]);

  return (
    <AOSContext.Provider value={{ scheduleAOSRefresh }}>
      {children}
    </AOSContext.Provider>
  );
}

