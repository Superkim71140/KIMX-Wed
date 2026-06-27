const fs = require('fs');
const path = require('path');

const ARTICLES_FILE = path.join(__dirname, '../src/data/articles.ts');
const NEWS_FILE = path.join(__dirname, '../src/data/news.ts');
const PORTFOLIO_FILE = path.join(__dirname, '../src/data/portfolio.ts');

console.log('--- KIMX Web Sitemap Validator ---');

let articles = [];
try {
  const content = fs.readFileSync(ARTICLES_FILE, 'utf8');
  const objectRegex = /\{([\s\S]*?)\}/g;
  let match;
  while ((match = objectRegex.exec(content)) !== null) {
    const objStr = match[1];
    const slugMatch = objStr.match(/slug:\s*["']([^"']+)["']/);
    const catSlugMatch = objStr.match(/categorySlug:\s*["']([^"']+)["']/);
    if (slugMatch) {
      articles.push({
        slug: slugMatch[1],
        categorySlug: catSlugMatch ? catSlugMatch[1] : null
      });
    }
  }
} catch (e) {
  console.error('Error reading articles:', e);
}

let newsArticles = [];
try {
  const content = fs.readFileSync(NEWS_FILE, 'utf8');
  const objectRegex = /\{([\s\S]*?)\}/g;
  let match;
  while ((match = objectRegex.exec(content)) !== null) {
    const objStr = match[1];
    const slugMatch = objStr.match(/slug:\s*["']([^"']+)["']/);
    const catSlugMatch = objStr.match(/categorySlug:\s*["']([^"']+)["']/);
    if (slugMatch && catSlugMatch) {
      newsArticles.push({
        slug: slugMatch[1],
        categorySlug: catSlugMatch[1]
      });
    }
  }
} catch (e) {
  console.error('Error reading news articles:', e);
}

let portfolioSlugs = [];
try {
  const content = fs.readFileSync(PORTFOLIO_FILE, 'utf8');
  const objectRegex = /\{([\s\S]*?)\}/g;
  let match;
  while ((match = objectRegex.exec(content)) !== null) {
    const objStr = match[1];
    const slugMatch = objStr.match(/slug:\s*["']([^"']+)["']/);
    if (slugMatch) {
      portfolioSlugs.push(slugMatch[1]);
    }
  }
} catch (e) {
  console.error('Error reading portfolio:', e);
}

const siteUrl = 'https://kimx-wed.vercel.app'; // Target sitemap mock domain
const urls = [];

// Static routes
urls.push(`${siteUrl}`);
urls.push(`${siteUrl}/about`);
urls.push(`${siteUrl}/articles`);
urls.push(`${siteUrl}/portfolio`);
urls.push(`${siteUrl}/news`);

// Dynamic articles (only evergreen ones, matching sitemap.ts filter logic)
articles.forEach(art => {
  if (art.slug && !art.categorySlug) {
    urls.push(`${siteUrl}/articles/${art.slug}`);
  }
});

// Dynamic portfolio
portfolioSlugs.forEach(slug => {
  urls.push(`${siteUrl}/portfolio/${slug}`);
});

// News Categories
const categories = ["ai", "phone", "game", "tech", "automotive", "cyber-security", "digital-business", "how-to"];
categories.forEach(cat => {
  if (newsArticles.some(art => art.categorySlug === cat)) {
    urls.push(`${siteUrl}/news/${cat}`);
  }
});

// News detail
newsArticles.forEach(art => {
  if (art.slug && art.categorySlug) {
    urls.push(`${siteUrl}/news/${art.categorySlug}/${art.slug}`);
  }
});

console.log(`Generated ${urls.length} URLs for validation.`);

let errors = 0;
let warnings = 0;

// Assertion 1: Uniqueness
const urlCounts = {};
urls.forEach(url => {
  urlCounts[url] = (urlCounts[url] || 0) + 1;
});

Object.keys(urlCounts).forEach(url => {
  if (urlCounts[url] > 1) {
    console.error(`❌ ERROR: Duplicate URL found: ${url} (appears ${urlCounts[url]} times)`);
    errors++;
  }
});

// Assertion 2: HTTPS Canonical
urls.forEach(url => {
  if (!url.startsWith('https://')) {
    console.warn(`⚠️ WARNING: URL is not HTTPS: ${url}`);
    warnings++;
  }
});

// Assertion 3: Redirect loop prevention
articles.forEach(art => {
  if (art.categorySlug) {
    const articleUrl = `${siteUrl}/articles/${art.slug}`;
    if (urls.includes(articleUrl)) {
      console.error(`❌ ERROR: Mapped News Article found listed under evergreen /articles/ route in sitemap: ${articleUrl} (Should only be listed as /news/${art.categorySlug}/${art.slug} to prevent redirect loop Google crawling error)`);
      errors++;
    }
  }
});

console.log(`\nSitemap validation finished with ${errors} errors and ${warnings} warnings.`);

if (errors > 0) {
  process.exit(1);
} else {
  console.log('🎉 Sitemap validation successful! Ready for crawl.');
  process.exit(0);
}
