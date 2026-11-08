import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Check, Phone, Printer, ShieldCheck, Square } from "lucide-react";
import SEO from "../hooks/useSEO";
import { PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/services";
import {
    ANTONIO_NOTE,
    CHECKLIST,
    GUIDE_FAQS,
    GUIDE_H1,
    GUIDE_LEDE,
    GUIDE_PUBLISHED,
    GUIDE_SECTIONS,
    GUIDE_SEO,
    GUIDE_SLUG,
    GUIDE_UPDATED,
    RED_FLAGS,
} from "@/lib/hiringGuide";

/* ============================================================
   /hiring-a-painter — consumer-protection guide.
   Antonio's own request: protect homeowners from deposit scams.
   Content lives in src/lib/hiringGuide.ts (shared with prerender).
   ============================================================ */

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease, delay },
});

const formatDate = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function HiringGuide() {
    const url = `${SITE_URL}/${GUIDE_SLUG}`;

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${url}#article`,
            headline: GUIDE_SEO.title,
            description: GUIDE_SEO.description,
            url,
            mainEntityOfPage: url,
            datePublished: GUIDE_PUBLISHED,
            dateModified: GUIDE_UPDATED,
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
            mainEntity: GUIDE_FAQS.map((f) => ({
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
    ];

    return (
        <div className="bg-ink w-full text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title={GUIDE_SEO.title}
                description={GUIDE_SEO.description}
                path={`/${GUIDE_SLUG}`}
                type="article"
                schema={schema}
            />

            {/* ---------- Hero ---------- */}
            <section className="relative">
                <div className="bg-ink h-20 md:h-[72px]" />
                <div className="bg-offwhite text-ink">
                    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink/70">
                                <li><Link to="/" className="hover:text-accent-auto transition-colors">Home</Link></li>
                                <li aria-hidden="true">/</li>
                                <li className="text-ink font-medium">Before You Hire a Painter</li>
                            </ol>
                        </nav>

                        <motion.span {...fadeUp()} className="eyebrow flex items-center gap-2 mb-5">
                            <ShieldCheck className="w-4 h-4" /> Protect your money
                        </motion.span>
                        <motion.h1
                            {...fadeUp(0.05)}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-ink leading-[1.08] tracking-[-0.01em] mb-5"
                        >
                            {GUIDE_H1}
                        </motion.h1>
                        <motion.div {...fadeUp(0.1)} className="rule-luxe mb-7" />
                        <motion.p {...fadeUp(0.14)} className="text-[17px] md:text-lg text-ink/75 leading-[1.8] max-w-3xl mb-8">
                            {GUIDE_LEDE}
                        </motion.p>

                        {/* Antonio's note, with his photo */}
                        <motion.figure {...fadeUp(0.2)} className="grid grid-cols-1 sm:grid-cols-[minmax(0,200px)_1fr] md:grid-cols-[minmax(0,240px)_1fr] gap-6 md:gap-8 items-start">
                            <img
                                src="/about/antonio-benitez.webp"
                                alt="Antonio Benitez, owner of South Coast Quality Painting, in front of a Venetian plaster wall"
                                width={960}
                                height={1200}
                                className="w-40 sm:w-full aspect-[4/5] object-cover"
                            />
                            <div className="border-l-2 border-taupe pl-6 md:pl-8">
                            <blockquote className="space-y-4">
                                {ANTONIO_NOTE.map((p, i) => (
                                    <p key={i} className="text-[17px] md:text-[19px] font-serif text-ink leading-[1.7]">
                                        {i === 0 ? "“" : ""}
                                        {p}
                                        {i === ANTONIO_NOTE.length - 1 ? "”" : ""}
                                    </p>
                                ))}
                            </blockquote>
                            <figcaption className="mt-4 text-[14px] text-ink/70">
                                <span className="font-semibold text-ink">Antonio Benitez</span> · Owner, South Coast
                                Quality Painting · Painting Houston homes since 1999
                            </figcaption>
                            </div>
                        </motion.figure>

                        <p className="mt-8 text-[13px] text-ink/60">
                            Updated {formatDate(GUIDE_UPDATED)}
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------- Quick answer: the 4 rules ---------- */}
            <section className="bg-ink py-14 md:py-18 border-y border-white/10">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <span className="eyebrow block mb-4 text-center">The short version</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em] mb-10 text-center">
                        Four things to do before you pay anyone
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { n: "01", t: "Keep the deposit small", d: "Enough for paint and a spot on the calendar. Not 40%." },
                            { n: "02", t: "See a photo ID", d: "The name should match the contract and the business." },
                            { n: "03", t: "Check the business", d: "Look it up. Get a real address, not just a cell number." },
                            { n: "04", t: "Call references", d: "Recent customers, with jobs like yours. Really call." },
                        ].map((step, i) => (
                            <motion.div key={step.n} {...fadeUp(i * 0.06)} className="bg-ink-800 p-6 border-t-2 border-taupe">
                                <span className="block text-[13px] font-semibold text-accent-auto mb-2">{step.n}</span>
                                <h3 className="text-lg font-serif font-semibold text-cream mb-2 leading-snug">{step.t}</h3>
                                <p className="text-[15px] text-stone leading-relaxed">{step.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- The guide: question H2 + direct answer ---------- */}
            <section className="bg-offwhite text-ink py-14 md:py-20">
                <div className="max-w-3xl mx-auto px-6 md:px-12 space-y-14">
                    {GUIDE_SECTIONS.map((s) => (
                        <article key={s.id} id={s.id} className="scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-ink leading-tight tracking-[-0.01em] mb-4">
                                {s.q}
                            </h2>
                            <p className="text-[17px] text-ink/85 leading-[1.8] mb-5">{s.answer}</p>
                            {s.points && (
                                <ul className="space-y-3 mb-4">
                                    {s.points.map((p) => (
                                        <li key={p} className="flex items-start gap-3">
                                            <Check className="w-4 h-4 text-accent-auto flex-shrink-0 mt-1.5" strokeWidth={2} />
                                            <span className="text-[16px] text-ink/75 leading-[1.7]">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {s.note && (
                                <p className="text-[15px] text-ink/65 leading-[1.7] bg-cream border-l-2 border-taupe px-5 py-4">
                                    {s.note}
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            {/* ---------- Red flags ---------- */}
            <section className="bg-ink py-14 md:py-18 border-y border-white/10">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <span className="eyebrow block mb-4">Walk away if you see these</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em] mb-8">
                        What are the warning signs of a painting scam?
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {RED_FLAGS.map((f) => (
                            <li key={f} className="flex items-start gap-3">
                                <AlertTriangle className="w-4 h-4 text-accent-auto flex-shrink-0 mt-1" strokeWidth={2} />
                                <span className="text-[16px] text-cream/85 leading-snug">{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ---------- Printable checklist ---------- */}
            <section id="checklist" className="print-checklist bg-cream text-ink py-14 md:py-18 scroll-mt-20">
                <div className="max-w-3xl mx-auto px-6 md:px-12">
                    <span className="eyebrow block mb-4">Keep this by the phone</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink leading-tight tracking-[-0.01em] mb-3">
                        Before-you-pay checklist
                    </h2>
                    <p className="text-[16px] text-ink/70 mb-8">
                        If you can't tick every box, don't hand over a deposit yet.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {CHECKLIST.map((c) => (
                            <li key={c} className="flex items-start gap-3">
                                <Square className="w-5 h-5 text-ink/50 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                                <span className="text-[16px] text-ink/85 leading-snug">{c}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="hidden print:block text-[13px] mt-6">
                        From South Coast Quality Painting · {SITE_URL.replace("https://", "")}/{GUIDE_SLUG} · {PHONE_DISPLAY}
                    </p>
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="btn border border-ink/25 text-ink hover:bg-ink hover:text-cream print:hidden"
                    >
                        <Printer className="w-4 h-4" />
                        Print the checklist
                    </button>
                </div>
            </section>

            {/* ---------- Check us too ---------- */}
            <section className="bg-ink py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
                    <span className="eyebrow block mb-5">That includes us</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-[1.1] tracking-[-0.01em] mb-6">
                        Check us the same way.
                    </h2>
                    <div className="rule-luxe mx-auto mb-8" />
                    <p className="text-[17px] md:text-lg text-stone leading-[1.8] mb-5">
                        Ask Antonio for his ID. Look up South Coast Quality Painting, Inc. Call our
                        references and read our Google reviews. Antonio has been the painter for
                        Kickerillo Companies, the Houston custom home builder, since 1999.
                    </p>
                    <p className="text-[17px] md:text-lg text-stone leading-[1.8] mb-10">
                        A good painter is happy to be checked. Bring this list to your consultation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/contact" className="btn btn-cream w-full sm:w-auto">
                            Book a Consultation
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${PHONE_TEL}`} className="btn btn-outline w-full sm:w-auto">
                            <Phone className="w-4 h-4" />
                            {PHONE_DISPLAY}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
