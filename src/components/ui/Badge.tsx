import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div className={`relative inline-flex p-[1px] rounded-full overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2),0_0_15px_rgba(56,189,248,0.15)] transition-all duration-300 hover:scale-105 glass-badge ${className}`}>
      {/* Conic spinning beam */}
      <div className="badge-beam" />
      
      {/* Inner glass background */}
      <div className="relative z-10 flex items-center gap-2 px-5 py-2 rounded-full bg-slate-950/90 backdrop-blur-xl text-xs font-semibold tracking-[2px] uppercase border border-white/[0.03]">
        {children}
      </div>
    </div>
  );
}
