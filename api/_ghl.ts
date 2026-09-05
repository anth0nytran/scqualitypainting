/* ============================================================
   GoHighLevel (LeadConnector) lead push.

   Every website submission is upserted into GHL as a contact and
   auto-tagged "website-form" the moment the form is submitted.
   That tag is THE automation trigger for the lead alert, so it
   must not be renamed.

   The contact also gets the location's custom fields populated,
   including contact.website_lead_alert -- a pre-formatted, ready
   to read summary that can be dropped straight into an SMS or
   email alert as a single merge tag. A note carries the full
   detail as a backstop.

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
    /** Raw quiz value, needed to map onto the GHL picklist options. */
    scaleSlug: string;
    scaleLabel: string;
    /** Raw quiz value, needed to map onto the GHL picklist options. */
    timelineSlug: string;
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

/**
 * Tags drive the GHL automation.
 *
 * "website-form" is THE trigger tag — the workflow fires on it, so it must
 * never change. The rest are filters. All slug-style (lowercase, hyphens,
 * no spaces or colons) so they are safe to match on in workflow conditions.
 */
export function buildTags(lead: GhlLead): string[] {
    const tags = ["website-form", "website-lead"];

    if (lead.serviceSlug) tags.push(`service-${lead.serviceSlug}`);
    if (lead.leadTier) tags.push(`priority-${lead.leadTier.toLowerCase()}`);
    if (lead.smsConsent) tags.push("sms-optin");

    const channel = lead.attribution.channel;
    if (channel) tags.push(`channel-${channel.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);

    return tags;
}

/* ------------------------------------------------------------------
   Mapping into the location's EXISTING picklist custom fields.
   Values must match the configured options exactly or GHL drops them.
   ------------------------------------------------------------------ */

/** contact.project_type */
const PROJECT_TYPE: Record<string, string> = {
    "interior-painting": "Interior",
    "exterior-painting": "Exterior",
    "cabinet-painting": "Cabinets",
    "wood-staining": "Staining",
    "venetian-plaster": "Custom/Venetian",
    multiple: "Multiple",
    // legacy
    residential: "Interior",
    commercial: "Interior",
    exterior: "Exterior",
    cabinetry: "Cabinets",
    "washable-flat": "Interior",
};

/** contact.project_size */
const PROJECT_SIZE: Record<string, string> = {
    refresh: "A room or two",
    feature: "A room or two",
    "whole-home": "Whole interior",
    estate: "Whole home, inside & out",
};

/** contact.timeline */
const TIMELINE_OPTION: Record<string, string> = {
    asap: "As fast as possible",
    antonio: "I'm flexible - whenever he can do it right",
    "1-2-weeks": "Within a few weeks",
    "1-3-months": "In the next 1-3 months",
    unsure: "I'm flexible - whenever he can do it right",
    // legacy
    ready: "As fast as possible",
    "1-3": "In the next 1-3 months",
    "3-6": "I'm flexible - whenever he can do it right",
    exploring: "I'm flexible - whenever he can do it right",
};

/**
 * The one field Antonio actually reads.
 *
 * Drop {{contact.website_lead_alert}} into an SMS or email and he gets the
 * whole lead in a shape that scans in about three seconds. Plain text only,
 * no box-drawing characters, so it renders correctly in SMS.
 */
export function buildAlert(lead: GhlLead): string {
    const L: string[] = [];
    const tier = lead.leadTier ? lead.leadTier.toUpperCase() : "NEW";

    L.push(`NEW WEBSITE LEAD - ${tier}`);
    L.push("");
    L.push(`Name:  ${lead.fullName}`);
    L.push(`Phone: ${lead.phone || "not given"}`);
    L.push(`Email: ${lead.email}`);
    L.push("");
    L.push(`Wants: ${lead.serviceLabel}`);
    if (lead.scaleLabel) L.push(`Size:  ${lead.scaleLabel}`);
    if (lead.timelineLabel) L.push(`When:  ${lead.timelineLabel}`);

    const where = [lead.address, lead.locationLabel].filter(Boolean).join(" - ");
    if (where) L.push(`Where: ${where}`);

    if (lead.notes) {
        L.push("");
        L.push("They said:");
        L.push(`"${lead.notes}"`);
    }

    L.push("");
    L.push(`Texts OK: ${lead.smsConsent ? "Yes" : "No"}`);

    const src = [
        lead.attribution.utm_source,
        lead.attribution.utm_medium,
        lead.attribution.utm_campaign,
    ].filter(Boolean).join(" / ");
    L.push(`Found us: ${src || lead.attribution.channel || "direct"}`);
    if (lead.sourceUrl) L.push(`Page: ${lead.sourceUrl}`);

    return L.join("\n");
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

/* ------------------------------------------------------------------
   Custom-field IDs are per-location, and GHL's v2 upsert only accepts
   IDs (a fieldKey is silently ignored). So the map is fetched once and
   cached for the life of the warm lambda, which keeps this working even
   if a field is deleted and recreated with a new id.
   ------------------------------------------------------------------ */
let fieldIdCache: Record<string, string> | null = null;

async function getFieldIds(token: string, locationId: string): Promise<Record<string, string>> {
    if (fieldIdCache) return fieldIdCache;
    try {
        const res = await fetch(
            `${V2_BASE}/locations/${locationId}/customFields?model=contact`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Version: V2_VERSION_HEADER,
                    Accept: "application/json",
                },
            }
        );
        if (!res.ok) {
            console.error("GHL custom-field lookup failed:", res.status);
            return {};
        }
        const json = (await res.json()) as { customFields?: Array<{ id: string; fieldKey: string }> };
        const map: Record<string, string> = {};
        for (const f of json.customFields || []) {
            if (f.fieldKey && f.id) map[f.fieldKey.replace(/^contact\./, "")] = f.id;
        }
        fieldIdCache = map;
        return map;
    } catch (err) {
        console.error("GHL custom-field lookup threw:", err);
        return {};
    }
}

/**
 * Populate the location's contact custom fields.
 *
 * Picklist fields only accept one of their configured options, which is
 * what the PROJECT_TYPE / PROJECT_SIZE / TIMELINE_OPTION maps are for —
 * anything else is dropped by GHL without an error.
 */
function buildFieldValues(lead: GhlLead): Record<string, string> {
    const v: Record<string, string> = {
        // The one field Antonio reads
        website_lead_alert: buildAlert(lead),

        // Qualification
        lead_priority: lead.leadTier,
        project_type: PROJECT_TYPE[lead.serviceSlug] || "",
        project_size: PROJECT_SIZE[lead.scaleSlug] || "",
        timeline: TIMELINE_OPTION[lead.timelineSlug] || "",
        lead_source: "Website Form",
        form_type: "Website consultation form",
        project_address: lead.address,
        message: lead.notes,

        // A2P consent proof
        sms_consent: lead.smsConsent ? "Yes" : "No",
        age_consent: lead.ageConfirm ? "Yes" : "No",
        sms_consent_source: lead.sourceUrl,
        form_submitted_at: lead.consentTimestamp,

        // Attribution
        lead_attribution: lead.attribution.channel || "direct",
        utm_source: lead.attribution.utm_source || "",
        utm_medium: lead.attribution.utm_medium || "",
        utm_campaign: lead.attribution.utm_campaign || "",
        utm_term: lead.attribution.utm_term || "",
        utm_content: lead.attribution.utm_content || "",
    };

    for (const k of Object.keys(v)) {
        if (!v[k] || !String(v[k]).trim()) delete v[k];
    }
    return v;
}

async function buildCustomFields(
    lead: GhlLead,
    token: string,
    locationId: string
): Promise<Array<{ id: string; field_value: string }>> {
    const ids = await getFieldIds(token, locationId);
    const values = buildFieldValues(lead);

    const fields: Array<{ id: string; field_value: string }> = [];
    const missing: string[] = [];
    for (const [key, field_value] of Object.entries(values)) {
        const id = ids[key];
        if (id) fields.push({ id, field_value });
        else missing.push(key);
    }
    if (missing.length) {
        console.warn("GHL: no custom field found for:", missing.join(", "));
    }

    // Optional id-based extras from the environment.
    const raw = process.env.GHL_CUSTOM_FIELDS;
    if (raw) {
        try {
            const map = JSON.parse(raw) as Record<string, string>;
            for (const [k, id] of Object.entries(map)) {
                if (id && values[k]) fields.push({ id, field_value: values[k] });
            }
        } catch {
            console.error("GHL_CUSTOM_FIELDS is not valid JSON — ignoring it.");
        }
    }

    return fields;
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

            // v1 addresses custom fields by key rather than id.
            body.customField = buildFieldValues(lead);

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

            const customFields = await buildCustomFields(lead, token, locationId);
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
