import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, FileText, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useQuoteModal } from "@/context/QuoteModalContext";
import CTAButton from "../ui/CTAButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useQuoteModal();

  const navLinks = [
    { name: "หน้าหลัก", href: "/" },
    { name: "บริการ", href: "/#services" },
    { name: "ผลงาน", href: "/portfolio" },
    { name: "แพ็กเกจราคา", href: "/#pricing" },
    { name: "บทความ", href: "/articles" },
    { name: "ไอที", href: "/news" },
    { name: "ติดต่อเรา", href: "/#contact" },
  ];

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  const isActive = (href: string) => {
    if (href === "/portfolio" && pathname.startsWith("/portfolio")) return true;
    if (href === "/articles" && pathname.startsWith("/articles")) return true;
    if (href === "/news" && pathname.startsWith("/news")) return true;
    if (href === "/" && pathname === "/") return true;
    return false;
  };

  // Lock background page scrolling when the drawer is open
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Handle Escape key to close the drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <header
        className="sticky top-0 w-full z-50 h-[72px] sm:h-[88px] flex items-center transition-all duration-300 bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg"
      >
        <div className="w-full mx-auto max-w-7xl px-4 sm:px-6">
          {/* Inner Navigation Wrapper */}
          <div className="flex items-center justify-between">
            {/* Logo Badge */}
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white">
                KIMX
                <span className="text-[#14B8A6] ml-1 italic inline-block transition-transform duration-300 group-hover:scale-110">
                  Web
                </span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-sm transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-[#14B8A6] font-bold drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                      : "text-slate-400 font-medium hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Action Panel */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Mini LINE CTA */}
              <a
                href={siteConfig.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-[#14B8A6] border border-white/5 hover:bg-slate-700 hover:text-white transition-all"
                title="แชทคุยผ่าน LINE"
              >
                <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-7 h-7 object-contain shrink-0 drop-shadow-sm" />
              </a>

              <button
                onClick={openModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14B8A6] text-slate-950 font-bold hover:bg-[#0d9488] hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all uppercase tracking-wider text-xs"
              >
                <FileText size={14} />
                ขอใบเสนอราคา
              </button>
            </div>

            {/* Mobile Menu Toggler */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-full text-slate-500 hover:text-[#0b1b33] hover:bg-slate-100 focus:outline-none transition-colors duration-300"
                aria-controls="mobile-navigation"
                aria-expanded={isOpen}
                aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนูหลัก"}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Full-Screen/Polished Drawer */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[200]"
          role="presentation"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="ปิดเมนู"
            onClick={closeMobileMenu}
            className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px] cursor-default w-full h-full border-none"
          />

          {/* Drawer Panel */}
          <aside
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="เมนูหลัก"
            className="absolute inset-y-0 right-0 z-10 flex h-[100dvh] w-[min(88vw,380px)] max-w-full flex-col overflow-x-hidden overflow-y-auto bg-white shadow-2xl pointer-events-auto"
          >
            {/* Header of Drawer: Close button + Logo */}
            <div className="sticky top-0 z-10 flex min-h-20 items-center justify-between border-b border-slate-100 bg-white/95 px-6 backdrop-blur-xl">
              <span className="text-xl font-extrabold tracking-wider text-slate-950">
                KIMX
                <span className="text-[#14B8A6] ml-1 italic">
                  Web
                </span>
              </span>
              <button
                onClick={closeMobileMenu}
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                aria-label="ปิดเมนู"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav
              aria-label="เมนูมือถือ"
              className="flex-1 flex flex-col gap-2 px-5 py-6 pointer-events-auto"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-semibold transition-colors duration-300 ${
                    isActive(link.href)
                      ? "bg-teal-50 text-teal-600 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Action Conversion Strip (LINE, Call, Quote) */}
            <div className="border-t border-slate-100 p-5 flex flex-col gap-3 bg-white">
              <CTAButton
                variant="line"
                size="md"
                href={siteConfig.lineUrl}
                external
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center gap-3"
              >
                <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-sm" />
                แชทถามทาง LINE
              </CTAButton>

              <div className="grid grid-cols-2 gap-3">
                <CTAButton
                  variant="outline"
                  size="md"
                  href={siteConfig.telephoneRaw}
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center gap-2 border-blue-100! text-[#0b1b33] hover:bg-slate-50"
                >
                  <Phone size={16} className="text-[#147dff]" />
                  โทรเลย
                </CTAButton>
                
                <CTAButton
                  variant="primary"
                  size="md"
                  onClick={() => {
                    closeMobileMenu();
                    openModal();
                  }}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FileText size={16} />
                  ขอใบเสนอราคา
                </CTAButton>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
