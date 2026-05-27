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

export default function Terms() {
    return (
        <div className="bg-ink w-full min-h-screen text-cream selection:bg-taupe selection:text-offwhite">
            <SEO
                title="Terms of Service"
                description="Terms of Service for South Coast Quality Painting, Inc., including our SMS messaging program terms, estimates policy, and conditions of use."
                path="/terms"
            />
            <div className="max-w-3xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-24">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
                    <p className="eyebrow mb-4">Legal</p>
                    <h1 className="font-serif font-light text-4xl md:text-5xl text-cream tracking-[0.03em] mb-3">Terms of Service</h1>
                    <p className="text-stone/70 font-sans font-light text-[13px] tracking-[0.02em] mb-12">Effective {EFFECTIVE}</p>
                </motion.div>

                <Section title="Acceptance of Terms">
                    <p>By accessing southcoastqualitypaint.com or engaging South Coast Quality Painting, Inc. ("South Coast"), you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use the site.</p>
                </Section>

                <Section title="Eligibility & Age Restriction">
                    <p>You must be at least <span className="text-cream">18 years of age</span> to use this website, submit any form, opt in to receive SMS messages from us, or otherwise engage our services. By using the site or submitting a form, you represent and warrant that you are 18 years of age or older. We do not knowingly collect information from, send SMS messages to, or contract with anyone under the age of 18. Our consultation form includes a required confirmation checkbox that the submitter is at least 18.</p>
                </Section>

                <Section title="Our Services">
                    <p>South Coast provides Venetian and Tadelakt plaster, microcement and architectural finishes, residential and commercial painting, exterior painting, and cabinetry finishing. Descriptions on this site are for general information and do not constitute a binding offer.</p>
                </Section>

                <Section title="Estimates & Consultations">
                    <p>Consultations are complimentary and carry no obligation. Any pricing discussed before an in-person assessment is an estimate only. Final scope, materials, and pricing are confirmed in a written proposal agreed by both parties.</p>
                </Section>

                <Section title="SMS / Text Messaging Terms">
                    <p><span className="text-cream">Platform Operator:</span> South Coast Quality Painting, Inc. uses QuickLaunchWeb as its platform operator for all SMS communications. QuickLaunchWeb sends all text messages on behalf of South Coast Quality Painting, Inc. All phone numbers used for messaging are owned and operated by QuickLaunchWeb under a single brand registration.</p>
                    <p><span className="text-cream">Program Name:</span> South Coast Quality Painting, Inc. SMS Program</p>
                    <p><span className="text-cream">Program Description:</span> When you submit a contact or consultation request form on our website and opt in to SMS by checking the consent checkbox, you may receive the following types of text messages:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Lead submission confirmations</li>
                        <li>Appointment coordination and follow-ups</li>
                        <li>Missed call text-back notifications</li>
                        <li>Review requests after a completed service</li>
                        <li>After-hours auto-reply messages</li>
                    </ul>
                    <p>You can cancel the SMS service at any time. Simply text <span className="text-cream">STOP</span> to the number you received messages from. Upon sending "STOP," we will confirm your unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as you did initially, and we will resume sending SMS messages to you.</p>
                    <p>If you experience issues with the messaging program, reply with the keyword <span className="text-cream">HELP</span> for more assistance, or reach out directly to <a href="mailto:benitezantonio@live.com" className="text-taupe hover:text-cream transition-colors">benitezantonio@live.com</a>.</p>
                    <p>Carriers are not liable for delayed or undelivered messages.</p>
                    <p>As always, message and data rates may apply for messages sent to you from us and to us from you. Message frequency varies. For questions about your text plan or data plan, contact your wireless provider.</p>
                    <p>Consent is not a condition of any purchase or service. For privacy-related inquiries, please refer to our <a href="/privacy" className="text-taupe hover:text-cream transition-colors">Privacy Policy</a>.</p>
                </Section>

                <Section title="Use of the Website">
                    <p>You agree to use the site lawfully and not to interfere with its operation or attempt unauthorized access. All content, imagery, and branding on this site are the property of South Coast or its licensors and may not be reproduced without permission.</p>
                </Section>

                <Section title="Disclaimers & Limitation of Liability">
                    <p>The site is provided "as is" without warranties of any kind. To the fullest extent permitted by law, South Coast is not liable for indirect or incidental damages arising from your use of the site. Nothing here limits the warranties or obligations stated in a signed project agreement.</p>
                </Section>

                <Section title="Governing Law">
                    <p>These terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles.</p>
                </Section>

                <Section title="Changes to These Terms">
                    <p>We may update these Terms of Service from time to time. Material changes will be reflected by updating the "Effective" date at the top of this page. Your continued use of the site after changes are posted constitutes acceptance of the updated terms.</p>
                </Section>

                <Section title="Contact">
                    <p>South Coast Quality Painting, Inc.<br />Houston, Texas<br />Phone: <a href="tel:+17135398069" className="text-taupe hover:text-cream transition-colors">(713) 539-8069</a><br />Email: <a href="mailto:benitezantonio@live.com" className="text-taupe hover:text-cream transition-colors">benitezantonio@live.com</a></p>
                </Section>
            </div>
        </div>
    );
}
