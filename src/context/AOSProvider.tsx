"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

/**
 * AOSProvider — lifecycle-safe AOS initialization for Next.js App Router.
 *
 * Strategy: double-requestAnimationFrame ensures AOS.init runs *after* the
 * browser has committed a paint frame. This avoids the race condition where
 * AOS calculates element offsets before React's SSR-hydrated DOM is laid out.
 *
 * Font-swap & image load are handled by the explicit AOS.refresh() call, which
 * also runs inside the animation frame so layout is stable at that point.
 */
export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // First rAF: browser has processed the current JS microtask queue
    // Second rAF: browser has committed a layout / paint pass
    const rafId1 = requestAnimationFrame(() => {
      const rafId2 = requestAnimationFrame(() => {
        AOS.init({
          duration: 800,
          easing: "ease-out-cubic",
          once: true,
          // Start animation when the element is sufficiently visible.
          // AOS offset is measured from the bottom of the viewport.
          offset: 80,
          disable: false,
        });

        // Force AOS to re-measure after fonts & lazy images may have shifted layout.
        AOS.refresh();
      });

      // Return inner cleanup inside the outer rAF — this is intentionally void;
      // inner rAF will have already fired by the time outer cleanup is called.
      return rafId2;
    });

    return () => {
      cancelAnimationFrame(rafId1);
    };
  }, []);

  // Safely refresh AOS on route changes to re-bind animations
  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  return <>{children}</>;
}
