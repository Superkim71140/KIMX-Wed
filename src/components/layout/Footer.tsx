"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import Container from "../ui/Container";

const FacebookIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-facebook ${className}`}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-400 overflow-hidden border-t border-slate-800/50 pt-16 z-10 kimx-dark-section">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-[11px] uppercase font-bold tracking-[0.15em] text-slate-400">
                KIMX
                <span className="text-teal-500 ml-1 italic inline-block transition-transform duration-500 group-hover:scale-110">
                  Web
                </span>
              </span>
            </Link>
            <p className="text-slate-200 text-sm font-light leading-relaxed max-w-sm">
              เราออกแบบและพัฒนาเว็บไซต์คุณภาพสูง โหลดไว ปลอดภัย และวางโครงสร้าง SEO ตั้งแต่เริ่มต้น เพื่อช่วยให้ธุรกิจไทยและธุรกิจในสมุทรสาครเติบโตบนโลกออนไลน์ได้อย่างมีประสิทธิภาพและยั่งยืน
            </p>
            <div className="flex items-center gap-2 text-slate-200 text-xs font-light">
              <MapPin size={14} className="text-teal-400 flex-shrink-0" />
              <span>พื้นที่หลัก: สมุทรสาคร (มหาชัย, กระทุ่มแบน, บ้านแพ้ว) กรุงเทพฯ และปริมณฑล</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.15em] mb-4">ลิงก์เมนู</h3>
            <ul className="space-y-2 text-sm text-slate-400 font-light">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-500">
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-500">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors duration-500">
                  บริการของเรา
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors duration-500">
                  ผลงานของเรา
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors duration-500">
                  ราคาแพ็กเกจ
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white transition-colors duration-500">
                  บทความคลังความรู้
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.15em] mb-4">ช่องทางการติดต่อ</h3>
            <ul className="space-y-3 text-sm text-slate-400 font-light">
              <li className="flex items-center gap-3">
                <a
                  href={siteConfig.telephoneRaw}
                  className="flex items-center gap-3 hover:text-white transition-colors duration-500"
                >
                  <Phone size={16} className="text-teal-400 shrink-0" />
                  <span>{siteConfig.telephone}</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white transition-colors duration-500"
                >
                  <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-5.5 h-5.5 object-contain shrink-0 drop-shadow-sm" />
                  <span>LINE: {siteConfig.lineId}</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white transition-colors duration-500"
                >
                  <FacebookIcon size={16} className="text-teal-400 shrink-0" />
                  <span>Facebook: {siteConfig.facebookName}</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a
                  href={siteConfig.emailRaw}
                  className="flex items-center gap-3 hover:text-white transition-colors duration-500"
                >
                  <Mail size={16} className="text-teal-400 shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Copyright Bottom Bar */}
      <div className="border-t border-slate-800/50 bg-transparent py-6 mt-12 relative z-10">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-[11px] font-light tracking-wide">
              &copy; {currentYear} {siteConfig.brandNameFull}. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 text-slate-500 text-[11px]">
              <Link href="/" className="text-slate-500 hover:text-white transition-colors duration-500 ease-out tracking-wide font-light">
                นโยบายความเป็นส่วนตัว
              </Link>
              <span className="text-slate-700">|</span>
              <Link href="/about" className="text-slate-500 hover:text-white transition-colors duration-500 ease-out tracking-wide font-light">
                ติดต่อร่วมงาน
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
