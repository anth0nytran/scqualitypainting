/* ============================================================
   Cookie / analytics consent.

   What the site uses:
   - Vercel Web Analytics: cookieless, no personal data. Always on.
   - Lead-source attribution: first-party localStorage, only used to
     tell us which page or ad brought a consultation request. Never
     shared with ad networks.
   - Google Tag Manager / GA4: third-party cookies. Loads ONLY after
     the visitor clicks "Accept", and only if an ID is configured.

   Global Privacy Control (a browser "do not share" signal) is
   honored as a "decline" unless the visitor later opts in.
   ============================================================ */

export type Consent = "granted" | "denied";

const KEY = "sc-consent-v1";
const EVENT = "sc-consent-change";
const OPEN_EVENT = "sc-consent-open";

/** True when Google analytics tools are configured at all. With none, there are no cookies to ask about. */
export const hasThirdPartyAnalytics = (): boolean =>
    Boolean(import.meta.env.VITE_GTM_ID || import.meta.env.VITE_GA4_ID);

const gpcOn = (): boolean => {
    try {
        return Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
    } catch {
        return false;
    }
};

/** The visitor's saved choice, or null if they haven't chosen. */
export function getConsent(): Consent | null {
    try {
        const v = localStorage.getItem(KEY);
        if (v === "granted" || v === "denied") return v;
    } catch {
        /* storage blocked */
    }
    return null;
}

/** Whether third-party analytics may load right now. */
export const analyticsAllowed = (): boolean => {
    const c = getConsent();
    if (c) return c === "granted";
    return false; // no choice yet → nothing loads
};

/** Whether to show the banner: a tool is configured, no choice saved, no GPC signal. */
export const shouldAskForConsent = (): boolean => hasThirdPartyAnalytics() && getConsent() === null && !gpcOn();

export function setConsent(c: Consent): void {
    try {
        localStorage.setItem(KEY, c);
    } catch {
        /* storage blocked: choice applies to this page view only */
    }
    window.dispatchEvent(new CustomEvent<Consent>(EVENT, { detail: c }));
}

export function onConsentChange(fn: (c: Consent) => void): () => void {
    const h = (e: Event) => fn((e as CustomEvent<Consent>).detail);
    window.addEventListener(EVENT, h);
    return () => window.removeEventListener(EVENT, h);
}

/** Reopen the banner (footer "Privacy choices" link). */
export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));
export const onConsentOpen = (fn: () => void) => {
    window.addEventListener(OPEN_EVENT, fn);
    return () => window.removeEventListener(OPEN_EVENT, fn);
};
