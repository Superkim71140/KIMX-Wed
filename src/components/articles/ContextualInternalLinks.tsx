import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getInternalLinksForArticle } from "@/lib/internal-links";
import Container from "@/components/ui/Container";

interface ContextualInternalLinksProps {
  articleSlug: string;
  categorySlug?: string;
  tags?: string[];
}

export default function ContextualInternalLinks({
  articleSlug,
  categorySlug,
  tags,
}: ContextualInternalLinksProps) {
  const links = getInternalLinksForArticle(articleSlug, categorySlug, tags);

  if (links.length === 0) return null;

  return (
    <section className="py-12 border-t border-slate-200/60 bg-slate-50/50 backdrop-blur-xs">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-1.5 w-6 bg-teal-500 rounded-full" />
            <h3 className="text-lg font-bold text-slate-800 tracking-wide font-sans">
              บริการและผลงานที่เกี่ยวข้อง
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-md hover:border-teal-500/30 transition-[box-shadow,border-color] duration-300"
              >
                <div>
                  <div className="inline-block px-2.5 py-0.5 mb-3 text-[10px] font-bold tracking-wider text-teal-600 bg-teal-50 rounded-full">
                    {link.topicBadge}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                    {link.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed mb-4">
                    {link.description}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 group-hover:text-teal-700 transition-colors duration-300">
                  <span>{link.ctaText}</span>
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
