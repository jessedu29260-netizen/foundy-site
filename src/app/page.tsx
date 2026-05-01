'use client'

import Link from 'next/link'
import { GENOMES } from '@/lib/genomes.config'

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="nav-bar">
      <div className="flex items-center justify-between w-full max-w-content mx-auto">
        {/* Logo */}
        <span
          className="display text-xl font-medium tracking-tight"
          style={{ fontFamily: 'var(--font-fraunces)', letterSpacing: '-0.03em' }}
        >
          Foundy.
        </span>

        {/* Centre pill */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full"
          style={{
            background: 'rgba(99,102,241,0.1)',
            color: 'var(--accent)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-current"
            style={{ animation: 'pulse 2s infinite' }}
          />
          5 founding slots · £75/mo — 7 days remaining
        </div>

        {/* CTA */}
        <a href="#intake" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
          Get started →
        </a>
      </div>
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-section overflow-hidden"
      style={{ background: 'var(--ink)', color: 'var(--paper)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,244,240,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,244,240,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-content mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <p className="section-number text-paper mb-6 fade-up">01 / The offer</p>
            <h1
              className="fade-up fade-up-1 mb-8"
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                lineHeight: '1.06',
                letterSpacing: '-0.03em',
                fontWeight: 400,
              }}
            >
              The last time you&rsquo;ll think about your website.
            </h1>
            <p
              className="fade-up fade-up-2 text-lg mb-10 leading-relaxed"
              style={{ color: 'rgba(245,244,240,0.6)', maxWidth: '42ch' }}
            >
              Turnkey digital presence for UK consultants. One brief. We handle
              domain, DNS, design, build, and everything after.{' '}
              <strong style={{ color: 'var(--paper)', fontWeight: 500 }}>£90 per month.</strong>
            </p>

            <div className="fade-up fade-up-3 flex flex-wrap gap-4 mb-10">
              <a href="#intake" className="btn-primary">
                Claim founding slot — £75/mo →
              </a>
              <a href="#genomes" className="btn-ghost">
                See our work ↓
              </a>
            </div>

            {/* Proof strip */}
            <div
              className="fade-up fade-up-4 flex flex-wrap gap-6 text-sm"
              style={{ color: 'rgba(245,244,240,0.4)' }}
            >
              <span>✦ 3-5 day delivery</span>
              <span>✦ 100 Lighthouse score</span>
              <span>✦ You own it after 12 months</span>
              <span>✦ UK-managed</span>
            </div>
          </div>

          {/* Right: Genome mosaic */}
          <div className="hidden lg:grid grid-cols-4 gap-2" aria-hidden="true">
            {GENOMES.map((genome, i) => (
              <div
                key={genome.id}
                className="rounded-md overflow-hidden"
                style={{
                  background: genome.primaryColor,
                  aspectRatio: i % 3 === 0 ? '1 / 1.4' : '1 / 1',
                  border: '1px solid rgba(245,244,240,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '0.6rem',
                  gridColumn: i === 0 ? 'span 2' : undefined,
                }}
              >
                <span
                  style={{
                    fontFamily: genome.fontDisplay,
                    fontSize: '0.6rem',
                    color: genome.textColor,
                    opacity: 0.5,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {genome.id} {genome.name}
                </span>
                {genome.accentColor && (
                  <div
                    className="mt-1 h-0.5 rounded-full w-8"
                    style={{ background: genome.accentColor }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Tech Trust Bar ────────────────────────────────────────────────────────────
function TrustBar() {
  const tech = ['Next.js 15', 'Vercel', 'Stripe', 'Porkbun DNS', 'TypeScript', 'Tailwind']
  return (
    <section
      className="py-8 border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--paper-warm)' }}
    >
      <div className="max-w-content mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs section-number">Built on enterprise infrastructure</p>
        <div className="flex flex-wrap gap-6">
          {tech.map(t => (
            <span
              key={t}
              className="text-sm font-medium"
              style={{ color: 'var(--mid)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Gap Section ───────────────────────────────────────────────────────────────
function GapSection() {
  const agency = [
    ['£5,000–20,000', 'upfront project fee'],
    ['8–12 weeks', 'before you go live'],
    ['20+ emails', 'of feedback rounds'],
    ['£300–800/mo', 'ongoing retainer'],
    ['You own nothing', 'until they say so'],
    ['Maintenance?', 'That\'s extra'],
  ]

  const foundy = [
    ['£90/month', 'no setup fee, no surprises'],
    ['3–5 days', 'from brief to live'],
    ['One form', 'that\'s your only input'],
    ['Included', 'everything managed'],
    ['You own it', 'after 12 months, outright'],
    ['Managed forever', 'we handle every update'],
  ]

  return (
    <section
      id="gap"
      className="py-section"
      style={{ background: 'var(--ink)', color: 'var(--paper)' }}
    >
      <div className="max-w-content mx-auto px-6">
        <p className="section-number text-paper mb-4">02 / The alternative</p>
        <h2
          className="mb-16"
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400,
            maxWidth: '24ch',
          }}
        >
          Two ways to get a website. One obvious choice.
        </h2>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: 'rgba(245,244,240,0.08)' }}>
          {/* Agency */}
          <div className="p-8 md:p-12" style={{ background: 'var(--ink)' }}>
            <p
              className="text-xs uppercase tracking-widest mb-8 font-medium"
              style={{ color: 'rgba(245,244,240,0.35)' }}
            >
              The agency route
            </p>
            <div className="space-y-5">
              {agency.map(([value, label]) => (
                <div key={value} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 text-xs"
                    style={{ color: 'rgba(245,244,240,0.25)', fontFamily: 'var(--font-dm-mono)' }}
                  >
                    ✕
                  </span>
                  <div>
                    <span
                      className="block font-medium"
                      style={{
                        color: 'rgba(245,244,240,0.5)',
                        textDecoration: 'line-through',
                        textDecorationColor: 'rgba(245,244,240,0.2)',
                      }}
                    >
                      {value}
                    </span>
                    <span className="text-sm" style={{ color: 'rgba(245,244,240,0.3)' }}>
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Foundy */}
          <div
            className="p-8 md:p-12"
            style={{ background: 'rgba(99,102,241,0.07)', borderLeft: '1px solid rgba(99,102,241,0.2)' }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-8 font-medium"
              style={{ color: 'var(--accent)' }}
            >
              The Foundy route
            </p>
            <div className="space-y-5">
              {foundy.map(([value, label]) => (
                <div key={value} className="flex items-start gap-4">
                  <span className="mt-0.5 text-xs" style={{ color: 'var(--accent)' }}>✦</span>
                  <div>
                    <span className="block font-medium" style={{ color: 'var(--paper)' }}>
                      {value}
                    </span>
                    <span className="text-sm" style={{ color: 'rgba(245,244,240,0.5)' }}>
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Brief',
      body: 'Fill one form. Tell us what your business does, who you serve, and how you want to be perceived. Takes 15 minutes. That is your only input.',
    },
    {
      n: '02',
      title: 'Build',
      body: 'We select the genome that matches your personality, populate it with your content, connect your domain, wire Stripe if needed, and deploy to Vercel. You do not see the code. You see the result.',
    },
    {
      n: '03',
      title: 'Live',
      body: 'Your site is live in 3–5 days. We manage DNS, SSL, updates, health checks, and a monthly report card. You focus on your clients.',
    },
  ]

  return (
    <section id="process" className="py-section" style={{ background: 'var(--paper)' }}>
      <div className="max-w-content mx-auto px-6">
        <p className="section-number mb-4">03 / Process</p>
        <h2
          className="mb-16"
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400,
            maxWidth: '20ch',
          }}
        >
          Three steps. Then nothing — until you want a change.
        </h2>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
          {steps.map(step => (
            <div
              key={step.n}
              className="p-8"
              style={{ background: 'var(--paper)' }}
            >
              <span
                className="block mb-6 text-3xl"
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  color: 'var(--faint)',
                  fontWeight: 300,
                }}
              >
                {step.n}
              </span>
              <h3
                className="text-xl font-medium mb-4"
                style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 400 }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)' }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Genome Gallery ────────────────────────────────────────────────────────────
function GenomeGallery() {
  return (
    <section
      id="genomes"
      className="py-section"
      style={{ background: 'var(--ink)', color: 'var(--paper)' }}
    >
      <div className="max-w-content mx-auto px-6">
        <p className="section-number text-paper mb-4">04 / Design</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 400,
              maxWidth: '22ch',
            }}
          >
            Eight genomes. Each a complete design personality.
          </h2>
          <p className="text-sm max-w-xs" style={{ color: 'rgba(245,244,240,0.45)' }}>
            We read your brief and select the genome that fits how you work and who
            you serve. You never see a dropdown of templates.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GENOMES.map(genome => (
            <div
              key={genome.id}
              className="genome-card"
              style={{ background: genome.primaryColor }}
            >
              {/* Colour accent stripe */}
              <div
                className="h-1"
                style={{ background: genome.accentColor }}
              />

              <div className="p-5">
                {/* ID */}
                <span
                  className="block text-xs mb-3"
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    color: genome.textColor,
                    opacity: 0.35,
                    letterSpacing: '0.1em',
                  }}
                >
                  {genome.id}
                </span>

                {/* Name */}
                <h3
                  className="text-lg mb-1"
                  style={{
                    fontFamily: genome.fontDisplay + ', serif',
                    color: genome.textColor,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {genome.name}
                </h3>

                {/* Tagline */}
                <p
                  className="text-xs mb-4"
                  style={{ color: genome.textColor, opacity: 0.5 }}
                >
                  {genome.tagline}
                </p>

                {/* Best for */}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: genome.textColor, opacity: 0.35 }}
                >
                  {genome.bestFor.slice(0, 2).join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function Pricing() {
  const tiers = [
    {
      name: 'Founding',
      price: '£75',
      period: '/mo · locked 12 months',
      tag: '5 slots only',
      tagColor: 'var(--accent)',
      features: [
        'Everything in Core',
        'Priority genome selection',
        '12-month price lock',
        'Case study rights (mutual)',
        'Direct founder access',
      ],
      cta: 'Claim founding slot →',
      featured: true,
      note: 'Saves £180 vs standard. Closes in 7 days.',
    },
    {
      name: 'Core',
      price: '£90',
      period: '/mo',
      tag: null,
      features: [
        'Domain managed',
        'DNS & SSL handled',
        '1–5 page site',
        'Genome-selected design',
        '1 content update/month',
        'Weekly health check',
        'Vercel hosting',
      ],
      cta: 'Get started →',
      featured: false,
      note: null,
    },
    {
      name: 'Full',
      price: '£175',
      period: '/mo',
      tag: null,
      features: [
        'Everything in Core',
        '4 content updates/month',
        'Monthly report card PDF',
        '48h support SLA',
        'Blog or news section',
        'Priority genome selection',
      ],
      cta: 'Get started →',
      featured: false,
      note: null,
    },
  ]

  return (
    <section id="pricing" className="py-section" style={{ background: 'var(--paper)' }}>
      <div className="max-w-content mx-auto px-6">
        <p className="section-number mb-4">05 / Investment</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 400,
              maxWidth: '20ch',
            }}
          >
            One price. Everything included.
          </h2>
          <p className="text-sm max-w-xs" style={{ color: 'var(--mid)' }}>
            After 12 months on any plan, you own the site outright. Stay on subscription
            (recommended) or take the repo and self-host.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map(tier => (
            <div
              key={tier.name}
              className="rounded-lg p-8 flex flex-col"
              style={{
                background: tier.featured ? 'var(--ink)' : 'transparent',
                color: tier.featured ? 'var(--paper)' : 'var(--ink)',
                border: tier.featured
                  ? '1px solid var(--accent)'
                  : '1px solid var(--border)',
                order: tier.featured ? -1 : 0,
              }}
            >
              {/* Tag */}
              {tier.tag && (
                <span
                  className="inline-block self-start mb-4 px-2.5 py-1 text-xs font-medium rounded-full"
                  style={{
                    background: 'rgba(99,102,241,0.15)',
                    color: tier.tagColor,
                    border: '1px solid rgba(99,102,241,0.3)',
                  }}
                >
                  {tier.tag}
                </span>
              )}

              <p className="text-sm font-medium mb-2" style={{ opacity: 0.6 }}>
                {tier.name}
              </p>

              <div className="flex items-baseline gap-1 mb-1">
                <span
                  style={{
                    fontFamily: 'var(--font-fraunces)',
                    fontSize: '3rem',
                    fontWeight: 400,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {tier.price}
                </span>
                <span className="text-sm" style={{ opacity: 0.5 }}>
                  {tier.period}
                </span>
              </div>

              {tier.note && (
                <p className="text-xs mb-6" style={{ color: 'rgba(99,102,241,0.8)' }}>
                  {tier.note}
                </p>
              )}

              <hr className="rule-h my-6" />

              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span style={{ color: tier.featured ? 'var(--accent)' : 'var(--faint)', marginTop: '0.1em' }}>
                      ✦
                    </span>
                    <span style={{ opacity: 0.75 }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#intake"
                className={tier.featured ? 'btn-primary' : 'btn-ghost'}
                style={tier.featured ? {} : { borderColor: 'var(--border)', color: 'var(--ink)' }}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm" style={{ color: 'var(--faint)' }}>
          All plans include domain management, Vercel hosting, SSL, and DNS. No lock-in beyond 12 months.
        </p>
      </div>
    </section>
  )
}

// ── Intake ────────────────────────────────────────────────────────────────────
function Intake() {
  return (
    <section
      id="intake"
      className="py-section"
      style={{ background: 'var(--ink)', color: 'var(--paper)' }}
    >
      <div className="max-w-content mx-auto px-6">
        <p className="section-number text-paper mb-4">06 / Begin</p>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              Ready to stop thinking about your website?
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(245,244,240,0.5)' }}>
              Fill the form. We&apos;ll review your brief, select the right genome,
              and send a site preview within 3 business days. No commitment until you
              approve the design.
            </p>
            <div className="space-y-3 text-sm" style={{ color: 'rgba(245,244,240,0.4)' }}>
              <p>✦ No setup fee · cancel anytime</p>
              <p>✦ Site preview before first payment</p>
              <p>✦ Founding rate locked if you join this week</p>
            </div>
          </div>

          {/* Form — Tally embed target. Replace src with live Tally form URL. */}
          <div
            className="rounded-lg p-8"
            style={{
              background: 'rgba(245,244,240,0.04)',
              border: '1px solid rgba(245,244,240,0.1)',
            }}
          >
            {/* TODO: Replace with Tally embed once form is created at tally.so */}
            {/* <iframe src="https://tally.so/embed/YOUR_FORM_ID" width="100%" height="400" /> */}
            <form
              className="space-y-5"
              onSubmit={e => e.preventDefault()}
            >
              <div>
                <label className="block text-xs mb-2" style={{ color: 'rgba(245,244,240,0.5)', letterSpacing: '0.05em' }}>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  placeholder="Alex Smith"
                  className="w-full px-4 py-3 rounded text-sm"
                  style={{
                    background: 'rgba(245,244,240,0.06)',
                    border: '1px solid rgba(245,244,240,0.12)',
                    color: 'var(--paper)',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: 'rgba(245,244,240,0.5)', letterSpacing: '0.05em' }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="alex@firmname.co.uk"
                  className="w-full px-4 py-3 rounded text-sm"
                  style={{
                    background: 'rgba(245,244,240,0.06)',
                    border: '1px solid rgba(245,244,240,0.12)',
                    color: 'var(--paper)',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: 'rgba(245,244,240,0.5)', letterSpacing: '0.05em' }}>
                  WHAT DOES YOUR BUSINESS DO?
                </label>
                <textarea
                  rows={4}
                  placeholder="I'm a fractional CFO working with UK scale-ups. My clients are Series A/B founders who need financial leadership without a full-time hire..."
                  className="w-full px-4 py-3 rounded text-sm resize-none"
                  style={{
                    background: 'rgba(245,244,240,0.06)',
                    border: '1px solid rgba(245,244,240,0.12)',
                    color: 'var(--paper)',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: 'rgba(245,244,240,0.5)', letterSpacing: '0.05em' }}>
                  PLAN
                </label>
                <select
                  className="w-full px-4 py-3 rounded text-sm"
                  style={{
                    background: 'rgba(245,244,240,0.06)',
                    border: '1px solid rgba(245,244,240,0.12)',
                    color: 'var(--paper)',
                    outline: 'none',
                  }}
                >
                  <option value="founding">Founding — £75/mo (5 slots left)</option>
                  <option value="core">Core — £90/mo</option>
                  <option value="full">Full — £175/mo</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn-primary w-full justify-center"
                style={{ width: '100%' }}
              >
                Send brief →
              </button>
              <p className="text-xs text-center" style={{ color: 'rgba(245,244,240,0.3)' }}>
                We respond within 24 hours. No payment until you approve the design.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 border-t" style={{ borderColor: 'var(--border)', background: 'var(--paper)' }}>
      <div className="max-w-content mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="text-lg"
          style={{ fontFamily: 'var(--font-fraunces)', letterSpacing: '-0.03em' }}
        >
          Foundy.
        </span>
        <div className="flex gap-6 text-sm" style={{ color: 'var(--mid)' }}>
          <a href="#process" className="hover:text-ink transition-colors">Process</a>
          <a href="#genomes" className="hover:text-ink transition-colors">Genomes</a>
          <a href="#pricing" className="hover:text-ink transition-colors">Pricing</a>
          <a href="mailto:hello@foundy.studio" className="hover:text-ink transition-colors">
            hello@foundy.studio
          </a>
        </div>
        <p className="text-xs" style={{ color: 'var(--faint)' }}>
          © 2026 Foundy · foundy.studio · UK
        </p>
      </div>
    </footer>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <GapSection />
        <HowItWorks />
        <GenomeGallery />
        <Pricing />
        <Intake />
      </main>
      <Footer />
    </>
  )
}
