import React from "react";
import type { Metadata } from "next";
import { getHomepageSchema, safeJsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// Component Imports
import HeroSection from "@/components/home/HeroSection";
import TrustMetrics from "@/components/home/TrustMetrics";
import SecurityPartners from "@/components/home/SecurityPartners";
import ServicesSection from "@/components/home/ServicesSection";
import WhyNeedWebsite from "@/components/home/WhyNeedWebsite";
import WebsiteShowcase from "@/components/home/WebsiteShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ProcessSection from "@/components/home/ProcessSection";
import LocalSEOSection from "@/components/home/LocalSEOSection";
import PricingSection from "@/components/home/PricingSection";
import ArticlesPreview from "@/components/home/ArticlesPreview";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import FloatingContactBar from "@/components/home/FloatingContactBar";

// Specific SEO Metadata for Homepage
export const metadata: Metadata = buildMetadata({
  title: "รับทำเว็บไซต์ สมุทรสาคร | ออกแบบเว็บไซต์ SEO พร้อมระบบธุรกิจ - KIMX Web",
  description: "KIMX Web รับทำเว็บไซต์สมุทรสาคร มหาชัย กระทุ่มแบน บ้านแพ้ว และกรุงเทพฯ ออกแบบเว็บไซต์บริษัท เว็บไซต์ธุรกิจ ระบบ E-commerce SEO และดูแลเว็บครบวงจร โทร 092-837-1926",
  path: "",
});

export const revalidate = 86400;

export default function HomePage() {
  const homeSchema = getHomepageSchema();

  return (
    <>
      {/* Schema Markup Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(homeSchema) }}
      />

      {/* 1. Hero Section Presentation */}
      <HeroSection />

      {/* 2. Trust Metrics Strip */}
      <TrustMetrics />

      {/* 3. Security partners logo slider */}
      <SecurityPartners />

      {/* 4. Services presentation */}
      <ServicesSection />

      {/* 5. Custom website showcase mockup styles */}
      <WebsiteShowcase />

      {/* 6. Why Need a Website presentation */}
      <WhyNeedWebsite />

      {/* 7. Why Choose Us comparisons */}
      <WhyChooseUs />

      {/* Testimonials Slider Carousel */}
      <TestimonialsSection />

      {/* 8. Working Process timeline */}
      <ProcessSection />

      {/* 9. Local SEO target area focus */}
      <LocalSEOSection />

      {/* 10. Pricing packages */}
      <PricingSection />

      {/* 11. Articles/Knowledge updates */}
      <ArticlesPreview />

      {/* 12. Expandable FAQs */}
      <FAQSection />

      {/* 13. Contact details and form */}
      <ContactSection />

      {/* 14. Mobile sticky dock & Desktop scroll top floating pill */}
      <FloatingContactBar />
    </>
  );
}

