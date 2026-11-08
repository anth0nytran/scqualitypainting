import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import SEO from "../hooks/useSEO";
import { CUSTOM_FINISHES, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/services";
import { getPost, isPublished } from "@/lib/blog";

/* ============================================================
   /custom-finishes — hub for the lead positioning: Antonio is a
   custom-finish specialist. Painting, cabinets and staining sit
   behind this on /services.
   ============================================================ */

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease, delay },
});

/** Side-by-side guide. Relative terms only, never prices. */
const FINISH_COMPARISON = [
    { finish: "Venetian plaster", look: "Polished, marble-like depth", bestFor: "Feature walls, entries, stair halls, ceilings", water: "Water-resistant when sealed", slug: "venetian-plaster" },
    { finish: "Marmorino / Roman clay", look: "Soft, matte stone", bestFor: "Living rooms, bedrooms, studies", water: "Good with sealer", slug: "roman-clay" },
    { finish: "Lime wash", look: "Chalky, cloudy movement", bestFor: "Walls, brick, exteriors", water: "Breathable, weathers softly", slug: "lime-wash" },
    { finish: "Tadelakt", look: "Seamless, soft sheen", bestFor: "Showers, tubs, sinks", water: "Waterproof when finished with soap", slug: "tadelakt" },
    { finish: "Microcement", look: "Smooth modern concrete", bestFor: "Floors, counters, showers, walls", water: "Waterproof when sealed", slug: "microcement" },
    { finish: "Liquid metal", look: "Real bronze, brass, copper or iron", bestFor: "Doors, hoods, columns, ceilings", water: "Depends on topcoat", slug: "liquid-metal" },
    { finish: "Suede finish", look: "Soft, velvety texture", bestFor: "Bedrooms, media rooms, studies", water: "Interior, low-traffic", slug: "suede-finish" },
];

export default function CustomFinishes() {
    const comparison = getPost("venetian-plaster-vs-lime-wash-vs-roman-clay");
    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${SITE_URL}/custom-finishes#list`,
            name: "Custom wall finishes in Houston, TX",
            itemListElement: CUSTOM_FINISHES.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.name,
                url: `${SITE_URL}/${s.slug}`,
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Custom Finishes", item: `${SITE_URL}/custom-finishes` },
            ],
        },
    ];

    return (
        <div className="bg-ink w-full text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Venetian Plaster & Custom Finishes in Houston"
                description="Venetian plaster, lime wash, Tadelakt, microcement, liquid metal and suede finishes in Houston, hand-applied by Antonio Benitez. Call (713) 539-8069."
                path="/custom-finishes"
                schema={schema}
            />

            <section className="relative">
                <div className="bg-ink h-20 md:h-[72px]" />
                <div className="bg-offwhite text-ink">
                    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 grid md:grid-cols-[1.3fr_0.7fr] gap-10 md:gap-14 items-center">
                        <div>
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink/70">
                                <li><Link to="/" className="hover:text-accent-auto">Home</Link></li>
                                <li aria-hidden="true">/</li>
                                <li className="text-ink font-medium">Custom Finishes</li>
                            </ol>
                        </nav>
                        <motion.span {...fadeUp()} className="eyebrow block mb-5">Custom finish specialist · Houston</motion.span>
                        <motion.h1
                            {...fadeUp(0.06)}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-ink leading-[1.08] tracking-[-0.01em] mb-5"
                        >
                            Plaster, lime, metal and more. Any finish, matched by hand.
                        </motion.h1>
                        <motion.div {...fadeUp(0.12)} className="rule-luxe mb-7" />
                        <motion.p {...fadeUp(0.18)} className="text-[17px] md:text-lg text-ink/75 leading-[1.8] max-w-3xl mb-8">
                            Antonio Benitez lays Venetian plaster, Marmorino, Tadelakt, lime wash, microcement,
                            liquid metal and suede finishes himself. If you have seen a finish you love, or need
                            an old one matched, he makes samples in your own light until it is right.
                        </motion.p>
                        <motion.div {...fadeUp(0.24)} className="flex flex-col sm:flex-row gap-3">
                            <Link to="/contact" className="btn btn-ink w-full sm:w-auto">
                                Book a Consultation <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a href={`tel:${PHONE_TEL}`} className="btn w-full sm:w-auto border border-ink/25 text-ink hover:bg-ink hover:text-cream">
                                <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                            </a>
                        </motion.div>
                        </div>
                        <motion.figure {...fadeUp(0.2)} className="max-w-xs mx-auto md:max-w-none w-full">
                            <img
                                src="/about/antonio-benitez.webp"
                                alt="Antonio Benitez, Houston custom finish specialist, in front of a hand-troweled plaster wall"
                                width={960}
                                height={1200}
                                className="w-full aspect-[4/5] object-cover"
                            />
                            <figcaption className="mt-3 text-[13px] text-ink/65">
                                Antonio Benitez · Custom finishes since 1999
                            </figcaption>
                        </motion.figure>
                    </div>
                </div>
            </section>

            <section className="bg-ink py-14 md:py-20 border-y border-white/10">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream tracking-[-0.01em] mb-10 text-center">
                        Which custom finish do you want?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {CUSTOM_FINISHES.map((s, i) => (
                            <motion.div key={s.slug} {...fadeUp((i % 3) * 0.05)}>
                                <Link
                                    to={`/${s.slug}`}
                                    className="group flex flex-col h-full bg-ink-800 p-7 border-t-2 border-taupe hover:bg-ink-700 transition-colors duration-500"
                                >
                                    <h3 className="text-2xl font-serif font-semibold text-cream mb-3 leading-snug">{s.label}</h3>
                                    <p className="text-[15px] text-stone leading-relaxed mb-6 flex-1">{s.cardBlurb}</p>
                                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-cream group-hover:text-accent-auto">
                                        See {s.label} <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-offwhite text-ink py-14 md:py-20">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <span className="eyebrow block mb-4">Side by side</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-[-0.01em] mb-4">
                        How do the custom finishes compare?
                    </h2>
                    <p className="text-[17px] text-ink/75 leading-[1.8] max-w-3xl mb-8">
                        Each finish has its own look and its own best place in a home. Cost depends on the
                        wall, the prep and the finish level, so Antonio prices every project after seeing it.
                    </p>
                    <div className="post-body">
                        <table>
                            <thead>
                                <tr><th>Finish</th><th>Look</th><th>Best for</th><th>Water</th></tr>
                            </thead>
                            <tbody>
                                {FINISH_COMPARISON.map((r) => (
                                    <tr key={r.slug}>
                                        <td><Link to={`/${r.slug}`}>{r.finish}</Link></td>
                                        <td>{r.look}</td>
                                        <td>{r.bestFor}</td>
                                        <td>{r.water}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-8 text-[16px] text-ink/70">
                        {comparison && isPublished(comparison) && (
                            <>
                                Want the full comparison?{" "}
                                <Link to={`/blog/${comparison.slug}`} className="font-semibold text-ink underline underline-offset-4">
                                    Venetian plaster vs lime wash vs Roman clay
                                </Link>
                                .{" "}
                            </>
                        )}
                        New to the words? See the{" "}
                        <Link to="/glossary" className="font-semibold text-ink underline underline-offset-4">finish glossary</Link>.
                    </p>
                </div>
            </section>

            <section className="bg-ink py-14 md:py-20">
                <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
                    <span className="eyebrow block mb-5">Behind the finishes</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream leading-tight mb-5">
                        We also paint, stain and refinish.
                    </h2>
                    <p className="text-[17px] text-stone leading-[1.8] mb-8">
                        The same crew handles interior and exterior painting, kitchen cabinets and wood
                        staining, so the plaster wall and the trim around it come out to one standard.
                    </p>
                    <Link to="/services" className="btn btn-cream">
                        See Painting Services <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
