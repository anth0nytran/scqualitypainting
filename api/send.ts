import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export const config = { runtime: "nodejs" };

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 12;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const dupeStore = new Map<string, { count: number; resetAt: number }>();

const esc = (v: string) =>
    v.replace(/[&<>"']/g, (c) =>
        c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;"
    );

const norm = (v: unknown) => (typeof v === "string" ? v.replace(/\r\n/g, "\n").trim() : "");

const ALLOWED_SERVICES: Record<string, string> = {
    "venetian-plaster": "Venetian & Tadelakt Plaster",
    residential: "Residential Painting",
    commercial: "Commercial Painting",
    exterior: "Exterior Painting",
    cabinetry: "Cabinetry Finishing",
    consultation: "Free Color Consultation",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader("Cache-Control", "no-store");

    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ ok: false, error: "Method not allowed." });
    }

    // Rate limit
    const ip = (Array.isArray(req.headers["x-forwarded-for"]) ? req.headers["x-forwarded-for"][0] : req.headers["x-forwarded-for"]?.split(",")[0]?.trim()) || req.socket?.remoteAddress || "unknown";
    const now = Date.now();
    const rl = rateLimitStore.get(ip);
    if (rl && rl.resetAt > now && rl.count >= RATE_LIMIT_MAX) {
        return res.status(429).json({ ok: false, error: "Too many requests. Please try again shortly." });
    }
    rateLimitStore.set(ip, { count: (rl && rl.resetAt > now ? rl.count : 0) + 1, resetAt: rl && rl.resetAt > now ? rl.resetAt : now + RATE_LIMIT_WINDOW_MS });

    // Parse body
    let data: Record<string, unknown> = {};
    if (typeof req.body === "string") {
        try { data = JSON.parse(req.body); } catch { return res.status(400).json({ ok: false, error: "Invalid JSON." }); }
    } else if (typeof req.body === "object" && req.body) {
        data = req.body as Record<string, unknown>;
    }

    // Honeypot
    if (norm(data.website) || norm(data.fax) || norm(data.company_url)) {
        return res.status(200).json({ ok: true });
    }

    // Timing check
    const ts = parseInt(norm(data._ts), 10);
    if (!Number.isNaN(ts) && Date.now() - ts < 3000) {
        return res.status(200).json({ ok: true });
    }

    const fullName = norm(data.fullName);
    const email = norm(data.email);
    const phone = norm(data.phone);
    const service = norm(data.service);
    const address = norm(data.address);
    const timeline = norm(data.timeline);

    // Validation
    if (!fullName || fullName.length < 2 || fullName.length > 80) {
        return res.status(400).json({ ok: false, error: "Please enter your full name." });
    }
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
        return res.status(400).json({ ok: false, error: "Please enter a valid phone number." });
    }
    if (!service || !ALLOWED_SERVICES[service]) {
        return res.status(400).json({ ok: false, error: "Please select a service." });
    }

    // Duplicate check
    const dupeKey = `${email.toLowerCase()}|${phoneDigits}|${service}`;
    const dupe = dupeStore.get(dupeKey);
    if (dupe && dupe.resetAt > now && dupe.count > 2) {
        return res.status(200).json({ ok: true });
    }
    dupeStore.set(dupeKey, { count: (dupe && dupe.resetAt > now ? dupe.count : 0) + 1, resetAt: dupe && dupe.resetAt > now ? dupe.resetAt : now + 6 * 60 * 60 * 1000 });

    // Spam check
    const combined = `${fullName} ${email} ${service} ${address}`.toLowerCase();
    const spamWords = ["crypto", "bitcoin", "casino", "viagra", "seo services", "backlinks", "web traffic", "lottery winner"];
    if (spamWords.some((w) => combined.includes(w))) {
        return res.status(200).json({ ok: true });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.LEAD_TO_EMAIL;
    if (!resendApiKey || !toEmail) {
        return res.status(500).json({ ok: false, error: "Server misconfigured." });
    }

    const resend = new Resend(resendApiKey);
    const serviceLabel = ALLOWED_SERVICES[service] || service;
    const timelineLabel = timeline || "Not specified";

    const timestamp = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        year: "numeric", month: "short", day: "2-digit",
        hour: "numeric", minute: "2-digit", hour12: true, timeZoneName: "short",
    }).format(new Date());

    const phoneLink = phoneDigits.length === 10 ? `+1${phoneDigits}` : phoneDigits.length === 11 && phoneDigits.startsWith("1") ? `+${phoneDigits}` : phoneDigits;

    // ---- INTERNAL LEAD EMAIL ----
    const leadHtml = `
<div style="background:#f3f4f6;margin:0;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
    <tr><td style="border-top:6px solid #111111;padding:18px 20px;border-bottom:1px solid #f1f5f9;">
      <table role="presentation" width="100%"><tr>
        <td style="font-size:16px;font-weight:700;color:#111111;">South Coast Quality Painting, Inc.</td>
        <td align="right"><span style="background:#8C7B6B;color:#fff;font-weight:700;font-size:12px;padding:6px 10px;border-radius:999px;">NEW LEAD</span></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:24px 20px 16px;">
      <div style="font-size:24px;font-weight:800;margin:0 0 6px;">${esc(fullName)}</div>
      <div style="font-size:16px;color:#374151;font-weight:600;margin:0 0 4px;">${esc(serviceLabel)}</div>
      <div style="font-size:12px;color:#6b7280;">${esc(timestamp)}</div>
    </td></tr>
    <tr><td style="padding:0 20px 20px;">
      <a href="tel:${esc(phoneLink)}" style="display:block;background:#111111;color:#fff;text-decoration:none;font-weight:800;font-size:14px;text-align:center;padding:14px 18px;border-radius:10px;margin-bottom:10px;">Call ${esc(fullName)}</a>
      <a href="mailto:${esc(email)}" style="display:block;background:#f3f4f6;color:#111827;text-decoration:none;font-weight:700;font-size:14px;text-align:center;padding:14px 18px;border-radius:10px;border:1px solid #e5e7eb;">Email Lead</a>
    </td></tr>
    <tr><td style="padding:0 20px 20px;">
      <table role="presentation" width="100%" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;font-size:14px;">
        <tr><td style="background:#f9fafb;padding:14px 16px;font-weight:700;border-bottom:1px solid #e5e7eb;">Lead Details</td></tr>
        <tr><td style="padding:0 16px;"><table role="presentation" width="100%">
          <tr><td style="padding:10px 0;color:#6b7280;width:120px;">Name</td><td style="padding:10px 0;font-weight:600;">${esc(fullName)}</td></tr>
          <tr><td style="padding:10px 0;color:#6b7280;">Phone</td><td style="padding:10px 0;"><a href="tel:${esc(phoneLink)}" style="color:#8C7B6B;text-decoration:none;font-weight:600;">${esc(phone)}</a></td></tr>
          <tr><td style="padding:10px 0;color:#6b7280;">Email</td><td style="padding:10px 0;"><a href="mailto:${esc(email)}" style="color:#8C7B6B;text-decoration:none;font-weight:600;">${esc(email)}</a></td></tr>
          <tr><td style="padding:10px 0;color:#6b7280;">Service</td><td style="padding:10px 0;font-weight:600;">${esc(serviceLabel)}</td></tr>
          <tr><td style="padding:10px 0;color:#6b7280;">Timeline</td><td style="padding:10px 0;font-weight:600;">${esc(timelineLabel)}</td></tr>
          ${address ? `<tr><td style="padding:10px 0;color:#6b7280;">Property</td><td style="padding:10px 0;font-weight:600;">${esc(address)}</td></tr>` : ""}
        </table></td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:0 20px 22px;">
      <div style="border-left:4px solid #8C7B6B;padding:10px 12px;background:#f9fafb;border-radius:8px;font-size:12px;color:#6b7280;">
        This lead came from southcoastqualitypaint.com
        <span style="display:block;margin-top:4px;color:#9ca3af;">Website by <a href="https://quicklaunchweb.us" style="color:#9ca3af;text-decoration:underline;">QuickLaunchWeb</a></span>
      </div>
    </td></tr>
  </table>
</div>`;

    // ---- PROSPECT CONFIRMATION EMAIL ----
    const firstName = fullName.split(" ")[0] || fullName;
    const prospectHtml = `
<div style="background:#f3f4f6;margin:0;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
    <tr><td style="border-top:6px solid #111111;padding:24px 24px 0;text-align:center;">
      <div style="font-size:18px;font-weight:800;letter-spacing:0.5px;margin-bottom:4px;color:#111111;">SOUTH COAST</div>
      <div style="font-size:11px;color:#8C7B6B;letter-spacing:2px;text-transform:uppercase;">Venetian Plaster &amp; Architectural Finishes · Houston, TX</div>
    </td></tr>
    <tr><td style="padding:28px 24px;">
      <div style="font-size:22px;font-weight:800;margin:0 0 16px;color:#111111;">Hi ${esc(firstName)},</div>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
        Thank you for reaching out to South Coast Quality Painting, Inc.! We've received your request and Antonio will personally review your information.
      </p>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 24px;">
        You can expect to hear back within <strong>24 hours</strong> — typically much sooner. In the meantime, here's a summary of what you submitted:
      </p>
      <table role="presentation" width="100%" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;font-size:14px;margin-bottom:24px;">
        <tr><td style="background:#f9fafb;padding:12px 16px;font-weight:700;border-bottom:1px solid #e5e7eb;">Your Request</td></tr>
        <tr><td style="padding:0 16px;"><table role="presentation" width="100%">
          <tr><td style="padding:10px 0;color:#6b7280;width:110px;">Service</td><td style="padding:10px 0;font-weight:600;">${esc(serviceLabel)}</td></tr>
          <tr><td style="padding:10px 0;color:#6b7280;">Timeline</td><td style="padding:10px 0;font-weight:600;">${esc(timelineLabel)}</td></tr>
          ${address ? `<tr><td style="padding:10px 0;color:#6b7280;">Property</td><td style="padding:10px 0;font-weight:600;">${esc(address)}</td></tr>` : ""}
        </table></td></tr>
      </table>
      <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 8px;">
        <strong>Need to reach us sooner?</strong>
      </p>
      <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 24px;">
        Call or text Antonio directly at <a href="tel:+17135398069" style="color:#8C7B6B;font-weight:700;text-decoration:none;">(713) 539-8069</a>
      </p>
      <div style="border-top:1px solid #e5e7eb;padding-top:20px;text-align:center;">
        <div style="font-size:13px;font-weight:700;color:#111111;">Antonio Benitez, Plaster Specialist</div>
        <div style="font-size:12px;color:#6b7280;margin-top:2px;">South Coast Quality Painting, Inc. · Houston, Texas</div>
        <div style="font-size:12px;color:#6b7280;margin-top:2px;">Venetian Plaster &amp; Architectural Finishes</div>
        <div style="margin-top:12px;">
          <a href="https://www.southcoastqualitypaint.com" style="font-size:12px;color:#8C7B6B;font-weight:600;text-decoration:none;">southcoastqualitypaint.com</a>
        </div>
      </div>
    </td></tr>
  </table>
</div>`;

    try {
        const bcc = process.env.LEADS_BCC_EMAIL?.split(",").map((e) => e.trim()).filter(Boolean) || undefined;

        // Send lead notification
        const { error: leadErr } = await resend.emails.send({
            from: "South Coast | New Lead <leads@quicklaunchweb.us>",
            to: [toEmail],
            bcc,
            replyTo: email,
            subject: `New Lead | ${serviceLabel} | ${fullName}`,
            html: leadHtml,
            text: `New Lead: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nService: ${serviceLabel}\nTimeline: ${timelineLabel}\nAddress: ${address || "N/A"}`,
        });

        if (leadErr) {
            console.error("Resend lead error:", leadErr);
            return res.status(500).json({ ok: false, error: "Failed to send. Please try again." });
        }

        // Send prospect confirmation
        await resend.emails.send({
            from: "Antonio Benitez · South Coast <leads@quicklaunchweb.us>",
            to: [email],
            replyTo: toEmail,
            subject: `We received your request, ${firstName}!`,
            html: prospectHtml,
            text: `Hi ${firstName},\n\nThank you for reaching out to South Coast Quality Painting, Inc.! We've received your request for ${serviceLabel} and Antonio will personally review your information.\n\nExpect to hear back within 24 hours.\n\nAntonio Benitez, Plaster Specialist\nSouth Coast Quality Painting, Inc. · Houston, Texas\n(713) 539-8069\nbenitezantonio@live.com`,
        }).catch((err) => console.error("Prospect email failed (non-blocking):", err));

    } catch (error) {
        console.error("Unhandled exception:", error);
        return res.status(500).json({ ok: false, error: "Failed to send. Please try again." });
    }

    return res.status(200).json({ ok: true });
}
