import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Foundy',
  description: 'Terms governing your use of Foundy website management services.',
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: '1. The service',
    body: `Foundy provides turnkey website design, build, hosting, and management services to UK B2B professionals ("the Service"). By submitting a brief or subscribing to a plan, you agree to these Terms.

These Terms are governed by the laws of England and Wales. Any dispute shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
  },
  {
    title: '2. Plans and pricing',
    body: `We offer three plans:

• Founding — £75/month (introductory; limited availability; 12-month minimum term)
• Core — £90/month
• Full — £175/month

Prices are in GBP and exclusive of VAT where applicable. We reserve the right to adjust pricing on 30 days' written notice for month-to-month subscribers. Founding plan pricing is locked for the initial 12-month term.`,
  },
  {
    title: '3. Payment',
    body: `Subscriptions are billed monthly in advance via Stripe. Your first payment is taken when you approve your site preview. Invoices are issued automatically each billing cycle.

Failed payments: we will retry twice. If payment fails after three attempts, the account is suspended. Reactivation requires settlement of outstanding amounts. We reserve the right to suspend or terminate accounts with payment disputes more than 14 days overdue.`,
  },
  {
    title: '4. Your brief and content',
    body: `You are responsible for:

• Providing accurate business information in your brief.
• Supplying any brand assets (logos, images) to which you hold the rights.
• Ensuring that content you ask us to publish does not infringe third-party intellectual property, is not defamatory, and complies with applicable UK law.

We reserve the right to decline to build or publish content we reasonably consider unlawful or harmful.`,
  },
  {
    title: '5. Delivery and revisions',
    body: `We aim to deliver a site preview within 3–5 business days of receiving a complete brief. Delivery timelines are estimates, not guarantees.

Each plan includes a defined number of monthly content updates (see plan details). Structural changes (additional pages, new sections, redesigns) may require additional agreement. We will quote in writing before proceeding.`,
  },
  {
    title: '6. Intellectual property',
    body: `During your subscription, Foundy retains ownership of all site code, design systems, and infrastructure configurations. You are granted a non-exclusive licence to operate your site.

After 12 months on any active plan, and upon written request, we will transfer the site repository and all associated assets to you ("Site Transfer"). You may then self-host or continue on subscription. The genome design system remains the intellectual property of Foundy; the transfer covers your specific site implementation.

On cancellation before 12 months, we will provide a clean export of your content. The codebase transfer is conditional on completing a minimum 12-month term.`,
  },
  {
    title: '7. Hosting and uptime',
    body: `Sites are hosted on Vercel's Edge Network. We target 99.9% uptime but cannot guarantee uninterrupted service. Downtime caused by Vercel infrastructure, third-party DNS propagation, or events outside our control is excluded from any uptime commitments.

SSL certificates, DNS management, and weekly health checks are included in all plans.`,
  },
  {
    title: '8. Cancellation',
    body: `You may cancel your subscription at any time with 30 days' written notice to hello@foundy.studio.

On cancellation:
• Your site remains live for the remainder of the current billing period.
• We deliver a clean content export within 5 business days of your cancellation date.
• The site is taken offline at end of the final billing period unless you arrange alternative hosting.
• No refunds are issued for partial billing periods.

We may terminate your subscription immediately if you breach these Terms, fail to pay, or engage in conduct harmful to Foundy or its clients.`,
  },
  {
    title: '9. Limitation of liability',
    body: `To the maximum extent permitted by law, Foundy's total liability to you in connection with the Service shall not exceed the total fees paid in the 3 months preceding the claim.

We are not liable for: loss of profit, loss of business, business interruption, loss of data, or indirect or consequential losses, even if advised of the possibility of such loss.

Nothing in these Terms excludes liability for death or personal injury caused by negligence, or for fraud.`,
  },
  {
    title: '10. Changes to these Terms',
    body: `We may update these Terms. We will notify you by email at least 14 days before changes take effect for active subscribers. Continued use of the Service after the effective date constitutes acceptance of the updated Terms.`,
  },
  {
    title: '11. Contact',
    body: `Questions about these Terms: hello@foundy.studio. We aim to respond within 2 business days.`,
  },
]

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', padding: '6rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Back */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)', textDecoration: 'none', letterSpacing: '0.04em', marginBottom: '3rem' }}>
          ← foundy.studio
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '3.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.68rem', fontFamily: 'var(--font-dm-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '1rem' }}>
            Legal
          </p>
          <h1 style={{ fontFamily: 'var(--font-newsreader)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.08, marginBottom: '1rem', color: 'var(--ink)' }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>
            Last updated: 4 May 2026
          </p>
        </div>

        {/* Intro */}
        <p style={{ fontSize: '0.95rem', color: 'var(--mid)', lineHeight: 1.75, marginBottom: '3rem' }}>
          These Terms of Service ("Terms") govern your use of the Foundy website management service. Please read them carefully before submitting a brief or making payment. By using the Service you agree to these Terms in full.
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
            <Link href="/privacy" style={{ fontSize: '0.7rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)', textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link href="mailto:hello@foundy.studio" style={{ fontSize: '0.7rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)', textDecoration: 'none' }}>
              hello@foundy.studio
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
