/* ============================================================
   South Coast — Custom-finish catalog.

   Same shape and same rules as the service catalog in
   ./services.ts (read the POSITIONING and COPY RULE notes there).

   - Custom finishes are the specialty. Antonio lays every plaster
     wall himself.
   - Never invent prices, warranties, brands, or stats. Relative
     cost ("costs less than Venetian plaster") is fine.
   - Answer the question in the FIRST sentence of every body
     paragraph and FAQ answer so it can be quoted directly.
   - Where a page reuses Antonio's portrait, the alt text describes
     the photo truthfully. It does not claim to show the finish.
   ============================================================ */

import type { ServiceDef } from "./services";

const ANTONIO_PHOTO = "/about/antonio-benitez.webp";
const ANTONIO_ALT =
    "Antonio Benitez of South Coast Quality Painting, in a company t-shirt, in front of a hand-troweled plaster wall";

export const FINISHES: ServiceDef[] = [
    /* ---------------------------------------------------------- */
    {
        slug: "lime-wash",
        label: "Lime Wash",
        name: "Lime Wash Walls & Exteriors",
        seoTitle: "Lime Wash Painters in Houston, TX",
        seoDescription:
            "Hand-brushed lime wash for Houston walls, brick and stucco. A soft, chalky, old-world finish, sampled in your own light first. Call (713) 539-8069.",
        h1: "Lime Wash in Houston",
        lede: "Lime wash is a thin, mineral paint made from slaked lime that soaks into the wall and dries to a soft, cloudy finish no flat paint can copy.",
        body: [
            "Lime wash is a natural wall finish made from slaked lime, water, and mineral pigment. It is brushed on in thin coats. It does not sit on the wall like a film of paint. It soaks in and hardens as it dries, so the color has soft movement, lighter here and deeper there.",
            "It suits plaster, brick, stucco, and stone, inside or out. On a brick house it gives that worn, old-world look you see on homes in Memorial and the Villages. Inside, it turns a plain living room wall into something that changes all day as the light moves across it.",
            "The look comes from the hand. We brush each coat in loose, crossing strokes and let it dry before the next. Two to three coats is normal. The brush marks are part of the finish, so the person holding the brush matters.",
            "Antonio makes samples on a board in your room, in your light. You see the real color and movement before we start, and he reworks the sample until it is right. Then you get a written price.",
        ],
        includes: [
            "Interior walls, ceilings, and fireplace surrounds",
            "Exterior brick, stucco, and stone",
            "Wall prep and the right base coat for lime",
            "Two to three hand-brushed coats",
            "Custom color mixed and tested in your room",
            "Optional clear sealer for high-touch areas",
        ],
        edge: {
            title: "A plaster specialist holding the brush",
            text:
                "Lime wash looks simple, so a lot of painters treat it like paint. Then it dries streaky, chalky in the wrong spots, or flat and lifeless. Antonio is a certified plaster specialist who has worked with lime for years. He knows how lime behaves on each surface, how wet to keep the brush, and how to build movement without blotches.",
        },
        education: {
            title: "Lime wash: cost, craft, and care",
            paragraphs: [
                "Lime wash usually costs less than Venetian plaster, because it is brushed on in a few thin coats instead of troweled and burnished in many layers. It still costs more than standard paint. Each coat is laid by hand, and the wall needs the right base to take it.",
                "Lime wash is breathable. Moisture can pass through it instead of getting trapped behind it, which matters in Houston's damp air. Lime is also naturally alkaline, which helps it resist mildew.",
                "It is not as scrubbable as modern paint. A light rub can lift a little color, which is part of how it ages. Outside, expect to refresh it every several years. Inside, a clear sealer can help on walls that get touched a lot. For your own walls, talk to Antonio at a consultation and he will price your project in writing.",
            ],
        },
        faqs: [
            {
                q: "Is lime wash durable?",
                a: "Yes, on the right surface. Lime wash hardens as it cures and bonds into brick, stucco, and plaster, so it does not peel the way paint can. It does wear slowly, and that soft aging is part of its look. Outside in Houston, plan to refresh it every several years. Inside, it lasts much longer, and a sealer helps in busy areas.",
            },
            {
                q: "Can you lime wash over painted walls?",
                a: "Yes, with the right base coat. Lime wash needs a surface it can grip and soak into. Bare plaster, brick, and stucco take it directly. A painted wall needs a mineral primer first so the lime can bond. Antonio checks the wall at your consultation and tells you what it needs.",
            },
            {
                q: "What is the difference between lime wash and whitewash?",
                a: "Lime wash is a finished mineral coating made from slaked lime and pigment. Whitewash usually means watered-down paint, or a quick lime-and-chalk mix used on barns and fences. Lime wash cures into the wall and has deep, soft movement. Watered-down paint just sits on top and tends to look thin.",
            },
            {
                q: "Can lime wash go on brick outside?",
                a: "Yes, and it is one of the best uses for it. Lime wash lets brick breathe, so trapped moisture can escape instead of pushing the finish off. It softens the color of the brick without hiding its texture. The brick has to be clean and free of old sealers first, or the lime cannot soak in.",
            },
            {
                q: "Does lime wash look streaky?",
                a: "It should have movement, but it should not look blotchy. The soft, cloudy variation is the point of lime wash. Hard streaks and patches come from poor technique, like letting a wet edge dry or overloading the brush. We work wall by wall, keep a wet edge, and show you the look on a sample first.",
            },
            {
                q: "Can lime wash be removed later?",
                a: "Fresh lime wash can often be washed back with water and a stiff brush, especially in the first few weeks. Once it has fully cured, it is part of the surface and is much harder to take off. If you want to change the color later, you can usually just lime wash over it.",
            },
        ],
        image: ANTONIO_PHOTO,
        imageAlt: ANTONIO_ALT,
        related: ["roman-clay", "venetian-plaster", "suede-finish"],
        cardBlurb:
            "A soft, chalky mineral finish for walls, brick, and stucco. Brushed by hand, sampled in your light.",
    },

    /* ---------------------------------------------------------- */
    {
        slug: "roman-clay",
        label: "Roman Clay & Marmorino",
        name: "Roman Clay & Marmorino Plaster",
        seoTitle: "Roman Clay & Marmorino in Houston, TX",
        seoDescription:
            "Roman clay and Marmorino lime plaster, troweled by hand in Houston, TX. Soft matte stone walls, sampled in your own light first. Call (713) 539-8069.",
        h1: "Roman Clay & Marmorino in Houston",
        lede: "Roman clay and Marmorino are hand-troweled plasters that give a wall a soft, matte stone look, with more depth than paint and fewer steps than polished Venetian plaster.",
        body: [
            "Roman clay is a thin, troweled plaster that dries to a soft, matte finish with gentle, cloudy movement. Marmorino is a lime plaster with a coarser marble grain, so it reads more like real stone. Both are laid by hand with a steel trowel in thin layers.",
            "They sit between lime wash and polished Venetian plaster. Lime wash is brushed and very soft. Venetian plaster is burnished to a high sheen. Roman clay and Marmorino give you that hand-troweled depth with a calmer, matte surface. Marmorino can also be pressed to a soft satin glow.",
            "They work well on living room walls, dining rooms, primary bedrooms, stair halls, and range hoods. In a large room with tall ceilings, the subtle movement keeps a big plain wall from feeling flat.",
            "Antonio lays every plaster wall himself. He makes samples in the room's own light and reworks them until you approve. Then you get a written price.",
        ],
        includes: [
            "Roman clay for a soft, matte, cloudy wall",
            "Marmorino for a fine stone texture",
            "Feature walls, whole rooms, and range hoods",
            "Wall repair and skim coat where needed",
            "Custom color tinted and sampled in your room",
            "Sealer or wax where the room calls for it",
        ],
        edge: {
            title: "One pair of hands on every wall",
            text:
                "Troweled plaster shows the hand that laid it. If three people work one wall, you can see where one stopped and the next started. Antonio lays every plaster wall himself, start to finish, so the movement stays even across the room. That is the difference between a wall that looks like stone and one that looks patched.",
        },
        education: {
            title: "Roman clay vs. Marmorino vs. Venetian plaster",
            paragraphs: [
                "All three are troweled by hand. The difference is the grain and the finish. Roman clay is very fine and stays matte. Marmorino has a coarser marble aggregate and a stone texture. Venetian plaster is the finest of all and is burnished between coats to a polished, marble-like sheen.",
                "Roman clay and Marmorino usually cost less than polished Venetian plaster, because there are fewer coats and less burnishing. They still cost more than paint or lime wash, since every layer is troweled by hand.",
                "Care is simple. Dust them, and wipe marks with a soft damp cloth. Skip harsh cleaners. In a busy hallway or a kitchen, a sealer or wax adds protection. Talk to Antonio at a consultation about the cost for your rooms.",
            ],
        },
        faqs: [
            {
                q: "What is Roman clay?",
                a: "Roman clay is a thin, hand-troweled plaster that dries to a soft, matte finish with gentle movement. It looks like a cross between lime wash and Venetian plaster. It goes on in a few thin layers with a steel trowel, so the wall has real depth without the high polish of burnished Venetian plaster.",
            },
            {
                q: "What is Marmorino plaster?",
                a: "Marmorino is a lime plaster made with crushed marble that gives a wall a fine stone texture. It is troweled on by hand and can be left matte or pressed to a soft satin. It has a coarser grain than polished Venetian plaster, so it looks more like carved stone than polished marble.",
            },
            {
                q: "Is Roman clay the same as Venetian plaster?",
                a: "No. Both are troweled by hand, but they finish differently. Venetian plaster is burnished between coats to a smooth, polished sheen. Roman clay stays matte and soft, with fewer coats and no high polish. Roman clay usually costs less and goes faster. Antonio can make samples of both so you can compare them in your room.",
            },
            {
                q: "Can Roman clay go in a bathroom?",
                a: "Yes, on walls that do not get soaked. Roman clay is fine in a powder room or on bathroom walls away from the shower, ideally with a sealer. It is not made for direct water. For the inside of a shower or around a tub, we use Tadelakt, which is built to handle water.",
            },
            {
                q: "How long does Roman clay take to apply?",
                a: "Most single feature walls take one to two days, plus drying time between coats. A whole room takes longer, depending on the size and how much prep the walls need. Antonio gives you the schedule up front, after he has seen the space and made your samples.",
            },
            {
                q: "Can you apply Roman clay over a textured wall?",
                a: "Yes, but the texture has to come off first. Roman clay is thin, so any bump or orange-peel texture underneath will show through. We skim the wall flat, prime it, and then lay the clay. That prep is a big part of why the finished wall looks like smooth stone.",
            },
        ],
        image: ANTONIO_PHOTO,
        imageAlt: ANTONIO_ALT,
        related: ["venetian-plaster", "lime-wash", "tadelakt"],
        cardBlurb:
            "Soft, matte stone walls troweled by hand. Roman clay for calm, Marmorino for a fine stone grain.",
    },

    /* ---------------------------------------------------------- */
    {
        slug: "tadelakt",
        label: "Tadelakt",
        name: "Tadelakt Waterproof Lime Plaster",
        seoTitle: "Tadelakt Showers & Baths in Houston, TX",
        seoDescription:
            "Tadelakt lime plaster for showers, tubs, and baths in Houston, TX. Seamless, water-resistant, no grout lines, laid by hand. Call (713) 539-8069.",
        h1: "Tadelakt in Houston",
        lede: "Tadelakt is a Moroccan lime plaster that is polished with stones and sealed with soap, so it can line a shower or tub with one seamless surface and no grout.",
        body: [
            "Tadelakt is a water-resistant lime plaster that comes from Morocco, where it has lined baths for centuries. It is troweled on, then compressed and polished by hand with smooth stones. While it is still damp, it is rubbed with black olive soap. The soap reacts with the lime and helps seal the surface against water.",
            "The result is one smooth, soft-sheen surface with no grout lines. There is nothing to crack, stain, or grow mildew between tiles. It can curve around a niche, a bench, or the edge of a tub without a single seam.",
            "Tadelakt is slow, careful work. Each section has to be compressed at just the right moment as it firms up. Rush it or wait too long and it will not seal. That is why, as a Tadelakt installer in Houston, Antonio lays every Tadelakt wall himself.",
            "He makes samples in your color first, so you can see the sheen and movement in your bathroom's own light. Once you approve, you get a written price.",
        ],
        includes: [
            "Walk-in showers and shower walls",
            "Tub surrounds and bath alcoves",
            "Niches, benches, and curved edges",
            "Powder room and vanity walls",
            "Waterproof backing prepared underneath",
            "Polished with stones and sealed with black soap",
        ],
        edge: {
            title: "The timing lives in the hand",
            text:
                "Tadelakt is not forgiving. The plaster has to be polished at the exact moment it firms up, and the soap has to go on while it is still damp. Miss the window and the wall will not resist water. Antonio is a certified plaster specialist and lays every Tadelakt wall himself, because this is not a job you learn on a customer's shower.",
        },
        education: {
            title: "What Tadelakt costs, and how to care for it",
            paragraphs: [
                "Tadelakt usually costs more than a standard tile shower. It takes several days of skilled hand work, with stone polishing and soaping between steps. You are paying for the time and the hand, not just the material. The size of the shower, the curves, and the backing all change the cost, so talk to Antonio about your project at a consultation.",
                "Care is simple but specific. Clean it with a mild, natural soap, like black soap. Avoid harsh acids, bleach, and scouring pads, because they break down the lime and the soap layer.",
                "Every so often, a fresh rub of black soap or a natural wax keeps the surface sealed. Small marks can often be polished out. Tadelakt can last for decades when it is cared for.",
            ],
        },
        faqs: [
            {
                q: "Is Tadelakt really waterproof?",
                a: "Yes, it is water-resistant enough to line a shower. Tadelakt is lime plaster that is compressed hard with stones and sealed with black olive soap. The soap reacts with the lime to help shed water. It is seamless, so there is no grout to crack or grow mildew. It still needs a proper waterproof backing behind it.",
            },
            {
                q: "Can Tadelakt be used in a shower?",
                a: "Yes. Showers and tub surrounds are what Tadelakt was made for. It can cover walls, curve into niches, and wrap a bench with one smooth surface. Shower floors take extra care and a very solid base, so Antonio will look at your space and tell you honestly where it fits best.",
            },
            {
                q: "How do you clean Tadelakt?",
                a: "Clean Tadelakt with a soft cloth and a mild natural soap, like black soap. Rinse and let it dry. Do not use bleach, vinegar, acid cleaners, or scouring pads. They eat into the lime and strip the soap layer that protects it. A light coat of black soap or wax now and then keeps it sealed.",
            },
            {
                q: "Does Tadelakt crack?",
                a: "Fine hairline cracks can happen, as with any plaster, but they are rare when the base is solid. Most cracks come from a wall that moves or a backing that was not built right. We prepare a stable, waterproof base before any plaster goes on. Small marks can often be polished out later.",
            },
            {
                q: "How long does Tadelakt last?",
                a: "Tadelakt can last for decades when it is laid well and cared for. Lime keeps hardening as it ages, so the surface gets tougher over time. The main thing is gentle cleaning and a fresh rub of soap or wax every so often. Harsh cleaners are what wear it out early.",
            },
            {
                q: "Is Tadelakt better than tile?",
                a: "It depends on what you want. Tadelakt gives you one seamless, soft-sheen surface with no grout lines to clean, crack, or grow mildew. Tile is harder and takes more abuse. Tadelakt needs gentler cleaning and usually costs more, because it is all hand work. Many people choose it for the look and the calm of no grout.",
            },
            {
                q: "What is black soap for Tadelakt?",
                a: "Black soap is a soft soap made from olive oil, used to seal Tadelakt. It is rubbed into the plaster while it is still damp. The soap reacts with the lime and forms a water-shedding layer. It is also what you use to clean and refresh Tadelakt later, so the same product protects it for life.",
            },
        ],
        image: ANTONIO_PHOTO,
        imageAlt: ANTONIO_ALT,
        related: ["venetian-plaster", "microcement", "roman-clay"],
        cardBlurb:
            "Seamless, water-resistant lime plaster for showers and baths. No grout lines. Polished by hand.",
    },

    /* ---------------------------------------------------------- */
    {
        slug: "microcement",
        label: "Microcement",
        name: "Microcement Walls, Floors & Counters",
        seoTitle: "Microcement in Houston, TX",
        seoDescription:
            "Hand-troweled microcement for Houston walls, floors, counters, and showers. A seamless, modern concrete look, sampled in your light. Call (713) 539-8069.",
        h1: "Microcement in Houston",
        lede: "Microcement is a thin, cement-based coating troweled by hand over walls, floors, and counters to give a seamless, modern concrete look without pouring concrete.",
        body: [
            "Microcement is a cement-based coating applied in very thin layers, usually just a few millimeters thick. It is troweled by hand and then sealed. It gives a smooth, seamless concrete look on walls, floors, counters, stairs, and showers.",
            "Because it is so thin, it can often go over existing tile, concrete, or drywall without demolition. That makes it a good fit for a kitchen backsplash, a fireplace, or a bathroom remodel where tearing everything out is not worth the mess.",
            "The look depends on the hand. Each layer is troweled, sanded, and built up. The trowel marks give soft movement, so it reads like real stone or concrete instead of a flat coat of paint.",
            "The sealer is what makes it last. On floors, counters, and showers we use a sealer system matched to how hard the surface will work. Antonio makes samples in your room first, then you get a written price.",
        ],
        includes: [
            "Walls, feature walls, and fireplaces",
            "Kitchen backsplashes and counters",
            "Floors and stairs",
            "Shower walls and bathroom surfaces",
            "Over existing tile or concrete in many cases",
            "Sealer system matched to the surface",
        ],
        edge: {
            title: "Laid like plaster, not rolled like paint",
            text:
                "Microcement fails when it is treated like paint: rolled on, rushed, and under-sealed. Antonio is a certified plaster specialist and lays it the way plaster should be laid, layer by layer, with sanding between coats. He picks the sealer for the job, because a counter and a feature wall do not need the same protection.",
        },
        education: {
            title: "Microcement: cost, prep, and care",
            paragraphs: [
                "Microcement is often less disruptive than tearing out tile or pouring new concrete, since it can go over many existing surfaces. It is still skilled hand work, with several coats, sanding between them, and a sealer system on top. The price depends on the area, the surface, and how much prep it needs. Talk to Antonio at a consultation and he will price your project in writing.",
                "The base has to be solid. Loose tile, cracked slabs, or flexing floors will show through. We check and fix the base before we start.",
                "To care for it, clean with a pH-neutral cleaner and a soft mop or cloth. Avoid harsh acids and abrasive pads. On floors and counters, the top sealer may need refreshing over the years, depending on traffic.",
            ],
        },
        faqs: [
            {
                q: "How long does microcement last?",
                a: "Microcement can last many years when the base is solid and the sealer is right. Walls hold up best, since they see little wear. Floors and counters take more abuse, so the top sealer may need refreshing over time. Most failures come from poor prep or thin sealing, not the material itself.",
            },
            {
                q: "Can microcement go over tile?",
                a: "Yes, in many cases. If the tile is solid and firmly bonded, we can fill the grout lines, prime it, and lay microcement over the top. Loose or cracked tile has to be fixed or removed first, or the problem will show through. Antonio checks the surface at your consultation.",
            },
            {
                q: "Is microcement waterproof?",
                a: "Microcement is water-resistant once it is properly sealed, which is why it can line showers and wet rooms. The sealer does the waterproofing work, so it has to be the right one and laid with care. In a shower, we also make sure the wall behind it is waterproofed.",
            },
            {
                q: "Does microcement crack?",
                a: "It can, if the surface under it moves or cracks. Microcement is very thin, so it follows whatever it sits on. A solid, stable base keeps it from cracking. We check for movement, repair cracks, and use a reinforcing layer where it makes sense before any finish coats go on.",
            },
            {
                q: "Can you use microcement on kitchen counters?",
                a: "Yes. Microcement makes a seamless counter with a soft concrete look. It needs a strong sealer to stand up to spills, heat, and cutting. Use cutting boards and trivets, and wipe up acids like lemon and wine quickly. With that care, a sealed microcement counter holds up well.",
            },
            {
                q: "What is the difference between microcement and Venetian plaster?",
                a: "Microcement is cement-based and Venetian plaster is lime-based. Microcement gives a modern, concrete look and can go on floors and counters. Venetian plaster is burnished to a polished, marble-like sheen and is mostly for walls and ceilings. Antonio can make samples of both so you can compare them in your room.",
            },
        ],
        image: "/services/microcement.webp",
        imageAlt: "Hand-applied microcement backsplash and counter in a Houston kitchen",
        related: ["tadelakt", "venetian-plaster", "roman-clay"],
        cardBlurb:
            "A seamless, modern concrete look for walls, floors, counters, and showers. Troweled by hand.",
    },

    /* ---------------------------------------------------------- */
    {
        slug: "liquid-metal",
        label: "Liquid Metal",
        name: "Liquid Metal & Metallic Finishes",
        seoTitle: "Liquid Metal Finishes in Houston, TX",
        seoDescription:
            "Liquid metal and metallic finishes for Houston ceilings, doors, and hoods. Real metal you can patina or polish, applied by hand. Call (713) 539-8069.",
        h1: "Liquid Metal in Houston",
        lede: "Liquid metal is a coating made with real metal powder, like bronze, copper, or iron, that can be polished to a shine or aged to a natural patina on almost any surface.",
        body: [
            "Liquid metal is a coating that holds real metal powder in a binder, so the finished surface is actual metal, not metallic-colored paint. It can be bronze, copper, brass, iron, or other metals. Once it cures, it can be sanded and polished, or treated so it ages to a natural patina.",
            "It lets you put a metal surface where solid metal would be too heavy or too costly. Range hoods, front doors, ceilings, columns, mantels, light fixtures, and trim are common uses. A plain ceiling in a dining room can look like hammered silver or old bronze.",
            "We also do metallic paints and metallic glazes. They are lighter and simpler than liquid metal, with a shimmer rather than solid metal. They are a good fit for ceilings, niches, and accent walls.",
            "Antonio makes samples on your actual surface or a board in your room. You see the metal, the shine, and the patina before we start. Then you get a written price.",
        ],
        includes: [
            "Liquid metal in bronze, copper, brass, iron, and more",
            "Polished, brushed, or aged patina finishes",
            "Range hoods, doors, mantels, and columns",
            "Ceilings and accent walls",
            "Metallic paint and metallic glaze options",
            "Clear sealer to lock in the finish",
        ],
        edge: {
            title: "Patina you can control",
            text:
                "A real patina is a chemical reaction. Push it too far and it turns muddy. Stop too soon and it looks unfinished. Antonio tests the metal and the patina on samples first, then sets the color where you want it and seals it so it stays there. You approve the sample before any metal goes on your surface.",
        },
        education: {
            title: "Liquid metal vs. metallic paint",
            paragraphs: [
                "Liquid metal contains real metal. It can be sanded, polished, and patinated like solid metal. Metallic paint uses pigment that shimmers like metal but cannot be polished or aged.",
                "Liquid metal costs more than metallic paint, because the material is real metal and the work takes more steps: coats, sanding, polishing, and patina. Metallic paint and glaze are the more flexible choice when you want shimmer without the full metal effect. Talk to Antonio at a consultation about which fits your project.",
                "Care depends on the finish. A sealed metal surface just needs a soft, damp cloth. Unsealed patina keeps changing over time, which some people love on purpose.",
            ],
        },
        faqs: [
            {
                q: "What is liquid metal?",
                a: "Liquid metal is a coating made from real metal powder mixed into a binder. It is applied to a surface like paint or plaster, then sanded and polished once it cures. The finished surface is actual metal, so it looks and feels like bronze, copper, brass, or iron, and can be aged to a patina.",
            },
            {
                q: "Can liquid metal go outside?",
                a: "Often, yes, with the right system and sealer. Front doors, light fixtures, and trim are common outdoor uses. Houston sun, rain, and humidity are hard on any finish, and some metals will keep aging outdoors. Antonio will tell you which metals and sealers suit your spot, and where it is better kept inside.",
            },
            {
                q: "Will liquid metal rust or turn green?",
                a: "It can, if you want it to, or it can be sealed so it stays as it is. Iron-based finishes can be rusted on purpose, and copper and bronze can be turned green or brown. Once the color is where you like it, a clear sealer slows or stops further change.",
            },
            {
                q: "What can liquid metal be applied to?",
                a: "Liquid metal can go on most solid, primed surfaces. That includes wood, drywall, plaster, MDF, metal, and many plastics. Common uses are range hoods, doors, ceilings, columns, mantels, furniture, and trim. The surface has to be clean and properly primed so the metal coating can bond.",
            },
            {
                q: "Is liquid metal the same as metallic paint?",
                a: "No. Liquid metal contains real metal and can be polished or aged like solid metal. Metallic paint uses shimmering pigment that looks metallic but stays a paint. Metallic paint costs less and goes faster. Liquid metal gives the real weight and depth of metal. We do both.",
            },
            {
                q: "How do you clean a liquid metal finish?",
                a: "Wipe it with a soft, damp cloth and dry it. Skip abrasive pads and harsh chemicals, which can scratch the metal or strip the sealer. A sealed finish needs very little care. An unsealed patina will keep changing slowly, so only use cleaners Antonio recommends for that finish.",
            },
        ],
        image: ANTONIO_PHOTO,
        imageAlt: ANTONIO_ALT,
        related: ["custom-finish-matching", "venetian-plaster", "suede-finish"],
        cardBlurb:
            "Real bronze, copper, and iron coatings for hoods, doors, and ceilings. Polished or aged to a patina.",
    },

    /* ---------------------------------------------------------- */
    {
        slug: "suede-finish",
        label: "Suede Finish",
        name: "Suede & Soft-Texture Wall Finishes",
        seoTitle: "Suede Finish Walls in Houston, TX",
        seoDescription:
            "Suede finish walls for Houston homes. A soft, brushed texture like real suede, made by hand in crossing strokes and sampled first. Call (713) 539-8069.",
        h1: "Suede Finish Walls in Houston",
        lede: "A suede finish is a hand-brushed wall finish with a soft, two-tone texture that looks like brushed suede and warms up a room without the cost of plaster.",
        body: [
            "A suede finish is a decorative paint finish brushed on in crossing strokes so the wall looks soft and slightly textured, like brushed suede. The color shifts gently from light to dark as you move past it. It feels warm, quiet, and calm.",
            "It works well in studies, libraries, dining rooms, media rooms, and primary bedrooms. In a paneled study or a dark-toned dining room, it adds depth that flat paint cannot.",
            "It is a budget-friendly choice next to plaster. You get a hand-made, layered wall with real movement, in less time and at a lower cost than troweled plaster.",
            "As with every custom finish, Antonio makes samples in your room first. You approve the color and texture in your own light before we start, and you get a written price.",
        ],
        includes: [
            "Soft, two-tone suede texture",
            "Studies, dining rooms, bedrooms, and media rooms",
            "Accent walls or whole rooms",
            "Wall repair and base coat before finishing",
            "Custom color sampled in your room",
            "Matches to existing suede or faux walls",
        ],
        edge: {
            title: "Even texture, wall to wall",
            text:
                "A suede finish lives or dies on the strokes. Uneven pressure or a dried edge leaves patches and lap marks you can see from across the room. We work one wall at a time with a wet edge and the same stroke pattern from corner to corner, so the texture stays even across the whole room.",
        },
        faqs: [
            {
                q: "What is a suede finish on walls?",
                a: "A suede finish is a decorative paint finish that looks and feels like brushed suede. It is brushed on by hand in crossing strokes, which leaves a soft, two-tone texture. The color shifts gently as the light moves, which makes the wall feel warm and deep instead of flat.",
            },
            {
                q: "Is a suede finish out of style?",
                a: "Not when it is done subtly. The heavy, sponged faux finishes of past decades look dated. A soft suede finish in a calm, tonal color still works well in studies, libraries, and dining rooms. We keep the contrast gentle and the color close, so it reads as warmth rather than a trend.",
            },
            {
                q: "Can you paint over a suede finish?",
                a: "Yes. A suede finish can be painted over once it is clean and primed. The texture is light, so a primer and two coats of paint will usually cover it. If you want a perfectly smooth wall, we can sand it or skim it first. Antonio will check the wall and tell you.",
            },
            {
                q: "Is a suede finish cheaper than Venetian plaster?",
                a: "Yes. A suede finish usually costs much less than Venetian plaster. It is brushed rather than troweled and burnished in many layers, so it goes faster. It is a good choice when you want a hand-made, layered wall without the full cost of plaster. Talk to Antonio at a consultation for a price on your rooms.",
            },
            {
                q: "Can you match an existing suede wall?",
                a: "Yes. Matching an old suede or faux finish is common after a repair or a remodel. Antonio studies the color, the stroke, and the texture, then makes samples until the new section blends with the old. You approve the match before we touch the wall.",
            },
            {
                q: "How do you clean a suede finish wall?",
                a: "Dust it, and wipe light marks with a soft, damp cloth. Do not scrub hard or use harsh cleaners, since that can change the sheen. In a busy room, a clear protective coat makes it easier to clean. Ask us at your consultation if that suits your space.",
            },
        ],
        image: ANTONIO_PHOTO,
        imageAlt: ANTONIO_ALT,
        related: ["lime-wash", "custom-finish-matching", "interior-painting"],
        cardBlurb:
            "A soft, brushed texture like real suede. Warm, quiet walls without the cost of plaster.",
    },

    /* ---------------------------------------------------------- */
    {
        slug: "custom-finish-matching",
        label: "Custom Finish Matching",
        name: "Custom Finish Matching & Repair",
        seoTitle: "Custom Finish Matching in Houston, TX",
        seoDescription:
            "We match any wall finish in Houston: plaster, faux, glaze, or metallic. After water damage, a remodel, or from a photo. Call (713) 539-8069.",
        h1: "Custom Finish Matching in Houston",
        lede: "If you have a finish you love and need more of it, or a section that was damaged, we match it. Antonio makes samples until the new work blends with the old.",
        body: [
            "Custom finish matching means recreating an existing wall or ceiling finish so new work blends with the old. That might be Venetian plaster, a glaze, a faux finish, a metallic, a lime wash, or a hand-rubbed stain. The goal is simple: you should not be able to tell where the repair begins.",
            "Most matching jobs start with a problem. A pipe leaks and a plastered wall has to be cut open. An addition needs to look like the original house. A remodel moves a wall. The painter who did the first finish is long gone, and no one wrote down how it was made.",
            "We can also match a finish from a photo, a magazine page, a sample board, or a room you saw somewhere else. Antonio studies the color, the layers, the sheen, and the tool marks. Then he makes samples, and reworks them, until the match is right.",
            "Antonio has painted Houston homes since 1999, including more than 2,000 custom homes for Kickerillo Companies. He has seen nearly every finish these houses were built with. You approve the sample first. Then you get a written price.",
        ],
        includes: [
            "Repairs after water damage or plumbing leaks",
            "Matching new additions to the original house",
            "Blending patches after a renovation",
            "Matching a finish from a photo or sample board",
            "Plaster, faux, glaze, metallic, and lime finishes",
            "Samples made until the match is right",
        ],
        edge: {
            title: "Houston finishes since 1999",
            text:
                "Matching is detective work. You have to read how a finish was built, layer by layer, and then rebuild it. Antonio has painted Houston homes since 1999, including more than 2,000 custom homes for Kickerillo Companies, and he is a certified plaster specialist. Few people have worked on more of the finishes in these houses.",
        },
        education: {
            title: "How we match a finish",
            paragraphs: [
                "First, Antonio looks closely at the existing finish in its own light. He reads the base color, the layers on top, the sheen, and the tool marks: trowel, brush, rag, or sponge. Then he works out the order they went on.",
                "Next, he makes samples on boards and holds them against the original at different times of day. He adjusts the color and technique and makes another, until the sample disappears against the wall. You approve the match before work starts.",
                "Sometimes a perfect blend on one small patch is not possible, because the old finish has aged or faded. When that happens, he will tell you honestly, and may suggest finishing a full wall or a natural break so the change cannot be seen.",
            ],
        },
        faqs: [
            {
                q: "Can you match my existing Venetian plaster?",
                a: "Yes. Antonio is a certified plaster specialist, and matching Venetian plaster is work he does often. He studies the color, the layers, and the polish, then makes samples until the new plaster blends with the old. Aged plaster can be hard to blend in a small patch, so sometimes we finish to a corner or natural break.",
            },
            {
                q: "Can you repair a faux finish after water damage?",
                a: "Yes. After the drywall or plaster is repaired, we rebuild the faux finish layer by layer to match what is around it. Antonio makes samples first and checks them against the original wall in its own light. You approve the match before we start on the wall.",
            },
            {
                q: "Can you match a finish from a photo?",
                a: "Yes, very often. A clear photo shows us the color, the movement, and the sheen we are aiming for. Photos can shift color, so Antonio makes physical samples and shows them to you in your room. He reworks them until they match what you had in mind.",
            },
            {
                q: "Can you match the finish in my new addition to the original house?",
                a: "Yes. That is one of the most common matching jobs we do. We study the original walls and trim, recreate the finish on samples, and check them side by side. The goal is for the new rooms to look like they were always part of the house.",
            },
            {
                q: "What finishes can you match?",
                a: "Nearly any decorative wall or ceiling finish. That includes Venetian plaster, Marmorino, lime wash, Roman clay, glazes, faux finishes, suede, metallics, liquid metal, and stained wood. If we have not seen your exact finish before, Antonio works it out on samples first before he touches your wall.",
            },
            {
                q: "What if the new section does not match exactly?",
                a: "You approve the sample before we start, so there should be no surprises. Old finishes can fade or age unevenly, which makes a tiny patch hard to hide. If that is the case, Antonio will tell you up front and suggest finishing to a corner or full wall so the change cannot be seen.",
            },
        ],
        image: ANTONIO_PHOTO,
        imageAlt: ANTONIO_ALT,
        related: ["venetian-plaster", "liquid-metal", "wood-staining"],
        cardBlurb:
            "Water damage, an addition, or a photo you love. We match any finish, sampled until it blends.",
    },
];

/* ---------------------------------------------------------- */

export const getFinish = (slug: string): ServiceDef | undefined =>
    FINISHES.find((f) => f.slug === slug);
