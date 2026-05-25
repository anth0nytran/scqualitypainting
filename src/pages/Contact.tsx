import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "../hooks/useSEO";
import { Monogram } from "@/components/Logo";
import ConsultationQuiz from "@/components/ConsultationQuiz";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease, delay },
});

const INTENT_CONTENT = {
    consultation: {
        eyebrow: "Schedule a Private Consultation",
        heading: "Let's Begin With\nYour Space",
        description: "A few quiet questions help Antonio understand your project before you ever pick up the phone. Tell us about the space, the finish you're drawn to, and the outcome you have in mind — there's no obligation.",
        promises: ["Complimentary, no-obligation consultation", "Honest, detailed guidance", "Craftsmanship you can see"],
    },
    contact: {
        eyebrow: "Get In Touch",
        heading: "Let's Talk About\nYour Space",
        description: "Whether you're considering a Venetian plaster feature wall, a full repaint, or simply exploring finishes, we're glad to help. Walk us through your project below — calmly, at your own pace.",
        promises: ["Honest, detailed guidance", "Responsive and easy to work with", "Craftsmanship you can see"],
    },
    quote: {
        eyebrow: "Request a Project Quote",
        heading: "Tell Us About\nThe Project",
        description: "Share the details of the work you have in mind — plaster, painting, exterior, or cabinetry. We'll review and follow up with a clear, considered estimate tailored to your space.",
        promises: ["Clear, detailed estimates", "Honest, detailed guidance", "Craftsmanship you can see"],
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

    const reviews = [
        { quote: "I couldn't be happier with the results of our cabinet painting! The team was professional, detail-oriented, and truly transformed our kitchen. The finish looks flawless and fresh, like we got brand new cabinets. Everything was done on time and with great care. Highly recommend for anyone looking to give their space a new life!", name: "Cynthia Torres", detail: "Cabinetry Finishing · Houston, TX", initials: "CT" },
        { quote: "We had an amazing experience. From start to finish, they were professional, punctual, and super easy to work with. The attention to detail was top-notch—they prepped everything thoroughly and made sure the finish was smooth and even. Our home looks completely refreshed and better than we imagined.", name: "Emmanuel Diaz", detail: "Residential Painting · Houston, TX", initials: "ED" },
    ];
    const [idx, setIdx] = useState(0);
    const review = reviews[idx];

    return (
        <div className="bg-ink w-full min-h-screen text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Schedule a Private Consultation in Houston, TX"
                description="Book a complimentary, no-obligation consultation with South Coast Quality Painting, Inc. for Venetian plaster, architectural finishes, and painting in Houston, TX. Call (713) 539-8069."
                path="/contact"
            />

            {/* Split Layout: Info panel + Quiz */}
            <section id="form" className="flex flex-col md:flex-row min-h-screen">

                {/* Left: Value prop + craftsman card + promises */}
                <div className="w-full md:w-[42%] lg:w-[40%] bg-ink-800 border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col justify-center p-5 pt-24 md:p-12 lg:p-16">
                    <motion.span
                        key={`eyebrow-${intent}`}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.2 }}
                        className="text-taupe text-[11px] tracking-[0.3em] font-light uppercase block mb-4"
                    >
                        {content.eyebrow}
                    </motion.span>
                    <motion.h1
                        key={`heading-${intent}`}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.3 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-[0.02em] text-cream leading-[1.15] mb-5 md:mb-6"
                    >
                        {content.heading.split("\n").map((line, i, arr) => (
                            <span key={i}>{line}{i < arr.length - 1 && <><br className="hidden md:block" /><span className="md:hidden"> </span></>}</span>
                        ))}
                    </motion.h1>

                    {/* Craftsman card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.4 }}
                        className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6 pb-5 md:pb-6 border-b border-white/[0.08]"
                    >
                        <div className="flex-shrink-0"><Monogram size={52} className="text-cream" /></div>
                        <div>
                            <h2 className="text-sm font-serif font-light tracking-wide text-cream leading-tight">Antonio Benitez</h2>
                            <p className="text-[11px] text-stone font-sans font-light mt-0.5">Plaster Specialist · Houston, TX</p>
                            <p className="text-[11px] text-stone/70 font-sans font-light mt-0.5">Venetian &amp; Tadelakt Plaster · Painting · Cabinetry</p>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.5 }}
                        className="text-[13px] md:text-[14px] text-stone font-sans font-light leading-relaxed tracking-[0.01em] mb-6 md:mb-8"
                    >
                        {content.description}
                    </motion.p>

                    <div className="space-y-4 mb-8">
                        {content.promises.map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle className="w-4 h-4 text-taupe flex-shrink-0" />
                                <span className="text-sm text-cream font-sans font-light tracking-[0.01em]">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.9 }}
                        className="border-t border-white/[0.06] pt-6 space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-taupe flex-shrink-0" />
                            <a href="tel:+17135398069" className="text-sm font-sans font-light text-cream hover:text-taupe transition-colors">(713) 539-8069</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-taupe flex-shrink-0" />
                            <a href="mailto:benitezantonio@live.com" className="text-sm font-sans font-light text-cream hover:text-taupe transition-colors">benitezantonio@live.com</a>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="w-4 h-4 text-taupe flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-sans font-light text-stone">Mon–Sat · 8 AM – 6 PM<span className="block text-stone/70 text-[12px] mt-0.5">Consultations by appointment</span></span>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-taupe flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-sans font-light text-stone">Greater Houston, Texas<span className="block text-stone/70 text-[12px] mt-0.5">Select projects elsewhere welcome</span></span>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Premium consultation quiz over plaster image */}
                <div className="w-full md:w-[58%] lg:w-[60%] relative">
                    <img
                        src="/contact/panel.webp"
                        alt="Hand-troweled Venetian plaster feature wall, Houston"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-ink/90 backdrop-blur-[3px]" />
                    <div className="relative z-10 flex items-center justify-center min-h-[80vh] md:min-h-screen p-6 py-16 md:p-14 lg:p-20 pt-28 md:pt-24">
                        <ConsultationQuiz />
                    </div>
                </div>
            </section>

            {/* Markers strip */}
            <section className="bg-ink-800 py-10 border-y border-white/[0.06]">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {["Plaster Specialist", "Interior & Exterior", "Residential & Commercial", "Free Consultation"].map((label, i) => (
                            <motion.div key={label} {...fadeUp(i * 0.1)} className="text-center">
                                <span className="block text-base md:text-lg font-serif font-light text-cream leading-tight">{label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-ink py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <motion.span {...fadeUp()} className="text-taupe text-[11px] tracking-[0.3em] font-light uppercase block text-center mb-8">Client Reviews</motion.span>
                    <motion.div {...fadeUp(0.1)} className="flex justify-center gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-taupe fill-taupe" />)}
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={idx}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease }}
                            className="text-xl md:text-2xl font-serif font-light italic text-cream text-center max-w-3xl mx-auto mb-8 leading-relaxed min-h-[120px] flex items-center justify-center"
                        >
                            "{review.quote}"
                        </motion.p>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`who-${idx}`}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                            className="flex items-center justify-center gap-3 mb-8"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                                <span className="text-[11px] font-serif font-light text-cream">{review.initials}</span>
                            </div>
                            <div className="text-left">
                                <span className="font-serif font-light text-cream block text-sm tracking-wide">{review.name}</span>
                                <span className="text-[10px] font-sans font-light tracking-[0.2em] text-stone/70 uppercase">{review.detail}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center justify-center gap-4">
                        <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="w-10 h-10 border border-white/15 flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-all duration-500 disabled:opacity-20">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex gap-2">
                            {reviews.map((_, i) => (
                                <button key={i} onClick={() => setIdx(i)} className={`h-1 rounded-full transition-all duration-300 ${i === idx ? 'bg-taupe w-8' : 'bg-white/20 w-4 hover:bg-white/40'}`} />
                            ))}
                        </div>
                        <button onClick={() => setIdx(i => Math.min(reviews.length - 1, i + 1))} disabled={idx === reviews.length - 1} className="w-10 h-10 border border-white/15 flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-all duration-500 disabled:opacity-20">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
