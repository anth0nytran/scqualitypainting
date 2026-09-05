/* ============================================================
   GoHighLevel (LeadConnector) lead push.

   Every website submission is upserted into GHL as a contact,
   tagged "website lead" so the automation can fire, and given a
   note containing every field we captured (project size,
   timeline, budget signal, attribution, A2P consent proof).

   Tags are the automation trigger. The note guarantees nothing
   is lost even before custom fields are mapped in the GHL UI.

   ---- Environment ----
   GHL_API_KEY        (required)  Private Integration token (v2)
                                  or API key (v1).
   GHL_LOCATION_ID    (required for v2) Sub-account / location id.
   GHL_API_VERSION    (optional)  "v1" to use the legacy REST API.
                                  Defaults to v2 (LeadConnector).
   GHL_PIPELINE_ID /
   GHL_PIPELINE_STAGE_ID
                      (optional)  Creates an opportunity too.
   GHL_CUSTOM_FIELDS  (optional)  JSON map of our field name ->
                                  GHL custom field id, e.g.
                                  {"lead_tier":"abc123",...}

   If GHL is not configured, this is a no-op — the lead email
   still goes out. Lead capture must never depend on GHL being up.
   ============================================================ */

export interface GhlLead {
    fullName: string;
    email: string;
    phone: string;
    /** Digits only, 10 or 11 chars, or "" */
    phoneDigits: string;
    address: string;
    notes: string;
    serviceSlug: string;
    serviceLabel: string;
    scaleLabel: string;
    timelineLabel: string;
    locationLabel: string;
    leadTier: string;
    smsConsent: boolean;
    ageConfirm: boolean;
    consentText: string;
    consentTimestamp: string;
    sourceUrl: string;
    ip: string;
    attribution: Record<string, string>;
}

const V2_BASE = "https://services.leadconnectorhq.com";
const V1_BASE = "https://rest.gohighlevel.com/v1";
const V2_VERSION_HEADER = "2021-07-28";

/** GHL wants E.164. Assume US when we have 10 digits. */
function toE164(digits: string): string {
    if (digits.length === 10) return `+1${digits}`;
    if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
    return "";
}

function splitName(fullName: string): { firstName: string; lastName: string } {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return { firstName: parts[0], lastName: "" };
    return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** Tags drive the GHL automation. Keep them stable and lowercase. */
export function buildTags(lead: GhlLead): string[] {
    const tags = ["website lead", "southcoastqualitypaint.com"];

    if (lead.serviceSlug) tags.push(`service: ${lead.serviceSlug}`);
    if (lead.leadTier) tags.push(`priority: ${lead.leadTier.toLowerCase()}`);
    if (lead.smsConsent) tags.push("sms opt-in");

    const channel = lead.attribution.channel;
    if (channel) tags.push(`channel: ${channel}`);

    return tags;
}

/** Everything we know, in one readable note. */
export function buildNote(lead: GhlLead): string {
    const a = lead.attribution;
    const lines = [
        "=== WEBSITE LEAD — southcoastqualitypaint.com ===",
        "",
        `Name:            ${lead.fullName}`,
        `Email:           ${lead.email}`,
        `Phone:           ${lead.phone || "Not provided"}`,
        `Service:         ${lead.serviceLabel}`,
        `Project size:    ${lead.scaleLabel || "Not specified"}`,
        `Timeline:        ${lead.timelineLabel || "Not specified"}`,
        `Location:        ${lead.locationLabel || "Not specified"}`,
        `City / address:  ${lead.address || "Not provided"}`,
        `Lead priority:   ${lead.leadTier || "Unscored"}`,
        "",
        "--- Notes from the customer ---",
        lead.notes || "(none)",
        "",
        "--- Attribution ---",
        `Channel:         ${a.channel || "direct"}`,
        `UTM source:      ${a.utm_source || "-"}`,
        `UTM medium:      ${a.utm_medium || "-"}`,
        `UTM campaign:    ${a.utm_campaign || "-"}`,
        `UTM term:        ${a.utm_term || "-"}`,
        `UTM content:     ${a.utm_content || "-"}`,
        `gclid:           ${a.gclid || "-"}`,
        `fbclid:          ${a.fbclid || "-"}`,
        `Referrer:        ${a.referrer || "-"}`,
        `Landing page:    ${a.landing_page || "-"}`,
        `First touch:     ${a.first_touch_channel || "-"}`,
        `Submitted from:  ${lead.sourceUrl || "-"}`,
        "",
        "--- A2P / SMS consent proof ---",
        `SMS opt-in:      ${lead.smsConsent ? "YES" : "No"}`,
        `18+ confirmed:   ${lead.ageConfirm ? "Yes" : "No"}`,
        `Consent time:    ${lead.consentTimestamp || "-"}`,
        `IP address:      ${lead.ip}`,
    ];

    if (lead.smsConsent && lead.consentText) {
        lines.push("", `Consent text shown: "${lead.consentText}"`);
    }

    return lines.join("\n");
}

/** Optional custom-field mapping, configured in the GHL UI. */
function buildCustomFields(lead: GhlLead): Array<{ id: string; field_value: string }> {
    const raw = process.env.GHL_CUSTOM_FIELDS;
    if (!raw) return [];
    let map: Record<string, string>;
    try {
        map = JSON.parse(raw);
    } catch {
        console.error("GHL_CUSTOM_FIELDS is not valid JSON — skipping custom fields.");
        return [];
    }

    const values: Record<string, string> = {
        service: lead.serviceLabel,
        service_slug: lead.serviceSlug,
        project_size: lead.scaleLabel,
        timeline: lead.timelineLabel,
        location: lead.locationLabel,
        lead_tier: lead.leadTier,
        sms_consent: lead.smsConsent ? "Yes" : "No",
        consent_timestamp: lead.consentTimestamp,
        source_url: lead.sourceUrl,
        channel: lead.attribution.channel || "",
        utm_source: lead.attribution.utm_source || "",
        utm_campaign: lead.attribution.utm_campaign || "",
        notes: lead.notes,
    };

    return Object.entries(map)
        .filter(([key, id]) => id && values[key])
        .map(([key, id]) => ({ id, field_value: values[key] }));
}

async function postJson(url: string, token: string, body: unknown, v2: boolean) {
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    };
    if (v2) headers.Version = V2_VERSION_HEADER;

    const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });

    const text = await res.text();
    let json: unknown = null;
    try {
        json = text ? JSON.parse(text) : null;
    } catch {
        /* non-JSON response */
    }
    return { ok: res.ok, status: res.status, json, text };
}

/**
 * Push the lead into GHL. Never throws — a GHL outage must not
 * cost us the lead, so failures are logged and swallowed.
 */
export async function pushToGhl(lead: GhlLead): Promise<{ pushed: boolean; contactId?: string }> {
    const token = process.env.GHL_API_KEY;
    if (!token) return { pushed: false };

    const useV1 = (process.env.GHL_API_VERSION || "").toLowerCase() === "v1";
    const locationId = process.env.GHL_LOCATION_ID;
    if (!useV1 && !locationId) {
        console.error("GHL_LOCATION_ID is required for the v2 API — skipping GHL push.");
        return { pushed: false };
    }

    const { firstName, lastName } = splitName(lead.fullName);
    const e164 = toE164(lead.phoneDigits);
    const tags = buildTags(lead);

    try {
        let contactId: string | undefined;

        if (useV1) {
            const body: Record<string, unknown> = {
                email: lead.email,
                firstName,
                lastName,
                name: lead.fullName,
                tags,
                source: "Website — southcoastqualitypaint.com",
            };
            if (e164) body.phone = e164;
            if (lead.address) body.city = lead.address;

            const r = await postJson(`${V1_BASE}/contacts/`, token, body, false);
            if (!r.ok) {
                console.error("GHL v1 contact upsert failed:", r.status, r.text.slice(0, 400));
                return { pushed: false };
            }
            const j = r.json as { contact?: { id?: string } } | null;
            contactId = j?.contact?.id;
        } else {
            const body: Record<string, unknown> = {
                locationId,
                email: lead.email,
                firstName,
                lastName,
                name: lead.fullName,
                tags,
                source: "Website — southcoastqualitypaint.com",
            };
            if (e164) body.phone = e164;
            if (lead.address) body.city = lead.address;

            const customFields = buildCustomFields(lead);
            if (customFields.length) body.customFields = customFields;

            const r = await postJson(`${V2_BASE}/contacts/upsert`, token, body, true);
            if (!r.ok) {
                console.error("GHL v2 contact upsert failed:", r.status, r.text.slice(0, 400));
                return { pushed: false };
            }
            const j = r.json as { contact?: { id?: string }; id?: string } | null;
            contactId = j?.contact?.id || j?.id;
        }

        if (!contactId) {
            console.error("GHL push succeeded but no contact id was returned.");
            return { pushed: true };
        }

        // Attach the full detail as a note so nothing is lost.
        const noteUrl = useV1
            ? `${V1_BASE}/contacts/${contactId}/notes/`
            : `${V2_BASE}/contacts/${contactId}/notes`;
        const noteRes = await postJson(noteUrl, token, { body: buildNote(lead) }, !useV1);
        if (!noteRes.ok) {
            console.error("GHL note create failed:", noteRes.status, noteRes.text.slice(0, 300));
        }

        // Optionally open an opportunity in the sales pipeline.
        const pipelineId = process.env.GHL_PIPELINE_ID;
        const stageId = process.env.GHL_PIPELINE_STAGE_ID;
        if (!useV1 && pipelineId && stageId) {
            const oppRes = await postJson(
                `${V2_BASE}/opportunities/`,
                token,
                {
                    locationId,
                    pipelineId,
                    pipelineStageId: stageId,
                    contactId,
                    name: `${lead.fullName} — ${lead.serviceLabel}`,
                    status: "open",
                },
                true
            );
            if (!oppRes.ok) {
                console.error("GHL opportunity create failed:", oppRes.status, oppRes.text.slice(0, 300));
            }
        }

        return { pushed: true, contactId };
    } catch (err) {
        console.error("GHL push threw:", err);
        return { pushed: false };
    }
}
