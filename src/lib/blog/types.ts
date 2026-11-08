/* ============================================================
   Blog post shape. Modeled on the roofingbyjerry blog:
   a quick-answer box (tldr) at the top for AI Overviews, an
   in-depth HTML body with question-shaped H2s and tables, and a
   structured FAQ that renders on the page AND as FAQPage schema.

   Scheduling: posts are written ahead and carry a future `date`.
   A post only appears (page, blog index, sitemap, llms.txt) once
   its date has arrived in Houston time. A daily GitHub Action
   pushes a commit on post days, so Vercel rebuilds and the post
   goes live on its own date.
   ============================================================ */

export type BlogCategory = "Venetian Plaster" | "Custom Finishes" | "Painting" | "Homeowner Guides";

export interface BlogFAQ {
    q: string;
    a: string;
}

export interface BlogPost {
    /** URL slug: the post lives at /blog/{slug} */
    slug: string;
    /** H1 and <title> (keep under ~60 characters where possible) */
    title: string;
    /** Meta description, 140–155 characters */
    description: string;
    /** Publish date, YYYY-MM-DD. Future dates stay hidden until then. */
    date: string;
    /** Optional last-updated date, YYYY-MM-DD */
    dateModified?: string;
    /** e.g. "8 min read" */
    readTime: string;
    category: BlogCategory;
    /** Target search phrases */
    keywords: string[];
    /** 50–80 word direct answer shown in a "Quick answer" box at the top */
    tldr: string;
    /** Body HTML: h2/h3/p/ul/ol/table/strong/a only. No h1, no FAQ section, no inline styles. */
    content: string;
    /** 5–6 real questions with 40–70 word answers. Rendered on the page + FAQPage schema. */
    faqs: BlogFAQ[];
    /** Slugs of service/finish pages this post supports (e.g. "venetian-plaster") */
    related: string[];
}
