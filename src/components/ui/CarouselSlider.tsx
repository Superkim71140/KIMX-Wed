"use client";

import React, { useRef, useCallback, useState, useEffect, useId } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselSliderProps {
  slides: React.ReactNode[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  slidesPerViewMobile?: number;
  slidesPerViewTablet?: number;
  slidesPerViewDesktop?: number;
  className?: string;
}

export default function CarouselSlider({
  slides,
  autoplay = true,
  autoplayDelay = 0,
  showNavigation = false,
  showPagination = false,
  slidesPerViewMobile = 1,
  slidesPerViewTablet = 2,
  slidesPerViewDesktop = 3,
  className = "",
}: CarouselSliderProps) {
  /**
   * Instance-ownership pattern:
   * - swiperRef holds the live Swiper instance given to us by onSwiper callback.
   * - Navigation buttons call the instance methods directly — no DOM queries,
   *   no state-driven ref gymnastics, no race conditions.
   *
   * Pagination: we point Swiper at the CSS class selector string. The DOM
   * element with that class is rendered in the same component, and Swiper
   * finds it after mount via the selector. We do NOT access paginationRef.current
   * during render (which would be a ref read during render — illegal).
   */
  const swiperRef = useRef<SwiperInstance | null>(null);
  const uniqueId = useId().replace(/:/g, "");
  const paginationClass = `custom-swiper-pagination-${uniqueId}`;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const timer = setTimeout(() => {
      setPrefersReducedMotion(mediaQuery.matches);
    }, 0);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", listener);
    
    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const handleSwiper = useCallback((swiper: SwiperInstance) => {
    swiperRef.current = swiper;
  }, []);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const modules = [];
  const isAutoplayEnabled = autoplay && !prefersReducedMotion;
  if (isAutoplayEnabled) modules.push(Autoplay);
  modules.push(Navigation);
  if (showPagination) modules.push(Pagination);

  return (
    <div className={`relative w-full group ${className}`}>
      <Swiper
        modules={modules}
        onSwiper={handleSwiper}
        speed={12000}
        grabCursor={true}
        loop={true}
        allowTouchMove={true}
        a11y={false}
        observer={true}
        observeParents={true}
        resizeObserver={true}
        watchOverflow={true}
        updateOnWindowResize={true}
        centeredSlides={false}
        watchSlidesProgress={true}
        roundLengths={false}
        cssMode={false}
        autoplay={
          isAutoplayEnabled
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        // Disable built-in navigation DOM wiring — we handle it imperatively
        navigation={false}
        pagination={
          showPagination
            ? {
                el: `.${paginationClass}`,
                clickable: true,
              }
            : false
        }
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: slidesPerViewMobile,
          },
          640: {
            slidesPerView: slidesPerViewTablet,
          },
          1024: {
            slidesPerView: slidesPerViewDesktop,
          },
        }}
        className="w-full pb-8"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} style={{ height: "auto", alignSelf: "stretch" }}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Premium Glassmorphic Navigation Buttons — imperative, instance-owned */}
      {showNavigation && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white/70 hover:bg-white border border-slate-200/50 backdrop-blur-md text-slate-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none opacity-0 group-hover:opacity-100 group-hover:translate-x-0 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white/70 hover:bg-white border border-slate-200/50 backdrop-blur-md text-slate-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none opacity-0 group-hover:opacity-100 group-hover:translate-x-0 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </>
      )}

      {/* Custom Pagination container — Swiper finds this via the CSS class selector above */}
      {showPagination && (
        <div className={`custom-swiper-pagination ${paginationClass} flex justify-center items-center gap-2 mt-4`} />
      )}
    </div>
  );
}
