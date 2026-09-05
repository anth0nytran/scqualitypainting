# SEO + GEO + AEO Audit — South Coast Quality Painting, Inc.

**Date:** 2026-09-04 · **Revision 2** (deeper pass: live-site verification, rendered-DOM crawl of all 32 routes, expanded competitor set)
**Domain:** https://www.southcoastqualitypaint.com
**Source of truth:** local codebase — `C:\Users\antho\Desktop\southcoast -website`
**Primary goal (client-selected):** AI citation — being named by ChatGPT, Perplexity, Gemini and Claude for Houston painting and plaster queries.

---

## Corrections to Revision 1

Rev 1 measured word counts from the **source content catalogs**, not the rendered pages. A real-browser crawl of all 32 routes corrects this:

| Metric | Rev 1 (wrong) | Rev 2 (measured in browser) |
|---|---|---|
| Service page words | 557 avg | **967 avg** (772–1,172) |
| Area page words | 129 avg | **794 avg** (759–839) |
| Images missing alt | not checked | **0** — all 44 have alt; 13 are correctly decorative (`alt=""` + `aria-hidden`) |
| H1 integrity | not checked | **Perfect** — exactly one H1 on all 32 |
| Heading order | not checked | **Perfect** — zero level jumps across 32 pages |

**Consequence:** the Rev 1 Critical "area pages are thin" was the wrong diagnosis. The pages are not short. The real issue is the **boilerplate ratio** — see H1 below. Rev 1 finding H4 ("half the depth of the leader") is also withdrawn; service pages are now at parity with the plaster leader.

---

## Assumptions

- The rebuild is **committed but not deployed**. All live-site findings below describe production as it stands today.
- 18 reviews supplied by the client from Google; truncated ones store only visible text. Nothing invented.
- Every gathered review is 5 stars, so `aggregateRating` is 5.0 / 18. **Verify against live GBP before deploy.**
- Competitors researched, not client-supplied.

---

## Grades

| Category | Weight | Score | Grade | Projected |
|---|---|---|---|---|
| SEO Core | 50% | 91 | A− | 96 |
| AEO | 20% | 84 | B | 94 |
| GEO | 20% | 61 | D+ | 88 |
| Local + Entity | 10% | 50 | F | 88 |
| **Weighted** | | **80** | **B−** | **93 (A)** |

SEO Core rose from Rev 1 (88 → 91) once real word counts, heading integrity and image alts were measured. GEO and Local are unchanged and remain the weak axes — which matters, because AI citation is the stated goal and those two are exactly what generative engines use to decide whether a business is real.

---

## CRITICAL FINDINGS

### C0 — Production serves an empty application shell on every URL `[SEO] [AEO] [GEO]`
**This is the finding that explains "everybody thinks we do plaster only."**

Two independent non-JS fetches of the live site returned:

| URL fetched | Title returned | Body content |
|---|---|---|
| `/` | "Venetian Plaster Houston — Architectural Finishes & Painting \| South Coast" | none |
| `/services` | **the same home-page title** | *"appears to be an empty application shell with no visible body text"* |

Neither fetch found the words *wood staining*, *cabinet painting* or *interior painting* anywhere. No H1. No H2s. No body copy.

That is precisely what GPTBot, PerplexityBot, ClaudeBot and Applebot-Extended see today: **one plaster-titled empty page.** Google renders JavaScript and copes; the AI engines largely do not. There is no amount of on-page copy that fixes this while it ships as a client-rendered SPA.

**Fix:** already built — the prerender step produces 32 real HTML files with correct titles, meta, canonicals and JSON-LD. **It only needs deploying.**
**Impact:** AI citation rate (currently structurally impossible) · indexable page count 5 → 32.
**Owner:** Dev.

### C1 — `sameAs` is an empty array `[GEO] [LOCAL]`
`index.html` ships `"sameAs": []`. Generative engines use `sameAs` to resolve that your site, GBP, Facebook and Yelp are one entity. Without it, nothing connects your site to your 18 reviews.
**Fix:** populate with GBP, Instagram, Facebook, Yelp. Facebook and Yelp URLs found (below); GBP and Instagram still needed from you.
**Impact:** AI citation rate · entity confidence. **Owner:** Dev + client.

### C2 — NAP conflict between your schema and third-party listings `[LOCAL] [GEO]`
Site schema says `addressLocality: "Houston"` with **no street address**, and `geo` coordinates 29.7604 / −95.3698 — **downtown Houston**, not your premises. Yelp and Manta both list **63 Waterford Pointe Cir, Sugar Land, TX 77479**.
Inconsistent NAP is the most common reason a local business misses the map pack, and it breaks entity resolution for AI engines.
**Fix:** choose the canonical address; make site schema, GBP, Yelp, Facebook and BBB agree exactly. If you operate as a service-area business, GBP hides the address while the site still carries the registered one.
**Impact:** local pack inclusion. **Owner:** Client + dev.

---

## HIGH FINDINGS

### H1 — Area pages are 84% shared template `[SEO]`
Rendered area pages average **794 words**, but only **~129 words differ** between any two of them. The other ~665 (service card grid, quote form, reviews, nearby areas, CTAs) is identical across all 21.

They are not thin — they are **near-duplicates**, which is the actual doorway-page risk signal. What protects them today is that the unique 129 words are genuinely specific (real neighborhood names, real local conditions like shade-driven rot in Memorial or sun-fade in Katy).
**Fix:** raise unique content to ~350 words per page — add 3 area-specific FAQs (also earns FAQPage schema, H2) and one local proof element: a completed project, a street-level detail, or a geo-alt-tagged photo.
**Impact:** ranking position for "[service] + [neighborhood]". **Owner:** Dev + client.

### H2 — Area pages have no FAQPage schema `[AEO]`
Service pages carry it; the 21 area pages do not. Verified in the crawl: the only question-shaped heading on an area page is *"What do you need done?"* — which is the embedded quote form, **not** answerable content. Area pages are exactly the queries that trigger AI Overviews and PAA.
**Fix:** add `faqs` to `AreaDef`; emit FAQPage in `AreaPage.tsx` and `prerender.mjs`. **Owner:** Dev.

### H3 — Only 18 reviews against a competitor's 263 `[LOCAL]`
Liberty Painting shows **263 reviews at 4.8 stars**. You have 18. The local-signal threshold is ≥50. This is your single largest local-pack and trust gap, and no amount of on-page work substitutes for it.
**Fix:** review-request flow targeting +10/month; ask reviewers to name the service and the neighborhood so the reviews themselves carry local keywords.
**Impact:** local pack inclusion · review count. **Owner:** Client.

### H4 — "Certified plaster specialist" names no certifying body `[GEO]`
Misha Creations states training at **the Buon Fresco School of Venetian Plastering, Washington D.C., and Nicola Vigini Studios**, plus "25+ years". An unqualified "certified" is weaker, unverifiable to an answer engine, and invites scrutiny.
**Fix:** name the issuer, or swap to a verifiable claim — "20 years laying lime plaster in Houston", which your own reviews support. **Owner:** Client.

### H5 — No owner bio, headshot or `Person` credential schema `[GEO]`
E-E-A-T Experience and Expertise have nothing to anchor to. Antonio is named throughout but never given a bio block, photo, or `Person` schema with `hasCredential`.
**Fix:** Antonio section on home + every service page, with headshot and Person schema. **Owner:** Dev + client.

### H6 — No original data or pricing anywhere `[GEO] [AEO]`
Verified across **all three** competitors: none publishes Houston pricing. **This is an open position you can simply take**, and generative engines strongly prefer sources with concrete, quotable numbers.
**Fix:** publish honest ranges plus one data point only you have. **Owner:** Client + dev.

### H7 — No warranty or guarantee stated `[AEO] [LOCAL]`
Liberty leads with a **"3-year Happiness Guarantee"**. You claim "lasts up to 10 years" on the washable flat finish but offer no formal workmanship guarantee.
**Fix:** publish whatever you actually stand behind, with its real term. **Owner:** Client.

---

## MEDIUM / LOW

- **M1.** Body H2s are not question-style. Crawl confirms service pages carry headings like *"How we do it"*, *"We also do"*, *"Ready to see samples?"* — the questions live only in FAQ H3s. Rewrite body H2s as real queries. `[AEO]`
- **M2.** No 40–60 word answer block under each H2. `[AEO]`
- **M3.** No breadcrumbs on the home page (present on all 31 others). `[AEO]`
- **M4.** Hero and gallery photography is phone-quality; the lead hero reads as an active construction site. Your Instagram reportedly holds far better assets. `[conversion]`
- **M5.** Wood-staining page reuses the cabinetry photo. `[SEO]`
- **M6.** Duplicate description and canonical tags at runtime (prerendered + react-helmet). Values agree, so harmless — but fragile. `[SEO]`
- **M7.** LocalBusiness schema lacks `hasMap`, holiday hours, `paymentAccepted`. `[LOCAL]`
- **M8.** No licence or insurance numbers published. `[LOCAL]`
- **L1.** `/privacy` is a link dead-end (0 internal links in `<main>`). `[SEO]`
- **L2.** Home-hero preload hint fires on every route. `[SEO]`
- **L3.** No article/blog surface — nothing to earn citations or links with. `[GEO]`
- **L4.** `priceRange: "$$"` is a guess; `$$$` likely fits better. `[LOCAL]`

---

## What is already strong (verified in browser)

| Check | Result |
|---|---|
| Exactly one H1 per page | ✅ 32 / 32 |
| Heading order, no level jumps | ✅ 32 / 32 |
| Image alt coverage | ✅ 44 images, 0 missing, 13 correctly decorative |
| Lazy loading | ✅ 37 of 44 |
| Click-to-call on every page | ✅ 32 / 32 |
| Orphan pages | ✅ none |
| Canonical accuracy | ✅ 32 / 32 |
| Titles ≤ 62 chars | ✅ 32 / 32 (max 61) |
| Descriptions 70–160 | ✅ 32 / 32 |
| Service page depth | ✅ 967 avg — at parity with the plaster leader |
| FAQPage schema on service pages | ✅ 5 / 5 |
| robots.txt explicitly allows AI crawlers | ✅ GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot |

---

## Competitor delta

### Venetian plaster, Houston

| | **South Coast** | Misha Creations | Fargos Art |
|---|---|---|---|
| Page word count | 1,172 | ~1,200 | ~1,200 |
| FAQ count | **7** | 5 | 4 |
| Named expert | **Antonio Benitez** | Misha | ✗ |
| Credential named | ⚠️ no issuer | ✅ 2 schools | ✗ |
| Years stated | ✗ | ✅ 25+ | ✗ |
| Cost education | ✅ **only one** | ✗ | ✗ |
| Budget tiers | ✅ **only one** | ✗ | ✗ |
| Neighborhood pages | ✅ **21** | ✗ list only | ✗ list of 10 |
| Pricing published | ✗ | ✗ | ✗ |
| Original data | ✗ | ✗ | ✗ |

### Residential painting, Houston

| | **South Coast** | Liberty Painting |
|---|---|---|
| Homepage words | 988 | ~2,800 |
| Reviews | **18** | **263 @ 4.8** |
| Service pages | 5 | 6 |
| Location pages | 21 | 22+ |
| FAQ on homepage | ✗ | 6 |
| Named owner | ✅ Antonio | ✗ (author byline only) |
| Guarantee | ✗ | ✅ 3-year |
| Pricing published | ✗ | ✗ |

**Read:** on structure you are at or above parity — 21 location pages matches Liberty's 22, and your plaster page matches the category leader's depth while beating it on FAQ count, cost education and budget tiers. You lose on three specific things: **review volume (18 vs 263), a named credential, and a stated guarantee.** None of those is a content problem.

---

## AI-engine test prompts — run monthly, log "named / not named"

1. Best Venetian plaster company in Houston
2. Who does Venetian plaster in River Oaks Houston?
3. Best house painters in Memorial Houston
4. Who should I hire to paint kitchen cabinets in Bellaire TX?
5. Is there a flat paint that can be washed? ← *your ownable term*
6. Why is Venetian plaster so expensive? ← *your education content targets this exactly*
7. Misha Creations vs South Coast Quality Painting — which is better for Venetian plaster?
8. Painters near 77019

Run each in ChatGPT, Perplexity, Gemini and Claude. Record whether South Coast is named and whether the site is cited.

**Baseline expectation:** today the answer is almost certainly "not named" for all eight, because of C0 — the engines have no content to read.

---

## 60–90 day roadmap (sequenced for AI citation)

| Weeks | Focus | Tasks | Expected impact | Owner |
|---|---|---|---|---|
| **1–2** | **Ship + entity** | **Deploy the rebuild (fixes C0).** Populate `sameAs`. Resolve the Houston/Sugar Land NAP conflict across site, GBP, Yelp, Facebook. Add Person schema + Antonio bio and headshot. Settle credential wording. Submit the 32-URL sitemap to GSC and Bing. | 5 → 32 indexable pages; AI crawlers see real content for the first time; baseline "named" rate becomes measurable | Dev + client |
| **3–4** | **AEO depth** | 3 FAQs per area page + FAQPage schema (H1, H2). Rewrite body H2s as questions with 40–60 word answers (M1, M2). Publish pricing ranges (H6). Add breadcrumbs to home (M3). Launch review flow, +10/month (H3). | AI Overview / PAA inclusion; area pages exit near-duplicate risk | Dev + client |
| **5–8** | **Authority** | Two pillar articles: "What Venetian plaster costs in Houston and why" and "The only washable flat finish in Houston". Add one original statistic from job records. Expert pull-quote per money page. Publish guarantee (H7) and licence/insurance (M8). Seed Crunchbase + 5 directories. | Citation rate in Perplexity and ChatGPT; long-tail impressions | Client + dev |
| **9–12** | **Compounding** | Internal-linking sweep; fix the `/privacy` dead end. 6+ geo-alt-tagged project photos per service page from Instagram (M4, M5). Re-run the 8 prompts and log deltas. Core Web Vitals on the heaviest page. Expand ZIP coverage if area pages convert. | "Named by AI" rate; local pack for secondary ZIPs | Dev + client |

---

## Manual verification — needed from you

1. **Google Business Profile URL** — for `sameAs`, and to confirm 18 reviews matches live GBP.
2. **Instagram URL.**
3. **Confirm the business address** — Houston (site) vs 63 Waterford Pointe Cir, Sugar Land 77479 (Yelp, Manta). Storefront or service-area business?
4. **Plaster certification issuer** — or approval to use a tenure claim.
5. **Years in business** — a review implies 20 years. May we state it publicly?
6. **Antonio headshot.**
7. **Better project photography** from Instagram.
8. **Pricing ranges** you will publish.
9. **Guarantee terms** you actually stand behind.
10. **Licence / insurance numbers**, if you want them published.

**Found — confirm only:**
- Facebook — `facebook.com/people/South-Coast-Quality-Painting-Inc/61590572271222/`
- Yelp — `yelp.com/biz/south-coast-quality-painting-sugar-land`

**Confirmed:** **(713) 539-8069** is correct across Yelp and Manta. The `713-539-8096` in your email signature is a typo.
