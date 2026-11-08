import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../hooks/useSEO";
import { SITE_URL } from "@/lib/services";
import { GLOSSARY } from "@/lib/glossary";

/* ============================================================
   /glossary — plaster, finish and paint terms in plain English.
   Each term is a quotable definition with its own anchor, and
   the page carries DefinedTermSet schema (AEO).
   ============================================================ */

export default function Glossary() {
    const letters = Array.from(new Set(GLOSSARY.map((t) => t.term[0].toUpperCase())));

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "@id": `${SITE_URL}/glossary#terms`,
            name: "Venetian plaster, custom finish and painting glossary",
            url: `${SITE_URL}/glossary`,
            publisher: { "@id": `${SITE_URL}/#business` },
            hasDefinedTerm: GLOSSARY.map((t) => ({
                "@type": "DefinedTerm",
                "@id": `${SITE_URL}/glossary#${t.slug}`,
                name: t.term,
                description: t.definition,
                inDefinedTermSet: `${SITE_URL}/glossary#terms`,
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}/glossary` },
            ],
        },
    ];

    return (
        <div className="bg-ink w-full text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Venetian Plaster & Finish Glossary"
                description="Plain-English definitions of Venetian plaster, Marmorino, Tadelakt, lime wash, microcement, burnishing, sheen levels and more, from South Coast in Houston."
                path="/glossary"
                schema={schema}
            />

            <section className="relative">
                <div className="bg-ink h-20 md:h-[72px]" />
                <div className="bg-offwhite text-ink">
                    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink/70">
                                <li><Link to="/" className="hover:text-accent-auto">Home</Link></li>
                                <li aria-hidden="true">/</li>
                                <li className="text-ink font-medium">Glossary</li>
                            </ol>
                        </nav>
                        <span className="eyebrow block mb-5">Plain English</span>
                        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-ink leading-[1.08] tracking-[-0.01em] mb-5">
                            Plaster, finish and paint terms, explained
                        </h1>
                        <div className="rule-luxe mb-7" />
                        <p className="text-[17px] text-ink/75 leading-[1.8] max-w-3xl">
                            The words you will hear when you plan a plaster wall, a custom finish or a repaint,
                            with what each one actually means for your home.
                        </p>
                        <nav aria-label="Jump to letter" className="flex flex-wrap gap-2 mt-8">
                            {letters.map((l) => (
                                <a
                                    key={l}
                                    href={`#letter-${l}`}
                                    className="w-10 h-10 flex items-center justify-center border border-ink/20 text-[14px] font-semibold hover:bg-ink hover:text-cream transition-colors"
                                >
                                    {l}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </section>

            <section className="bg-offwhite text-ink pb-16 md:pb-24 border-t border-ink/10">
                <div className="max-w-3xl mx-auto px-6 md:px-12">
                    {letters.map((l) => (
                        <div key={l} id={`letter-${l}`} className="scroll-mt-24 pt-10">
                            <h2 className="text-3xl font-serif font-semibold text-taupe mb-4">{l}</h2>
                            <dl className="divide-y divide-ink/10 border-y border-ink/10">
                                {GLOSSARY.filter((t) => t.term[0].toUpperCase() === l).map((t) => (
                                    <div key={t.slug} id={t.slug} className="py-5 scroll-mt-24">
                                        <dt className="text-[19px] font-serif font-semibold text-ink mb-2">{t.term}</dt>
                                        <dd className="text-[16px] text-ink/75 leading-[1.75]">
                                            {t.definition}
                                            {t.link && (
                                                <>
                                                    {" "}
                                                    <Link to={t.link} className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4">
                                                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                                                    </Link>
                                                </>
                                            )}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
