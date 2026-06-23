import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  hoverScale?: boolean;
  as?: React.ElementType;
}

export default function GlassCard({
  children,
  className = "",
  hoverGlow = true,
  hoverScale = true,
  as: Component = "div",
  ...props
}: GlassCardProps) {
  return (
    <Component
      className={`
        relative rounded-3xl p-6 md:p-8 overflow-hidden
        bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-transparent
        transition-all duration-500 ease-out
        ${hoverGlow ? "hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]" : ""}
        ${hoverScale ? "hover:-translate-y-1" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}
