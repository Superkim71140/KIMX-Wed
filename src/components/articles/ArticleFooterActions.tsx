import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleShareAction from "./ArticleShareAction";

interface ArticleFooterActionsProps {
  returnUrl: string;
  returnLabel?: string;
  title: string;
  canonicalUrl: string;
  description?: string;
}

export default function ArticleFooterActions({
  returnUrl,
  returnLabel = "กลับสู่หน้ารวมบทความ",
  title,
  canonicalUrl,
  description,
}: ArticleFooterActionsProps) {
  return (
    <section className="py-8 mt-12 mb-8 border-t border-slate-200/60 font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Share Action (Left/Top) */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <ArticleShareAction
            title={title}
            canonicalUrl={canonicalUrl}
            description={description}
          />
        </div>

        {/* Return Action (Right/Bottom) */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Link
            href={returnUrl}
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-900 font-semibold text-sm transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-x-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg"
          >
            <ArrowLeft size={16} />
            <span>{returnLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
