"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ArticleShareActionProps {
  title: string;
  canonicalUrl: string;
  description?: string;
}

export default function ArticleShareAction({
  title,
  canonicalUrl,
  description,
}: ArticleShareActionProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // If Web Share API is available and supported
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: canonicalUrl,
        });
        return; // Success
      } catch (err: unknown) {
        // If the user cancelled the share, AbortError is thrown.
        // We gracefully fallback or just return if it's an abort.
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        // Fallthrough to clipboard if share failed for other reasons
      }
    }

    // Fallback to Clipboard API
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(canonicalUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full font-sans text-sm font-semibold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500"
      aria-label="แชร์บทความนี้"
    >
      {copied ? <Check size={16} className="text-teal-600" /> : <Share2 size={16} />}
      <span>{copied ? "คัดลอกลิงก์แล้ว" : "แชร์บทความนี้"}</span>
    </button>
  );
}
