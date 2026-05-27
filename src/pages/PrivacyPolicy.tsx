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

                <Section title="SMS / Text Messaging">
                    <p><span className="text-cream">Platform Operator Disclosure:</span> South Coast Quality Painting, Inc. uses QuickLaunchWeb as its platform operator for all SMS/text messaging. QuickLaunchWeb is the sole sender of all SMS messages. Phone numbers used for messaging are owned, registered, and operated by QuickLaunchWeb. South Coast Quality Painting, Inc. does not independently send text messages — QuickLaunchWeb sends all messages on their behalf.</p>
                    <p><span className="text-cream">Message Types:</span> All SMS messages sent through our website are service-related, non-marketing messages only. Messages include lead submission confirmations, missed call text-backs, appointment follow-ups, after-hours auto-replies, and one-time review requests after completed services.</p>
                    <p><span className="text-cream">How You Opt In:</span> Our website includes a contact/consultation form with an optional phone number field and an unchecked SMS consent checkbox (not pre-checked). You must actively check the box to opt in. The checkbox reads:</p>
                    <p className="italic text-stone/80 border-l border-taupe/40 pl-4">"I consent to receive non-marketing text messages from South Coast Quality Painting, Inc. Message frequency may vary (approximately 2–6 messages per month) and may include quote follow-ups, appointment reminders, project updates, missed call text-backs, after-hours auto-replies, and one-time review requests. Message &amp; data rates may apply. Text HELP for assistance. You may reply STOP to unsubscribe at any time. Your information will not be shared with third parties. Privacy Policy &amp; Terms."</p>
                    <p>Consent is voluntary and not required to submit the form or receive service. We capture and store proof of opt-in including timestamp, source page URL, phone number, and checkbox state.</p>
                    <p><span className="text-cream">Message Frequency:</span> Message frequency varies based on activity. Typically 1–5 messages per customer interaction.</p>
                    <p><span className="text-cream">Message and Data Rates:</span> Standard message and data rates from your mobile carrier may apply. We are not responsible for carrier charges. Major US carriers are supported including AT&amp;T, T-Mobile, Verizon, and Sprint.</p>
                    <p><span className="text-cream">Opt-Out:</span> Reply <span className="text-cream">STOP</span> to any message to immediately unsubscribe. You will receive a one-time confirmation and no further messages will be sent. To re-subscribe, reply <span className="text-cream">START</span>.</p>
                    <p><span className="text-cream">Help:</span> Reply <span className="text-cream">HELP</span> to any message for assistance, or email <a href="mailto:benitezantonio@live.com" className="text-taupe hover:text-cream transition-colors">benitezantonio@live.com</a>.</p>
                    <p><span className="text-cream">SMS Data and Privacy:</span> We do not sell, rent, or share your mobile phone number or SMS consent data with any third parties for their marketing purposes. SMS consent and opt-in data is used solely for sending the transactional messages described in this section. Opt-in records (timestamp, source URL, phone number, consent state) are retained for compliance purposes.</p>
                    <p>All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, excluding aggregators and providers of the Text Message services.</p>
                    <p>Carriers are not liable for delayed or undelivered messages.</p>
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
