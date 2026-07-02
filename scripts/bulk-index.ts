import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";
import { siteUrl } from "../src/lib/seo";
import { articles } from "../src/data/articles";
import { newsArticles } from "../src/data/news";
import { portfolioItems } from "../src/data/portfolio";

// Trailing slash & double-slash sanitizer
function sanitizeUrl(url: string): string {
  const parts = url.split("://");
  if (parts.length === 2) {
    return parts[0] + "://" + parts[1].replace(/\/+/g, "/");
  }
  return url.replace(/\/+/g, "/");
}

async function run() {
  const baseUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;

  // Extract all paths matching sitemap.ts logic
  const rawUrls: string[] = [
    baseUrl,
    `${baseUrl}/about`,
    `${baseUrl}/articles`,
    `${baseUrl}/portfolio`,
    `${baseUrl}/news`,
  ];

  // 1. Portfolio items
  portfolioItems
    .filter((item) => item.slug)
    .forEach((item) => {
      rawUrls.push(`${baseUrl}/portfolio/${item.slug}`);
    });

  // 2. News categories
  const categories = [
    "ai",
    "phone",
    "game",
    "tech",
    "automotive",
    "cyber-security",
    "digital-business",
    "how-to"
  ];
  categories
    .filter((cat) => newsArticles.some((art) => art.categorySlug === cat))
    .forEach((cat) => {
      rawUrls.push(`${baseUrl}/news/${cat}`);
    });

  // 3. News Article details
  newsArticles
    .filter((art) => art.slug && art.categorySlug)
    .forEach((art) => {
      rawUrls.push(`${baseUrl}/news/${art.categorySlug}/${art.slug}`);
    });

  // 4. Articles
  articles
    .filter((article) => article.slug && !article.categorySlug)
    .forEach((article) => {
      rawUrls.push(`${baseUrl}/articles/${article.slug}`);
    });

  // Sanitize all URLs
  const sanitizedUrls = rawUrls.map(sanitizeUrl);

  console.log(`[INFO] Extracted ${sanitizedUrls.length} unique URLs to index.`);

  // Service Account credentials setup
  const credentialsPath = path.resolve(__dirname, "../google-credentials.json");
  if (!fs.existsSync(credentialsPath)) {
    console.error(
      `\x1b[31m[ERROR] Service account credentials file not found at: ${credentialsPath}\x1b[0m`
    );
    console.error(
      `Please create the file 'google-credentials.json' at your project root containing your Google Service Account keys.`
    );
    process.exit(1);
  }

  let creds;
  try {
    creds = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
  } catch (err: any) {
    console.error(
      `\x1b[31m[ERROR] Failed to parse google-credentials.json: ${err.message}\x1b[0m`
    );
    process.exit(1);
  }

  if (!creds.client_email || !creds.private_key) {
    console.error(
      `\x1b[31m[ERROR] Invalid credentials format. Ensure client_email and private_key are present.\x1b[0m`
    );
    process.exit(1);
  }

  // Google OAuth setup for indexing scope
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  const indexing = google.indexing({
    version: "v3",
    auth: auth,
  });

  // Rate-limiting constraints: Google Indexing API limit is 200 requests per day.
  // We will process them sequentially with a slight delay to avoid rate issues and respect bounds.
  const QUOTA_LIMIT = 200;
  const urlsToProcess = sanitizedUrls.slice(0, QUOTA_LIMIT);

  if (sanitizedUrls.length > QUOTA_LIMIT) {
    console.warn(
      `\x1b[33m[WARNING] Found ${sanitizedUrls.length} URLs. Truncating to the first ${QUOTA_LIMIT} URLs to avoid exceeding the daily rate quota limit.\x1b[0m`
    );
  }

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < urlsToProcess.length; i++) {
    const url = urlsToProcess[i];
    const progress = `[${i + 1}/${urlsToProcess.length}]`;
    try {
      const res = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: "URL_UPDATED",
        },
      });

      if (res.status === 200) {
        successCount++;
        console.log(
          `\x1b[32m[SUCCESS] ${progress} Indexing Request Dispatched: ${url} (Status 200)\x1b[0m`
        );
      } else {
        failureCount++;
        console.error(
          `\x1b[31m[ERROR] ${progress} Failed to Dispatch Indexing for: ${url} (HTTP ${res.status})\x1b[0m`
        );
      }
    } catch (error: any) {
      failureCount++;
      const errMsg = error.response?.data?.error?.message || error.message || error;
      console.error(
        `\x1b[31m[ERROR] ${progress} Failed to Dispatch Indexing for: ${url} - ${errMsg}\x1b[0m`
      );
    }

    // Add a tiny sleep delay of 100ms to be gentle on rate limits
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log(`\n=== Indexing Run Completed ===`);
  console.log(`\x1b[32mSuccessfully dispatched: ${successCount}\x1b[0m`);
  if (failureCount > 0) {
    console.log(`\x1b[31mFailed dispatches: ${failureCount}\x1b[0m`);
  }
}

run().catch((err) => {
  console.error(`\x1b[31m[FATAL] Script crashed with error: ${err.message}\x1b[0m`);
  process.exit(1);
});
