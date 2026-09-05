import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import SEO from "../hooks/useSEO";
import { AREAS, ALL_ZIPS } from "@/lib/areas";
import { PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/services";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease, delay },
});

export default function AreasWeServe() {
    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${SITE_URL}/areas-we-serve#list`,
            name: "Areas served by South Coast Quality Painting",
            itemListElement: AREAS.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: a.name,
                url: `${SITE_URL}/painting/${a.slug}`,
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${SITE_URL}/areas-we-serve#breadcrumb`,
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve` },
            ],
        },
    ];

    return (
        <div className="bg-ink w-full text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Areas We Serve | South Coast Quality Painting"
                description="We paint homes in River Oaks, Memorial, West University, Tanglewood, Bellaire, The Woodlands, Sugar Land, Katy and across Houston."
                path="/areas-we-serve"
                schema={schema}
            />

            <section className="relative">
                <div className="bg-ink h-20 md:h-[72px]" />
                <div className="bg-offwhite text-ink">
                    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20 text-center">
                        <motion.span {...fadeUp()} className="eyebrow block mb-5">
                            Greater Houston, Texas
                        </motion.span>
                        <motion.h1
                            {...fadeUp(0.06)}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-ink leading-[1.08] tracking-[-0.01em] mb-5"
                        >
                            Where we work
                        </motion.h1>
                        <motion.div {...fadeUp(0.12)} className="rule-luxe mx-auto mb-7" />
                        <motion.p {...fadeUp(0.18)} className="text-[17px] md:text-lg text-ink/75 leading-[1.8] max-w-2xl mx-auto mb-9">
                            We work across Greater Houston, from River Oaks and Memorial out to Katy,
                            Sugar Land, The Woodlands and Lake Conroe. Pick your area to see the homes
                            we work on there and what we get asked for most.
                        </motion.p>
                        <motion.div {...fadeUp(0.26)} className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/contact" className="btn btn-ink w-full sm:w-auto">
                                Book a Consultation
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a href={`tel:${PHONE_TEL}`} className="btn w-full sm:w-auto border border-ink/25 text-ink hover:bg-ink hover:text-cream">
                                <Phone className="w-4 h-4" />
                                {PHONE_DISPLAY}
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Area grid */}
            <section className="bg-ink py-14 md:py-20 border-y border-white/10">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {AREAS.map((a, i) => (
                            <motion.div key={a.slug} {...fadeUp((i % 3) * 0.06)}>
                                <Link
                                    to={`/painting/${a.slug}`}
                                    className="group flex flex-col h-full bg-ink-800 p-7 hover:bg-ink-700 transition-colors duration-500 border-t-2 border-taupe"
                                >
                                    <h2 className="text-xl font-serif font-semibold text-cream mb-2 leading-snug">
                                        {a.name}
                                    </h2>
                                    <p className="flex items-center gap-2 text-[13px] text-taupe mb-4">
                                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                        {a.zips.join(" · ")}
                                    </p>
                                    <p className="text-[14px] text-stone leading-relaxed mb-5 flex-1">
                                        {a.neighborhoods.slice(0, 4).join(" · ")}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-cream group-hover:text-taupe transition-colors">
                                        View area
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Full ZIP list — one honest place listing the whole footprint */}
            <section className="bg-offwhite text-ink py-14 md:py-18">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
                    <span className="eyebrow block mb-4">Full coverage</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-[-0.01em] mb-6">
                        Every ZIP code we cover
                    </h2>
                    <p className="text-[16px] text-ink/70 leading-[1.9] mb-8">
                        {ALL_ZIPS.join(" · ")}
                    </p>
                    <p className="text-[16px] text-ink/70 mb-8">
                        Not on the list? Call us anyway. If it is the right project, we will travel for it.
                    </p>
                    <Link to="/contact" className="btn btn-ink">
                        Book a Consultation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
