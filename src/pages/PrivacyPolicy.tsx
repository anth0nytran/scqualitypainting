import { motion } from "framer-motion";
import SEO from "../hooks/useSEO";

const ease = [0.16, 1, 0.3, 1] as const;
const EFFECTIVE = "May 25, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-10">
            <h2 className="font-serif font-light text-xl md:text-2xl text-cream tracking-[0.03em] mb-4">{title}</h2>
            <div className="space-y-3 text-stone font-sans font-light text-[14px] leading-[1.9] tracking-[0.01em]">{children}</div>
        </div>
    );
}

export default function PrivacyPolicy() {
    return (
        <div className="bg-ink w-full min-h-screen text-cream selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Privacy Policy"
                description="Privacy Policy for South Coast Quality Painting, Inc. — how we collect, use, and protect your information, including our SMS/mobile messaging consent policy."
                path="/privacy"
            />
            <div className="max-w-3xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-24">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
                    <p className="eyebrow mb-4">Legal</p>
                    <h1 className="font-serif font-light text-4xl md:text-5xl text-cream tracking-[0.03em] mb-3">Privacy Policy</h1>
                    <p className="text-stone/70 font-sans font-light text-[13px] tracking-[0.02em] mb-12">Effective {EFFECTIVE}</p>
                </motion.div>

                <Section title="Overview">
                    <p>South Coast Quality Painting, Inc. ("South Coast," "we," "us," or "our") respects your privacy. This policy explains what information we collect through southcoastqualitypaint.com, how we use it, and the choices you have. By using our website or contacting us, you agree to this policy.</p>
                </Section>

                <Section title="Information We Collect">
                    <p>We collect information you provide directly — your name, email address, phone number, project address, project details, and any message you send through our consultation form. We also collect limited technical and usage data (such as pages viewed and general device information) to operate and improve the site.</p>
                </Section>

                <Section title="How We Use Your Information">
                    <p>We use your information to respond to your inquiry, schedule and provide consultations and services, send confirmations and follow-ups, and — with your consent — send appointment reminders and occasional offers. We may use aggregated, non-identifying analytics to understand how the site is used.</p>
                </Section>

                <Section title="SMS / Mobile Messaging">
                    <p><span className="text-cream">No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</span> Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text-messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
                    <p>If you opt in to receive text messages, you consent to receive calls and SMS messages (including via automated technology) from South Coast about your inquiry, scheduling, and occasional offers at the number you provide. Message frequency varies. Message and data rates may apply. Reply <span className="text-cream">STOP</span> to opt out at any time, or <span className="text-cream">HELP</span> for help. Consent is not a condition of any purchase.</p>
                </Section>

                <Section title="Cookies & Analytics">
                    <p>We may use cookies and privacy-respecting analytics to measure site performance and improve the experience. You can control cookies through your browser settings.</p>
                </Section>

                <Section title="How We Share Information">
                    <p>We do not sell your personal information. We share information only with service providers that help us operate — for example, our email delivery provider and website host — and only as needed to provide our services, or when required by law. As noted above, mobile opt-in and consent data is never shared with third parties for marketing.</p>
                </Section>

                <Section title="Data Retention & Security">
                    <p>We retain your information for as long as needed to provide our services and meet legal obligations, then delete or anonymize it. We use reasonable administrative and technical safeguards to protect your information, though no method of transmission is completely secure.</p>
                </Section>

                <Section title="Your Choices">
                    <p>You may request access to, correction of, or deletion of your personal information, and you may opt out of marketing messages at any time (reply STOP to texts, or contact us). To make a request, email <a href="mailto:benitezantonio@live.com" className="text-taupe hover:text-cream transition-colors">benitezantonio@live.com</a>.</p>
                </Section>

                <Section title="Children's Privacy">
                    <p>Our services are not directed to children under 13, and we do not knowingly collect their information.</p>
                </Section>

                <Section title="Changes to This Policy">
                    <p>We may update this policy from time to time. Material changes will be reflected by updating the effective date above.</p>
                </Section>

                <Section title="Contact">
                    <p>South Coast Quality Painting, Inc.<br />Houston, Texas<br />Phone: <a href="tel:+17135398069" className="text-taupe hover:text-cream transition-colors">(713) 539-8069</a><br />Email: <a href="mailto:benitezantonio@live.com" className="text-taupe hover:text-cream transition-colors">benitezantonio@live.com</a></p>
                </Section>
            </div>
        </div>
    );
}
