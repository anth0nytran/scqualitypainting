import type { VercelRequest, VercelResponse } from "@vercel/node";

/* ============================================================
   Daily rebuild for scheduled blog posts.

   The site is static, so a post dated for today only goes live
   when the site is rebuilt. Vercel Cron calls this route once a
   day (see "crons" in vercel.json); it fires the project's Deploy
   Hook, and the fresh build includes every post whose date has
   arrived in Houston.

   Setup (one time, in the Vercel dashboard):
   1. Project → Settings → Git → Deploy Hooks → create one on the
      production branch. Copy the URL.
   2. Project → Settings → Environment Variables:
        VERCEL_DEPLOY_HOOK_URL = <that URL>
        CRON_SECRET            = <any long random string>
      Vercel sends CRON_SECRET as a Bearer token on cron calls.
   ============================================================ */

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const secret = process.env.CRON_SECRET;
    if (!secret || req.headers.authorization !== `Bearer ${secret}`) {
        return res.status(401).json({ ok: false, error: "unauthorized" });
    }

    const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (!hook) {
        return res.status(500).json({ ok: false, error: "VERCEL_DEPLOY_HOOK_URL is not set" });
    }

    const r = await fetch(hook, { method: "POST" });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok, status: r.status });
}
