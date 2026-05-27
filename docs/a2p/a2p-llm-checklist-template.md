# A2P Compliance Template — QuickLaunchWeb Client Setup

Use this template to generate A2P-compliant text for any new QuickLaunchWeb client. Replace all `{{placeholders}}` with the client's actual info.

---

## Client Info (fill these in first)

- **Business Legal Name:** {{BUSINESS_NAME_LLC}}
- **Business Website:** {{WEBSITE_URL}}
- **Business Description:** {{ONE_LINE_DESCRIPTION}} (e.g., "provides ornamental iron and metal fabrication services")
- **Support Email:** anthotranllc@gmail.com
- **Platform Operator:** QuickLaunchWeb (Anthony Tran)

---

## 1. SMS Consent Checkbox Text

Place below the phone field on the lead/contact form. Checkbox MUST be unchecked by default. Phone field must NOT be required.

```
I consent to receive SMS notifications, alerts & occasional marketing messages from {{BUSINESS_NAME_LLC}}. Message frequency may vary. Msg & data rates may apply. Text HELP for help. Reply STOP to unsubscribe. Privacy Policy & Terms.
```

"Privacy Policy" and "Terms" must be clickable links to the client's actual pages.

---

## 2. Age Confirmation

Place below the checkbox or near the submit button.

```
By submitting this form, you confirm you are at least 18 years old.
```

---

## 3. Terms of Service — SMS Section

Add to the client's Terms of Service page:

```
SMS/Text Messaging Terms

Platform Operator: {{BUSINESS_NAME_LLC}} uses QuickLaunchWeb as its platform operator for all SMS communications. QuickLaunchWeb sends all text messages on behalf of {{BUSINESS_NAME_LLC}}. All phone numbers used for messaging are owned and operated by QuickLaunchWeb under a single brand registration.

Program Name: {{BUSINESS_NAME_LLC}} SMS Program

Program Description: When you submit a contact or quote request form on our website and opt in to SMS by checking the consent checkbox, you may receive the following types of text messages:

- Lead submission confirmations
- Appointment coordination and follow-ups
- Missed call text-back notifications
- Review requests after a completed service
- After-hours auto-reply messages

You can cancel the SMS service at any time. Simply text "STOP" to the number you received messages from. Upon sending "STOP," we will confirm your unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as you did initially, and we will resume sending SMS messages to you.

If you experience issues with the messaging program, reply with the keyword HELP for more assistance, or reach out directly to anthotranllc@gmail.com.

Carriers are not liable for delayed or undelivered messages.

As always, message and data rates may apply for messages sent to you from us and to us from you. Message frequency varies. For questions about your text plan or data plan, contact your wireless provider.

For privacy-related inquiries, please refer to our Privacy Policy: {{WEBSITE_URL}}/privacy
```

---

## 4. Privacy Policy — SMS Section

Add to the client's Privacy Policy page:

```
SMS/Text Messaging

Platform Operator Disclosure: {{BUSINESS_NAME_LLC}} uses QuickLaunchWeb as its platform operator for all SMS/text messaging. QuickLaunchWeb is the sole sender of all SMS messages. Phone numbers used for messaging are owned, registered, and operated by QuickLaunchWeb. {{BUSINESS_NAME_LLC}} does not independently send text messages — QuickLaunchWeb sends all messages on their behalf.

Message Types: All SMS messages sent through our website are transactional and informational only. Messages include lead submission confirmations, missed call text-backs, appointment follow-ups, after-hours auto-replies, and one-time review requests after completed services.

How You Opt In: Our website includes a contact/quote form with a phone number field and an unchecked SMS consent checkbox (not pre-checked). You must actively check the box to opt in. The checkbox reads:

"I consent to receive SMS notifications, alerts & occasional marketing messages from {{BUSINESS_NAME_LLC}}. Message frequency may vary. Msg & data rates may apply. Text HELP for help. Reply STOP to unsubscribe. Privacy Policy & Terms."

Consent is voluntary and not required to submit the form or receive service. We capture and store proof of opt-in including timestamp, source page URL, phone number, and checkbox state.

Message Frequency: Message frequency varies based on activity. Typically 1-5 messages per customer interaction.

Message and Data Rates: Standard message and data rates from your mobile carrier may apply. We are not responsible for carrier charges. Major US carriers are supported including AT&T, T-Mobile, Verizon, and Sprint.

Opt-Out: Reply STOP to any message to immediately unsubscribe. You will receive a one-time confirmation and no further messages will be sent. To re-subscribe, reply START.

Help: Reply HELP to any message for assistance, or email anthotranllc@gmail.com.

SMS Data and Privacy: We do not sell, rent, or share your mobile phone number or SMS consent data with any third parties for their marketing purposes. SMS consent and opt-in data is used solely for sending the transactional messages described in this section. Opt-in records (timestamp, source URL, phone number, consent state) are retained for compliance purposes.

All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, excluding aggregators and providers of the Text Message services.

Carriers are not liable for delayed or undelivered messages.
```

---

## 5. GHL A2P Registration Fields

### Use Case Description
```
{{BUSINESS_NAME_LLC}} {{ONE_LINE_DESCRIPTION}}. When a customer submits a contact or quote request form on the website {{WEBSITE_URL}}, they may opt in to receive transactional SMS messages by checking an unchecked consent checkbox. Messages include lead submission confirmations, missed call text-back notifications, appointment follow-ups, and one-time review requests after a completed service. All messages are transactional and informational only — no marketing or promotional content is sent via SMS. Consent is voluntary and not required to use our services. Users can reply STOP at any time to opt out.
```

### Sample Message #1
```
Hi — {{BUSINESS_NAME_LLC}} received your request. A team member will follow up shortly. Reply STOP to opt out, HELP for help.
```

### Sample Message #2
```
Hi, you just called {{BUSINESS_NAME_LLC}}. Sorry we missed you! We'll get back to you shortly. Reply STOP to opt out, HELP for help.
```

### Opt-in Form URL
```
{{WEBSITE_URL}}
```

### How Do Contacts Opt-in to Messages?
```
Contacts opt in by submitting a contact or quote request form on {{WEBSITE_URL}}. The form includes a phone number field (not required) and an unchecked SMS consent checkbox that the user must actively check before submitting. The checkbox disclosure reads: "I consent to receive SMS notifications, alerts & occasional marketing messages from {{BUSINESS_NAME_LLC}}. Message frequency may vary. Msg & data rates may apply. Text HELP for help. Reply STOP to unsubscribe. Privacy Policy & Terms." Links to the Privacy Policy and Terms of Service are displayed next to the checkbox. Consent is voluntary and not a condition of any purchase or service. Proof of opt-in (timestamp, source URL, phone number, checkbox state) is captured and stored.
```

### Opt-in Confirmation Message
```
You're now opted in to receive SMS from {{BUSINESS_NAME_LLC}}. Msg frequency varies. Msg & data rates may apply. Reply HELP for help. Reply STOP to unsubscribe.
```

---

## 6. Pre-Submission Compliance Checklist

- [ ] Website is live with no broken links or "under construction" pages
- [ ] Business name displayed consistently (header, footer, policies)
- [ ] Services clearly explained on the website
- [ ] Privacy Policy page exists and is linked in footer
- [ ] Terms of Service page exists and is linked in footer
- [ ] Privacy Policy includes full SMS section with opt-in data exclusion clause
- [ ] Terms of Service includes full SMS section with carrier liability disclaimer
- [ ] Lead form has phone number field that is NOT required (no asterisk)
- [ ] SMS consent checkbox is NOT pre-checked
- [ ] Checkbox text includes the legal business name
- [ ] Checkbox text includes message frequency disclosure
- [ ] Checkbox text includes "Msg & data rates may apply"
- [ ] Checkbox text includes STOP opt-out instructions
- [ ] Checkbox text includes HELP instructions
- [ ] Checkbox text links to Privacy Policy & Terms
- [ ] Age confirmation text displayed near form ("at least 18 years old")
- [ ] Social media links (if any) go to actual brand pages
- [ ] Sample messages match actual website messaging use case
- [ ] No HighLevel/GHL branded links visible on site
