import React from "react";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "line" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  external?: boolean;
}

export default function CTAButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  external = false,
  ...props
}: CTAButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-full
    transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      bg-primary-glow text-bg-dark border border-transparent
      shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]
      hover:scale-105 active:scale-95 focus-visible:outline-primary-glow
    `,
    secondary: `
      bg-secondary-glow text-bg-dark border border-transparent
      shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)]
      hover:scale-105 active:scale-95 focus-visible:outline-secondary-glow
    `,
    line: `
      bg-linear-to-r from-[#06c755] to-[#00d400] text-white border border-transparent
      shadow-[0_0_15px_rgba(6,199,85,0.3)] hover:shadow-[0_0_25px_rgba(6,199,85,0.5)]
      hover:scale-105 active:scale-95 focus-visible:outline-[#06c755]
    `,
    outline: `
      bg-white/80 text-slate-800 border border-sky-200/80
      hover:bg-primary-glow hover:text-white hover:border-primary-glow
      hover:shadow-[0_0_15px_rgba(20,125,255,0.2)] hover:scale-105 active:scale-95
      focus-visible:outline-sky-500
    `,
    danger: `
      bg-red-500 text-white border border-transparent
      shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]
      hover:scale-105 active:scale-95 focus-visible:outline-red-500
    `
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonElement = (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          {buttonElement}
        </a>
      );
    }
    return (
      <a href={href} className="text-decoration-none">
        {buttonElement}
      </a>
    );
  }

  return buttonElement;
}
