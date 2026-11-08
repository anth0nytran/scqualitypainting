import type { BlogPost } from "./types";
import { blogBatch1 } from "./batch-1";
import { blogBatch2 } from "./batch-2";
import { blogBatch3 } from "./batch-3";

export type { BlogPost, BlogFAQ, BlogCategory } from "./types";

/* ============================================================
   Blog registry.

   Content calendar: 6 posts a month, Nov 2026 – Jan 2027.
   Posts are written ahead with future dates and stay hidden
   until their date arrives in Houston (America/Chicago). The
   daily cron in vercel.json rebuilds the site so each post
   goes live on its own date. To add a month, write a new
   batch file and add it here.
   ============================================================ */

export const ALL_POSTS: BlogPost[] = [...blogBatch1, ...blogBatch2, ...blogBatch3].sort((a, b) =>
    b.date.localeCompare(a.date)
);

/** Today's date in Houston, YYYY-MM-DD. */
export const houstonToday = (now: Date = new Date()): string =>
    new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Chicago",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(now);

export const isPublished = (post: BlogPost, today: string = houstonToday()) => post.date <= today;

/** Published posts, newest first. */
export const publishedPosts = (today: string = houstonToday()) => ALL_POSTS.filter((p) => isPublished(p, today));

export const getPost = (slug: string) => ALL_POSTS.find((p) => p.slug === slug);

export const formatPostDate = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

/** Post HTML with links to not-yet-published posts turned into plain
 *  text, so an early post never links to a page that doesn't exist yet.
 *  The links appear automatically once the target post goes live. */
export const renderPostContent = (post: BlogPost, today: string = houstonToday()) =>
    post.content.replace(/<a\s+href="\/blog\/([a-z0-9-]+)"[^>]*>([\s\S]*?)<\/a>/g, (whole, slug: string, text: string) => {
        const target = getPost(slug);
        return target && isPublished(target, today) ? whole : text;
    });
