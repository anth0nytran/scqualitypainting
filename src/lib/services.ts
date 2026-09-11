/* ============================================================
   South Coast — Service catalog (single source of truth).

   Everything on the site reads from here: the service pages,
   the /services hub, the home page cards, the consultation form
   options, the sitemap, and the schema.org markup.

   POSITIONING
   - Painting first: interior, exterior, cabinets, wood staining.
     Venetian plaster is the specialty that sets us apart, not
     the only thing we do.
   - Premium but approachable. We are the careful, high-quality
     option — not the cheapest, and not stuffy about it. The work is
     for large, older and architect-built homes across Houston's most
     established neighborhoods. Signal that caliber through the WORK
     and the STANDARD, never by calling ourselves luxury/elite/premier
     or by calling the customer high-end. Concrete nouns beat adjectives.
   - Never lead with "FREE". The offer is a private consultation
     with Antonio, who makes samples in the room's own light and
     settles the color BEFORE any work starts. Promise the outcome
     (you approve it first), never a number of rounds — "over and
     over until you are happy" commits us to unlimited free
     iterations and makes the process sound slow. Exacting
     customers are welcome; that is not the same as unlimited.
   - On plaster, educate before quoting. Explain why real
     Venetian plaster costs more, then offer lime wash, glaze,
     and decorative faux finishes as flexible alternatives.

   COPY RULE: plain English, short sentences, everyday words.
   Target reading level ~3rd grade. Calm and confident, never
   salesy. Answer the question in the FIRST sentence so Google
   and AI assistants can quote it directly.
   ============================================================ */

export interface ServiceFAQ {
    q: string;
    a: string;
}

/** An optional teaching block — used to explain cost and craft. */
export interface ServiceEducation {
    title: string;
    paragraphs: string[];
}

/** Budget tiers, currently used to give plaster customers options. */
export interface ServiceTier {
    name: string;
    blurb: string;
    note: string;
}

export interface ServiceDef {
    /** URL slug — the page lives at /{slug} */
    slug: string;
    /** Short label for nav, cards and the consultation form */
    label: string;
    /** Longer name used in headings and schema */
    name: string;
    /** <title> tag */
    seoTitle: string;
    /** <meta name="description"> */
    seoDescription: string;
    /** Page H1 */
    h1: string;
    /** One-line summary under the H1 */
    lede: string;
    /** Body paragraphs — plain English */
    body: string[];
    /** Bullet list of what is included */
    includes: string[];
    /** The reason to pick us for this specific job */
    edge: { title: string; text: string };
    /** Optional teaching section (why it costs what it costs) */
    education?: ServiceEducation;
    /** Optional budget options shown as tiers */
    tiers?: ServiceTier[];
    /** Page-specific questions people actually ask */
    faqs: ServiceFAQ[];
    /** Hero image path */
    image: string;
    /** Hero image alt text */
    imageAlt: string;
    /** Slugs of related services shown at the bottom */
    related: string[];
    /** Card blurb used on the home page and services hub */
    cardBlurb: string;
}

export const PHONE_DISPLAY = "(713) 539-8069";
export const PHONE_TEL = "+17135398069";
export const SITE_URL = "https://www.southcoastqualitypaint.com";

/** The line that runs under the company name in signatures and the footer. */
export const BRAND_LINE =
    "Texas Venetian Plaster · Microcement · Lime Wash · Architectural Finishes";

export const SERVICE_AREAS = [
    "Houston",
    "River Oaks",
    "Memorial",
    "Bellaire",
    "West University Place",
    "The Woodlands",
    "Sugar Land",
    "Katy",
    "Cypress",
    "Spring",
    "Pearland",
    "Friendswood",
    "League City",
    "Missouri City",
    "Richmond",
    "Kingwood",
];

export const SERVICES: ServiceDef[] = [
    /* ---------------------------------------------------------- */
    {
        slug: "interior-painting",
        label: "Interior Painting",
        name: "Interior House Painting",
        seoTitle: "Interior House Painting in Houston, TX",
        seoDescription:
            "Careful interior painting for Houston homes and offices. Walls, ceilings, trim and doors, plus a flat finish you can wash. Call (713) 539-8069.",
        h1: "Interior Painting in Houston",
        lede: "We paint the inside of your home the way it should be done. Slowly, by hand, and to one standard.",
        body: [
            "Painting the inside of a home is our main work. We take one room or a whole house. We paint offices, shops, and other work spaces too.",
            "Most of the job is what you never see. We cover your floors and furniture. We fix holes, cracks, and dents. We sand the wall smooth and prime it. Only then do we paint. Skipping those steps is why a cheap paint job peels within a year.",
            "We lay two full coats so the color is even and deep. We keep the lines crisp where the wall meets the ceiling and the trim. Then we clean up and take everything with us.",
        ],
        includes: [
            "Walls, ceilings, trim, doors, and baseboards",
            "Floors and furniture covered before we start",
            "Holes and cracks filled, sanded, and primed",
            "Two full coats for even, deep color",
            "Our washable flat finish, if you want it",
            "Full clean-up when the work is done",
        ],
        edge: {
            title: "The only flat paint in Houston you can actually wash",
            text:
                "Flat paint looks soft and hides every bump in a wall. The catch is that it stains the moment you touch it, so most painters steer you to satin or eggshell — shiny, and it shows every flaw. We are the only ones in Houston who have worked out how to do a true flat finish that wipes clean and takes a scrub. It hides drywall flaws, and it holds up for up to 10 years. It is the thing we get asked for most.",
        },
        faqs: [
            {
                q: "How much does it cost to paint the inside of a house in Houston?",
                a: "The price depends on how many rooms you have, how tall the ceilings are, and how much wall repair is needed. We are not the cheapest painters in Houston, and we do not try to be. Antonio will walk the space with you and give you a clear price in writing before anything starts.",
            },
            {
                q: "How long does it take to paint a room?",
                a: "Most single rooms take one to two days. A whole house usually takes three days to a week. We tell you the schedule before we start, and we keep to it.",
            },
            {
                q: "Do I need to move out while you paint?",
                a: "No. Almost all of our customers stay home while we work. We paint room by room, cover everything, and clean up at the end of each day. We use low-odor paint so the air stays easy to breathe.",
            },
            {
                q: "Do you paint ceilings and trim too?",
                a: "Yes. We paint ceilings, trim, baseboards, doors, and door frames. People often paint the walls only, and then the old trim looks dingy next to the fresh color. We will price the whole room so it works together.",
            },
            {
                q: "What kind of paint do you use?",
                a: "We use top-grade paint from brands like Sherwin-Williams and Benjamin Moore. Better paint covers more evenly, holds its color, and lasts longer. We talk the sheen through with you first, because that changes how a room feels more than most people expect.",
            },
        ],
        image: "/services/interior-painting.webp",
        imageAlt: "Freshly painted hallway with wainscot panels and crisp trim in a Houston home",
        related: ["cabinet-painting", "wood-staining", "venetian-plaster"],
        cardBlurb:
            "Walls, ceilings, trim, and doors — prepped properly. Home of our washable flat finish.",
    },

    /* ---------------------------------------------------------- */
    {
        slug: "exterior-painting",
        label: "Exterior Painting",
        name: "Exterior House Painting",
        seoTitle: "Exterior House Painting in Houston, TX",
        seoDescription:
            "Exterior painting for Houston homes and buildings. Stucco, siding, brick, and trim, sealed properly against heat and rain. Book a consultation: (713) 539-8069.",
        h1: "Exterior Painting in Houston",
        lede: "We paint the outside of your home and seal it against Houston weather.",
        body: [
            "Houston is hot and wet. Sun fades paint. Rain and damp air work their way underneath it. Then the paint bubbles, peels, and splits. Careful prep is the only thing that stops it.",
            "We wash the outside first to take off dirt and mildew. We scrape away loose paint. We repair rotted wood and fill the gaps. We caulk around every window and door so water cannot get behind the finish. Then we prime and paint.",
            "We work on stucco, siding, brick, trim, doors, garage doors, fences, and patios. We use exterior paint that holds its color through a Texas summer.",
        ],
        includes: [
            "Power washing to remove dirt and mildew",
            "Loose and peeling paint scraped back",
            "Rotted wood repaired or replaced",
            "Windows and doors caulked to keep water out",
            "Primer plus two coats of exterior paint",
            "Stucco, siding, brick, trim, and garage doors",
        ],
        edge: {
            title: "We seal the water out before we paint",
            text:
                "Nearly every failed exterior paint job in Houston failed for one reason: water got behind the paint. We caulk every gap around windows, doors, and trim before a drop of paint goes on. It is slow, unglamorous work, and it is the easiest thing to skip. It is also the whole difference between a finish that lasts two years and one that lasts ten.",
        },
        faqs: [
            {
                q: "How often should I repaint the outside of my house in Houston?",
                a: "Most Houston homes need exterior paint every 5 to 10 years. Stucco and brick can go longer. Wood siding and trim need it sooner, because sun and rain hit them hardest. If you see peeling, chalky patches, or splits, it is time.",
            },
            {
                q: "How much does exterior painting cost in Houston?",
                a: "The price depends on the size of your home, how many stories it has, and how much the siding or trim needs repairing. Antonio comes out, looks at it properly, and puts a clear price in writing.",
            },
            {
                q: "What is the best time of year to paint outside in Houston?",
                a: "Fall and spring are best, because it is cooler and less humid. We do paint year-round, though. We watch the forecast and will not paint in rain or extreme heat, because the paint will not cure properly.",
            },
            {
                q: "Do you paint stucco?",
                a: "Yes. Stucco is common in Houston and needs the right coating. We patch the cracks first, then use a paint that lets the wall breathe. Seal stucco with the wrong product and you trap moisture inside the wall, which does real damage.",
            },
            {
                q: "How long does an exterior paint job take?",
                a: "Most homes take 3 to 7 days. Larger homes, or ones needing a lot of wood repair, take longer. Weather can add a day or two. We give you the plan up front and keep you posted as we go.",
            },
        ],
        image: "/services/exterior-painting.webp",
        imageAlt: "Painted exterior trim, soffits and garage door on a Houston home",
        related: ["interior-painting", "wood-staining", "cabinet-painting"],
        cardBlurb:
            "Stucco, siding, brick, and trim — washed, repaired, and sealed against Houston weather.",
    },

    /* ---------------------------------------------------------- */
    {
        slug: "cabinet-painting",
        label: "Cabinet Painting",
        name: "Kitchen Cabinet Painting & Refinishing",
        seoTitle: "Cabinet Painting & Refinishing in Houston",
        seoDescription:
            "Kitchen and bath cabinet painting in Houston, TX. Sprayed smooth, seams sealed so the finish will not crack. Call (713) 539-8069.",
        h1: "Cabinet Painting in Houston",
        lede: "Good cabinets are worth keeping. We refinish them so they look better than the day they went in.",
        body: [
            "If your cabinets are solid but the color is tired, there is no reason to tear them out. Refinishing keeps the joinery you already paid for, and it takes days rather than weeks.",
            "We take every door and drawer off and label it. We strip off years of kitchen grease. We sand every surface so the new finish can grip. We fill the dents and nicks. Then we spray primer and paint, which is what gives you a smooth surface with no brush marks.",
            "We work on kitchen cabinets, bathroom vanities, built-in shelving, and islands. Bring us a color, or let Antonio make samples until you find the one.",
        ],
        includes: [
            "Doors and drawers removed, labeled, and sprayed",
            "Grease and grime stripped off completely",
            "Every surface sanded so the finish grips",
            "Seams caulked and sealed before finishing",
            "Sprayed, so there are no brush marks",
            "New hinges and handles fitted if you want them",
        ],
        edge: {
            title: "We seal the seams. Almost no one else does.",
            text:
                "Look closely at a cabinet door and you will find thin gaps where the pieces join. Most shops paint straight over them. Steam and dust get into those gaps, the wood swells a little, and the paint splits along the seam inside a year or two. We caulk and seal those seams before we finish. It adds hours to the job. It is why our cabinets still look right years later.",
        },
        faqs: [
            {
                q: "Is it cheaper to paint cabinets or replace them?",
                a: "Refinishing costs far less. New kitchen cabinets often run several times the price. In most of the homes we work in the boxes and doors are solid hardwood and well worth keeping — so refinishing gives you a smoother finish than a mid-range replacement, in days rather than weeks.",
            },
            {
                q: "How long does cabinet painting take?",
                a: "Most kitchens take 3 to 5 days. We take the doors off on the first day and bring them back at the end. You can still use the kitchen for most of that time, and we keep the space clean while we work.",
            },
            {
                q: "Will the paint chip or peel off my cabinets?",
                a: "Not if the prep is done properly. Cabinets get touched, wiped, and steamed every day, so the finish has to grip. We degrease, sand, and prime every surface, and we seal the seams. That is what keeps it from chipping or splitting.",
            },
            {
                q: "Can you paint wood cabinets white?",
                a: "Yes, and it is our most requested color. Wood grain can bleed through a light finish, so we use a blocking primer first. Without it, yellow or pink shadows come through the white a few months later.",
            },
            {
                q: "Do you spray or brush cabinets?",
                a: "We spray. Spraying gives a smooth, even surface with no brush strokes, which is the difference between cabinets that look factory-finished and cabinets that look painted at home.",
            },
        ],
        image: "/services/cabinetry.webp",
        imageAlt: "Refinished and sealed kitchen cabinets in a Houston home",
        related: ["interior-painting", "wood-staining", "venetian-plaster"],
        cardBlurb:
            "Sprayed glass-smooth, with the seams sealed so the finish will not split at the joins.",
    },

    /* ---------------------------------------------------------- */
    {
        slug: "wood-staining",
        label: "Wood Staining",
        name: "Wood Staining & Finishing",
        seoTitle: "Wood Staining & Finishing in Houston, TX",
        seoDescription:
            "Wood staining and sealing in Houston, TX. Front doors, cabinets, trim, stairs, beams, decks, and fences, color-matched on your own wood first. (713) 539-8069.",
        h1: "Wood Staining in Houston",
        lede: "We bring out the grain in your wood and seal it so it lasts.",
        body: [
            "Paint covers wood. Stain soaks into it and lets the grain show. If you love the look of real wood, stain is what you want.",
            "We stain front doors, cabinets, trim, stair rails, ceiling beams, mantels, decks, fences, and patio covers. We can stay close to the natural color or take it deeper and richer.",
            "Stain shows everything underneath it, so the sanding matters far more than it does with paint. We strip the old finish, sand the wood smooth, and even out the color. Then we work the stain in by hand and seal over the top against sun, water, and wear.",
        ],
        includes: [
            "Old finish stripped and the wood sanded smooth",
            "Color matched on a sample you approve first",
            "Stain worked in by hand for even color",
            "Clear protective sealer over the top",
            "Indoors: doors, trim, stairs, beams, mantels",
            "Outdoors: decks, fences, patio covers, gates",
        ],
        edge: {
            title: "We test the color on your own wood first",
            text:
                "The same stain looks nothing alike on oak and on pine. A color you loved on a store card can come out orange or muddy on your wood. So we always stain a test piece of your actual wood and let you look at it in your own light, at different times of day. You approve the color before we commit to it. If it is not right, we make another one.",
        },
        faqs: [
            {
                q: "What is the difference between staining and painting wood?",
                a: "Stain soaks into the wood and lets the grain show through. Paint sits on top and hides it. Choose stain if you want the wood to look like wood, and paint if you want a solid color.",
            },
            {
                q: "Can you change the color of wood that is already stained?",
                a: "Yes, though going darker is much easier than going lighter. To lighten wood we have to strip and sand the old finish off first, which adds time. Antonio will look at your wood and tell you honestly what color range is realistic.",
            },
            {
                q: "How long does stain last outside in Houston?",
                a: "On a Houston deck or fence, stain usually lasts 2 to 4 years before it needs a fresh coat. Our sun and rain are hard on outdoor wood. Indoor wood that is stained and sealed will hold for many years.",
            },
            {
                q: "Can you stain my front door?",
                a: "Yes, front doors are one of the jobs we do most. A south- or west-facing door takes a beating from the Houston sun. We sand it back, stain it, and seal it with a UV blocker so it holds its color far longer.",
            },
            {
                q: "Do you stain kitchen cabinets?",
                a: "Yes. If your cabinets are real wood and you want to keep the grain visible, we can strip and restain them rather than paint them. If they are laminate or thermofoil, stain will not soak in, and painting is the right choice.",
            },
        ],
        image: "/services/wood-staining.webp",
        imageAlt: "Hand-stained walnut slat wall and floating cabinetry in a Houston home",
        related: ["cabinet-painting", "exterior-painting", "interior-painting"],
        cardBlurb:
            "Doors, trim, stairs, beams, and decks. Color tested on your own wood before we commit.",
    },

    /* ---------------------------------------------------------- */
    {
        slug: "venetian-plaster",
        label: "Venetian Plaster",
        name: "Venetian Plaster, Lime Wash & Architectural Finishes",
        seoTitle: "Venetian Plaster & Tadelakt in Houston, TX",
        seoDescription:
            "Certified plaster specialist Antonio Benitez applies Venetian plaster, Tadelakt, microcement and lime wash in Houston, TX. Call (713) 539-8069.",
        h1: "Venetian Plaster in Houston",
        lede: "Our specialty. Real lime plaster, laid by hand and burnished until it holds the light.",
        body: [
            "Venetian plaster is a wall finish made from crushed and fired limestone mixed with marble dust. It goes on by hand in thin layers and is polished smooth. The wall ends up looking like stone, with a depth and movement that paint cannot imitate.",
            "Antonio Benitez is a certified plaster specialist, and he lays every plaster wall himself. He does not hand this work to a crew. Very few people in Houston do it properly, because it takes years with a trowel before your hand knows what it is doing.",
            "We also apply Tadelakt, a waterproof lime plaster for showers and baths with no grout lines to fail. Plus Marmorino for a soft stone look, Roman Clay for a warm matte finish, lime wash for a chalky, old-world wall, and microcement for a modern concrete look on walls, floors, and counters.",
        ],
        includes: [
            "Polished Venetian plaster and Marmorino",
            "Waterproof Tadelakt for showers and baths",
            "Lime wash and Roman Clay for a matte look",
            "Microcement for walls, floors, and counters",
            "Feature walls, fireplaces, and range hoods",
            "Samples made for your room and your light",
        ],
        edge: {
            title: "Laid by a certified plaster specialist, by hand",
            text:
                "Plaster is not painting. It is a trade you build over years, and there is no shortcut. Antonio is a certified plaster specialist and works every plaster wall himself. If a wall is going to be the first thing people notice in your home, that is who should be laying it.",
        },
        education: {
            title: "Why Venetian plaster costs what it costs",
            paragraphs: [
                "Venetian plaster has a lot of steps involved, and a skilled professional is usually required. The product is crushed and fired limestone with marble dust. There is sanding, washing, and burnishing between coats. This is why it comes with a steep price tag.",
                "If Venetian plaster is not the right option for your budget, we also offer decorative faux finishes, lime wash, and glaze. These options can still create a beautiful, custom decorative look while offering more flexibility.",
                "Antonio will walk you through the choices at your consultation and make samples for your room, so you can see the difference for yourself before you decide.",
            ],
        },
        tiers: [
            {
                name: "Venetian Plaster & Tadelakt",
                blurb:
                    "Fired limestone and marble dust, laid by hand in layers, sanded, washed and burnished between coats.",
                note: "The real thing",
            },
            {
                name: "Lime Wash & Roman Clay",
                blurb:
                    "A softer, chalky, old-world wall with real movement and depth. Hand-applied, and far more flexible on budget.",
                note: "A middle path",
            },
            {
                name: "Decorative Faux & Glaze",
                blurb:
                    "Custom decorative finishes that give you a beautiful, layered look with the most flexibility on cost and timing.",
                note: "Most flexible",
            },
        ],
        faqs: [
            {
                q: "Why is Venetian plaster so expensive?",
                a: "Venetian plaster has a lot of steps involved, and a skilled professional is usually required. The product is crushed and fired limestone with marble dust. There is sanding, washing, and burnishing between coats. This is why it comes with a steep price tag. If Venetian plaster is not the right option for your budget, we also offer decorative faux finishes, lime wash, and glaze, which still create a beautiful custom look with more flexibility.",
            },
            {
                q: "What is Venetian plaster?",
                a: "Venetian plaster is a wall finish made from crushed and fired limestone mixed with finely ground marble. It is troweled on by hand in thin layers and then burnished, which gives it a smooth, stone-like surface with real depth. Because it is worked by hand, no two walls are ever identical.",
            },
            {
                q: "What are the cheaper alternatives to Venetian plaster?",
                a: "Lime wash, Roman Clay, decorative faux finishes, and glaze. They are applied by hand and still give you a custom, layered look with genuine movement on the wall, but they involve fewer steps than true Venetian plaster, so they cost less and go faster. Antonio will show you samples of each so you can compare them in your own room.",
            },
            {
                q: "Is Tadelakt really waterproof?",
                a: "Yes. Tadelakt is a lime plaster that is compressed hard and sealed with natural olive soap, which makes it water-resistant. It is seamless, so there is no grout to crack or grow mildew. That is why it works so well in showers and around tubs.",
            },
            {
                q: "How long does Venetian plaster last?",
                a: "A properly laid and sealed lime plaster wall can last for decades. Lime keeps hardening over time, so the wall actually toughens as it ages. Wipe it with a soft damp cloth and keep harsh scouring powders away from it.",
            },
            {
                q: "What is the difference between Venetian plaster, Marmorino, and microcement?",
                a: "Venetian plaster is burnished to a smooth, marble-like sheen. Marmorino has a softer, more matte stone texture. Microcement is cement-based, gives a modern concrete look, and can go on floors and counters as well as walls. Antonio will make samples of each so you can see them in your own light.",
            },
            {
                q: "Can you put plaster over my existing painted wall?",
                a: "Usually yes. The wall has to be clean, sound, and flat first. We repair any damage and lay a base coat that the plaster can grip. If the wall has a heavy texture, we skim it flat before starting.",
            },
        ],
        image: "/services/plaster.webp",
        imageAlt:
            "Hand-troweled Venetian plaster feature wall by a certified plaster specialist in Houston",
        related: ["interior-painting", "cabinet-painting", "wood-staining"],
        cardBlurb:
            "Our specialty. Hand-laid lime plaster, Tadelakt, and lime wash by a certified specialist.",
    },
];

/* ---------------------------------------------------------- */

export const getService = (slug: string): ServiceDef | undefined =>
    SERVICES.find((s) => s.slug === slug);

/** Consultation-form options, kept in sync with the service catalog. */
export const QUOTE_OPTIONS = [
    ...SERVICES.map((s) => ({
        value: s.slug,
        label: s.label,
        hint: s.cardBlurb,
    })),
    {
        value: "multiple",
        label: "More Than One Thing",
        hint: "Tell us everything and Antonio will plan it as one project",
    },
    {
        value: "not-sure",
        label: "I'm Not Sure Yet",
        hint: "That is fine — that is what the consultation is for",
    },
];
