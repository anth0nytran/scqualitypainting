import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Droplets, Layers, Palette, Star, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEO from "../hooks/useSEO";
import { Monogram } from "@/components/Logo";

// --- Shared animation helpers (same vocabulary as Home.tsx) ---
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.9, ease, delay },
});

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, delay },
});

const staggerItem = {
    hidden: { opacity: 0, y: 22 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease, delay: i * 0.12 },
    }),
};

// --- Services Page ---

export default function Services() {
    return (
        <div className="bg-ink w-full min-h-screen text-ink overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Venetian Plaster, Painting & Cabinetry Services in Houston, TX"
                description="Hand-applied Venetian & Tadelakt plaster, microcement, interior and exterior painting, and cabinetry finishing across Greater Houston. A boutique architectural-finishes studio led by plaster specialist Antonio Benitez."
                path="/services"
            />
            <ServicesHero />
            <SignatureProcess />
            <ServiceSell />
            <ServiceBuy />
            <MoreServices />
            <ServiceTestimonial />
            <ServiceFAQ />
            <ServicesCTA />
        </div>
    );
}

// --- Services hero ---
const ServicesHero = () => (
    <section className="relative">
        <div className="bg-ink h-20 md:h-[72px]" />

        <div className="flex flex-col-reverse md:flex-row min-h-[60vh] md:min-h-[75vh]">
            {/* Left — light editorial panel */}
            <div className="w-full md:w-1/2 bg-offwhite flex items-center p-6 py-10 md:p-16 lg:p-20 xl:p-24 border-t md:border-t-0 md:border-r border-ink/10">
                <div className="w-full max-w-lg">
                    <motion.span
                        {...fadeUp(0.1)}
                        className="text-taupe text-[11px] tracking-[0.3em] font-light uppercase block mb-5 md:mb-6"
                    >
                        Our Services · Houston, TX
                    </motion.span>
                    <motion.h1
                        {...fadeUp(0.22)}
                        className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-ink leading-[1.12] tracking-[0.01em] mb-5 md:mb-6"
                    >
                        Venetian plaster, painting & cabinetry.
                    </motion.h1>
                    <motion.div {...fadeUp(0.3)} className="w-12 h-px bg-taupe mb-6 md:mb-7" />
                    <motion.p
                        {...fadeUp(0.36)}
                        className="text-[14px] md:text-[15px] text-ink/70 font-sans font-light leading-relaxed tracking-[0.01em] mb-8 md:mb-10 max-w-md"
                    >
                        South Coast is a Houston architectural-finishes studio. We hand-apply Venetian and Tadelakt plaster, paint homes and businesses inside and out, and refinish cabinetry. Every surface is prepared carefully and finished by hand.
                    </motion.p>
                    <motion.div {...fadeUp(0.46)}>
                        <Link to="/contact" className="group inline-flex items-center justify-center gap-3 bg-ink text-cream px-8 py-4 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-ink-800 transition-all duration-500 w-full md:w-auto">
                            Book a Consultation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                        </Link>
                    </motion.div>

                    {/* Qualitative markers */}
                    <motion.div
                        {...fadeUp(0.56)}
                        className="mt-9 md:mt-12 pt-7 md:pt-8 border-t border-ink/10 grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-3"
                    >
                        {[
                            "Venetian & Tadelakt Plaster",
                            "Residential & Commercial",
                            "Interior & Exterior",
                            "Free Consultation",
                        ].map((marker, idx) => (
                            <div key={idx} className="text-left">
                                <span className="block text-[10px] tracking-[0.18em] font-sans font-light text-ink/60 uppercase leading-relaxed">{marker}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Right — image */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease }}
                className="w-full md:w-1/2 relative h-[45vh] md:h-auto overflow-hidden"
            >
                <img
                    src="/services/hero.webp"
                    alt="Hand-troweled Venetian plaster feature wall in a Houston home"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/15" />
            </motion.div>
        </div>
    </section>
);

// --- Our Process ---
const SignatureProcess = () => {
    const steps = [
        {
            number: "01",
            title: "Consultation & Color",
            description: "We visit the space, listen to how you want it to feel, and consider light, texture, and palette together — guiding you toward the right finish and color.",
        },
        {
            number: "02",
            title: "Surface Preparation",
            description: "Every great finish begins beneath the surface. We clean, repair, and prime so the substrate is sound and ready to hold plaster or paint for years.",
        },
        {
            number: "03",
            title: "Application & Craftsmanship",
            description: "Lime plaster is hand-troweled in successive layers; paintwork is laid with care. This is slow, attentive work — the part that can only be done by hand.",
        },
        {
            number: "04",
            title: "Finish, Seal & Walkthrough",
            description: "We burnish, seal, and protect the surface, then walk the project with you to make certain every detail meets the standard we set together.",
        },
    ];

    return (
        <section id="process" className="bg-ink text-cream">
            {/* Header row */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-8 md:pb-10 border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
                    <motion.div {...fadeUp()}>
                        <span className="text-taupe text-[11px] tracking-[0.3em] font-light uppercase block mb-3 md:mb-4">Our Process</span>
                        <h2 className="text-2xl md:text-4xl font-serif font-light tracking-[0.02em] leading-tight">
                            How a project comes together
                        </h2>
                    </motion.div>
                    <motion.p {...fadeUp(0.15)} className="text-[13px] md:text-sm text-stone font-sans font-light leading-relaxed md:text-right max-w-sm">
                        Four clear steps, from the first conversation to a finished, sealed surface.
                    </motion.p>
                </div>
            </div>

            {/* Steps grid — 2x2 on desktop */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            variants={staggerItem}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className={`group p-5 md:p-10 border-b border-white/10 ${
                                idx % 2 === 0 ? "md:border-r md:border-white/10" : ""
                            } hover:bg-white/[0.03] transition-colors duration-500`}
                        >
                            <div className="flex items-start gap-4 md:gap-5">
                                <span className="text-2xl md:text-3xl font-serif font-light text-taupe leading-none flex-shrink-0 pt-0.5">
                                    {step.number}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg md:text-xl font-serif font-light text-cream mb-2 tracking-[0.02em] leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-[12px] md:text-[13px] text-stone font-sans font-light leading-relaxed tracking-[0.01em]">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA row */}
            <motion.div
                {...fadeUp()}
                className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6"
            >
                <p className="text-[11px] font-sans font-light tracking-[0.2em] text-stone uppercase">
                    Prepared carefully. Finished by hand.
                </p>
                <Link
                    to="/contact"
                    className="group inline-flex items-center gap-3 bg-cream text-ink px-8 py-4 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500 w-full sm:w-auto justify-center"
                >
                    Book a Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
            </motion.div>
        </section>
    );
};

// --- Signature Service: Venetian & Tadelakt Plaster ---
const ServiceSell = () => (
    <section id="plaster" className="relative flex flex-col md:flex-row min-h-[70vh] [clip-path:inset(0)]">
        <div
            className="fixed inset-0 z-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/services/plaster.webp')" }}
        >
            <div className="absolute inset-0 bg-ink/30 md:bg-ink/20" />
        </div>

        {/* Mobile: image peek area */}
        <div className="relative z-10 w-full md:hidden h-[28vh] pointer-events-none" />

        {/* Content Panel */}
        <div className="relative z-10 w-full md:w-[55%] lg:w-1/2 bg-offwhite text-ink p-6 py-10 md:p-16 lg:p-24 shadow-2xl flex flex-col justify-center">
            <div className="max-w-xl">
                <motion.span {...fadeUp(0.1)} className="text-[11px] font-sans font-light tracking-[0.3em] text-taupe uppercase mb-4 block">Signature</motion.span>
                <motion.h2 {...fadeUp(0.2)} className="text-2xl md:text-5xl lg:text-6xl font-serif font-light mb-5 md:mb-6 leading-[1.1] tracking-[0.02em]">
                    Venetian & Tadelakt Plaster
                </motion.h2>
                <motion.div {...fadeUp(0.25)} className="w-12 h-px bg-taupe mb-6 md:mb-8" />
                <motion.p {...fadeUp(0.3)} className="text-[14px] md:text-base text-ink/70 font-sans font-light leading-relaxed tracking-[0.01em] mb-4 md:mb-6">
                    Venetian plaster is a wall finish made from lime and fine marble dust, applied by hand in thin layers and polished to a smooth, marble-like surface. We also work in Marmorino, Roman Clay, and microcement — a cement-based finish with a modern, concrete look.
                </motion.p>
                <motion.p {...fadeUp(0.35)} className="text-[13px] md:text-sm text-ink/60 font-sans font-light leading-relaxed tracking-[0.01em] mb-6 md:mb-8">
                    For showers, baths, and other wet areas, we apply Tadelakt — a waterproof lime plaster with a seamless, sealed surface and no grout lines to fail over time.
                </motion.p>

                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                    {[
                        "Polished Venetian plaster & Marmorino",
                        "Roman Clay & microcement finishes",
                        "Waterproof Tadelakt for baths & showers",
                        "Architectural feature & accent walls",
                    ].map((item, idx) => (
                        <motion.li
                            key={idx}
                            custom={idx}
                            variants={staggerItem}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex items-center gap-3 md:gap-4 text-[13px] md:text-sm font-sans font-light text-ink/80"
                        >
                            <Check className="w-4 h-4 md:w-5 md:h-5 text-taupe flex-shrink-0" strokeWidth={1.5} /> {item}
                        </motion.li>
                    ))}
                </ul>

                <motion.div {...fadeUp(0.5)}>
                    <Link to="/contact" className="group inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 md:py-5 font-sans font-light tracking-[0.25em] uppercase text-[11px] hover:bg-ink-800 transition-colors duration-500 w-full md:w-auto justify-center">
                        Book a Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </Link>
                </motion.div>
            </div>
        </div>

        <div className="relative z-10 hidden md:block w-[45%] lg:w-1/2 pointer-events-none"></div>
    </section>
);

// --- Service: Interior, Exterior & Commercial Painting ---
const ServiceBuy = () => (
    <section id="painting" className="relative flex flex-col md:flex-row min-h-[70vh] border-t border-white/10 [clip-path:inset(0)]">
        <div
            className="fixed inset-0 z-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/services/residential.webp')" }}
        >
            <div className="absolute inset-0 bg-ink/40" />
        </div>

        {/* Mobile: image peek area */}
        <div className="relative z-10 w-full md:hidden h-[28vh] pointer-events-none" />

        {/* Desktop: parallax window (left) */}
        <div className="relative z-10 hidden md:block w-[45%] lg:w-1/2 pointer-events-none"></div>

        {/* Content Panel */}
        <div className="relative z-10 w-full md:w-[55%] lg:w-1/2 bg-ink-900/95 backdrop-blur-md text-cream p-6 py-10 md:p-16 lg:p-24 shadow-2xl md:border-l border-white/5 flex flex-col justify-center">
            <div className="max-w-xl">
                <motion.span {...fadeUp(0.1)} className="text-[11px] font-sans font-light tracking-[0.3em] text-taupe uppercase mb-4 block">Painting</motion.span>
                <motion.h2 {...fadeUp(0.2)} className="text-2xl md:text-5xl lg:text-6xl font-serif font-light mb-5 md:mb-6 leading-[1.1] tracking-[0.02em]">
                    Interior, Exterior & Commercial Painting
                </motion.h2>
                <motion.div {...fadeUp(0.25)} className="w-12 h-px bg-taupe mb-6 md:mb-8" />
                <motion.p {...fadeUp(0.3)} className="text-[14px] md:text-base text-stone font-sans font-light leading-relaxed tracking-[0.01em] mb-4 md:mb-6">
                    We paint homes and businesses across Greater Houston, inside and out. Surfaces are cleaned, repaired, and primed first, then finished with even coats and clean lines in the colors you choose.
                </motion.p>
                <motion.p {...fadeUp(0.35)} className="text-[13px] md:text-sm text-stone/80 font-sans font-light leading-relaxed tracking-[0.01em] mb-6 md:mb-8">
                    That includes home interiors, commercial offices and retail, and full exteriors — stucco, siding, and trim. Commercial work is scheduled around your hours to keep things running.
                </motion.p>

                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                    {[
                        "Residential interiors, true-to-color finishes",
                        "Commercial offices, retail & large interiors",
                        "Exterior stucco, siding & trim",
                        "Thorough prep & weatherproofing",
                    ].map((item, idx) => (
                        <motion.li
                            key={idx}
                            custom={idx}
                            variants={staggerItem}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex items-center gap-3 md:gap-4 text-[13px] md:text-sm font-sans font-light text-cream/85"
                        >
                            <Check className="w-4 h-4 md:w-5 md:h-5 text-taupe flex-shrink-0" strokeWidth={1.5} /> {item}
                        </motion.li>
                    ))}
                </ul>

                <motion.div {...fadeUp(0.5)}>
                    <Link to="/contact" className="group inline-flex items-center gap-3 bg-cream text-ink px-8 py-4 md:py-5 font-sans font-light tracking-[0.25em] uppercase text-[11px] hover:bg-offwhite transition-colors duration-500 w-full md:w-auto justify-center">
                        Book a Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
);

// --- More services ---
const MoreServices = () => (
    <section id="more" className="bg-offwhite py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
                <motion.span {...fadeUp()} className="text-taupe text-[11px] tracking-[0.3em] font-light uppercase block mb-4">
                    The Full Studio
                </motion.span>
                <motion.h2 {...fadeUp(0.1)} className="text-2xl md:text-4xl font-serif font-light text-ink tracking-[0.02em]">
                    More of what we do
                </motion.h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                {[
                    {
                        icon: <Layers className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
                        title: "Cabinetry Finishing",
                        desc: "We refinish and repaint kitchen and bathroom cabinets. The difference: we caulk and seal the exterior seams before finishing. Most shops leave those seams open, so dust and moisture get in and the paint cracks. Sealing them properly keeps the finish looking new far longer.",
                        bg: "/services/cabinetry.webp",
                        alt: "Freshly refinished and sealed kitchen cabinetry, Houston",
                    },
                    {
                        icon: <Droplets className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
                        title: "Exterior & Stucco",
                        desc: "We paint and weatherproof stucco, siding, and trim. Careful prep and the right coatings stand up to Houston's heat and humidity and keep the color true for years.",
                        bg: "/services/exterior.webp",
                        alt: "Freshly painted home exterior and stucco in Greater Houston",
                    },
                    {
                        icon: <Palette className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />,
                        title: "Color Consultation",
                        desc: "A free conversation about color, texture, and finish before any work starts. We help you see how a paint color or plaster will look in your room and light, so you can choose with confidence.",
                        bg: "/services/cabinetry.webp",
                        alt: "Plaster and paint color samples for a Houston color consultation",
                    },
                ].map((service, idx) => (
                    <motion.div
                        key={idx}
                        custom={idx}
                        variants={staggerItem}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="group relative overflow-hidden flex flex-col min-h-[240px] md:min-h-[300px] [clip-path:inset(0)]"
                    >
                        <div
                            className="fixed inset-0 bg-center bg-cover"
                            style={{ backgroundImage: `url('${service.bg}')` }}
                            role="img"
                            aria-label={service.alt}
                        />
                        <div className="absolute inset-0 bg-ink/80 md:bg-ink/75 group-hover:bg-ink/65 transition-colors duration-700" />
                        <div className="relative z-10 p-6 md:p-8 flex flex-col flex-1">
                            <div className="w-10 h-10 md:w-11 md:h-11 border border-white/15 flex items-center justify-center text-taupe mb-5 group-hover:border-taupe/50 transition-colors duration-500">
                                {service.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-serif font-light text-cream mb-2 tracking-[0.02em]">{service.title}</h3>
                            <p className="text-[12px] md:text-[13px] text-stone font-sans font-light leading-relaxed tracking-[0.01em] mb-5 md:mb-6 flex-1">
                                {service.desc}
                            </p>
                            <Link to="/contact" className="text-[10px] font-sans font-light uppercase tracking-[0.25em] text-cream flex items-center gap-2 group-hover:text-taupe transition-colors duration-500">
                                Book a Consultation <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// --- Testimonial / Craftsman profile ---
const ServiceTestimonial = () => {
    const reviews = [
        {
            quote: "I couldn't be happier with the results of our cabinet painting! The team was professional, detail-oriented, and truly transformed our kitchen. The finish looks flawless and fresh, like we got brand new cabinets. Everything was done on time and with great care. Highly recommend for anyone looking to give their space a new life!",
            name: "Cynthia Torres",
            detail: "Cabinetry Finishing · Houston, TX",
        },
        {
            quote: "We had an amazing experience. From start to finish, they were professional, punctual, and super easy to work with. The attention to detail was top-notch—they prepped everything thoroughly and made sure the finish was smooth and even. Our home looks completely refreshed and better than we imagined.",
            name: "Emmanuel Diaz",
            detail: "Interior Painting · Houston, TX",
        },
    ];
    const [idx, setIdx] = useState(0);
    const review = reviews[idx];

    return (
        <section id="reviews" className="relative bg-ink-900 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:min-h-[70vh]">

                {/* Left — Craftsman profile panel */}
                <div className="w-full md:w-[42%] lg:w-[38%] bg-ink border-b md:border-b-0 md:border-r border-white/10 p-5 md:p-8 lg:p-10 flex flex-col justify-center">
                    {/* Monogram + Name */}
                    <motion.div {...fadeUp(0.1)} className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                        <Monogram size={64} className="text-cream" />
                        <div>
                            <h3 className="text-lg font-serif font-light text-cream tracking-[0.02em] leading-tight">Antonio Benitez</h3>
                            <p className="text-[10px] text-stone font-sans font-light mt-1 tracking-[0.15em] uppercase">Plaster Specialist</p>
                        </div>
                    </motion.div>

                    {/* Qualitative rows */}
                    <motion.div {...fadeUp(0.2)} className="space-y-3 mb-6">
                        {[
                            { label: "Specialty", value: "Venetian & Tadelakt Plaster" },
                            { label: "Services", value: "Plaster · Painting · Cabinetry" },
                            { label: "Area", value: "Greater Houston, TX" },
                            { label: "Consultation", value: "Complimentary" },
                        ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between gap-4 text-[11px] py-2 border-b border-white/[0.06]">
                                <span className="text-stone/70 font-sans font-light uppercase tracking-[0.2em] text-[9px] flex-shrink-0">{row.label}</span>
                                <span className="text-cream/85 font-sans font-light text-right">{row.value}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div {...fadeUp(0.4)}>
                        <Link to="/contact" className="group flex items-center justify-center gap-2 w-full py-3.5 border border-white/15 text-[10px] font-sans font-light uppercase tracking-[0.25em] text-cream hover:bg-cream hover:text-ink transition-all duration-500">
                            Book a Consultation <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-500" />
                        </Link>
                    </motion.div>
                </div>

                {/* Right — Reviews */}
                <div className="w-full md:w-[58%] lg:w-[62%] flex flex-col justify-center p-6 py-8 md:p-14 lg:p-20">
                    <motion.span {...fadeUp()} className="text-taupe text-[11px] tracking-[0.3em] font-light uppercase block mb-5 md:mb-8">
                        In Their Words
                    </motion.span>

                    <motion.div {...fadeUp(0.1)} className="flex gap-1 mb-4 md:mb-6">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 text-taupe fill-taupe" />)}
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.blockquote
                            key={idx}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.5, ease }}
                            className="text-lg md:text-2xl lg:text-[27px] font-serif font-light italic text-cream leading-[1.5] mb-6 md:mb-8 min-h-[140px] md:min-h-[200px] flex items-start"
                        >
                            "{review.quote}"
                        </motion.blockquote>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3 md:gap-4 pb-6 md:pb-8 border-b border-white/10"
                        >
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] md:text-[11px] font-serif font-light text-cream">{review.name.split(" ").map(n => n[0]).join("")}</span>
                            </div>
                            <div>
                                <span className="font-serif font-light text-cream block text-[14px] md:text-base">{review.name}</span>
                                <span className="text-[9px] md:text-[10px] font-sans font-light tracking-[0.2em] text-stone/70 uppercase">{review.detail}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-4 md:mt-6">
                        <div className="flex items-center gap-2 md:gap-3">
                            <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="w-9 h-9 md:w-10 md:h-10 border border-white/15 flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-all duration-500 disabled:opacity-20" aria-label="Previous review">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button onClick={() => setIdx(i => Math.min(reviews.length - 1, i + 1))} disabled={idx === reviews.length - 1} className="w-9 h-9 md:w-10 md:h-10 border border-white/15 flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-all duration-500 disabled:opacity-20" aria-label="Next review">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex gap-1.5 md:gap-2">
                            {reviews.map((_, i) => (
                                <button key={i} onClick={() => setIdx(i)} aria-label={`Review ${i + 1}`} className={`h-1 rounded-full transition-all duration-500 ${i === idx ? 'bg-taupe w-6 md:w-8' : 'bg-white/20 w-3 md:w-4 hover:bg-white/40'}`} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

// --- FAQ Section ---
const faqData = [
    {
        q: "What is Venetian plaster?",
        a: "Venetian plaster is a hand-applied wall finish made from lime and fine marble dust. It is troweled on in thin layers and burnished, creating a smooth surface with subtle depth and movement that resembles polished stone. Each wall is finished by hand, so no two are identical."
    },
    {
        q: "What is Tadelakt, and is it really waterproof?",
        a: "Tadelakt is a traditional Moroccan lime plaster that is compressed and sealed with natural soap until it becomes water-resistant. Because it is seamless and waterproof, it works beautifully in showers, baths, and other wet areas where tile grout would normally be the weak point."
    },
    {
        q: "What is the difference between Venetian plaster, microcement, and Marmorino?",
        a: "All three are hand-applied finishes. Venetian plaster is polished to a glossy, marble-like surface. Marmorino has a more matte, stone-like texture. Microcement is a cement-based coating that gives a contemporary, concrete look and can be used on walls, floors, and counters. We will recommend the right one for your space and the feel you want."
    },
    {
        q: "Why does cabinet caulking and sealing matter?",
        a: "Most shops paint cabinets but leave the exterior seams open. Over time, dust and moisture get into those gaps and the finish begins to crack. We caulk and seal the cabinet exteriors properly before finishing, which protects the surface and keeps it looking new far longer."
    },
    {
        q: "How long does a plaster finish last, and how do I maintain it?",
        a: "A properly applied and sealed lime plaster finish can last for decades. It is durable and ages gracefully. Day-to-day care is simple: wipe with a soft, damp cloth and avoid harsh abrasives. Sealed Tadelakt in wet areas only needs occasional resealing to stay water-resistant."
    },
    {
        q: "Do you work on both residential and commercial projects?",
        a: "Yes. We work in private homes as well as commercial spaces such as offices, retail, and large interiors. Plaster, painting, and cabinetry services are available for both, and commercial work is scheduled to keep your business running."
    },
    {
        q: "What areas of Houston do you serve?",
        a: "We serve Greater Houston, including River Oaks, Memorial, Bellaire, West University Place, The Woodlands, Sugar Land, Katy, Cypress, Spring, Pearland, Friendswood, League City, Missouri City, Richmond, and Kingwood."
    },
    {
        q: "How do I get started, and is the consultation free?",
        a: "Yes, the consultation is complimentary. Reach out through our contact page to tell us about your project. We will visit the space, discuss color and finish, and prepare a clear scope so you know exactly what to expect before any work begins."
    },
];

const ServiceFAQ = () => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="faq" className="bg-offwhite py-16 md:py-20 border-t border-ink/10">
            {/* FAQ Schema for Google Rich Snippets */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqData.map(item => ({
                            "@type": "Question",
                            "name": item.q,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.a,
                            },
                        })),
                    })}
                </script>
            </Helmet>

            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <div className="text-center mb-10 md:mb-12">
                    <motion.span {...fadeUp()} className="text-taupe text-[11px] tracking-[0.3em] font-light uppercase block mb-4">
                        Common Questions
                    </motion.span>
                    <motion.h2 {...fadeUp(0.1)} className="text-2xl md:text-4xl font-serif font-light text-ink tracking-[0.02em]">
                        Frequently asked questions
                    </motion.h2>
                </div>

                <div className="divide-y divide-ink/10">
                    {faqData.map((item, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={staggerItem}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
                            >
                                <span className="text-[14px] md:text-base font-sans font-light text-ink pr-4 group-hover:text-taupe transition-colors duration-500">
                                    {item.q}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-ink/40 flex-shrink-0 transition-transform duration-500 ${open === i ? "rotate-180 text-taupe" : ""}`}
                                />
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-[13px] md:text-sm text-ink/70 font-sans font-light leading-relaxed tracking-[0.01em] pb-5 md:pb-6 pr-10">
                                            {item.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Bottom CTA ---
const ServicesCTA = () => (
    <section className="relative py-14 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img
                src="/services/cta.webp"
                alt="Venetian plaster and architectural finishes interior, Houston"
                loading="lazy"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
            <motion.h2
                {...fadeUp()}
                className="text-3xl md:text-6xl font-serif font-light text-cream tracking-[0.02em] leading-[1.12] mb-5 md:mb-6"
            >
                Begin your project
            </motion.h2>
            <motion.p
                {...fadeUp(0.15)}
                className="text-stone font-sans font-light text-[14px] md:text-lg leading-relaxed tracking-[0.01em] max-w-2xl mx-auto mb-8 md:mb-10"
            >
                Tell us about your space and what you have in mind. The consultation is free, with no obligation. We will visit, talk through color and finish, and give you a clear scope before any work begins.
            </motion.p>
            <motion.div {...fadeUp(0.3)}>
                <Link to="/contact" className="group inline-flex items-center justify-center gap-3 bg-cream text-ink px-8 py-4 md:py-5 text-[11px] md:text-xs font-sans font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500 w-full sm:w-auto">
                    Book a Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
            </motion.div>
            <motion.p {...fadeIn(0.5)} className="text-[9px] md:text-[10px] text-stone/60 uppercase tracking-[0.25em] mt-5 md:mt-6">
                Antonio Benitez · Plaster Specialist · Houston, Texas
            </motion.p>
        </div>
    </section>
);
