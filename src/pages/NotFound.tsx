import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SEO from "../hooks/useSEO";
import { Monogram } from "@/components/Logo";

const ease = [0.16, 1, 0.3, 1] as const;

export default function NotFound() {
    return (
        <div className="bg-ink w-full min-h-screen text-cream flex items-center justify-center selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Page Not Found"
                description="The page you're looking for doesn't exist. Return to South Coast Quality Painting, Inc. for Venetian plaster, architectural finishes, and painting in Houston, TX."
                path="/404"
            />
            <div className="text-center px-6 py-32">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-8"
                >
                    <Monogram size={56} className="text-cream" />
                </motion.div>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-taupe text-[11px] tracking-[0.3em] font-light uppercase block mb-6"
                >
                    Page Not Found
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.2 }}
                    className="text-7xl md:text-9xl font-serif font-light tracking-[0.02em] mb-6"
                >
                    404
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.3 }}
                    className="text-stone font-sans font-light text-sm md:text-base tracking-[0.01em] leading-relaxed max-w-md mx-auto mb-10"
                >
                    The page you're looking for doesn't exist or has been moved. Let's guide you back to South Coast.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.4 }}
                >
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-3 bg-cream text-ink px-8 py-4 text-[11px] font-sans font-light tracking-[0.25em] uppercase hover:bg-offwhite transition-all duration-500"
                    >
                        Back to Home
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
