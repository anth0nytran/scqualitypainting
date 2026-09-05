import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SiteAnalytics from "./components/SiteAnalytics";
import { SERVICES } from "@/lib/services";
import { AREAS } from "@/lib/areas";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const AreaPage = lazy(() => import("./pages/AreaPage"));
const AreasWeServe = lazy(() => import("./pages/AreasWeServe"));
const Contact = lazy(() => import("./pages/Contact"));
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

                    {/* One dedicated, indexable page per service */}
                    {SERVICES.map((s) => (
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

                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<Terms />} />
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
