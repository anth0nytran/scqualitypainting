import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    path: string;
    type?: string;
    /** Optional page-specific keywords */
    keywords?: string;
    /** Optional JSON-LD graph node(s) injected for this page */
    schema?: object | object[];
    /** Optional social share image override */
    image?: string;
}

const SITE_URL = "https://www.southcoastqualitypaint.com";
const OG_IMAGE = `${SITE_URL}/og/south-coast-og.jpg`;

export default function SEO({
    title,
    description,
    path,
    type = "website",
    keywords,
    schema,
    image,
}: SEOProps) {
    const url = `${SITE_URL}${path}`;
    // Service pages carry their own fully-written <title>; only short page
    // titles get the brand suffix appended.
    const fullTitle = title.includes("South Coast") ? title : `${title} | South Coast Quality Painting`;
    const ogImage = image ? `${SITE_URL}${image}` : OG_IMAGE;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={url} />

            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:image" content={ogImage} />

            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(Array.isArray(schema) ? schema : [schema])}
                </script>
            )}
        </Helmet>
    );
}
