"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, MapPin, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import Container from "../ui/Container";

const FacebookIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
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
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import CTAButton from "../ui/CTAButton";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setError("กรุณากรอกชื่อและเบอร์โทรศัพท์ติดต่อ");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Phone: phone,
          Service: service || "ติดต่อทั่วไป",
          Message: message || "ไม่ได้ระบุรายละเอียดเพิ่มเติม"
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSuccess(true);
        setName("");
        setPhone("");
        setService("");
        setMessage("");
      } else {
        setError(result.error || "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง");
      }
    } catch {
      setError("เชื่อมต่อเซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่อีกครั้ง หรือติดต่อผ่าน LINE / โทรศัพท์");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-transparent overflow-hidden">
      {/* Connector glow */}
      <div className="absolute top-0 left-1/4 w-[1px] h-20 bg-gradient-to-b from-sky-350 to-transparent" />

      <Container className="relative z-10">
        <SectionHeader
          title="ติดต่อเรา"
          description="พร้อมให้คำปรึกษาและผลักดันธุรกิจของคุณสู่โลกดิจิทัล ติดต่อทีมงานได้ทุกช่องทาง"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12">
          {/* Left Column: Contact details card */}
          <div className="lg:col-span-5 flex">
            <GlassCard
              className="w-full bg-white border border-transparent shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-3xl !p-8 flex flex-col justify-between"
              hoverScale={false}
              hoverGlow={false}
            >
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">ช่องทางติดต่อหลัก</h3>

                {/* Telephone */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary-glow/10 border border-primary-glow/20 flex items-center justify-center text-primary-glow flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">เบอร์โทรศัพท์</div>
                    <a
                      href={siteConfig.telephoneRaw}
                      className="text-base sm:text-lg font-semibold text-slate-900 hover:text-sky-650 transition-colors duration-200"
                    >
                      {siteConfig.telephone}
                    </a>
                  </div>
                </div>

                {/* Area Served */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary-glow/10 border border-primary-glow/20 flex items-center justify-center text-primary-glow flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">พื้นที่ให้บริการ</div>
                    <span className="text-base font-semibold text-slate-900">
                      สมุทรสาคร และ กทม. ปริมณฑล
                    </span>
                  </div>
                </div>

                {/* LINE */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#06C755]/10 border border-[#06C755]/20 flex items-center justify-center text-[#06C755] flex-shrink-0">
                    <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-[28px] h-[28px] object-contain shrink-0 drop-shadow-sm" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">LINE Official</div>
                    <a
                      href={siteConfig.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-semibold text-slate-900 hover:text-[#05b34c] transition-colors duration-200"
                    >
                      {siteConfig.lineId}
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <FacebookIcon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">Facebook Page</div>
                    <a
                      href={siteConfig.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors duration-200"
                    >
                      {siteConfig.facebookName}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary-glow/10 border border-primary-glow/20 flex items-center justify-center text-primary-glow flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">อีเมล</div>
                    <a
                      href={siteConfig.emailRaw}
                      className="text-base sm:text-lg font-semibold text-slate-900 hover:text-sky-650 transition-colors duration-200"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Form card */}
          <div className="lg:col-span-7 flex">
            <GlassCard
              className="w-full bg-white border border-transparent shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-3xl !p-8 flex flex-col justify-between"
              hoverScale={false}
              hoverGlow={false}
            >
              <div className="w-full">
                <h3 className="text-xl font-bold text-slate-900 mb-6">ส่งข้อความหาเรา</h3>

                {success ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-primary-glow animate-bounce" />
                    <h4 className="text-xl font-bold text-slate-900">ส่งข้อความสำเร็จแล้ว!</h4>
                    <p className="text-sm text-text-muted max-w-sm font-light leading-relaxed">
                      ทางทีมงาน KIMX Web ได้รับข้อความเรียบร้อยแล้ว เราจะรีบประเมินข้อมูลและติดต่อกลับท่านโดยด่วนที่สุด ขอบคุณครับ
                    </p>
                    <CTAButton
                      variant="outline"
                      size="sm"
                      onClick={() => setSuccess(false)}
                      className="mt-4"
                    >
                      ส่งข้อความใหม่
                    </CTAButton>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-400">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="relative">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="contact-name"
                            required
                            className="form-control custom-input w-full p-4 text-sm"
                            placeholder="ชื่อของคุณ"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label htmlFor="contact-name">ชื่อผู้ติดต่อ</label>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <div className="form-floating">
                          <input
                            type="tel"
                            id="contact-phone"
                            required
                            className="form-control custom-input w-full p-4 text-sm"
                            placeholder="เบอร์โทรศัพท์"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          <label htmlFor="contact-phone">เบอร์โทรศัพท์</label>
                        </div>
                      </div>
                    </div>

                    {/* Service */}
                    <div className="relative">
                      <div className="form-floating">
                        <input
                          type="text"
                          id="contact-service"
                          className="form-control custom-input w-full p-4 text-sm"
                          placeholder="บริการที่สนใจ"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                        />
                        <label htmlFor="contact-service">บริการที่สนใจ (เช่น รับทำเว็บ SEO)</label>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <div className="form-floating">
                        <textarea
                          id="contact-message"
                          className="form-control custom-input w-full p-4 text-sm"
                          style={{ height: "120px" }}
                          placeholder="รายละเอียดเพิ่มเติม"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <label htmlFor="contact-message">รายละเอียดเพิ่มเติม / ข้อความ</label>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <CTAButton
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            กำลังส่งข้อมูล...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            ส่งข้อความ
                          </>
                        )}
                      </CTAButton>
                    </div>
                  </form>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
