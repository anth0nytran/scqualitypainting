import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import SEO from "../hooks/useSEO";
import { Monogram } from "@/components/Logo";
import ConsultationQuiz from "@/components/ConsultationQuiz";
import GoogleReviews from "@/components/GoogleReviews";
import { SERVICES, SERVICE_AREAS, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/services";

const ease = [0.16, 1, 0.3, 1] as const;

const INTENT_CONTENT = {
    consultation: {
        eyebrow: "Consultation",
        heading: "Let's talk about\nyour project",
        description:
            "Answer three quick questions below. It takes about 30 seconds. Then Antonio will look at your project himself and get back to you within one business day.",
        promises: ["You approve the color before we start", "A clear price in writing", "Antonio handles it personally"],
    },
    contact: {
        eyebrow: "Get In Touch",
        heading: "Let's talk about\nyour project",
        description:
            "Whether you need one room painted, your cabinets redone, or a plaster wall, we are glad to help. Tell us about it below.",
        promises: ["We answer fast", "Easy to work with", "You approve the color before we start"],
    },
    quote: {
        eyebrow: "Consultation",
        heading: "Tell us about\nthe job",
        description:
            "Share what you need done — painting, cabinets, staining, or plaster. We will come look at it and send you a clear price.",
        promises: ["Clear prices, in writing", "No hidden fees", "Consultation, no pressure"],
    },
} as const;

type Intent = keyof typeof INTENT_CONTENT;

export default function Contact() {
    const [searchParams] = useSearchParams();
    const intent = useMemo<Intent>(() => {
        const raw = searchParams.get("intent");
        if (raw === "contact" || raw === "quote") return raw;
        return "consultation";
    }, [searchParams]);
    const content = INTENT_CONTENT[intent];

    // A service page can deep-link here with ?service=cabinet-painting
    const presetService = useMemo(() => {
        const raw = searchParams.get("service");
        return raw && SERVICES.some((s) => s.slug === raw) ? raw : undefined;
    }, [searchParams]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#page`,
        url: `${SITE_URL}/contact`,
        name: "Book a private consultation in Houston, TX",
        mainEntity: { "@id": `${SITE_URL}/#business` },
    };

    return (
        <div className="bg-ink w-full min-h-screen text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Book a Consultation | South Coast Quality Painting"
                description="Book a consultation with Antonio Benitez for painting, cabinets, wood staining or Venetian plaster in Houston, TX. Call (713) 539-8069."
                path="/contact"
                schema={schema}
            />

            {/* Split: info panel + quote form */}
            <section id="form" className="flex flex-col md:flex-row min-h-screen">
                {/* Left: value prop + contact details */}
                <div className="w-full md:w-[42%] lg:w-[38%] bg-ink-800 border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col justify-center p-6 pt-24 md:p-12 lg:p-14">
                    <motion.span
                        key={`eyebrow-${intent}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.15 }}
                        className="eyebrow block mb-4"
                    >
                        {content.eyebrow}
                    </motion.span>
                    <motion.h1
                        key={`heading-${intent}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.25 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-cream leading-[1.1] tracking-[-0.01em] mb-6"
                    >
                        {content.heading.split("\n").map((line, i, arr) => (
                            <span key={i}>
                                {line}
                                {i < arr.length - 1 && (
                                    <>
                                        <br className="hidden md:block" />
                                        <span className="md:hidden"> </span>
                                    </>
                                )}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Call now — the fastest path for a ready buyer */}
                    <motion.a
                        href={`tel:${PHONE_TEL}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.3 }}
                        className="btn btn-cream w-full mb-4"
                    >
                        <Phone className="w-4 h-4" />
                        Call {PHONE_DISPLAY}
                    </motion.a>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="text-[14px] text-stone text-center mb-7"
                    >
                        Or fill out the form — it takes 30 seconds.
                    </motion.p>

                    {/* Antonio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.4 }}
                        className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.08]"
                    >
                        <div className="flex-shrink-0">
                            <Monogram size={52} className="text-cream" />
                        </div>
                        <div>
                            <h2 className="text-[17px] font-serif font-semibold text-cream leading-tight">
                                Antonio Benitez
                            </h2>
                            <p className="text-[14px] text-accent-auto font-medium mt-0.5">
                                Certified Plaster Specialist
                            </p>
                            <p className="text-[13px] text-stone/90 mt-0.5">
                                Painting · Cabinets · Staining · Plaster
                            </p>
                            <p className="text-[13px] text-stone/90 mt-0.5">
                                Painting Kickerillo custom homes since 1999
                            </p>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.45 }}
                        className="text-[16px] text-stone leading-relaxed mb-7"
                    >
                        {content.description}
                    </motion.p>

                    <div className="space-y-3 mb-8">
                        {content.promises.map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease, delay: 0.5 + i * 0.08 }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle className="w-4 h-4 text-accent-auto flex-shrink-0" strokeWidth={2} />
                                <span className="text-[16px] text-cream/90">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="border-t border-white/[0.06] pt-6 space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-accent-auto flex-shrink-0" />
                            <a
                                href="mailto:benitezantonio@live.com"
                                className="text-[15px] text-cream hover:text-accent-auto transition-colors break-all"
                            >
                                benitezantonio@live.com
                            </a>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="w-4 h-4 text-accent-auto flex-shrink-0 mt-1" />
                            <span className="text-[15px] text-stone">
                                Monday to Saturday · 8 AM to 6 PM
                                <span className="block text-stone/90 text-[14px] mt-0.5">
                                    Visits by appointment
                                </span>
                            </span>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-accent-auto flex-shrink-0 mt-1" />
                            <span className="text-[15px] text-stone">
                                Greater Houston, Texas
                                <span className="block text-stone/90 text-[14px] mt-0.5">
                                    We travel for the right project
                                </span>
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Right: quote form */}
                {/* Solid panel — a photo behind this made the answer choices
                    unreadable, which is the last place to lose a lead. */}
                <div className="w-full md:w-[58%] lg:w-[62%] relative bg-ink">
                    <div className="relative z-10 flex items-center justify-center min-h-[80vh] md:min-h-screen p-6 py-16 md:p-14 lg:p-16 pt-28 md:pt-24">
                        <ConsultationQuiz presetService={presetService} />
                    </div>
                </div>
            </section>

            {/* Jump to a service page */}
            <section className="bg-offwhite text-ink py-12 md:py-16 border-y border-ink/10">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-8">
                        <span className="eyebrow block mb-3">Want details first?</span>
                        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-ink tracking-[-0.01em]">
                            Read about the job you need
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {SERVICES.map((s) => (
                            <Link
                                key={s.slug}
                                to={`/${s.slug}`}
                                className="border border-ink/20 px-5 py-3 text-[15px] font-medium text-ink hover:bg-ink hover:text-cream transition-colors duration-400"
                            >
                                {s.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews */}
            <section className="bg-ink py-14 md:py-18">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <GoogleReviews
                        heading="What our customers say"
                        sub="Every one of these is a real Google review."
                    />
                </div>
            </section>

            {/* Areas */}
            <section className="bg-ink-800 py-12 border-t border-white/10">
                <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-cream mb-4">
                        Where we work
                    </h2>
                    <p className="text-[16px] text-stone leading-relaxed">
                        {SERVICE_AREAS.join(" · ")} — and the neighborhoods in between.
                    </p>
                </div>
            </section>
        </div>
    );
}
