/* ============================================================
   South Coast — Service area catalog.

   Target market: high-value Houston-area neighborhoods (roughly
   $1M+ housing stock) pulled from the client's own ad-targeting
   ZIP list. Every ZIP in that list belongs to exactly one area
   below, so the whole footprint is covered by a real page with
   real content rather than a thin doorway page per ZIP.

   Each area page needs to say something TRUE and SPECIFIC about
   the housing there — that is what keeps it out of doorway-page
   territory and what makes it useful to a reader.

   COPY RULE: plain English, short sentences. Premium, calm,
   never salesy. Same voice as src/lib/services.ts.
   ============================================================ */

export interface AreaDef {
    /** URL slug — the page lives at /painting/{slug} */
    slug: string;
    /** Display name */
    name: string;
    /** Short name used inline in sentences */
    shortName: string;
    /** ZIP codes covered */
    zips: string[];
    /** Named neighborhoods / subdivisions inside this area */
    neighborhoods: string[];
    /** <title> tag */
    seoTitle: string;
    /** <meta name="description"> */
    seoDescription: string;
    /** Page H1 */
    h1: string;
    /** Two or three paragraphs about the homes here */
    body: string[];
    /** What we get asked for most in this area */
    focus: string[];
    /** Slugs of nearby areas for internal linking */
    nearby: string[];
}

export const AREAS: AreaDef[] = [
    {
        slug: "river-oaks",
        name: "River Oaks",
        shortName: "River Oaks",
        zips: ["77019", "77027"],
        neighborhoods: ["River Oaks", "Highland Village", "Afton Oaks", "Avalon Place", "Neartown"],
        seoTitle: "Painters in River Oaks, Houston TX",
        seoDescription:
            "Painting, cabinet refinishing and hand-laid Venetian plaster in River Oaks, Houston (77019, 77027). Call (713) 539-8069.",
        h1: "Painting & Plaster in River Oaks",
        body: [
            "River Oaks homes were built to a standard, and most of them have been added to and reworked more than once since. Deep crown molding, paneled libraries, tall stair halls, and plaster walls that were never drywall to begin with. Work like that shows every shortcut.",
            "This is the part of Houston where we do the most plaster. Antonio lays Venetian plaster and Tadelakt by hand here, and he matches samples to the room and its light before anything goes on a wall. He also repaints interiors, refinishes cabinetry, and restains front doors and panelling.",
            "We work slowly and we keep the site clean. If your home is occupied or staffed, we schedule around you.",
        ],
        focus: [
            "Hand-laid Venetian plaster and Tadelakt",
            "Interior repaints with deep trim and molding",
            "Paneled rooms, libraries, and stair halls",
            "Cabinetry refinishing and front-door staining",
        ],
        nearby: ["tanglewood-uptown", "montrose-upper-kirby", "memorial"],
    },
    {
        slug: "memorial",
        name: "Memorial & the Villages",
        shortName: "Memorial",
        zips: ["77024", "77079"],
        neighborhoods: [
            "Memorial",
            "Hunters Creek Village",
            "Bunker Hill Village",
            "Piney Point Village",
            "Nottingham Forest",
            "Memorial West",
        ],
        seoTitle: "Painters in Memorial, Houston TX",
        seoDescription:
            "Interior and exterior painting, cabinet refinishing and Venetian plaster in Memorial and Hunters Creek (77024, 77079). Call (713) 539-8069.",
        h1: "Painting & Plaster in Memorial",
        body: [
            "Memorial and the Villages are full of large wooded lots and homes from the 1960s through today, sitting side by side. A mid-century ranch that has been opened up and extended needs a different approach from a new build two doors down.",
            "Under those trees, exteriors take a beating. Shade holds damp against siding and trim, and that is where paint fails first. We wash, scrape, repair the rot, and caulk every gap before priming, because water getting behind the paint is what ends most exterior jobs here.",
            "Inside, we repaint, refinish kitchen cabinetry, and lay plaster feature walls. Antonio makes samples on your own wall so you can see them under your own light.",
        ],
        focus: [
            "Exterior painting with proper rot repair and caulking",
            "Whole-home interior repaints",
            "Kitchen cabinet refinishing",
            "Venetian plaster feature walls and fireplaces",
        ],
        nearby: ["river-oaks", "energy-corridor", "spring-branch"],
    },
    {
        slug: "west-university-place",
        name: "West University Place & Southside",
        shortName: "West U",
        zips: ["77005", "77030"],
        neighborhoods: [
            "West University Place",
            "Rice Village",
            "Southside Place",
            "Texas Medical Center",
            "Southgate",
        ],
        seoTitle: "Painters in West University Place, Houston TX",
        seoDescription:
            "Interior painting, cabinet refinishing, wood staining and Venetian plaster in West University Place and Southside (77005, 77030). Call (713) 539-8069.",
        h1: "Painting & Plaster in West University Place",
        body: [
            "West U is tight lots and tall houses. Most of the older bungalows have been replaced or built well up, so you get narrow stair halls, high ceilings, and a lot of painted trim in a small footprint. Cut lines are very visible in a house like that.",
            "We do a lot of interior repaints and cabinet work here, plus front doors and stair rails that need restaining rather than painting. Our washable flat finish is popular in West U hallways and children's rooms, because it keeps the soft matte look without marking the first time someone runs a hand along the wall.",
            "Because houses sit close together here, we are careful about noise, parking, and keeping the street clean.",
        ],
        focus: [
            "Interior repaints with a lot of painted trim",
            "Washable flat finish for halls and kids' rooms",
            "Kitchen and bath cabinet refinishing",
            "Front doors and stair rails restained",
        ],
        nearby: ["bellaire", "meyerland-braeswood", "montrose-upper-kirby"],
    },
    {
        slug: "tanglewood-uptown",
        name: "Tanglewood & Uptown",
        shortName: "Tanglewood",
        zips: ["77056", "77057"],
        neighborhoods: ["Tanglewood", "Uptown", "Galleria", "Briargrove", "Post Oak"],
        seoTitle: "Painters in Tanglewood & Uptown, Houston TX",
        seoDescription:
            "Painting, cabinet refinishing and hand-applied Venetian plaster in Tanglewood, Uptown and Briargrove (77056, 77057). Call (713) 539-8069.",
        h1: "Painting & Plaster in Tanglewood",
        body: [
            "Tanglewood mixes established homes on generous lots with newer builds and a lot of high-rise living around Uptown. We work in both — a whole house on a quiet street, and single rooms in a tower where access and building rules matter as much as the finish.",
            "In condos and high-rises, plaster is often the reason people call. A Venetian plaster or microcement wall does something in a low-ceilinged room that paint cannot, and it does not need the wall depth that panelling would.",
            "We handle building COIs, service elevators, and restricted work hours without fuss.",
        ],
        focus: [
            "Venetian plaster and microcement feature walls",
            "High-rise and condo interiors",
            "Interior repaints and cabinetry",
            "Work scheduled around building rules",
        ],
        nearby: ["river-oaks", "memorial", "montrose-upper-kirby"],
    },
    {
        slug: "bellaire",
        name: "Bellaire",
        shortName: "Bellaire",
        zips: ["77401"],
        neighborhoods: ["Bellaire", "Braeburn", "Bellaire Southdale"],
        seoTitle: "Painters in Bellaire, TX",
        seoDescription:
            "Interior and exterior painting, cabinet refinishing and wood staining in Bellaire, TX (77401). You approve the color before we start. Call (713) 539-8069.",
        h1: "Painting & Plaster in Bellaire",
        body: [
            "Bellaire has been rebuilding itself lot by lot for years. You get 1950s ranches next to large new builds, which means we are just as likely to be matching original trim profiles as finishing a brand-new kitchen.",
            "Cabinet refinishing is our most requested job in Bellaire. A lot of the kitchens here are sound but dated, and refinishing gets you a new-looking kitchen for a fraction of replacing it. We seal the cabinet seams before finishing, which is why ours do not split along the joins a year later.",
            "One of our published reviews is a Bellaire cabinet job.",
        ],
        focus: [
            "Kitchen cabinet painting and refinishing",
            "Interior repaints for older ranch homes",
            "Exterior painting, siding and trim",
            "Wood staining for doors and built-ins",
        ],
        nearby: ["west-university-place", "meyerland-braeswood", "river-oaks"],
    },
    {
        slug: "the-woodlands",
        name: "The Woodlands",
        shortName: "The Woodlands",
        zips: ["77380", "77381", "77382", "77389"],
        neighborhoods: [
            "Carlton Woods",
            "Sterling Ridge",
            "Cochran's Crossing",
            "Panther Creek",
            "Grogan's Mill",
            "Creekside Park",
            "Augusta Pines",
        ],
        seoTitle: "Painters in The Woodlands, TX",
        seoDescription:
            "Painting, cabinet refinishing, wood staining and Venetian plaster in The Woodlands, TX (77380, 77381, 77382, 77389). Call (713) 539-8069.",
        h1: "Painting & Plaster in The Woodlands",
        body: [
            "The Woodlands is built into the trees, and that changes the work. Heavy shade keeps siding and trim damp long after the rain stops, so mildew and rot show up sooner here than in open subdivisions. Exteriors need proper washing, rot repair, and caulking, not just a fresh coat over the top.",
            "Inside, we see a lot of two-story entries, wood beams, and stained trim that has darkened unevenly with age. We restain rather than paint when the wood is worth keeping, and we test the color on your own wood before committing to it.",
            "In Carlton Woods and Sterling Ridge we do more plaster and lime wash work — feature walls, fireplaces, and range hoods.",
        ],
        focus: [
            "Exterior painting with rot repair for shaded lots",
            "Restaining beams, doors and stair rails",
            "Venetian plaster and lime wash feature walls",
            "Cabinet refinishing",
        ],
        nearby: ["spring-klein-tomball", "montgomery-magnolia", "kingwood"],
    },
    {
        slug: "sugar-land",
        name: "Sugar Land",
        shortName: "Sugar Land",
        zips: ["77478", "77479"],
        neighborhoods: [
            "Sweetwater",
            "First Colony",
            "Riverstone",
            "Avalon",
            "Telfair",
            "Greatwood",
        ],
        seoTitle: "Painters in Sugar Land, TX",
        seoDescription:
            "Interior and exterior painting, cabinet refinishing, wood staining and Venetian plaster in Sugar Land, TX (77478, 77479). Call (713) 539-8069.",
        h1: "Painting & Plaster in Sugar Land",
        body: [
            "Sugar Land is mostly master-planned, which means a lot of stucco and brick elevations built within a couple of decades of each other. Stucco is the thing to get right here. Painted with the wrong product it traps moisture, and the damage shows up inside the wall rather than on it.",
            "We patch stucco cracks first, then use a coating that lets the wall breathe. On the inside, we do whole-home repaints and a lot of cabinet refinishing, particularly in Sweetwater and First Colony where the kitchens are solid but dated.",
            "HOA color approvals are normal here. We are used to submitting colors and working to an approved palette.",
        ],
        focus: [
            "Stucco painting with breathable coatings",
            "Whole-home interior repaints",
            "Kitchen cabinet refinishing",
            "HOA color submissions handled",
        ],
        nearby: ["missouri-city", "fulshear-richmond", "katy-cinco-ranch"],
    },
    {
        slug: "katy-cinco-ranch",
        name: "Katy & Cinco Ranch",
        shortName: "Katy",
        zips: ["77450", "77494", "77094"],
        neighborhoods: [
            "Cinco Ranch",
            "Seven Meadows",
            "Grand Lakes",
            "Falcon Point",
            "Park Row",
            "Energy Corridor West",
        ],
        seoTitle: "Painters in Katy & Cinco Ranch, TX",
        seoDescription:
            "Interior and exterior painting, cabinet refinishing and wood staining in Katy and Cinco Ranch, TX (77450, 77494, 77094). Call (713) 539-8069.",
        h1: "Painting & Plaster in Katy",
        body: [
            "Katy and Cinco Ranch are open, sunny subdivisions, and that is hard on paint in a different way from the shaded parts of Houston. West-facing elevations and front doors take direct afternoon sun and fade years before the rest of the house does.",
            "We use exterior paint that holds its color, and on front doors we stain and then seal with a UV blocker, because a stained door on a west elevation here will go gray in a couple of seasons without one.",
            "Inside, most of our Katy work is whole-home repaints and kitchen cabinet refinishing, often when a family is about to sell or has just bought.",
        ],
        focus: [
            "Exterior painting that holds color in full sun",
            "Front doors stained and UV sealed",
            "Whole-home interior repaints",
            "Kitchen cabinet refinishing",
        ],
        nearby: ["fulshear-richmond", "energy-corridor", "sugar-land"],
    },
    {
        slug: "houston-heights",
        name: "The Heights & Garden Oaks",
        shortName: "The Heights",
        zips: ["77007", "77008", "77009", "77018"],
        neighborhoods: [
            "Houston Heights",
            "Woodland Heights",
            "Norhill",
            "Garden Oaks",
            "Oak Forest",
            "Rice Military",
            "Near Northside",
        ],
        seoTitle: "Painters in The Heights, Houston TX",
        seoDescription:
            "Painting, wood staining and cabinet refinishing in the Houston Heights, Woodland Heights, Garden Oaks and Oak Forest. Call (713) 539-8069.",
        h1: "Painting & Plaster in The Heights",
        body: [
            "The Heights is old wood, and old wood is fussy. Original siding, deep porch trim, transom windows, and shiplap that has been painted over a dozen times. Preparation is most of the job here, and stripping back badly built-up paint is often the difference between a repaint that lasts and one that flakes in two summers.",
            "Many of these homes sit in the historic districts, where exterior changes are reviewed. We are comfortable working to an approved color scheme and keeping original profiles rather than replacing them.",
            "We also restain a lot of front doors, porch ceilings, and interior trim where the wood is worth showing rather than covering.",
        ],
        focus: [
            "Historic exterior repaints with careful prep",
            "Original trim, siding and porch detail",
            "Wood staining for doors and porch ceilings",
            "Interior repaints and cabinet refinishing",
        ],
        nearby: ["montrose-upper-kirby", "spring-branch", "river-oaks"],
    },
    {
        slug: "montrose-upper-kirby",
        name: "Montrose & Upper Kirby",
        shortName: "Montrose",
        zips: ["77006", "77098"],
        neighborhoods: ["Montrose", "Upper Kirby", "Hyde Park", "Cherryhurst", "Audubon Place"],
        seoTitle: "Painters in Montrose, Houston TX",
        seoDescription:
            "Interior painting, cabinet refinishing and Venetian plaster in Montrose and Upper Kirby, Houston (77006, 77098). Call (713) 539-8069.",
        h1: "Painting & Plaster in Montrose",
        body: [
            "Montrose and Upper Kirby run from restored bungalows to new townhomes on the same block. We work across both, and the two need opposite things: one wants careful repair and color matching, the other wants a flat, flawless modern finish.",
            "This is where we are asked for plaster and microcement most often after River Oaks. In a townhome with a tight footprint, a plaster wall gives a room depth without taking up space.",
            "Our washable flat finish suits these homes too, because open-plan living and hallways get touched constantly.",
        ],
        focus: [
            "Venetian plaster and microcement walls",
            "Washable flat finish for open-plan living",
            "Restored bungalow interiors and trim",
            "Townhome interiors and cabinetry",
        ],
        nearby: ["river-oaks", "houston-heights", "west-university-place"],
    },
    {
        slug: "meyerland-braeswood",
        name: "Meyerland & Braeswood",
        shortName: "Meyerland",
        zips: ["77096", "77025"],
        neighborhoods: ["Meyerland", "Braeswood Place", "Knollwood Village", "Willow Meadows"],
        seoTitle: "Painters in Meyerland, Houston TX",
        seoDescription:
            "Interior and exterior painting, cabinet refinishing and wood staining in Meyerland and Braeswood Place, Houston (77096, 77025). Call (713) 539-8069.",
        h1: "Painting & Plaster in Meyerland",
        body: [
            "A lot of Meyerland and Braeswood homes have been raised, rebuilt, or heavily renovated in the last decade. That means fresh drywall next to original mid-century work, and the join between the two is where finishes usually give the game away.",
            "New drywall is exactly where our washable flat finish earns its keep. It holds a soft matte look that hides the small imperfections a satin or eggshell would put a spotlight on, and it still wipes clean.",
            "We also do a lot of cabinet refinishing and interior repaints here.",
        ],
        focus: [
            "Washable flat finish over new drywall",
            "Interior repaints after renovation",
            "Cabinet refinishing",
            "Exterior painting and trim",
        ],
        nearby: ["west-university-place", "bellaire", "pearland-manvel"],
    },
    {
        slug: "energy-corridor",
        name: "Energy Corridor & Westchase",
        shortName: "Energy Corridor",
        zips: ["77042", "77094", "77079"],
        neighborhoods: [
            "Energy Corridor",
            "Westchase",
            "Briarforest",
            "Park Row",
            "Nottingham Forest",
        ],
        seoTitle: "Energy Corridor Painters, Houston TX",
        seoDescription:
            "Interior, exterior and commercial painting in the Energy Corridor, Westchase and Briarforest (77042, 77094). Call (713) 539-8069.",
        h1: "Painting & Plaster in the Energy Corridor",
        body: [
            "The Energy Corridor and Westchase are a mix of established neighborhoods and a lot of offices, which is why we do more commercial work here than anywhere else in Houston.",
            "For offices, shops and lobbies we schedule around your hours, including evenings and weekends, so we are not in the way of your staff or your customers. We can work floor by floor and keep the site clean and safe between shifts.",
            "On the residential side it is mostly interior repaints, cabinetry, and exteriors on shaded lots that need rot repair before paint.",
        ],
        focus: [
            "Commercial painting for offices and lobbies",
            "Work scheduled around business hours",
            "Interior repaints and cabinetry",
            "Exterior painting with rot repair",
        ],
        nearby: ["memorial", "katy-cinco-ranch", "spring-branch"],
    },
    {
        slug: "spring-branch",
        name: "Spring Branch",
        shortName: "Spring Branch",
        zips: ["77055"],
        neighborhoods: ["Spring Branch East", "Hilshire Village", "Spring Valley Village"],
        seoTitle: "Painters in Spring Branch, Houston TX",
        seoDescription:
            "Interior and exterior painting, cabinet refinishing and wood staining in Spring Branch and the Spring Valley villages, Houston (77055). Call (713) 539-8069.",
        h1: "Painting & Plaster in Spring Branch",
        body: [
            "Spring Branch is changing fast. Original post-war ranches sit next to new three-story builds, sometimes on the same lot line, so we move between careful repair work and clean modern finishes constantly.",
            "On the older homes, exteriors need real preparation — the siding and trim have usually been painted many times and the build-up has to come back before anything new goes on.",
            "On the new builds, it is interiors, cabinetry, and increasingly plaster or microcement feature walls.",
        ],
        focus: [
            "Exterior repaints with heavy prep on older homes",
            "Interior painting for new builds",
            "Cabinet refinishing",
            "Plaster and microcement feature walls",
        ],
        nearby: ["memorial", "houston-heights", "energy-corridor"],
    },
    {
        slug: "cypress",
        name: "Cypress & Bridgeland",
        shortName: "Cypress",
        zips: ["77429", "77433"],
        neighborhoods: ["Bridgeland", "Coles Crossing", "Fairfield", "Towne Lake", "Blackhorse Ranch"],
        seoTitle: "Painters in Cypress & Bridgeland, TX",
        seoDescription:
            "Interior and exterior painting, cabinet refinishing and wood staining in Cypress and Bridgeland, TX (77429, 77433). Call (713) 539-8069.",
        h1: "Painting & Plaster in Cypress",
        body: [
            "The custom and estate sections of Bridgeland, Towne Lake and Blackhorse Ranch are newer, large, and sit on open, unshaded frontage. Brick and stucco elevations, tall two-story entries, and a lot of west-facing glass.",
            "Sun is the main enemy here. South and west elevations, garage doors and front doors fade first, and a repaint that skips the right exterior product will look tired inside a few years.",
            "Inside, most of what we do in Cypress is whole-home repaints and cabinet refinishing, plus the occasional plaster feature wall in a two-story entry.",
        ],
        focus: [
            "Exterior painting for sun-exposed elevations",
            "Garage and front doors refinished",
            "Whole-home interior repaints",
            "Cabinet refinishing",
        ],
        nearby: ["spring-klein-tomball", "katy-cinco-ranch", "waller-hockley"],
    },
    {
        slug: "spring-klein-tomball",
        name: "Spring, Klein & Tomball",
        shortName: "Spring",
        zips: ["77386", "77389", "77069", "77375"],
        neighborhoods: [
            "Benders Landing",
            "Augusta Pines",
            "Gleannloch Farms",
            "Champions",
            "Klein",
            "Tomball",
        ],
        seoTitle: "Painters in Spring, Klein & Tomball, TX",
        seoDescription:
            "Painting, cabinet refinishing, wood staining and Venetian plaster in Spring, Klein and Tomball, TX. Call (713) 539-8069.",
        h1: "Painting & Plaster in Spring & Klein",
        body: [
            "This stretch runs from established Champions and Klein homes through newer acreage builds in Benders Landing and Augusta Pines. Lot sizes get generous, and so do the houses.",
            "On the larger homes we see a lot of two-story entries, heavy stained trim, and beamed ceilings. Restaining those properly means stripping first and testing the color on your own wood, not matching to a card.",
            "Exteriors on wooded lots need rot repair and caulking before paint, the same as Memorial and The Woodlands.",
        ],
        focus: [
            "Restaining beams, trim and stair rails",
            "Exterior painting with rot repair",
            "Whole-home interior repaints",
            "Venetian plaster and lime wash",
        ],
        nearby: ["the-woodlands", "cypress", "montgomery-magnolia"],
    },
    {
        slug: "kingwood",
        name: "Kingwood",
        shortName: "Kingwood",
        zips: ["77345"],
        neighborhoods: ["Kings Forest", "Kings Point", "Trailwood Village", "Bear Branch"],
        seoTitle: "Painters in Kingwood, TX",
        seoDescription:
            "Interior and exterior painting, cabinet refinishing and wood staining in Kingwood, TX (77345). Call (713) 539-8069.",
        h1: "Painting & Plaster in Kingwood",
        body: [
            "Kingwood calls itself the Livable Forest, and the trees are the whole story for exterior work. Shade keeps siding damp, moss and mildew take hold on north elevations, and paint fails from behind rather than from the sun.",
            "We wash properly, cut back the loose paint, repair rot, and caulk before priming. That sequence is the difference between five years and ten.",
            "Inside, we do whole-home repaints, cabinet refinishing, and restaining for doors and trim.",
        ],
        focus: [
            "Exterior painting for heavily shaded lots",
            "Mildew treatment and rot repair",
            "Interior repaints and cabinetry",
            "Wood staining for doors and trim",
        ],
        nearby: ["the-woodlands", "spring-klein-tomball"],
    },
    {
        slug: "missouri-city",
        name: "Missouri City & Sienna",
        shortName: "Missouri City",
        zips: ["77459"],
        neighborhoods: ["Sienna", "Quail Valley", "Lake Olympia", "Riverstone"],
        seoTitle: "Painters in Missouri City & Sienna, TX",
        seoDescription:
            "Interior and exterior painting, cabinet refinishing and wood staining in Missouri City and Sienna, TX (77459). Call (713) 539-8069.",
        h1: "Painting & Plaster in Missouri City",
        body: [
            "Missouri City runs from the established Quail Valley streets to the custom sections of Sienna and Riverstone, so we move between mature homes and large new builds within a few miles.",
            "Stucco and brick elevations are common, and stucco needs the right breathable coating rather than whatever is cheapest. We patch the cracks first and use a product that lets the wall dry out.",
            "Interior repaints and cabinet refinishing make up most of the rest of our work here.",
        ],
        focus: [
            "Stucco painting with breathable coatings",
            "Whole-home interior repaints",
            "Cabinet refinishing",
            "HOA color submissions handled",
        ],
        nearby: ["sugar-land", "pearland-manvel", "fulshear-richmond"],
    },
    {
        slug: "fulshear-richmond",
        name: "Fulshear, Richmond & Pecan Grove",
        shortName: "Fulshear",
        zips: ["77441", "77406", "77407"],
        neighborhoods: [
            "Cross Creek Ranch",
            "Fulbrook",
            "Weston Lakes",
            "Pecan Grove",
            "Aliana",
            "Richmond",
        ],
        seoTitle: "Painters in Fulshear & Richmond, TX",
        seoDescription:
            "Painting, cabinet refinishing, wood staining and Venetian plaster in Fulshear, Richmond and Pecan Grove, TX. Call (713) 539-8069.",
        h1: "Painting & Plaster in Fulshear & Richmond",
        body: [
            "Fulshear and the Richmond side have grown quickly, and a lot of the housing is recent, large, and on open ground — Cross Creek Ranch, Fulbrook, Weston Lakes, Aliana.",
            "New does not mean maintenance-free. Builder-grade exterior paint on a west elevation fades fast out here, and builder-grade interior paint marks the moment a family moves in. Both are common reasons people call us within a few years of moving.",
            "We do whole-home repaints, cabinet refinishing, and increasingly plaster and lime wash feature walls in the larger homes.",
        ],
        focus: [
            "Repainting over builder-grade finishes",
            "Exterior painting for open, sunny lots",
            "Venetian plaster and lime wash feature walls",
            "Cabinet refinishing",
        ],
        nearby: ["katy-cinco-ranch", "sugar-land", "waller-hockley"],
    },
    {
        slug: "pearland-manvel",
        name: "Pearland, Manvel, Friendswood & League City",
        shortName: "Pearland",
        zips: ["77584", "77578", "77546", "77573"],
        neighborhoods: [
            "Shadow Creek Ranch",
            "Silverlake",
            "Manvel",
            "Friendswood",
            "League City",
            "Tuscan Lakes",
        ],
        seoTitle: "Painters in Pearland & Friendswood, TX",
        seoDescription:
            "Painting, cabinet refinishing and wood staining in Pearland, Manvel, Friendswood and League City, TX. Call (713) 539-8069.",
        h1: "Painting & Plaster in Pearland & Friendswood",
        body: [
            "The custom sections here — Shadow Creek, Silverlake, the older Friendswood streets and the Tuscan Lakes waterfronts — sit closer to the coast, and the humidity shows. Exterior paint has to cope with damp air as well as sun, and mildew on north elevations is routine rather than occasional.",
            "We wash and treat before painting rather than sealing the problem underneath, and we caulk properly so damp air cannot get behind the finish.",
            "Interiors are mostly whole-home repaints and kitchen cabinet refinishing, with a good amount of deck and fence staining in Friendswood and League City.",
        ],
        focus: [
            "Exterior painting for humid, coastal-side weather",
            "Mildew treatment before repainting",
            "Deck and fence staining",
            "Interior repaints and cabinet refinishing",
        ],
        nearby: ["meyerland-braeswood", "missouri-city", "west-university-place"],
    },
    {
        slug: "montgomery-magnolia",
        name: "Montgomery, Magnolia & Pinehurst",
        shortName: "Montgomery",
        zips: ["77316", "77356", "77354", "77362", "77355"],
        neighborhoods: [
            "Woodforest",
            "Walden on Lake Conroe",
            "Bentwater",
            "Magnolia",
            "Pinehurst",
            "Stagecoach",
            "Decker Prairie",
        ],
        seoTitle: "Painters in Montgomery & Magnolia, TX",
        seoDescription:
            "Painting, wood staining, cabinet refinishing and Venetian plaster in Montgomery, Magnolia and Pinehurst, TX. Call (713) 539-8069.",
        h1: "Painting & Plaster in Montgomery & Magnolia",
        body: [
            "North of The Woodlands the lots get bigger and a lot of the homes are custom, on acreage, or around Lake Conroe. Cedar, stone, heavy timber, and long covered porches are common.",
            "That means more staining than painting. Exposed beams, porch ceilings, gates, and fences all need stripping, staining and sealing rather than a coat of paint, and lake-facing elevations weather far faster than the rest of the house.",
            "We also do interior repaints, cabinetry, and plaster or lime wash on larger custom homes.",
        ],
        focus: [
            "Staining beams, porches, gates and fences",
            "Exterior work on lake-facing elevations",
            "Venetian plaster and lime wash",
            "Interior repaints and cabinetry",
        ],
        nearby: ["the-woodlands", "spring-klein-tomball", "waller-hockley"],
    },
    {
        slug: "waller-hockley",
        name: "Waller & Northwest Houston",
        shortName: "Waller",
        zips: ["77484"],
        neighborhoods: ["Waller", "Hockley", "Field Store"],
        seoTitle: "Painters in Waller & Hockley, TX",
        seoDescription:
            "Interior and exterior painting, wood staining and cabinet refinishing in Waller and Hockley, TX (77484). Call (713) 539-8069.",
        h1: "Painting & Plaster in Waller",
        body: [
            "Out toward Waller and Hockley the properties get large. Custom homes on ten and twenty acre parcels, equestrian barns, guest houses, and long runs of fencing that belong to the same estate as the house.",
            "Exposure is the issue here. There is little shade and little shelter, so exterior paint and stain take the full weight of the sun and the weather. We use products built for it rather than standard builder-grade coatings.",
            "We will price the house, the guest quarters and the outbuildings as one project, and keep the same finish across all of them.",
        ],
        focus: [
            "Exterior painting for fully exposed properties",
            "Fence, gate and outbuilding staining",
            "Interior repaints and cabinetry",
            "House and outbuildings quoted together",
        ],
        nearby: ["cypress", "montgomery-magnolia", "fulshear-richmond"],
    },
];

export const getArea = (slug: string): AreaDef | undefined =>
    AREAS.find((a) => a.slug === slug);

/** Every ZIP we target, flattened — used for schema and the areas hub. */
export const ALL_ZIPS: string[] = Array.from(
    new Set(AREAS.flatMap((a) => a.zips))
).sort();
