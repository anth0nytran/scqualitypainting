import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo, { Monogram } from "@/components/Logo";
import { SERVICES, SERVICE_AREAS, PHONE_DISPLAY, PHONE_TEL, BRAND_LINE } from "@/lib/services";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const servicesRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            // Small delay so the target page renders before scrolling
            setTimeout(() => {
                const el = document.querySelector(location.hash);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [mobileMenuOpen]);

    // Close the services dropdown on outside click / Escape / route change
    useEffect(() => setServicesOpen(false), [location.pathname]);
    useEffect(() => {
        if (!servicesOpen) return;
        const onClick = (e: MouseEvent) => {
            if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
                setServicesOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setServicesOpen(false); };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [servicesOpen]);

    const isActive = (path: string) => location.pathname === path;
    const onServicePage = SERVICES.some((s) => location.pathname === `/${s.slug}`);

    return (
        <div className="min-h-screen bg-offwhite text-ink font-sans selection:bg-taupe selection:text-offwhite">
            {/* Navigation */}
            <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-50">
                <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                        top: scrolled ? '10px' : '0px',
                        width: scrolled ? 'min(64rem, calc(100% - 2rem))' : '100%',
                        height: scrolled ? '56px' : '72px',
                        backgroundColor: scrolled ? 'rgba(17,17,17,0.94)' : 'rgba(17,17,17,0.55)',
                        borderRadius: scrolled ? '9999px' : '0px',
                        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
                        border: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                        backdropFilter: 'blur(20px)',
                        transition: 'background-color 400ms cubic-bezier(0.22,1,0.36,1), border-color 400ms cubic-bezier(0.22,1,0.36,1), border-radius 700ms cubic-bezier(0.22,1,0.36,1), width 900ms cubic-bezier(0.22,1,0.36,1), height 700ms cubic-bezier(0.22,1,0.36,1), top 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                />

                <div className={cn(
                    "relative z-10 flex items-center justify-between mx-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    scrolled
                        ? "max-w-4xl lg:max-w-5xl px-6 h-[56px] mt-2.5"
                        : "max-w-none px-6 md:px-12 h-[72px]"
                )}>
                    <Link to="/" onClick={() => setMobileMenuOpen(false)} className="cursor-pointer flex items-center">
                        <Logo
                            variant="full"
                            colorClassName="text-cream"
                            monogramSize={scrolled ? 28 : 36}
                            className={cn(
                                "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                scrolled ? "text-sm" : "text-base md:text-lg"
                            )}
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-7 text-[14px] font-medium text-cream">
                        <Link
                            to="/"
                            className={cn("hover:text-taupe transition-colors relative group", isActive("/") && "text-taupe")}
                        >
                            Home
                            <span className={cn("absolute -bottom-1 left-0 h-px bg-taupe transition-all duration-300", isActive("/") ? "w-full" : "w-0 group-hover:w-full")} />
                        </Link>

                        {/* Services dropdown — the fix for "hard to find what you do" */}
                        <div ref={servicesRef} className="relative">
                            <button
                                onClick={() => setServicesOpen((o) => !o)}
                                aria-expanded={servicesOpen}
                                aria-haspopup="true"
                                className={cn(
                                    "flex items-center gap-1.5 hover:text-taupe transition-colors",
                                    (isActive("/services") || onServicePage) && "text-taupe"
                                )}
                            >
                                Services
                                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", servicesOpen && "rotate-180")} />
                            </button>

                            <AnimatePresence>
                                {servicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-72 bg-ink border border-white/12 shadow-2xl overflow-hidden"
                                    >
                                        {SERVICES.map((s) => (
                                            <Link
                                                key={s.slug}
                                                to={`/${s.slug}`}
                                                onClick={() => setServicesOpen(false)}
                                                className="flex items-center justify-between gap-3 px-5 py-3.5 text-[15px] text-cream/90 hover:bg-white/[0.06] hover:text-taupe border-b border-white/[0.06] transition-colors"
                                            >
                                                {s.label}
                                                {s.slug === "venetian-plaster" && (
                                                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-taupe">
                                                        Specialty
                                                    </span>
                                                )}
                                            </Link>
                                        ))}
                                        <Link
                                            to="/services"
                                            onClick={() => setServicesOpen(false)}
                                            className="flex items-center gap-2 px-5 py-3.5 text-[14px] font-semibold uppercase tracking-[0.08em] text-cream hover:bg-white/[0.06] hover:text-taupe transition-colors"
                                        >
                                            See All Services <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Phone — the highest-intent action for a contractor site */}
                        <a
                            href={`tel:${PHONE_TEL}`}
                            className="flex items-center gap-2 hover:text-taupe transition-colors whitespace-nowrap"
                        >
                            <Phone className="w-3.5 h-3.5 text-taupe" />
                            {PHONE_DISPLAY}
                        </a>

                        <Link
                            to="/contact"
                            className={cn(
                                "font-semibold uppercase tracking-[0.06em] transition-all duration-400 whitespace-nowrap",
                                scrolled
                                    ? "px-5 py-2.5 bg-cream text-ink hover:bg-offwhite rounded-full text-[13px]"
                                    : "px-5 py-2.5 bg-cream text-ink hover:bg-offwhite text-[13px]"
                            )}
                        >
                            Consultation
                        </Link>
                    </div>

                    {/* Mobile: call button + menu */}
                    <div className="flex md:hidden items-center gap-3">
                        <a
                            href={`tel:${PHONE_TEL}`}
                            aria-label={`Call ${PHONE_DISPLAY}`}
                            className="w-10 h-10 border border-cream/30 flex items-center justify-center text-cream"
                        >
                            <Phone className="w-4 h-4" />
                        </a>
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="uppercase text-[14px] font-semibold tracking-[0.08em] text-cream"
                        >
                            Menu
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[60] bg-ink text-cream flex flex-col overflow-y-auto"
                    >
                        <div className="flex justify-between items-center p-5 border-b border-white/[0.08]">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                                <Logo variant="full" colorClassName="text-cream" monogramSize={28} className="text-sm" />
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="p-1">
                                <X className="w-6 h-6 text-cream" />
                            </button>
                        </div>

                        {/* Call + Quote first — the two actions that matter */}
                        <div className="p-5 grid grid-cols-2 gap-3 border-b border-white/[0.08]">
                            <a href={`tel:${PHONE_TEL}`} className="btn btn-outline w-full !py-3.5">
                                <Phone className="w-4 h-4" /> Call
                            </a>
                            <Link
                                to="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="btn btn-cream w-full !py-3.5"
                            >
                                Consultation
                            </Link>
                        </div>

                        {/* Services listed flat — no hunting */}
                        <div className="p-5 border-b border-white/[0.08]">
                            <span className="eyebrow block mb-4">What we do</span>
                            {SERVICES.map((route, i) => (
                                <motion.div
                                    key={route.slug}
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.04 + i * 0.05 }}
                                >
                                    <Link
                                        to={`/${route.slug}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center justify-between py-3 text-2xl font-serif font-semibold transition-colors",
                                            isActive(`/${route.slug}`) ? "text-taupe" : "text-cream hover:text-taupe"
                                        )}
                                    >
                                        {route.label}
                                        <ArrowRight className="w-4 h-4 text-stone/60" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-5 border-b border-white/[0.08]">
                            <span className="eyebrow block mb-4">Pages</span>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                {[
                                    { name: "Home", path: "/" },
                                    { name: "All Services", path: "/services" },
                                    { name: "How It Works", path: "/services#process" },
                                    { name: "Reviews", path: "/services#reviews" },
                                    { name: "Questions", path: "/services#faq" },
                                    { name: "Get a Quote", path: "/contact" },
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-[15px] text-stone hover:text-cream transition-colors py-1"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 space-y-3">
                            <span className="eyebrow block mb-3">Get in touch</span>
                            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 text-[16px] text-cream">
                                <Phone className="w-4 h-4 text-taupe" /> {PHONE_DISPLAY}
                            </a>
                            <a href="mailto:benitezantonio@live.com" className="flex items-center gap-3 text-[15px] text-stone break-all">
                                <Mail className="w-4 h-4 text-taupe flex-shrink-0" /> benitezantonio@live.com
                            </a>
                            <span className="flex items-center gap-3 text-[15px] text-stone/70">
                                <MapPin className="w-4 h-4 text-taupe" /> Houston, Texas
                            </span>
                            <p className="text-[13px] text-stone/60 pt-3">
                                Antonio Benitez · Certified Plaster Specialist · Houston, TX
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky mobile action bar — call and quote, always reachable */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                scrolled && !mobileMenuOpen ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="bg-ink/97 backdrop-blur-md border-t border-white/10 px-4 py-3 grid grid-cols-2 gap-3">
                    <a href={`tel:${PHONE_TEL}`} className="btn btn-outline w-full !py-3.5 !px-3 !gap-2 whitespace-nowrap">
                        <Phone className="w-4 h-4 flex-shrink-0" /> Call
                    </a>
                    <Link to="/contact" className="btn btn-cream w-full !py-3.5 !px-3 whitespace-nowrap">
                        Consultation
                    </Link>
                </div>
            </div>

            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-ink text-cream border-t border-white/10 relative overflow-hidden">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-white/10">
                        {/* Brand */}
                        <div className="p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
                            <div>
                                <Logo variant="full" colorClassName="text-cream" monogramSize={48} className="text-xl md:text-2xl mb-6" />
                                <p className="text-taupe text-[13px] font-medium leading-relaxed mb-4 max-w-sm">
                                    {BRAND_LINE}
                                </p>
                                <p className="text-stone text-[15px] leading-[1.8] mb-6 max-w-sm">
                                    A painting company in Houston, Texas. We paint homes and businesses
                                    inside and out, refinish cabinets, stain wood, and lay real
                                    Venetian plaster by hand.
                                </p>
                                <a href={`tel:${PHONE_TEL}`} className="btn btn-cream w-full sm:w-auto mb-3">
                                    <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                                </a>
                            </div>

                            <div className="space-y-2 pt-6 border-t border-white/10">
                                <p className="text-[15px] text-cream font-medium">Antonio Benitez</p>
                                <p className="text-[14px] text-taupe">Certified Plaster Specialist</p>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
                            <h2 className="eyebrow mb-6">Services</h2>
                            <ul className="space-y-3.5 text-[15px] text-stone mb-8">
                                {SERVICES.map((s) => (
                                    <li key={s.slug}>
                                        <Link to={`/${s.slug}`} className="hover:text-cream transition-colors">
                                            {s.label}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link to="/contact" className="hover:text-cream transition-colors">
                                        Help Picking Colors
                                    </Link>
                                </li>
                            </ul>

                            <h2 className="eyebrow mb-5">Pages</h2>
                            <ul className="space-y-3 text-[15px] text-stone">
                                <li><Link to="/" className="hover:text-cream transition-colors">Home</Link></li>
                                <li><Link to="/services" className="hover:text-cream transition-colors">All Services</Link></li>
                                <li><Link to="/areas-we-serve" className="hover:text-cream transition-colors">Areas We Serve</Link></li>
                                <li><Link to="/services#faq" className="hover:text-cream transition-colors">Questions</Link></li>
                                <li><Link to="/contact" className="hover:text-cream transition-colors">Book a Consultation</Link></li>
                            </ul>
                        </div>

                        {/* Areas */}
                        <div className="p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
                            <h2 className="eyebrow mb-6">Where we work</h2>
                            <ul className="space-y-3 text-[15px] text-stone">
                                {SERVICE_AREAS.map((area) => (
                                    <li key={area}><span className="cursor-default">{area}</span></li>
                                ))}
                            </ul>
                            <p className="mt-5 pt-5 border-t border-white/[0.08] text-[14px] text-stone/70 leading-[1.7]">
                                And the neighborhoods in between.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="p-6 md:p-12 flex flex-col justify-between">
                            <div>
                                <h2 className="eyebrow mb-6">Contact</h2>
                                <div className="space-y-3 mb-6">
                                    <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 text-[17px] font-serif font-semibold hover:text-taupe transition-colors">
                                        <Phone className="w-4 h-4 text-taupe" /> {PHONE_DISPLAY}
                                    </a>
                                    <a href="mailto:benitezantonio@live.com" className="flex items-center gap-3 text-[15px] text-stone hover:text-cream transition-colors break-all min-w-0">
                                        <Mail className="w-4 h-4 text-taupe flex-shrink-0" /> benitezantonio@live.com
                                    </a>
                                    <span className="flex items-center gap-3 text-[15px] text-stone/70">
                                        <MapPin className="w-4 h-4 text-taupe" /> Houston, Texas
                                    </span>
                                </div>

                                <div className="pt-5 border-t border-white/[0.08]">
                                    <p className="text-[15px] text-stone/80 leading-[1.8]">
                                        <span className="text-cream block mb-1 eyebrow">Hours</span>
                                        Monday to Saturday<br />
                                        8:00 AM to 6:00 PM<br />
                                        <span className="text-stone/60">Visits by appointment</span>
                                    </p>
                                </div>
                            </div>

                            <Link to="/contact" className="btn btn-outline w-full mt-8">
                                Book a Consultation <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Watermark */}
                    <div className="w-full flex items-center justify-center pt-14 pb-8 px-6 md:px-0 select-none pointer-events-none">
                        <span className="font-serif font-semibold tracking-[-0.02em] leading-none text-cream/[0.06] whitespace-nowrap" style={{ fontSize: 'min(11vw, 200px)' }}>
                            SOUTH COAST
                        </span>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/10 p-6 md:px-12 md:py-8 flex flex-col md:flex-row justify-between items-center gap-5 bg-ink-900/50">
                        <p className="text-[14px] text-stone/70 flex items-center gap-3">
                            <Monogram size={18} className="text-cream" />
                            © 2026 South Coast Quality Painting, Inc.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/privacy" className="text-[14px] text-stone hover:text-cream transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-[14px] text-stone hover:text-cream transition-colors">
                                Terms
                            </Link>
                            <a
                                href="https://quicklaunchweb.us"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[14px] text-stone/70 hover:text-cream transition-colors flex items-center gap-2"
                            >
                                Website by <span className="text-cream">QuickLaunchWeb</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
