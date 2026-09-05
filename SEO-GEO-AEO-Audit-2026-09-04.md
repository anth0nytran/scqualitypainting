# SEO + GEO + AEO Audit — South Coast Quality Painting, Inc.

**Date:** 2026-09-04
**Domain:** https://www.southcoastqualitypaint.com
**Source of truth:** local codebase (`C:\Users\antho\Desktop\southcoast -website`)
**Primary goal (client-selected):** AI citation — being named by ChatGPT, Perplexity, Gemini and Claude for Houston painting and plaster queries.

---

## Assumptions & scope notes

- Audit measures the **rebuilt codebase**, which is committed but **not yet deployed**. The live site still serves the previous plaster-only version, so every "live" comparison below is drift, not regression.
- All 18 reviews were supplied by the client from Google. Several were truncated by Google's "… More" link; only the visible text is stored and marked `truncated`. No review text was invented.
- Ratings: every gathered review is 5 stars, so `aggregateRating` is 5.0 / 18. **Verify this matches the live GBP count before deploy** — schema that overstates review count is a manual-action risk.
- Competitor set was researched, not client-supplied.

---

## Grades

| Category | Weight | Score | Grade | Projected after roadmap |
|---|---|---|---|---|
| SEO Core | 50% | 88 | B+ | 95 |
| AEO | 20% | 82 | B | 93 |
| GEO | 20% | 61 | D+ | 88 |
| Local + Entity | 10% | 50 | F | 90 |
| **Weighted total** | | **77** | **C+** | **92 (A-)** |

GEO and Local are the weak axes — which is unfortunate, because AI citation is the stated priority and those two are precisely what generative engines use to decide whether a business is real and worth naming.

---

## What the rebuild already fixed

| Before | After |
|---|---|
| 3 pages | **32 indexable pages** (5 service, 21 area, hub, contact, legal) |
| Every route served the home page's title/meta/canonical to non-JS crawlers | **Per-route prerendered HTML** with correct head tags + JSON-LD |
| Wood staining absent from the entire site | Dedicated `/wood-staining` page + schema + form option |
| 2 reviews in schema | **18 reviews** + `aggregateRating` |
| Titles: 31 of 33 truncated in SERPs | **0 over 62 chars** (max 61) |
| Descriptions: 16 out of range | **0 out of range** (all 70–159) |
| 4 of 7 quote-form options rejected by the API | All 7 submit |
| No `Service` / `FAQPage` schema on service pages | Both present on all 5 |

---

## Findings

### Critical

**C1. `sameAs` is an empty array.** `[GEO] [LOCAL]`
`index.html` ships `"sameAs": []`. This is the single highest-leverage GEO gap. Generative engines use `sameAs` to resolve that the website, the Google Business Profile, the Facebook page and the Yelp listing are **one entity**. Without it there is nothing tying your site to your 18 reviews.
**Fix:** populate with GBP/Maps URL, Instagram, Facebook, Yelp. Facebook and Yelp URLs were found during research and are listed under *Manual verification* below; GBP and Instagram URLs still needed from you.
**Impact:** AI citation rate; entity confidence.

**C2. NAP mismatch between site schema and third-party listings.** `[LOCAL] [GEO]`
Site schema declares `addressLocality: "Houston"` with **no street address**, and `geo` coordinates of 29.7604 / -95.3698 — which is **downtown Houston**, not your premises. Yelp and Manta both list **63 Waterford Pointe Cir, Sugar Land, TX 77479**.
Inconsistent NAP is the most common reason a local business fails to enter the map pack, and it directly undermines entity resolution for AI engines.
**Fix:** decide the canonical address, then make site schema, GBP, Yelp, Facebook and BBB agree exactly. If you operate as a service-area business, GBP should hide the address and the site should still carry the real registered one.
**Impact:** local pack inclusion; entity confidence.

**C3. Area pages are thin.** `[SEO]`
21 area pages average **129 words** of unique body copy; 16 are under 150. Google's helpful-content and doorway-page systems specifically target sets of near-identical location pages. The pages *are* individually written (each names real neighborhoods and a real local condition), which is what keeps them defensible — but they are short enough to be at risk.
**Fix:** add 3 area-specific FAQs per page (also earns `FAQPage` schema, see H1) and one local proof element — a completed project, a street-level detail, or a photo with geo-hinted alt text. Target 350+ words.
**Impact:** ranking position for "[service] + [neighborhood]" terms.

### High

**H1. Area pages carry no `FAQPage` schema.** `[AEO]`
Service pages have it; the 21 area pages do not. Area pages are exactly the queries that trigger AI Overviews and "People Also Ask".
**Fix:** add `faqs` to `AreaDef` and emit `FAQPage` in both `AreaPage.tsx` and `prerender.mjs`.

**H2. "Certified plaster specialist" names no certifying body.** `[GEO]`
Your top competitor (Misha Creations) states training at **the Buon Fresco School of Venetian Plastering, Washington D.C., and Nicola Vigini Studios**, plus "25+ years". An unqualified "certified" is weaker than a named credential and reads as unverifiable to an answer engine — and it is the kind of claim that invites scrutiny.
**Fix:** name the issuer, or replace with a verifiable equivalent ("20 years laying lime plaster in Houston" — supported by your own reviews, one of which says Antonio has cared for their home for 20 years).

**H3. No author/expert bio with credentials or headshot.** `[GEO]`
E-E-A-T "Experience + Expertise" has no anchor. Antonio is named but never given a bio block, photo, or `Person` schema with `hasCredential`.
**Fix:** add an About/Antonio section on the home page and every service page, with headshot and `Person` schema.

**H4. Service pages are ~half the depth of the category leader.** `[SEO] [AEO]`
Yours average **557 words** (plaster page 838). Misha's single plaster page is ~1,200 with 6 H2s.
**Fix:** expand the four painting pages toward 900–1,100 words with question-style H2s and 40–60 word answer blocks.

**H5. No original data or pricing ranges anywhere.** `[GEO] [AEO]`
Generative engines strongly prefer sources with concrete, quotable specifics. Neither you nor any researched competitor publishes Houston pricing — meaning this is **an open position you can take**.
**Fix:** publish honest ranges (e.g. "cabinet refinishing in Houston typically runs $X–$Y for a 30-door kitchen") plus a data point only you have ("across N Houston kitchens we refinished in 2026, the median was N doors").

### Medium

**M1. No `<Person>` schema for Antonio as a distinct entity beyond `founder`.** `[GEO]`
**M2. No breadcrumbs on the home page** (present everywhere else). `[AEO]`
**M3. Hero and gallery photography is phone-quality** and undercuts the premium positioning; the lead hero reads as an active construction site. Client Instagram reportedly has better assets. `[SEO-adjacent, conversion]`
**M4. Wood-staining page reuses the cabinetry photo.** No dedicated wood-stain image. `[SEO]`
**M5. Two `<meta name="description">` and two canonicals exist at runtime** — the prerendered static tag plus the react-helmet one. Values now agree so it is harmless, but it is fragile. `[SEO]`
**M6. `LocalBusiness` schema has no `hasMap`, no `openingHoursSpecification` exceptions, no `paymentAccepted`.** `[LOCAL]`

### Low

**L1.** Preload hint for the home hero fires on every route (harmless console warning).
**L2.** No `Article`/blog surface at all — nothing to earn citations or links with.
**L3.** `priceRange: "$$"` is a guess; consider `$$$` given the positioning.

---

## AEO checklist (site roll-up)

| Check | Status |
|---|---|
| Direct answer in first 150 words | ✅ service + area pages |
| Question-style H2s | ⚠️ FAQ only, not body H2s |
| 40–60 word answer blocks under each H2 | ❌ |
| FAQ section, 4+ Q&As | ✅ service pages (5–7) · ❌ area pages |
| `FAQPage` schema matching visible FAQ | ✅ service · ❌ area |
| `Service` / `LocalBusiness` schema | ✅ |
| Table or comparison block | ⚠️ plaster tiers only |
| Bulleted "what's included" lists | ✅ |
| Explicit units and numbers | ⚠️ "10 years", "3–5 days" present; no $ figures |
| Voice-search phrasing | ✅ FAQs |
| PAA coverage ≥3 | ⚠️ verify in SERP |
| Snippet-target paragraph ≤55 words | ✅ `lede` field |

**AEO 82 / 100.**

## GEO citability checklist

| Check | Status |
|---|---|
| Named entity clarity (brand + owner + city + service in para 1) | ✅ |
| `sameAs` links | ❌ **empty** |
| Author/owner bio with credentials + headshot | ❌ |
| Inline citations to authoritative sources | ❌ |
| Original statistics | ❌ |
| Expert quote per money page | ⚠️ home page only |
| Named comparisons | ✅ plaster vs lime wash vs faux; flat vs eggshell |
| Unique angle / ownable POV | ✅ washable flat finish; "we love picky people"; plaster cost education |
| Citation-magnet format | ✅ tier table, step lists, FAQs |
| No generic AI filler | ✅ copy is specific and voiced |
| Canonical + schema + copy agree | ✅ |
| Breadcrumbs + `BreadcrumbList` | ✅ (except home) |
| Knowledge-graph surface (Wikidata/Crunchbase/directories) | ❌ |

**GEO 61 / 100.**

---

## Competitor delta — Venetian plaster, Houston

| | **South Coast** | Misha Creations | Fargos Art | Mud Monster Stucco |
|---|---|---|---|---|
| Dedicated plaster page | ✅ | ✅ | ✅ | ✅ |
| Word count | 838 | ~1,200 | verify | verify |
| FAQ count | **7** | 5 | verify | verify |
| `FAQPage` schema | ✅ | verify | verify | verify |
| Named expert | Antonio Benitez | Misha | ❌ | ❌ |
| Credential named | ⚠️ "certified", no issuer | ✅ 2 named schools | ❌ | ❌ |
| Years stated | ❌ | ✅ 25+ | verify | verify |
| Cost education | ✅ **unique** | ❌ | ❌ | ❌ |
| Budget tiers offered | ✅ **unique** | ❌ | ❌ | ❌ |
| Neighborhood pages | ✅ **21** | ❌ (one list) | ❌ | ❌ |
| Reviews in schema | 18 | verify | verify | verify |
| Original data | ❌ | ❌ | ❌ | ❌ |

**Read:** you already out-structure every one of them on breadth (21 area pages vs zero) and on cost transparency. You lose on **named credentials and stated tenure** — the two things a generative engine quotes when it explains *why* it recommended someone.

---

## AI-engine test prompts (run these monthly, record "named / not named")

1. "Best Venetian plaster company in Houston"
2. "Who does Venetian plaster in River Oaks Houston?"
3. "Best house painters in Memorial Houston"
4. "Who should I hire to paint kitchen cabinets in Bellaire TX?"
5. "Is there a flat paint that can be washed?" ← your ownable term
6. "Why is Venetian plaster so expensive?" ← your education content targets this
7. "Misha Creations vs South Coast Quality Painting — which is better for Venetian plaster?"
8. "Painters near 77019"

Run each in ChatGPT, Perplexity, Gemini and Claude. Log whether South Coast is named and whether the site is cited as a source.

---

## 60–90 day roadmap (sequenced for AI citation)

| Weeks | Focus | Tasks | Expected impact | Owner |
|---|---|---|---|---|
| **1–2** | Entity foundation | Deploy the rebuild. Populate `sameAs` (GBP, Instagram, Facebook, Yelp). Resolve the Houston/Sugar Land NAP conflict across site + GBP + Yelp + Facebook. Add `Person` schema + Antonio bio and headshot. Resolve the credential wording (H2). Submit new sitemap in GSC + Bing. | Entity resolved in AI engines; baseline "named" rate measurable | Dev + client |
| **3–4** | AEO depth | Add 3 FAQs per area page + `FAQPage` schema. Add question-style H2s with 40–60 word answers to all 5 service pages. Expand the 4 painting pages to 900+ words. Publish cabinet + interior pricing ranges. | AI Overview / PAA inclusion; area pages exit thin-content risk | Dev |
| **5–8** | Authority & original data | Publish 2 pillar articles: "What Venetian plaster costs in Houston and why" and "The only washable flat finish in Houston". Add one original statistic drawn from your own job records. Add expert pull-quote to each money page. Seed Crunchbase + 5 industry directories. Start review velocity (+10/mo, ask reviewers to name the service and neighborhood). | Citation rate in Perplexity/ChatGPT; long-tail impressions | Client + dev |
| **9–12** | Compounding | Internal-linking sweep across service ↔ area pages. Add 6+ geo-alt-tagged project photos per service page from Instagram. Re-run the 8 test prompts and log deltas. Tune Core Web Vitals on the heaviest page. Expand to remaining ZIPs if area pages are converting. | "Named by AI" rate; local pack for secondary ZIPs | Dev + client |

---

## Manual verification — I need these from you

1. **Google Business Profile URL** — required for `sameAs` and to confirm the 18-review count matches schema.
2. **Instagram URL.**
3. **Confirm the business address.** Site says Houston; Yelp and Manta say 63 Waterford Pointe Cir, Sugar Land TX 77479. Which is canonical, and is this a storefront or a service-area business?
4. **The plaster certification** — issuer name, or approval to swap to a tenure claim instead.
5. **Years in business** — a review says Antonio has served them 20 years. Can we state that publicly?
6. **Antonio headshot** for the bio block.
7. **Better project photography** from Instagram — hero and gallery are the weakest visual assets.
8. **Pricing ranges** you are willing to publish.

Two URLs were found during research and need only your confirmation:
- Facebook: `https://www.facebook.com/people/South-Coast-Quality-Painting-Inc/61590572271222/`
- Yelp: `https://www.yelp.com/biz/south-coast-quality-painting-sugar-land`

Also confirmed: **(713) 539-8069** is correct across Yelp and Manta — the `713-539-8096` in your email signature is a typo worth fixing.
