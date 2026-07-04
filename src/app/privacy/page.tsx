import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Foundy',
  description: 'How Foundy collects, uses, and protects your personal data.',
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: '1. Who we are',
    body: `Foundy is a trading name of [Company Name] ("we", "us", "our"). We provide turnkey website design, build, and management services to UK B2B professionals. Our registered office is at [Address], United Kingdom. Questions about this policy: hello@fundy.studio.`,
  },
  {
    title: '2. Data we collect',
    body: `We collect the following categories of personal data:

• Contact data: name, work email address, and business description submitted via our brief or waitlist forms.
• Usage data: anonymised analytics (page views, scroll depth, referral source) via a privacy-first analytics provider. No cross-site tracking.
• Payment data: billing information is handled directly by Stripe. We do not store card details.
• Communications: emails you send to hello@fundy.studio and any correspondence relating to your project.`,
  },
  {
    title: '3. Why we process it',
    body: `We use your data to:

• Respond to enquiries and deliver the services you request (contractual necessity).
• Send service-related updates, invoices, and progress reports (contractual necessity).
• Improve our service through anonymised usage analytics (legitimate interest).
• Comply with legal obligations (UK law).

We do not send marketing emails without your explicit consent.`,
  },
  {
    title: '4. Legal basis (UK GDPR)',
    body: `Our processing is based on:

• Article 6(1)(b) — performance of a contract, for all service delivery.
• Article 6(1)(f) — legitimate interests, for anonymised analytics and service improvement.
• Article 6(1)(a) — consent, where you have opted into communications.`,
  },
  {
    title: '5. Data sharing',
    body: `We share data only with:

• Stripe (payment processing) — governed by Stripe's privacy policy.
• Vercel (site hosting and deployment) — EU/UK-compliant infrastructure.
• Supabase (secure database) — data stored in EU regions.
• Email service providers necessary to reply to your enquiries.

We do not sell, rent, or trade your personal data. We do not share data with advertisers.`,
  },
  {
    title: '6. Data retention',
    body: `We retain personal data for as long as necessary to deliver our services and meet our legal obligations. Client project data is kept for 6 years post-project (UK accounting requirements). Waitlist-only contacts are deleted after 12 months of inactivity unless you engage as a client.`,
  },
  {
    title: '7. Your rights',
    body: `Under UK GDPR you have the right to:

• Access a copy of the personal data we hold about you.
• Correct inaccurate data.
• Request deletion ("right to be forgotten") where no legal obligation requires retention.
• Restrict or object to processing.
• Portability — receive your data in a structured, machine-readable format.
• Withdraw consent at any time.

To exercise any right, email hello@fundy.studio. We will respond within 30 days.`,
  },
  {
    title: '8. Cookies',
    body: `Our site uses strictly necessary cookies only (session management, CSRF protection). We do not place advertising or third-party tracking cookies. Analytics are cookieless and anonymised.`,
  },
  {
    title: '9. Security',
    body: `We implement appropriate technical and organisational measures to protect your data, including TLS encryption in transit, access controls, and regular security reviews. No internet transmission is 100% secure; we cannot guarantee absolute security.`,
  },
  {
    title: '10. Changes to this policy',
    body: `We may update this policy to reflect changes in our practices or applicable law. We will post the revised policy at fundy.studio/privacy with an updated "Last updated" date. Continued use of our services after changes constitutes acceptance.`,
  },
  {
    title: '11. Complaints',
    body: `If you believe we have mishandled your data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk or call 0303 123 1113. We would appreciate the chance to address your concerns directly first — email hello@fundy.studio.`,
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', padding: '6rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Back */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)', textDecoration: 'none', letterSpacing: '0.04em', marginBottom: '3rem' }}>
          ← fundy.studio
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '3.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.68rem', fontFamily: 'var(--font-dm-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '1rem' }}>
            Legal
          </p>
          <h1 style={{ fontFamily: 'var(--font-newsreader)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.08, marginBottom: '1rem', color: 'var(--ink)' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>
            Last updated: 4 May 2026
          </p>
        </div>

        {/* Intro */}
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, marginBottom: '3rem' }}>
          Foundy takes your privacy seriously. This policy explains what personal data we collect, why we collect it, how we use and protect it, and your rights under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
        </p>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {sections.map((s) => (
            <div key={s.title} style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.875rem', color: 'var(--ink)' }}>
                {s.title}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.78, whiteSpace: 'pre-line' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>
            © 2026 Foundy · UK
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/terms" style={{ fontSize: '0.7rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)', textDecoration: 'none' }}>
              Terms of Service
            </Link>
            <Link href="mailto:hello@fundy.studio" style={{ fontSize: '0.7rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)', textDecoration: 'none' }}>
              hello@fundy.studio
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
