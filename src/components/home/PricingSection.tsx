"use client";

import React from "react";
import { Check, Gift } from "lucide-react";
import { pricingPlans, pricingDisclaimer } from "@/data/pricing";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import CTAButton from "../ui/CTAButton";

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-transparent overflow-hidden scroll-mt-20">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-full bg-linear-to-b from-transparent via-sky-200/10 to-transparent filter blur-[80px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeader
          title="เลือกแพ็กเกจที่ใช่สำหรับธุรกิจคุณ"
          description="เราออกแบบแพ็กเกจมาเพื่อรองรับทุกสเกลของธุรกิจ ตั้งแต่เริ่มต้นไปจนถึงระดับองค์กร ด้วยเทคโนโลยีที่ทันสมัยและการดูแลที่เหนือกว่า"
          data-aos="fade-up"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-12">
          {pricingPlans.map((plan, index) => {
            const isBusiness = plan.id === "business";
            
            return (
              <div
                key={plan.id}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className="h-full"
              >
                <div
                  className={`relative flex flex-col rounded-3xl h-full transition-shadow duration-500 ${
                    isBusiness
                      ? "premium-border-pan shadow-[0_8px_32px_rgba(20,125,255,0.08)] z-10 lg:scale-[1.03]"
                      : "border border-transparent shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                  }`}
                >
                {/* Popular Ribbon/Badge */}
                {isBusiness && plan.isPopular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-sky-600 text-white text-xs font-bold tracking-widest uppercase py-1.5 px-4 rounded-full shadow-lg z-20">
                    ยอดนิยม
                  </div>
                )}

                {/* Inner Card Wrapper */}
                <GlassCard
                  className="flex flex-col h-full p-8! sm:p-10! border border-transparent bg-white"
                  hoverGlow={!isBusiness}
                  hoverScale={!isBusiness}
                >
                  {/* Card Header */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{plan.name}</h3>
                    
                    {/* Price rendering */}
                    <div className="flex flex-col">
                      {plan.originalPrice && (
                        <span className="text-slate-400 text-sm line-through mb-1">
                          ฿{plan.originalPrice}
                        </span>
                      )}
                      <div className="flex items-baseline text-slate-900">
                        <span className="text-2xl font-semibold mr-1">฿</span>
                        <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isBusiness ? "text-sky-600" : ""}`}>
                          {plan.price}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 font-light mt-3">{plan.description}</p>
                    
                    {/* Promo Code tag */}
                    {plan.promoText && (
                      <div className="inline-flex items-center gap-1 text-xs text-amber-600 font-semibold mt-3 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                        <Gift size={12} />
                        <span>{plan.promoText}</span>
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-4 mb-8 grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm font-light text-slate-700">
                        <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${isBusiness ? "bg-sky-100 text-sky-600" : "bg-sky-50 text-sky-500"}`}>
                          <Check size={14} className="stroke-3" />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pricing Action */}
                  <CTAButton
                    variant={isBusiness ? "primary" : "outline"}
                    size="md"
                    href="#contact"
                    className="w-full mt-auto"
                  >
                    {plan.btnText}
                  </CTAButton>
                </GlassCard>
              </div>
            </div>
          );
        })}
      </div>

        {/* Disclaimer */}
        <div className="text-center mt-12 text-slate-400 text-xs font-light">
          {pricingDisclaimer}
        </div>
      </Container>
    </section>
  );
}
