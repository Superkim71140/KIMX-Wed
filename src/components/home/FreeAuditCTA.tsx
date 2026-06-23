"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Container from "../ui/Container";
import { siteConfig } from "@/data/site";
import { useQuoteModal } from "@/context/QuoteModalContext";

const auditChips = [
  { icon: "⚡", text: "PageSpeed" },
  { icon: "🔎", text: "Technical SEO" },
  { icon: "🛡", text: "Security" },
  { icon: "📱", text: "Mobile UX" },
  { icon: "🎯", text: "Conversion CTA" },
];

const trustPoints = [
  "ตรวจโดยทีมทำเว็บจริง",
  "เหมาะกับเว็บบริษัทและธุรกิจบริการ",
  "ส่งสรุปให้คุยต่อได้ทันที",
];

interface ScoreRow {
  label: string;
  value: string;
  badgeType: "cyan" | "teal" | "lime" | "amber";
}

const scoreRows: ScoreRow[] = [
  { label: "PageSpeed Score", value: "A+", badgeType: "cyan" },
  { label: "SEO Structure", value: "Ready", badgeType: "teal" },
  { label: "Mobile UX", value: "100%", badgeType: "cyan" },
  { label: "Security", value: "HTTPS", badgeType: "lime" },
  { label: "Conversion CTA", value: "Need Improve", badgeType: "amber" },
];

const badgeStyles: Record<
  ScoreRow["badgeType"],
  { bg: string; color: string; border: string }
> = {
  cyan: {
    bg: "rgba(14,165,233,0.14)",
    color: "#0EA5E9",
    border: "rgba(14,165,233,0.28)",
  },
  teal: {
    bg: "rgba(20,184,166,0.14)",
    color: "#14B8A6",
    border: "rgba(20,184,166,0.28)",
  },
  lime: {
    bg: "rgba(34,197,94,0.14)",
    color: "#22C55E",
    border: "rgba(34,197,94,0.28)",
  },
  amber: {
    bg: "rgba(245,158,11,0.14)",
    color: "#F59E0B",
    border: "rgba(245,158,11,0.28)",
  },
};

export default function FreeAuditCTA() {
  const { openModal } = useQuoteModal();

  return (
    <section
      id="free-audit"
      aria-labelledby="free-audit-title"
      className="relative py-10 sm:py-16 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <Container>
        {/* Outer dark navy card */}
        <div
          className="relative max-w-6xl mx-auto rounded-[36px] overflow-hidden kimx-dark-section"
          style={{
            background:
              "linear-gradient(135deg, #07111F 0%, #0B1220 45%, #062C35 100%)",
            border: "1px solid rgba(14,165,233,0.18)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.30), 0 0 0 1px rgba(14,165,233,0.08)",
          }}
        >
          {/* Radial glows */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 10% 10%, rgba(14,165,233,0.10) 0%, transparent 45%), radial-gradient(ellipse at 90% 15%, rgba(20,184,166,0.08) 0%, transparent 40%)",
            }}
          />

          {/* Subtle dot-grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              opacity: 0.08,
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* ── LEFT COLUMN ── */}
            <div className="p-10 sm:p-14 flex flex-col justify-center">


              {/* H2 */}
              <h2
                id="free-audit-title"
                className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.2] mb-6"
              >
                ให้ KIMX ตรวจเว็บ<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">ฟรี</span>
                <br />
                ก่อนเสียเงินยิงแอด
              </h2>

              {/* Body */}
              <p
                className="text-[15px] font-medium leading-relaxed mb-7 max-w-lg"
                style={{ color: "rgba(255,255,255,0.60)" }}
              >
                เราตรวจ PageSpeed, Technical SEO, UI/UX, Security, CTA
                และโครงสร้างหน้าเว็บ พร้อมสรุปจุดที่ควรแก้แบบเข้าใจง่าย
                ไม่ผูกมัด ไม่มีค่าใช้จ่าย
              </p>

              {/* Audit chips */}
              <div className="flex flex-wrap gap-2 mb-7">
                {auditChips.map((chip) => (
                  <span
                    key={chip.text}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-bold"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    <span>{chip.icon}</span>
                    {chip.text}
                  </span>
                ))}
              </div>

              {/* Trust points */}
              <div className="flex flex-col gap-2 mb-8">
                {trustPoints.map((pt) => (
                  <div key={pt} className="flex items-center gap-2">
                    <CheckCircle2
                      size={15}
                      strokeWidth={2.5}
                      style={{ color: "#14B8A6", flexShrink: 0 }}
                    />
                    <span
                      className="text-[14px] font-semibold"
                      style={{ color: "rgba(255,255,255,0.60)" }}
                    >
                      {pt}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={siteConfig.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl text-white font-extrabold text-[15px] transition-all duration-300 hover:-translate-y-0.5"
                  aria-label="ส่งเว็บให้ตรวจทาง LINE"
                  style={{
                    background: "linear-gradient(135deg, #06C755, #00B14F)",
                    boxShadow: "0 16px 36px rgba(6,199,85,0.28)",
                    minHeight: "56px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 20px 44px rgba(6,199,85,0.40)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 16px 36px rgba(6,199,85,0.28)";
                  }}
                >
                  <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-sm" />
                  ส่งเว็บให้ตรวจทาง LINE
                </a>

                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-1.5 px-7 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 hover:-translate-y-0.5"
                  aria-label="กรอกรายละเอียดรับสิทธิ์"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1.5px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.85)",
                    minHeight: "56px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(14,165,233,0.50)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(255,255,255,0.18)";
                  }}
                >
                  กรอกรายละเอียดรับสิทธิ์
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Footnote */}
              <p
                className="mt-5 text-[12px] font-medium"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                * จำกัด 10 เว็บไซต์/สัปดาห์ · โทร {siteConfig.telephone}
              </p>
            </div>

            {/* ── RIGHT COLUMN — Audit Report Dashboard ── */}
            <div className="flex items-center justify-center p-10 sm:p-14">
              <div className="w-full max-w-sm">

                {/* Browser top bar */}
                <div
                  className="flex items-center gap-1.5 px-4 py-3 rounded-t-2xl"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C940" }} />
                  <span
                    className="ml-3 text-[10px] font-mono uppercase tracking-wide"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    AUDIT REPORT PREVIEW
                  </span>
                </div>

                {/* Dashboard card */}
                <div
                  className="rounded-b-2xl rounded-tr-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderTop: "none",
                  }}
                >
                  <h3
                    className="text-[16px] font-extrabold mb-1"
                    style={{ color: "#ffffff" }}
                  >
                    เช็กเว็บแบบมืออาชีพใน 5 จุดสำคัญ
                  </h3>
                  <p
                    className="text-[12px] mb-5"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    ผลการตรวจประเมินเบื้องต้น
                  </p>

                  {/* Score rows */}
                  <div className="space-y-2.5 mb-5">
                    {scoreRows.map((row) => {
                      const style = badgeStyles[row.badgeType];
                      return (
                        <div
                          key={row.label}
                          className="flex items-center justify-between px-4 py-3 rounded-xl"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <span
                            className="text-[13px] font-semibold"
                            style={{ color: "rgba(255,255,255,0.70)" }}
                          >
                            {row.label}
                          </span>
                          <span
                            className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold"
                            style={{
                              background: style.bg,
                              color: style.color,
                              border: `1px solid ${style.border}`,
                            }}
                          >
                            {row.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom mini card */}
                  <div
                    className="rounded-xl px-4 py-4"
                    style={{
                      background: "rgba(20,184,166,0.08)",
                      border: "1px solid rgba(20,184,166,0.20)",
                    }}
                  >
                    <p
                      className="text-[13px] font-extrabold mb-1"
                      style={{ color: "#14B8A6" }}
                    >
                      ฟรี ไม่มีผูกมัด
                    </p>
                    <p
                      className="text-[12px] leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      สรุปจุดที่ควรแก้ให้เข้าใจง่ายก่อนเริ่มทำเว็บไซต์หรือยิงแอด
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
