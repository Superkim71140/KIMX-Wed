export interface WebVitalsMetric {
  id: string;
  name: "CLS" | "FCP" | "FID" | "INP" | "LCP" | "TTFB";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  pathname: string;
  deviceClass: "desktop" | "mobile" | "unknown";
}

export function validateWebVitalsMetric(payload: any): payload is WebVitalsMetric {
  if (!payload || typeof payload !== "object") return false;
  const names = ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"];
  const ratings = ["good", "needs-improvement", "poor"];
  const deviceClasses = ["desktop", "mobile", "unknown"];

  return (
    typeof payload.id === "string" &&
    names.includes(payload.name) &&
    typeof payload.value === "number" &&
    ratings.includes(payload.rating) &&
    typeof payload.delta === "number" &&
    typeof payload.pathname === "string" &&
    deviceClasses.includes(payload.deviceClass)
  );
}
