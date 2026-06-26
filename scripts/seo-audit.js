const fs = require('fs');
const path = require('path');

const NEXT_APP_DIR = path.join(__dirname, '../.next/server/app');

function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

console.log('--- KIMX Web SEO Audit Tool ---');

const files = getHtmlFiles(NEXT_APP_DIR);
if (files.length === 0) {
  console.warn('⚠️ Warning: No pre-rendered HTML files found in .next/server/app.');
  console.warn('Please run "npm run build" first to generate pages for a full structural audit.');
  console.log('Running static checks on source files...');
  runStaticSourceAudit();
  process.exit(0);
}

let totalErrors = 0;
let totalWarnings = 0;

files.forEach(file => {
  const relativePath = path.relative(NEXT_APP_DIR, file);
  const content = fs.readFileSync(file, 'utf8');

  // Skip error/internal files, dev utilities, and redirect files
  const isErrorOrDevPage = relativePath.startsWith('_') || relativePath.includes('drafts.html');
  const isRedirect = content.includes('NEXT_REDIRECT') || content.includes('http-equiv="refresh"');

  if (isErrorOrDevPage || isRedirect) {
    console.log(`\nSkipping non-public/redirect page: ${relativePath}`);
    return;
  }

  console.log(`\nChecking: ${relativePath}`);

  // 1. Audit H1 elements
  const h1Matches = content.match(/<h1[\s>]/gi) || [];
  if (h1Matches.length === 0) {
    console.error('❌ ERROR: Missing <h1> tag. Every page must have exactly one <h1>.');
    totalErrors++;
  } else if (h1Matches.length > 1) {
    console.error(`❌ ERROR: Multiple <h1> tags found (${h1Matches.length}). Every page must have exactly one <h1>.`);
    totalErrors++;
  } else {
    console.log('✅ H1 check: Passed (exactly one <h1>)');
  }

  // 2. Audit Title tags
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch) {
    console.error('❌ ERROR: Missing <title> tag.');
    totalErrors++;
  } else {
    const titleText = titleMatch[1].trim();
    // Brand suffix check
    const brandSuffixes = (titleText.match(/KIMX Web/g) || []).length;
    if (brandSuffixes > 1) {
      console.warn(`⚠️ WARNING: Brand suffix "KIMX Web" duplicated ${brandSuffixes} times in title: "${titleText}"`);
      totalWarnings++;
    } else {
      console.log(`✅ Title check: Passed ("${titleText}")`);
    }
  }

  // 3. Audit Meta Description
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || 
                    content.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  if (!descMatch) {
    console.warn('⚠️ WARNING: Missing meta description.');
    totalWarnings++;
  } else {
    const descText = descMatch[1].trim();
    if (descText.length < 50) {
      console.warn(`⚠️ WARNING: Meta description is too short (${descText.length} chars). Recommend 50-160 chars.`);
      totalWarnings++;
    } else {
      console.log(`✅ Description check: Passed (${descText.length} chars)`);
    }
  }

  // 4. Audit JSON-LD Schemas
  const scriptRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  let schemaCount = 0;
  while ((match = scriptRegex.exec(content)) !== null) {
    schemaCount++;
    const jsonStr = match[1];
    try {
      const parsed = JSON.parse(jsonStr);
      // Validate context and type
      const validateNode = (node) => {
        if (typeof node !== 'object' || node === null) return;
        if ('@context' in node && node['@context'] !== 'https://schema.org') {
          console.warn(`⚠️ WARNING: Invalid schema context "${node['@context']}"`);
          totalWarnings++;
        }
        if ('@graph' in node && Array.isArray(node['@graph'])) {
          node['@graph'].forEach(validateNode);
        }
      };

      if (Array.isArray(parsed)) {
        parsed.forEach(validateNode);
      } else {
        validateNode(parsed);
      }
      console.log(`✅ JSON-LD schema #${schemaCount}: Valid JSON`);
    } catch (e) {
      console.error(`❌ ERROR: Invalid JSON-LD schema #${schemaCount}: ${e.message}`);
      totalErrors++;
    }
  }
  if (schemaCount === 0) {
    console.warn('⚠️ WARNING: No JSON-LD schema markup found on this page.');
    totalWarnings++;
  }

  // 5. Check duplicate metadata attributes
  const canonicalMatches = content.match(/<link\s+rel="canonical"\s+href="([^"]*)"/gi) || [];
  if (canonicalMatches.length > 1) {
    console.error(`❌ ERROR: Duplicate canonical links found (${canonicalMatches.length}).`);
    totalErrors++;
  }
});

console.log(`\nAudit completed with ${totalErrors} errors and ${totalWarnings} warnings.`);
if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log('🎉 SEO Audit Successful!');
  process.exit(0);
}

function runStaticSourceAudit() {
  const appDir = path.join(__dirname, '../src/app');
  if (!fs.existsSync(appDir)) {
    console.log('src/app folder not found. Skipping static source audit.');
    return;
  }

  function checkDir(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        checkDir(fullPath);
      } else if (file === 'page.tsx') {
        const relative = path.relative(appDir, fullPath);
        const code = fs.readFileSync(fullPath, 'utf8');
        console.log(`Checking source page: ${relative}`);

        // Simple static checks
        const hasH1 = code.includes('<h1') || code.includes('Heading') || code.includes('Hero');
        if (!hasH1) {
          console.warn(`  ⚠️ Potential issue: Might be missing <h1> or uses custom heading component.`);
        }

        const hasMetadata = code.includes('export const metadata') || code.includes('generateMetadata');
        if (!hasMetadata) {
          console.warn(`  ⚠️ Potential issue: No metadata or generateMetadata found.`);
        }
      }
    });
  }

  checkDir(appDir);
}
