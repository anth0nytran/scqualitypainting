import SEO from "../hooks/useSEO";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/services";

/* Accessibility statement: commitment, standard, what we did, known
   limits, and a direct way to get help. Keep the date current when
   the site changes meaningfully. */
const ACCESSIBILITY_UPDATED = "November 8, 2026";

export default function Accessibility() {
    return (
        <div className="bg-ink w-full min-h-screen text-cream">
            <SEO
                title="Accessibility Statement"
                description="South Coast Quality Painting's commitment to an accessible website for people with disabilities, the WCAG 2.1 AA standard we follow, and how to get help."
                path="/accessibility"
            />
            <div className="max-w-3xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-24">
                <p className="eyebrow mb-4">Legal</p>
                <h1 className="font-serif font-medium text-4xl md:text-5xl text-cream mb-3">Accessibility Statement</h1>
                <p className="text-stone text-[14px] mb-12">Last reviewed {ACCESSIBILITY_UPDATED}</p>

                <div className="space-y-10 text-stone text-[16px] leading-[1.85]">
                    <section>
                        <h2 className="font-serif text-2xl text-cream mb-3">Our commitment</h2>
                        <p>
                            South Coast Quality Painting, Inc. wants everyone to be able to use this website, including
                            people who are blind or have low vision, people who are deaf or hard of hearing, and people
                            who use a keyboard, screen reader, voice control or other assistive technology.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-cream mb-3">The standard we follow</h2>
                        <p>
                            We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, published by
                            the World Wide Web Consortium. We test pages with automated tools and by hand, using a
                            keyboard only and with a screen reader.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-cream mb-3">What we have done</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Text and buttons meet WCAG AA color contrast.</li>
                            <li>Every meaningful image has a text description; decorative images are hidden from screen readers.</li>
                            <li>A "Skip to main content" link, clear headings, and labelled navigation and forms.</li>
                            <li>The whole site works with a keyboard, with a visible focus outline.</li>
                            <li>Moving content (the home page slideshow and scrolling text) has a pause button and stays still if your device is set to reduce motion.</li>
                            <li>Tap targets are at least 44 pixels on phones, and pages work when zoomed to 200%.</li>
                            <li>Links are underlined or otherwise marked so they do not rely on color alone.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-cream mb-3">Known limits</h2>
                        <p>
                            Customer reviews are shown exactly as written on Google, and some photos come from job sites.
                            If anything on this site is hard for you to use, we want to know so we can fix it.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-cream mb-3">Need help or found a problem?</h2>
                        <p>
                            Call us at{" "}
                            <a href={`tel:${PHONE_TEL}`} className="text-accent-auto underline underline-offset-4">
                                {PHONE_DISPLAY}
                            </a>{" "}
                            or email{" "}
                            <a href="mailto:benitezantonio@live.com" className="text-accent-auto underline underline-offset-4">
                                benitezantonio@live.com
                            </a>
                            . Tell us the page and the problem, and we will get you the information you need in another
                            way right away and work to fix the page. We aim to reply within two business days.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
