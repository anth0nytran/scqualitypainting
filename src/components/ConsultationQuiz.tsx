import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2, Phone } from "lucide-react";
import { track as baseTrack } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

/* ============================================================
   South Coast — Premium consultation funnel.
   One question per screen (single-tap, auto-advance). Qualifies
   by project VISION/scale (not dollars), lead-scores behind the
   scenes, offers a call/text fast lane, captures funnel/drop-off
   analytics via window.dataLayer (GA4 / GTM ready), and collects
   A2P-compliant SMS opt-in. Submits to /api/send.
   ============================================================ */

const ease = [0.16, 1, 0.3, 1] as const;
const PHONE_DISPLAY = "(713) 539-8069";
const PHONE_TEL = "+17135398069";

// Quiz events flow through the shared tracker → GA4/GTM dataLayer + Vercel Analytics.
const track = (event: string, payload: Record<string, string | number | boolean | null | undefined> = {}) =>
    baseTrack(event, { quiz: "consultation", ...payload });

type QId = "service" | "scale" | "timeline";
interface Choice { value: string; label: string; hint?: string }
interface Step { id: QId; eyebrow: string; heading: string; options: Choice[] }

const STEPS: Step[] = [
    {
        id: "service", eyebrow: "01 · The Work", heading: "What kind of finish do you have in mind?",
        options: [
            { value: "venetian-plaster", label: "Venetian & Tadelakt Plaster", hint: "Hand-applied lime finishes, microcement, feature walls" },
            { value: "washable-flat", label: "Washable Flat Finish", hint: "A true flat look that wipes clean & hides drywall flaws" },
            { value: "residential", label: "Residential Painting", hint: "Interior — refined prep & true-to-color finishes" },
            { value: "exterior", label: "Exterior Painting", hint: "Stucco, siding & trim" },
            { value: "cabinetry", label: "Cabinetry Finishing", hint: "Refinished, properly sealed & caulked" },
            { value: "commercial", label: "Commercial Painting", hint: "Offices, retail, hospitality, large-scale" },
            { value: "multiple", label: "A Full Project", hint: "Several finishes — let's plan it together" },
        ],
    },
    {
        id: "scale", eyebrow: "02 · The Vision", heading: "What are you envisioning?",
        options: [
            { value: "refresh", label: "A focused refresh", hint: "A room or a single update" },
            { value: "feature", label: "A signature feature", hint: "A statement wall or defining moment" },
            { value: "whole-home", label: "A whole-home transformation", hint: "Multiple spaces, considered as one" },
            { value: "estate", label: "A full estate or commercial project", hint: "Large-scale, ground-up or top to bottom" },
        ],
    },
    {
        id: "timeline", eyebrow: "03 · The Timing", heading: "When would you like it completed?",
        options: [
            { value: "ready", label: "I'm ready to begin" },
            { value: "1-3", label: "Within 1 – 3 months" },
            { value: "3-6", label: "Within 3 – 6 months" },
            { value: "exploring", label: "Exploring & planning ahead" },
        ],
    },
];

const LOCATIONS = [
    { value: "houston", label: "Greater Houston" },
    { value: "texas", label: "Elsewhere in Texas" },
    { value: "outside", label: "Outside Texas" },
];

const TOTAL = STEPS.length + 1; // 3 vision steps + details
const CONSENT_TEXT =
    "I consent to receive non-marketing text messages from South Coast Quality Painting, Inc. Message frequency may vary (approximately 2–6 messages per month) and may include quote follow-ups, appointment reminders, project updates, missed call text-backs, after-hours auto-replies, and one-time review requests. Message & data rates may apply. Text HELP for assistance. You may reply STOP to unsubscribe at any time. Your information will not be shared with third parties.";

type Answers = Partial<Record<QId, string>>;

export default function ConsultationQuiz() {
    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [answers, setAnswers] = useState<Answers>({});
    const [contact, setContact] = useState({ fullName: "", email: "", phone: "", address: "", notes: "", location: "" });
    const [smsConsent, setSmsConsent] = useState(false);
    const [ageConfirm, setAgeConfirm] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [apiError, setApiError] = useState("");

    const [hp, setHp] = useState({ website: "", fax: "", company_url: "" });
    const tsRef = useRef(Date.now());
    const furthest = useRef(0);
    const submittedRef = useRef(false);

    const isDetails = step === STEPS.length;
    const progress = Math.round(((step + 1) / TOTAL) * 100);

    useEffect(() => {
        track("quiz_start");
        const onHide = () => {
            if (document.visibilityState === "hidden" && !submittedRef.current && furthest.current > 0) {
                track("quiz_abandon", { last_step: furthest.current, total_steps: TOTAL, reached_details: furthest.current >= STEPS.length });
            }
        };
        document.addEventListener("visibilitychange", onHide);
        return () => document.removeEventListener("visibilitychange", onHide);
    }, []);

    useEffect(() => {
        furthest.current = Math.max(furthest.current, step);
        track("quiz_step_view", { step_index: step, step_id: isDetails ? "details" : STEPS[step].id });
    }, [step, isDetails]);

    const goBack = () => { setDir(-1); setStep((s) => Math.max(0, s - 1)); };

    const choose = (id: QId, value: string) => {
        setAnswers((a) => ({ ...a, [id]: value }));
        track("quiz_answer", { step_id: id, value });
        window.setTimeout(() => { setDir(1); setStep((s) => Math.min(STEPS.length, s + 1)); }, 240);
    };

    // Lead score (scale + timing) — gives the studio a clean Priority/Qualified/Nurture signal.
    const leadTier = useMemo(() => {
        let s = 0;
        const sc = answers.scale;
        if (sc === "estate") s += 3; else if (sc === "whole-home") s += 2; else if (sc === "feature") s += 1;
        const t = answers.timeline;
        if (t === "ready") s += 2; else if (t === "1-3") s += 1; else if (t === "exploring") s -= 1;
        return s >= 4 ? "Priority" : s >= 2 ? "Qualified" : "Nurture";
    }, [answers]);

    const formatPhone = (raw: string) => {
        const d = raw.replace(/\D/g, "").slice(0, 10);
        if (d.length <= 3) return d;
        if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
        return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    };

    const setField = (f: keyof typeof contact) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const val = f === "phone" ? formatPhone(e.target.value) : e.target.value;
        setContact((c) => ({ ...c, [f]: val }));
        if (errors[f]) setErrors((er) => { const n = { ...er }; delete n[f]; return n; });
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!contact.fullName.trim() || contact.fullName.trim().length < 2) e.fullName = "Please enter your name.";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contact.email.trim())) e.email = "Please enter a valid email.";
        // Phone is OPTIONAL (A2P: consent must not be coerced) — validate only if provided.
        const digits = contact.phone.replace(/\D/g, "");
        if (digits.length > 0 && digits.length < 10) e.phone = "Please enter a valid phone number.";
        if (!ageConfirm) e.age = "Please confirm you are at least 18 years old.";
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
                    fullName: contact.fullName.trim(),
                    email: contact.email.trim(),
                    phone: contact.phone.trim(),
                    address: contact.address.trim(),
                    notes: contact.notes.trim(),
                    service: answers.service || "consultation",
                    scale: answers.scale || "",
                    timeline: answers.timeline || "",
                    location: contact.location || "",
                    leadTier,
                    smsConsent,
                    ageConfirm,
                    consentText: CONSENT_TEXT,
                    consentTimestamp: new Date().toISOString(),
                    sourceUrl: typeof window !== "undefined" ? window.location.href : "",
                    source: "consultation-quiz",
                    attribution: getAttribution(),
                    ...hp,
                    _ts: String(tsRef.current),
                }),
            });
            let data: { ok?: boolean; error?: string } | null = null;
            try { data = await res.json(); } catch { /* non-JSON response */ }
            if (!res.ok || data?.ok === false) {
                setApiError(
                    data?.error ||
                    `We couldn't submit that just now. Please call or text us at ${PHONE_DISPLAY}.`
                );
            } else {
                submittedRef.current = true;
                setSubmitted(true);
                const attr = getAttribution();
                track("quiz_complete", { lead_tier: leadTier, service: answers.service, scale: answers.scale, location: contact.location });
                // GA4-standard conversion event with attribution
                track("generate_lead", {
                    lead_tier: leadTier,
                    service: answers.service,
                    scale: answers.scale,
                    sms_opt_in: smsConsent,
                    channel: attr.channel,
                    utm_source: attr.utm_source,
                    utm_campaign: attr.utm_campaign,
                });
            }
        } catch {
            setApiError(`We couldn't reach the server. Please try again, or call/text us at ${PHONE_DISPLAY}.`);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
                className="w-full max-w-xl mx-auto text-center py-8"
            >
                <div className="w-14 h-14 mx-auto mb-6 sm:mb-7 rounded-full border border-taupe/40 flex items-center justify-center">
                    <Check className="w-6 h-6 text-taupe" strokeWidth={1.5} />
                </div>
                <p className="eyebrow mb-4">Request Received</p>
                <h3 className="font-serif font-light text-[1.75rem] sm:text-3xl md:text-4xl text-cream tracking-[0.03em] mb-5">Thank you, {contact.fullName.split(" ")[0]}.</h3>
                <p className="text-stone font-sans font-light text-[14px] leading-relaxed mb-8 max-w-md mx-auto">
                    Antonio will personally review your project and reach out within 24 hours. A confirmation is on its way to <span className="text-cream break-words">{contact.email}</span>.
                </p>
                <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 bg-cream text-ink px-7 py-4 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500">
                    <Phone className="w-3.5 h-3.5" /> Call South Coast
                </a>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-between mb-3">
                <span className="eyebrow">{isDetails ? "04 · Your Details" : STEPS[step].eyebrow}</span>
                <span className="font-sans font-light text-[11px] tracking-[0.25em] text-stone/70">
                    {String(step + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                </span>
            </div>
            <div className="h-px w-full bg-white/10 mb-3 relative overflow-hidden">
                <motion.div className="absolute left-0 top-0 h-full bg-taupe" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease }} />
            </div>
            <p className="font-sans font-light text-[10px] tracking-[0.18em] uppercase text-stone/50 mb-8 sm:mb-9">
                Takes ~30 seconds · No obligation
            </p>

            <AnimatePresence mode="wait" custom={dir}>
                {!isDetails ? (
                    <motion.div
                        key={`step-${step}`} custom={dir}
                        initial={{ opacity: 0, y: dir > 0 ? 14 : -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: dir > 0 ? -14 : 14 }}
                        transition={{ duration: 0.6, ease }}
                    >
                        <h3 className="font-serif font-light text-[1.6rem] sm:text-2xl md:text-[2rem] text-cream leading-[1.2] tracking-[0.02em] mb-7 sm:mb-8 text-balance">
                            {STEPS[step].heading}
                        </h3>
                        <div className="space-y-2.5 sm:space-y-3">
                            {STEPS[step].options.map((opt) => {
                                const selected = answers[STEPS[step].id] === opt.value;
                                return (
                                    <button
                                        key={opt.value} type="button"
                                        onClick={() => choose(STEPS[step].id, opt.value)}
                                        className={`group w-full text-left flex items-center justify-between gap-3 sm:gap-4 border px-4 py-3.5 sm:px-6 sm:py-5 transition-all duration-300 ${selected ? "border-taupe bg-taupe/10" : "border-white/12 hover:border-taupe/60 hover:bg-white/[0.03]"}`}
                                    >
                                        <span className="min-w-0">
                                            <span className="block font-serif font-light text-lg sm:text-xl text-cream tracking-wide leading-tight">{opt.label}</span>
                                            {opt.hint && <span className="block font-sans font-light text-[12px] text-stone/70 mt-1 tracking-[0.01em]">{opt.hint}</span>}
                                        </span>
                                        <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${selected ? "border-taupe bg-taupe text-offwhite" : "border-white/20 text-transparent group-hover:border-taupe/60"}`}>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        {step > 0 && (
                            <button type="button" onClick={goBack} className="mt-8 inline-flex items-center gap-2 text-stone/70 hover:text-cream transition-colors text-[11px] font-sans font-light tracking-[0.25em] uppercase">
                                <ArrowLeft className="w-3.5 h-3.5" /> Back
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <motion.form
                        key="details" custom={dir}
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.6, ease }}
                        onSubmit={handleSubmit} autoComplete="off" noValidate
                    >
                        <h3 className="font-serif font-light text-[1.6rem] sm:text-2xl md:text-[2rem] text-cream leading-[1.2] tracking-[0.02em] mb-2">
                            Let's schedule your private consultation.
                        </h3>
                        <p className="font-sans font-light text-[13px] text-stone/80 mb-7 sm:mb-8 tracking-[0.01em]">
                            A few details and Antonio will reach out personally within 24 hours.
                        </p>

                        <div className="absolute -left-[9999px]" aria-hidden="true">
                            <input type="text" tabIndex={-1} value={hp.website} onChange={(e) => setHp({ ...hp, website: e.target.value })} />
                            <input type="text" tabIndex={-1} value={hp.fax} onChange={(e) => setHp({ ...hp, fax: e.target.value })} />
                            <input type="text" tabIndex={-1} value={hp.company_url} onChange={(e) => setHp({ ...hp, company_url: e.target.value })} />
                        </div>

                        {apiError && <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-sans font-light px-4 py-3 mb-6">{apiError}</div>}

                        <div className="space-y-5">
                            <Field label="Full Name *" error={errors.fullName}>
                                <input value={contact.fullName} onChange={setField("fullName")} placeholder="Jane Doe" className={inputCls(!!errors.fullName)} />
                            </Field>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Email *" error={errors.email}>
                                    <input type="email" inputMode="email" value={contact.email} onChange={setField("email")} placeholder="jane@email.com" className={inputCls(!!errors.email)} />
                                </Field>
                                <Field label="Phone (optional)" error={errors.phone}>
                                    <input type="tel" inputMode="tel" value={contact.phone} onChange={setField("phone")} placeholder="(713) 555-0198" className={inputCls(!!errors.phone)} />
                                </Field>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Project Location">
                                    <select value={contact.location} onChange={setField("location")} className={`${inputCls(false)} appearance-none cursor-pointer`}>
                                        <option value="" className="bg-ink">Select…</option>
                                        {LOCATIONS.map((l) => <option key={l.value} value={l.value} className="bg-ink">{l.label}</option>)}
                                    </select>
                                </Field>
                                <Field label="Project Address (optional)">
                                    <input value={contact.address} onChange={setField("address")} placeholder="City, State" className={inputCls(false)} />
                                </Field>
                            </div>
                            {contact.location === "outside" && (
                                <p className="font-sans font-light text-[12px] text-taupe/90 leading-relaxed tracking-[0.01em] border-l border-taupe/40 pl-4 -mt-1">
                                    Outside Texas is no obstacle — leave your details and, if it's the right fit, we'll make it happen.
                                </p>
                            )}
                            <Field label="Anything else? (optional)">
                                <textarea value={contact.notes} onChange={setField("notes")} rows={3} placeholder="Tell us a little about the space, the look you're after…" className={`${inputCls(false)} resize-none`} />
                            </Field>

                            {/* A2P 10DLC SMS consent — explicit, optional opt-in */}
                            <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
                                <span className={`mt-0.5 flex-shrink-0 w-5 h-5 border flex items-center justify-center transition-all duration-200 ${smsConsent ? "border-taupe bg-taupe" : "border-white/25"}`}>
                                    {smsConsent && <Check className="w-3.5 h-3.5 text-offwhite" strokeWidth={2} />}
                                </span>
                                <input type="checkbox" className="sr-only" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} />
                                <span className="font-sans font-light text-[11px] leading-relaxed text-stone/80 tracking-[0.01em]">
                                    {CONSENT_TEXT}{" "}
                                    <Link to="/privacy" className="underline hover:text-cream">Privacy Policy</Link> &amp;{" "}
                                    <Link to="/terms" className="underline hover:text-cream">Terms</Link>.
                                </span>
                            </label>

                            {/* Age confirmation — required (A2P) */}
                            <div>
                                <label className="flex items-start gap-3 cursor-pointer select-none">
                                    <span className={`mt-0.5 flex-shrink-0 w-5 h-5 border flex items-center justify-center transition-all duration-200 ${ageConfirm ? "border-taupe bg-taupe" : errors.age ? "border-red-500/60" : "border-white/25"}`}>
                                        {ageConfirm && <Check className="w-3.5 h-3.5 text-offwhite" strokeWidth={2} />}
                                    </span>
                                    <input type="checkbox" className="sr-only" checked={ageConfirm} onChange={(e) => { setAgeConfirm(e.target.checked); if (errors.age) setErrors((er) => { const n = { ...er }; delete n.age; return n; }); }} />
                                    <span className="font-sans font-light text-[12px] leading-relaxed text-stone/80 tracking-[0.01em]">
                                        I confirm I am at least 18 years old. <span className="text-taupe">*</span>
                                    </span>
                                </label>
                                {errors.age && <p className="text-red-400 text-[11px] font-sans font-light mt-1.5 pl-8">{errors.age}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-8 flex-wrap">
                            <button type="button" onClick={goBack} className="inline-flex items-center gap-2 text-stone/70 hover:text-cream transition-colors text-[11px] font-sans font-light tracking-[0.25em] uppercase">
                                <ArrowLeft className="w-3.5 h-3.5" /> Back
                            </button>
                            <button type="submit" disabled={submitting || !ageConfirm} className="group inline-flex items-center justify-center gap-3 bg-cream text-ink px-6 sm:px-8 py-4 text-[11px] font-sans font-light tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed">
                                {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>) : (<>Schedule Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>)}
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Fast lane for ready-to-talk prospects */}
            <div className="mt-9 sm:mt-10 pt-6 border-t border-white/[0.08] text-center">
                <p className="font-sans font-light text-[12px] text-stone/70 tracking-[0.02em]">
                    Prefer to talk now?{" "}
                    <a href={`tel:${PHONE_TEL}`} className="text-cream hover:text-taupe transition-colors whitespace-nowrap">Call</a>
                    {" or "}
                    <a href={`sms:${PHONE_TEL}`} className="text-cream hover:text-taupe transition-colors whitespace-nowrap">text {PHONE_DISPLAY}</a>.
                </p>
            </div>
        </div>
    );
}

const inputCls = (err: boolean) =>
    `w-full bg-ink/50 border ${err ? "border-red-500/60" : "border-white/15"} p-4 text-cream font-sans font-light text-base sm:text-sm focus:outline-none focus:border-taupe transition-all placeholder:text-stone/40`;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label className="block text-[10px] font-sans font-light tracking-[0.25em] uppercase text-stone">{label}</label>
            {children}
            {error && <p className="text-red-400 text-[11px] font-sans font-light">{error}</p>}
        </div>
    );
}
