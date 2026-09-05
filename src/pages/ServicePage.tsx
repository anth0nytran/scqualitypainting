import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Phone } from "lucide-react";
import SEO from "../hooks/useSEO";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import GoogleReviews from "@/components/GoogleReviews";
import {
    getService,
    SERVICES,
    SERVICE_AREAS,
    PHONE_DISPLAY,
    PHONE_TEL,
    SITE_URL,
} from "@/lib/services";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease, delay },
});

interface ServicePageProps {
    /** Passed by the router, since each service has its own static path. */
    slug?: string;
}

export default function ServicePage({ slug: slugProp }: ServicePageProps = {}) {
    const params = useParams<{ slug: string }>();
    const slug = slugProp ?? params.slug;
    const service = slug ? getService(slug) : undefined;
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    if (!service) return <Navigate to="/services" replace />;

    const url = `${SITE_URL}/${service.slug}`;

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: service.name,
            description: service.seoDescription,
            serviceType: service.name,
            url,
            provider: { "@id": `${SITE_URL}/#business` },
            areaServed: SERVICE_AREAS.map((a) => ({ "@type": "City", name: a })),
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: `${service.name} — what's included`,
                itemListElement: service.includes.map((item) => ({
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: item },
                })),
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: service.faqs.map((f) => ({
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
                { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
                { "@type": "ListItem", position: 3, name: service.label, item: url },
            ],
        },
    ];

    const related = service.related
        .map((s) => SERVICES.find((x) => x.slug === s))
        .filter(Boolean) as typeof SERVICES;

    return (
        <div className="bg-ink w-full text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title={service.seoTitle}
                description={service.seoDescription}
                path={`/${service.slug}`}
                schema={schema}
                image={service.image}
            />

            {/* ---------- Hero: headline + phone + quote, all above the fold ---------- */}
            <section className="relative">
                <div className="bg-ink h-20 md:h-[72px]" />
                <div className="flex flex-col-reverse md:flex-row md:min-h-[70vh]">
                    {/* Left: copy + CTAs */}
                    <div className="w-full md:w-1/2 bg-offwhite text-ink flex items-center p-6 py-12 md:p-14 lg:p-20">
                        <div className="w-full max-w-xl">
                            {/* Breadcrumb */}
                            <nav aria-label="Breadcrumb" className="mb-6">
                                <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink/70">
                                    <li><Link to="/" className="hover:text-accent-auto transition-colors">Home</Link></li>
                                    <li aria-hidden="true">/</li>
                                    <li><Link to="/services" className="hover:text-accent-auto transition-colors">Services</Link></li>
                                    <li aria-hidden="true">/</li>
                                    <li className="text-ink font-medium">{service.label}</li>
                                </ol>
                            </nav>

                            <motion.h1
                                {...fadeUp(0.05)}
                                className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-ink leading-[1.08] tracking-[-0.01em] mb-5"
                            >
                                {service.h1}
                            </motion.h1>
                            <motion.div {...fadeUp(0.12)} className="rule-luxe mb-6" />
                            <motion.p
                                {...fadeUp(0.18)}
                                className="text-lg md:text-xl text-ink/75 leading-relaxed mb-8"
                            >
                                {service.lede}
                            </motion.p>

                            <motion.div {...fadeUp(0.26)} className="flex flex-col sm:flex-row gap-3 mb-6">
                                <a href="#quote" className="btn btn-ink w-full sm:w-auto">
                                    Book a Consultation
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                                <a
                                    href={`tel:${PHONE_TEL}`}
                                    className="btn w-full sm:w-auto border border-ink/25 text-ink hover:bg-ink hover:text-cream"
                                >
                                    <Phone className="w-4 h-4" />
                                    {PHONE_DISPLAY}
                                </a>
                            </motion.div>

                            <motion.p {...fadeUp(0.32)} className="text-[14px] text-ink/75">
                                A private consultation with Antonio. You approve the color before we start.
                            </motion.p>
                        </div>
                    </div>

                    {/* Right: image */}
                    <div className="w-full md:w-1/2 relative h-[38vh] md:h-auto md:min-h-[70vh] overflow-hidden">
                        <img
                            src={service.image}
                            alt={service.imageAlt}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-ink/10" />
                    </div>
                </div>
            </section>

            {/* ---------- Trust strip ---------- */}
            <section className="bg-ink border-y border-white/10">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        "Color Approved First",
                        "Certified Plaster Specialist",
                        "Homes & Businesses",
                        "Serving Greater Houston",
                    ].map((t) => (
                        <div key={t} className="flex items-center justify-center gap-2">
                            <Check className="w-4 h-4 text-accent-auto flex-shrink-0" strokeWidth={2} />
                            <span className="text-[14px] text-cream/90 leading-snug text-left">{t}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- What we do ---------- */}
            <section className="bg-offwhite text-ink py-14 md:py-20">
                <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-16">
                    <div>
                        <motion.span {...fadeUp()} className="eyebrow block mb-4">
                            What we do
                        </motion.span>
                        <motion.h2
                            {...fadeUp(0.06)}
                            className="text-3xl md:text-4xl font-serif font-semibold text-ink leading-tight tracking-[-0.01em] mb-6"
                        >
                            How we do it
                        </motion.h2>
                        <div className="space-y-5">
                            {service.body.map((p, i) => (
                                <motion.p
                                    key={i}
                                    {...fadeUp(0.1 + i * 0.06)}
                                    className="text-[17px] text-ink/75 leading-[1.75]"
                                >
                                    {p}
                                </motion.p>
                            ))}
                        </div>
                    </div>

                    {/* Includes list */}
                    <motion.div {...fadeUp(0.15)} className="bg-ink text-cream p-7 md:p-9 self-start">
                        <h3 className="text-2xl font-serif font-semibold text-cream mb-6 leading-tight">
                            What you get
                        </h3>
                        <ul className="space-y-4">
                            {service.includes.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <Check
                                        className="w-4 h-4 text-accent-auto flex-shrink-0 mt-1"
                                        strokeWidth={2}
                                    />
                                    <span className="text-[15px] text-cream/85 leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <a href="#quote" className="btn btn-cream w-full mt-8">
                            Book a Consultation
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ---------- The differentiator ---------- */}
            <section className="relative bg-ink py-14 md:py-20 border-y border-white/10">
                <div className="absolute inset-0 z-0">
                    <img
                        src={service.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-ink/90" />
                </div>
                <motion.div
                    {...fadeUp()}
                    className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center"
                >
                    <span className="eyebrow block mb-5">Why us</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-[1.12] tracking-[-0.01em] mb-6">
                        {service.edge.title}
                    </h2>
                    <div className="rule-luxe mx-auto mb-7" />
                    <p className="text-[17px] md:text-lg text-stone leading-[1.8]">{service.edge.text}</p>
                </motion.div>
            </section>

            {/* ---------- Teaching block: why it costs what it costs ---------- */}
            {service.education && (
                <section className="bg-offwhite text-ink py-14 md:py-20">
                    <div className="max-w-3xl mx-auto px-6 md:px-12">
                        <motion.span {...fadeUp()} className="eyebrow block mb-4">
                            Worth understanding
                        </motion.span>
                        <motion.h2
                            {...fadeUp(0.06)}
                            className="text-3xl md:text-4xl font-serif font-semibold text-ink leading-tight tracking-[-0.01em] mb-6"
                        >
                            {service.education.title}
                        </motion.h2>
                        <motion.div {...fadeUp(0.1)} className="rule-luxe mb-8" />
                        <div className="space-y-5">
                            {service.education.paragraphs.map((p, i) => (
                                <motion.p
                                    key={i}
                                    {...fadeUp(0.14 + i * 0.06)}
                                    className="text-[17px] text-ink/75 leading-[1.8]"
                                >
                                    {p}
                                </motion.p>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- Budget tiers ---------- */}
            {service.tiers && (
                <section className="bg-ink py-14 md:py-20 border-y border-white/10">
                    <div className="max-w-6xl mx-auto px-6 md:px-12">
                        <div className="text-center mb-10 md:mb-12">
                            <span className="eyebrow block mb-4">Your options</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em] mb-4">
                                Three ways to get the look
                            </h2>
                            <p className="text-[17px] text-stone max-w-2xl mx-auto leading-relaxed">
                                Every one of these is applied by hand and made to suit your room.
                                They differ in how many steps they take, which is what moves the
                                price.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {service.tiers.map((tier, i) => (
                                <motion.div
                                    key={tier.name}
                                    {...fadeUp(i * 0.08)}
                                    className={`flex flex-col p-7 border-t-2 ${
                                        i === 0
                                            ? "bg-ink-700 border-taupe"
                                            : "bg-ink-800 border-white/20"
                                    }`}
                                >
                                    <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent-auto mb-4">
                                        {tier.note}
                                    </span>
                                    <h3 className="text-xl font-serif font-semibold text-cream mb-3 leading-snug">
                                        {tier.name}
                                    </h3>
                                    <p className="text-[15px] text-stone leading-relaxed">
                                        {tier.blurb}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-center text-[16px] text-stone mt-9 max-w-2xl mx-auto leading-relaxed">
                            Not sure which one fits? That is exactly what the consultation is for.
                            Antonio will make samples of each for your room.
                        </p>
                    </div>
                </section>
            )}

            {/* ---------- Inline quote form ---------- */}
            <section id="quote" className="relative bg-ink-800 scroll-mt-20">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 md:py-20">
                    <div className="text-center mb-10">
                        <span className="eyebrow block mb-4">Consultation</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em] mb-4">
                            Tell us about your project
                        </h2>
                        <p className="text-[17px] text-stone max-w-xl mx-auto leading-relaxed">
                            Three quick questions. Takes about 30 seconds. Antonio gets back to you
                            within one business day.
                        </p>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <ConsultationQuiz presetService={service.slug} />
                    </div>
                </div>
            </section>

            {/* ---------- FAQ ---------- */}
            <section className="bg-offwhite text-ink py-14 md:py-20">
                <div className="max-w-3xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-10">
                        <span className="eyebrow block mb-4">Questions</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-[-0.01em]">
                            {service.label} questions we get asked
                        </h2>
                    </div>

                    <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
                        {service.faqs.map((item, i) => (
                            <div key={i}>
                                <h3>
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        aria-expanded={openFaq === i}
                                        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                                    >
                                        <span className="text-[17px] font-sans font-medium text-ink group-hover:text-accent-auto transition-colors">
                                            {item.q}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-ink/40 flex-shrink-0 transition-transform duration-400 ${
                                                openFaq === i ? "rotate-180 text-accent-auto" : ""
                                            }`}
                                        />
                                    </button>
                                </h3>
                                <AnimatePresence initial={false}>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-[16px] text-ink/70 leading-[1.75] pb-6 pr-8">
                                                {item.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <p className="text-[16px] text-ink/70 mb-5">Still have a question?</p>
                        <a href={`tel:${PHONE_TEL}`} className="btn btn-ink">
                            <Phone className="w-4 h-4" />
                            Call {PHONE_DISPLAY}
                        </a>
                    </div>
                </div>
            </section>

            {/* ---------- Reviews: this service first, then the rest ---------- */}
            <section className="bg-ink py-14 md:py-18 border-y border-white/10">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <GoogleReviews
                        service={service.slug}
                        heading={`What ${service.label.toLowerCase()} customers say`}
                        sub="Reviews mentioning this work appear first."
                    />
                </div>
            </section>

            {/* ---------- Related services ---------- */}
            <section className="bg-offwhite text-ink py-14 md:py-20">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-10">
                        <span className="eyebrow block mb-4">Also from South Coast</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-[-0.01em]">
                            We also do
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {related.map((r) => (
                            <Link
                                key={r.slug}
                                to={`/${r.slug}`}
                                className="group block bg-ink text-cream p-7 hover:bg-ink-700 transition-colors duration-500"
                            >
                                <h3 className="text-xl font-serif font-semibold text-cream mb-3 leading-snug">
                                    {r.label}
                                </h3>
                                <p className="text-[15px] text-stone leading-relaxed mb-5">
                                    {r.cardBlurb}
                                </p>
                                <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-cream group-hover:text-accent-auto transition-colors">
                                    See {r.label}
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- Areas served ---------- */}
            <section className="bg-ink-800 py-12 border-t border-white/10">
                <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-cream mb-4">
                        {service.label} across Greater Houston
                    </h2>
                    <p className="text-[16px] text-stone leading-relaxed">
                        {SERVICE_AREAS.join(" · ")} — and the neighborhoods in between.
                    </p>
                </div>
            </section>

            {/* ---------- Final CTA ---------- */}
            <section className="relative py-16 md:py-24 overflow-hidden bg-ink">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/services/cta.webp"
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-ink/88" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-[1.12] tracking-[-0.01em] mb-5">
                        Ready to see samples?
                    </h2>
                    <p className="text-[17px] md:text-lg text-stone leading-relaxed mb-9 max-w-xl mx-auto">
                        Tell us what you need. We come look at it, and we give you a clear price in
                        writing. No cost, and no pressure to say yes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="#quote" className="btn btn-cream w-full sm:w-auto">
                            Book a Consultation
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a href={`tel:${PHONE_TEL}`} className="btn btn-outline w-full sm:w-auto">
                            <Phone className="w-4 h-4" />
                            {PHONE_DISPLAY}
                        </a>
                    </div>
                    <p className="text-[13px] text-stone/85 mt-7">
                        Antonio Benitez · Certified Plaster Specialist · Houston, Texas
                    </p>
                </div>
            </section>
        </div>
    );
}
