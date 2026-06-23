import React from "react";
import { FolderCheck, Gauge, Search, HeartHandshake, Coins } from "lucide-react";
import Container from "../ui/Container";

export default function TrustMetrics() {
  const metrics = [
    {
      icon: <FolderCheck className="w-5 h-5 text-blue-glow" />,
      value: "100+",
      label: "โปรเจกต์ส่งมอบสำเร็จ",
    },
    {
      icon: <Gauge className="w-5 h-5 text-amber-glow" />,
      value: "A+",
      label: "Performance Target",
    },
    {
      icon: <Search className="w-5 h-5 text-purple-glow" />,
      value: "SEO-Ready",
      label: "โครงสร้างถูกต้อง 100%",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-emerald-400" />,
      value: "ดูแลฟรี 1 ปี",
      label: "หลังส่งมอบอย่างเป็นระบบ",
    },
    {
      icon: <Coins className="w-5 h-5 text-rose-400" />,
      value: "เริ่ม ฿3,000",
      label: "ไม่มีค่าใช้จ่ายซ่อนเร้น",
    },
  ];

  return (
    <section className="relative z-20 py-2 sm:py-0 -mt-8 sm:-mt-12 bg-transparent">
      <Container>
        {/* Horizontal Glass Strip Container */}
        <div className="w-full rounded-3xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-transparent p-6 sm:py-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row items-center sm:items-start gap-3 justify-center text-center sm:text-left px-2 ${
                  idx > 1 ? "pt-4 sm:pt-0" : ""
                } ${idx === 1 ? "pt-4 sm:pt-0" : ""}`}
              >
                {/* Icon Wrapper */}
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
                  {m.icon}
                </div>
                
                {/* Copy */}
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                    {m.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-light text-slate-500 leading-normal mt-0.5">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
