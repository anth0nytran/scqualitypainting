import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://www.southcoastqualitypaint.com").replace(/\/+$/, "");
const TODAY = new Date().toISOString().slice(0, 10);

// Keep in sync with SERVICES in src/lib/services.ts
const serviceSlugs = [
  "interior-painting",
  "exterior-painting",
  "cabinet-painting",
  "wood-staining",
  "venetian-plaster",
];

// Keep in sync with AREAS in src/lib/areas.ts
const areaSlugs = [
  "river-oaks",
  "memorial",
  "west-university-place",
  "tanglewood-uptown",
  "bellaire",
  "the-woodlands",
  "sugar-land",
  "katy-cinco-ranch",
  "houston-heights",
  "montrose-upper-kirby",
  "meyerland-braeswood",
  "energy-corridor",
  "spring-branch",
  "cypress",
  "spring-klein-tomball",
  "kingwood",
  "missouri-city",
  "fulshear-richmond",
  "pearland-manvel",
  "montgomery-magnolia",
  "waller-hockley",
];

const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  // One indexable page per service — the core of the SEO rebuild.
  ...serviceSlugs.map((slug) => ({
    path: `/${slug}`,
    changefreq: "monthly",
    priority: "0.9",
  })),
  { path: "/areas-we-serve", changefreq: "monthly", priority: "0.8" },
  // Local landing pages for the target ZIP codes.
  ...areaSlugs.map((slug) => ({
    path: `/painting/${slug}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

const publicDir = path.resolve(process.cwd(), "public");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

// AI answer-engine crawlers we explicitly welcome (AEO/GEO).
const aiBots = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web",
  "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended",
  "Applebot-Extended", "Bingbot", "Amazonbot", "Bytespider",
];

const robots = `# South Coast Quality Painting, Inc.
User-agent: *
Allow: /
Disallow: /api/

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE_URL}/sitemap.xml
`;

await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(publicDir, "robots.txt"), robots, "utf8");

console.log(`Generated sitemap.xml and robots.txt for ${SITE_URL}`);
