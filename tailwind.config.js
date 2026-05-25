/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // Display / headlines — elegant high-contrast serif
                serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
                // Body / supporting — light geometric sans
                sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
            },
            colors: {
                // ---- South Coast brand palette ----
                ink: {
                    DEFAULT: "#111111", // Matte Black — primary dark bg
                    900: "#0d0d0d",
                    800: "#161616",
                    700: "#1c1b19",
                    600: "#242220",
                },
                cream: "#E8DDD0",     // Warm Cream — main text on dark
                offwhite: "#F5F2EC",  // Soft Off-White — light bg / clean balance
                stone: {
                    DEFAULT: "#B8B1A7", // Warm Stone — neutral architectural tone
                    light: "#CFC8BD",
                    dark: "#9A8F80",
                },
                taupe: {
                    DEFAULT: "#8C7B6B", // Taupe Brown — warm luxury accent
                    light: "#A8967F",
                    dark: "#6E6052",
                },

                // ---- Shadcn token bridge (driven by CSS vars in index.css) ----
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))"
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))"
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))"
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))"
                },
                // accent === Taupe Brown (replaces the old bright yellow)
                accent: {
                    DEFAULT: "#8C7B6B",
                    foreground: "#F5F2EC"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))"
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))"
                }
            },
            letterSpacing: {
                luxe: "0.06em",
                wide2: "0.18em",
                eyebrow: "0.3em",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            keyframes: {
                "soft-fade": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
}
