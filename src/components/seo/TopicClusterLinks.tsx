import React from "react";
import Link from "next/link";
import { BookOpen, ArrowUpRight, Award } from "lucide-react";
import { getTopicClusterByCategory } from "@/data/topic-clusters";

interface TopicClusterLinksProps {
  categorySlug: string;
}

export default function TopicClusterLinks({ categorySlug }: TopicClusterLinksProps) {
  const cluster = getTopicClusterByCategory(categorySlug);

  if (!cluster) return null;

  return (
    <div className="flex flex-col gap-6 p-6 sm:p-8 rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-xs">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-[10px] font-extrabold tracking-widest text-slate-500 uppercase bg-slate-100 rounded-full">
          <Award size={10} />
          <span>Topic Cluster Hub</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans">
          {cluster.name}
        </h3>
      </div>

      {/* Commercial Pillars Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
          บริการและผลงานที่เกี่ยวข้อง
        </h4>
        <div className="flex flex-col gap-2">
          {cluster.commercialPillars.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="group flex flex-col p-4 rounded-2xl border border-slate-100 bg-slate-50/40 hover:bg-teal-500/[0.02] hover:border-teal-500/20 transition-[background-color,border-color] duration-300"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-800 group-hover:text-teal-600 transition-colors duration-300">
                  {item.title}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-slate-400 group-hover:text-teal-500 transition-colors duration-300 shrink-0"
                />
              </div>
              <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed font-sans">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <hr className="border-slate-200/60" />

      {/* Educational Guides Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
          บทความและคำแนะนำเชิงลึก
        </h4>
        <div className="flex flex-col gap-2.5">
          {cluster.educationalGuides.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="group flex items-start gap-3 p-1 rounded-lg hover:translate-x-0.5 transition-transform duration-300"
            >
              <BookOpen size={16} className="text-slate-400 group-hover:text-teal-500 transition-colors mt-0.5 shrink-0" />
              <div>
                <span className="block text-xs font-medium text-slate-700 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2 leading-relaxed font-sans">
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
