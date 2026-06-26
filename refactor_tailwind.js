const fs = require('fs');
const path = require('path');

const files = [
  'src/app/news/[category]/[slug]/page.tsx',
  'src/app/news/page.tsx',
  'src/components/articles/ArticleCard.tsx',
  'src/components/articles/RelatedArticles.tsx',
  'src/components/home/LocalSEOSection.tsx',
  'src/components/home/WhyNeedWebsite.tsx',
  'src/components/layout/NewsCategoryBar.tsx',
  'src/components/news/CategoryArticleGrid.tsx',
  'temp-share/news-category-page.tsx',
  'temp-share/news-slug-page.tsx'
];

const replacements = [
  { regex: /bg-gradient-to-/g, replace: 'bg-linear-to-' },
  { regex: /\bflex-grow\b/g, replace: 'grow' },
  { regex: /\bflex-shrink-0\b/g, replace: 'shrink-0' },
  { regex: /rounded-\[2rem\]/g, replace: 'rounded-4xl' },
  { regex: /aspect-\[16\/10\]/g, replace: 'aspect-16/10' },
  { regex: /duration-\[2000ms\]/g, replace: 'duration-2000' },
  { regex: /border-white\/\[0\.05\]/g, replace: 'border-white/5' },
  { regex: /bg-white\/\[0\.03\]/g, replace: 'bg-white/3' },
  { regex: /border-white\/\[0\.08\]/g, replace: 'border-white/8' },
  { regex: /hover:bg-white\/\[0\.06\]/g, replace: 'hover:bg-white/6' },
  { regex: /hover:border-white\/\[0\.15\]/g, replace: 'hover:border-white/15' },
  { regex: /!p-6/g, replace: 'p-6' },
  { regex: /sm:!p-8/g, replace: 'sm:p-8' },
  { regex: /!p-0/g, replace: 'p-0' },
  { regex: /p-0!/g, replace: 'p-0' }
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Apply global replacements
    replacements.forEach(({ regex, replace }) => {
      content = content.replace(regex, replace);
    });

    // File specific changes
    if (file === 'temp-share/news-category-page.tsx') {
      content = content.replace(/ duration-500 /g, ' ');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.error(`File not found: ${file}`);
  }
});
