"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link2, X, CheckCircle2, QrCode } from "lucide-react";
import CTAButton from "../ui/CTAButton";

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

interface ShareButtonsProps {
  shareUrl: string;
  reviewUrl?: string;
}

export default function ShareButtons({ shareUrl, reviewUrl }: ShareButtonsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle transient toast message
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(shareUrl);
      setToastMessage("คัดลอกลิงก์บทความเรียบร้อยแล้ว");
    }
  };

  const handleCopyForBio = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`อ่านต่อได้ที่: ${shareUrl}`);
      setToastMessage("คัดลอกข้อความสำหรับ Bio เรียบร้อยแล้ว");
    }
  };

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center my-8 pt-4 border-t border-slate-100 font-sans">
        <CTAButton
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 group"
        >
          <Share2 size={16} className="transition-transform group-hover:scale-110" />
          <span>แชร์บทความนี้</span>
        </CTAButton>
        {reviewUrl && (
          <CTAButton
            variant="outline"
            size="sm"
            href={reviewUrl}
            external={true}
            className="border-sky-200 text-slate-800 hover:bg-sky-50 flex items-center gap-1.5"
          >
            <span>อ่านรีวิวเต็ม</span>
          </CTAButton>
        )}
      </div>

      {/* Floating Transient Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
          >
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-sm font-medium text-white tracking-wide font-sans">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Share Sheet Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl border border-white shadow-[0_24px_64px_rgba(0,0,0,0.12)] rounded-3xl overflow-hidden font-sans"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">แชร์บทความ</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Facebook Share */}
                  <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-500">
                      <FacebookIcon size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Facebook</h4>
                      <p className="text-xs text-slate-500 font-light">แชร์ไปยังหน้าฟีดของคุณ</p>
                    </div>
                  </a>

                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-all duration-300 group text-left w-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform duration-500">
                      <Link2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">คัดลอกลิงก์</h4>
                      <p className="text-xs text-slate-500 font-light">นำไปวางในแชทหรือเว็บบอร์ด</p>
                    </div>
                  </button>
                </div>

                {/* IG / TikTok Section with QR */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <InstagramIcon size={16} className="text-pink-500" />
                    <span>สำหรับ Instagram & TikTok</span>
                  </h4>
                  
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100/50">
                    <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-slate-100 p-1 flex items-center justify-center flex-shrink-0">
                      <QrCode size={48} className="text-slate-800" strokeWidth={1.5} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs text-slate-600 leading-relaxed mb-2 font-light">
                        บันทึก QR Code หรือคัดลอกข้อความเพื่อนำไปใส่ใน Bio ของคุณ
                      </p>
                      <button
                        onClick={handleCopyForBio}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline transition-colors"
                      >
                        คัดลอกข้อความ Bio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
