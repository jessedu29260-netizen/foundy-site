'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { GENOMES } from '@/lib/genomes.config'

// ── Word split helper ─────────────────────────────────────────────────────
function WordReveal({
  text,
  tag: Tag = 'h1',
  className,
  style,
}: {
  text: string
  tag?: 'h1' | 'h2' | 'h3'
  className?: string
  style?: React.CSSProperties
}) {
  const words = text.split(' ')
  return (
    <Tag className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="split-word-wrap">
          <span className="split-word">
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}

// ── Section fade-in helper ────────────────────────────────────────────────
function useSectionReveal(ref: React.RefObject<HTMLElement | null>, selector: string, options?: gsap.TweenVars) {
  useGSAP(
    () => {
      gsap.from(selector, {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'expo.out',
        ...options,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: ref },
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────
function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 62px',
      onEnter: () => navRef.current?.classList.add('nav-dark'),
      onLeaveBack: () => navRef.current?.classList.remove('nav-dark'),
    })
    // Entrance
    gsap.from(navRef.current, { y: -10, opacity: 0, duration: 0.6, ease: 'expo.out', delay: 0.05 })
  }, { scope: navRef })

  return (
    <nav ref={navRef} className="nav-bar">
      <div className="flex items-center justify-between w-full max-w-content mx-auto">
        {/* Logo */}
        <span
          className="display text-xl font-medium"
          style={{ fontFamily: 'var(--font-fraunces)', letterSpacing: '-0.04em' }}
        >
          Foundy.
        </span>

        {/* Founding pill */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full"
          style={{
            background: 'rgba(99,102,241,0.10)',
            color: 'var(--accent)',
            border: '1px solid rgba(99,102,241,0.22)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-current"
            style={{ animation: 'pulse 2s infinite' }}
          />
          5 founding slots · £75/mo
        </div>

        {/* CTA */}
        <a href="#intake" className="btn-primary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.82rem' }}>
          Get started →
        </a>
      </div>
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 })

      // Section number
      tl.from('.hero-number', { opacity: 0, x: -16, duration: 0.5, ease: 'expo.out' })

      // H1 word by word
      tl.from(
        '.hero-h1 .split-word',
        { y: 72, opacity: 0, duration: 1.0, stagger: 0.07, ease: 'expo.out' },
        '-=0.25',
      )

      // Subtext
      tl.from('.hero-sub', { y: 28, opacity: 0, duration: 0.7, ease: 'expo.out' }, '-=0.55')

      // CTAs
      tl.from('.hero-cta-a, .hero-cta-b', {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'expo.out',
      }, '-=0.45')

      // Proof strip
      tl.from('.hero-proof-item', { opacity: 0, stagger: 0.09, duration: 0.35, ease: 'none' }, '-=0.3')

      // Genome mosaic tiles — staggered from random positions
      tl.from(
        '.genome-tile',
        { y: 36, opacity: 0, duration: 0.8, stagger: { amount: 0.55, from: 'random' }, ease: 'expo.out' },
        '-=0.9',
      )

      // Scroll indicator
      tl.from('.scroll-indicator', { opacity: 0, duration: 0.6, ease: 'none' }, '-=0.1')

      // Parallax on bg grid
      gsap.to('.hero-bg-grid', {
        y: 80,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      })
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-20 overflow-hidden"
      style={{ background: 'var(--ink)', color: 'var(--paper)' }}
    >
      {/* Bg grid */}
      <div
        className="hero-bg-grid absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,244,240,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,244,240,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%', left: '-5%',
          width: '55%', height: '70%',
          background: 'radial-gradient(ellipse at 30% 40%, rgba(99,102,241,0.09) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-content mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 xl:gap-24 items-center">

          {/* Left: copy */}
          <div>
            <p className="hero-number section-number text-paper mb-5">01 / The offer</p>

            <WordReveal
              text="The last time you'll think about your website."
              tag="h1"
              className="hero-h1 mb-8"
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(2.9rem, 5.8vw, 5.2rem)',
                lineHeight: '1.05',
                letterSpacing: '-0.03em',
                fontWeight: 400,
              }}
            />

            <p
              className="hero-sub text-base mb-9 leading-relaxed"
              style={{ color: 'rgba(245,244,240,0.58)', maxWidth: '44ch', fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}
            >
              Turnkey digital presence for UK consultants. One brief. We handle
              domain, DNS, design, build, and everything after.{' '}
              <strong style={{ color: 'var(--paper)', fontWeight: 500 }}>£90 per month.</strong>
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#intake" className="hero-cta-a btn-primary">
                Claim founding slot — £75/mo →
              </a>
              <a href="#genomes" className="hero-cta-b btn-ghost">
                See our work ↓
              </a>
            </div>

            {/* Proof strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs" style={{ color: 'rgba(245,244,240,0.35)' }}>
              {['3–5 day delivery', '100 Lighthouse score', 'You own it after 12 months', 'UK-managed'].map(p => (
                <span key={p} className="hero-proof-item flex items-center gap-1.5">
                  <span style={{ color: 'rgba(99,102,241,0.6)' }}>✦</span> {p}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Genome mosaic */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="grid grid-cols-2 gap-2">
              {GENOMES.map((genome, i) => (
                <div
                  key={genome.id}
                  className="genome-tile rounded overflow-hidden relative"
                  style={{
                    background: genome.primaryColor,
                    aspectRatio: i === 0 || i === 5 ? '1 / 1.35' : '1 / 1',
                    border: '1px solid rgba(245,244,240,0.06)',
                    gridColumn: i === 0 ? 'span 2' : undefined,
                    gridRow: i === 0 ? 'span 1' : undefined,
                  }}
                >
                  {/* Accent top stripe */}
                  {genome.accentColor && (
                    <div className="h-0.5" style={{ background: genome.accentColor }} />
                  )}
                  <div className="p-4 flex flex-col h-full">
                    <span
                      style={{
                        fontFamily: 'var(--font-dm-mono)',
                        fontSize: '0.58rem',
                        color: genome.textColor,
                        opacity: 0.35,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {genome.id}
                    </span>
                    <div className="mt-auto">
                      <span
                        style={{
                          display: 'block',
                          fontFamily: genome.fontDisplay + ', serif',
                          fontSize: i === 0 ? '1.35rem' : '0.95rem',
                          color: genome.textColor,
                          fontWeight: 400,
                          lineHeight: 1.2,
                          letterSpacing: '-0.01em',
                          opacity: 0.85,
                        }}
                      >
                        {genome.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-indicator absolute bottom-0 left-6 flex items-center gap-2"
          style={{ color: 'rgba(245,244,240,0.25)', fontSize: '0.7rem', letterSpacing: '0.1em' }}
        >
          <span style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}>↓</span>
          <span className="font-mono uppercase">Scroll</span>
        </div>
      </div>
    </section>
  )
}

// ── Trust Bar ─────────────────────────────────────────────────────────────
function TrustBar() {
  const tech = [
    'Next.js 16', 'Vercel', 'Stripe', 'Porkbun DNS',
    'TypeScript', 'Tailwind CSS', 'Supabase', 'GSAP',
    'Next.js 16', 'Vercel', 'Stripe', 'Porkbun DNS',
    'TypeScript', 'Tailwind CSS', 'Supabase', 'GSAP',
  ]

  return (
    <section
      className="py-5 overflow-hidden border-b"
      style={{ borderColor: 'var(--border)', background: 'var(--paper-warm)' }}
    >
      <div className="flex items-center gap-6 mb-0">
        <div className="shrink-0 pl-6">
          <p className="section-number" style={{ opacity: 0.35 }}>Built on</p>
        </div>
        <div className="overflow-hidden flex-1 relative">
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-12 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, var(--paper-warm), transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-12 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(-90deg, var(--paper-warm), transparent)' }} />
          <div className="marquee-track">
            {tech.map((t, i) => (
              <span
                key={i}
                className="text-sm font-medium flex-shrink-0 flex items-center gap-3"
                style={{ color: 'var(--mid)' }}
              >
                {t}
                <span style={{ color: 'var(--faint)', fontSize: '0.5rem' }}>●</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Gap Section ───────────────────────────────────────────────────────────
function GapSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Heading reveal
      gsap.from('.gap-h2 .split-word', {
        y: 52,
        opacity: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.gap-h2', start: 'top 85%' },
      })

      // Agency rows slide from left
      gsap.from('.agency-row', {
        x: -28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.gap-grid', start: 'top 82%' },
      })

      // Foundy rows slide from right
      gsap.from('.foundy-row', {
        x: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.gap-grid', start: 'top 82%' },
      })
    },
    { scope: ref },
  )

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
      ref={ref}
      id="gap"
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: 'var(--section-pad) 0',
      }}
    >
      <div className="max-w-content mx-auto px-6">
        <p className="section-number text-paper mb-5">02 / The alternative</p>
        <WordReveal
          text="Two ways to get a website. One obvious choice."
          tag="h2"
          className="gap-h2 mb-14"
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)',
            fontWeight: 400,
            maxWidth: '26ch',
          }}
        />

        <div
          className="gap-grid grid md:grid-cols-2"
          style={{ gap: '1px', background: 'rgba(245,244,240,0.07)' }}
        >
          {/* Agency column */}
          <div className="p-8 md:p-12" style={{ background: 'var(--ink)' }}>
            <p
              className="text-xs uppercase tracking-widest mb-8 font-medium"
              style={{ color: 'rgba(245,244,240,0.28)' }}
            >
              The agency route
            </p>
            <div className="space-y-5">
              {agency.map(([value, label]) => (
                <div key={value} className="agency-row flex items-start gap-4">
                  <span className="mt-0.5 text-xs" style={{ color: 'rgba(245,244,240,0.2)', fontFamily: 'var(--font-dm-mono)' }}>✕</span>
                  <div>
                    <span
                      className="block font-medium text-sm"
                      style={{ color: 'rgba(245,244,240,0.38)', textDecoration: 'line-through', textDecorationColor: 'rgba(245,244,240,0.15)' }}
                    >
                      {value}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(245,244,240,0.22)' }}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Foundy column */}
          <div
            className="p-8 md:p-12"
            style={{ background: 'rgba(99,102,241,0.06)', borderLeft: '1px solid rgba(99,102,241,0.18)' }}
          >
            <p className="text-xs uppercase tracking-widest mb-8 font-medium" style={{ color: 'var(--accent)' }}>
              The Foundy route
            </p>
            <div className="space-y-5">
              {foundy.map(([value, label]) => (
                <div key={value} className="foundy-row flex items-start gap-4">
                  <span className="mt-0.5 text-xs" style={{ color: 'var(--accent)' }}>✦</span>
                  <div>
                    <span className="block font-medium text-sm" style={{ color: 'var(--paper)' }}>{value}</span>
                    <span className="text-xs" style={{ color: 'rgba(245,244,240,0.45)' }}>{label}</span>
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

// ── How It Works ──────────────────────────────────────────────────────────
function HowItWorks() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Heading
      gsap.from('.how-h2 .split-word', {
        y: 50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.how-h2', start: 'top 85%' },
      })

      // Cards sequential
      gsap.from('.how-step', {
        y: 40,
        opacity: 0,
        duration: 0.75,
        stagger: 0.18,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.how-steps', start: 'top 80%' },
      })
    },
    { scope: ref },
  )

  const steps = [
    {
      n: '01',
      title: 'Brief',
      body: 'Fill one form. Tell us what your business does, who you serve, and how you want to be perceived. Takes 15 minutes. That is your only input.',
    },
    {
      n: '02',
      title: 'Build',
      body: 'We select the genome that matches your personality, populate it with your content, connect your domain, wire Stripe if needed, and deploy to Vercel. You see the result.',
    },
    {
      n: '03',
      title: 'Live',
      body: 'Your site is live in 3–5 days. We manage DNS, SSL, updates, health checks, and a monthly report card. You focus on your clients.',
    },
  ]

  return (
    <section
      ref={ref}
      id="process"
      style={{ background: 'var(--paper)', padding: 'var(--section-pad) 0' }}
    >
      <div className="max-w-content mx-auto px-6">
        <p className="section-number mb-5">03 / Process</p>
        <WordReveal
          text="Three steps. Then nothing — until you want a change."
          tag="h2"
          className="how-h2 mb-16"
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)',
            fontWeight: 400,
            maxWidth: '22ch',
          }}
        />

        <div className="how-steps grid md:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="how-step p-8 relative"
              style={{ background: 'var(--paper)' }}
            >
              {/* Oversized faded number */}
              <span
                className="absolute top-4 right-5 select-none pointer-events-none"
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: '5rem',
                  color: 'var(--ink)',
                  opacity: 0.04,
                  lineHeight: 1,
                  fontWeight: 400,
                  letterSpacing: '-0.04em',
                }}
                aria-hidden
              >
                {step.n}
              </span>

              <span
                className="block mb-6 text-2xl"
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  color: 'var(--faint)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                }}
              >
                {step.n}
              </span>
              <h3
                className="text-xl mb-4"
                style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 400, letterSpacing: '-0.02em' }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--mid)' }}>
                {step.body}
              </p>

              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-[3.5rem] right-0 w-px h-6"
                  style={{ background: 'var(--border)', transform: 'translateX(50%)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Genome Gallery ────────────────────────────────────────────────────────
function GenomeGallery() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.genome-section-h2 .split-word', {
        y: 50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.genome-section-h2', start: 'top 85%' },
      })

      gsap.from('.genome-gallery-card', {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: { amount: 0.6, from: 'start' },
        ease: 'expo.out',
        scrollTrigger: { trigger: '.genome-gallery-grid', start: 'top 80%' },
      })
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      id="genomes"
      style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--section-pad) 0' }}
    >
      <div className="max-w-content mx-auto px-6">
        <p className="section-number text-paper mb-5">04 / Design</p>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <WordReveal
            text="Eight genomes. Each a complete design personality."
            tag="h2"
            className="genome-section-h2"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)',
              fontWeight: 400,
              maxWidth: '24ch',
            }}
          />
          <p
            className="text-sm max-w-xs"
            style={{ color: 'rgba(245,244,240,0.42)', lineHeight: 1.7 }}
          >
            We read your brief and select the genome that fits how you work and who
            you serve. You never see a template dropdown.
          </p>
        </div>

        <div className="genome-gallery-grid grid grid-cols-2 md:grid-cols-4 gap-3">
          {GENOMES.map(genome => (
            <div
              key={genome.id}
              className="genome-gallery-card genome-card"
              style={{ background: genome.primaryColor }}
            >
              {/* Accent top stripe */}
              <div className="h-[3px]" style={{ background: genome.accentColor ?? 'rgba(255,255,255,0.1)' }} />

              <div className="p-5">
                <span
                  className="block text-xs mb-3"
                  style={{
                    fontFamily: 'var(--font-dm-mono)',
                    color: genome.textColor,
                    opacity: 0.3,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {genome.id}
                </span>

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

                <p className="text-xs mb-4" style={{ color: genome.textColor, opacity: 0.45 }}>
                  {genome.tagline}
                </p>

                {/* Mini font sample */}
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: genome.textColor,
                    opacity: 0.28,
                    fontFamily: 'var(--font-dm-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.04em',
                  }}
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

// ── Pricing ───────────────────────────────────────────────────────────────
function Pricing() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.pricing-h2 .split-word', {
        y: 50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.pricing-h2', start: 'top 85%' },
      })

      gsap.from('.pricing-card', {
        y: 44,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.pricing-cards', start: 'top 80%' },
      })
    },
    { scope: ref },
  )

  const tiers = [
    {
      name: 'Founding',
      price: '£75',
      period: '/mo · locked 12 months',
      tag: '5 slots only',
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
    <section
      ref={ref}
      id="pricing"
      style={{ background: 'var(--paper)', padding: 'var(--section-pad) 0' }}
    >
      <div className="max-w-content mx-auto px-6">
        <p className="section-number mb-5">05 / Investment</p>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <WordReveal
            text="One price. Everything included."
            tag="h2"
            className="pricing-h2"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)',
              fontWeight: 400,
              maxWidth: '22ch',
            }}
          />
          <p className="text-sm max-w-xs" style={{ color: 'var(--mid)', lineHeight: 1.7 }}>
            After 12 months on any plan, you own the site outright. Stay on
            subscription or take the repo and self-host.
          </p>
        </div>

        <div className="pricing-cards grid md:grid-cols-3 gap-4">
          {tiers.map(tier => (
            <div
              key={tier.name}
              className="pricing-card rounded-lg p-8 flex flex-col"
              style={{
                background: tier.featured ? 'var(--ink)' : 'transparent',
                color: tier.featured ? 'var(--paper)' : 'var(--ink)',
                border: tier.featured ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--border)',
                order: tier.featured ? -1 : 0,
                boxShadow: tier.featured ? '0 0 0 1px rgba(99,102,241,0.1), 0 24px 64px rgba(0,0,0,0.12)' : 'none',
              }}
            >
              {tier.tag && (
                <span
                  className="inline-block self-start mb-4 px-2.5 py-1 text-xs font-medium rounded-full"
                  style={{
                    background: 'rgba(99,102,241,0.15)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    fontFamily: 'var(--font-dm-mono)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {tier.tag}
                </span>
              )}

              <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ opacity: 0.45, fontFamily: 'var(--font-dm-mono)' }}>
                {tier.name}
              </p>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="price-num">{tier.price}</span>
                <span className="text-xs" style={{ opacity: 0.4 }}>{tier.period}</span>
              </div>

              {tier.note && (
                <p className="text-xs mb-5 mt-1" style={{ color: 'rgba(99,102,241,0.75)' }}>{tier.note}</p>
              )}

              <hr className="rule-h my-6" />

              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span style={{ color: tier.featured ? 'var(--accent)' : 'var(--faint)', marginTop: '0.15em', fontSize: '0.65rem' }}>
                      ✦
                    </span>
                    <span style={{ opacity: 0.72 }}>{f}</span>
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

        <p className="mt-8 text-center text-xs" style={{ color: 'var(--faint)' }}>
          All plans include domain management, Vercel hosting, SSL, and DNS. No lock-in beyond 12 months.
        </p>
      </div>
    </section>
  )
}

// ── Intake ────────────────────────────────────────────────────────────────
function Intake() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.intake-copy > *', {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.intake-copy', start: 'top 82%' },
      })

      gsap.from('.intake-form', {
        y: 44,
        opacity: 0,
        duration: 0.85,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.intake-form', start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      id="intake"
      style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--section-pad) 0' }}
    >
      <div className="max-w-content mx-auto px-6">
        <p className="section-number text-paper mb-5">06 / Begin</p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Copy */}
          <div className="intake-copy">
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
              }}
            >
              Ready to stop thinking about your website?
            </h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: 'rgba(245,244,240,0.48)' }}
            >
              Fill the form. We&apos;ll review your brief, select the right genome,
              and send a site preview within 3 business days. No commitment until you
              approve the design.
            </p>
            <div className="space-y-3 text-sm" style={{ color: 'rgba(245,244,240,0.35)' }}>
              <p className="flex items-center gap-2">
                <span style={{ color: 'rgba(99,102,241,0.6)', fontSize: '0.65rem' }}>✦</span>
                No setup fee · cancel anytime
              </p>
              <p className="flex items-center gap-2">
                <span style={{ color: 'rgba(99,102,241,0.6)', fontSize: '0.65rem' }}>✦</span>
                Site preview before first payment
              </p>
              <p className="flex items-center gap-2">
                <span style={{ color: 'rgba(99,102,241,0.6)', fontSize: '0.65rem' }}>✦</span>
                Founding rate locked if you join this week
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            className="intake-form rounded-lg p-8"
            style={{
              background: 'rgba(245,244,240,0.035)',
              border: '1px solid rgba(245,244,240,0.09)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-xs mb-2" style={{ color: 'rgba(245,244,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-dm-mono)' }}>
                  Your name
                </label>
                <input
                  type="text"
                  placeholder="Alex Smith"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: 'rgba(245,244,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-dm-mono)' }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="alex@firmname.co.uk"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: 'rgba(245,244,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-dm-mono)' }}>
                  What does your business do?
                </label>
                <textarea
                  rows={4}
                  placeholder="I'm a fractional CFO working with UK scale-ups. My clients are Series A/B founders who need financial leadership without a full-time hire..."
                  className="form-input resize-none"
                />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: 'rgba(245,244,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-dm-mono)' }}>
                  Plan
                </label>
                <select className="form-input">
                  <option value="founding">Founding — £75/mo (5 slots left)</option>
                  <option value="core">Core — £90/mo</option>
                  <option value="full">Full — £175/mo</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn-primary w-full justify-center"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Send brief →
              </button>
              <p className="text-xs text-center" style={{ color: 'rgba(245,244,240,0.25)', fontFamily: 'var(--font-dm-mono)' }}>
                We respond within 24 hours. No payment until you approve the design.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.footer-inner > *', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 92%' },
      })
    },
    { scope: ref },
  )

  return (
    <footer
      ref={ref}
      className="py-10 border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--paper-warm)' }}
    >
      <div className="footer-inner max-w-content mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="text-lg"
          style={{ fontFamily: 'var(--font-fraunces)', letterSpacing: '-0.04em' }}
        >
          Foundy.
        </span>
        <div className="flex gap-6 text-sm" style={{ color: 'var(--mid)' }}>
          <a href="#process" className="hover:text-ink transition-colors duration-150">Process</a>
          <a href="#genomes" className="hover:text-ink transition-colors duration-150">Genomes</a>
          <a href="#pricing" className="hover:text-ink transition-colors duration-150">Pricing</a>
          <a href="mailto:hello@foundy.studio" className="hover:text-ink transition-colors duration-150">
            hello@foundy.studio
          </a>
        </div>
        <p className="text-xs" style={{ color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>
          © 2026 Foundy · UK
        </p>
      </div>
    </footer>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
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
