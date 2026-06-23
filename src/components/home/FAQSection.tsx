"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, HelpCircle } from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import CTAButton from "../ui/CTAButton";
import { siteConfig } from "@/data/site";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "รับทำเว็บไซต์ราคาเริ่มต้นเท่าไหร่?",
      a: "ราคาเริ่มต้นเพียง 3,000 บาท สำหรับแพ็กเกจ Starter Kickoff (One Page) และ 3,500 บาท สำหรับแพ็กเกจ Business Growth (สูงสุด 10 หน้า) ซึ่งรวมค่าจดโดเมน (.com) และพื้นที่โฮสติ้งปีแรกเรียบร้อยแล้ว ไม่มีบวกเพิ่มทีหลังครับ"
    },
    {
      q: "ใช้เวลาทำเว็บไซต์กี่วันเสร็จ?",
      a: "สำหรับเว็บไซต์หน้าเดียว (Starter) ใช้เวลาประมาณ 3-7 วันทำการ ส่วนเว็บไซต์บริษัท/หลายหน้า (Business) และเว็บร้านค้าออนไลน์ E-commerce จะใช้เวลาประมาณ 7-14 วันทำการ นับจากวันที่ได้รับข้อมูลรายละเอียดและรูปภาพครบถ้วนครับ"
    },
    {
      q: "ทำเว็บไซต์กับ KIMX Web แล้วจะติด Google หน้าแรกเลยไหม?",
      a: "เราเซ็ตอัปโครงสร้างเว็บไซต์ให้มีความพร้อมในการไต่อันดับ (Technical SEO Ready) 100% ตั้งแต่เริ่มต้น เช่น จัดลำดับ Heading Tags (H1-H3), ทำระบบ Responsive รองรับมือถือ, ใส่ Schema Markup ข้อมูลธุรกิจ และนำส่ง XML Sitemap ไปยัง Google Search Console ทันที ซึ่งช่วยให้ Google เข้ามาเก็บข้อมูลและเริ่มจัดอันดับได้เร็วกว่า ส่วนการขึ้นอันดับหน้าแรกจะขึ้นอยู่กับคุณภาพของเนื้อหาและการทำ SEO อย่างต่อเนื่องครับ"
    },
    {
      q: "รองรับการเข้าชมผ่านโทรศัพท์มือถือหรือไม่?",
      a: "รองรับ 100% เป็นมาตรฐานหลักครับ ทุกหน้าเว็บไซต์ถูกออกแบบด้วยแนวคิด Mobile-First และ Responsive Design เพื่อให้แสดงผลได้อย่างเหมาะสม สวยงาม และโหลดใช้งานได้รวดเร็วลื่นไหลบนทุกหน้าจอ (มือถือ, แท็บเล็ต, แล็ปท็อป และเดสก์ท็อป)"
    },
    {
      q: "มีบริการดูแลเว็บไซต์หลังส่งมอบและมีสัญญาผูกมัดไหม?",
      a: "เรามีบริการดูแลระบบหลังส่งมอบฟรี 1 ปีเต็ม ครอบคลุมการอัปเกรดปลั๊กอินความปลอดภัย ตรวจเช็คบั๊ก และสำรองข้อมูล (Backup) รายเดือน เพื่อความอุ่นใจของคุณ และที่สำคัญคือเราไม่มีสัญญาผูกมัดหรือค่าบริการเช่าระบบบังคับจ่ายรายปีโหดๆ ในปีถัดไปคุณชำระเพียงค่าต่ออายุโดเมนและโฮสติ้งตามราคาจริงเท่านั้นครับ"
    },
    {
      q: "หากอยู่นอกพื้นที่จังหวัดสมุทรสาคร รับทำเว็บไซต์ให้ไหม?",
      a: "รับทำครับ ทาง KIMX Web Agency ยินดีให้บริการลูกค้าทุกจังหวัดทั่วประเทศ เรามีระบบการประสานงานออนไลน์ที่สะดวกและมีประสิทธิภาพสูง ทั้งการรับส่งข้อมูลผ่าน LINE, ประชุมบรีฟงานผ่าน Zoom/Google Meet และส่งลิงก์ตัวอย่างเว็บตัวจริงให้ตรวจความคืบหน้าตลอดงาน เพื่อให้คุณได้รับงานตรงใจโดยไม่ต้องเสียเวลาเดินทางครับ"
    }
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-transparent overflow-hidden scroll-mt-20">
      {/* Background soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-gradient-to-b from-transparent via-sky-200/10 to-transparent filter blur-[80px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeader
          title="คำถามที่พบบ่อย (FAQs)"
          description="ไขข้อสงสัยเกี่ยวกับการบริการจัดทำเว็บไซต์ ออกแบบดีไซน์ และระบบการดูแลรักษาหลังส่งมอบอย่างโปร่งใส"
        />

        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <GlassCard
                key={index}
                className={`!p-0 overflow-hidden transition-all duration-300 border-transparent ${
                  isOpen ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]" : "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                }`}
                hoverScale={false}
                hoverGlow={!isOpen}
              >
                {/* Accordion Header Button */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-3">
                    <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${isOpen ? "text-sky-600" : "text-slate-400"}`} />
                    <span>{faq.q}</span>
                  </span>
                  
                  {/* Rotating Arrow */}
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ease-out ${
                      isOpen ? "transform rotate-180 text-sky-600" : ""
                    }`}
                  />
                </button>

                {/* Accordion Body Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] border-t border-sky-100/60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 sm:p-7 bg-slate-50/30 text-xs sm:text-sm font-light text-slate-600 leading-relaxed pl-13">
                    {faq.a}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* FAQ Contact footer */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-xs text-slate-500 font-light">
            มีคำถามอื่นเพิ่มเติม หรืออยากให้ประเมินระบบที่ต้องการเป็นพิเศษ?
          </p>
          <div className="flex justify-center">
            <CTAButton
              href={siteConfig.lineUrl}
              external={true}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-50 inline-flex items-center gap-3"
            >
              <Image src="/line-ar21.svg" alt="LINE" width={36} height={36} className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-sm" />
              <span>แชทถามรายละเอียดด่วนบน LINE</span>
            </CTAButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
