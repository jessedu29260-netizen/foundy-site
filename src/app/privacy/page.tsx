import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Foundy',
  description: 'How Foundy collects, uses, and protects your personal data.',
  robots: { index: true, follow: true },
}

const section: React.CSSProperties = {
  marginBottom: '2.5rem',
}

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-fraunces)',
  fontSize: '1.35rem',
  fontWeight: 400,
  letterSpacing: '-0.02em',
  color: 'var(--ink)',
  marginBottom: '0.85rem',
  lineHeight: 1.2,
}

const pStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'var(--mid)',
  lineHeight: 1.78,
  marginBottom: '0.85rem',
}

const ulStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: '0 0 0.85rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.45rem',
}

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>

      {/* Minimal nav */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        padding: '1.25rem 0',
        background: 'var(--paper)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div className="max-w-content mx-auto px-6 flex items-center justify-between">
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }} aria-label="Foundy home">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="32" height="32" rx="5" fill="#0A0A0B"/>
              <rect x="8" y="6.5" width="3.5" height="18.5" fill="#F5F4F0"/>
              <rect x="8" y="6.5" width="16" height="3" fill="#F5F4F0"/>
              <rect x="8" y="13.5" width="11" height="2.75" fill="#F5F4F0"/>
              <rect x="12.5" y="26.5" width="9.5" height="2" rx="1" fill="#6366F1"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.1rem', letterSpacing: '-0.04em', fontWeight: 400 }}>Foundy.</span>
          </Link>
          <Link href="/" style={{ fontSize: '0.8rem', color: 'var(--mid)', textDecoration: 'none', fontFamily: 'var(--font-dm-mono)', letterSpacing: '0.04em' }}>
            ← Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) 1.5rem clamp(4rem, 8vw, 7rem)' }}>

        {/* Header */}
        <div style={{ marginBottom: '3.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '1rem' }}>
            Legal
          </p>
          <h1 style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            color: 'var(--ink)',
            marginBottom: '1rem',
          }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>
            Last updated: 1 May 2026
          </p>
        </div>

        {/* Intro */}
        <div style={section}>
          <p style={pStyle}>
            This Privacy Policy explains how Foundy ("we", "us", "our") collects, uses, and protects
            personal data you provide when using fundy.studio or our services. We operate under UK GDPR
            and the Data Protection Act 2018.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Data controller:</strong> Foundy (trading name).
            Contact us at <a href="mailto:hello@fundy.studio" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hello@fundy.studio</a> for
            all data-related requests.
          </p>
        </div>

        {/* Section 1 */}
        <div style={section}>
          <h2 style={h2Style}>1. Data we collect</h2>
          <p style={pStyle}>We collect the following personal data:</p>
          <ul style={ulStyle}>
            {[
              'Name and business email address (intake form and email capture)',
              'Brief describing your business (intake form)',
              'Plan selected at time of purchase (intake form)',
              'Payment data (processed by Stripe — we do not store card details)',
              'IP address and browser data via Vercel Analytics (anonymised)',
            ].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.65 }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.55rem', flexShrink: 0, marginTop: '0.4em' }}>✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2 */}
        <div style={section}>
          <h2 style={h2Style}>2. How we use your data</h2>
          <p style={pStyle}>We use your data to:</p>
          <ul style={ulStyle}>
            {[
              'Deliver the website service you have subscribed to',
              'Select and build the genome design identity matched to your brief',
              'Process subscription payments and manage billing',
              'Send genome recommendations to email capture subscribers',
              'Provide support and respond to enquiries',
              'Send monthly site report cards (Full plan)',
            ].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.65 }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.55rem', flexShrink: 0, marginTop: '0.4em' }}>✦</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Lawful basis:</strong> Contract performance (service delivery)
            and legitimate interests (communications with subscribers who have opted in).
          </p>
        </div>

        {/* Section 3 */}
        <div style={section}>
          <h2 style={h2Style}>3. Data retention</h2>
          <p style={pStyle}>
            Client data is retained for the duration of the active subscription and for 12 months after
            cancellation, for handover and audit purposes. Email capture data is retained until you
            unsubscribe or request deletion. Payment records are retained for 7 years as required by
            UK law.
          </p>
        </div>

        {/* Section 4 */}
        <div style={section}>
          <h2 style={h2Style}>4. Third-party processors</h2>
          <p style={pStyle}>We share data only with trusted processors required to deliver the service:</p>
          <ul style={ulStyle}>
            {[
              'Stripe — payment processing (UK/EU data processing agreement in place)',
              'Supabase — client record storage (EU-hosted)',
              'Vercel — site hosting and edge delivery',
              'Zoho Mail — email (EU data centre)',
              'Resend — transactional email delivery',
            ].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.65 }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.55rem', flexShrink: 0, marginTop: '0.4em' }}>✦</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={pStyle}>We do not sell your data to any third party.</p>
        </div>

        {/* Section 5 */}
        <div style={section}>
          <h2 style={h2Style}>5. Your rights</h2>
          <p style={pStyle}>Under UK GDPR you have the right to:</p>
          <ul style={ulStyle}>
            {[
              'Access the personal data we hold about you',
              'Request correction of inaccurate data',
              'Request erasure of your data',
              'Object to processing based on legitimate interests',
              'Request data portability',
              'Withdraw consent at any time (where processing is consent-based)',
            ].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.65 }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.55rem', flexShrink: 0, marginTop: '0.4em' }}>✦</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={pStyle}>
            To exercise any right, email <a href="mailto:hello@fundy.studio" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hello@fundy.studio</a>.
            We will respond within 30 days. You also have the right to lodge a complaint with the
            Information Commissioner&apos;s Office (ICO) at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>ico.org.uk</a>.
          </p>
        </div>

        {/* Section 6 */}
        <div style={section}>
          <h2 style={h2Style}>6. Cookies</h2>
          <p style={pStyle}>
            fundy.studio uses no third-party tracking cookies. Vercel may set functional cookies required
            for site delivery. We do not run advertising pixels or analytics cookies that identify
            individual users.
          </p>
        </div>

        {/* Section 7 */}
        <div style={section}>
          <h2 style={h2Style}>7. Changes to this policy</h2>
          <p style={pStyle}>
            We may update this policy from time to time. Material changes will be communicated to active
            subscribers by email. The current version is always available at fundy.studio/privacy.
          </p>
        </div>

        {/* Contact */}
        <div style={{
          marginTop: '3rem',
          padding: '1.75rem 2rem',
          background: 'var(--paper-warm)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
        }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.7, margin: 0 }}>
            Questions about this policy?{' '}
            <a href="mailto:hello@fundy.studio" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hello@fundy.studio</a>
            {' '}— we respond within 24 hours.
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 0', background: 'var(--paper-deep)' }}>
        <div className="max-w-content mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p style={{ fontSize: '0.7rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>© 2026 Foundy · UK</p>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            {[['/', 'Home'], ['/privacy', 'Privacy'], ['/terms', 'Terms']].map(([href, label]) => (
              <Link key={label} href={href} style={{ fontSize: '0.75rem', color: 'var(--mid)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </nav>
        </div>
      </footer>

    </div>
  )
}
