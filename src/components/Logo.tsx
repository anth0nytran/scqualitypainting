import { cn } from "@/lib/utils";

type LogoVariant = "full" | "monogram" | "wordmark";

interface LogoProps {
    variant?: LogoVariant;
    /** Subline under the wordmark. Defaults to the brand descriptor. */
    subline?: string;
    className?: string;
    /** Tailwind text-* class that sets the ink color (letters use currentColor). */
    colorClassName?: string;
    /** Pixel size of the monogram square. */
    monogramSize?: number;
}

/**
 * South Coast — interlocking "SC" serif monogram.
 * Renders in Cormorant Garamond; the C is rendered in the taupe accent,
 * the S inherits currentColor so the mark adapts to dark/light sections.
 */
export function Monogram({ size = 40, className }: { size?: number; className?: string }) {
    return (
        <span
            className={cn("relative inline-flex items-center justify-center flex-shrink-0", className)}
            style={{ width: size, height: size }}
            aria-hidden="true"
        >
            {/* Thin architectural frame */}
            <span className="absolute inset-0 border border-current opacity-40" />
            {/* Interlocking SC */}
            <span
                className="font-serif font-normal leading-none flex items-baseline"
                style={{ fontSize: size * 0.6, letterSpacing: "-0.06em" }}
            >
                <span className="relative z-10">S</span>
                <span className="relative z-0 -ml-[0.30em] text-taupe">C</span>
            </span>
        </span>
    );
}

export default function Logo({
    variant = "full",
    subline = "Quality Painting",
    className,
    colorClassName = "text-cream",
    monogramSize = 40,
}: LogoProps) {
    if (variant === "monogram") {
        return <Monogram size={monogramSize} className={cn(colorClassName, className)} />;
    }

    const Wordmark = (
        <span className="flex flex-col justify-center leading-none">
            <span className="font-serif font-light uppercase leading-none tracking-[0.18em]" style={{ fontSize: "1.05em" }}>
                South&nbsp;Coast
            </span>
            <span className="font-sans font-light uppercase text-taupe leading-none mt-[0.45em] tracking-[0.34em]" style={{ fontSize: "0.42em" }}>
                {subline}
            </span>
        </span>
    );

    if (variant === "wordmark") {
        return <span className={cn("inline-flex items-center", colorClassName, className)}>{Wordmark}</span>;
    }

    return (
        <span className={cn("inline-flex items-center gap-3", colorClassName, className)}>
            <Monogram size={monogramSize} />
            {Wordmark}
        </span>
    );
}
