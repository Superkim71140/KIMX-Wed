"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useQuoteModal } from "@/context/QuoteModalContext";
import CTAButton from "../ui/CTAButton";

export default function QuoteModal() {
  const { isOpen, closeModal } = useQuoteModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [detail, setDetail] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const firstInputRef = useRef<HTMLInputElement>(null);

  // Handle keyboard events (ESC key to close, and Tab trapping)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      // Focus first input
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setError("กรุณากรอกชื่อและเบอร์โทรศัพท์");
      return;
    }

    setLoading(true);
    setError("");

    // Package project details as message body for API
    const formData = {
      Name: name,
      Phone: phone,
      Service: `ขอใบเสนอราคา: ${projectType || "ไม่ได้ระบุประเภท"} (งบประมาณ: ${budget || "ไม่ได้ระบุ"})`,
      Message: detail || "ขอรับใบเสนอราคาตามประเภทและงบประมาณดังกล่าว",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSuccess(true);
        setName("");
        setPhone("");
        setProjectType("");
        setBudget("");
        setDetail("");
      } else {
        setError(result.error || "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
      }
    } catch {
      setError("เชื่อมต่อกับเซิร์ฟเวอร์ไม่ได้ โปรดติดต่อเราโดยตรงผ่านเบอร์โทรหรือ LINE");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
        onClick={closeModal}
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-sky-100 bg-[#f8fbff] shadow-[0_30px_90px_rgba(20,125,255,0.15)] transition-all duration-300 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-sky-100 p-5">
          <h3
            id="modal-title"
            className="text-lg font-bold text-slate-900 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-primary-glow animate-pulse" />
            ขอใบเสนอราคาโปรเจกต์
          </h3>
          <button
            onClick={closeModal}
            className="rounded-lg p-1.5 text-slate-550 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="ปิดหน้าต่าง"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-primary-glow animate-bounce" />
              <h4 className="text-xl font-bold text-slate-900">ส่งข้อมูลเรียบร้อยแล้ว!</h4>
              <p className="text-sm text-text-muted max-w-xs font-light leading-relaxed">
                เราได้รับข้อมูลความต้องการของคุณแล้ว ทีมงานจะทำการวิเคราะห์และติดต่อกลับภายใน 24 ชั่วโมง
              </p>
              <CTAButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setSuccess(false);
                  closeModal();
                }}
                className="mt-4"
              >
                ตกลง
              </CTAButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs text-red-400">
                  {error}
                </div>
              )}

              {/* Name input */}
              <div className="relative">
                <div className="form-floating">
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="modal-name"
                    required
                    className="form-control custom-input w-full p-4 text-sm"
                    placeholder="ชื่อผู้ติดต่อ / บริษัท"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="modal-name">ชื่อของคุณ / บริษัท</label>
                </div>
              </div>

              {/* Phone input */}
              <div className="relative">
                <div className="form-floating">
                  <input
                    type="tel"
                    id="modal-phone"
                    required
                    className="form-control custom-input w-full p-4 text-sm"
                    placeholder="เบอร์โทรศัพท์ติดต่อ"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label htmlFor="modal-phone">เบอร์โทรศัพท์ติดต่อ</label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project type */}
                <div className="flex flex-col">
                  <label htmlFor="modal-type" className="text-xs text-text-muted mb-2 ml-1">
                    ประเภทโปรเจกต์
                  </label>
                  <select
                    id="modal-type"
                    className="custom-input p-3 text-sm"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                  >
                    <option value="" disabled>เลือกประเภทเว็บไซต์...</option>
                    <option value="Corporate (บริษัท/องค์กร)">Corporate (บริษัท/องค์กร)</option>
                    <option value="E-commerce (ร้านค้าออนไลน์)">E-commerce (ร้านค้าออนไลน์)</option>
                    <option value="Landing Page / Sale Page">Landing Page / Sale Page</option>
                    <option value="Web Application / System">Web Application / System</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="flex flex-col">
                  <label htmlFor="modal-budget" className="text-xs text-text-muted mb-2 ml-1">
                    งบประมาณ (Budget)
                  </label>
                  <select
                    id="modal-budget"
                    className="custom-input p-3 text-sm"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="" disabled>เลือกช่วงงบประมาณ...</option>
                    <option value="3,000 - 10,000 บาท">3,000 - 10,000 บาท (Starter)</option>
                    <option value="10,000 - 20,000 บาท">10,000 - 20,000 บาท (Business)</option>
                    <option value="20,000 - 30,000 บาท">20,000 - 30,000 บาท (Advanced)</option>
                    <option value="30,000 บาท ขึ้นไป">30,000 บาท ขึ้นไป (Custom)</option>
                  </select>
                </div>
              </div>

              {/* Detail */}
              <div className="relative">
                <div className="form-floating">
                  <textarea
                    id="modal-detail"
                    className="form-control custom-input w-full p-4 text-sm"
                    style={{ height: "100px" }}
                    placeholder="รายละเอียดฟังก์ชัน"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  />
                  <label htmlFor="modal-detail">ฟังก์ชันที่ต้องการ / เว็บตัวอย่างที่ชอบ (Ref.)</label>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2 text-center">
                <CTAButton
                  type="submit"
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2 py-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      กำลังส่งข้อมูล...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      ส่งข้อมูลประเมินราคา (ฟรี)
                    </>
                  )}
                </CTAButton>
                <span className="block mt-2 text-[10px] text-text-muted">
                  *เราจะติดต่อกลับเพื่อเสนอข้อเสนอที่คุ้มค่าที่สุดสำหรับคุณ
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
