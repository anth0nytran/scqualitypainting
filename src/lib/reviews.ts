/* ============================================================
   South Coast — Customer reviews (single source of truth).

   These are real Google reviews. Do NOT edit the wording, and do
   NOT invent the missing half of a truncated one — several were
   collapsed behind Google's "… More" link, so we store only the
   text that was actually visible and mark it `truncated`.

   `services` / `area` tag each review so a page can show the
   reviews that are actually relevant to it (a cabinet review on
   the cabinet page, a River Oaks review on the River Oaks page).

   Used for on-page proof AND for schema.org Review nodes.
   ============================================================ */

export interface Review {
    author: string;
    /** 1-5. Every review gathered so far has been 5 stars. */
    rating: number;
    /** Exact review text. Never paraphrase. */
    text: string;
    /** True when Google collapsed the rest behind "… More". */
    truncated?: boolean;
    /** Relative recency as shown by Google, for display only. */
    when?: string;
    /** Service slugs this review speaks to. */
    services: string[];
    /** Area slug, when the review names a location. */
    area?: string;
    /** Featured reviews lead on the home page. */
    featured?: boolean;
}

export const REVIEWS: Review[] = [
    {
        author: "Anthony Tran",
        rating: 5,
        text: "I had an excellent experience with South Coast Quality Painting, Inc. Antonio and his team completed a full interior and exterior painting project on my home in River Oaks, Houston, and the quality of their work was outstanding. From the beginning, Antonio was professional, knowledgeable, and very detail-oriented. His team took the time to properly prep everything, protected the floors, furniture, and surrounding areas, and kept the jobsite clean throughout the entire project. The interior walls, ceilings, trim, doors, and exterior all came out beautifully with clean lines and a high-end finish. What impressed me most was the attention to detail and the pride they take in their work. Antonio communicated with me throughout the project, made sure everything was done correctly, and didn't rush through the job just to finish. If you're looking for a reliable, professional painting contractor in River Oaks or the Greater Houston area for interior or exterior painting, I highly recommend South Coast Quality Painting, Inc. I would absolutely use Antonio and his team again.",
        services: ["interior-painting", "exterior-painting"],
        area: "river-oaks",
        featured: true,
    },
    {
        author: "Brittany Foltynewicz",
        rating: 5,
        text: "South Coast Quality Painting is truly exceptional! Their Venetian plaster skills are phenomenal, and the quality of their painting work is just as impressive. Since moving here from Arizona, it has been so difficult to find reliable,",
        truncated: true,
        when: "a week ago",
        services: ["venetian-plaster", "interior-painting"],
        featured: true,
    },
    {
        author: "Samantha Moore",
        rating: 5,
        text: "South Coast has been doing projects for us for over 10 years. They always are attentive and do a fantastic job. From exterior painting to interior plaster work, they can do any type of finish work you may need. They're very professional",
        truncated: true,
        when: "2 months ago",
        services: ["exterior-painting", "venetian-plaster", "interior-painting"],
        featured: true,
    },
    {
        author: "Cynthia Torres",
        rating: 5,
        text: "I couldn't be happier with the results of our cabinet painting! The team was professional, detail-oriented, and truly transformed our kitchen. The finish looks flawless and fresh, like we got brand new cabinets. Everything was done on time and with great care. Highly recommend for anyone looking to give their space a new life!",
        when: "a year ago",
        services: ["cabinet-painting"],
        featured: true,
    },
    {
        author: "Emmanuel Diaz",
        rating: 5,
        text: "We had an amazing experience. From start to finish, they were professional, punctual, and super easy to work with. The attention to detail was top-notch—they prepped everything thoroughly and made sure the finish was smooth and even. Our home looks completely refreshed and better than we imagined.",
        services: ["interior-painting"],
        featured: true,
    },
    {
        author: "Apartment Management",
        rating: 5,
        text: "Antonio is an amazing painter. He is talented and creative! He did the Venetian plaster in my bedroom and he did a phenomenal job! I'm very happy with this work.",
        when: "2 months ago",
        services: ["venetian-plaster"],
        featured: true,
    },
    {
        author: "Barbara Vilutis",
        rating: 5,
        text: "Outstanding Work and Exceptional Attention to Detail. We could not be happier with the work this painting company did on our lake house on Lake Conroe. They completely transformed the property, painting both the",
        truncated: true,
        when: "2 months ago",
        services: ["exterior-painting", "interior-painting"],
        area: "montgomery-magnolia",
    },
    {
        author: "Eduardo Granados",
        rating: 5,
        text: "I had around 12 people working on my business and the final results are amazing. I highly recommend South Coast Quality Painting. I felt that the price was fair & reasonable and I did a lot of homework; the quality like none other. The",
        truncated: true,
        when: "2 days ago",
        services: ["interior-painting"],
    },
    {
        author: "John Degenstein",
        rating: 5,
        text: "Our experience with Antonio and his crew was great. I have used several painters over the years and our experience with South Coast was by far the best yet. The quality of work was outstanding as well as the communication. I also felt the",
        truncated: true,
        when: "a month ago",
        services: ["interior-painting", "exterior-painting"],
    },
    {
        author: "Salvador Chapa",
        rating: 5,
        text: "My wife and I would like to take a moment to thank Antonio and the team at South Coast Quality Painting for the outstanding job they did painting the downstairs interior of our home, including the kitchen. They were professional, courteous,",
        truncated: true,
        when: "2 months ago",
        services: ["interior-painting", "cabinet-painting"],
    },
    {
        author: "Esteban",
        rating: 5,
        text: "Antonio Benitez and his crew at South Coast Quality Painting are truly outstanding! They are very detail oriented and their work is very high quality. They accommodate their schedule to work with you and always listen to what you need",
        truncated: true,
        when: "a month ago",
        services: ["interior-painting"],
    },
    {
        author: "Luke",
        rating: 5,
        text: "Antonio and his crew at South Coast Quality Painting are wonderful to work with. They consistently deliver high-quality workmanship and are reliable, honest, and trustworthy. I look forward to continuing to work with them on future projects.",
        when: "a month ago",
        services: ["interior-painting"],
    },
    {
        author: "Bob Harry",
        rating: 5,
        text: "Antonio and his crew do a great job. I've used him for a variety of indoor and outdoor projects and I've always been pleased with the quality results. Highly recommended.",
        when: "a month ago",
        services: ["interior-painting", "exterior-painting"],
    },
    {
        author: "M B",
        rating: 5,
        text: "Antonio is a great professional. His team did an amazing job and honest folks. They did the front door and ceiling in about 1.5 days with three coats to finish it out.",
        when: "a month ago",
        services: ["interior-painting", "wood-staining"],
    },
    {
        author: "L Bathija",
        rating: 5,
        text: "Very trustworthy company! Antonio has been taking care of our home since the last 20 years.",
        when: "2 months ago",
        services: ["interior-painting"],
    },
    {
        author: "Adelina Brothers",
        rating: 5,
        text: "South Coast provides excellent painting job from start to finish. I'm very impressed by their quality of work and their team of painters.",
        when: "a month ago",
        services: ["interior-painting"],
    },
    {
        author: "Sasha Iversen",
        rating: 5,
        text: "Great workmanship and easy to work with. Painters did a great job on our small project. Will use again!",
        when: "2 months ago",
        services: ["interior-painting"],
    },
    {
        author: "Roxana Viera Prats",
        rating: 5,
        text: "Excellent team, they are very professional and know how to do their job very well.",
        when: "a year ago",
        services: ["interior-painting"],
    },
];

export const REVIEW_COUNT = REVIEWS.length;

/** Every review gathered so far is 5 stars. */
export const AVERAGE_RATING =
    Math.round((REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length) * 10) / 10;

/** Reviews that mention a given service, most useful first. */
export const reviewsForService = (slug: string, limit = 3): Review[] =>
    REVIEWS.filter((r) => r.services.includes(slug)).slice(0, limit);

/** Reviews tied to a given area, falling back to featured ones. */
export const reviewsForArea = (slug: string, limit = 3): Review[] => {
    const local = REVIEWS.filter((r) => r.area === slug);
    const rest = REVIEWS.filter((r) => r.area !== slug && r.featured);
    return [...local, ...rest].slice(0, limit);
};

export const featuredReviews = (limit = 6): Review[] =>
    REVIEWS.filter((r) => r.featured).slice(0, limit);

/** schema.org Review nodes for the business. */
export const reviewSchema = (siteUrl: string) =>
    REVIEWS.map((r, i) => ({
        "@type": "Review",
        "@id": `${siteUrl}/#review-${i + 1}`,
        itemReviewed: { "@id": `${siteUrl}/#business` },
        author: { "@type": "Person", name: r.author },
        reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
        },
        reviewBody: r.text,
    }));
