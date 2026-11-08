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
        bundle: true,
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
const loadGuide = () => loadTs(["src", "lib", "hiringGuide.ts"], ".cache-guide.mjs");
const loadBlog = () => loadTs(["src", "lib", "blog", "index.ts"], ".cache-blog.mjs");
const loadGlossary = () => loadTs(["src", "lib", "glossary.ts"], ".cache-glossary.mjs");
const loadReviews = () => loadTs(["src", "lib", "reviews.ts"], ".cache-reviews.mjs");

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
    if (route.type) html = setMetaProp(html, "og:type", route.type);
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
        `<p><strong>Quick answer:</strong> ${esc(s.quickAnswer ?? s.body[0])}</p>`,
        `<p>Written by Antonio Benitez, owner of South Coast Quality Painting, painting Houston homes since 1999.</p>`,
        ...(s.quickAnswer ? s.body : s.body.slice(1)).map((p) => `<p>${esc(p)}</p>`),
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
const { SERVICES, CUSTOM_FINISHES, ALL_SERVICE_PAGES, SERVICE_AREAS, PHONE_DISPLAY, isFinish } = await loadServices();
const { publishedPosts, houstonToday, renderPostContent } = await loadBlog();
const { GLOSSARY } = await loadGlossary();
const { REVIEWS, REVIEW_COUNT, AVERAGE_RATING } = await loadReviews();
const TODAY_HOUSTON = houstonToday();
const POSTS = publishedPosts(TODAY_HOUSTON);
const { AREAS, ALL_ZIPS, areaFaqs } = await loadAreas();
const G = await loadGuide();
const baseHtml = await readFile(path.join(DIST, "index.html"), "utf8");

const cityList = SERVICE_AREAS.join(", ");

const routes = [];

/* Home — the base file already carries the home metadata. */
routes.push({
    path: "/",
    file: "index.html",
    title: "Venetian Plaster & Custom Finishes Houston | South Coast",
    description:
        "Venetian plaster, lime wash, Tadelakt, microcement and any custom finish, matched by hand in Houston. Plus painting, cabinets and staining. Call (713) 539-8069.",
    schema: [],
    noscript: [
        `<h1>Venetian plaster and custom finishes, laid by hand in Houston.</h1>`,
        `<p>South Coast Quality Painting is a Houston custom-finish and painting company. Antonio Benitez hand-applies Venetian plaster, lime wash, Tadelakt, microcement, liquid metal and suede finishes, and can match an existing custom finish. The same crew also does interior and exterior painting, cabinet refinishing and wood staining.</p>`,
        `<h2>Custom finishes</h2>`,
        `<ul>${CUSTOM_FINISHES.map((s) => `<li><a href="${SITE_URL}/${s.slug}">${esc(s.label)}</a> — ${esc(s.cardBlurb)}</li>`).join("")}</ul>`,
        `<h2>Painting, cabinets and staining</h2>`,
        `<ul>${SERVICES.filter((s) => s.slug !== "venetian-plaster").map((s) => `<li><a href="${SITE_URL}/${s.slug}">${esc(s.label)}</a> — ${esc(s.cardBlurb)}</li>`).join("")}</ul>`,
        `<h2>Homeowner guides</h2>`,
        `<ul>${POSTS.slice(0, 6).map((p) => `<li><a href="${SITE_URL}/blog/${p.slug}">${esc(p.title)}</a></li>`).join("")}<li><a href="${SITE_URL}/hiring-a-painter">How to hire a painter without losing your deposit</a></li></ul>`,
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
        "Painting, Cabinets & Staining in Houston, TX | South Coast",
    description:
        "Interior and exterior painting, kitchen cabinet painting and wood staining in Houston, from the team behind our Venetian plaster. Call (713) 539-8069.",
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

/* One page per service and per custom finish */
for (const s of ALL_SERVICE_PAGES) {
    const finish = isFinish(s.slug);
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
                    finish
                        ? { "@type": "ListItem", position: 2, name: "Custom Finishes", item: `${SITE_URL}/custom-finishes` }
                        : { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
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
        "Painting and Venetian plaster in River Oaks, Memorial and the Villages, Lake Conroe, Tanglewood, West University, The Woodlands and Sugar Land.",
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
    const faqs = areaFaqs(a);
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
                "@type": "FAQPage",
                "@id": `${SITE_URL}/painting/${a.slug}#faq`,
                mainEntity: faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
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
            `<h2>Painting in ${esc(a.shortName)}: common questions</h2>`,
            faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join(""),
            `<p><a href="${SITE_URL}/hiring-a-painter">Antonio's before-you-hire checklist</a></p>`,
            `<p>Call South Coast Quality Painting at ${esc(PHONE_DISPLAY)} to book a consultation.</p>`,
        ].join("\n"),
    });
}

/* Consumer guide — "don't pay big deposits to people you don't know" */
{
    const url = `${SITE_URL}/${G.GUIDE_SLUG}`;
    routes.push({
        path: `/${G.GUIDE_SLUG}`,
        file: `${G.GUIDE_SLUG}/index.html`,
        title: `${G.GUIDE_SEO.title} | South Coast`,
        description: G.GUIDE_SEO.description,
        image: "/about/antonio-benitez.webp",
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "@id": `${url}#article`,
                headline: G.GUIDE_SEO.title,
                description: G.GUIDE_SEO.description,
                url,
                mainEntityOfPage: url,
                image: `${SITE_URL}/about/antonio-benitez.webp`,
                datePublished: G.GUIDE_PUBLISHED,
                dateModified: G.GUIDE_UPDATED,
                inLanguage: "en-US",
                author: { "@id": `${SITE_URL}/#antonio-benitez` },
                publisher: { "@id": `${SITE_URL}/#business` },
                about: ["Hiring a painting contractor", "Contractor deposit scams", "Homeowner consumer protection"],
                spatialCoverage: { "@type": "Place", name: "Houston, Texas" },
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: G.GUIDE_FAQS.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                    { "@type": "ListItem", position: 2, name: "Before You Hire a Painter", item: url },
                ],
            },
        ],
        noscript: [
            `<h1>${esc(G.GUIDE_H1)}</h1>`,
            `<p>${esc(G.GUIDE_LEDE)}</p>`,
            `<blockquote>${G.ANTONIO_NOTE.map((p) => `<p>${esc(p)}</p>`).join("")}<p>— Antonio Benitez, owner, South Coast Quality Painting, Inc.</p></blockquote>`,
            ...G.GUIDE_SECTIONS.map((s) =>
                [
                    `<h2>${esc(s.q)}</h2>`,
                    `<p>${esc(s.answer)}</p>`,
                    s.points ? `<ul>${s.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : "",
                    s.note ? `<p>${esc(s.note)}</p>` : "",
                ].join("")
            ),
            `<h2>What are the warning signs of a painting scam?</h2>`,
            `<ul>${G.RED_FLAGS.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`,
            `<h2>Before-you-pay checklist</h2>`,
            `<ul>${G.CHECKLIST.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>`,
            `<p>Check us the same way. Ask Antonio for his ID, look up South Coast Quality Painting, Inc., and call our references. Call ${esc(PHONE_DISPLAY)}.</p>`,
        ].join("\n"),
    });
}

/* Custom finishes hub */
routes.push({
    path: "/custom-finishes",
    file: "custom-finishes/index.html",
    title: "Venetian Plaster & Custom Finishes in Houston | South Coast",
    description:
        "Venetian plaster, lime wash, Tadelakt, microcement, liquid metal and suede finishes in Houston, hand-applied by Antonio Benitez. Call (713) 539-8069.",
    schema: [
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${SITE_URL}/custom-finishes#list`,
            name: "Custom wall finishes in Houston, TX",
            itemListElement: CUSTOM_FINISHES.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.name,
                url: `${SITE_URL}/${s.slug}`,
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Custom Finishes", item: `${SITE_URL}/custom-finishes` },
            ],
        },
    ],
    noscript: [
        `<h1>Plaster, lime, metal and more. Any finish, matched by hand.</h1>`,
        `<p>Antonio Benitez lays Venetian plaster, Marmorino, Tadelakt, lime wash, microcement, liquid metal and suede finishes himself in Houston homes. If you have seen a finish you love, or need an old one matched, he makes samples in your own light until it is right.</p>`,
        `<ul>${CUSTOM_FINISHES.map((s) => `<li><a href="${SITE_URL}/${s.slug}">${esc(s.label)}</a> — ${esc(s.cardBlurb)}</li>`).join("")}</ul>`,
        `<p>Cost depends on the wall, the prep and the finish level, so Antonio prices every project after seeing it. Call ${esc(PHONE_DISPLAY)}.</p>`,
    ].join("\n"),
});

/* Glossary */
routes.push({
    path: "/glossary",
    file: "glossary/index.html",
    title: "Venetian Plaster & Finish Glossary | South Coast",
    description:
        "Plain-English definitions of Venetian plaster, Marmorino, Tadelakt, lime wash, microcement, burnishing, sheen levels and more, from South Coast in Houston.",
    schema: [
        {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "@id": `${SITE_URL}/glossary#terms`,
            name: "Venetian plaster, custom finish and painting glossary",
            url: `${SITE_URL}/glossary`,
            publisher: { "@id": `${SITE_URL}/#business` },
            hasDefinedTerm: GLOSSARY.map((t) => ({
                "@type": "DefinedTerm",
                "@id": `${SITE_URL}/glossary#${t.slug}`,
                name: t.term,
                description: t.definition,
                inDefinedTermSet: `${SITE_URL}/glossary#terms`,
            })),
        },
    ],
    noscript: [
        `<h1>Plaster, finish and paint terms, explained</h1>`,
        `<dl>${GLOSSARY.map((t) => `<dt id="${esc(t.slug)}">${esc(t.term)}</dt><dd>${esc(t.definition)}</dd>`).join("")}</dl>`,
    ].join("\n"),
});

/* Reviews */
routes.push({
    path: "/reviews",
    file: "reviews/index.html",
    title: "South Coast Quality Painting, Inc. Reviews",
    description: `Read ${REVIEW_COUNT} verified Google reviews of South Coast Quality Painting, Inc., rated ${AVERAGE_RATING} out of 5 for painting and Venetian plaster in Houston.`,
    schema: [],
    noscript: [
        `<h1>South Coast Quality Painting reviews</h1>`,
        `<p>${REVIEW_COUNT} Google reviews, rated ${AVERAGE_RATING} out of 5.</p>`,
        REVIEWS.map((r) => `<blockquote><p>${esc(r.text)}${r.truncated ? "…" : ""}</p><p>— ${esc(r.author)}</p></blockquote>`).join(""),
    ].join("\n"),
});

/* Journal index */
routes.push({
    path: "/blog",
    file: "blog/index.html",
    title: "Venetian Plaster & Painting Advice | South Coast Journal",
    description:
        "Straight answers on Venetian plaster, lime wash, Tadelakt, custom finishes and painting for Houston homes, from Antonio Benitez of South Coast.",
    schema: [
        {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${SITE_URL}/blog#blog`,
            name: "South Coast Quality Painting Journal",
            url: `${SITE_URL}/blog`,
            publisher: { "@id": `${SITE_URL}/#business` },
            blogPost: POSTS.map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                url: `${SITE_URL}/blog/${p.slug}`,
                datePublished: p.date,
            })),
        },
    ],
    noscript: [
        `<h1>Plaster, finishes and paint, explained.</h1>`,
        `<ul>${POSTS.map((p) => `<li><a href="${SITE_URL}/blog/${p.slug}">${esc(p.title)}</a> — ${esc(p.description)}</li>`).join("")}</ul>`,
    ].join("\n"),
});

/* One page per PUBLISHED post. Future-dated posts are skipped until
   the daily cron rebuild after their date. */
for (const p of POSTS) {
    const url = `${SITE_URL}/blog/${p.slug}`;
    routes.push({
        path: `/blog/${p.slug}`,
        file: `blog/${p.slug}/index.html`,
        title: `${p.title} | South Coast`,
        description: p.description,
        image: "/about/antonio-benitez.webp",
        type: "article",
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "@id": `${url}#article`,
                headline: p.title,
                description: p.description,
                url,
                mainEntityOfPage: url,
                datePublished: p.date,
                dateModified: p.dateModified ?? p.date,
                inLanguage: "en-US",
                articleSection: p.category,
                keywords: p.keywords.join(", "),
                image: `${SITE_URL}/about/antonio-benitez.webp`,
                author: { "@type": "Person", "@id": `${SITE_URL}/#antonio-benitez`, name: "Antonio Benitez", url: `${SITE_URL}/` },
                publisher: { "@id": `${SITE_URL}/#business` },
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: p.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                    { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
                    { "@type": "ListItem", position: 3, name: p.title, item: url },
                ],
            },
        ],
        noscript: [
            `<article>`,
            `<h1>${esc(p.title)}</h1>`,
            `<p>By Antonio Benitez, owner, South Coast Quality Painting. Published ${esc(p.date)}.</p>`,
            `<p><strong>Quick answer:</strong> ${esc(p.tldr)}</p>`,
            renderPostContent(p, TODAY_HOUSTON),
            `<h2>Frequently asked questions</h2>`,
            p.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join(""),
            `</article>`,
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
    path: "/accessibility",
    file: "accessibility/index.html",
    title: "Accessibility Statement | South Coast",
    description:
        "South Coast Quality Painting's commitment to an accessible website for people with disabilities, the WCAG 2.1 AA standard we follow, and how to get help.",
    schema: [],
    noscript: `<h1>Accessibility Statement</h1><p>South Coast Quality Painting, Inc. aims to meet WCAG 2.1 Level AA. If anything on this site is hard to use, call ${esc(PHONE_DISPLAY)} or email benitezantonio@live.com and we will help right away.</p>`,
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

/* ---- llms.txt: a plain-text brief for AI answer engines ----
   Built from the same catalogs as the pages, so it never drifts. */
const llms = `# South Coast Quality Painting, Inc.

> Houston, Texas custom-finish specialist and painting company run by Antonio Benitez, who has painted Houston homes since 1999 and has been the painter for Kickerillo Companies (Houston custom home builder) since that year, with more than 2,000 custom homes painted for them. Hand-applied Venetian plaster, Marmorino, Tadelakt, lime wash, Roman clay, microcement, liquid metal and suede finishes, and matching of existing custom finishes. Also interior and exterior painting, kitchen cabinet refinishing and wood staining. Prices are given only after a consultation; none are published. Works in established, high-value Houston neighborhoods and custom-home suburbs, including River Oaks, Memorial and the Villages, West University Place, Tanglewood, The Woodlands, Sugar Land, and lake homes on Lake Conroe.

Key facts:
- Legal name: South Coast Quality Painting, Inc.
- Owner: Antonio Benitez (does every consultation himself; lays every plaster wall himself)
- Phone: ${PHONE_DISPLAY}
- Email: benitezantonio@live.com
- Address: 63 Waterford Pointe Cir, Sugar Land, TX 77479
- Hours: Monday to Saturday, 8:00 AM to 6:00 PM
- How a job starts: a private consultation at the home. Antonio makes samples in the room's own light, the color is settled, then a written price.
- Google reviews: https://maps.google.com/?cid=14070245636227879405

## Custom finishes
${CUSTOM_FINISHES.map((s) => `- [${s.label}](${SITE_URL}/${s.slug}): ${s.cardBlurb}`).join("\n")}

## Painting, cabinets and staining
${SERVICES.filter((s) => s.slug !== "venetian-plaster").map((s) => `- [${s.label}](${SITE_URL}/${s.slug}): ${s.cardBlurb}`).join("\n")}

## Journal (homeowner advice)
${POSTS.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.tldr}`).join("\n")}

## Homeowner guide
- [${G.GUIDE_SEO.title}](${SITE_URL}/${G.GUIDE_SLUG}): ${G.GUIDE_SEO.description}
${G.GUIDE_FAQS.map((f) => `  - ${f.q} ${f.a}`).join("\n")}

## Areas served
${AREAS.map((a) => `- [${a.name}](${SITE_URL}/painting/${a.slug}): ${a.neighborhoods.slice(0, 6).join(", ")} (ZIP ${a.zips.join(", ")})`).join("\n")}

## Optional
- [Custom finishes hub](${SITE_URL}/custom-finishes)
- [Finish glossary](${SITE_URL}/glossary)
- [Reviews](${SITE_URL}/reviews)
- [All services](${SITE_URL}/services)
- [Areas we serve](${SITE_URL}/areas-we-serve)
- [Book a consultation](${SITE_URL}/contact)
`;
await writeFile(path.join(DIST, "llms.txt"), llms, "utf8");

const priority = (r) =>
    r.path === "/" ? "1.0"
    : r.path === "/custom-finishes" || CUSTOM_FINISHES.some((s) => `/${s.slug}` === r.path) ? "0.9"
    : r.path === "/privacy" || r.path === "/terms" ? "0.3"
    : "0.8";
const lastmod = (r) => {
    const post = POSTS.find((p) => `/blog/${p.slug}` === r.path);
    return post ? post.dateModified ?? post.date : TODAY_HOUSTON;
};
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
    .map((r) => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${lastmod(r)}</lastmod>\n    <priority>${priority(r)}</priority>\n  </url>`)
    .join("\n")}
</urlset>
`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");
console.log(`sitemap.xml: ${routes.length} URLs · llms.txt written · ${POSTS.length} posts live (Houston date ${TODAY_HOUSTON})`);

console.log(`Prerendered ${routes.length} routes:`);
for (const r of routes) console.log(`  ${r.path.padEnd(20)} → dist/${r.file}`);
