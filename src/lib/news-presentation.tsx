import React from "react";
import Image from "next/image";

// Category Styles Helper
export const getCategoryColorStyles = (categorySlug: string) => {
  switch (categorySlug) {
    case "ai":
      return "text-purple-750 bg-purple-50 border-purple-200/80 hover:border-purple-300";
    case "phone":
      return "text-sky-750 bg-sky-50 border-sky-200/80 hover:border-sky-300";
    case "game":
      return "text-teal-600 bg-teal-50 border-teal-200/80 hover:border-teal-300";
    case "tech":
      return "text-blue-700 bg-blue-50 border-blue-200/80 hover:border-blue-300";
    case "automotive":
      return "text-emerald-700 bg-emerald-50 border-emerald-200/80 hover:border-emerald-300";
    case "cyber-security":
      return "text-rose-700 bg-rose-50 border-rose-200/80 hover:border-rose-300";
    case "digital-business":
      return "text-amber-700 bg-amber-50 border-amber-200/80 hover:border-amber-300";
    case "how-to":
      return "text-indigo-750 bg-indigo-50 border-indigo-200/80 hover:border-indigo-300";
    default:
      return "text-slate-700 bg-slate-50 border-slate-200/80 hover:border-slate-300";
  }
};

// Custom Cover Image or Gradient Placeholder Renderer
export const renderArticleCover = (
  coverImage: string,
  title: string,
  category: string,
  coverFit?: "cover" | "contain"
) => {
  if (coverImage.startsWith("linear-gradient") || coverImage.includes("gradient")) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-900"
        style={{ background: coverImage }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
        
        {/* Sleek dynamic hub graphic */}
        <div className="z-10 bg-white/90 border border-sky-100/60 backdrop-blur-md px-5 py-3 rounded-2xl text-center shadow-lg">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-sky-600 font-sans block mb-1">
            {category}
          </span>
          <span className="text-[11px] text-slate-500 font-light font-sans tracking-wide block uppercase">
            KIMX TECH HUB
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Image
        src={coverImage}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        className={`${
          coverFit === "contain" ? "object-contain p-4" : "object-cover"
        } transition-transform duration-700 ease-out`}
      />
      {coverFit !== "contain" && (
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent pointer-events-none" />
      )}
    </>
  );
};
