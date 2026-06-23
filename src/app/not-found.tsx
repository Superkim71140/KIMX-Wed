import React from "react";
import { Compass, Home } from "lucide-react";
import Container from "@/components/ui/Container";
import GlassCard from "@/components/ui/GlassCard";
import CTAButton from "@/components/ui/CTAButton";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-12 bg-slate-950">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary-glow/5 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <div className="max-w-md mx-auto text-center">
          <GlassCard className="border-white/[0.04] !p-8 sm:!p-12" hoverScale={false} hoverGlow={true}>
            <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center text-primary-glow mx-auto mb-6 shadow-inner animate-bounce">
              <Compass className="w-8 h-8" />
            </div>

            <h1 className="text-6xl font-extrabold text-white mb-2">404</h1>
            <h2 className="text-xl font-bold text-white mb-4">ไม่พบหน้าที่คุณต้องการ</h2>
            
            <p className="text-sm font-light text-slate-400 leading-relaxed mb-8">
              หน้าเว็บที่คุณกำลังพยายามเข้าถึงอาจถูกลบไปแล้ว เปลี่ยนชื่อ หรือไม่เปิดให้บริการชั่วคราว
            </p>

            <CTAButton
              variant="primary"
              size="md"
              href="/"
              className="w-full flex items-center justify-center gap-2"
            >
              <Home size={16} />
              <span>กลับสู่หน้าหลัก</span>
            </CTAButton>
          </GlassCard>
        </div>
      </Container>
    </div>
  );
}
