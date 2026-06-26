"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * WebVitalsReporter — Tracks Core Web Vitals and posts them asynchronously
 * to the telemetry api endpoint.
 */
export default function WebVitalsReporter() {
  useReportWebVitals((metric: { id: string; name: string; value: number; rating: "good" | "needs-improvement" | "poor"; delta: number }) => {
    // Determine generic device category
    let deviceClass: "desktop" | "mobile" | "unknown" = "unknown";
    if (typeof window !== "undefined" && window.matchMedia) {
      deviceClass = window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop";
    }

    const payload = {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      pathname: typeof window !== "undefined" ? window.location.pathname : "",
      deviceClass,
    };

    const url = "/api/vitals";

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon(url, blob);
    } else {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Silently catch errors in background reporting
      });
    }
  });

  return null;
}
