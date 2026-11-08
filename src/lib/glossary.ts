/* ============================================================
   South Coast — Finish & painting glossary.

   Plain English. The first sentence of every definition stands
   on its own so it can be quoted directly. Alphabetical by term.
   No prices, brands, or stats.
   ============================================================ */

export interface GlossaryTerm {
    slug: string;
    term: string;
    definition: string;
    link?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
    {
        slug: "aggregate",
        term: "Aggregate (Marble Dust)",
        definition:
            "Aggregate is the fine grit mixed into a plaster, most often crushed marble or marble dust. It gives the plaster body and sets its texture. Fine marble dust makes a smooth, polished Venetian plaster. Coarser grains make the stone texture of Marmorino. The size of the aggregate is a big part of how a finished wall looks.",
        link: "/venetian-plaster",
    },
    {
        slug: "back-priming",
        term: "Back-Priming",
        definition:
            "Back-priming means sealing the back and cut ends of wood trim or siding before it is installed. It stops moisture from soaking into the hidden side of the board. In Houston's humid air, unsealed wood can swell, cup, and push the paint off the front. Back-priming helps the finish on the face of the wood last longer.",
        link: "/exterior-painting",
    },
    {
        slug: "base-coat",
        term: "Base Coat / Primer",
        definition:
            "A base coat, or primer, is the first layer that prepares a surface for the finish on top. It helps the finish grip, evens out how the surface absorbs, and blocks stains from bleeding through. Plaster and lime need a mineral base coat they can bond to. Skipping or rushing the primer is a common reason paint peels.",
    },
    {
        slug: "black-soap",
        term: "Black Soap (Tadelakt Soap)",
        definition:
            "Black soap is a soft olive-oil soap used to seal and care for Tadelakt plaster. It is rubbed into the plaster while it is still damp. The soap reacts with the lime and forms a layer that sheds water. The same soap is used later to clean Tadelakt and refresh its protection.",
        link: "/tadelakt",
    },
    {
        slug: "breathability",
        term: "Breathability",
        definition:
            "Breathability is how easily moisture vapor can pass through a wall finish. Lime wash, lime plaster, and mineral paints are breathable, so damp inside a wall can dry out instead of getting trapped. That matters in humid Houston, especially on brick and stucco. A non-breathable coating on the wrong wall can trap moisture and cause peeling or damage.",
        link: "/lime-wash",
    },
    {
        slug: "burnishing",
        term: "Burnishing",
        definition:
            "Burnishing is polishing a plaster surface by pressing it hard with a steel trowel or a smooth stone. The pressure closes the surface and brings up a soft sheen. Burnishing is what gives Venetian plaster its marble-like glow and gives Tadelakt its smooth, water-shedding skin. It is slow, skilled hand work.",
        link: "/venetian-plaster",
    },
    {
        slug: "carbonation",
        term: "Carbonation",
        definition:
            "Carbonation is the natural process that turns lime plaster back into stone. As lime dries, it absorbs carbon dioxide from the air and slowly becomes limestone again. This is why lime plaster and lime wash keep hardening for months, and why a well-made lime wall can toughen as it ages instead of wearing out.",
    },
    {
        slug: "caulk",
        term: "Caulk",
        definition:
            "Caulk is a flexible sealant used to fill gaps and seams before painting. It closes the joints around windows, doors, trim, and cabinet panels. Inside, it gives clean, crisp lines. Outside, it keeps rain from getting behind the paint. Good caulking is one of the least glamorous steps in painting and one of the most important.",
        link: "/exterior-painting",
    },
    {
        slug: "curing",
        term: "Curing",
        definition:
            "Curing is the time a paint, plaster, or sealer needs to reach full strength after it feels dry. A finish can be dry to the touch in hours but take days or weeks to fully cure. Scrubbing, heavy use, or water before it cures can mark or weaken it. Lime plaster keeps curing for months.",
    },
    {
        slug: "eggshell",
        term: "Eggshell",
        definition:
            "Eggshell is a low-sheen paint finish with a slight, soft glow, a little shinier than flat. It is easier to wipe clean than a standard flat, so it is common in living rooms, bedrooms, and halls. Because it reflects a bit of light, it shows wall flaws more than flat paint does.",
        link: "/interior-painting",
    },
    {
        slug: "epa-lead-safe-rrp",
        term: "EPA Lead-Safe (RRP)",
        definition:
            "EPA Lead-Safe, or RRP, is the federal rule for painting and renovation work on homes built before 1978. Those homes may have lead paint, and sanding or scraping it can spread toxic dust. The rule requires certified firms to contain dust, clean carefully, and follow set steps. Ask any painter about it before work on an older home.",
        link: "/hiring-a-painter",
    },
    {
        slug: "faux-finish",
        term: "Faux Finish",
        definition:
            "A faux finish is a decorative paint technique that imitates another material, like stone, marble, wood, leather, or aged plaster. It is built in layers with glazes, rags, brushes, or sponges. Faux finishes give a custom, layered look for less than real plaster. Done subtly, they add depth without looking dated.",
        link: "/custom-finish-matching",
    },
    {
        slug: "flat-paint",
        term: "Flat Paint",
        definition:
            "Flat paint is a paint finish with no shine at all. Because it reflects almost no light, it hides bumps, patches, and uneven drywall better than any other sheen. It looks soft and rich, especially on large walls and ceilings. Standard flat paint marks easily and is hard to clean, which is why washable flats exist.",
        link: "/interior-painting",
    },
    {
        slug: "glaze",
        term: "Glaze",
        definition:
            "A glaze is a thin, see-through layer of tinted finish brushed or rubbed over a base coat. It adds depth, softens color, and settles into texture and carved details. Glazes are used on walls, cabinets, and trim, and in many faux finishes. A glaze is one of the more flexible-budget ways to get a hand-made look.",
        link: "/custom-finish-matching",
    },
    {
        slug: "grassello",
        term: "Grassello",
        definition:
            "Grassello is a thick, aged lime putty that forms the base of traditional Venetian plaster. It is made by slaking lime and letting it rest, often for a long time, until it becomes smooth and creamy. Mixed with marble dust, it makes a plaster that can be burnished to a deep, polished sheen.",
        link: "/venetian-plaster",
    },
    {
        slug: "lime-wash",
        term: "Lime Wash",
        definition:
            "Lime wash is a thin, mineral paint made from slaked lime, water, and pigment. It soaks into the wall and dries to a soft, chalky finish with cloudy movement. It suits plaster, brick, stucco, and stone, inside or out. It is breathable and resists mildew, but it is less scrubbable than modern paint.",
        link: "/lime-wash",
    },
    {
        slug: "limewash-vs-whitewash",
        term: "Limewash vs. Whitewash",
        definition:
            "Limewash is a mineral coating made from slaked lime and pigment, while whitewash usually means watered-down paint or a quick lime-and-chalk mix. Limewash bonds into the surface and cures with soft, layered movement. Watered-down paint sits on top and tends to look thin and flat. The names are often mixed up.",
        link: "/lime-wash",
    },
    {
        slug: "liquid-metal",
        term: "Liquid Metal",
        definition:
            "Liquid metal is a coating made with real metal powder, such as bronze, copper, brass, or iron, held in a binder. Once it cures, it can be sanded, polished, or aged to a natural patina, just like solid metal. It is used on range hoods, doors, ceilings, columns, and trim.",
        link: "/liquid-metal",
    },
    {
        slug: "marmorino",
        term: "Marmorino",
        definition:
            "Marmorino is a lime plaster made with crushed marble that gives a wall a fine stone texture. It is troweled on by hand and can be left matte or pressed to a soft satin. Its grain is coarser than polished Venetian plaster, so it looks more like carved stone than polished marble.",
        link: "/roman-clay",
    },
    {
        slug: "metallic-paint",
        term: "Metallic Paint",
        definition:
            "Metallic paint is paint made with shimmering pigment that reflects light like metal. It gives a soft gleam to ceilings, niches, and accent walls. Unlike liquid metal, it contains no real metal, so it cannot be polished or aged to a patina. It costs less and goes on faster than a true metal coating.",
        link: "/liquid-metal",
    },
    {
        slug: "microcement",
        term: "Microcement",
        definition:
            "Microcement is a thin, cement-based coating troweled by hand onto walls, floors, counters, and showers. It is only a few millimeters thick, so it can often go over existing tile or concrete. Once sealed, it gives a seamless, modern concrete look. The sealer is what makes it stand up to water and wear.",
        link: "/microcement",
    },
    {
        slug: "mildew",
        term: "Mildew",
        definition:
            "Mildew is a mold that grows on damp surfaces and shows up as gray, green, or black spots. Houston's heat and humidity make it common on exterior walls, shaded siding, bathrooms, and grout. Painting over it does not kill it. It has to be cleaned off and the surface treated first, or it grows back through the new paint.",
        link: "/exterior-painting",
    },
    {
        slug: "patina",
        term: "Patina",
        definition:
            "A patina is the color change that forms on metal as it ages, like green on copper or brown on bronze. In decorative finishes, a patina can be created on purpose with a solution that speeds up the aging. Once the color is right, a sealer can slow or stop further change.",
        link: "/liquid-metal",
    },
    {
        slug: "roman-clay",
        term: "Roman Clay",
        definition:
            "Roman clay is a thin, hand-troweled plaster that dries to a soft, matte finish with gentle, cloudy movement. It sits between lime wash and polished Venetian plaster in look and in effort. It gives a wall real depth without a high polish, and usually costs less than Venetian plaster.",
        link: "/roman-clay",
    },
    {
        slug: "sample-board",
        term: "Sample Board",
        definition:
            "A sample board is a small panel made with the actual finish, color, and technique planned for your wall. It lets you see the real look in your own room's light before any work starts. Antonio makes sample boards for every custom finish and reworks them until you approve the result.",
        link: "/custom-finish-matching",
    },
    {
        slug: "sanding-between-coats",
        term: "Sanding Between Coats",
        definition:
            "Sanding between coats means lightly sanding each dried layer before the next goes on. It knocks down dust, drips, and ridges, and gives the next coat something to grip. It is standard on cabinets, trim, plaster, and microcement. Skipping it leaves a rough or uneven surface that shows through the final coat.",
    },
    {
        slug: "satin",
        term: "Satin",
        definition:
            "Satin is a paint finish with a soft, noticeable sheen, between eggshell and semi-gloss. It is durable and easy to clean, so it is common in kitchens, bathrooms, kids' rooms, and on trim and doors. Because it reflects more light, it shows wall flaws and roller marks more than flatter finishes do.",
        link: "/interior-painting",
    },
    {
        slug: "sealer",
        term: "Sealer",
        definition:
            "A sealer is a clear protective coat applied over a finish to guard it against water, stains, and wear. On plaster, lime wash, microcement, stain, and metal finishes, the right sealer decides how well the surface holds up. Different surfaces need different sealers, so a counter and a feature wall may get different ones.",
    },
    {
        slug: "semi-gloss",
        term: "Semi-Gloss",
        definition:
            "Semi-gloss is a shiny paint finish that is hard-wearing and very easy to wipe clean. It is often used on trim, doors, cabinets, and in bathrooms. Its shine shows every dent and flaw, so the prep underneath has to be very good. It is a step below full high-gloss.",
        link: "/interior-painting",
    },
    {
        slug: "sheen-levels",
        term: "Sheen Levels",
        definition:
            "Sheen level is how much light a paint finish reflects, from no shine to high shine. The common levels are flat, eggshell, satin, semi-gloss, and gloss. More sheen is usually easier to clean but shows more wall flaws. Sheen changes how a room feels as much as color does, so it is worth choosing with care.",
        link: "/interior-painting",
    },
    {
        slug: "skim-coat",
        term: "Skim Coat",
        definition:
            "A skim coat is a thin layer of joint compound or plaster spread over a wall to make it flat and smooth. It covers old texture, patches, and uneven drywall. Thin finishes like Roman clay, Venetian plaster, and flat paint show everything underneath, so a skim coat is often the first step before them.",
    },
    {
        slug: "slaked-lime",
        term: "Slaking / Slaked Lime",
        definition:
            "Slaking is mixing burned limestone, called quicklime, with water to make slaked lime. The reaction gives off heat and produces a soft lime putty or powder. Slaked lime is the base of lime wash, lime plaster, Venetian plaster, and Tadelakt. As it dries, it absorbs carbon dioxide and slowly turns back into stone.",
    },
    {
        slug: "spray-finish-cabinets",
        term: "Spray Finish (Cabinets)",
        definition:
            "A spray finish is paint or primer applied to cabinets with a sprayer instead of a brush or roller. Spraying lays down a thin, even coat with no brush strokes. It gives cabinet doors a smooth, factory-like surface. Doors and drawers are usually removed and sprayed separately for the cleanest result.",
        link: "/cabinet-painting",
    },
    {
        slug: "stucco-lustro",
        term: "Stucco Lustro",
        definition:
            "Stucco Lustro is a highly polished form of Venetian plaster. Its name means glossy stucco in Italian. It is laid in very thin layers of fine lime plaster and burnished hard, sometimes finished with wax, until the wall has a deep, glassy shine like polished marble. It is among the most demanding plaster finishes.",
        link: "/venetian-plaster",
    },
    {
        slug: "suede-finish",
        term: "Suede Finish",
        definition:
            "A suede finish is a decorative paint finish brushed on in crossing strokes so the wall looks like brushed suede. It has a soft, two-tone texture that shifts as the light moves. It is a warm, budget-friendly way to add depth to studies, dining rooms, and bedrooms.",
        link: "/suede-finish",
    },
    {
        slug: "tadelakt",
        term: "Tadelakt",
        definition:
            "Tadelakt is a water-resistant Moroccan lime plaster that is polished with stones and sealed with black olive soap. It creates one seamless surface with no grout lines, which is why it is used in showers, tub surrounds, and baths. It needs gentle, natural cleaners to stay sealed.",
        link: "/tadelakt",
    },
    {
        slug: "troweling",
        term: "Troweling",
        definition:
            "Troweling is spreading and shaping plaster with a flat steel blade called a trowel. The angle, pressure, and direction of each stroke create the movement in the finished wall. Venetian plaster, Marmorino, Roman clay, Tadelakt, and microcement are all troweled by hand. It is a skill that takes years to learn well.",
        link: "/venetian-plaster",
    },
    {
        slug: "venetian-plaster",
        term: "Venetian Plaster",
        definition:
            "Venetian plaster is a wall finish made from slaked lime and marble dust, troweled on in thin layers and burnished to a polished sheen. The finished wall looks like stone, with depth and movement paint cannot imitate. It takes many steps and a skilled hand, which is why it costs more than other finishes.",
        link: "/venetian-plaster",
    },
    {
        slug: "washable-flat",
        term: "Washable Flat",
        definition:
            "Washable flat is a flat, no-shine paint finish that can be wiped clean without leaving marks. It gives you the soft look and flaw-hiding of flat paint without the usual problem of stains that will not come off. It is a good choice for living rooms, halls, and large walls in busy homes.",
        link: "/interior-painting",
    },
    {
        slug: "wax",
        term: "Wax",
        definition:
            "Wax is a protective top coat rubbed into plaster, Tadelakt, or wood and buffed to a soft sheen. It adds a little water resistance and deepens the color. On Venetian plaster, wax brings up the polish and makes the wall easier to wipe. It may need a fresh coat from time to time.",
        link: "/venetian-plaster",
    },
];
