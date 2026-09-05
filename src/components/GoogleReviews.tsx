import { useState } from "react";
import { Star, ExternalLink, ChevronDown } from "lucide-react";
import {
    REVIEWS,
    REVIEW_COUNT,
    AVERAGE_RATING,
    GBP_URL,
    type Review,
} from "@/lib/reviews";

/* ============================================================
   Google-style verified review wall.

   Two problems this solves:
   1. Review lengths vary enormously (Anthony Tran's is ~1,050
      characters, Roxana's is ~80). In an equal-height grid that
      produced one giant card beside several tiny ones.
      Fix: CSS multi-column masonry so cards flow to their natural
      height with no dead space, PLUS a clamp on long reviews so
      no single card can dominate the wall.
   2. The reviews did not read as *real*. Fix: present them the
      way Google does — G logo, rating summary, avatar initials,
      relative dates, and a link straight to the live profile.

   All 17 reviews render. Text is never edited; a review Google
   truncated behind "… More" shows an ellipsis and links out.
   ============================================================ */

/** Google's four brand colors, used for the avatar ring rotation. */
const AVATAR_COLORS = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"];

const GoogleG = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
);

const Stars = ({ n = 5 }: { n?: number }) => (
    <span className="flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => (
            <Star
                key={i}
                className={i <= n ? "w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" : "w-4 h-4 text-white/20"}
                strokeWidth={1.5}
            />
        ))}
    </span>
);

/** Long reviews collapse so one card cannot dominate the wall. */
const CLAMP_CHARS = 320;

function ReviewCard({ review, index }: { review: Review; index: number }) {
    const [open, setOpen] = useState(false);
    const isLong = review.text.length > CLAMP_CHARS;
    const shown = !isLong || open ? review.text : review.text.slice(0, CLAMP_CHARS).trimEnd() + "…";
    const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
    const initial = review.author.trim().charAt(0).toUpperCase();

    return (
        <article className="mb-4 break-inside-avoid bg-ink-800 border border-cream/12 p-6">
            {/* Reviewer */}
            <header className="flex items-center gap-3 mb-4">
                <span
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[15px] font-semibold text-white"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                >
                    {initial}
                </span>
                <span className="min-w-0">
                    <span className="block text-[15px] font-medium text-cream truncate">
                        {review.author}
                    </span>
                    {review.when && (
                        <span className="block text-[13px] text-stone/85">{review.when}</span>
                    )}
                </span>
                <span className="ml-auto flex-shrink-0 opacity-60">
                    <GoogleG size={17} />
                </span>
            </header>

            <Stars n={review.rating} />

            <p className="text-[15px] text-cream/85 leading-[1.7] mt-3">
                {shown}
                {review.truncated && !isLong && (
                    <>
                        {" "}
                        <a
                            href={GBP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-auto hover:text-cream underline underline-offset-2"
                        >
                            read on Google
                        </a>
                    </>
                )}
            </p>

            {isLong && (
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-auto hover:text-cream transition-colors"
                >
                    {open ? "Show less" : "Read more"}
                    <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                </button>
            )}
        </article>
    );
}

interface GoogleReviewsProps {
    /** Show only reviews tagged with this service slug. */
    service?: string;
    /** Show only reviews tagged with this area slug. */
    area?: string;
    /** Cap the number shown; omit to show every review. */
    limit?: number;
    /** Heading above the wall. */
    heading?: string;
    /** Supporting line under the heading. */
    sub?: string;
}

export default function GoogleReviews({
    service,
    area,
    limit,
    heading = "What our customers say",
    sub,
}: GoogleReviewsProps) {
    // Relevant reviews first, then the rest — so a filtered page still
    // shows a full wall rather than two lonely cards.
    let list = REVIEWS;
    if (service) {
        const hit = REVIEWS.filter((r) => r.services.includes(service));
        list = [...hit, ...REVIEWS.filter((r) => !hit.includes(r))];
    } else if (area) {
        const hit = REVIEWS.filter((r) => r.area === area);
        list = [...hit, ...REVIEWS.filter((r) => !hit.includes(r))];
    }
    if (limit) list = list.slice(0, limit);

    return (
        <div className="w-full">
            {/* ---- Verified summary bar, styled like a Google panel ---- */}
            <div className="bg-ink-800 border border-cream/12 p-6 md:p-7 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
                    <div className="flex items-center gap-3">
                        <GoogleG size={30} />
                        <span>
                            <span className="block text-[15px] font-semibold text-cream leading-tight">
                                Google Reviews
                            </span>
                            <span className="block text-[13px] text-stone/90">
                                South Coast Quality Painting, Inc.
                            </span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4 sm:ml-auto">
                        <span className="font-serif font-semibold text-4xl text-cream leading-none">
                            {AVERAGE_RATING.toFixed(1)}
                        </span>
                        <span>
                            <Stars n={5} />
                            <span className="block text-[13px] text-stone/90 mt-1.5">
                                {REVIEW_COUNT} reviews
                            </span>
                        </span>
                    </div>

                    <a
                        href={GBP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-cream w-full sm:w-auto sm:ml-2 !px-5 !text-[12px]"
                    >
                        See on Google
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>

            {(heading || sub) && (
                <div className="text-center mb-6 mt-10">
                    {heading && (
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream tracking-[-0.01em]">
                            {heading}
                        </h2>
                    )}
                    {sub && <p className="text-[16px] text-stone mt-3">{sub}</p>}
                </div>
            )}

            {/* ---- Masonry wall: columns keep uneven cards tight ---- */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                {list.map((r, i) => (
                    <ReviewCard key={`${r.author}-${i}`} review={r} index={i} />
                ))}
            </div>

            <p className="text-center text-[14px] text-stone/85 mt-6">
                Every review above is a real Google review.{" "}
                <a
                    href={GBP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-auto hover:text-cream underline underline-offset-2"
                >
                    Verify them on our Google profile
                </a>
                .
            </p>
        </div>
    );
}
