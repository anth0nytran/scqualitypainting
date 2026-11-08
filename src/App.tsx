import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SiteAnalytics from "./components/SiteAnalytics";
import { ALL_SERVICE_PAGES } from "@/lib/services";
import { ALL_POSTS } from "@/lib/blog";
import { AREAS } from "@/lib/areas";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const AreaPage = lazy(() => import("./pages/AreaPage"));
const AreasWeServe = lazy(() => import("./pages/AreasWeServe"));
const Contact = lazy(() => import("./pages/Contact"));
const HiringGuide = lazy(() => import("./pages/HiringGuide"));
const CustomFinishes = lazy(() => import("./pages/CustomFinishes"));
const Glossary = lazy(() => import("./pages/Glossary"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <Layout>
            <SiteAnalytics />
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />

                    {/* Custom finishes lead; painting services sit behind them */}
                    <Route path="/custom-finishes" element={<CustomFinishes />} />

                    {/* One dedicated, indexable page per service and per finish */}
                    {ALL_SERVICE_PAGES.map((s) => (
                        <Route key={s.slug} path={`/${s.slug}`} element={<ServicePage slug={s.slug} />} />
                    ))}

                    {/* Local landing pages for the target ZIP codes */}
                    <Route path="/areas-we-serve" element={<AreasWeServe />} />
                    {AREAS.map((a) => (
                        <Route
                            key={a.slug}
                            path={`/painting/${a.slug}`}
                            element={<AreaPage slug={a.slug} />}
                        />
                    ))}

                    {/* Consumer guide: how to hire a painter without losing a deposit */}
                    <Route path="/hiring-a-painter" element={<HiringGuide />} />
                    <Route path="/glossary" element={<Glossary />} />
                    <Route path="/reviews" element={<Reviews />} />

                    {/* Journal: future-dated posts redirect to /blog until their date */}
                    <Route path="/blog" element={<BlogIndex />} />
                    {ALL_POSTS.map((p) => (
                        <Route key={p.slug} path={`/blog/${p.slug}`} element={<BlogPost slug={p.slug} />} />
                    ))}

                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/accessibility" element={<Accessibility />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Layout>
    );
}

function PageLoader() {
    return (
        <div className="min-h-screen bg-ink flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/15 border-t-taupe rounded-full animate-spin" />
        </div>
    );
}

export default App;
