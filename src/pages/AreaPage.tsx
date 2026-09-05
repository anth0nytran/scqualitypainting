import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import SEO from "../hooks/useSEO";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import { getArea, AREAS } from "@/lib/areas";
import { SERVICES, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/services";
import GoogleReviews from "@/components/GoogleReviews";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease, delay },
});

interface AreaPageProps {
    /** Passed by the router, since each area has its own static path. */
    slug?: string;
}

export default function AreaPage({ slug: slugProp }: AreaPageProps = {}) {
    const params = useParams<{ slug: string }>();
    const slug = slugProp ?? params.slug;
    const area = slug ? getArea(slug) : undefined;

    if (!area) return <Navigate to="/areas-we-serve" replace />;

    const url = `${SITE_URL}/painting/${area.slug}`;
    const nearby = area.nearby.map((s) => AREAS.find((a) => a.slug === s)).filter(Boolean) as typeof AREAS;

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: `House Painting in ${area.name}`,
            description: area.seoDescription,
            serviceType: "House Painting",
            url,
            provider: { "@id": `${SITE_URL}/#business` },
            areaServed: {
                "@type": "City",
                name: area.name,
                address: {
                    "@type": "PostalAddress",
                    addressRegion: "TX",
                    addressCountry: "US",
                },
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve` },
                { "@type": "ListItem", position: 3, name: area.name, item: url },
            ],
        },
    ];

    return (
        <div className="bg-ink w-full text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title={area.seoTitle}
                description={area.seoDescription}
                path={`/painting/${area.slug}`}
                schema={schema}
            />

            {/* ---------- Hero ---------- */}
            <section className="relative">
                <div className="bg-ink h-20 md:h-[72px]" />
                <div className="bg-offwhite text-ink">
                    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink/50">
                                <li><Link to="/" className="hover:text-taupe transition-colors">Home</Link></li>
                                <li aria-hidden="true">/</li>
                                <li><Link to="/areas-we-serve" className="hover:text-taupe transition-colors">Areas We Serve</Link></li>
                                <li aria-hidden="true">/</li>
                                <li className="text-ink font-medium">{area.name}</li>
                            </ol>
                        </nav>

                        <motion.span {...fadeUp()} className="eyebrow flex items-center gap-2 mb-5">
                            <MapPin className="w-4 h-4" /> {area.zips.join(" · ")}
                        </motion.span>

                        <motion.h1
                            {...fadeUp(0.05)}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-ink leading-[1.08] tracking-[-0.01em] mb-5"
                        >
                            {area.h1}
                        </motion.h1>
                        <motion.div {...fadeUp(0.1)} className="rule-luxe mb-7" />

                        <div className="space-y-5 mb-9 max-w-3xl">
                            {area.body.map((p, i) => (
                                <motion.p key={i} {...fadeUp(0.14 + i * 0.05)} className="text-[17px] md:text-lg text-ink/75 leading-[1.8]">
                                    {p}
                                </motion.p>
                            ))}
                        </div>

                        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3">
                            <a href="#quote" className="btn btn-ink w-full sm:w-auto">
                                Book a Consultation
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href={`tel:${PHONE_TEL}`} className="btn w-full sm:w-auto border border-ink/25 text-ink hover:bg-ink hover:text-cream">
                                <Phone className="w-4 h-4" />
                                {PHONE_DISPLAY}
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ---------- What we get asked for here ---------- */}
            <section className="bg-ink py-14 md:py-18 border-y border-white/10">
                <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-14">
                    <div>
                        <span className="eyebrow block mb-4">In {area.shortName}</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em] mb-6">
                            What we get asked for most
                        </h2>
                        <ul className="space-y-4">
                            {area.focus.map((f) => (
                                <li key={f} className="flex items-start gap-3">
                                    <Check className="w-4 h-4 text-taupe flex-shrink-0 mt-1.5" strokeWidth={2} />
                                    <span className="text-[16px] text-cream/85 leading-snug">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <span className="eyebrow block mb-4">Neighborhoods</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em] mb-6">
                            Where we work in {area.shortName}
                        </h2>
                        <p className="text-[16px] text-stone leading-[1.9] mb-5">
                            {area.neighborhoods.join(" · ")}
                        </p>
                        <p className="text-[15px] text-stone/70">
                            ZIP codes: {area.zips.join(", ")}
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------- Services ---------- */}
            <section className="bg-offwhite text-ink py-14 md:py-20">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-10">
                        <span className="eyebrow block mb-4">What we do</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-[-0.01em]">
                            Our work in {area.shortName}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {SERVICES.map((s) => (
                            <Link
                                key={s.slug}
                                to={`/${s.slug}`}
                                className="group block bg-ink text-cream p-7 hover:bg-ink-700 transition-colors duration-500"
                            >
                                <h3 className="text-xl font-serif font-semibold text-cream mb-3 leading-snug">
                                    {s.label} in {area.shortName}
                                </h3>
                                <p className="text-[15px] text-stone leading-relaxed mb-5">{s.cardBlurb}</p>
                                <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-cream group-hover:text-taupe transition-colors">
                                    See {s.label}
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- Reviews: local ones first ---------- */}
            <section className="bg-ink-800 py-14 md:py-18 border-y border-white/10">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <GoogleReviews
                        area={area.slug}
                        heading="What our customers say"
                        sub={`Reviews from ${area.shortName} and across Greater Houston.`}
                    />
                </div>
            </section>

            {/* ---------- Quote form ---------- */}
            <section id="quote" className="bg-ink scroll-mt-20">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 md:py-20">
                    <div className="text-center mb-10">
                        <span className="eyebrow block mb-4">Get started</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em] mb-4">
                            Book a consultation in {area.shortName}
                        </h2>
                        <p className="text-[17px] text-stone max-w-xl mx-auto leading-relaxed">
                            Three quick questions. Antonio comes out, makes samples for your room,
                            and settles the color with you before any work starts.
                        </p>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <ConsultationQuiz />
                    </div>
                </div>
            </section>

            {/* ---------- Nearby areas ---------- */}
            <section className="bg-offwhite text-ink py-14 md:py-18">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-10">
                        <span className="eyebrow block mb-4">Nearby</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-[-0.01em]">
                            We also work in
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
                        {nearby.map((a) => (
                            <Link
                                key={a.slug}
                                to={`/painting/${a.slug}`}
                                className="group block border border-ink/15 p-6 hover:bg-ink hover:text-cream transition-colors duration-500"
                            >
                                <h3 className="text-xl font-serif font-semibold mb-2 leading-snug">{a.name}</h3>
                                <p className="text-[14px] opacity-70 mb-4">{a.zips.join(" · ")}</p>
                                <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] group-hover:text-taupe transition-colors">
                                    View area <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link to="/areas-we-serve" className="btn btn-ink">
                            See Every Area We Serve
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
