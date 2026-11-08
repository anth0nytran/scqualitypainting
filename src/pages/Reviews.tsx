import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Phone } from "lucide-react";
import SEO from "../hooks/useSEO";
import GoogleReviews from "@/components/GoogleReviews";
import { PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/services";
import { AVERAGE_RATING, GBP_URL, REVIEW_COUNT } from "@/lib/reviews";

/* ============================================================
   /reviews — Search Console shows ~100 impressions/6 months for
   "south coast quality painting, inc. reviews" with no page to
   land on. This is that page. Review markup already lives on
   the business entity in index.html, so it is not repeated here.
   ============================================================ */

export default function Reviews() {
    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/reviews#page`,
            url: `${SITE_URL}/reviews`,
            name: "South Coast Quality Painting, Inc. reviews",
            about: { "@id": `${SITE_URL}/#business` },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Reviews", item: `${SITE_URL}/reviews` },
            ],
        },
    ];

    return (
        <div className="bg-ink w-full text-cream overflow-x-hidden selection:bg-taupe selection:text-offwhite">
            <SEO
                title="South Coast Quality Painting, Inc. Reviews"
                description={`Read ${REVIEW_COUNT} verified Google reviews of South Coast Quality Painting, Inc., rated ${AVERAGE_RATING} out of 5 for painting and Venetian plaster in Houston.`}
                path="/reviews"
                schema={schema}
            />

            <section className="relative">
                <div className="bg-ink h-20 md:h-[72px]" />
                <div className="bg-offwhite text-ink">
                    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
                        <span className="eyebrow block mb-5">Verified on Google</span>
                        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-ink leading-[1.08] tracking-[-0.01em] mb-5">
                            South Coast Quality Painting reviews
                        </h1>
                        <div className="rule-luxe mx-auto mb-7" />
                        <p className="text-[17px] md:text-lg text-ink/75 leading-[1.8] max-w-2xl mx-auto mb-8">
                            {REVIEW_COUNT} reviews, rated {AVERAGE_RATING} out of 5 by Houston homeowners and
                            businesses. Every review below is copied word for word from our Google profile.
                        </p>
                        <a href={GBP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
                            See them on Google <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-ink-800 py-14 md:py-18 border-y border-white/10">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <GoogleReviews heading="What our customers say" sub="Painting, cabinets, staining and Venetian plaster across Greater Houston." />
                </div>
            </section>

            <section className="bg-ink py-14 md:py-20">
                <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-cream leading-tight mb-5">
                        Check us out before you hire us.
                    </h2>
                    <p className="text-[17px] text-stone leading-[1.8] mb-8">
                        Read the reviews, call our references, and look up the business. That is good advice
                        for hiring anyone.{" "}
                        <Link to="/hiring-a-painter" className="text-cream underline underline-offset-4">
                            Antonio's before-you-hire checklist
                        </Link>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/contact" className="btn btn-cream w-full sm:w-auto">
                            Book a Consultation <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href={`tel:${PHONE_TEL}`} className="btn btn-outline w-full sm:w-auto">
                            <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
