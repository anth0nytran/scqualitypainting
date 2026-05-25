import { useState, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Clock, Star, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import SEO from "../hooks/useSEO";
import { Monogram } from "@/components/Logo";

// --- Shared animation helpers (same vocabulary as Home.tsx) ---
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease, delay },
});


const INTENT_CONTENT = {
    contact: {
        eyebrow: "Get In Touch",
        heading: "Let's Talk About\nYour Space",
        description: "Whether you're considering a Venetian plaster feature wall, a full repaint, or simply exploring finishes, we're glad to help. Reach out and tell us about your project — calmly, at your own pace.",
        promises: [
            "Honest, detailed guidance",
            "Responsive and easy to work with",
            "Craftsmanship you can see",
        ],
        formEyebrow: "Get Started",
        formHeading: "Send a Message",
        formButton: "Send Message",
    },
    consultation: {
        eyebrow: "Book a Consultation",
        heading: "Book a Complimentary\nConsultation",
        description: "Sit down with Antonio to talk through your palette, surfaces, and finishes. We'll walk your space, listen carefully, and offer honest guidance on what will look and last best — with no obligation.",
        promises: [
            "Complimentary consultation",
            "Honest, detailed guidance",
            "Craftsmanship you can see",
        ],
        formEyebrow: "Reserve Your Time",
        formHeading: "Book a Consultation",
        formButton: "Book Consultation",
    },
    quote: {
        eyebrow: "Request a Quote",
        heading: "Request a Project\nQuote",
        description: "Tell us about the work you have in mind — plaster, painting, exterior, or cabinetry. We'll review the details and follow up with a clear, considered estimate tailored to your space.",
        promises: [
            "Clear, detailed estimates",
            "Honest, detailed guidance",
            "Craftsmanship you can see",
        ],
        formEyebrow: "Tell Us About It",
        formHeading: "Request a Quote",
        formButton: "Request Quote",
    },
} as const;

type Intent = keyof typeof INTENT_CONTENT;

export default function Contact() {
    const [searchParams] = useSearchParams();
    const intent = useMemo<Intent>(() => {
        const raw = searchParams.get("intent");
        if (raw === "consultation" || raw === "quote") return raw;
        return "contact";
    }, [searchParams]);
    const content = INTENT_CONTENT[intent];

    const reviews = [
        { quote: "I couldn't be happier with the results of our cabinet painting! The team was professional, detail-oriented, and truly transformed our kitchen. The finish looks flawless and fresh, like we got brand new cabinets. Everything was done on time and with great care. Highly recommend for anyone looking to give their space a new life!", name: "Cynthia Torres", detail: "Cabinetry Finishing · Houston, TX", initials: "CT" },
        { quote: "We had an amazing experience. From start to finish, they were professional, punctual, and super easy to work with. The attention to detail was top-notch—they prepped everything thoroughly and made sure the finish was smooth and even. Our home looks completely refreshed and better than we imagined.", name: "Emmanuel Diaz", detail: "Residential Painting · Houston, TX", initials: "ED" },
    ];
    const [idx, setIdx] = useState(0);
    const review = reviews[idx];

    // ---- Form state ----
    const [form, setForm] = useState({
        fullName: "", phone: "", email: "", address: "", service: "", timeline: "",
        website: "", fax: "", company_url: "", _ts: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [apiError, setApiError] = useState("");
    const formRef = useRef<HTMLFormElement>(null);
    const tsRef = useRef(Date.now());

    const formatPhone = (raw: string) => {
        const d = raw.replace(/\D/g, "").slice(0, 10);
        if (d.length <= 3) return d;
        if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
        return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    };

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const val = field === "phone" ? formatPhone(e.target.value) : e.target.value;
        setForm(f => ({ ...f, [field]: val }));
        if (errors[field]) setErrors(er => { const n = { ...er }; delete n[field]; return n; });
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.fullName.trim() || form.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
        const digits = form.phone.replace(/\D/g, "");
        if (digits.length < 10) e.phone = "Please enter a valid phone number.";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email.trim())) e.email = "Please enter a valid email.";
        if (!form.service) e.service = "Please select a service.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError("");
        if (!validate()) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: form.fullName.trim(),
                    phone: form.phone.trim(),
                    email: form.email.trim(),
                    address: form.address.trim(),
                    service: form.service,
                    timeline: form.timeline,
                    website: form.website,
                    fax: form.fax,
                    company_url: form.company_url,
                    _ts: String(tsRef.current),
                }),
            });
            const data = await res.json();
            if (!res.ok && data?.error) {
                setApiError(data.error);
            } else {
                setSubmitted(true);
            }
        } catch {
            setApiError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-ink w-full min-h-screen text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Contact — Book a Consultation in Houston, TX"
                description="Contact South Coast Quality Painting, Inc. for Venetian plaster, architectural finishes, and painting in Houston, TX. Book a complimentary consultation or request a quote. Call (713) 539-8069."
                path="/contact"
            />

            {/* Split Layout: Info panel + Form */}
            <section id="form" className="flex flex-col md:flex-row min-h-screen">

                {/* Left: Value prop + craftsman card + promises */}
                <div className="w-full md:w-[45%] lg:w-[42%] bg-ink-800 border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col justify-center p-5 pt-24 md:p-12 lg:p-16">

                    <motion.span
                        key={`eyebrow-${intent}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.2 }}
                        className="text-taupe text-[11px] tracking-[0.3em] font-light uppercase block mb-4"
                    >
                        {content.eyebrow}
                    </motion.span>
                    <motion.h2
                        key={`heading-${intent}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.3 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-[0.02em] text-cream leading-[1.15] mb-5 md:mb-6"
                    >
                        {content.heading.split("\n").map((line, i, arr) => (
                            <span key={i}>{line}{i < arr.length - 1 && <><br className="hidden md:block" /><span className="md:hidden"> </span></>}</span>
                        ))}
                    </motion.h2>

                    {/* Craftsman card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.4 }}
                        className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6 pb-5 md:pb-6 border-b border-white/[0.08]"
                    >
                        <div className="flex-shrink-0">
                            <Monogram size={52} className="text-cream" />
                        </div>
                        <div>
                            <h3 className="text-sm font-serif font-light tracking-wide text-cream leading-tight">Antonio Benitez</h3>
                            <p className="text-[11px] text-stone font-sans font-light mt-0.5">Plaster Specialist · Houston, TX</p>
                            <p className="text-[11px] text-stone/70 font-sans font-light mt-0.5">Venetian &amp; Tadelakt Plaster · Painting · Cabinetry</p>
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.5 }}
                        className="text-[13px] md:text-[14px] text-stone font-sans font-light leading-relaxed tracking-[0.01em] mb-6 md:mb-8"
                    >
                        {content.description}
                    </motion.p>

                    {/* Promises */}
                    <div className="space-y-4 mb-8">
                        {content.promises.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle className="w-4 h-4 text-taupe flex-shrink-0" />
                                <span className="text-sm text-cream font-sans font-light tracking-[0.01em]">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact details */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
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
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-taupe flex-shrink-0" />
                            <span className="text-sm font-sans font-light text-stone">Serving Greater Houston, TX</span>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="text-[10px] text-stone/70 font-sans font-light uppercase tracking-[0.2em] mt-6"
                    >
                        Antonio Benitez · Plaster Specialist
                    </motion.p>
                </div>

                {/* Right: Form over background image */}
                <div className="w-full md:w-[55%] lg:w-[58%] relative min-h-[80vh] md:min-h-0">
                    {/* Background image */}
                    <img
                        src="/contact/panel.webp"
                        alt="Hand-troweled Venetian plaster feature wall, Houston"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-ink/80 backdrop-blur-[2px]" />

                    <div className="relative z-10 flex items-center justify-center h-full p-8 md:p-14 lg:p-20 pt-28 md:pt-14">
                        <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease }}
                                className="w-full max-w-xl text-center py-12"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, ease, delay: 0.2 }}
                                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
                                >
                                    <CheckCircle className="w-8 h-8 text-cream" />
                                </motion.div>
                                <motion.h3
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.3 }}
                                    className="text-3xl md:text-4xl font-serif font-light text-cream tracking-[0.02em] mb-4"
                                >
                                    Thank You
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.4 }}
                                    className="text-sm md:text-base text-stone font-sans font-light leading-relaxed mb-2 max-w-md mx-auto"
                                >
                                    Thank you, <strong className="text-cream font-normal">{form.fullName.split(" ")[0]}</strong>. Antonio will personally review your request and reach out within <strong className="text-cream font-normal">24 hours</strong>.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.5 }}
                                    className="text-sm text-stone/80 font-sans font-light mb-8"
                                >
                                    A confirmation email has been sent to <strong className="text-cream font-normal">{form.email}</strong>.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.6 }}
                                    className="flex flex-col sm:flex-row gap-3 justify-center"
                                >
                                    <a
                                        href="tel:+17135398069"
                                        className="inline-flex items-center justify-center gap-2 bg-cream text-ink px-6 py-3.5 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500"
                                    >
                                        <Phone className="w-3.5 h-3.5" /> Call South Coast
                                    </a>
                                    <button
                                        onClick={() => { setSubmitted(false); setForm({ fullName: "", phone: "", email: "", address: "", service: "", timeline: "", website: "", fax: "", company_url: "", _ts: "" }); tsRef.current = Date.now(); }}
                                        className="inline-flex items-center justify-center gap-2 border border-white/20 text-cream px-6 py-3.5 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-white/10 transition-all duration-500"
                                    >
                                        Submit Another Request
                                    </button>
                                </motion.div>
                            </motion.div>
                        ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease, delay: 0.3 }}
                            className="w-full max-w-xl"
                        >
                            <span className="text-[11px] font-sans font-light tracking-[0.3em] uppercase text-taupe block mb-2">{content.formEyebrow}</span>
                            <h3 className="text-3xl md:text-4xl font-serif font-light text-cream tracking-[0.02em] mb-8">
                                {content.formHeading}
                            </h3>

                            {apiError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-sans font-light px-4 py-3 mb-6"
                                >
                                    {apiError}
                                </motion.div>
                            )}

                            <form ref={formRef} className="space-y-5" autoComplete="off" onSubmit={handleSubmit} noValidate>
                                {/* Honeypot fields */}
                                <div className="absolute -left-[9999px]" aria-hidden="true">
                                    <input type="text" name="website" tabIndex={-1} value={form.website} onChange={set("website")} />
                                    <input type="text" name="fax" tabIndex={-1} value={form.fax} onChange={set("fax")} />
                                    <input type="text" name="company_url" tabIndex={-1} value={form.company_url} onChange={set("company_url")} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease, delay: 0.5 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-sans font-light tracking-[0.25em] uppercase text-stone">Full Name *</label>
                                        <input
                                            type="text"
                                            value={form.fullName}
                                            onChange={set("fullName")}
                                            className={`w-full bg-ink/60 border ${errors.fullName ? 'border-red-500/60' : 'border-white/15'} p-4 text-cream font-sans font-light text-sm focus:outline-none focus:border-taupe transition-all placeholder:text-stone/50`}
                                            placeholder="Jane Doe"
                                        />
                                        {errors.fullName && <p className="text-red-400 text-[11px] font-sans">{errors.fullName}</p>}
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease, delay: 0.55 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-sans font-light tracking-[0.25em] uppercase text-stone">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={set("phone")}
                                            className={`w-full bg-ink/60 border ${errors.phone ? 'border-red-500/60' : 'border-white/15'} p-4 text-cream font-sans font-light text-sm focus:outline-none focus:border-taupe transition-all placeholder:text-stone/50`}
                                            placeholder="(713) 555-0198"
                                        />
                                        {errors.phone ? (
                                            <p className="text-red-400 text-[11px] font-sans">{errors.phone}</p>
                                        ) : form.phone && form.phone.replace(/\D/g, "").length < 10 ? (
                                            <p className="text-stone/70 text-[11px] font-sans">{form.phone.replace(/\D/g, "").length}/10 digits</p>
                                        ) : form.phone && form.phone.replace(/\D/g, "").length === 10 ? (
                                            <p className="text-green-400/70 text-[11px] font-sans flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Valid number</p>
                                        ) : null}
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.6 }}
                                    className="space-y-2"
                                >
                                    <label className="text-[10px] font-sans font-light tracking-[0.25em] uppercase text-stone">Email Address *</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={set("email")}
                                        className={`w-full bg-ink/60 border ${errors.email ? 'border-red-500/60' : 'border-white/15'} p-4 text-cream font-sans font-light text-sm focus:outline-none focus:border-taupe transition-all placeholder:text-stone/50`}
                                        placeholder="jane@email.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-[11px] font-sans">{errors.email}</p>}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.65 }}
                                    className="space-y-2"
                                >
                                    <label className="text-[10px] font-sans font-light tracking-[0.25em] uppercase text-stone">Project Address</label>
                                    <input
                                        type="text"
                                        value={form.address}
                                        onChange={set("address")}
                                        className="w-full bg-ink/60 border border-white/15 p-4 text-cream font-sans font-light text-sm focus:outline-none focus:border-taupe transition-all placeholder:text-stone/50"
                                        placeholder="123 Main St, Houston, TX"
                                    />
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease, delay: 0.7 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-sans font-light tracking-[0.25em] uppercase text-stone">I'm Interested In... *</label>
                                        <select
                                            value={form.service}
                                            onChange={set("service")}
                                            className={`w-full bg-ink/60 border ${errors.service ? 'border-red-500/60' : 'border-white/15'} p-4 text-cream font-sans font-light text-sm focus:outline-none focus:border-taupe transition-all appearance-none cursor-pointer`}
                                        >
                                            <option value="" disabled>Choose one...</option>
                                            <option value="venetian-plaster">Venetian &amp; Tadelakt Plaster</option>
                                            <option value="residential">Residential Painting</option>
                                            <option value="commercial">Commercial Painting</option>
                                            <option value="exterior">Exterior Painting</option>
                                            <option value="cabinetry">Cabinetry Finishing</option>
                                            <option value="consultation">Free Color Consultation</option>
                                        </select>
                                        {errors.service && <p className="text-red-400 text-[11px] font-sans">{errors.service}</p>}
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, ease, delay: 0.75 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-sans font-light tracking-[0.25em] uppercase text-stone">Timeline</label>
                                        <select
                                            value={form.timeline}
                                            onChange={set("timeline")}
                                            className="w-full bg-ink/60 border border-white/15 p-4 text-cream font-sans font-light text-sm focus:outline-none focus:border-taupe transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>When are you looking?</option>
                                            <option value="asap">As Soon As Possible</option>
                                            <option value="1-3">1 - 3 Months</option>
                                            <option value="3-6">3 - 6 Months</option>
                                            <option value="6-12">6 - 12 Months</option>
                                            <option value="exploring">Just Exploring</option>
                                        </select>
                                    </motion.div>
                                </div>

                                <motion.button
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease, delay: 0.85 }}
                                    type="submit"
                                    disabled={submitting}
                                    className="group w-full flex items-center justify-center gap-3 bg-cream text-ink px-8 py-5 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            {content.formButton}
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            {/* SMS/TCPA Compliance Disclaimer */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                className="text-[9px] text-stone/70 font-sans font-light leading-relaxed mt-5"
                            >
                                By submitting this form, you consent to receive calls, text messages (including via automated technology), and emails from South Coast Quality Painting, Inc. at the phone number and email provided, including for marketing purposes. You understand that consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. You may opt out at any time by replying STOP. View our{" "}
                                <span className="underline cursor-pointer hover:text-cream transition-colors">Privacy Policy</span> and{" "}
                                <span className="underline cursor-pointer hover:text-cream transition-colors">Terms of Service</span>.
                            </motion.p>
                        </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Markers strip */}
            <section className="bg-ink-800 py-10 border-y border-white/[0.06]">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            "Plaster Specialist",
                            "Interior & Exterior",
                            "Residential & Commercial",
                            "Free Consultation",
                        ].map((label, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.1)}
                                className="text-center"
                            >
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
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-taupe fill-taupe" />)}
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={idx}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease }}
                            className="text-xl md:text-2xl font-serif font-light italic text-cream text-center max-w-3xl mx-auto mb-8 leading-relaxed min-h-[120px] flex items-center justify-center"
                        >
                            "{review.quote}"
                        </motion.p>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
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
