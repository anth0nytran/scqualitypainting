import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SEO from "../hooks/useSEO";
import { SITE_URL } from "@/lib/services";
import { publishedPosts, formatPostDate, type BlogCategory } from "@/lib/blog";

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease, delay },
});

const CATEGORIES: (BlogCategory | "All")[] = ["All", "Venetian Plaster", "Custom Finishes", "Painting", "Homeowner Guides"];

export default function BlogIndex() {
    const posts = publishedPosts();
    const [cat, setCat] = useState<BlogCategory | "All">("All");
    const shown = cat === "All" ? posts : posts.filter((p) => p.category === cat);
    const [lead, ...rest] = shown;

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${SITE_URL}/blog#blog`,
            name: "South Coast Quality Painting Journal",
            url: `${SITE_URL}/blog`,
            publisher: { "@id": `${SITE_URL}/#business` },
            blogPost: posts.map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                url: `${SITE_URL}/blog/${p.slug}`,
                datePublished: p.date,
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
            ],
        },
    ];

    return (
        <div className="bg-ink w-full text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Venetian Plaster & Painting Advice | South Coast Journal"
                description="Straight answers on Venetian plaster, lime wash, Tadelakt, custom finishes and painting for Houston homes, from Antonio Benitez of South Coast."
                path="/blog"
                schema={schema}
            />

            <section className="relative">
                <div className="bg-ink h-20 md:h-[72px]" />
                <div className="bg-offwhite text-ink">
                    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
                        <motion.span {...fadeUp()} className="eyebrow block mb-5">The Journal</motion.span>
                        <motion.h1
                            {...fadeUp(0.06)}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-ink leading-[1.08] tracking-[-0.01em] mb-5"
                        >
                            Plaster, finishes and paint, explained.
                        </motion.h1>
                        <motion.div {...fadeUp(0.12)} className="rule-luxe mx-auto mb-7" />
                        <motion.p {...fadeUp(0.18)} className="text-[17px] md:text-lg text-ink/75 leading-[1.8] max-w-2xl mx-auto">
                            Honest, practical advice for Houston homeowners from Antonio Benitez, who has
                            painted and plastered Houston homes since 1999.
                        </motion.p>
                    </div>
                </div>
            </section>

            <section className="bg-ink py-12 md:py-16 border-t border-white/10">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="flex flex-wrap gap-2 mb-10 justify-center" role="tablist" aria-label="Filter by topic">
                        {CATEGORIES.map((c) => (
                            <button
                                key={c}
                                role="tab"
                                aria-selected={cat === c}
                                onClick={() => setCat(c)}
                                className={`px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] border transition-colors ${
                                    cat === c ? "bg-cream text-ink border-cream" : "border-white/20 text-cream/80 hover:border-cream"
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {!lead && <p className="text-center text-stone">New posts are on the way.</p>}

                    {lead && (
                        <Link
                            to={`/blog/${lead.slug}`}
                            className="group block bg-ink-800 p-8 md:p-12 mb-6 border-t-2 border-taupe hover:bg-ink-700 transition-colors duration-500"
                        >
                            <span className="eyebrow block mb-4">{lead.category} · {formatPostDate(lead.date)}</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream leading-tight mb-4 max-w-3xl">
                                {lead.title}
                            </h2>
                            <p className="text-[17px] text-stone leading-relaxed max-w-3xl mb-6">{lead.description}</p>
                            <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-cream group-hover:text-accent-auto">
                                Read · {lead.readTime} <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </Link>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {rest.map((p, i) => (
                            <motion.div key={p.slug} {...fadeUp((i % 3) * 0.05)}>
                                <Link
                                    to={`/blog/${p.slug}`}
                                    className="group flex flex-col h-full bg-ink-800 p-7 hover:bg-ink-700 transition-colors duration-500"
                                >
                                    <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent-auto mb-3">
                                        {p.category}
                                    </span>
                                    <h2 className="text-xl font-serif font-semibold text-cream leading-snug mb-3">{p.title}</h2>
                                    <p className="text-[15px] text-stone leading-relaxed mb-5 flex-1">{p.description}</p>
                                    <span className="text-[13px] text-stone/80">
                                        {formatPostDate(p.date)} · {p.readTime}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
