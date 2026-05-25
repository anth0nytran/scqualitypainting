# South Coast Quality Painting, Inc. Website

Marketing website for South Coast Quality Painting, Inc. — a Houston, TX Venetian-plaster and architectural-finishes studio. Built with Vite + React + TypeScript + Tailwind CSS, including a Vercel serverless contact endpoint (`api/send.ts`) that sends leads through Resend.

## Local Development

### Frontend only
```bash
npm run dev
```

### Frontend + API routes
```bash
npm run dev:vercel
```

Use `dev:vercel` when testing the contact form because `/api/send` is served by Vercel Functions.

## Environment Variables

Create `.env` from `.env.example` and set:

- `RESEND_API_KEY`
- `LEAD_TO_EMAIL`
- `LEADS_BCC_EMAIL` (optional)
- `SITE_URL` (used for generated sitemap/robots)
- `ALLOWED_ORIGINS` (comma-separated; used by API origin checks)

## Build

```bash
npm run build
```

`prebuild` automatically regenerates:

- `public/sitemap.xml`
- `public/robots.txt`

via:

```bash
npm run seo:generate
```

## Deployment

Deploy to Vercel and set environment variables in Project Settings.

For production SEO and Google Search Console steps, see:

- `docs/PRODUCTION_SEO_CHECKLIST.md`
