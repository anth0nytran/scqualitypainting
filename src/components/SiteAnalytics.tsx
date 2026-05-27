import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { captureAttribution } from "@/lib/attribution";
import { track, trackPageview, initTagManager } from "@/lib/analytics";

/* Mounts Vercel Web Analytics + drives full-funnel event tracking:
   pageviews, CTA/call/email/sms/outbound clicks, and scroll depth. */
export default function SiteAnalytics() {
    const location = useLocation();
    const depth = useRef<Set<number>>(new Set());

    // One-time setup: attribution, tag manager, delegated click + scroll listeners.
    useEffect(() => {
        captureAttribution();
        initTagManager();

        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            const a = target?.closest?.("a");
            if (!a) return;
            const href = a.getAttribute("href") || "";
            const label = (a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
            const page = window.location.pathname;
            if (href.startsWith("tel:")) track("call_click", { href, label, page });
            else if (href.startsWith("mailto:")) track("email_click", { href, label, page });
            else if (href.startsWith("sms:")) track("sms_click", { href, label, page });
            else if (/^https?:\/\//i.test(href) && !href.includes(window.location.host)) track("outbound_click", { href, label, page });
            else track("link_click", { href, label, page });
        };
        document.addEventListener("click", onClick, true);

        const onScroll = () => {
            const doc = document.documentElement;
            const max = doc.scrollHeight - window.innerHeight;
            if (max <= 0) return;
            const pct = Math.round(((doc.scrollTop || window.scrollY) / max) * 100);
            for (const m of [25, 50, 75, 100]) {
                if (pct >= m && !depth.current.has(m)) {
                    depth.current.add(m);
                    track("scroll_depth", { percent: m, page: window.location.pathname });
                }
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            document.removeEventListener("click", onClick, true);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // Pageview on every route change (reset scroll-depth markers per page).
    useEffect(() => {
        depth.current = new Set();
        trackPageview(location.pathname + location.search);
    }, [location.pathname, location.search]);

    return <Analytics />;
}
