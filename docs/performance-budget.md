# Performance Budget & Core Web Vitals Guardrails

This document establishes constraints and performance budgets for the **KIMX-Wed** project. All developers, pull requests, and architecture changes must adhere strictly to these guidelines.

## 1. Core Web Vitals Target Budget

To maintain a premium, lightning-fast user experience and perfect SEO ranks, the following limits are enforced in production:

| Metric | Target | Warning Threshold | Description |
| :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | **< 1.8s** | > 2.5s | Visual loading speed |
| **CLS** (Cumulative Layout Shift) | **0.00** | > 0.05 | Visual stability of elements |
| **INP** (Interaction to Next Paint) | **< 100ms** | > 200ms | UI responsiveness and lag |
| **FCP** (First Contentful Paint) | **< 1.0s** | > 1.8s | Instant rendering perception |
| **TTFB** (Time to First Byte) | **< 200ms** | > 500ms | Server rendering responsiveness |

## 2. Non-Negotiable Development Constraints

### A. Animation and Style Optimization
* **No `transition: all`:** Do not use `transition: all` on cards, listing items, or components containing multiple children. Always write property-specific transitions (e.g. `transition: transform 0.35s ease, opacity 0.35s ease`).
* **GPU Layer Protection:** Do not declare permanent `will-change` on base components. Always promote elements to their own GPU layer dynamically using hover, active states, or the custom `[data-motion-active="true"]` attribute.
* **Respect Reduced Motion:** All animations, reveals, and scrolling overrides must respect the `(prefers-reduced-motion: reduce)` media query.

### B. Image and LCP Optimization
* **Single Preloaded LCP Image:** Never preload more than one LCP image per route. For the homepage, the Hero image `/images/portfolio/kimxwed.webp` carries `priority` and is the singular preloaded asset.
* **Layout Shift Prevention:** Every image must be wrapped in an aspect-ratio-locked parent or utilize fixed `width` / `height` attributes to prevent CLS.
* **Lazy Loading:** All non-hero images (such as `ArticleCard` thumbnails, service cards, testimonials) must have `loading="lazy"` enabled.

### C. Bundle Size Control
* **No Unanalyzed Animation Libraries:** Do not install any new animation or motion library (e.g. GSAP, React Spring) without running a bundle size analysis first.
* **Imports Audit:** Keep external icons and Swiper modules pruned. Only import what is actively configured.

## 3. Pull Request Quality Gates

Any pull request modifying code or styling inside `HeroSection`, `AOSProvider`, `SmoothScroll` (Lenis), or `CarouselSlider` (Swiper) must:
1. Be tested locally under Chrome DevTools mobile throttling (**Fast 3G** network throttle, **4x CPU slowdown**).
2. Achieve a Lighthouse Performance score **>= 95** on mobile.
3. Pass a build/compile check (`npm run build`) with zero lint or TypeScript type check warnings.
