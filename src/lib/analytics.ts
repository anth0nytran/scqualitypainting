import { track as vercelTrack } from "@vercel/analytics";

/* ============================================================
   South Coast — unified event tracking.
   Every event is sent to BOTH:
     1. window.dataLayer  → GA4 / Google Tag Manager (when added)
     2. Vercel Web Analytics custom events
   so you get full-funnel data with or without a Google account.
   ============================================================ */

type Primitive = string | number | boolean | null;
type Props = Record<string, Primitive | undefined>;
type DLWindow = Window & { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void };

export function track(event: string, props: Props = {}): void {
    const clean: Record<string, Primitive> = {};
    for (const [k, v] of Object.entries(props)) if (v !== undefined && v !== "") clean[k] = v as Primitive;

    // 1) GA4 / GTM dataLayer
    try {
        const w = window as DLWindow;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event, ...clean });
    } catch { /* noop */ }

    // 2) Vercel Web Analytics custom event (names: letters/numbers/underscore)
    try {
        vercelTrack(event.replace(/[^a-zA-Z0-9_]/g, "_"), clean);
    } catch { /* noop */ }
}

export function trackPageview(path: string, extra: Props = {}): void {
    try {
        const w = window as DLWindow;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event: "page_view", page_path: path, page_location: location.href, ...extra });
        // If GA4 gtag is present (no GTM), send an explicit page_view too.
        if (typeof w.gtag === "function" && import.meta.env.VITE_GA4_ID) {
            w.gtag("event", "page_view", { page_path: path, page_location: location.href });
        }
    } catch { /* noop */ }
}

/** Inject GTM or GA4 if an ID is configured (Vercel env: VITE_GTM_ID or VITE_GA4_ID). Safe no-op otherwise. */
export function initTagManager(): void {
    if (typeof document === "undefined") return;
    const gtmId = import.meta.env.VITE_GTM_ID as string | undefined;
    const ga4Id = import.meta.env.VITE_GA4_ID as string | undefined;
    const w = window as DLWindow;
    w.dataLayer = w.dataLayer || [];

    if (gtmId && !document.getElementById("gtm-js")) {
        w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        const s = document.createElement("script");
        s.id = "gtm-js"; s.async = true;
        s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
        document.head.appendChild(s);
    } else if (ga4Id && !document.getElementById("ga4-js")) {
        const s = document.createElement("script");
        s.id = "ga4-js"; s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
        document.head.appendChild(s);
        w.gtag = function gtag() { w.dataLayer!.push(arguments as unknown as Record<string, unknown>); };
        w.gtag("js", new Date());
        w.gtag("config", ga4Id, { send_page_view: false });
    }
}
