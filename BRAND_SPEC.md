# SOUTH COAST — Rebrand Spec (single source of truth)

You are converting a former Orange County real-estate site ("Cuervo Homes")
into the website for **South Coast Quality Painting, Inc.** — a Houston, TX
**Venetian plaster & architectural finishes studio**. Remove ALL old branding,
real-estate language, names, places, and stats. Match the architecture and
animation vocabulary of the existing code, but retone everything to the brand.

---

## 1. BUSINESS FACTS (verbatim — never invent beyond these)
- **Brand name (display):** South Coast  ·  **Legal:** South Coast Quality Painting, Inc.
- **Positioning:** A boutique architectural-finishes studio — *not* a "painting company".
  Lead with **Venetian / Tadelakt plaster & architectural finishes**; painting,
  cabinetry & exterior work are supporting services.
- **Owner / craftsman:** Antonio Benitez — Plaster Specialist (Tadelakt & Venetian plaster).
- **Location:** Houston, Texas (serves Greater Houston).
- **Service areas (use for GEO):** Houston, River Oaks, Memorial, Bellaire,
  West University Place, The Woodlands, Sugar Land, Katy, Cypress, Spring,
  Pearland, Friendswood, League City, Missouri City, Richmond, Kingwood.
- **Phone:** (713) 539-8069  →  `tel:+17135398069`
- **Email:** benitezantonio@live.com
- **Tagline options:** "Venetian Plaster & Architectural Finishes" ·
  "Where craftsmanship becomes architecture." · "The art of the finished surface."
- **Hours (reasonable default — fine to show):** Mon–Sat, 8 AM – 6 PM · Consultations by appointment.

### Services (these 6)
1. **Venetian & Tadelakt Plaster** — signature. Hand-applied lime plaster, polished
   marble-like finishes, microcement, architectural feature walls, waterproof
   Tadelakt for baths/wet areas.
2. **Residential Painting** — interior & exterior, premium prep, true-to-color finishes.
3. **Commercial Painting** — offices, retail, large-scale interiors, on-schedule.
4. **Exterior Painting** — stucco, siding, trim, weatherproofing.
5. **Cabinetry Finishing** — refinishing/repainting + proper **caulking & sealing**
   (their differentiator: most fabricators paint cabinets but don't seal/caulk the
   exterior, letting dust & moisture in → cracks. South Coast seals properly.)
6. **Color Consultation** — complimentary consultation; guidance on palette & finish.

### Real testimonials (the ONLY two real ones — use verbatim, do NOT fabricate names)
- **Cynthia Torres:** "I couldn't be happier with the results of our cabinet painting!
  The team was professional, detail-oriented, and truly transformed our kitchen. The
  finish looks flawless and fresh, like we got brand new cabinets. Everything was done
  on time and with great care. Highly recommend for anyone looking to give their space a new life!"
- **Emmanuel Diaz:** "We had an amazing experience. From start to finish, they were
  professional, punctual, and super easy to work with. The attention to detail was
  top-notch—they prepped everything thoroughly and made sure the finish was smooth and
  even. Our home looks completely refreshed and better than we imagined."

> INTEGRITY RULES: Do **not** invent review counts, star ratings, "X homes/projects",
> years-in-business numbers, licenses, or named clients. Use qualitative trust markers
> instead (e.g. "Plaster Specialist", "Interior & Exterior", "Residential & Commercial",
> "Free Consultation", "Houston, Texas", "Hand-applied lime plaster"). Aggregate rating
> schema is OMITTED; only the two real reviews may appear as Review schema.

---

## 2. VOICE & TONE
Calm, cinematic, refined, architectural, warm-luxury, human craftsmanship.
- **Never** aggressive/"Hormozi", hype, ALL-CAPS shouting headlines, "we fight for every
  dollar", urgency, exclamation spam, or contractor-clipart energy.
- Sentences are quiet and confident. Soft fades, breathing room, slow pacing.
- Headlines read like a design studio: "Where craftsmanship becomes architecture.",
  "The finished surface, considered.", "Plaster, painting, and the spaces between."

---

## 3. COLOR — use the Tailwind tokens (already configured)
| Token | Hex | Role |
|---|---|---|
| `ink` / `bg-ink` | #111111 | Matte-black sections (primary canvas) |
| `ink-800` | #161616 | Cards on dark |
| `cream` / `text-cream` | #E8DDD0 | Main text on dark |
| `offwhite` / `bg-offwhite` | #F5F2EC | Light sections |
| `stone` | #B8B1A7 | Muted text / neutral |
| `taupe` / `text-taupe` | #8C7B6B | THE accent (replaces all old yellow) |
| `accent` | #8C7B6B | alias of taupe (so existing `text-accent`/`bg-accent` recolor automatically) |

**Replace hardcoded colors:**
- `bg-black` → `bg-ink` · `bg-white` → `bg-offwhite` · `bg-neutral-950/[#0a0a0a]` → `bg-ink-900`
- `text-white` → `text-cream` · `text-black` → `text-ink`
- `text-neutral-300/400` (on dark) → `text-stone` · `text-neutral-500/600` → `text-stone/70`
- `border-white/10` stays (ok on dark); `border-black/[0.08]` → `border-ink/10`
- Selection: `selection:bg-taupe selection:text-offwhite`
- Alternate **dark (ink + cream)** and **light (offwhite + ink)** sections for rhythm.

---

## 4. TYPOGRAPHY — the defining change
Fonts are remapped in tailwind: `font-serif` = **Cormorant Garamond**, `font-sans` = **Montserrat**.
- **Display headings:** `font-serif font-light` (300–400), normal case (Title Case, NOT uppercase),
  generous `tracking-[0.04em]`–`tracking-wide`, large & airy. REMOVE `font-black`,
  REMOVE `uppercase`, REMOVE `tracking-tight` from big headlines. They should feel elegant, not bold.
- **Eyebrows / labels:** `font-sans font-light uppercase` + `tracking-[0.3em]`, ~11px, `text-taupe`.
  (You may use the `.eyebrow` component class.)
- **Body:** `font-sans font-light` (300), `text-stone` on dark / `text-ink/70` on light,
  `leading-relaxed`, slight `tracking-[0.01em]`.
- **Buttons / CTAs:** `font-sans font-light tracking-[0.25em] uppercase text-[11px]`. Calm, not "BLACK".
  Primary CTA on dark = `bg-cream text-ink hover:bg-offwhite`; on light = `bg-ink text-cream`.
  Avoid heavy glow shadows; keep transitions soft (`duration-500/700`).
- Keep framer-motion but prefer soft fades / gentle `y` rises; lengthen durations slightly.

---

## 5. LOGO — use the component (already built): `src/components/Logo.tsx`
```tsx
import Logo, { Monogram } from "@/components/Logo";        // or relative path
<Logo variant="full" colorClassName="text-cream" monogramSize={40} />   // nav/footer on dark
<Logo variant="full" colorClassName="text-ink" />                        // on light
<Monogram size={28} className="text-cream" />                            // compact mark
```
Never reference old `/c_homes/*` logos or "Cuervo".

---

## 6. IMAGE ASSETS (already generated — use these exact paths)
Heroes (have `-1600.webp` and `-2560.webp`):
- `/projects/hero/plaster-mural-{1600,2560}.webp` — signature Venetian mural wall
- `/projects/hero/luxury-kitchen-{1600,2560}.webp`
- `/projects/hero/grand-staircase-{1600,2560}.webp`
- `/projects/hero/estate-exterior-{1600,2560}.webp`

Service / section singles (1400–1600w webp):
- `/services/hero.webp` `/services/plaster.webp` `/services/residential.webp`
  `/services/commercial.webp` `/services/exterior.webp` `/services/cabinetry.webp`
  `/services/process.webp` `/services/cta.webp`
- `/contact/panel.webp`  ·  `/about/craftsmanship.webp`

Portfolio tiles (square 1000px): `/projects/gallery/01.webp` … `/projects/gallery/16.webp`
OG image: `/og/south-coast-og.jpg`

Do NOT use Unsplash URLs or `/neighborhoods/*` or `/c_homes/*` (deleted). Use the assets above.
Alt text: descriptive + keyword-aware, e.g. "Hand-troweled Venetian plaster feature wall, Houston".

---

## 7. SEO / AEO / GEO (organic Google)
- Domain/site URL: `https://www.southcoastqualitypaint.com`
- Every page uses the `SEO` component (`src/hooks/useSEO.tsx`) with unique title/description.
- Title formula: `Primary Keyword — Modifier | South Coast`. Lead keywords:
  *Venetian plaster Houston, Tadelakt plaster, architectural finishes Houston,
  painters Houston, cabinet painting Houston, commercial painting Houston, exterior painting Houston, microcement Houston.*
- **AEO:** keep an FAQ section with `FAQPage` JSON-LD (real, useful Q&As about plaster,
  Tadelakt, cabinet sealing, process, areas, consultation). Answers concise & directly phrased.
- **GEO:** mention Houston + service-area cities naturally in copy, alt text, headings, schema `areaServed`.
- Schema: `PaintingContractor`/`HomeAndConstructionBusiness` + `LocalBusiness` graph in index.html
  (Agent A owns index.html). Pages may add `Service`, `FAQPage`, `Review`, `BreadcrumbList` via Helmet.
- Semantic HTML, one `<h1>` per page, descriptive `alt`, `loading="lazy"` on below-fold imgs.

---

## 8. CONTACT / FORM
- Form service `<select>` options & the API enum must match EXACTLY:
  `venetian-plaster` → "Venetian & Tadelakt Plaster"
  `residential` → "Residential Painting"
  `commercial` → "Commercial Painting"
  `exterior` → "Exterior Painting"
  `cabinetry` → "Cabinetry Finishing"
  `consultation` → "Free Color Consultation"
- Phone/email/area per §1. Keep honeypot + timing + validation logic intact.
- Email sending domain stays `leads@quicklaunchweb.us` (agency Resend infra) — only rebrand display text.
- Footer agency credit "Website by QuickLaunchWeb" → keep.

Build must pass `npm run build` (tsc + vite). Keep TypeScript types valid.
