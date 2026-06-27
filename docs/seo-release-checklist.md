# KIMX Web SEO Release Checklist

This document details the guidelines, architectural boundaries, and regression testing checklist to run before pushing new features or pages to production. 

---

## 1. Automated Validation Tests
Run these commands locally or in your CI/CD pipeline to automatically catch structure, syntax, and indexation mistakes:

```bash
# Validate sitemap URL structure, uniqueness, HTTPS, and redirect loop avoidance
npm run seo:sitemap

# Audit generated HTML pages for single <h1>, metadata lengths, JSON-LD schemas, and canonical tags
# (Note: Build the site first to produce the server HTML files)
npm run build
npm run seo:audit
```

---

## 2. Structural Content & SEO Requirements

### Heading Hierarchy
- **Strictly 1 `<h1>` Per Page:** Every route must contain exactly one `<h1>` tag representing the main page topic. No secondary headers can use the `<h1>` tag.
- **Semantic Progression:** Order heading tags hierarchically (`<h1>` -> `<h2>` -> `<h3>` -> `<h4>`). Never skip levels for visual styling. Use CSS classes to control size instead.

### Metadata Rules
- **Canonical Suffix Limit:** Ensure there is exactly one `KIMX Web` brand suffix in the title.
- **Absolute Canonical URLs:** Check that each page declares a canonical absolute URL matching its true path on `https://kimx-wed.vercel.app` or the production domain.
- **Description Limits:** Meta descriptions must be present on every page, range between 50 and 160 characters, and explain the page value clearly with keywords.

---

## 3. Technical discovery & Schema Rules

### Schema Serialization
- **Zero Script Injection:** All dynamic JSON-LD scripts must be serialized using `safeJsonLd(schemaData)` instead of `JSON.stringify(schemaData)` to ensure characters like `<` are escaped as `\u003c` safely.
- **Graph Connection:** The homepage must utilize the connected `@graph` schema combining `Organization`, `WebSite`, `WebPage`, `ProfessionalService`, and `FAQPage` metadata with shared cross-references.

### Redirects & Sitemap Integrity
- **Evergreen Articles:** Evergreen articles must reside in `/articles/[slug]`.
- **News/Trending Articles:** Mapped articles containing a category must redirect permanently (`permanentRedirect`) to `/news/[category]/[slug]`.
- **Sitemap Cleanliness:** Ensure that redirected article URLs are excluded from the sitemap. Only canonical destination URLs should appear in `sitemap.xml`.

---

## 4. Performance & Core Web Vitals Constraints

- **Single Main Tag:** Only one `<main>` tag is allowed per page layout to avoid breaking assistive tech parsing and browser paint targets.
- **LCP Images:** Ensure the Hero/LCP image utilizes the `sizes` attribute correctly to deliver optimized responsive images.
- **Animations Stability:** Do not remove slow-and-smooth entrance reveals, Lenis, or AOS loops, but ensure they hook into `requestAnimationFrame` debouncing to keep rendering smooth and limit CPU thrashing.
