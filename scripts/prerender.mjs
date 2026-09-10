/* ============================================================
   Post-build prerender.

   This is a client-rendered SPA, so every route was being served
   the same dist/index.html — with the HOME page's <title>,
   description, canonical and schema baked in. Google runs JS and
   picks up the react-helmet tags, but most AI answer-engine
   crawlers (GPTBot, PerplexityBot, ClaudeBot, Applebot) do not
   execute JavaScript. To them, every page looked identical, and
   the whole site read as "Venetian plaster studio".

   This script writes one real HTML file per route with:
     - the correct <title>, description, canonical, OG/Twitter tags
     - page-specific JSON-LD (Service / FAQPage / BreadcrumbList)
     - a <noscript> text version of the page for non-JS crawlers

   Vercel checks the filesystem before applying rewrites, so
   dist/<slug>/index.html is served directly for /<slug>.
   ============================================================ */

import { mkdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as esbuild from "esbuild";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SITE_URL = "https://www.southcoastqualitypaint.com";

/* ---- Load a TS catalog by transpiling it first ---- */
async function loadTs(relPath, cacheName) {
    const src = path.join(ROOT, ...relPath);
    const out = path.join(ROOT, "node_modules", cacheName);
    const result = await esbuild.build({
        entryPoints: [src],
        bundle: false,
        format: "esm",
        platform: "node",
        write: false,
    });
    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, result.outputFiles[0].text, "utf8");
    const mod = await import(pathToFileURL(out).href + `?t=${Date.now()}`);
    await unlink(out).catch(() => {});
    return mod;
}

const loadServices = () => loadTs(["src", "lib", "services.ts"], ".cache-services.mjs");
const loadAreas = () => loadTs(["src", "lib", "areas.ts"], ".cache-areas.mjs");

const esc = (s) =>
    String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

/* ---- Swap a single tag in the head ---- */
function setTitle(html, title) {
    return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
}

function setMetaName(html, name, content) {
    const re = new RegExp(`(<meta\\s+name="${name}"[\\s\\S]*?content=")[\\s\\S]*?(")`, "i");
    if (re.test(html)) return html.replace(re, `$1${esc(content)}$2`);
    return html.replace("</head>", `  <meta name="${name}" content="${esc(content)}" />\n</head>`);
}

function setMetaProp(html, prop, content) {
    const re = new RegExp(`(<meta\\s+property="${prop}"[\\s\\S]*?content=")[\\s\\S]*?(")`, "i");
    if (re.test(html)) return html.replace(re, `$1${esc(content)}$2`);
    return html.replace("</head>", `  <meta property="${prop}" content="${esc(content)}" />\n</head>`);
}

function setCanonical(html, url) {
    return html.replace(
        /<link rel="canonical"[^>]*>/,
        `<link rel="canonical" href="${esc(url)}" />`
    );
}

function addJsonLd(html, obj) {
    const json = JSON.stringify(obj).replace(/</g, "\\u003c");
    return html.replace(
        "</head>",
        `  <script type="application/ld+json">${json}</script>\n</head>`
    );
}

function addNoscript(html, body) {
    return html.replace('<div id="root"></div>', `<div id="root"></div>\n  <noscript>${body}</noscript>`);
}

/* ---- Build one route ---- */
function applyRoute(baseHtml, route) {
    let html = baseHtml;
    const url = `${SITE_URL}${route.path}`;

    html = setTitle(html, route.title);
    html = setMetaName(html, "description", route.description);
    html = setCanonical(html, url);

    html = setMetaProp(html, "og:url", url);
    html = setMetaProp(html, "og:title", route.title);
    html = setMetaProp(html, "og:description", route.description);
    if (route.image) html = setMetaProp(html, "og:image", `${SITE_URL}${route.image}`);

    html = setMetaName(html, "twitter:url", url);
    html = setMetaName(html, "twitter:title", route.title);
    html = setMetaName(html, "twitter:description", route.description);
    if (route.image) html = setMetaName(html, "twitter:image", `${SITE_URL}${route.image}`);

    if (route.keywords) html = setMetaName(html, "keywords", route.keywords);
    for (const node of route.schema || []) html = addJsonLd(html, node);
    if (route.noscript) html = addNoscript(html, route.noscript);

    return html;
}

/* ---- Text fallback so non-JS crawlers can read the page ---- */
function serviceNoscript(s, PHONE_DISPLAY) {
    return [
        `<h1>${esc(s.h1)}</h1>`,
        `<p>${esc(s.lede)}</p>`,
        ...s.body.map((p) => `<p>${esc(p)}</p>`),
        `<h2>What you get</h2>`,
        `<ul>${s.includes.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`,
        `<h2>${esc(s.edge.title)}</h2>`,
        `<p>${esc(s.edge.text)}</p>`,
        `<h2>Questions</h2>`,
        s.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join(""),
        `<p>Call South Coast Quality Painting at ${esc(PHONE_DISPLAY)} to book a consultation in Houston, TX.</p>`,
    ].join("\n");
}

/* ---- Main ---- */
const { SERVICES, SERVICE_AREAS, PHONE_DISPLAY } = await loadServices();
const { AREAS, ALL_ZIPS } = await loadAreas();
const baseHtml = await readFile(path.join(DIST, "index.html"), "utf8");

const cityList = SERVICE_AREAS.join(", ");

const routes = [];

/* Home — the base file already carries the home metadata. */
routes.push({
    path: "/",
    file: "index.html",
    title:
        "Houston Painters | South Coast Quality Painting",
    description:
        "Houston painting company. Interior and exterior painting, cabinets, wood staining and hand-laid Venetian plaster. Call (713) 539-8069.",
    schema: [],
    noscript: [
        `<h1>We paint Houston homes, inside and out.</h1>`,
        `<p>South Coast Quality Painting is a painting company in Houston, Texas. We do interior painting, exterior painting, cabinet painting, and wood staining for homes and businesses. We also apply Venetian plaster, which is our specialty.</p>`,
        `<h2>What we do</h2>`,
        `<ul>${SERVICES.map((s) => `<li><a href="${SITE_URL}/${s.slug}">${esc(s.label)}</a> — ${esc(s.cardBlurb)}</li>`).join("")}</ul>`,
        `<h2>Who does the work</h2>`,
        `<p>Antonio Benitez has been painting Houston homes since 1999. That is the year he started with Kickerillo Companies, the Houston custom home builder, and he has been their painter ever since — their only painter from the first house onward, with more than 2,000 custom homes painted for them.</p>`,
        `<p>Antonio is a certified plaster specialist and runs every job. He makes samples for your room and reworks them until you are happy with what you see.</p>`,
        `<p>Serving ${esc(cityList)}. Call ${esc(PHONE_DISPLAY)} to book a consultation.</p>`,
    ].join("\n"),
});

/* Services hub */
routes.push({
    path: "/services",
    file: "services/index.html",
    title:
        "Painting Services in Houston, TX | South Coast",
    description:
        "Interior and exterior painting, cabinet painting, wood staining and Venetian plaster in Houston, TX. Call (713) 539-8069.",
    schema: [
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${SITE_URL}/services#list`,
            name: "Painting and finishing services in Houston, TX",
            itemListElement: SERVICES.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.name,
                url: `${SITE_URL}/${s.slug}`,
            })),
        },
    ],
    noscript: [
        `<h1>Work worth living with.</h1>`,
        `<p>We paint homes and businesses, inside and out. We bring cabinets back to life. We stain wood. And we lay real Venetian plaster by hand.</p>`,
        `<ul>${SERVICES.map((s) => `<li><a href="${SITE_URL}/${s.slug}">${esc(s.label)}</a> — ${esc(s.cardBlurb)}</li>`).join("")}</ul>`,
        `<p>Serving ${esc(cityList)}. Call ${esc(PHONE_DISPLAY)} to book a consultation.</p>`,
    ].join("\n"),
});

/* One page per service */
for (const s of SERVICES) {
    routes.push({
        path: `/${s.slug}`,
        file: `${s.slug}/index.html`,
        title: `${s.seoTitle} | South Coast`,
        description: s.seoDescription,
        image: s.image,
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "@id": `${SITE_URL}/${s.slug}#service`,
                name: s.name,
                description: s.seoDescription,
                serviceType: s.name,
                url: `${SITE_URL}/${s.slug}`,
                provider: { "@id": `${SITE_URL}/#business` },
                areaServed: SERVICE_AREAS.map((a) => ({ "@type": "City", name: a })),
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": `${SITE_URL}/${s.slug}#faq`,
                mainEntity: s.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/${s.slug}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
                    { "@type": "ListItem", position: 3, name: s.label, item: `${SITE_URL}/${s.slug}` },
                ],
            },
        ],
        noscript: serviceNoscript(s, PHONE_DISPLAY),
    });
}

/* Contact */
routes.push({
    path: "/contact",
    file: "contact/index.html",
    title: "Book a Consultation | South Coast Quality Painting",
    description:
        "Book a consultation with Antonio Benitez for painting, cabinets, wood staining or Venetian plaster in Houston, TX. Call (713) 539-8069.",
    schema: [
        {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${SITE_URL}/contact#page`,
            url: `${SITE_URL}/contact`,
            name: "Book a private consultation in Houston, TX",
            mainEntity: { "@id": `${SITE_URL}/#business` },
        },
    ],
    noscript: [
        `<h1>Let's talk about your project</h1>`,
        `<p>Book a private consultation for painting, cabinets, wood staining, or Venetian plaster in Houston, Texas. Antonio makes samples for your room and reworks them until you are happy. Call ${esc(PHONE_DISPLAY)} or email benitezantonio@live.com.</p>`,
        `<p>Open Monday to Saturday, 8:00 AM to 6:00 PM. Serving ${esc(cityList)}.</p>`,
    ].join("\n"),
});

/* Areas hub */
routes.push({
    path: "/areas-we-serve",
    file: "areas-we-serve/index.html",
    title: "Areas We Serve | South Coast Quality Painting",
    description:
        "We paint homes in River Oaks, Memorial, West University, Tanglewood, Bellaire, The Woodlands, Sugar Land, Katy and across Houston.",
    schema: [
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${SITE_URL}/areas-we-serve#list`,
            name: "Areas served by South Coast Quality Painting",
            itemListElement: AREAS.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: a.name,
                url: `${SITE_URL}/painting/${a.slug}`,
            })),
        },
    ],
    noscript: [
        `<h1>Where we work</h1>`,
        `<p>South Coast Quality Painting works across Greater Houston, Texas.</p>`,
        `<ul>${AREAS.map((a) => `<li><a href="${SITE_URL}/painting/${a.slug}">${esc(a.name)}</a> — ${esc(a.zips.join(", "))}</li>`).join("")}</ul>`,
        `<p>ZIP codes served: ${esc(ALL_ZIPS.join(", "))}.</p>`,
        `<p>Call ${esc(PHONE_DISPLAY)} to book a consultation.</p>`,
    ].join("\n"),
});

/* One local landing page per target area */
for (const a of AREAS) {
    routes.push({
        path: `/painting/${a.slug}`,
        file: `painting/${a.slug}/index.html`,
        title: `${a.seoTitle} | South Coast`,
        description: a.seoDescription,
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "@id": `${SITE_URL}/painting/${a.slug}#service`,
                name: `House Painting in ${a.name}`,
                description: a.seoDescription,
                serviceType: "House Painting",
                url: `${SITE_URL}/painting/${a.slug}`,
                provider: { "@id": `${SITE_URL}/#business` },
                areaServed: {
                    "@type": "City",
                    name: a.name,
                    address: {
                        "@type": "PostalAddress",
                        addressRegion: "TX",
                        addressCountry: "US",
                    },
                },
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/painting/${a.slug}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                    { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve` },
                    { "@type": "ListItem", position: 3, name: a.name, item: `${SITE_URL}/painting/${a.slug}` },
                ],
            },
        ],
        noscript: [
            `<h1>${esc(a.h1)}</h1>`,
            ...a.body.map((para) => `<p>${esc(para)}</p>`),
            `<h2>What we get asked for most in ${esc(a.shortName)}</h2>`,
            `<ul>${a.focus.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`,
            `<h2>Neighborhoods we work in</h2>`,
            `<p>${esc(a.neighborhoods.join(", "))}. ZIP codes: ${esc(a.zips.join(", "))}.</p>`,
            `<h2>Our services in ${esc(a.shortName)}</h2>`,
            `<ul>${SERVICES.map((sv) => `<li><a href="${SITE_URL}/${sv.slug}">${esc(sv.label)} in ${esc(a.shortName)}</a></li>`).join("")}</ul>`,
            `<p>Call South Coast Quality Painting at ${esc(PHONE_DISPLAY)} to book a consultation.</p>`,
        ].join("\n"),
    });
}

/* Legal pages — indexable but low priority */
routes.push({
    path: "/privacy",
    file: "privacy/index.html",
    title: "Privacy Policy | South Coast",
    description:
        "How South Coast Quality Painting, Inc. collects, uses, and protects your information.",
    schema: [],
});
routes.push({
    path: "/terms",
    file: "terms/index.html",
    title: "Terms of Service | South Coast",
    description: "The terms that apply when you use the South Coast Quality Painting website.",
    schema: [],
});

for (const route of routes) {
    const html = applyRoute(baseHtml, route);
    const dest = path.join(DIST, route.file);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, html, "utf8");
}

console.log(`Prerendered ${routes.length} routes:`);
for (const r of routes) console.log(`  ${r.path.padEnd(20)} → dist/${r.file}`);
