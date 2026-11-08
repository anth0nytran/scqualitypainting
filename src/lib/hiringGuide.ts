/* ============================================================
   South Coast — "Before You Hire a Painter" consumer guide.

   Antonio asked for this himself: he wants homeowners to stop
   handing large deposits to painters they don't know, and to
   check ID, business records and references first. It is
   written for the homeowner, not as a sales page.

   Single source of truth: the page (/hiring-a-painter), the
   prerendered crawler HTML, the FAQPage schema and llms.txt all
   read from here, so what AI engines see always matches what
   people see.

   AEO structure: every section heading is a real question, and
   `answer` is a 40–60 word direct answer that can be quoted on
   its own. `points` is the supporting detail.

   COPY RULE: plain English, short sentences. Calm, never
   preachy. No legal claims we can't stand behind.
   ============================================================ */

export const GUIDE_SLUG = "hiring-a-painter";
export const GUIDE_PUBLISHED = "2026-11-08";
export const GUIDE_UPDATED = "2026-11-08";

export const GUIDE_SEO = {
    title: "How to Hire a Painter in Houston Safely",
    description:
        "Don't pay a big deposit to a painter you don't know. Antonio Benitez's checklist: check photo ID, verify the business, call references, pay in stages.",
};

export const GUIDE_H1 = "Don't hand a big deposit to someone you don't know.";

export const GUIDE_LEDE =
    "Before you hire any painter, check who they are and keep your deposit small. That one habit stops most of the scams Houston homeowners fall for.";

/** Antonio's note, in his words (paraphrased from his own message). */
export const ANTONIO_NOTE = [
    "I have heard too many of these stories. A homeowner pays a painter 40% up front. The painter buys a little paint, maybe works a day, and then stops answering the phone. The money is gone.",
    "I have painted Houston homes since 1999. I want every homeowner to know who they are hiring before they hand over their money. Some people in my trade won't like me saying this. I'm saying it anyway.",
];

export interface GuideSection {
    id: string;
    /** Question-shaped H2 */
    q: string;
    /** 40–60 word direct answer — quotable on its own */
    answer: string;
    /** Supporting detail */
    points?: string[];
    /** Optional closing note */
    note?: string;
}

export const GUIDE_SECTIONS: GuideSection[] = [
    {
        id: "deposit",
        q: "How much deposit should a painter ask for?",
        answer:
            "Keep it small. A deposit only needs to cover paint and supplies and hold your place on the calendar. For most painting jobs, that is about 10% to 20% of the price. If a painter you just met asks for 40% or 50% before any work starts, stop and check them first.",
        points: [
            "Pay the rest in stages, as each part of the job is finished and you have looked at it.",
            "Never pay the full price before the work is done and you have walked through it.",
            "Offer to buy the paint yourself, or pay the paint store directly.",
            "Pay by check or credit card. Cash, Zelle, Venmo and Cash App are very hard to get back.",
        ],
        note: "For comparison, California's law caps home-improvement deposits at 10% of the price or $1,000, whichever is less. That tells you how small a fair deposit can be.",
    },
    {
        id: "photo-id",
        q: "Should I ask a painter for photo ID?",
        answer:
            "Yes. Ask to see a driver's license or state ID before you sign anything or pay anything. Check that the name matches the estimate, the contract and the business records. An honest painter will not mind. If someone gets upset when you ask, that tells you what you need to know.",
        points: [
            "Write down the full name and the license or ID number.",
            "Take a photo of their truck and license plate when they come out.",
            "Get a street address, not just a cell phone number.",
        ],
    },
    {
        id: "verify-business",
        q: "How do I check that a painting company in Texas is real?",
        answer:
            "Texas does not issue a state license for painters, so you have to check the business yourself. Look the company up on the Texas Comptroller's free Taxable Entity Search, check its Google reviews and history, and confirm it has a real address. It only takes ten minutes.",
        points: [
            "Corporations and LLCs show up on the Texas Comptroller's Taxable Entity Search. The status should say active.",
            "If they use a trade name, the county clerk (Harris County, Fort Bend County and so on) keeps assumed-name records.",
            "Look at their Google Business Profile. How long has it been there? Do the reviews have real names, real photos and real neighborhoods?",
            "Check the Better Business Bureau for complaints and how they were handled.",
            "If your home was built before 1978, the painter must be EPA Lead-Safe certified. You can look them up on the EPA's website.",
        ],
    },
    {
        id: "insurance",
        q: "Should a painter show proof of insurance?",
        answer:
            "Yes. Ask for a certificate of liability insurance, then call the insurance company and confirm it is active. If a painter damages your home or someone gets hurt on your property, insurance is what pays. Texas does not require private companies to carry workers' comp, so ask whether the crew is covered.",
    },
    {
        id: "references",
        q: "What should I ask a painter's references?",
        answer:
            "Ask for two or three customers from the past year with jobs like yours, and actually call them. Ask if the painter started and finished on time, if the price changed, how much they paid up front, and whether they would hire the painter again.",
        points: [
            "Did they start when they said, and finish when they said?",
            "Did the price change partway through?",
            "How much did you pay up front?",
            "Did they clean up and take care of your home?",
            "Would you hire them again? Can I see the work, or photos of it?",
        ],
    },
    {
        id: "contract",
        q: "What should a painting contract include?",
        answer:
            "Get everything in writing before you pay. The contract should list the business name and address, exactly what will be painted, the prep work, the products and number of coats, the total price, a payment schedule tied to finished work, and start and finish dates.",
        points: [
            "Who moves furniture, protects floors and cleans up.",
            "What is covered if something goes wrong, and for how long.",
            "Don't sign a blank estimate, or one that says \"we'll figure it out.\"",
            "In Texas, if a painter doesn't pay their workers or the paint store, those people may be able to put a lien on your home. When you make a payment, ask for a written lien release.",
        ],
    },
    {
        id: "already-paid",
        q: "What do I do if I paid a painter and they disappeared?",
        answer:
            "Act quickly. Save every text, receipt and payment record. Send a written demand for your money back. File a complaint with the Texas Attorney General's Consumer Protection Division, and report it to your local police. If you paid by credit card, call your card company right away to dispute the charge.",
        points: [
            "Texas justice courts (small claims) handle cases up to $20,000. You don't need a lawyer to file.",
            "Leave an honest review so the next homeowner knows.",
        ],
    },
];

/** Red flags — short, scannable. */
export const RED_FLAGS = [
    "Wants a big deposit, or wants cash only",
    "Knocked on your door with \"leftover paint\" from a job nearby",
    "Pushes you to decide today — \"this price won't last\"",
    "No written contract, or a vague one",
    "No business name, no address, only a cell number",
    "Won't show ID or proof of insurance",
    "A price far below everyone else's",
    "Wants full payment before the work is finished",
];

/** The printable checklist. */
export const CHECKLIST = [
    "I have seen their photo ID, and the name matches the contract",
    "I looked up the business, and it is active",
    "I have a real street address for them",
    "I called at least two recent references",
    "I have a certificate of insurance, and I called to confirm it",
    "Home built before 1978: they are EPA Lead-Safe certified",
    "I have a written contract with a payment schedule",
    "My deposit is small, and I'm paying by check or card",
];

/** Q/A pairs for FAQPage schema — the visible section headings and answers. */
export const GUIDE_FAQS = GUIDE_SECTIONS.map((s) => ({ q: s.q, a: s.answer }));
