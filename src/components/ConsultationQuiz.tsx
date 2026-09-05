import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2, Phone } from "lucide-react";
import { track as baseTrack } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { QUOTE_OPTIONS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/services";

/* ============================================================
   South Coast — Consultation funnel.
   One question per screen (single-tap, auto-advance). Qualifies
   by job size, lead-scores behind the scenes, offers a call/text
   fast lane, captures funnel/drop-off analytics via
   window.dataLayer (GA4 / GTM ready), and collects A2P-compliant
   SMS opt-in. Submits to /api/send.

   COPY RULE: plain English, short sentences. ~3rd grade level.
   ============================================================ */

const ease = [0.16, 1, 0.3, 1] as const;

// Quiz events flow through the shared tracker → GA4/GTM dataLayer + Vercel Analytics.
const track = (event: string, payload: Record<string, string | number | boolean | null | undefined> = {}) =>
    baseTrack(event, { quiz: "consultation", ...payload });

type QId = "service" | "scale" | "timeline";
interface Choice { value: string; label: string; hint?: string }
interface Step { id: QId; eyebrow: string; heading: string; options: Choice[] }

const STEPS: Step[] = [
    {
        id: "service", eyebrow: "Step 1 of 4", heading: "What do you need done?",
        options: QUOTE_OPTIONS,
    },
    {
        id: "scale", eyebrow: "Step 2 of 4", heading: "How big is the job?",
        options: [
            { value: "refresh", label: "One room or one small job", hint: "A single space or a quick update" },
            { value: "feature", label: "One big feature", hint: "A statement wall, a kitchen, or a front door" },
            { value: "whole-home", label: "My whole home", hint: "Several rooms, done together" },
            { value: "estate", label: "A large or business project", hint: "A big home, an office, or a shop" },
        ],
    },
    {
        id: "timeline", eyebrow: "Step 3 of 4", heading: "When would you like it done?",
        options: [
            { value: "asap", label: "As soon as possible" },
            { value: "antonio", label: "When Antonio has time", hint: "You would rather wait for him than rush it" },
            { value: "1-2-weeks", label: "In 1 to 2 weeks" },
            { value: "1-3-months", label: "In 1 to 3 months" },
            { value: "unsure", label: "Not sure yet" },
        ],
    },
];

const LOCATIONS = [
    { value: "houston", label: "Greater Houston" },
    { value: "texas", label: "Somewhere else in Texas" },
    { value: "outside", label: "Outside Texas" },
];

const CONSENT_TEXT =
    "I consent to receive non-marketing text messages from South Coast Quality Painting, Inc. Message frequency may vary (approximately 2–6 messages per month) and may include quote follow-ups, appointment reminders, project updates, missed call text-backs, after-hours auto-replies, and one-time review requests. Message & data rates may apply. Text HELP for assistance. You may reply STOP to unsubscribe at any time. Your information will not be shared with third parties.";

/**
 * Proof of work. Finds a nonce where sha256(`${ts}:${nonce}`) starts with
 * four hex zeros — roughly 65k hashes, a few dozen milliseconds here but a
 * real cost to anyone submitting at scale. More importantly it proves a JS
 * runtime ran, which a plain scripted POST cannot fake.
 *
 * Computed while the customer answers the questions, so it is long done by
 * the time they reach the submit button.
 */
async function solveProofOfWork(ts: number, signal?: { cancelled: boolean }): Promise<string> {
    if (typeof crypto === "undefined" || !crypto.subtle) return "0";
    const enc = new TextEncoder();
    for (let nonce = 0; nonce < 5_000_000; nonce++) {
        if (signal?.cancelled) return "0";
        const buf = await crypto.subtle.digest("SHA-256", enc.encode(`${ts}:${nonce}`));
        const hex = Array.from(new Uint8Array(buf.slice(0, 3)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        if (hex.startsWith("0000")) return String(nonce);
        // Yield every so often so the UI never janks.
        if (nonce % 500 === 0) await new Promise((r) => setTimeout(r, 0));
    }
    return "0";
}

type Answers = Partial<Record<QId, string>>;

interface ConsultationQuizProps {
    /** When set, the "what do you need" step is skipped and preselected. */
    presetService?: string;
}

export default function ConsultationQuiz({ presetService }: ConsultationQuizProps = {}) {
    // A service page preselects the job, so that question is dropped.
    const activeSteps = useMemo(
        () => (presetService ? STEPS.filter((s) => s.id !== "service") : STEPS),
        [presetService]
    );
    const TOTAL = activeSteps.length + 1; // question steps + details

    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [answers, setAnswers] = useState<Answers>(presetService ? { service: presetService } : {});
    const [contact, setContact] = useState({ fullName: "", email: "", phone: "", address: "", notes: "", location: "" });
    const [smsConsent, setSmsConsent] = useState(false);
    const [ageConfirm, setAgeConfirm] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [apiError, setApiError] = useState("");

    const [hp, setHp] = useState({ website: "", fax: "", company_url: "" });
    const tsRef = useRef(Date.now());
    // Proof of work, solved in the background while they answer.
    const nonceRef = useRef("");
    // Set on the first genuine pointer or key event.
    const interactedRef = useRef(false);
    const furthest = useRef(0);
    const submittedRef = useRef(false);
    // Kept in refs so the mount-only abandon listener reads current values.
    const totalRef = useRef(TOTAL);
    const questionCountRef = useRef(activeSteps.length);
    totalRef.current = TOTAL;
    questionCountRef.current = activeSteps.length;

    const isDetails = step === activeSteps.length;
    const progress = Math.round(((step + 1) / TOTAL) * 100);

    // Solve the proof of work up front, and note real human interaction.
    useEffect(() => {
        const signal = { cancelled: false };
        solveProofOfWork(tsRef.current, signal).then((n) => { nonceRef.current = n; });

        const mark = () => { interactedRef.current = true; };
        window.addEventListener("pointerdown", mark, { once: true, passive: true });
        window.addEventListener("keydown", mark, { once: true });
        return () => {
            signal.cancelled = true;
            window.removeEventListener("pointerdown", mark);
            window.removeEventListener("keydown", mark);
        };
    }, []);

    useEffect(() => {
        track("quiz_start", { preset_service: presetService || "" });
        const onHide = () => {
            if (document.visibilityState === "hidden" && !submittedRef.current && furthest.current > 0) {
                track("quiz_abandon", {
                    last_step: furthest.current,
                    total_steps: totalRef.current,
                    reached_details: furthest.current >= questionCountRef.current,
                });
            }
        };
        document.addEventListener("visibilitychange", onHide);
        return () => document.removeEventListener("visibilitychange", onHide);
    }, [presetService]);

    useEffect(() => {
        furthest.current = Math.max(furthest.current, step);
        track("quiz_step_view", { step_index: step, step_id: isDetails ? "details" : activeSteps[step].id });
    }, [step, isDetails, activeSteps]);

    const goBack = () => { setDir(-1); setStep((s) => Math.max(0, s - 1)); };

    const choose = (id: QId, value: string) => {
        setAnswers((a) => ({ ...a, [id]: value }));
        track("quiz_answer", { step_id: id, value });
        window.setTimeout(() => { setDir(1); setStep((s) => Math.min(activeSteps.length, s + 1)); }, 240);
    };

    // Lead score (size + timing) — gives the studio a clean Priority/Qualified/Nurture signal.
    const leadTier = useMemo(() => {
        let s = 0;
        const sc = answers.scale;
        if (sc === "estate") s += 3; else if (sc === "whole-home") s += 2; else if (sc === "feature") s += 1;
        const t = answers.timeline;
        if (t === "asap" || t === "1-2-weeks") s += 2;
        else if (t === "antonio" || t === "1-3-months") s += 1;
        else if (t === "unsure") s -= 1;
        // legacy values, still accepted from cached pages
        else if (t === "ready") s += 2; else if (t === "1-3") s += 1; else if (t === "exploring") s -= 1;
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
        if (!contact.address.trim() || contact.address.trim().length < 5) {
            e.address = "Please tell us where the project is.";
        }
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
                    interacted: interactedRef.current,
                    _ts: String(tsRef.current),
                    _nonce: nonceRef.current,
                }),
            });
            let data: { ok?: boolean; error?: string } | null = null;
            try { data = await res.json(); } catch { /* non-JSON response */ }
            if (!res.ok || data?.ok === false) {
                setApiError(
                    data?.error ||
                    `We couldn't send that just now. Please call or text us at ${PHONE_DISPLAY}.`
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
            setApiError(`We couldn't reach the server. Please try again, or call or text us at ${PHONE_DISPLAY}.`);
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
                    <Check className="w-6 h-6 text-accent-auto" strokeWidth={1.5} />
                </div>
                <p className="eyebrow mb-4">We Got It</p>
                <h3 className="font-serif font-semibold text-[1.75rem] sm:text-3xl md:text-4xl text-cream tracking-[-0.01em] mb-5">Thank you, {contact.fullName.split(" ")[0]}.</h3>
                <p className="text-stone text-[16px] leading-relaxed mb-8 max-w-md mx-auto">
                    Antonio will look at your project himself and call you back within one business day. We just sent a note to <span className="text-cream break-words">{contact.email}</span> so you have it in writing.
                </p>
                <a href={`tel:${PHONE_TEL}`} className="btn btn-cream">
                    <Phone className="w-4 h-4" /> Call Us Now
                </a>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-between mb-3">
                <span className="eyebrow">
                    {isDetails ? `Step ${TOTAL} of ${TOTAL}` : `Step ${step + 1} of ${TOTAL}`}
                </span>
                <span className="text-[13px] text-stone/90">{progress}% done</span>
            </div>
            <div className="h-1 w-full bg-white/10 mb-3 relative overflow-hidden">
                <motion.div className="absolute left-0 top-0 h-full bg-taupe" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease }} />
            </div>
            <p className="text-[14px] text-stone/85 mb-8 sm:mb-9">
                Takes about 30 seconds. Nothing is booked until you say so.
            </p>

            <AnimatePresence mode="wait" custom={dir}>
                {!isDetails ? (
                    <motion.div
                        key={`step-${step}`} custom={dir}
                        initial={{ opacity: 0, y: dir > 0 ? 14 : -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: dir > 0 ? -14 : 14 }}
                        transition={{ duration: 0.6, ease }}
                    >
                        <h3 className="font-serif font-semibold text-[1.6rem] sm:text-2xl md:text-[2rem] text-cream leading-[1.15] tracking-[-0.01em] mb-7 sm:mb-8 text-balance">
                            {activeSteps[step].heading}
                        </h3>
                        <div className="space-y-2.5 sm:space-y-3">
                            {activeSteps[step].options.map((opt) => {
                                const selected = answers[activeSteps[step].id] === opt.value;
                                return (
                                    <button
                                        key={opt.value} type="button"
                                        onClick={() => choose(activeSteps[step].id, opt.value)}
                                        className={`group w-full text-left flex items-center justify-between gap-3 sm:gap-4 border px-4 py-3.5 sm:px-6 sm:py-5 transition-all duration-300 ${selected ? "border-taupe bg-taupe/10" : "border-white/15 hover:border-taupe/60 hover:bg-white/[0.03]"}`}
                                    >
                                        <span className="min-w-0">
                                            <span className="block font-serif font-semibold text-lg sm:text-xl text-cream leading-tight">{opt.label}</span>
                                            {opt.hint && <span className="block text-[14px] text-stone/90 mt-1 leading-snug">{opt.hint}</span>}
                                        </span>
                                        <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${selected ? "border-taupe bg-taupe text-offwhite" : "border-white/20 text-transparent group-hover:border-taupe/60"}`}>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        {step > 0 && (
                            <button type="button" onClick={goBack} className="mt-8 inline-flex items-center gap-2 text-stone/90 hover:text-cream transition-colors text-[14px] font-medium">
                                <ArrowLeft className="w-4 h-4" /> Go back
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <motion.form
                        key="details" custom={dir}
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.6, ease }}
                        onSubmit={handleSubmit} autoComplete="on" noValidate
                    >
                        <h3 className="font-serif font-semibold text-[1.6rem] sm:text-2xl md:text-[2rem] text-cream leading-[1.15] tracking-[-0.01em] mb-2">
                            Where should we send your quote?
                        </h3>
                        <p className="text-[15px] text-stone/90 mb-7 sm:mb-8 leading-relaxed">
                            Just your name and email. Antonio will get back to you within one business day.
                        </p>

                        <div className="absolute -left-[9999px]" aria-hidden="true">
                            <input type="text" tabIndex={-1} value={hp.website} onChange={(e) => setHp({ ...hp, website: e.target.value })} />
                            <input type="text" tabIndex={-1} value={hp.fax} onChange={(e) => setHp({ ...hp, fax: e.target.value })} />
                            <input type="text" tabIndex={-1} value={hp.company_url} onChange={(e) => setHp({ ...hp, company_url: e.target.value })} />
                        </div>

                        {apiError && <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-[15px] px-4 py-3 mb-6">{apiError}</div>}

                        <div className="space-y-5">
                            <Field label="Your name *" error={errors.fullName}>
                                <input value={contact.fullName} onChange={setField("fullName")} autoComplete="name" placeholder="Jane Doe" className={inputCls(!!errors.fullName)} />
                            </Field>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Email *" error={errors.email}>
                                    <input type="email" inputMode="email" autoComplete="email" value={contact.email} onChange={setField("email")} placeholder="jane@email.com" className={inputCls(!!errors.email)} />
                                </Field>
                                <Field label="Phone (if you want a call)" error={errors.phone}>
                                    <input type="tel" inputMode="tel" autoComplete="tel" value={contact.phone} onChange={setField("phone")} placeholder="(713) 555-0198" className={inputCls(!!errors.phone)} />
                                </Field>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Where is the job?">
                                    <select value={contact.location} onChange={setField("location")} className={`${inputCls(false)} appearance-none cursor-pointer`}>
                                        <option value="" className="bg-ink">Pick one…</option>
                                        {LOCATIONS.map((l) => <option key={l.value} value={l.value} className="bg-ink">{l.label}</option>)}
                                    </select>
                                </Field>
                                <Field label="Where is the project? *" error={errors.address}>
                                    <input value={contact.address} onChange={setField("address")} autoComplete="street-address" placeholder="Street, city and ZIP" className={inputCls(!!errors.address)} />
                                </Field>
                            </div>
                            {contact.location === "outside" && (
                                <p className="text-[14px] text-taupe/90 leading-relaxed border-l-2 border-taupe/40 pl-4 -mt-1">
                                    Outside Texas is fine. Leave your details, and if it is a good fit we will make it work.
                                </p>
                            )}
                            <Field label="Anything else? (optional)">
                                <textarea value={contact.notes} onChange={setField("notes")} rows={3} placeholder="Tell us about the space and the look you want…" className={`${inputCls(false)} resize-none`} />
                            </Field>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-8 flex-wrap">
                            <button type="button" onClick={goBack} className="inline-flex items-center gap-2 text-stone/90 hover:text-cream transition-colors text-[14px] font-medium">
                                <ArrowLeft className="w-4 h-4" /> Go back
                            </button>
                            <button type="submit" disabled={submitting || !ageConfirm} className="btn btn-cream disabled:opacity-60 disabled:cursor-not-allowed">
                                {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>) : (<>Book a Consultation <ArrowRight className="w-4 h-4" /></>)}
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* ---- Persistent A2P opt-in (visible on every step, satisfies carrier review) ---- */}
            <div className="mt-9 pt-7 border-t border-white/[0.08]">
                <p className="eyebrow mb-4">Consent &amp; Confirmation</p>
                <div className="space-y-4">
                    {/* SMS opt-in — optional, unchecked */}
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                        <span className={`mt-0.5 flex-shrink-0 w-5 h-5 border flex items-center justify-center transition-all duration-200 ${smsConsent ? "border-taupe bg-taupe" : "border-white/25"}`}>
                            {smsConsent && <Check className="w-3.5 h-3.5 text-offwhite" strokeWidth={2} />}
                        </span>
                        <input type="checkbox" className="sr-only" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} />
                        <span className="text-[12px] leading-relaxed text-stone/90">
                            {CONSENT_TEXT}{" "}
                            <Link to="/privacy" className="underline hover:text-cream">Privacy Policy</Link> &amp;{" "}
                            <Link to="/terms" className="underline hover:text-cream">Terms</Link>.
                        </span>
                    </label>

                    {/* Age confirmation — required, unchecked */}
                    <div>
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                            <span className={`mt-0.5 flex-shrink-0 w-5 h-5 border flex items-center justify-center transition-all duration-200 ${ageConfirm ? "border-taupe bg-taupe" : errors.age ? "border-red-500/60" : "border-white/25"}`}>
                                {ageConfirm && <Check className="w-3.5 h-3.5 text-offwhite" strokeWidth={2} />}
                            </span>
                            <input type="checkbox" className="sr-only" checked={ageConfirm} onChange={(e) => { setAgeConfirm(e.target.checked); if (errors.age) setErrors((er) => { const n = { ...er }; delete n.age; return n; }); }} />
                            <span className="text-[14px] leading-relaxed text-stone/90">
                                I confirm I am at least 18 years old. <span className="text-accent-auto">*</span>
                            </span>
                        </label>
                        {errors.age && <p className="text-red-400 text-[13px] mt-1.5 pl-8">{errors.age}</p>}
                    </div>
                </div>
            </div>

            {/* Fast lane for ready-to-talk prospects */}
            <div className="mt-9 sm:mt-10 pt-6 border-t border-white/[0.08] text-center">
                <p className="text-[15px] text-stone/90">
                    Would you rather talk now?{" "}
                    <a href={`tel:${PHONE_TEL}`} className="text-cream font-medium hover:text-accent-auto transition-colors whitespace-nowrap">Call</a>
                    {" or "}
                    <a href={`sms:${PHONE_TEL}`} className="text-cream font-medium hover:text-accent-auto transition-colors whitespace-nowrap">text {PHONE_DISPLAY}</a>.
                </p>
            </div>
        </div>
    );
}

const inputCls = (err: boolean) =>
    `w-full bg-ink/50 border ${err ? "border-red-500/60" : "border-white/15"} p-4 text-cream text-base focus:outline-none focus:border-taupe transition-all placeholder:text-stone/40`;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label className="block text-[13px] font-medium text-stone">{label}</label>
            {children}
            {error && <p className="text-red-400 text-[13px]">{error}</p>}
        </div>
    );
}
