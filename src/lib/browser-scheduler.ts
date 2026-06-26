/**
 * scheduleIdleTask — Defer non-critical work to browser idle periods.
 * Defer only non-user-critical work; preserve first viewport motion.
 */
export function scheduleIdleTask(callback: () => void, timeout?: number): () => void {
  if (typeof window === "undefined") {
    // Return a no-op cleanup during SSR
    return () => {};
  }

  // Use requestIdleCallback when supported
  if ("requestIdleCallback" in window) {
    const handle = window.requestIdleCallback(callback, timeout ? { timeout } : undefined);
    return () => {
      window.cancelIdleCallback(handle);
    };
  } else {
    // Fallback to setTimeout
    const handle = setTimeout(callback, timeout ?? 1);
    return () => {
      clearTimeout(handle);
    };
  }
}
