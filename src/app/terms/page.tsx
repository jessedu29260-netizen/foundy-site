import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Foundy',
  description: 'Terms and conditions for Foundy website subscription services.',
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

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>
            Last updated: 1 May 2026
          </p>
        </div>

        {/* Intro */}
        <div style={section}>
          <p style={pStyle}>
            These Terms of Service ("Terms") govern your use of Foundy&apos;s website subscription
            services, available at fundy.studio. By submitting a brief and subscribing to a plan,
            you agree to these Terms in full.
          </p>
          <p style={pStyle}>
            "Foundy", "we", "us", and "our" refer to Foundy (trading name, UK). "You" and "client"
            refer to the individual or business purchasing a subscription.
          </p>
        </div>

        {/* Section 1 */}
        <div style={section}>
          <h2 style={h2Style}>1. The service</h2>
          <p style={pStyle}>
            Foundy provides a turnkey website subscription service for UK B2B professionals. The service
            includes domain management, DNS configuration, SSL certificate, website design and build,
            Vercel hosting, and ongoing maintenance as specified per plan.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Core plan (£90/mo)</strong> includes: domain managed,
            DNS and SSL handled, 1–5 page site, genome-matched design, 1 content update per month,
            weekly health check, and Vercel hosting.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Full plan (£175/mo)</strong> includes: everything in
            Core, plus 4 content updates per month, monthly report card PDF, 48-hour support SLA, and
            a blog or news section.
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'var(--ink)' }}>Founding plan (£75/mo)</strong> includes: everything
            in Core, priority genome selection, 12-month price lock, and direct founder access.
            Available to founding clients only.
          </p>
        </div>

        {/* Section 2 */}
        <div style={section}>
          <h2 style={h2Style}>2. Payment and billing</h2>
          <p style={pStyle}>
            Subscriptions are billed monthly in advance via Stripe. Your first payment is taken at
            checkout. Subsequent payments are collected automatically on the same date each month.
          </p>
          <p style={pStyle}>
            Site preview is provided before your first payment is due. No payment is taken until
            you approve the design preview. Once approved and payment confirmed, we proceed to go-live.
          </p>
          <p style={pStyle}>
            All prices are inclusive of UK VAT where applicable. Domain renewal costs are included
            in your subscription. We will notify you of any price changes with 30 days notice.
          </p>
        </div>

        {/* Section 3 */}
        <div style={section}>
          <h2 style={h2Style}>3. Cancellation</h2>
          <p style={pStyle}>
            You may cancel your subscription at any time with 30 days written notice to
            {' '}<a href="mailto:hello@fundy.studio" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hello@fundy.studio</a>.
            Your site will remain live until the end of the current billing period.
          </p>
          <p style={pStyle}>
            On cancellation, we will provide a clean handover: the full codebase, all assets, DNS
            transfer instructions, and any third-party credentials. No exit fees. No lock-in.
          </p>
          <p style={pStyle}>
            We reserve the right to cancel the service immediately in cases of non-payment, abuse,
            or use of the service for unlawful purposes. In such cases, a full data handover will
            still be provided.
          </p>
        </div>

        {/* Section 4 */}
        <div style={section}>
          <h2 style={h2Style}>4. Ownership and intellectual property</h2>
          <p style={pStyle}>
            All content you provide (text, logos, imagery) remains your property. We require a
            licence to use this content to build and maintain your site.
          </p>
          <p style={pStyle}>
            After 12 consecutive months on any plan, the full codebase and all assets are transferred
            to you outright. You may then self-host or continue on a maintenance subscription. The
            transfer is initiated automatically at the 12-month anniversary.
          </p>
          <p style={pStyle}>
            Prior to the 12-month mark, Foundy retains ownership of the codebase. On early cancellation,
            we provide the codebase and all assets as part of the handover package.
          </p>
          <p style={pStyle}>
            Foundy retains the right to include completed sites in its portfolio unless you request
            otherwise in writing.
          </p>
        </div>

        {/* Section 5 */}
        <div style={section}>
          <h2 style={h2Style}>5. Delivery and timelines</h2>
          <p style={pStyle}>
            We aim to deliver a site preview within 3–5 business days of receiving your brief. This
            is a target, not a guarantee. Timelines may vary based on brief complexity and current
            workload. You will be informed of any delay.
          </p>
          <p style={pStyle}>
            Content updates included in your plan are fulfilled within 5 business days of request.
            Full plan 48-hour SLA applies to support requests, not content updates.
          </p>
        </div>

        {/* Section 6 */}
        <div style={section}>
          <h2 style={h2Style}>6. Your responsibilities</h2>
          <p style={pStyle}>You agree to:</p>
          <ul style={ulStyle}>
            {[
              'Provide accurate information in your brief and intake form',
              'Ensure all content and assets you supply are owned by you or properly licensed',
              'Not use the service to publish unlawful, defamatory, or harmful content',
              'Notify us promptly of changes that affect your site (business name changes, contact updates)',
              'Respond to preview approval requests within 10 business days',
            ].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.65 }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.55rem', flexShrink: 0, marginTop: '0.4em' }}>✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 7 */}
        <div style={section}>
          <h2 style={h2Style}>7. Liability</h2>
          <p style={pStyle}>
            Foundy&apos;s liability is limited to the monthly subscription fees paid in the 3 months
            prior to any claim. We are not liable for loss of business, revenue, or data arising from
            third-party service outages (Vercel, Stripe, Porkbun, etc.).
          </p>
          <p style={pStyle}>
            We maintain 99.9% uptime targets via Vercel&apos;s infrastructure. Planned maintenance
            is performed during off-peak hours with advance notice.
          </p>
        </div>

        {/* Section 8 */}
        <div style={section}>
          <h2 style={h2Style}>8. Governing law</h2>
          <p style={pStyle}>
            These Terms are governed by the laws of England and Wales. Any disputes shall be subject
            to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </div>

        {/* Section 9 */}
        <div style={section}>
          <h2 style={h2Style}>9. Changes to these Terms</h2>
          <p style={pStyle}>
            We may update these Terms from time to time. Material changes will be communicated to
            active subscribers by email with 30 days notice before they take effect. Continued use
            of the service after that date constitutes acceptance of the updated Terms.
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
            Questions about these Terms?{' '}
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
