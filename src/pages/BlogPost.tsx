import type { MouseEvent } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import SEO from "../hooks/useSEO";
import { getService, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/services";
import { formatPostDate, getPost, isPublished, publishedPosts, renderPostContent } from "@/lib/blog";

/* ============================================================
   /blog/:slug — built for AI answer engines:
   - Quick answer box first (the tldr), quotable on its own
   - Named author with photo + Person schema (E-E-A-T)
   - Question-shaped H2s in the body
   - Visible FAQ that matches the FAQPage schema exactly
   - Published + updated dates, shown and in schema (freshness)
   ============================================================ */

interface BlogPostProps {
    slug?: string;
}

export default function BlogPost({ slug: slugProp }: BlogPostProps = {}) {
    const params = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const slug = slugProp ?? params.slug;
    const post = slug ? getPost(slug) : undefined;

    if (!post || !isPublished(post)) return <Navigate to="/blog" replace />;

    const url = `${SITE_URL}/blog/${post.slug}`;
    const updated = post.dateModified ?? post.date;
    const services = post.related.map((s) => getService(s)).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];
    const others = publishedPosts().filter((p) => p.slug !== post.slug);
    const morePosts = [
        ...others.filter((p) => p.category === post.category),
        ...others.filter((p) => p.category !== post.category),
    ].slice(0, 3);

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.title,
            description: post.description,
            url,
            mainEntityOfPage: url,
            datePublished: post.date,
            dateModified: updated,
            inLanguage: "en-US",
            articleSection: post.category,
            keywords: post.keywords.join(", "),
            image: `${SITE_URL}/about/antonio-benitez.webp`,
            author: {
                "@type": "Person",
                "@id": `${SITE_URL}/#antonio-benitez`,
                name: "Antonio Benitez",
                url: `${SITE_URL}/`,
            },
            publisher: { "@id": `${SITE_URL}/#business` },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: post.faqs.map((f) => ({
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
                { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
        },
    ];

    /** Keep internal links in the SPA instead of full page loads. */
    const onBodyClick = (e: MouseEvent<HTMLDivElement>) => {
        const a = (e.target as HTMLElement).closest("a");
        const href = a?.getAttribute("href");
        if (a && href && href.startsWith("/") && !e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            navigate(href);
        }
    };

    return (
        <div className="bg-ink w-full text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO title={post.title} description={post.description} path={`/blog/${post.slug}`} type="article" schema={schema} />

            <article>
                <header className="relative">
                    <div className="bg-ink h-20 md:h-[72px]" />
                    <div className="bg-offwhite text-ink">
                        <div className="max-w-3xl mx-auto px-6 md:px-12 pt-10 md:pt-14 pb-8">
                            <nav aria-label="Breadcrumb" className="mb-6">
                                <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink/70">
                                    <li><Link to="/" className="hover:text-accent-auto">Home</Link></li>
                                    <li aria-hidden="true">/</li>
                                    <li><Link to="/blog" className="hover:text-accent-auto">Journal</Link></li>
                                    <li aria-hidden="true">/</li>
                                    <li className="text-ink font-medium">{post.category}</li>
                                </ol>
                            </nav>
                            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-ink leading-[1.1] tracking-[-0.01em] mb-6">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-3">
                                <img
                                    src="/about/antonio-benitez-headshot.jpg"
                                    alt="Antonio Benitez"
                                    width={44}
                                    height={44}
                                    className="w-11 h-11 rounded-full object-cover"
                                />
                                <p className="text-[14px] text-ink/70 leading-snug">
                                    By <span className="font-semibold text-ink">Antonio Benitez</span>, owner, South Coast
                                    Quality Painting
                                    <br />
                                    {post.dateModified && post.dateModified !== post.date
                                        ? `Updated ${formatPostDate(post.dateModified)}`
                                        : formatPostDate(post.date)}{" "}
                                    · {post.readTime}
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="bg-offwhite text-ink pb-14 md:pb-20">
                    <div className="max-w-3xl mx-auto px-6 md:px-12">
                        <div className="border-l-2 border-taupe bg-cream px-5 md:px-7 py-5 mb-10">
                            <span className="eyebrow block mb-2">Quick answer</span>
                            <p className="text-[17px] text-ink/85 leading-[1.75]">{post.tldr}</p>
                        </div>

                        <div className="post-body" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: renderPostContent(post) }} />

                        <section aria-labelledby="faq" className="mt-14">
                            <h2 id="faq" className="text-3xl font-serif font-semibold text-ink tracking-[-0.01em] mb-6">
                                Frequently asked questions
                            </h2>
                            <div className="divide-y divide-ink/10 border-y border-ink/10">
                                {post.faqs.map((f) => (
                                    <div key={f.q} className="py-5">
                                        <h3 className="text-[18px] font-semibold text-ink mb-2 leading-snug">{f.q}</h3>
                                        <p className="text-[16px] text-ink/75 leading-[1.75]">{f.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {services.length > 0 && (
                            <section className="mt-12">
                                <h2 className="eyebrow mb-4">Related work</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {services.map((s) => (
                                        <Link
                                            key={s.slug}
                                            to={`/${s.slug}`}
                                            className="group flex items-center justify-between gap-3 bg-ink text-cream px-5 py-4 hover:bg-ink-700 transition-colors"
                                        >
                                            <span className="text-[15px] font-semibold">{s.label} in Houston</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        <p className="mt-10 text-[14px] text-ink/60">
                            Published {formatPostDate(post.date)}
                            {updated !== post.date && <> · Last updated {formatPostDate(updated)}</>}.
                        </p>
                    </div>
                </div>
            </article>

            <section className="bg-ink py-14 md:py-20">
                <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
                    <span className="eyebrow block mb-5">Your home, your project</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream leading-tight mb-5">
                        Talk it through with Antonio.
                    </h2>
                    <p className="text-[17px] text-stone leading-[1.8] mb-8">
                        Every wall and every house is different. Antonio comes to you, makes samples in
                        your own light, and gives you a written price for your project.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/contact" className="btn btn-cream w-full sm:w-auto">
                            Book a Consultation <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${PHONE_TEL}`} className="btn btn-outline w-full sm:w-auto">
                            <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                        </a>
                    </div>
                </div>
            </section>

            {morePosts.length > 0 && (
                <section className="bg-ink-800 py-14 border-t border-white/10">
                    <div className="max-w-6xl mx-auto px-6 md:px-12">
                        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-cream mb-8 text-center">Keep reading</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {morePosts.map((p) => (
                                <Link key={p.slug} to={`/blog/${p.slug}`} className="block bg-ink p-6 hover:bg-ink-700 transition-colors">
                                    <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent-auto">{p.category}</span>
                                    <h3 className="text-lg font-serif font-semibold text-cream mt-2 leading-snug">{p.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
