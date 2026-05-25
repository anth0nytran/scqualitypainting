import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Hand, Sparkles, ShieldCheck, Quote, Brush, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../hooks/useSEO";
import { Monogram } from "@/components/Logo";

// --- South Coast — calm, cinematic, warm-luxury architectural-finishes homepage ---

const heroImage = (slug: string, size: "1600" | "2560" = "1600") => `/projects/hero/${slug}-${size}.webp`;
const galleryTile = (n: string) => `/projects/gallery/${n}.webp`;
const heroSlideEase = [0.22, 1, 0.36, 1] as const;
const softEase = [0.16, 1, 0.3, 1] as const;

const heroSlides = [
    {
        src: heroImage("plaster-mural", "2560"),
        srcSet: `${heroImage("plaster-mural", "1600")} 1600w, ${heroImage("plaster-mural", "2560")} 2560w`,
        alt: "Hand-troweled Venetian plaster feature wall, Houston",
    },
    {
        src: heroImage("luxury-kitchen", "2560"),
        srcSet: `${heroImage("luxury-kitchen", "1600")} 1600w, ${heroImage("luxury-kitchen", "2560")} 2560w`,
        alt: "Luxury Houston kitchen with hand-finished cabinetry and plaster surfaces",
    },
    {
        src: heroImage("grand-staircase", "2560"),
        srcSet: `${heroImage("grand-staircase", "1600")} 1600w, ${heroImage("grand-staircase", "2560")} 2560w`,
        alt: "Grand staircase with polished lime-plaster walls in a Houston estate",
    },
    {
        src: heroImage("estate-exterior", "2560"),
        srcSet: `${heroImage("estate-exterior", "1600")} 1600w, ${heroImage("estate-exterior", "2560")} 2560w`,
        alt: "Houston estate exterior with hand-finished stucco and trim",
    },
];

const HeroHQ = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const finishNames = ["Venetian Plaster", "Tadelakt", "Microcement", "Marmorino", "Roman Clay"];
    const [finishIndex, setFinishIndex] = useState(0);

    const goTo = useCallback((next: number, dir: number) => {
        setDirection(dir);
        setCurrent(next);
    }, []);

    // Auto-rotate every 6s (slower, calmer pacing)
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            goTo((current + 1) % heroSlides.length, 1);
        }, 6000);
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, [current, goTo]);

    // Rotate finish names independently on a gentle cadence
    useEffect(() => {
        const id = setInterval(() => {
            setFinishIndex((i) => (i + 1) % finishNames.length);
        }, 3200);
        return () => clearInterval(id);
    }, [finishNames.length]);

    const slideVariants = {
        enter: (dir: number) => ({
            opacity: 0,
            scale: 1.06,
            x: dir > 0 ? "3%" : "-3%",
        }),
        center: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 1.6, ease: heroSlideEase },
        },
        exit: (dir: number) => ({
            opacity: 0,
            scale: 1.03,
            x: dir > 0 ? "-3%" : "3%",
            transition: { duration: 1.0, ease: heroSlideEase },
        }),
    };

    const finishWordmarkVariants = {
        enter: { opacity: 0, y: "110%", filter: "blur(8px)" },
        center: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.95, ease: heroSlideEase } },
        exit: { opacity: 0, y: 0, x: 24, filter: "blur(6px)", transition: { duration: 0.7, ease: heroSlideEase } },
    };

    const currentFinish = finishNames[finishIndex];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
            {/* Rotating background images */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 z-0 will-change-transform"
                >
                    <img
                        src={heroSlides[current].src}
                        srcSet={heroSlides[current].srcSet}
                        sizes="100vw"
                        alt={heroSlides[current].alt}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Persistent overlays — warm, calm */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/70 via-ink/45 to-ink/25 pointer-events-none" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/40 via-transparent to-ink/85 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-28 flex flex-col items-center justify-center text-center">
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: softEase }}
                    className="inline-block py-1.5 px-4 border border-cream/20 text-taupe text-[11px] tracking-[0.3em] uppercase font-sans font-light mb-9 bg-ink/30 backdrop-blur-sm"
                >
                    Venetian Plaster &amp; Architectural Finishes · Houston, TX
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: softEase }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-serif font-light text-cream leading-[1.12] tracking-[0.02em] mb-8"
                >
                    Hand-applied plaster <br className="hidden sm:block" />
                    &amp; premium painting.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: softEase }}
                    className="text-lg md:text-xl text-stone max-w-2xl font-sans font-light mb-12 leading-relaxed tracking-[0.01em] mx-auto"
                >
                    South Coast is a Houston studio for Venetian &amp; Tadelakt plaster, custom architectural finishes, cabinetry, and interior &amp; exterior painting — calm process, flawless results.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: softEase }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
                >
                    <Link
                        to="/contact"
                        className="group inline-flex items-center justify-center gap-3 bg-cream text-ink px-8 py-5 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500 min-w-[280px]"
                    >
                        Book a Consultation
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </Link>
                    <Link
                        to="/services"
                        className="inline-flex items-center justify-center gap-3 bg-transparent border border-cream/25 text-cream px-8 py-5 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-cream/10 hover:border-cream/50 transition-all duration-500 backdrop-blur-sm min-w-[280px]"
                    >
                        View Our Work
                    </Link>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1, ease: softEase }}
                    className="mt-8 text-[11px] tracking-[0.25em] uppercase font-sans font-light text-cream/50"
                >
                    Houston, Texas — and select projects beyond.
                </motion.p>
            </div>

            {/* Rotating finish/material wordmark, bottom-right */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: softEase }}
                className="absolute left-6 right-6 bottom-24 z-20 flex justify-end md:left-auto md:right-12 md:bottom-28 md:w-auto"
            >
                <div className="relative w-[calc(100vw-3rem)] max-w-[26rem] text-right">
                    <div className="relative h-[0.95rem] overflow-hidden sm:h-[1.05rem] md:h-[1.15rem] lg:h-[1.28rem]">
                        <AnimatePresence initial={false} mode="sync">
                            <motion.span
                                key={currentFinish}
                                variants={finishWordmarkVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0 flex items-end justify-end whitespace-nowrap font-serif text-[0.78rem] font-light uppercase leading-none tracking-[0.24em] text-cream/80 sm:text-[0.86rem] md:text-[0.94rem] lg:text-[1.04rem]"
                            >
                                {currentFinish}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Bottom bar: calm techniques/materials marquee */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-ink via-ink/90 to-transparent pt-6 pb-5 overflow-hidden">
                <div className="w-full flex items-center pr-6">
                    <div className="pl-4 md:pl-12 lg:pl-24 hidden sm:flex items-center z-20 pr-6 mr-4">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-10 bg-taupe" />
                            <div className="flex flex-col justify-center">
                                <span className="text-[9px] tracking-[0.4em] font-light text-cream/40 uppercase leading-tight">
                                    Materials &amp;
                                </span>
                                <span className="text-sm md:text-base tracking-[0.3em] font-light text-cream uppercase whitespace-nowrap leading-tight">
                                    Techniques
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden relative w-full">
                        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-48 bg-gradient-to-r from-ink via-ink/90 to-transparent z-10 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-48 bg-gradient-to-l from-ink via-ink/90 to-transparent z-10 pointer-events-none" />

                        <div className="flex animate-marquee pb-1 w-max">
                            {[0, 1].map((half) => (
                                <div key={`half-${half}`} className="flex flex-none items-center" aria-hidden={half === 1 ? "true" : undefined}>
                                    {[...Array(2)].map((_, i) => (
                                        <div key={`${half}-${i}`} className="flex flex-none items-center gap-8 md:gap-16 px-4 md:px-8">
                                            {["Lime Plaster", "Tadelakt", "Microcement", "Marmorino", "Roman Clay", "Cabinetry", "Stucco", "Exterior"].map((name) => (
                                                <span key={`${half}-${i}-${name}`} className="text-[10px] md:text-xs font-light tracking-[0.25em] text-cream/40 hover:text-cream transition-colors duration-500 cursor-default uppercase whitespace-nowrap">{name}</span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Two ways to begin ---
const DualCTATransition = () => {
    return (
        <section className="bg-offwhite border-b border-ink/10">
            <div className="max-w-[1800px] mx-auto">
                {/* Section header bar */}
                <div className="border-b border-ink/10">
                    <div className="px-6 md:px-12 lg:px-16 py-8 md:py-10 flex items-end justify-between">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: softEase }}
                            viewport={{ once: true }}
                        >
                            <span className="text-taupe text-[11px] tracking-[0.3em] font-sans font-light uppercase block mb-3">Where to start</span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-[0.02em] text-ink leading-tight">
                                Two ways to begin
                            </h2>
                        </motion.div>
                    </div>
                </div>

                {/* Two-column split */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Book a Consultation */}
                    <Link to="/contact" className="group block md:border-r border-ink/10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: softEase }}
                            viewport={{ once: true }}
                            className="px-6 md:px-12 lg:px-16 py-10 md:py-12 lg:py-16 hover:bg-stone/5 transition-colors duration-700 flex flex-col items-center"
                        >
                            <div className="w-full max-w-md">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-6 h-[2px] bg-ink" />
                                    <span className="text-[10px] tracking-[0.3em] font-sans font-light text-ink uppercase">Consultation</span>
                                </div>

                                <div className="flex items-start gap-5 md:gap-6 mb-5">
                                    <div className="w-14 h-14 md:w-16 md:h-16 border border-ink/10 flex items-center justify-center flex-shrink-0 group-hover:border-taupe group-hover:bg-taupe/[0.05] transition-all duration-700">
                                        <Palette className="w-6 h-6 md:w-7 md:h-7 text-ink/60 group-hover:text-taupe transition-colors duration-700" strokeWidth={1.25} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-ink tracking-[0.02em] leading-[1.1] mb-3">
                                            Book a <br className="hidden md:block" />Consultation
                                        </h3>
                                        <p className="text-[13px] text-ink/70 font-sans font-light leading-relaxed max-w-sm">
                                            Sit down with Antonio to talk through your space, your palette, and the finish that fits it. Complimentary, unhurried, and honest.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] font-sans font-light tracking-[0.25em] uppercase text-ink group-hover:text-taupe transition-colors duration-500 ml-[4.5rem] md:ml-[5rem]">
                                    <span>Start the Conversation</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Right: Explore Our Finishes */}
                    <Link to="/services" className="group block border-t md:border-t-0 border-ink/10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.1, ease: softEase }}
                            viewport={{ once: true }}
                            className="px-6 md:px-12 lg:px-16 py-10 md:py-12 lg:py-16 hover:bg-stone/5 transition-colors duration-700 flex flex-col items-center"
                        >
                            <div className="w-full max-w-md">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-6 h-[2px] bg-taupe" />
                                    <span className="text-[10px] tracking-[0.3em] font-sans font-light text-taupe uppercase">Finishes</span>
                                </div>

                                <div className="flex items-start gap-5 md:gap-6 mb-5">
                                    <div className="w-14 h-14 md:w-16 md:h-16 border border-ink/10 flex items-center justify-center flex-shrink-0 group-hover:border-taupe group-hover:bg-taupe/[0.05] transition-all duration-700">
                                        <Layers className="w-6 h-6 md:w-7 md:h-7 text-ink/60 group-hover:text-taupe transition-colors duration-700" strokeWidth={1.25} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-ink tracking-[0.02em] leading-[1.1] mb-3">
                                            Explore Our <br className="hidden md:block" />Finishes
                                        </h3>
                                        <p className="text-[13px] text-ink/70 font-sans font-light leading-relaxed max-w-sm">
                                            From Venetian plaster and Tadelakt to cabinetry and exterior work — see the surfaces we craft and the care behind each one.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] font-sans font-light tracking-[0.25em] uppercase text-ink group-hover:text-taupe transition-colors duration-500 ml-[4.5rem] md:ml-[5rem]">
                                    <span>See What We Make</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

// --- The hand behind the finish ---
const DirectorProfile = () => {
    const ref = useRef(null);

    return (
        <section ref={ref} className="relative overflow-hidden bg-ink">
            {/* Subtle background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/about/craftsmanship.webp"
                    alt="Close-up of hand-troweled lime plaster craftsmanship, Houston"
                    loading="lazy"
                    className="w-full h-full object-cover brightness-[0.22]"
                />
                <div className="absolute inset-0 bg-ink/50" />
            </div>

            <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-12 py-14 md:py-20 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: softEase }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    {/* Eyebrow */}
                    <span className="inline-block text-taupe text-[11px] tracking-[0.3em] font-sans font-light uppercase mb-8">
                        The craftsman behind the work
                    </span>

                    {/* Monogram + Name inline */}
                    <div className="flex items-center justify-center gap-5 md:gap-7 mb-7">
                        <Monogram size={76} className="text-cream" />
                        <div className="text-left">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-[0.02em] text-cream leading-[1.05] mb-2">
                                Antonio Benitez
                            </h2>
                            <span className="text-[10px] tracking-[0.25em] font-sans font-light uppercase text-taupe">
                                Plaster Specialist · Houston, TX
                            </span>
                        </div>
                    </div>

                    <div className="w-8 h-[2px] bg-taupe mx-auto mb-7" />

                    {/* Quote */}
                    <p className="text-xl md:text-2xl lg:text-[26px] text-cream font-serif font-light leading-[1.5] mb-8 italic tracking-[0.01em] max-w-3xl mx-auto">
                        "A finish is only as honest as the hand that lays it. I work the surface until the light moves across it the way it should — slowly, evenly, and built to last."
                    </p>
                </motion.div>

                {/* Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: softEase }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-[14px] text-stone font-sans font-light leading-relaxed mb-3 max-w-3xl mx-auto tracking-[0.01em]">
                        Antonio specializes in Tadelakt and Venetian plaster — the centuries-old, hand-applied lime finishes that give a wall depth, movement, and a quiet luminosity no paint can imitate.
                    </p>
                    <p className="text-[14px] text-stone font-sans font-light leading-relaxed mb-4 max-w-3xl mx-auto tracking-[0.01em]">
                        Every project begins with considered preparation and ends with a surface that is sealed, durable, and made to age gracefully — across plaster, painting, cabinetry, and exterior work throughout Greater Houston.
                    </p>
                    <p className="text-[14px] text-cream font-sans font-light leading-relaxed mb-9 max-w-3xl mx-auto tracking-[0.01em]">
                        Whether it is a single feature wall or an entire home, the standard is the same.
                    </p>

                    {/* CTA */}
                    <Link
                        to="/contact"
                        className="group inline-flex items-center gap-3 bg-cream text-ink px-8 py-4 text-[10px] font-sans font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500 mb-12"
                    >
                        Book a Consultation
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </Link>

                    {/* Value pills */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-8 border-t border-cream/[0.08]">
                        {[
                            { icon: <Hand className="w-3.5 h-3.5 text-taupe" strokeWidth={1.5} />, label: "Hand-applied" },
                            { icon: <Layers className="w-3.5 h-3.5 text-taupe" strokeWidth={1.5} />, label: "Considered prep" },
                            { icon: <ShieldCheck className="w-3.5 h-3.5 text-taupe" strokeWidth={1.5} />, label: "Finishes that last" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                {item.icon}
                                <span className="text-[10px] tracking-[0.2em] font-sans font-light text-cream/50 uppercase">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- What we create (editorial overview of the 6 services) ---
const WhatWeCreate = () => {
    const services = [
        {
            anchor: "venetian-plaster",
            title: "Venetian & Tadelakt Plaster",
            marker: "Plaster Specialist",
            lead: true,
            description: "Our signature work. Hand-applied lime plaster, polished marble-like Venetian, microcement, and waterproof Tadelakt for baths and wet areas — feature walls with real depth and light.",
        },
        {
            anchor: "residential",
            title: "Residential Painting",
            marker: "Interior & Exterior",
            description: "Premium preparation and true-to-color finishes for interiors and exteriors, applied with the same patience we bring to plaster.",
        },
        {
            anchor: "commercial",
            title: "Commercial Painting",
            marker: "Residential & Commercial",
            description: "Offices, retail, and large-scale interiors finished cleanly and on schedule, with minimal disruption to your space.",
        },
        {
            anchor: "exterior",
            title: "Exterior Painting",
            marker: "Interior & Exterior",
            description: "Stucco, siding, and trim weatherproofed and refreshed to stand up to the Houston climate.",
        },
        {
            anchor: "cabinetry",
            title: "Cabinetry Finishing",
            marker: "Sealed & Caulked",
            description: "Refinishing and repainting done right — properly caulked and sealed so dust and moisture stay out and the finish stays crack-free.",
        },
        {
            anchor: "consultation",
            title: "Color Consultation",
            marker: "Free Consultation",
            description: "Complimentary, considered guidance on palette and finish so the surfaces suit the architecture and the light of your space.",
        },
    ];

    return (
        <section className="relative z-20 bg-offwhite">
            <div className="pb-12 md:pb-20">
                {/* Section header */}
                <div className="border-b border-ink/10">
                    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-10 flex items-end justify-between">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: softEase }}
                            viewport={{ once: true }}
                        >
                            <span className="text-taupe text-[11px] tracking-[0.3em] font-sans font-light uppercase block mb-3">The studio</span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-[0.02em] text-ink leading-tight">
                                What we create
                            </h2>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.9, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="hidden md:flex items-center gap-6"
                        >
                            <p className="text-[12px] text-ink/60 font-sans font-light leading-relaxed text-right">
                                Plaster, painting, and the<br />spaces between — Greater Houston.
                            </p>
                            <Link to="/services" className="group inline-flex items-center gap-2 text-[10px] font-sans font-light tracking-[0.25em] uppercase text-ink hover:text-taupe transition-colors">
                                <span>All Services</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Editorial grid */}
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, idx) => (
                            <Link
                                key={service.anchor}
                                to={`/services#${service.anchor}`}
                                className={`group block border-b border-ink/10 md:border-r ${(idx % 3 === 2) ? "lg:border-r-0" : ""} ${service.lead ? "md:col-span-2 lg:col-span-1" : ""}`}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: (idx % 3) * 0.08, ease: softEase }}
                                    viewport={{ once: true }}
                                    className="h-full px-6 md:px-10 lg:px-12 py-9 md:py-12 hover:bg-stone/5 transition-colors duration-700 flex flex-col"
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className={`w-6 h-[2px] ${service.lead ? "bg-taupe" : "bg-ink/30"}`} />
                                        <span className="text-[9px] tracking-[0.3em] font-sans font-light text-taupe uppercase">{service.marker}</span>
                                    </div>
                                    <h3 className={`font-serif font-light tracking-[0.02em] text-ink leading-snug mb-4 ${service.lead ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
                                        {service.title}
                                    </h3>
                                    <p className="text-[13px] text-ink/70 font-sans font-light leading-relaxed mb-8 flex-1">
                                        {service.description}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-[9px] font-sans font-light uppercase tracking-[0.25em] text-ink group-hover:text-taupe transition-colors duration-500 mt-auto">
                                        Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-500" />
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA bar — mobile */}
                <div className="md:hidden border-t border-ink/10 px-6 py-5">
                    <Link to="/services" className="group flex items-center justify-between">
                        <span className="text-[10px] font-sans font-light tracking-[0.25em] uppercase text-ink group-hover:text-taupe transition-colors">Explore All Services</span>
                        <ArrowRight className="w-4 h-4 text-ink group-hover:text-taupe group-hover:translate-x-1 transition-all duration-500" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

// --- Animated icon containers for Why South Coast panels ---
const AnimatedIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-6 md:mb-8">
        {/* Outer breathing ring */}
        <motion.div
            className="absolute inset-0 rounded-full border border-taupe/20"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.15, 0.3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Soft glow pulse */}
        <motion.div
            className="absolute inset-1 rounded-full bg-taupe/[0.06] blur-sm"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner circle bg */}
        <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full border border-cream/10 bg-cream/[0.04] flex items-center justify-center">
            <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </div>
    </div>
);

const ContentWhyTrustUs = () => {
    const ref = useRef(null);

    const panelVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: softEase,
                delay: i * 0.15,
            },
        }),
    };

    const panels = [
        {
            icon: <Layers className="w-6 h-6 md:w-7 md:h-7 text-taupe" strokeWidth={1.5} />,
            title: "Plaster, mastered",
            paras: [
                <>Venetian and Tadelakt plaster are not painting — they are a <span className="text-cream font-normal">discipline</span>.</>,
                <>Hand-applied lime, polished in layers, worked until the surface holds depth and light. It is the craft we lead with, and the one we know best.</>,
            ],
        },
        {
            icon: <Brush className="w-6 h-6 md:w-7 md:h-7 text-taupe" strokeWidth={1.5} />,
            title: "Considered preparation",
            paras: [
                <>A finish is only as good as <span className="text-cream font-normal">what lies beneath it</span>.</>,
                <>We take the time to prepare surfaces properly — and on cabinetry we caulk and seal where others skip it, keeping dust and moisture out so the finish stays sound.</>,
            ],
        },
        {
            icon: <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-taupe" strokeWidth={1.5} />,
            title: "Finishes that last",
            paras: [
                <>Beauty should also be <span className="text-cream font-normal">durable</span>.</>,
                <>Sealed plaster, weatherproofed exteriors, and true-to-color paint built to age gracefully through the seasons of Greater Houston.</>,
            ],
        },
    ];

    return (
        <section ref={ref} className="relative py-14 md:py-28 overflow-hidden bg-ink">
            <div className="absolute inset-0 z-0">
                <img
                    src="/services/plaster.webp"
                    alt="Dark hand-troweled Venetian plaster surface, Houston"
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/85" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: softEase }}
                    viewport={{ once: true }}
                    className="inline-block text-taupe text-[11px] tracking-[0.3em] font-sans font-light uppercase mb-5"
                >
                    The difference
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: softEase, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-6xl font-serif font-light tracking-[0.02em] mb-8 md:mb-12 text-cream leading-tight"
                >
                    Why South Coast
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-cream/20 bg-ink/40 backdrop-blur-md">
                    {panels.map((panel, i) => (
                        <motion.div
                            key={panel.title}
                            custom={i}
                            variants={panelVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className={`relative p-6 md:p-10 hover:bg-cream/[0.04] transition-colors duration-700 group text-left flex flex-col overflow-hidden border-b md:border-b-0 ${i < 2 ? "md:border-r border-cream/10" : ""}`}
                        >
                            <AnimatedIcon>{panel.icon}</AnimatedIcon>
                            <h3 className="text-lg md:text-2xl font-serif font-light text-cream mb-4 tracking-[0.02em] leading-snug">{panel.title}</h3>
                            <div className="text-[13px] text-stone leading-relaxed font-sans font-light mb-8 flex-1 space-y-3">
                                {panel.paras.map((p, idx) => <p key={idx}>{p}</p>)}
                            </div>
                            <Link to="/services" className="inline-flex items-center gap-2 text-[9px] font-sans font-light uppercase tracking-[0.25em] text-cream border-b border-cream/30 pb-1 group-hover:text-taupe group-hover:border-taupe transition-colors mt-auto self-start">
                                Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-500" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Our Process ---
const PROCESS_STEPS = [
    {
        number: "01",
        title: "Consultation & Color",
        description: "We begin unhurried — walking your space, listening to how you live in it, and discussing palette, finish, and material. Together we settle on the surfaces that suit the architecture and the light.",
        image: "/services/process.webp",
        alt: "Color and finish consultation for a Houston plaster project",
    },
    {
        number: "02",
        title: "Surface Preparation",
        description: "The quiet work that makes everything else possible. Surfaces are cleaned, repaired, and prepared correctly — and on cabinetry we caulk and seal properly so the finish has a sound foundation to last on.",
        image: "/services/residential.webp",
        alt: "Careful surface preparation before painting and plaster, Houston",
    },
    {
        number: "03",
        title: "Application & Craftsmanship",
        description: "Hand-applied, layer by layer. Whether it is polished Venetian plaster, Tadelakt, or a true-to-color paint, the surface is worked patiently until the depth, movement, and finish are right.",
        image: "/services/plaster.webp",
        alt: "Hand-applying Venetian plaster layer by layer, Houston craftsmanship",
    },
    {
        number: "04",
        title: "Finish, Seal & Walkthrough",
        description: "Plaster is sealed, surfaces are protected, and the space is cleaned and reviewed together. We walk the finished work with you to make sure every surface meets the standard we set out to reach.",
        image: "/services/cabinetry.webp",
        alt: "Sealed cabinetry finishing and final walkthrough, Houston",
    },
];

const AUTO_ADVANCE_MS = 7000;

const SignatureSellingExperience = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
        setProgress(0);

        const tick = 30;
        let elapsed = 0;
        progressRef.current = setInterval(() => {
            elapsed += tick;
            setProgress(Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100));
        }, tick);

        timerRef.current = setInterval(() => {
            setActiveStep(prev => (prev + 1) % PROCESS_STEPS.length);
            elapsed = 0;
            setProgress(0);
        }, AUTO_ADVANCE_MS);
    }, []);

    const stopTimer = useCallback(() => {
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
        if (progressRef.current) { clearInterval(progressRef.current); progressRef.current = null; }
    }, []);

    useEffect(() => {
        if (!paused) startTimer();
        else stopTimer();
        return stopTimer;
    }, [paused, activeStep, startTimer, stopTimer]);

    const handleStepClick = (idx: number) => {
        setActiveStep(idx);
        setProgress(0);
        setPaused(false);
    };

    const activeData = PROCESS_STEPS[activeStep];

    return (
        <section className="py-14 md:py-24 bg-offwhite relative overflow-hidden">
            {/* Subtle structural line at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-ink/10" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <span className="inline-block text-taupe text-[11px] tracking-[0.3em] font-sans font-light uppercase mb-5">
                        How we work
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-light tracking-[0.02em] text-ink leading-tight mb-5">
                        Our Process
                    </h2>
                    <div className="w-12 h-[2px] bg-taupe mx-auto mb-5" />
                    <p className="text-ink/70 max-w-2xl mx-auto font-sans font-light text-[15px] leading-relaxed">
                        A calm, considered sequence — from first conversation to a sealed, finished surface we walk together.
                    </p>
                </div>

                {/* Desktop: Split layout — accordion left, image right */}
                <div
                    className="hidden md:grid md:grid-cols-[1fr_1.2fr] gap-0"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Left: Accordion steps — ink panel */}
                    <div className="flex flex-col bg-ink">
                        {PROCESS_STEPS.map((step, idx) => {
                            const isActive = idx === activeStep;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleStepClick(idx)}
                                    className={`relative cursor-pointer border-b border-cream/[0.06] last:border-b-0 transition-colors duration-500 ${isActive ? "bg-cream/[0.05]" : "hover:bg-cream/[0.03]"}`}
                                >
                                    {/* Accent progress bar on left edge */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] overflow-hidden">
                                        <motion.div
                                            className="w-full bg-taupe"
                                            initial={{ height: "0%" }}
                                            animate={{ height: isActive ? `${progress}%` : "0%" }}
                                            transition={{ duration: 0.05, ease: "linear" }}
                                        />
                                    </div>

                                    <div className="pl-7 pr-6 py-5">
                                        {/* Step header row */}
                                        <div className="flex items-center gap-4">
                                            <span className={`text-2xl font-serif font-light transition-colors duration-500 ${isActive ? "text-taupe" : "text-cream/15"}`}>
                                                {step.number}
                                            </span>
                                            <div className={`h-[1px] w-8 transition-colors duration-500 ${isActive ? "bg-taupe/40" : "bg-cream/10"}`} />
                                            <h3 className={`text-[15px] font-serif font-light tracking-[0.02em] transition-colors duration-500 ${isActive ? "text-cream" : "text-cream/35"}`}>
                                                {step.title}
                                            </h3>
                                        </div>

                                        {/* Expanded content */}
                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.55, ease: softEase }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-[13px] text-stone font-sans font-light leading-relaxed mt-4 ml-[calc(2ch+2.5rem)] pr-4">
                                                        {step.description}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: All images stacked, crossfade via opacity */}
                    <div className="relative overflow-hidden bg-ink">
                        {PROCESS_STEPS.map((step, idx) => (
                            <motion.img
                                key={idx}
                                src={step.image}
                                alt={step.alt}
                                loading="lazy"
                                animate={{
                                    opacity: idx === activeStep ? 1 : 0,
                                    scale: idx === activeStep ? 1 : 1.05,
                                }}
                                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ))}
                        {/* Large watermark number */}
                        <motion.span
                            key={activeStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.1, y: 0 }}
                            transition={{ duration: 0.5, ease: softEase }}
                            className="absolute bottom-4 right-6 text-[9rem] font-serif font-light text-cream leading-none select-none pointer-events-none z-10"
                        >
                            {activeData.number}
                        </motion.span>
                    </div>
                </div>

                {/* Mobile: Stacked accordion with inline images */}
                <div
                    className="md:hidden flex flex-col bg-ink"
                    onTouchStart={() => setPaused(true)}
                    onTouchEnd={() => { setTimeout(() => setPaused(false), 3000); }}
                >
                    {PROCESS_STEPS.map((step, idx) => {
                        const isActive = idx === activeStep;
                        return (
                            <div
                                key={idx}
                                onClick={() => handleStepClick(idx)}
                                className={`relative cursor-pointer border-b border-cream/[0.06] last:border-b-0 transition-colors duration-300 ${isActive ? "bg-cream/[0.05]" : ""}`}
                            >
                                {/* Progress bar */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] overflow-hidden">
                                    <motion.div
                                        className="w-full bg-taupe"
                                        initial={{ height: "0%" }}
                                        animate={{ height: isActive ? `${progress}%` : "0%" }}
                                        transition={{ duration: 0.05, ease: "linear" }}
                                    />
                                </div>

                                <div className="pl-5 pr-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xl font-serif font-light transition-colors duration-300 ${isActive ? "text-taupe" : "text-cream/15"}`}>
                                            {step.number}
                                        </span>
                                        <div className={`h-[1px] w-5 transition-colors duration-300 ${isActive ? "bg-taupe/40" : "bg-cream/10"}`} />
                                        <h3 className={`text-[13px] font-serif font-light tracking-[0.02em] transition-colors duration-300 ${isActive ? "text-cream" : "text-cream/35"}`}>
                                            {step.title}
                                        </h3>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.45, ease: softEase }}
                                                className="overflow-hidden"
                                            >
                                                {/* Inline image */}
                                                <div className="relative mt-4 aspect-[16/10] overflow-hidden">
                                                    <img
                                                        src={step.image}
                                                        alt={step.alt}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <p className="text-[12px] text-stone font-sans font-light leading-relaxed mt-3 pb-1">
                                                    {step.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Step indicators — dot navigation */}
                <div className="flex justify-center gap-2 mt-8">
                    {PROCESS_STEPS.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleStepClick(idx)}
                            className={`h-[3px] rounded-full transition-all duration-500 ${idx === activeStep ? "w-8 bg-ink" : "w-3 bg-ink/15 hover:bg-ink/30"}`}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-3 bg-ink text-cream px-8 py-5 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-ink-800 transition-all duration-500 min-w-[280px]"
                    >
                        Book a Consultation
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

// --- Selected Work — portfolio gallery ---
const NeighborhoodShowcase = () => {
    const ref = useRef(null);
    const tiles = [
        { n: "01", label: "Venetian Plaster Feature Wall", area: "River Oaks" },
        { n: "03", label: "Polished Tadelakt Bath", area: "Memorial" },
        { n: "05", label: "Hand-Finished Cabinetry", area: "Bellaire" },
        { n: "07", label: "Microcement Surfaces", area: "West University" },
        { n: "09", label: "Marmorino Plaster", area: "The Woodlands" },
        { n: "11", label: "Exterior Stucco & Trim", area: "Sugar Land" },
        { n: "13", label: "Roman Clay Walls", area: "Katy" },
        { n: "15", label: "Architectural Finish", area: "Houston" },
    ];

    return (
        <section ref={ref} className="relative bg-ink overflow-hidden">
            {/* Solid header — no photo */}
            <div className="py-12 md:py-20 px-6 text-center">
                <span className="inline-block text-taupe text-[11px] tracking-[0.3em] font-sans font-light uppercase mb-5">
                    Selected projects
                </span>
                <h2 className="text-3xl md:text-6xl font-serif font-light tracking-[0.02em] text-cream mb-4 md:mb-6">
                    Selected Work
                </h2>
                <p className="text-stone max-w-xl mx-auto font-sans font-light text-base md:text-lg leading-relaxed">
                    A selection of finishes from across Greater Houston — River Oaks, Memorial, Bellaire, West University, The Woodlands, Sugar Land, Katy, and beyond.
                </p>
            </div>

            {/* Gallery grid — 2 per row mobile, 4 per row desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4">
                {tiles.map((tile, idx) => (
                    <motion.div
                        key={tile.n}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: (idx % 4) * 0.1, ease: softEase }}
                        viewport={{ once: true }}
                        className="relative h-48 sm:h-64 md:h-96 overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute inset-0 w-full z-0">
                            <img
                                src={galleryTile(tile.n)}
                                alt={`${tile.label} by South Coast, ${tile.area}, Houston`}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2200ms] ease-out brightness-[0.55] group-hover:brightness-[0.7]"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                            <h3 className="text-sm sm:text-lg md:text-xl font-serif font-light text-cream mb-1 tracking-[0.02em] leading-snug">{tile.label}</h3>
                            <span className="text-[10px] font-sans font-light tracking-[0.25em] text-taupe uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center gap-1">
                                {tile.area}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// --- Cinematic Testimonials — the two real reviews ---
const CinematicTestimonials = () => {
    const reviews = [
        {
            quote: "I couldn't be happier with the results of our cabinet painting! The team was professional, detail-oriented, and truly transformed our kitchen. The finish looks flawless and fresh, like we got brand new cabinets. Everything was done on time and with great care. Highly recommend for anyone looking to give their space a new life!",
            name: "Cynthia Torres",
            initials: "CT",
        },
        {
            quote: "We had an amazing experience. From start to finish, they were professional, punctual, and super easy to work with. The attention to detail was top-notch—they prepped everything thoroughly and made sure the finish was smooth and even. Our home looks completely refreshed and better than we imagined.",
            name: "Emmanuel Diaz",
            initials: "ED",
        },
    ];

    return (
        <section className="relative bg-ink py-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/services/plaster.webp"
                    alt="Dark polished plaster surface backdrop, Houston"
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/90 backdrop-blur-[2px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="inline-block text-taupe text-[11px] tracking-[0.3em] font-sans font-light uppercase mb-5">
                        In their words
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-[0.02em] text-cream leading-tight">
                        What our clients say
                    </h2>
                </div>

                {/* Two large quote cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: idx * 0.15, ease: softEase }}
                            viewport={{ once: true }}
                            className="relative flex flex-col h-full border border-cream/15 bg-ink-800/60 backdrop-blur-md p-8 md:p-12 hover:border-taupe/40 transition-colors duration-700"
                        >
                            <Quote className="w-10 h-10 text-taupe/30 mb-6" strokeWidth={1} />
                            <p className="text-[15px] md:text-[17px] text-cream font-serif font-light italic leading-relaxed mb-8 flex-grow tracking-[0.01em]">
                                "{review.quote}"
                            </p>
                            <div className="flex items-center gap-4 mt-auto border-t border-cream/10 pt-6">
                                <div className="w-12 h-12 border border-taupe/40 flex items-center justify-center flex-shrink-0">
                                    <span className="text-cream font-serif font-light text-sm tracking-[0.15em]">{review.initials}</span>
                                </div>
                                <div>
                                    <p className="text-[13px] md:text-sm font-sans font-light text-cream tracking-[0.15em] uppercase">{review.name}</p>
                                    <p className="text-[10px] text-taupe uppercase tracking-[0.25em] font-light mt-1">Houston, TX</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-3 bg-cream text-ink px-10 py-5 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500"
                    >
                        Book a Consultation
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const BookingFunnelCTA = () => {
    const ref = useRef(null);

    return (
        <section ref={ref} className="relative py-20 md:py-24 overflow-hidden bg-ink">
            <div className="absolute inset-0 w-full z-0">
                <img
                    src="/services/cta.webp"
                    alt="Hand-finished Venetian plaster interior, Houston"
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-ink/85 z-0" />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: softEase }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10"
            >
                <Sparkles className="w-14 h-14 text-taupe mx-auto mb-8" strokeWidth={1} />
                <h2 className="text-3xl md:text-6xl font-serif font-light tracking-[0.02em] mb-6 text-cream leading-tight">
                    Begin your project
                </h2>
                <p className="text-lg md:text-xl text-stone font-sans font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                    Tell us about your space and the finish you have in mind. We'll talk through plaster, paint, and possibility — calmly, and with honest guidance from the start.
                </p>

                <div className="flex flex-col items-center gap-4 mb-12">
                    {[
                        "Complimentary consultation",
                        "Honest, detailed guidance",
                        "Craftsmanship you can see",
                    ].map((promise) => (
                        <div key={promise} className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-taupe flex-shrink-0" strokeWidth={1.5} />
                            <span className="text-sm md:text-base text-cream font-sans font-light tracking-[0.01em]">{promise}</span>
                        </div>
                    ))}
                </div>

                <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-3 bg-cream text-ink px-8 py-5 md:px-12 md:py-6 text-[11px] md:text-sm font-sans font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500"
                >
                    Book a Consultation
                    <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="mt-8 text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-sans font-light text-stone/60">
                    Based in Houston, Texas — with select projects elsewhere.
                </p>
            </motion.div>
        </section>
    );
};

export default function Home() {
    return (
        <div className="bg-ink w-full overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Venetian Plaster & Architectural Finishes in Houston, TX | South Coast"
                description="South Coast Quality Painting is a Houston Venetian & Tadelakt plaster and architectural-finishes studio — hand-applied lime plaster, microcement, residential & commercial painting, exterior, and cabinetry finishing across Greater Houston. Free consultation."
                path="/"
            />
            <HeroHQ />
            <DualCTATransition />
            <DirectorProfile />
            <WhatWeCreate />
            <ContentWhyTrustUs />
            <SignatureSellingExperience />
            <NeighborhoodShowcase />
            <CinematicTestimonials />
            <BookingFunnelCTA />
        </div>
    );
}
