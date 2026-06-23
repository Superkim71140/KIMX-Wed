import React from "react";
import Image from "next/image";
import { CheckCircle2, Smartphone, ShieldCheck } from "lucide-react";
import Container from "../ui/Container";
import HeroButtons from "./HeroButtons";

export default function HeroSection() {

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex pt-8 lg:pt-12 pb-16 lg:py-0 bg-transparent">
      {/* Background Decorative Grids & Orbs */}
      <div className="absolute inset-0 kimx-soft-grid opacity-80 z-0 pointer-events-none" />
      <div className="noise-overlay" />
      
      {/* Glow Orbs */}
      <div 
      className="section-orb w-[300px] h-[300px] bg-blue-glow/10 top-1/4 left-10" 
        style={{ filter: "blur(120px)" }}
      />
      <div 
      className="section-orb w-[350px] h-[350px] bg-purple-glow/5 bottom-1/4 right-10" 
        style={{ filter: "blur(140px)" }}
      />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 lg:pt-8 pb-12 lg:pb-16">
          
          {/* Left Column: Local SEO Copywriting & Action */}
          <div className="lg:col-span-5 space-y-6 text-left">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.2] sm:leading-[1.2]" data-aos="fade-up" data-aos-delay="0">
              รับทำเว็บไซต์ที่ <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#14B8A6] to-[#0ea5e9]">สวย, เร็ว</span> และพร้อมโตบน{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#14B8A6] to-[#0ea5e9]">
                Google
              </span>
            </h1>

            <p className="text-sm sm:text-base text-text-main font-light leading-relaxed mb-6 border-l-2 border-secondary-glow pl-4 sm:pl-6 max-w-xl" data-aos="fade-up" data-aos-delay="200">
              <strong>KIMX Web Agency</strong> ออกแบบและพัฒนาเว็บไซต์ธุรกิจ สำหรับผู้ประกอบการในจังหวัดสมุทรสาคร (มหาชัย, กระทุ่มแบน, บ้านแพ้ว) และกรุงเทพฯ ปริมณฑล เราผสานศาสตร์การออกแบบ (Design) เข้ากับระบบหลังบ้านประสิทธิภาพสูง เพื่อให้หน้าเว็บของคุณน่าเชื่อถือ โหลดไวระดับ A+ และ Google เข้าใจโครงสร้างง่ายที่สุด
            </p>

            {/* Split CTA buttons component */}
            <div data-aos="fade-up" data-aos-delay="400">
              <HeroButtons />
            </div>

            {/* Premium Trust Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8" data-aos="fade-up" data-aos-delay="600">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-full shadow-sm hover:shadow-md hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium text-slate-700">
                <CheckCircle2 className="text-teal-500 shrink-0" size={16} />
                <span>เริ่มต้น ฿3,000</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-full shadow-sm hover:shadow-md hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium text-slate-700">
                <Smartphone className="text-teal-500 shrink-0" size={16} />
                <span>รองรับมือถือ 100%</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-full shadow-sm hover:shadow-md hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium text-slate-700">
                <ShieldCheck className="text-teal-500 shrink-0" size={16} />
                <span>ดูแลระบบฟรี 1 ปี</span>
              </div>
            </div>


          </div>

          {/* Right Column: Hero Image */}
          {/* AOS wrapper: carries ONLY the scroll-reveal transform — no competing animations */}
          <div className="lg:col-span-7 flex justify-center z-10 relative" data-aos="fade-left" data-aos-delay="400">
            {/* Glow Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
            
            {/* Inner wrapper carries the CSS keyframe float — isolated from data-aos parent */}
            <div className="animate-[badge-float_4s_ease-in-out_infinite] w-full">
              <div className="relative w-full max-w-[540px] lg:max-w-none rounded-3xl border border-transparent bg-white/80 backdrop-blur-md p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] aspect-4/3 sm:aspect-video lg:aspect-4/3 overflow-hidden group z-10 drop-shadow-2xl hover:drop-shadow-[0_20px_40px_rgba(20,184,166,0.15)] transition-all duration-700">
                <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                  <Image 
                    src="/images/portfolio/kimxwed.webp"
                    alt="KIMX Web Agency Portfolio"
                    fill
                    className="object-cover cursor-default"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

