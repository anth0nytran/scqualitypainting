import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Phone, Quote, ShieldCheck, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../hooks/useSEO";
import { Monogram } from "@/components/Logo";
import { SERVICES, SERVICE_AREAS, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/services";

/* ============================================================
   South Coast — Houston painting company.
   Positioning: painting first (interior, exterior, cabinets,
   wood staining), with Venetian plaster as the specialty that
   sets us apart. NOT a plaster-only studio.

   COPY RULE: plain English, short sentences. ~3rd grade level.
   ============================================================ */

const heroImage = (slug: string, size: "1600" | "2560" = "1600") =>
    `/projects/hero/${slug}-${size}.webp`;
const galleryTile = (n: string) => `/projects/gallery/${n}.webp`;
const heroSlideEase = [0.22, 1, 0.36, 1] as const;
const softEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: softEase, delay },
});

const heroSlides = [
    {
        src: heroImage("luxury-kitchen", "2560"),
        srcSet: `${heroImage("luxury-kitchen", "1600")} 1600w, ${heroImage("luxury-kitchen", "2560")} 2560w`,
        alt: "Freshly painted Houston kitchen with refinished cabinets",
    },
    {
        src: heroImage("estate-exterior", "2560"),
        srcSet: `${heroImage("estate-exterior", "1600")} 1600w, ${heroImage("estate-exterior", "2560")} 2560w`,
        alt: "Houston home exterior painted with fresh stucco and trim",
    },
    {
        src: heroImage("grand-staircase", "2560"),
        srcSet: `${heroImage("grand-staircase", "1600")} 1600w, ${heroImage("grand-staircase", "2560")} 2560w`,
        alt: "Painted stairwell and stained wood railing in a Houston home",
    },
    {
        src: heroImage("plaster-mural", "2560"),
        srcSet: `${heroImage("plaster-mural", "1600")} 1600w, ${heroImage("plaster-mural", "2560")} 2560w`,
        alt: "Hand-applied Venetian plaster feature wall in Houston",
    },
];

/* ---------------------------------------------------------- */
/* Hero                                                        */
/* ---------------------------------------------------------- */
const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goTo = useCallback((next: number, dir: number) => {
        setDirection(dir);
        setCurrent(next);
    }, []);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            goTo((current + 1) % heroSlides.length, 1);
        }, 6000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, goTo]);

    const slideVariants = {
        enter: (dir: number) => ({ opacity: 0, scale: 1.06, x: dir > 0 ? "3%" : "-3%" }),
        center: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.6, ease: heroSlideEase } },
        exit: (dir: number) => ({
            opacity: 0,
            scale: 1.03,
            x: dir > 0 ? "-3%" : "3%",
            transition: { duration: 1.0, ease: heroSlideEase },
        }),
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
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

            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/85 via-ink/60 to-ink/35 pointer-events-none" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/50 via-transparent to-ink/90 pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-28 pb-32 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: softEase }}
                    className="inline-block py-2 px-4 border border-cream/25 bg-ink/40 backdrop-blur-sm text-cream text-[13px] font-medium tracking-[0.08em] uppercase mb-8"
                >
                    Painting · Cabinets · Wood Staining · Venetian Plaster
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: softEase }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-serif font-semibold text-cream leading-[1.06] tracking-[-0.015em] mb-6"
                >
                    We paint Houston homes,
                    <br className="hidden sm:block" /> inside and out.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.45, ease: softEase }}
                    className="text-lg md:text-xl text-cream/85 max-w-2xl mb-10 leading-relaxed mx-auto"
                >
                    Interior and exterior painting, cabinets, and wood staining — done carefully.
                    Plus real Venetian plaster, laid by hand by Antonio.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.6, ease: softEase }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full"
                >
                    <Link to="/contact" className="btn btn-cream w-full sm:w-auto sm:min-w-[260px]">
                        Book a Consultation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                        href={`tel:${PHONE_TEL}`}
                        className="btn btn-outline w-full sm:w-auto sm:min-w-[260px] backdrop-blur-sm"
                    >
                        <Phone className="w-4 h-4" />
                        {PHONE_DISPLAY}
                    </a>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.8 }}
                    className="mt-7 text-[15px] text-cream/60"
                >
                    Antonio makes samples until you are happy · Greater Houston
                </motion.p>
            </div>

            {/* Bottom marquee: what we do */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-ink via-ink/90 to-transparent pt-8 pb-5 overflow-hidden">
                <div className="flex-1 overflow-hidden relative w-full">
                    <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
                    <div className="flex animate-marquee pb-1 w-max">
                        {[0, 1].map((half) => (
                            <div
                                key={`half-${half}`}
                                className="flex flex-none items-center"
                                aria-hidden={half === 1 ? "true" : undefined}
                            >
                                {[...Array(2)].map((_, i) => (
                                    <div
                                        key={`${half}-${i}`}
                                        className="flex flex-none items-center gap-8 md:gap-14 px-4 md:px-7"
                                    >
                                        {[
                                            "Interior Painting",
                                            "Exterior Painting",
                                            "Cabinet Painting",
                                            "Wood Staining",
                                            "Venetian Plaster",
                                            "Washable Flat Finish",
                                            "Stucco & Siding",
                                            "Offices & Shops",
                                        ].map((name) => (
                                            <span
                                                key={`${half}-${i}-${name}`}
                                                className="text-[13px] font-medium tracking-[0.06em] text-cream/45 uppercase whitespace-nowrap"
                                            >
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ---------------------------------------------------------- */
/* Trust bar                                                   */
/* ---------------------------------------------------------- */
const TrustBar = () => (
    <section className="bg-cream text-ink border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-7 grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
                "Samples made until you are happy",
                "Certified plaster specialist",
                "Antonio on every job",
                "Homes and businesses, Greater Houston",
            ].map((t) => (
                <div key={t} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-taupe flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span className="text-[15px] text-ink/80 leading-snug">{t}</span>
                </div>
            ))}
        </div>
    </section>
);

/* ---------------------------------------------------------- */
/* The five services                                           */
/* ---------------------------------------------------------- */
const WhatWeDo = () => (
    <section className="bg-offwhite text-ink py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="text-center mb-10 md:mb-14">
                <motion.span {...fadeUp()} className="eyebrow block mb-4">
                    What we do
                </motion.span>
                <motion.h2
                    {...fadeUp(0.06)}
                    className="text-3xl md:text-5xl font-serif font-semibold text-ink leading-tight tracking-[-0.01em] mb-4"
                >
                    The work we take on.
                </motion.h2>
                <motion.p
                    {...fadeUp(0.12)}
                    className="text-[17px] text-ink/70 max-w-2xl mx-auto leading-relaxed"
                >
                    Painting is most of what we do, and we do it properly. Plaster is the craft
                    that sets us apart. Tap any one to see how we work.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {SERVICES.map((s, i) => (
                    <motion.div key={s.slug} {...fadeUp(i * 0.06)}>
                        <Link
                            to={`/${s.slug}`}
                            className="group relative flex flex-col h-full min-h-[290px] overflow-hidden bg-ink text-cream hover:bg-ink-700 transition-colors duration-500"
                        >
                            <div className="relative h-36 overflow-hidden">
                                <img
                                    src={s.image}
                                    alt={s.imageAlt}
                                    loading="lazy"
                                    className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-75 group-hover:scale-105 transition-all duration-[1200ms]"
                                />
                                {s.slug === "venetian-plaster" && (
                                    <span className="absolute top-3 left-3 bg-taupe text-offwhite text-[12px] font-semibold uppercase tracking-[0.08em] px-3 py-1.5">
                                        Our Specialty
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col flex-1 p-6">
                                <h3 className="text-2xl font-serif font-semibold text-cream mb-3 leading-snug">
                                    {s.label}
                                </h3>
                                <p className="text-[15px] text-stone leading-relaxed mb-6 flex-1">
                                    {s.cardBlurb}
                                </p>
                                <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-cream group-hover:text-taupe transition-colors">
                                    See {s.label}
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}

                <motion.div {...fadeUp(0.3)}>
                    <Link
                        to="/contact"
                        className="group flex flex-col h-full min-h-[290px] bg-taupe text-offwhite p-7 hover:bg-taupe-dark transition-colors duration-500"
                    >
                        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-offwhite/80 block mb-4">
                            Start here
                        </span>
                        <h3 className="text-2xl font-serif font-semibold mb-3 leading-snug">
                            Not sure what you need?
                        </h3>
                        <p className="text-[15px] text-offwhite/85 leading-relaxed mb-6 flex-1">
                            Sit down with Antonio. He looks at the space, makes samples in your own
                            light, and reworks them until you are happy with what you see.
                        </p>
                        <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em]">
                            Ask Us
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
);

/* ---------------------------------------------------------- */
/* The consultation — our real differentiator                  */
/* ---------------------------------------------------------- */
const PickyPeople = () => (
    <section className="bg-cream text-ink py-14 md:py-20 border-y border-ink/10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <motion.span {...fadeUp()} className="eyebrow block mb-5">
                How we start
            </motion.span>
            <motion.h2
                {...fadeUp(0.06)}
                className="text-3xl md:text-5xl font-serif font-semibold text-ink leading-[1.1] tracking-[-0.01em] mb-6"
            >
                We love picky people.
            </motion.h2>
            <motion.div {...fadeUp(0.12)} className="rule-luxe mx-auto mb-8" />
            <motion.p {...fadeUp(0.18)} className="text-[17px] md:text-lg text-ink/75 leading-[1.8] mb-6">
                A color card under a shop light tells you almost nothing. So Antonio comes to your
                home, makes samples on your own wall, and lets you live with them for a day.
            </motion.p>
            <motion.p {...fadeUp(0.24)} className="text-[17px] md:text-lg text-ink/75 leading-[1.8] mb-10">
                If it is not right, he makes another. And another. We would far rather spend an
                extra afternoon on samples than have you look at a wall for ten years and wish you
                had picked something else.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10 text-left">
                {[
                    {
                        n: "01",
                        t: "He comes to you",
                        d: "Antonio looks at the room, the light, and how you use the space.",
                    },
                    {
                        n: "02",
                        t: "Samples on your wall",
                        d: "Made for your room, in your light — not a card from a shop.",
                    },
                    {
                        n: "03",
                        t: "Again, until it's right",
                        d: "As many rounds as it takes. That part is not an extra.",
                    },
                ].map((step, i) => (
                    <motion.div key={step.n} {...fadeUp(0.28 + i * 0.08)} className="border-t-2 border-taupe pt-4">
                        <span className="block text-[13px] font-semibold text-taupe mb-2">{step.n}</span>
                        <h3 className="text-lg font-serif font-semibold text-ink mb-2 leading-snug">
                            {step.t}
                        </h3>
                        <p className="text-[15px] text-ink/70 leading-relaxed">{step.d}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div {...fadeUp(0.55)}>
                <Link to="/contact" className="btn btn-ink">
                    Book a Consultation
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </motion.div>
        </div>
    </section>
);

/* ---------------------------------------------------------- */
/* Signature: washable flat finish                             */
/* ---------------------------------------------------------- */
const SignatureFinish = () => (
    <section className="relative bg-ink text-cream overflow-hidden border-y border-white/10">
        <div className="grid md:grid-cols-2">
            <div className="relative h-[36vh] md:h-auto md:min-h-[56vh] overflow-hidden">
                <img
                    src="/services/residential.webp"
                    alt="Smooth washable flat wall finish in a Houston home that hides drywall flaws"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
            </div>

            <div className="flex items-center p-6 py-12 md:p-14 lg:p-20">
                <div className="max-w-xl">
                    <motion.span {...fadeUp()} className="eyebrow block mb-5">
                        Only from South Coast
                    </motion.span>
                    <motion.h2
                        {...fadeUp(0.06)}
                        className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-[1.1] tracking-[-0.01em] mb-5"
                    >
                        A flat paint you can{" "}
                        <span className="text-taupe">actually wash.</span>
                    </motion.h2>
                    <motion.div {...fadeUp(0.12)} className="rule-luxe mb-7" />
                    <motion.p {...fadeUp(0.18)} className="text-[17px] text-stone leading-[1.8] mb-8">
                        Flat paint looks soft and hides bumps in the wall. But it stains the second
                        you touch it. So most painters push you toward satin or eggshell, which is
                        shiny and shows every flaw. We use a flat finish that stays flat and
                        soft-looking, but wipes clean and can be scrubbed. Almost no one else in
                        Houston can do it.
                    </motion.p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-9">
                        {[
                            "Wipes clean and can be scrubbed",
                            "Hides bumps and flaws in drywall",
                            "Lasts up to 10 years",
                            "Great for hallways and kids' rooms",
                        ].map((b, i) => (
                            <motion.div key={b} {...fadeUp(0.22 + i * 0.05)} className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-taupe flex-shrink-0 mt-1" strokeWidth={2} />
                                <span className="text-[15px] text-cream/85 leading-snug">{b}</span>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div {...fadeUp(0.45)}>
                        <Link to="/interior-painting" className="btn btn-cream">
                            See Interior Painting
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
);

/* ---------------------------------------------------------- */
/* Antonio                                                     */
/* ---------------------------------------------------------- */
const AboutAntonio = () => (
    <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 z-0">
            <img
                src="/about/craftsmanship.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="w-full h-full object-cover brightness-[0.2]"
            />
            <div className="absolute inset-0 bg-ink/60" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-14 md:py-20 text-center">
            <motion.span {...fadeUp()} className="eyebrow block mb-8">
                Who does the work
            </motion.span>

            <motion.div {...fadeUp(0.06)} className="flex items-center justify-center gap-5 mb-7">
                <Monogram size={72} className="text-cream" />
                <div className="text-left">
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream leading-tight mb-1">
                        Antonio Benitez
                    </h2>
                    <span className="text-[15px] font-medium text-taupe">
                        Certified Plaster Specialist · Houston, TX
                    </span>
                </div>
            </motion.div>

            <motion.div {...fadeUp(0.12)} className="rule-luxe mx-auto mb-8" />

            <motion.p
                {...fadeUp(0.18)}
                className="text-xl md:text-2xl text-cream font-serif leading-[1.5] mb-8"
            >
                "Most of a good paint job is the part you never see. If the prep is right, the
                finish lasts. If it isn't, nothing else matters."
            </motion.p>

            <motion.p {...fadeUp(0.24)} className="text-[17px] text-stone leading-[1.8] mb-4">
                Antonio has spent years painting homes and businesses across Houston. He is a
                certified plaster specialist, and he lays every plaster wall himself.
            </motion.p>
            <motion.p {...fadeUp(0.3)} className="text-[17px] text-stone leading-[1.8] mb-9">
                On painting, cabinets, and staining jobs, he trains the crew, works alongside them,
                and checks the whole job before we call it finished. One room or a whole house, the
                standard is the same.
            </motion.p>

            <motion.div {...fadeUp(0.36)} className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact" className="btn btn-cream w-full sm:w-auto">
                    Book a Consultation
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={`tel:${PHONE_TEL}`} className="btn btn-outline w-full sm:w-auto">
                    <Phone className="w-4 h-4" />
                    {PHONE_DISPLAY}
                </a>
            </motion.div>
        </div>
    </section>
);

/* ---------------------------------------------------------- */
/* How it works                                                */
/* ---------------------------------------------------------- */
const PROCESS_STEPS = [
    {
        number: "01",
        title: "We come look at it",
        description:
            "You reach out, and Antonio comes to see the space himself. He looks at the light, listens to what you want, and talks through the finishes that would suit it.",
        image: "/services/process.webp",
        alt: "Meeting a Houston homeowner to look at a painting job",
    },
    {
        number: "02",
        title: "Samples, until it is right",
        description:
            "Antonio makes samples for your room and reworks them until you are happy with what you see. Then you get a clear price in writing, with nothing added later.",
        image: "/services/commercial.webp",
        alt: "A written painting quote for a Houston customer",
    },
    {
        number: "03",
        title: "We prep, then we paint",
        description:
            "We cover your floors and furniture. We fix holes, sand, and prime first. Most of the job is prep, and that is what makes paint last.",
        image: "/services/residential.webp",
        alt: "Preparing and priming walls before painting in Houston",
    },
    {
        number: "04",
        title: "We clean up and walk it with you",
        description:
            "We take our things and leave the place clean. Then we walk through it with you. If something is not right, we fix it.",
        image: "/services/cabinetry.webp",
        alt: "Final walkthrough of a finished Houston painting job",
    },
];

const AUTO_ADVANCE_MS = 7000;

const HowItWorks = () => {
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
            setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
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

    return (
        <section className="py-14 md:py-20 bg-offwhite text-ink">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="text-center mb-10 md:mb-12">
                    <motion.span {...fadeUp()} className="eyebrow block mb-4">
                        How it works
                    </motion.span>
                    <motion.h2
                        {...fadeUp(0.06)}
                        className="text-3xl md:text-5xl font-serif font-semibold text-ink leading-tight tracking-[-0.01em] mb-4"
                    >
                        Four steps, start to finish
                    </motion.h2>
                    <motion.p {...fadeUp(0.12)} className="text-[17px] text-ink/70 max-w-xl mx-auto leading-relaxed">
                        You always know what happens next.
                    </motion.p>
                </div>

                {/* Desktop: accordion + image */}
                <div
                    className="hidden md:grid md:grid-cols-[1fr_1.15fr]"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div className="flex flex-col bg-ink">
                        {PROCESS_STEPS.map((step, idx) => {
                            const isActive = idx === activeStep;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleStepClick(idx)}
                                    aria-expanded={isActive}
                                    className={`relative text-left border-b border-cream/[0.06] last:border-b-0 transition-colors duration-500 ${
                                        isActive ? "bg-cream/[0.06]" : "hover:bg-cream/[0.03]"
                                    }`}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] overflow-hidden">
                                        <motion.div
                                            className="w-full bg-taupe"
                                            initial={{ height: "0%" }}
                                            animate={{ height: isActive ? `${progress}%` : "0%" }}
                                            transition={{ duration: 0.05, ease: "linear" }}
                                        />
                                    </div>

                                    <div className="pl-7 pr-6 py-6">
                                        <div className="flex items-center gap-4">
                                            <span
                                                className={`text-2xl font-serif font-semibold transition-colors duration-500 ${
                                                    isActive ? "text-taupe" : "text-cream/20"
                                                }`}
                                            >
                                                {step.number}
                                            </span>
                                            <h3
                                                className={`text-lg font-serif font-semibold transition-colors duration-500 ${
                                                    isActive ? "text-cream" : "text-cream/45"
                                                }`}
                                            >
                                                {step.title}
                                            </h3>
                                        </div>

                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5, ease: softEase }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-[15px] text-stone leading-relaxed mt-3 pr-4">
                                                        {step.description}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative overflow-hidden bg-ink min-h-[380px]">
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
                    </div>
                </div>

                {/* Mobile: simple stacked cards */}
                <div className="md:hidden grid gap-4">
                    {PROCESS_STEPS.map((step) => (
                        <div key={step.number} className="bg-ink text-cream p-6 border-t-2 border-taupe">
                            <span className="block text-2xl font-serif font-semibold text-taupe mb-3 leading-none">
                                {step.number}
                            </span>
                            <h3 className="text-xl font-serif font-semibold text-cream mb-2 leading-snug">
                                {step.title}
                            </h3>
                            <p className="text-[15px] text-stone leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link to="/contact" className="btn btn-ink">
                        Book a Consultation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

/* ---------------------------------------------------------- */
/* Work gallery                                                */
/* ---------------------------------------------------------- */
const OurWork = () => {
    const tiles = [
        { n: "05", label: "Cabinet Painting", area: "Bellaire" },
        { n: "11", label: "Exterior & Stucco", area: "Sugar Land" },
        { n: "01", label: "Venetian Plaster Wall", area: "River Oaks" },
        { n: "07", label: "Interior Repaint", area: "West University" },
        { n: "13", label: "Stained Wood & Trim", area: "Katy" },
        { n: "03", label: "Tadelakt Bath", area: "Memorial" },
        { n: "09", label: "Whole-Home Painting", area: "The Woodlands" },
        { n: "15", label: "Feature Wall", area: "Houston" },
    ];

    return (
        <section className="relative bg-ink overflow-hidden border-t border-white/10">
            <div className="py-12 md:py-16 px-6 text-center">
                <span className="eyebrow block mb-4">Recent jobs</span>
                <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em] mb-4">
                    See our work
                </h2>
                <p className="text-[17px] text-stone max-w-2xl mx-auto leading-relaxed">
                    Painting, cabinets, staining, and plaster from homes across Greater Houston.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4">
                {tiles.map((tile, idx) => (
                    <motion.div
                        key={tile.n}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: (idx % 4) * 0.08, ease: softEase }}
                        viewport={{ once: true }}
                        className="relative h-48 sm:h-64 md:h-80 overflow-hidden group"
                    >
                        <img
                            src={galleryTile(tile.n)}
                            alt={`${tile.label} by South Coast in ${tile.area}, Houston`}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out brightness-[0.6] group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                            <h3 className="text-[15px] sm:text-lg font-serif font-semibold text-cream mb-1 leading-snug">
                                {tile.label}
                            </h3>
                            <span className="text-[13px] font-medium text-taupe">{tile.area}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

/* ---------------------------------------------------------- */
/* Reviews                                                     */
/* ---------------------------------------------------------- */
const Reviews = () => {
    const reviews = [
        {
            quote:
                "I couldn't be happier with the results of our cabinet painting! The team was professional, detail-oriented, and truly transformed our kitchen. The finish looks flawless and fresh, like we got brand new cabinets. Everything was done on time and with great care. Highly recommend for anyone looking to give their space a new life!",
            name: "Cynthia Torres",
            detail: "Cabinet Painting · Houston, TX",
            initials: "CT",
        },
        {
            quote:
                "We had an amazing experience. From start to finish, they were professional, punctual, and super easy to work with. The attention to detail was top-notch—they prepped everything thoroughly and made sure the finish was smooth and even. Our home looks completely refreshed and better than we imagined.",
            name: "Emmanuel Diaz",
            detail: "Interior Painting · Houston, TX",
            initials: "ED",
        },
    ];

    return (
        <section className="relative bg-ink-800 py-14 md:py-20 border-y border-white/10">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="text-center mb-10 md:mb-14">
                    <span className="eyebrow block mb-4">Reviews</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em]">
                        What our customers say
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 max-w-4xl mx-auto">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.name}
                            {...fadeUp(idx * 0.1)}
                            className="relative flex flex-col h-full border border-cream/15 bg-ink p-7 md:p-9"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="w-4 h-4 text-taupe fill-taupe" />
                                    ))}
                                </div>
                                <Quote className="w-7 h-7 text-taupe/30" strokeWidth={1.5} />
                            </div>
                            <p className="text-[16px] md:text-[17px] text-cream/90 leading-[1.75] mb-7 flex-grow">
                                "{review.quote}"
                            </p>
                            <div className="flex items-center gap-3 mt-auto border-t border-cream/10 pt-5">
                                <div className="w-11 h-11 border border-taupe/40 flex items-center justify-center flex-shrink-0">
                                    <span className="text-cream font-serif font-semibold text-[14px]">
                                        {review.initials}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[15px] font-medium text-cream">{review.name}</p>
                                    <p className="text-[13px] text-stone/70">{review.detail}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/contact" className="btn btn-cream">
                        Book a Consultation
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

/* ---------------------------------------------------------- */
/* Final CTA                                                   */
/* ---------------------------------------------------------- */
const FinalCTA = () => (
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

        <motion.div
            {...fadeUp()}
            className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center"
        >
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-[1.12] tracking-[-0.01em] mb-5">
                Ready for a fresh coat?
            </h2>
            <p className="text-[17px] md:text-lg text-stone leading-relaxed mb-9 max-w-xl mx-auto">
                Tell us what you need painted. We come look at it and give you a clear price in
                writing. It costs nothing, and there is no pressure to say yes.
            </p>

            <div className="flex flex-col items-center gap-3 mb-9">
                {[
                    "Samples made until you are happy",
                    "We answer within one business day",
                    "Homes and businesses across Greater Houston",
                ].map((promise) => (
                    <div key={promise} className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-taupe flex-shrink-0" strokeWidth={2} />
                        <span className="text-[16px] text-cream/90">{promise}</span>
                    </div>
                ))}
            </div>

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

            <p className="mt-8 text-[15px] text-stone/60 leading-relaxed max-w-2xl mx-auto">
                Serving {SERVICE_AREAS.join(" · ")}.
            </p>
        </motion.div>
    </section>
);

/* ---------------------------------------------------------- */

export default function Home() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
            {
                "@type": "Question",
                name: "What does South Coast Quality Painting do?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "South Coast Quality Painting is a painting company in Houston, Texas. We do interior painting, exterior painting, cabinet painting, and wood staining for homes and businesses. We also do Venetian plaster, which is our specialty.",
                },
            },
            {
                "@type": "Question",
                name: "Do you paint regular houses or only plaster?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We paint regular houses every day. Most of our work is normal interior and exterior painting and cabinet painting. Venetian plaster is our specialty, but it is only one of the five services we offer.",
                },
            },
            {
                "@type": "Question",
                name: "How does a consultation with South Coast work?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Antonio Benitez comes to your home himself, looks at the space and the light, and talks through the finishes that would suit it. He makes samples for your room and reworks them until you are happy with what you see. Then you get a clear price in writing.",
                },
            },
            {
                "@type": "Question",
                name: "What areas of Houston does South Coast serve?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We serve Greater Houston, including River Oaks, Memorial, Bellaire, West University Place, The Woodlands, Sugar Land, Katy, Cypress, Spring, Pearland, Friendswood, League City, Missouri City, Richmond, and Kingwood.",
                },
            },
        ],
    };

    return (
        <div className="bg-ink w-full overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Houston Painters | Interior, Exterior & Cabinet Painting | South Coast Quality Painting"
                description="South Coast Quality Painting paints homes and businesses in Houston, TX. Interior and exterior painting, cabinet painting, wood staining, and Venetian plaster. Consultations — call (713) 539-8069."
                path="/"
                schema={schema}
            />
            <Hero />
            <TrustBar />
            <WhatWeDo />
            <PickyPeople />
            <SignatureFinish />
            <AboutAntonio />
            <HowItWorks />
            <OurWork />
            <Reviews />
            <FinalCTA />
        </div>
    );
}
