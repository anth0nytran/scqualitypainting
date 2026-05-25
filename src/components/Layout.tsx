import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo, { Monogram } from "@/components/Logo";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            // Small delay so the target page renders before scrolling
            setTimeout(() => {
                const el = document.querySelector(location.hash);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [mobileMenuOpen]);

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-offwhite text-ink font-sans selection:bg-taupe selection:text-offwhite">
            {/* Navigation */}
            <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-50">
                <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                        top: scrolled ? '10px' : '0px',
                        width: scrolled ? 'min(56rem, calc(100% - 2rem))' : '100%',
                        height: scrolled ? '52px' : '72px',
                        backgroundColor: scrolled ? 'rgba(17,17,17,0.92)' : 'transparent',
                        borderRadius: scrolled ? '9999px' : '0px',
                        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
                        border: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                        backdropFilter: scrolled ? 'blur(24px)' : 'none',
                        transition: 'background-color 400ms cubic-bezier(0.22,1,0.36,1), backdrop-filter 400ms cubic-bezier(0.22,1,0.36,1), border-color 400ms cubic-bezier(0.22,1,0.36,1), border-radius 700ms cubic-bezier(0.22,1,0.36,1), width 900ms cubic-bezier(0.22,1,0.36,1), height 700ms cubic-bezier(0.22,1,0.36,1), top 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                />

                <div className={cn(
                    "relative z-10 flex items-center justify-between mx-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    scrolled
                        ? "max-w-3xl md:max-w-4xl px-6 h-[52px] mt-2.5"
                        : "max-w-none px-6 md:px-12 h-[72px]"
                )}>
                    <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="cursor-pointer flex items-center"
                    >
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

                    <div className="hidden md:flex items-center gap-8 text-[11px] font-light tracking-[0.25em] uppercase text-cream">
                        <Link to="/" className={cn("hover:text-stone transition-colors relative group", isActive("/") && "text-taupe")}>
                            Home
                            <span className={cn("absolute -bottom-1 left-0 h-px bg-cream transition-all duration-300", isActive("/") ? "w-full bg-taupe" : "w-0 group-hover:w-full")} />
                        </Link>
                        <Link to="/services" className={cn("hover:text-stone transition-colors relative group", isActive("/services") && "text-taupe")}>
                            Services
                            <span className={cn("absolute -bottom-1 left-0 h-px bg-cream transition-all duration-300", isActive("/services") ? "w-full bg-taupe" : "w-0 group-hover:w-full")} />
                        </Link>
                        <Link
                            to="/contact"
                            className={cn(
                                "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                scrolled
                                    ? "px-5 py-1.5 border border-cream/30 text-cream hover:bg-cream hover:text-ink rounded-full text-[10px]"
                                    : "px-5 py-2 border border-cream bg-cream text-ink hover:bg-transparent hover:text-cream"
                            )}
                        >
                            Book Consultation
                        </Link>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden uppercase text-[11px] tracking-[0.25em] font-light text-cream"
                    >
                        Menu
                    </button>
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
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b border-white/[0.08]">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                                <Logo variant="full" colorClassName="text-cream" monogramSize={28} className="text-sm" />
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                                <X className="w-6 h-6 text-cream" />
                            </button>
                        </div>

                        {/* Main Nav Links */}
                        <div className="p-5 border-b border-white/[0.08]">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Services", path: "/services" },
                                { name: "Contact", path: "/contact" },
                            ].map((route, i) => (
                                <motion.div
                                    key={route.name}
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 + i * 0.06 }}
                                >
                                    <Link
                                        to={route.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center justify-between py-3.5 text-3xl font-serif font-light tracking-[0.02em] transition-colors",
                                            isActive(route.path) ? "text-taupe" : "text-cream hover:text-stone"
                                        )}
                                    >
                                        {route.name}
                                        <ArrowRight className="w-4 h-4 text-stone/60" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Links */}
                        <div className="p-5 border-b border-white/[0.08]">
                            <span className="text-[11px] font-light tracking-[0.3em] uppercase text-taupe block mb-3">Quick Links</span>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                                {[
                                    { name: "Venetian Plaster", path: "/services#plaster" },
                                    { name: "Cabinetry Finishing", path: "/services#cabinetry" },
                                    { name: "Free Consultation", path: "/contact" },
                                    { name: "Our Process", path: "/services#process" },
                                    { name: "Reviews", path: "/services#reviews" },
                                    { name: "FAQ", path: "/services#faq" },
                                ].map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-[13px] font-sans font-light text-stone hover:text-cream transition-colors py-1"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="p-5 border-b border-white/[0.08] space-y-3">
                            <span className="text-[11px] font-light tracking-[0.3em] uppercase text-taupe block mb-3">Get in Touch</span>
                            <a href="tel:+17135398069" className="flex items-center gap-3 text-sm font-sans font-light text-cream">
                                <Phone className="w-3.5 h-3.5 text-taupe" /> (713) 539-8069
                            </a>
                            <a href="mailto:benitezantonio@live.com" className="flex items-center gap-3 text-sm font-sans font-light text-stone">
                                <Mail className="w-3.5 h-3.5 text-taupe" /> benitezantonio@live.com
                            </a>
                            <span className="flex items-center gap-3 text-sm font-sans font-light text-stone/70">
                                <MapPin className="w-3.5 h-3.5 text-taupe" /> Houston, Texas
                            </span>
                        </div>

                        {/* Bottom CTA */}
                        <div className="p-5 mt-auto">
                            <Link
                                to="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="group flex items-center justify-center gap-3 w-full bg-cream text-ink py-4 text-[11px] font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-colors duration-500"
                            >
                                Book a Free Consultation
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <p className="text-[9px] text-stone/60 uppercase tracking-[0.2em] text-center mt-3">
                                Antonio Benitez · Plaster Specialist · Houston, TX
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky Mobile CTA Bar */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                scrolled && !mobileMenuOpen ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="bg-ink/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
                    <Link
                        to="/contact"
                        className="flex items-center justify-between w-full group"
                    >
                        <div>
                            <span className="block text-[10px] font-light tracking-[0.3em] text-taupe uppercase mb-0.5">Complimentary</span>
                            <span className="block text-cream text-[15px] font-serif font-light tracking-[0.02em]">Book a Color &amp; Finish Consultation</span>
                        </div>
                        <div className="bg-cream text-ink w-10 h-10 flex items-center justify-center flex-shrink-0 group-active:scale-95 transition-transform">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>
                </div>
            </div>

            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-ink text-cream border-t border-white/10 relative overflow-hidden">
                <div className="max-w-[1800px] mx-auto">
                    {/* Top Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/10">
                        {/* Brand Column */}
                        <div className="p-6 md:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
                            <div>
                                <Logo variant="full" colorClassName="text-cream" monogramSize={48} className="text-xl md:text-2xl mb-6" />
                                <p className="text-stone text-[12px] md:text-[13px] leading-[1.9] font-light tracking-[0.01em] mb-8 max-w-sm">
                                    A boutique architectural-finishes studio in Houston. Hand-applied Venetian and Tadelakt plaster, microcement, and considered painting — where craftsmanship becomes architecture.
                                </p>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/10">
                                <p className="text-[11px] uppercase tracking-[0.3em] text-cream font-light">Antonio Benitez</p>
                                <p className="text-[10px] text-stone/70 font-light tracking-wide">Plaster Specialist · Houston, TX</p>
                            </div>
                        </div>

                        {/* Navigation + Services */}
                        <div className="p-6 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                            <h4 className="text-[10px] font-light tracking-[0.3em] uppercase text-taupe mb-6 flex items-center gap-3">
                                <span className="w-4 h-px bg-stone/40" /> Pages
                            </h4>
                            <ul className="space-y-3.5 text-[11px] font-light tracking-[0.2em] uppercase text-stone mb-8">
                                <li><Link to="/" className="hover:text-cream transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-cream transition-all duration-300" />Home</Link></li>
                                <li><Link to="/services" className="hover:text-cream transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-cream transition-all duration-300" />Services</Link></li>
                                <li><Link to="/contact" className="hover:text-cream transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-cream transition-all duration-300" />Contact</Link></li>
                            </ul>

                            <h4 className="text-[10px] font-light tracking-[0.3em] uppercase text-taupe mb-5 flex items-center gap-3">
                                <span className="w-4 h-px bg-stone/40" /> Services
                            </h4>
                            <ul className="space-y-3 text-[11px] font-light tracking-wide text-stone">
                                <li><Link to="/services#plaster" className="hover:text-cream transition-colors">Venetian &amp; Tadelakt Plaster</Link></li>
                                <li><Link to="/services#residential" className="hover:text-cream transition-colors">Residential Painting</Link></li>
                                <li><Link to="/services#commercial" className="hover:text-cream transition-colors">Commercial Painting</Link></li>
                                <li><Link to="/services#exterior" className="hover:text-cream transition-colors">Exterior Painting</Link></li>
                                <li><Link to="/services#cabinetry" className="hover:text-cream transition-colors">Cabinetry Finishing</Link></li>
                                <li><Link to="/contact" className="hover:text-cream transition-colors">Color Consultation</Link></li>
                            </ul>
                        </div>

                        {/* Areas */}
                        <div className="p-6 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                            <h4 className="text-[10px] font-light tracking-[0.3em] uppercase text-taupe mb-6 flex items-center gap-3">
                                <span className="w-4 h-px bg-stone/40" /> Areas We Serve
                            </h4>
                            <ul className="space-y-3 text-[11px] font-light tracking-wide text-stone">
                                {[
                                    "Houston",
                                    "River Oaks",
                                    "Memorial",
                                    "Bellaire",
                                    "West University Place",
                                    "The Woodlands",
                                    "Sugar Land",
                                    "Katy",
                                    "Cypress",
                                    "Spring",
                                    "Pearland",
                                    "Friendswood",
                                    "League City",
                                    "Missouri City",
                                    "Richmond",
                                    "Kingwood",
                                ].map((area) => (
                                    <li key={area}><span className="cursor-default hover:text-cream transition-colors">{area}</span></li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="p-6 md:p-12 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[10px] font-light tracking-[0.3em] uppercase text-taupe mb-6 flex items-center gap-3">
                                    <span className="w-4 h-px bg-stone/40" /> Contact
                                </h4>
                                <div className="space-y-3 mb-6">
                                    <a href="tel:+17135398069" className="flex items-center gap-3 text-base font-serif font-light hover:text-taupe transition-colors">
                                        <Phone className="w-3.5 h-3.5 text-taupe" /> (713) 539-8069
                                    </a>
                                    <a href="mailto:benitezantonio@live.com" className="flex items-center gap-3 text-sm font-sans font-light text-stone hover:text-cream transition-colors">
                                        <Mail className="w-3.5 h-3.5 text-taupe" /> benitezantonio@live.com
                                    </a>
                                    <span className="flex items-center gap-3 text-sm font-sans font-light text-stone/70">
                                        <MapPin className="w-3.5 h-3.5 text-taupe" /> Houston, Texas
                                    </span>
                                </div>

                                <div className="pt-5 border-t border-white/[0.08]">
                                    <p className="text-[11px] text-stone/70 font-light leading-[1.9]">
                                        <span className="text-cream block mb-1 text-[10px] font-light uppercase tracking-[0.3em]">Hours</span>
                                        Mon–Sat, 8:00 AM – 6:00 PM<br />
                                        <span className="italic">Consultations by appointment.</span>
                                    </p>
                                </div>
                            </div>

                            <Link
                                to="/contact"
                                className="group flex items-center justify-center gap-2 w-full py-3.5 mt-8 border border-cream/20 text-[10px] font-light uppercase tracking-[0.25em] text-cream hover:bg-cream hover:text-ink transition-all duration-500"
                            >
                                Book a Free Consultation <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Watermark */}
                    <div className="w-full flex items-center justify-center pt-16 pb-10 px-6 md:px-0 select-none pointer-events-none">
                        <span className="font-serif font-light tracking-[0.04em] leading-none text-cream/5 whitespace-nowrap" style={{ fontSize: 'min(11vw, 200px)' }}>
                            SOUTH COAST
                        </span>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/10 p-6 md:px-12 md:py-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-ink-900/50">
                        <p className="text-[10px] text-stone/70 uppercase tracking-[0.25em] font-light flex items-center gap-3">
                            <Monogram size={18} className="text-cream" />
                            © 2026 South Coast Quality Painting, Inc.
                        </p>
                        <div className="flex gap-6">
                            <a
                                href="https://quicklaunchweb.us"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-stone/70 uppercase tracking-[0.25em] font-light hover:text-cream transition-colors flex items-center gap-2"
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
