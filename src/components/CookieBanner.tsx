import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { hasThirdPartyAnalytics, onConsentOpen, setConsent, shouldAskForConsent } from "@/lib/consent";

/* Accessible consent banner: a labelled, non-modal region that does not
   trap focus or cover the page's main buttons. "Decline" is as easy as
   "Accept". Only appears when Google analytics tools are configured. */
export default function CookieBanner() {
    const [open, setOpen] = useState(false);
    const acceptRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Defer so the banner never competes with first paint.
        const t = setTimeout(() => setOpen(shouldAskForConsent()), 800);
        const off = onConsentOpen(() => {
            setOpen(true);
            setTimeout(() => acceptRef.current?.focus(), 50);
        });
        return () => {
            clearTimeout(t);
            off();
        };
    }, []);

    if (!open) return null;
    const tracking = hasThirdPartyAnalytics();

    const choose = (c: "granted" | "denied") => {
        setConsent(c);
        setOpen(false);
    };

    return (
        <section
            role="region"
            aria-label="Cookie choices"
            className="on-dark fixed z-[60] left-3 right-3 bottom-[84px] md:bottom-4 md:left-auto md:right-4 md:max-w-md bg-ink text-cream border border-white/15 shadow-2xl p-5"
        >
            <p className="text-[15px] leading-relaxed mb-4">
                {tracking
                    ? "We use cookies from Google Analytics to see which pages help homeowners, only if you say yes. Our basic site stats use no cookies."
                    : "This site does not use advertising or analytics cookies. Our basic site stats are cookieless."}{" "}
                <Link to="/privacy#cookies" className="underline underline-offset-4 text-accent-auto">
                    Privacy policy
                </Link>
            </p>
            {!tracking ? (
                <button ref={acceptRef} type="button" onClick={() => setOpen(false)} className="btn btn-cream w-full !py-3">
                    Close
                </button>
            ) : (
            <div className="flex gap-3">
                <button ref={acceptRef} type="button" onClick={() => choose("granted")} className="btn btn-cream flex-1 !py-3">
                    Accept
                </button>
                <button type="button" onClick={() => choose("denied")} className="btn btn-outline flex-1 !py-3">
                    Decline
                </button>
            </div>
            )}
        </section>
    );
}
