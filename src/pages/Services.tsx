import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Phone, Star } from "lucide-react";
import SEO from "../hooks/useSEO";
import { Monogram } from "@/components/Logo";
import { SERVICES, SERVICE_AREAS, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/services";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease, delay },
});

/* ---- Questions people ask before they pick a painter (site-wide) ---- */
const HUB_FAQS = [
    {
        q: "What kind of work does South Coast do?",
        a: "We are a painting company in Houston, Texas. We paint the inside and outside of homes and businesses, we paint and refinish kitchen cabinets, and we stain wood. We also do Venetian plaster, which is our specialty and something very few painters here can do.",
    },
    {
        q: "Do you paint regular houses, or only fancy plaster work?",
        a: "We paint regular houses every day. Most of our work is normal interior and exterior painting and cabinet painting. Venetian plaster is our specialty, but it is only one of the five things we do.",
    },
    {
        q: "How does a consultation with Antonio work?",
        a: "Antonio comes to your home himself, looks at the space and the light, and talks through the finishes that would suit it. He makes samples for your room and reworks them until you are happy with what you see. Then you get a clear price in writing. We would rather spend an extra hour on samples than have you live with a color you are not sure about.",
    },
    {
        q: "Why is Venetian plaster more expensive than paint?",
        a: "Venetian plaster has a lot of steps involved, and a skilled professional is usually required. The product is crushed and fired limestone with marble dust. There is sanding, washing, and burnishing between coats. This is why it comes with a steep price tag. If Venetian plaster is not the right option for your budget, we also offer decorative faux finishes, lime wash, and glaze, which still create a beautiful custom look with more flexibility.",
    },
    {
        q: "How fast can you start?",
        a: "It depends on the season and the size of the job, but we can usually start within one to three weeks. If you have a deadline, tell us when you call and we will be straight with you about whether we can hit it.",
    },
    {
        q: "Do you work on businesses too, or just homes?",
        a: "Both. We paint offices, shops, restaurants, and other work spaces as well as private homes. For businesses we schedule around your hours, including nights and weekends, so we do not get in the way of your customers.",
    },
    {
        q: "Do you offer a flat paint that can be washed?",
        a: "Yes, and almost no other painter in Houston does. Normal flat paint stains as soon as you wipe it, so people get pushed toward shiny satin or eggshell that shows every bump in the wall. Our flat finish stays flat and soft-looking but wipes clean and can even be scrubbed. It hides wall flaws and lasts up to 10 years.",
    },
    {
        q: "What parts of Houston do you serve?",
        a: "We serve Greater Houston, including River Oaks, Memorial, Bellaire, West University Place, The Woodlands, Sugar Land, Katy, Cypress, Spring, Pearland, Friendswood, League City, Missouri City, Richmond, and Kingwood.",
    },
    {
        q: "Who actually does the work?",
        a: "Antonio Benitez runs the crew and is a certified plaster specialist. He does all of the plaster work himself. For painting, cabinets, and staining, he trains and supervises the crew and checks the job before we call it done.",
    },
];

const PROCESS = [
    {
        number: "01",
        title: "Antonio comes to see it",
        text: "You reach out, and Antonio comes to the space himself. He looks at the light, listens to what you want, and talks through the finishes that would suit it.",
    },
    {
        number: "02",
        title: "Samples, until it is right",
        text: "Antonio makes samples for your room and reworks them until you are happy with what you see. Then you get a clear price in writing, with nothing added later.",
    },
    {
        number: "03",
        title: "We prep, then we paint",
        text: "We cover your floors and furniture. We fix, sand, and prime first. Most of the work is prep — that is what makes paint last.",
    },
    {
        number: "04",
        title: "We clean up and walk it with you",
        text: "We take our stuff and leave the place clean. Then we walk through it with you. If something is not right, we fix it.",
    },
];

export default function Services() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${SITE_URL}/services#faq`,
            mainEntity: HUB_FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${SITE_URL}/services#list`,
            name: "Painting and finishing services in Houston, TX",
            itemListElement: SERVICES.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.name,
                url: `${SITE_URL}/${s.slug}`,
            })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${SITE_URL}/services#breadcrumb`,
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
            ],
        },
    ];

    return (
        <div className="bg-ink w-full min-h-screen text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Painting Services in Houston, TX"
                description="Interior and exterior painting, cabinet painting, wood staining and Venetian plaster in Houston, TX. Call (713) 539-8069."
                path="/services"
                schema={schema}
            />

            {/* ---------- Hero ---------- */}
            <section className="relative">
                <div className="bg-ink h-20 md:h-[72px]" />
                <div className="flex flex-col-reverse md:flex-row md:min-h-[62vh]">
                    <div className="w-full md:w-1/2 bg-offwhite text-ink flex items-center p-6 py-12 md:p-14 lg:p-20">
                        <div className="w-full max-w-xl">
                            <motion.span {...fadeUp()} className="eyebrow block mb-5">
                                Our Services · Houston, TX
                            </motion.span>
                            <motion.h1
                                {...fadeUp(0.08)}
                                className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-ink leading-[1.08] tracking-[-0.01em] mb-5"
                            >
                                Work worth living with.
                            </motion.h1>
                            <motion.div {...fadeUp(0.14)} className="rule-luxe mb-6" />
                            <motion.p
                                {...fadeUp(0.2)}
                                className="text-lg md:text-xl text-ink/75 leading-relaxed mb-8"
                            >
                                We paint homes and businesses, inside and out. We bring cabinets back to
                                life. We stain wood. And we lay real Venetian plaster by hand.
                            </motion.p>
                            <motion.div {...fadeUp(0.28)} className="flex flex-col sm:flex-row gap-3">
                                <Link to="/contact" className="btn btn-ink w-full sm:w-auto">
                                    Book a Consultation
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href={`tel:${PHONE_TEL}`}
                                    className="btn w-full sm:w-auto border border-ink/25 text-ink hover:bg-ink hover:text-cream"
                                >
                                    <Phone className="w-4 h-4" />
                                    {PHONE_DISPLAY}
                                </a>
                            </motion.div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 relative h-[38vh] md:h-auto overflow-hidden">
                        <img
                            src="/services/hero.webp"
                            alt="South Coast painters at work on a Houston home"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-ink/10" />
                    </div>
                </div>
            </section>

            {/* ---------- The five services ---------- */}
            <section className="bg-ink py-14 md:py-20 border-y border-white/10">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-10 md:mb-14">
                        <span className="eyebrow block mb-4">What we do</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em] mb-4">
                            Pick the job you need
                        </h2>
                        <p className="text-[17px] text-stone max-w-2xl mx-auto leading-relaxed">
                            Each one has its own page with prices, steps, and answers to the
                            questions people ask us most.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {SERVICES.map((s, i) => (
                            <motion.div key={s.slug} {...fadeUp(i * 0.06)}>
                                <Link
                                    to={`/${s.slug}`}
                                    className="group relative flex flex-col h-full overflow-hidden bg-ink-800 hover:bg-ink-700 transition-colors duration-500 min-h-[300px]"
                                >
                                    <div className="relative h-40 overflow-hidden">
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

                        {/* Sixth tile: the consultation itself */}
                        <motion.div {...fadeUp(0.3)}>
                            <Link
                                to="/contact"
                                className="group flex flex-col h-full min-h-[300px] bg-cream text-ink p-7 hover:bg-offwhite transition-colors duration-500"
                            >
                                <span className="eyebrow block mb-4 !text-taupe-dark">Start here</span>
                                <h3 className="text-2xl font-serif font-semibold text-ink mb-3 leading-snug">
                                    Not Sure Yet?
                                </h3>
                                <p className="text-[15px] text-ink/70 leading-relaxed mb-6 flex-1">
                                    Bring Antonio the room and the problem. He makes samples in your own
                                    light and reworks them until you see the one. Picky is
                                    welcome here.
                                </p>
                                <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink group-hover:text-taupe transition-colors">
                                    Ask Us
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ---------- Signature: washable flat ---------- */}
            <section className="relative bg-offwhite text-ink">
                <div className="grid md:grid-cols-2">
                    <div className="relative h-[36vh] md:h-auto md:min-h-[54vh] overflow-hidden order-2 md:order-1">
                        <img
                            src="/services/residential.webp"
                            alt="Smooth washable flat wall finish that hides drywall flaws, Houston"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex items-center p-6 py-12 md:p-14 lg:p-20 order-1 md:order-2">
                        <div className="max-w-xl">
                            <motion.span {...fadeUp()} className="eyebrow block mb-5">
                                Only from South Coast
                            </motion.span>
                            <motion.h2
                                {...fadeUp(0.06)}
                                className="text-3xl md:text-5xl font-serif font-semibold text-ink leading-[1.1] tracking-[-0.01em] mb-5"
                            >
                                A flat paint you can <span className="text-taupe">actually wash.</span>
                            </motion.h2>
                            <motion.div {...fadeUp(0.12)} className="rule-luxe mb-7" />
                            <motion.p {...fadeUp(0.18)} className="text-[17px] text-ink/75 leading-[1.8] mb-8">
                                Flat paint looks soft and hides bumps in the wall. The problem is
                                that it stains the second you touch it. So most painters push you to
                                satin or eggshell, which is shiny and shows every flaw. We use a flat
                                finish that stays flat and soft-looking but wipes clean and can be
                                scrubbed. Almost no one else in Houston can do it.
                            </motion.p>
                            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-9">
                                {[
                                    "Wipes clean and can be scrubbed",
                                    "Hides bumps and flaws in drywall",
                                    "Lasts up to 10 years",
                                    "Great for hallways and kids' rooms",
                                ].map((b, i) => (
                                    <motion.div key={b} {...fadeUp(0.22 + i * 0.05)} className="flex items-start gap-3">
                                        <Check className="w-4 h-4 text-taupe flex-shrink-0 mt-1" strokeWidth={2} />
                                        <span className="text-[15px] text-ink/80 leading-snug">{b}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <motion.div {...fadeUp(0.45)}>
                                <Link to="/interior-painting" className="btn btn-ink">
                                    See Interior Painting
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- How it works ---------- */}
            <section id="process" className="bg-ink py-14 md:py-20 border-y border-white/10 scroll-mt-20">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-10 md:mb-14">
                        <span className="eyebrow block mb-4">How it works</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-semibold text-cream leading-tight tracking-[-0.01em] mb-4">
                            Four steps, start to finish
                        </h2>
                        <p className="text-[17px] text-stone max-w-xl mx-auto leading-relaxed">
                            You always know what happens next.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {PROCESS.map((s, i) => (
                            <motion.div
                                key={s.number}
                                {...fadeUp(i * 0.08)}
                                className="bg-ink-800 p-7 border-t-2 border-taupe"
                            >
                                <span className="block text-3xl font-serif font-semibold text-taupe mb-4 leading-none">
                                    {s.number}
                                </span>
                                <h3 className="text-xl font-serif font-semibold text-cream mb-3 leading-snug">
                                    {s.title}
                                </h3>
                                <p className="text-[15px] text-stone leading-relaxed">{s.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/contact" className="btn btn-cream">
                            Book a Consultation
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ---------- Antonio + reviews ---------- */}
            <section id="reviews" className="bg-ink-800 py-14 md:py-20 scroll-mt-20">
                <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-center">
                    <div>
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                            <Monogram size={60} className="text-cream" />
                            <div>
                                <h2 className="text-2xl font-serif font-semibold text-cream leading-tight">
                                    Antonio Benitez
                                </h2>
                                <p className="text-[14px] text-taupe font-medium mt-1">
                                    Certified Plaster Specialist
                                </p>
                            </div>
                        </div>
                        <p className="text-[16px] text-stone leading-[1.8] mb-6">
                            Antonio runs every job. He is a certified plaster specialist and lays all
                            the plaster himself. For painting, cabinets, and staining, he trains the
                            crew and checks the work before we call it done.
                        </p>
                        <Link to="/contact" className="btn btn-outline">
                            Talk to Antonio
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="bg-ink p-7 md:p-10">
                        <div className="flex gap-1 mb-5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-5 h-5 text-taupe fill-taupe" />
                            ))}
                        </div>
                        <blockquote className="text-lg md:text-xl font-serif text-cream leading-[1.6] mb-6">
                            "From start to finish, they were professional, punctual, and super easy to
                            work with. They prepped everything thoroughly and made sure the finish was
                            smooth and even. Our home looks completely refreshed and better than we
                            imagined."
                        </blockquote>
                        <p className="text-[15px] font-medium text-cream">Emmanuel Diaz</p>
                        <p className="text-[13px] text-stone/70">Interior Painting · Houston, TX</p>
                    </div>
                </div>
            </section>

            {/* ---------- FAQ ---------- */}
            <section id="faq" className="bg-offwhite text-ink py-14 md:py-20 scroll-mt-20">
                <div className="max-w-3xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-10">
                        <span className="eyebrow block mb-4">Questions</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ink tracking-[-0.01em]">
                            Things people ask us
                        </h2>
                    </div>

                    <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
                        {HUB_FAQS.map((item, i) => (
                            <div key={i}>
                                <h3>
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        aria-expanded={openFaq === i}
                                        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                                    >
                                        <span className="text-[17px] font-sans font-medium text-ink group-hover:text-taupe transition-colors">
                                            {item.q}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-ink/40 flex-shrink-0 transition-transform duration-400 ${
                                                openFaq === i ? "rotate-180 text-taupe" : ""
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
                </div>
            </section>

            {/* ---------- Areas + final CTA ---------- */}
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
                        Get your consultation
                    </h2>
                    <p className="text-[17px] md:text-lg text-stone leading-relaxed mb-8 max-w-xl mx-auto">
                        Tell us what you need. We come look at it and give you a clear price in
                        writing. It costs nothing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-9">
                        <Link to="/contact" className="btn btn-cream w-full sm:w-auto">
                            Book a Consultation
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${PHONE_TEL}`} className="btn btn-outline w-full sm:w-auto">
                            <Phone className="w-4 h-4" />
                            {PHONE_DISPLAY}
                        </a>
                    </div>
                    <p className="text-[15px] text-stone/70 leading-relaxed max-w-2xl mx-auto">
                        Serving {SERVICE_AREAS.join(" · ")}.
                    </p>
                </div>
            </section>
        </div>
    );
}
