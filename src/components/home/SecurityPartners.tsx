import React from "react";
import Image from "next/image";
import Container from "../ui/Container";

export default function SecurityPartners() {
  const partners = [
    { id: 1, name: "Google Cloud", src: "/images/partners/Logo  Google Cloud.png" },
    { id: 2, name: "Akamai", src: "/images/partners/logo akamai.png" },
    { id: 3, name: "Cloudflare", src: "/images/partners/logo Cloudflare.png" },
    { id: 4, name: "SSL Secure", src: "/images/partners/logo ssl.png" },
    { id: 5, name: "Sucuri", src: "/images/partners/logo Sucuri.png" },
  ];

  return (
    <section className="security-partners relative bg-transparent py-12 overflow-hidden z-10">
      <Container>
        {/* Adjusted Header Layout */}
        <div className="security-partners__header text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            เทคโนโลยีที่ช่วยให้เว็บเร็ว ปลอดภัย และพร้อมเติบโต
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto mb-12">
            เราออกแบบโครงสร้างให้รองรับระบบความปลอดภัย SSL, การทำ CDN Caching, Google Analytics, การวัดผลโฆษณา และวางโครงสร้าง Technical SEO ตั้งแต่วันแรกที่ส่งมอบ
          </p>
        </div>

        {/* Infinite Scrolling Marquee */}
        <div className="security-partners__viewport">
          <div className="security-partners__track">
            {/* First half: screen-reader accessible & keyboard focusable */}
            {partners.map((partner) => (
              <div
                key={`primary-${partner.id}`}
                className="security-partners__item pr-12 md:pr-16"
              >
                <div
                  className="security-partners__logo-card"
                  role="img"
                  aria-label={partner.name}
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
            {/* Second half (duplicate): aria-hidden, tabIndex={-1}, data-duplicate */}
            {partners.map((partner) => (
              <div
                key={`duplicate-${partner.id}`}
                className="security-partners__item pr-12 md:pr-16"
                aria-hidden="true"
                data-duplicate="true"
              >
                <div
                  className="security-partners__logo-card"
                  tabIndex={-1}
                >
                  <Image
                    src={partner.src}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

