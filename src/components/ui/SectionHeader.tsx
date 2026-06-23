import React from "react";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: "center" | "left" | "right";
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  align = "center",
  className = "",
  ...props
}: SectionHeaderProps) {
  const alignmentClasses = {
    center: "text-center mx-auto",
    left: "text-left",
    right: "text-right ml-auto",
  };

  return (
    <div
      className={`max-w-3xl mb-12 md:mb-16 ${alignmentClasses[align]} ${className}`}
      {...props}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
