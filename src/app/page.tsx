'use client'
import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function W({ text, tag: Tag = 'span', className, style }: { text: string; tag?: any; className?: string; style?: React.CSSProperties }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any
  return (
    <T className={className} style={style} aria-label={text}>
      {text.split(' ').map((word: string, i: number, arr: string[]) => (
        <span key={i} className="split-word-wrap">
          <span className="split-word">{word}{i < arr.length - 1 ? ' ' : ''}</span>
        </span>
      ))}
    </T>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useReveal(ref: any, selector: string, vars: Record<string, any> = {}, triggerStart = 'top 82%') {
  useGSAP(() => {
    const els = ref.current?.querySelectorAll(selector)
    if (!els?.length) return
    gsap.from(els, {
      y: 36, opacity: 0, duration: 0.8, stagger: 0.11, ease: 'expo.out',
      ...vars,
      scrollTrigger: { trigger: ref.current, start: triggerStart, toggleActions: 'play none none none' },
    })
  }, { scope: ref })
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════════════════ */

function Nav() {
  useGSAP(() => {
    gsap.from('.nav-bar', { y: -20, opacity: 0, duration: 0.65, ease: 'expo.out', delay: 0.1 })
    gsap.to('.nav-bar', {
      scrollTrigger: { trigger: 'body', start: '180px top', toggleClass: { targets: '.nav-bar', className: 'nav-dark' } },
    })
  })

  return (
    <header className="nav-bar">
      <div className="max-w-content mx-auto px-6 flex items-center justify-between w-full">
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none', color: 'inherit' }} aria-label="Foundy home">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="32" height="32" rx="5" fill="#0A0A0B"/>
            <rect x="8" y="6.5" width="3.5" height="18.5" fill="#F5F4F0"/>
            <rect x="8" y="6.5" width="16" height="3" fill="#F5F4F0"/>
            <rect x="8" y="13.5" width="11" height="2.75" fill="#F5F4F0"/>
            <rect x="12.5" y="26.5" width="9.5" height="2" rx="1" fill="#6366F1"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.15rem', fontWeight: 400, letterSpacing: '-0.04em' }}>Foundy.</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: 'var(--mid)' }}>
          {[['#process', 'How it works'], ['#genomes', 'Styles'], ['#pricing', 'Pricing'], ['#intake', 'Start']].map(([href, label]) => (
            <a key={label} href={href} style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.15s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'inherit' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--mid)' }}
            >{label}</a>
          ))}
        </nav>
        <a href="#intake" className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.6rem 1.25rem' }}>
          Get started →
        </a>
      </div>
    </header>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */

function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.from('.hero-badge', { y: 14, opacity: 0, duration: 0.55, ease: 'expo.out' })
      .from('.hero-h1 .split-word', { y: 80, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, '-=0.2')
      .from('.hero-sub', { y: 22, opacity: 0, duration: 0.65, ease: 'expo.out' }, '-=0.45')
      .from('.hero-ctas > *', { y: 20, opacity: 0, duration: 0.55, stagger: 0.1, ease: 'expo.out' }, '-=0.35')
      .from('.hero-metric', { y: 18, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'expo.out' }, '-=0.3')
      .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.1')
  }, { scope: ref })

  return (
    <section ref={ref} id="hero" style={{
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '7rem 1.5rem 5rem',
      background: 'var(--paper)',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}>

      {/* Soft indigo bloom — top-right */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-5%', right: '-8%',
        width: '70vw', height: '70vw', maxWidth: '860px', maxHeight: '860px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 55% 45%, rgba(99,102,241,0.085) 0%, transparent 62%)',
        pointerEvents: 'none',
      }} />

      {/* Thin decorative ring */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', right: '7%',
        width: '36vw', height: '36vw', maxWidth: '460px', maxHeight: '460px',
        transform: 'translateY(-55%)',
        borderRadius: '50%',
        border: '1px solid rgba(99,102,241,0.10)',
        pointerEvents: 'none',
      }} />

      {/* Secondary smaller ring */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', right: '7%',
        width: '22vw', height: '22vw', maxWidth: '290px', maxHeight: '290px',
        transform: 'translateY(-55%)',
        borderRadius: '50%',
        border: '1px solid rgba(99,102,241,0.07)',
        pointerEvents: 'none',
      }} />

      {/* Founding badge */}
      <div className="hero-badge" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        marginBottom: '2.25rem',
        padding: '0.45rem 1.1rem',
        borderRadius: '100px',
        background: 'rgba(99,102,241,0.07)',
        border: '1px solid rgba(99,102,241,0.2)',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-dm-mono)',
        letterSpacing: '0.06em',
        color: 'var(--accent)',
      }}>
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'var(--accent)', display: 'inline-block',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        Founding slots open — 5 remaining
      </div>

      {/* Headline */}
      <W
        text="Your website, running."
        tag="h1"
        className="hero-h1"
        style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: 'clamp(3rem, 8.5vw, 7.8rem)',
          fontWeight: 400,
          letterSpacing: '-0.032em',
          lineHeight: 1.03,
          maxWidth: '13ch',
          margin: '0 auto 1.75rem',
          color: 'var(--ink)',
        }}
      />

      {/* Subline */}
      <p className="hero-sub" style={{
        fontSize: 'clamp(1rem, 1.6vw, 1.12rem)',
        color: 'var(--mid)',
        maxWidth: '46ch',
        lineHeight: 1.65,
        margin: '0 auto 2.75rem',
      }}>
        Turnkey websites for UK B2B professionals. Domain, DNS, design, build,
        and everything after — on a monthly subscription. You brief us once. We own it forever.
      </p>

      {/* CTAs */}
      <div className="hero-ctas" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginBottom: '4.5rem' }}>
        <a href="#intake" className="btn-primary" style={{ fontSize: '0.93rem', padding: '0.9rem 2rem', lineHeight: 1 }}>
          Claim founding slot — £75/mo →
        </a>
        <a href="#process" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '0.93rem', padding: '0.9rem 2rem', lineHeight: 1,
          color: 'var(--mid)', textDecoration: 'none',
          border: '1px solid var(--border)', borderRadius: '3px',
          transition: 'border-color 0.18s ease, color 0.18s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(10,10,11,0.25)'; e.currentTarget.style.color = 'var(--ink)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--mid)' }}
        >
          See how it works
        </a>
      </div>

      {/* Metrics strip */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem 4rem' }}>
        {[
          { n: '3–5', sub: 'days to live' },
          { n: '£0', sub: 'setup fee' },
          { n: '100', sub: 'Lighthouse' },
          { n: '12mo', sub: 'then you own it' },
        ].map(m => (
          <div key={m.n} className="hero-metric" style={{ textAlign: 'center' }}>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.8rem, 3.8vw, 2.9rem)',
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--ink)',
            }}>{m.n}</span>
            <span style={{
              display: 'block', marginTop: '0.35rem',
              fontSize: '0.68rem',
              fontFamily: 'var(--font-dm-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--faint)',
            }}>{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Scroll nudge */}
      <div className="hero-scroll" style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        animation: 'scrollBounce 2.2s ease-in-out infinite', opacity: 0.28,
      }}>
        <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-dm-mono)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>scroll</span>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
          <rect x="0.75" y="0.75" width="10.5" height="16.5" rx="5.25" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="5.5" r="1.75" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRUST BAR
═══════════════════════════════════════════════════════════════════════════ */

function TrustBar() {
  const items = [
    'Strategy Consultants', 'Fractional CFOs', 'HR Directors', 'Legal Advisors',
    'Marketing Partners', 'Finance Leaders', 'B2B Agency Owners', 'Executive Coaches',
    'Risk Consultants', 'Operations Directors', 'Policy Advisors', 'Recruitment Firms',
    'Strategy Consultants', 'Fractional CFOs', 'HR Directors', 'Legal Advisors',
    'Marketing Partners', 'Finance Leaders', 'B2B Agency Owners', 'Executive Coaches',
    'Risk Consultants', 'Operations Directors', 'Policy Advisors', 'Recruitment Firms',
  ]
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden',
      background: 'var(--paper-warm)',
      padding: '1rem 0',
    }}>
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.11em',
            textTransform: 'uppercase',
            color: 'var(--mid)',
            whiteSpace: 'nowrap',
          }}>
            {t}<span style={{ margin: '0 1.5rem', color: 'var(--faint)' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOR WHO  (ink / dark)
═══════════════════════════════════════════════════════════════════════════ */

function ForWho() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref, '.fw-head', { y: 24 }, 'top 85%')
  useReveal(ref, '.fw-tile', { y: 32, stagger: 0.07 }, 'top 76%')

  const personas = [
    { n: '01', role: 'Fractional exec', copy: 'You operate at C-suite level but your website looks like it was built in 2018. Your credibility online should match your credibility in the room.' },
    { n: '02', role: 'Solo consultant', copy: 'Referrals only take you so far. A solid site running 24/7 works the rooms you cannot get into.' },
    { n: '03', role: 'Strategy firm', copy: 'Your work transforms organisations. Your web presence should communicate that weight and seriousness.' },
    { n: '04', role: 'Legal advisor', copy: 'Clients judge you before they call you. First impressions are made on a 1.2-second scroll, not a 45-minute meeting.' },
    { n: '05', role: 'HR professional', copy: 'Warm, authoritative, human. You need a site that leads with the person, not a service list.' },
    { n: '06', role: 'Finance & accounting', copy: 'Trust signals matter more than creativity here. We know the genome that earns trust from CFOs and founders.' },
  ]

  return (
    <section ref={ref} id="who" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--section-pad) 0' }}>
      <div className="max-w-content mx-auto px-6">
        <p className="section-number fw-head mb-5" style={{ color: 'rgba(245,244,240,0.32)' }}>01 / Built for</p>
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-14">
          <W text="Who this is for." tag="h2" className="fw-head"
            style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.06 }}
          />
          <p className="fw-head" style={{ color: 'rgba(245,244,240,0.44)', fontSize: '0.95rem', lineHeight: 1.72, alignSelf: 'end', maxWidth: '48ch' }}>
            Foundy exists for UK B2B professionals who understand that a credible web presence is infrastructure, not decoration — and who have better things to do than manage a website.
          </p>
        </div>

        {/* Tile grid — gap:1px creates hairline dividers via background colour */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(245,244,240,0.06)' }}>
          {personas.map(p => (
            <div key={p.n} className="fw-tile" style={{
              background: 'var(--ink)',
              padding: '2.25rem 2rem',
              borderLeft: '2px solid transparent',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = 'var(--accent)'
                el.style.background = 'rgba(99,102,241,0.05)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = 'transparent'
                el.style.background = 'var(--ink)'
              }}
            >
              <span style={{ display: 'block', fontFamily: 'var(--font-dm-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,244,240,0.24)', marginBottom: '1.1rem' }}>
                {p.n}
              </span>
              <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.3rem', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--paper)', marginBottom: '0.75rem' }}>
                {p.role}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(245,244,240,0.42)', lineHeight: 1.68 }}>
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPARISON  (paper-warm)
═══════════════════════════════════════════════════════════════════════════ */

function Comparison() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref, '.cmp-head', { y: 22 }, 'top 86%')
  useReveal(ref, '.cmp-table', { y: 30, opacity: 0, duration: 0.9 }, 'top 80%')

  const rows = [
    { f: 'Monthly cost',          self: '£0 + your time',    agency: '£5k+ project fee',  foundy: '£90–£175 / mo' },
    { f: 'Time to live',          self: 'Days to weeks',      agency: '4–12 weeks',         foundy: '3–5 days' },
    { f: 'Setup fee',             self: 'None',               agency: '£2k–£8k',            foundy: '£0' },
    { f: 'Technical skill',       self: 'Moderate – high',   agency: 'None',               foundy: 'None' },
    { f: 'Ongoing management',    self: 'You',                agency: 'Extra charge',       foundy: 'Included' },
    { f: 'Hosting & DNS',         self: 'DIY',                agency: 'Extra charge',       foundy: 'Included' },
    { f: 'Monthly content edits', self: 'DIY',                agency: 'Extra charge',       foundy: 'Included' },
    { f: 'Performance score',     self: 'Varies',             agency: 'Varies',             foundy: '100 / 100' },
    { f: 'You own it after 12mo', self: 'Always',             agency: 'Sometimes',          foundy: 'Always' },
  ]

  return (
    <section ref={ref} id="comparison" style={{ background: 'var(--paper-warm)', padding: 'var(--section-pad) 0' }}>
      <div className="max-w-content mx-auto px-6">
        <p className="section-number cmp-head mb-5">02 / The case</p>
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-12">
          <W text="Why not just do it yourself?" tag="h2" className="cmp-head"
            style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.8rem, 3.6vw, 2.85rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.1 }}
          />
          <p className="cmp-head" style={{ color: 'var(--mid)', fontSize: '0.93rem', lineHeight: 1.72, alignSelf: 'end', maxWidth: '46ch' }}>
            You could use Squarespace. The question is whether your time is worth £90 a month, and whether a template shared by a thousand other consultants is the right signal to send.
          </p>
        </div>
        <div className="cmp-table" style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--border)', background: 'white' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '1rem 1.25rem', fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', fontWeight: 400, width: '28%' }}>Feature</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.25rem', fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', fontWeight: 400 }}>Self-manage</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.25rem', fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', fontWeight: 400 }}>Agency</th>
                <th style={{ textAlign: 'left', padding: '1rem 1.25rem', fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, borderLeft: '2px solid var(--accent)' }}>Foundy</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.f} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? 'white' : 'rgba(245,244,240,0.55)' }}>
                  <td style={{ padding: '0.85rem 1.25rem', color: 'var(--mid)', fontFamily: 'var(--font-dm-mono)', fontSize: '0.78rem' }}>{r.f}</td>
                  <td style={{ padding: '0.85rem 1.25rem', color: 'var(--mid)' }}>{r.self}</td>
                  <td style={{ padding: '0.85rem 1.25rem', color: 'var(--mid)' }}>{r.agency}</td>
                  <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--ink)', borderLeft: '2px solid rgba(99,102,241,0.13)' }}>{r.foundy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROCESS  (paper)
═══════════════════════════════════════════════════════════════════════════ */

function Process() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref, '.proc-head', { y: 22 }, 'top 86%')
  useReveal(ref, '.proc-step', { y: 38, stagger: 0.14 }, 'top 78%')

  const steps = [
    { n: '1', title: 'Send your brief', body: 'Fill the intake form. Tell us who you are, what you do, and who your clients are. 10 minutes of your time. We take it from there.', note: 'No call required. No deck.' },
    { n: '2', title: 'We build, you approve', body: 'We select your genome, write all copy and layout, and push a Vercel preview within 3–5 days. One round of feedback. No payment until you approve.', note: 'Preview before first payment.' },
    { n: '3', title: 'Go live. Stay live.', body: 'DNS configured, domain pointed, site live. We monitor uptime, renew SSL, handle updates — every month, without you asking.', note: 'Weekly health check. Monthly report.' },
  ]

  return (
    <section ref={ref} id="process" style={{ background: 'var(--paper)', padding: 'var(--section-pad) 0' }}>
      <div className="max-w-content mx-auto px-6">
        <p className="section-number proc-head mb-5">03 / The process</p>
        <W text="Three steps. Zero ongoing effort." tag="h2" className="proc-head"
          style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.08, marginBottom: 'clamp(3rem, 6vw, 5.5rem)', maxWidth: '20ch' }}
        />
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {steps.map(s => (
            <div key={s.n} className="proc-step" style={{ position: 'relative', paddingTop: '5rem' }}>
              {/* Oversized watermark number */}
              <span aria-hidden="true" style={{
                position: 'absolute', top: '-0.55rem', left: '-0.2rem',
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(5.5rem, 13vw, 11rem)',
                fontWeight: 400,
                color: 'var(--ink)',
                opacity: 0.04,
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
                letterSpacing: '-0.04em',
              }}>{s.n}</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-dm-mono)', fontSize: '0.63rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '0.8rem' }}>Step {s.n}</span>
              <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.35rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '0.85rem', color: 'var(--ink)' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.7, marginBottom: '1rem' }}>{s.body}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)', letterSpacing: '0.04em' }}>{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   GENOMES  (ink / dark)
═══════════════════════════════════════════════════════════════════════════ */

function Genomes() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref, '.gen-head', { y: 22 }, 'top 86%')
  useReveal(ref, '.gen-card', { y: 32, stagger: 0.06 }, 'top 78%')

  const genomes = [
    { id: 'G01', name: 'Monument',  suit: 'Consultancy · law · strategy',    color: '#A89070' },
    { id: 'G02', name: 'Signal',    suit: 'SaaS · tech · analytics',         color: '#38BDF8' },
    { id: 'G03', name: 'Grain',     suit: 'Coaching · HR · people',          color: '#D97706' },
    { id: 'G04', name: 'Edge',      suit: 'Creative agencies · studios',     color: '#EF4444' },
    { id: 'G05', name: 'Meridian',  suit: 'Finance · accounting · legal',    color: '#10B981' },
    { id: 'G06', name: 'Craft',     suit: 'Food · interiors · makers',       color: '#A855F7' },
    { id: 'G07', name: 'Lattice',   suit: 'Engineering · architecture',      color: '#6366F1' },
    { id: 'G08', name: 'Current',   suit: 'Marketing · comms · PR',          color: '#F59E0B' },
  ]

  return (
    <section ref={ref} id="genomes" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'var(--section-pad) 0' }}>
      <div className="max-w-content mx-auto px-6">
        <p className="section-number gen-head mb-5" style={{ color: 'rgba(245,244,240,0.3)' }}>04 / Design identities</p>
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-12">
          <W text="Eight genomes. One matched to you." tag="h2" className="gen-head"
            style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.08 }}
          />
          <p className="gen-head" style={{ color: 'rgba(245,244,240,0.42)', fontSize: '0.93rem', lineHeight: 1.72, alignSelf: 'end', maxWidth: '46ch' }}>
            A genome is not a template. It is a complete design identity — typographic system, colour palette, spacing logic, component hierarchy — built for a specific type of business. We select yours from your brief, not a dropdown.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {genomes.map(g => (
            <div key={g.id} className="gen-card" style={{
              borderRadius: '14px',
              background: 'rgba(245,244,240,0.032)',
              border: '1px solid rgba(245,244,240,0.08)',
              borderTop: `2px solid ${g.color}`,
              padding: '1.75rem 1.5rem 1.6rem',
              transition: 'background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'rgba(245,244,240,0.07)'
                el.style.transform = 'translateY(-5px)'
                el.style.boxShadow = `0 16px 40px rgba(0,0,0,0.28), 0 0 0 1px ${g.color}22`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'rgba(245,244,240,0.032)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              <span style={{
                display: 'inline-block', fontFamily: 'var(--font-dm-mono)', fontSize: '0.58rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: g.color, marginBottom: '1.1rem',
                padding: '0.22rem 0.6rem', borderRadius: '100px',
                background: `${g.color}18`, border: `1px solid ${g.color}30`,
              }}>{g.id}</span>
              <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.18rem', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--paper)', marginBottom: '0.5rem', lineHeight: 1.2 }}>{g.name}</h3>
              <p style={{ fontSize: '0.72rem', color: 'rgba(245,244,240,0.32)', fontFamily: 'var(--font-dm-mono)', lineHeight: 1.55 }}>{g.suit}</p>
            </div>
          ))}
        </div>
        <p className="gen-head mt-8 text-center" style={{ fontSize: '0.72rem', color: 'rgba(245,244,240,0.25)', fontFamily: 'var(--font-dm-mono)', letterSpacing: '0.07em' }}>
          All genomes · 100/100 Lighthouse · A+ SSL · Vercel Edge · next/image · zero layout shift
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOCIAL PROOF  (paper-deep)
═══════════════════════════════════════════════════════════════════════════ */

function SocialProof() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref, '.prf-head', { y: 22 }, 'top 86%')
  useReveal(ref, '.prf-card', { y: 32, stagger: 0.11 }, 'top 78%')

  const quotes = [
    { q: 'My old site was holding me back. Prospects were clearly judging the business before they called. Foundy built something I am genuinely proud to send people to.', who: 'Alex M.', co: 'Strategy Director · Manchester' },
    { q: 'I briefed them on a Thursday afternoon. By Tuesday I had a preview link. It was exactly right. I went live the same day.', who: 'Sarah K.', co: 'Fractional CMO · London' },
    { q: 'I have referred three clients. The value is obvious once you stop thinking about it as a website cost and start thinking about it as infrastructure.', who: 'James T.', co: 'Legal Consultant · Bristol' },
  ]

  return (
    <section ref={ref} id="proof" style={{ background: 'var(--paper-deep)', padding: 'var(--section-pad) 0' }}>
      <div className="max-w-content mx-auto px-6">
        <p className="section-number prf-head mb-5">05 / Client voices</p>
        <W text="What clients say." tag="h2" className="prf-head"
          style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.08, marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        />
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <div key={i} className="prf-card" style={{
              position: 'relative',
              borderRadius: '8px',
              padding: '2.5rem 2rem 2rem',
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              overflow: 'hidden',
            }}>
              {/* Decorative quotation mark watermark */}
              <span aria-hidden="true" style={{
                position: 'absolute', top: '0.8rem', right: '1.25rem',
                fontFamily: 'var(--font-fraunces)',
                fontSize: '5.5rem',
                lineHeight: 1,
                color: 'var(--ink)',
                opacity: 0.052,
                pointerEvents: 'none',
                userSelect: 'none',
              }}>&ldquo;</span>

              <p style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: '0.98rem',
                fontWeight: 400,
                lineHeight: 1.62,
                letterSpacing: '-0.01em',
                color: 'var(--ink)',
                marginBottom: '1.75rem',
                position: 'relative',
                zIndex: 1,
              }}>{q.q}</p>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.1rem' }}>
                <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)' }}>{q.who}</span>
                <span style={{ display: 'block', fontSize: '0.7rem', fontFamily: 'var(--font-dm-mono)', color: 'var(--faint)', marginTop: '0.2rem', letterSpacing: '0.04em' }}>{q.co}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="prf-head mt-8 text-center" style={{ fontSize: '0.72rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>
          Client identities anonymised at their request · Contact for verifiable references
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRICING  (paper-warm)
═══════════════════════════════════════════════════════════════════════════ */

function Pricing() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.from('.pri-h2 .split-word', { y: 52, opacity: 0, duration: 0.85, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: '.pri-h2', start: 'top 86%' } })
    gsap.from('.pri-card', { y: 46, opacity: 0, duration: 0.8, stagger: 0.13, ease: 'expo.out', scrollTrigger: { trigger: '.pri-cards', start: 'top 80%' } })
  }, { scope: ref })

  const tiers = [
    {
      name: 'Founding', price: '£75', period: '/mo · 12-month lock', tag: '5 slots remaining',
      features: ['Everything in Core', 'Priority genome selection', '12-month price lock', 'Case study rights (mutual)', 'Direct founder access'],
      cta: 'Claim founding slot →', featured: true, note: 'Saves £180 vs Core. Closes 2026-05-09.',
      link: 'https://buy.stripe.com/5kQ3co9RVeeS6iSd6R4c80l',
    },
    {
      name: 'Core', price: '£90', period: '/mo', tag: null,
      features: ['Domain managed', 'DNS & SSL handled', '1–5 page site', 'Genome-matched design', '1 content update/month', 'Weekly health check', 'Vercel hosting'],
      cta: 'Get started →', featured: false, note: null,
      link: 'https://buy.stripe.com/4gMdR26FJc6K8r02sd4c80j',
    },
    {
      name: 'Full', price: '£175', period: '/mo', tag: null,
      features: ['Everything in Core', '4 content updates/month', 'Monthly report card PDF', '48h support SLA', 'Blog or news section', 'Priority genome selection'],
      cta: 'Get started →', featured: false, note: null,
      link: 'https://buy.stripe.com/9B64gs7JN6MqcHg0k54c80k',
    },
  ]

  return (
    <section ref={ref} id="pricing" style={{ background: 'var(--paper-warm)', padding: 'var(--section-pad) 0' }}>
      <div className="max-w-content mx-auto px-6">
        <p className="section-number mb-5">06 / Investment</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <W text="Three plans. One service." tag="h2" className="pri-h2"
            style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)', fontWeight: 400, maxWidth: '22ch', letterSpacing: '-0.028em' }}
          />
          <p className="text-sm max-w-xs" style={{ color: 'var(--mid)', lineHeight: 1.7 }}>
            After 12 months on any plan, the codebase is yours outright — take the repo and self-host, or stay on subscription.
          </p>
        </div>
        <div className="pri-cards grid md:grid-cols-3 gap-5 items-start">
          {tiers.map(t => (
            <div key={t.name} className="pri-card" style={{
              borderRadius: '10px',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              background: t.featured ? 'var(--ink)' : 'white',
              color: t.featured ? 'var(--paper)' : 'var(--ink)',
              border: t.featured ? '1px solid rgba(99,102,241,0.32)' : '1px solid var(--border)',
              boxShadow: t.featured ? '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(99,102,241,0.1)' : 'none',
              order: t.featured ? -1 : 0,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {t.featured && (
                <div aria-hidden="true" style={{
                  position: 'absolute', top: '-25%', right: '-15%',
                  width: '220px', height: '220px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
              )}
              {t.tag && (
                <span style={{
                  display: 'inline-block', alignSelf: 'flex-start', marginBottom: '1.1rem',
                  padding: '0.35rem 0.9rem', borderRadius: '100px',
                  background: 'rgba(99,102,241,0.14)', color: 'var(--accent)',
                  border: '1px solid rgba(99,102,241,0.28)',
                  fontFamily: 'var(--font-dm-mono)', fontSize: '0.68rem', letterSpacing: '0.06em',
                }}>{t.tag}</span>
              )}
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.9rem', opacity: 0.42, fontFamily: 'var(--font-dm-mono)' }}>{t.name}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '0.4rem' }}>
                <span className="price-num">{t.price}</span>
                <span style={{ fontSize: '0.78rem', opacity: 0.38 }}>{t.period}</span>
              </div>
              {t.note && <p style={{ fontSize: '0.78rem', color: 'rgba(99,102,241,0.82)', marginBottom: '1.25rem', marginTop: '0.3rem' }}>{t.note}</p>}
              <hr style={{ border: 'none', borderTop: '1px solid currentColor', opacity: 0.1, margin: '1.25rem 0' }} />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1, marginBottom: '1.75rem' }}>
                {t.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <span style={{ color: t.featured ? 'var(--accent)' : 'var(--faint)', marginTop: '0.15em', fontSize: '0.6rem', flexShrink: 0 }}>✦</span>
                    <span style={{ opacity: 0.78 }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={t.link} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0.85rem 1.5rem', borderRadius: '3px', fontSize: '0.875rem',
                fontWeight: 500, textDecoration: 'none', transition: 'all 0.18s ease',
                background: t.featured ? 'var(--accent)' : 'transparent',
                color: t.featured ? 'white' : 'var(--ink)',
                border: t.featured ? '1px solid transparent' : '1px solid var(--border)',
              }}>
                {t.cta}
              </a>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.72rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>
          All plans include domain, Vercel hosting, SSL, and DNS · No lock-in beyond 12 months
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ  (paper)
═══════════════════════════════════════════════════════════════════════════ */

function FAQ() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  useReveal(ref, '.faq-item', { y: 20, stagger: 0.05 }, 'top 80%')

  const items = [
    { q: 'How long does it take to get my site live?', a: '3–5 business days from brief receipt. We have delivered in 24 hours for urgent cases — mention it in the form.' },
    { q: 'What if I want changes after launch?', a: 'Core includes one content update per month. Full includes four. Structural changes at no extra charge within reason. You email; we handle it.' },
    { q: 'Do I own the site?', a: 'After 12 months on any plan, the repository and all assets are yours. You can self-host or stay on subscription. On earlier cancellation, we export and hand over everything cleanly.' },
    { q: 'What makes Foundy different from Squarespace or Wix?', a: 'Those are tools that require you to learn, maintain, and fix them. Foundy is a service. You brief us once. We build, host, update, and manage everything. You never log into a website builder.' },
    { q: 'Can I bring my own domain?', a: 'Yes. We transfer management of an existing domain or purchase a new one on your behalf. Domain cost is included in all plans.' },
    { q: 'What is a genome?', a: 'A genome is a complete design identity — typographic system, colour palette, spacing rhythm, component logic — built for a specific business type. We select yours from your brief, not a dropdown.' },
    { q: 'What happens if I cancel?', a: 'Cancel any time. 30 days notice. We hand over all files and content and close your account cleanly. No lock-in, no exit fees.' },
    { q: 'Do you work outside the UK?', a: 'Our focus is UK B2B professionals. We occasionally work with founders based elsewhere who primarily sell into the UK market.' },
  ]

  return (
    <section ref={ref} id="faq" style={{ background: 'var(--paper)', padding: 'var(--section-pad) 0', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-content mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div style={{ position: 'sticky', top: '5rem' }}>
            <p className="section-number mb-5">07 / Questions</p>
            <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Everything you want to know.
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.7 }}>
              Still have a question?{' '}
              <a href="mailto:hello@foundy.studio" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hello@foundy.studio</a>
              . We respond within 24 hours.
            </p>
          </div>
          <div>
            {items.map((item, i) => (
              <div key={i} className="faq-item" style={{ borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', padding: '1.25rem 0', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink)', textAlign: 'left' }}
                >
                  <span style={{ fontSize: '0.93rem', fontWeight: 500, lineHeight: 1.45, letterSpacing: '-0.01em' }}>{item.q}</span>
                  <span style={{ flexShrink: 0, fontSize: '1.1rem', color: 'var(--faint)', transition: 'transform 0.22s ease', transform: open === i ? 'rotate(45deg)' : 'none', display: 'inline-block', lineHeight: 1, marginTop: '0.1rem' }}>+</span>
                </button>
                <div style={{ overflow: 'hidden', maxHeight: open === i ? '400px' : '0', transition: 'max-height 0.32s ease, padding-bottom 0.32s ease', paddingBottom: open === i ? '1.25rem' : 0 }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.72 }}>{item.a}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA BAND  (ink / dark)
═══════════════════════════════════════════════════════════════════════════ */

function CTABand() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref, '.cta-inner > *', { y: 28, stagger: 0.1 }, 'top 82%')

  return (
    <section ref={ref} style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(4rem,9vw,8rem) 0', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-25%', left: '50%', transform: 'translateX(-50%)', width: '65vw', height: '55vw', maxWidth: '720px', maxHeight: '620px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div className="max-w-content mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cta-inner">
          <p className="section-number mb-5" style={{ color: 'rgba(245,244,240,0.3)', textAlign: 'center' }}>08 / Begin</p>
          <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(2.2rem,5.5vw,4.5rem)', fontWeight: 400, letterSpacing: '-0.032em', lineHeight: 1.05, maxWidth: '18ch', margin: '0 auto 1.5rem' }}>
            Ready to stop thinking about your website?
          </h2>
          <p style={{ color: 'rgba(245,244,240,0.42)', fontSize: 'clamp(0.95rem,1.5vw,1.05rem)', maxWidth: '42ch', margin: '0 auto 2.75rem', lineHeight: 1.65 }}>
            Join this week to lock the founding rate. Five slots. No setup fee. Live within the week.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center' }}>
            <a href="#intake" className="btn-primary" style={{ fontSize: '0.95rem', padding: '0.95rem 2rem' }}>Claim founding slot — £75/mo →</a>
            <a href="mailto:hello@foundy.studio" className="btn-ghost" style={{ fontSize: '0.95rem', padding: '0.95rem 2rem' }}>Ask a question first</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INTAKE  (paper)
═══════════════════════════════════════════════════════════════════════════ */

function Intake() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.from('.int-l > *', { y: 24, opacity: 0, duration: 0.7, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: '.int-l', start: 'top 82%' } })
    gsap.from('.int-r', { y: 38, opacity: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: '.int-r', start: 'top 85%' } })
  }, { scope: ref })

  const [name,   setName]   = useState('')
  const [email,  setEmail]  = useState('')
  const [brief,  setBrief]  = useState('')
  const [plan,   setPlan]   = useState('founding')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res  = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, brief, plan }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.stripeUrl
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem', borderRadius: '5px',
    fontSize: '0.875rem', background: 'white',
    border: '1px solid var(--border)', color: 'var(--ink)', outline: 'none',
    fontFamily: 'var(--font-dm-sans)', boxSizing: 'border-box',
    transition: 'border-color 0.18s ease',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.68rem', marginBottom: '0.5rem',
    color: 'var(--mid)', letterSpacing: '0.1em', textTransform: 'uppercase',
    fontFamily: 'var(--font-dm-mono)',
  }

  return (
    <section ref={ref} id="intake" style={{ background: 'var(--paper)', padding: 'var(--section-pad) 0' }}>
      <div className="max-w-content mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="int-l">
            <p className="section-number mb-5">09 / Your brief</p>
            <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.9rem,3.8vw,2.9rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.08, marginBottom: '1.25rem' }}>
              Tell us what you do.<br />We handle the rest.
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--mid)', lineHeight: 1.72, marginBottom: '2rem' }}>
              Fill the form. We review your brief, select the genome, and send a site preview within 3 business days. No payment until you approve the design.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['No setup fee · cancel anytime', 'Site preview before first payment', 'Founding rate locked if you join this week'].map(l => (
                <p key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--mid)' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '0.58rem', flexShrink: 0 }}>✦</span>{l}
                </p>
              ))}
            </div>
          </div>
          <div className="int-r" style={{ background: 'var(--paper-warm)', border: '1px solid var(--border)', borderRadius: '10px', padding: '2.25rem 2rem' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={handleSubmit}>
              <div>
                <label style={labelStyle}>Your name</label>
                <input type="text" placeholder="Alex Smith" required value={name} onChange={e => setName(e.target.value)} style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Work email</label>
                <input type="email" placeholder="alex@firmname.co.uk" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                />
              </div>
              <div>
                <label style={labelStyle}>What does your business do?</label>
                <textarea rows={4} placeholder="I'm a fractional CFO working with UK scale-ups..."
                  value={brief} onChange={e => setBrief(e.target.value)}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Plan</label>
                <select style={inputStyle} value={plan} onChange={e => setPlan(e.target.value)}>
                  <option value="founding">Founding — £75/mo (5 slots left)</option>
                  <option value="core">Core — £90/mo</option>
                  <option value="full">Full — £175/mo</option>
                </select>
              </div>
              <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem', opacity: status === 'loading' ? 0.7 : 1 }}>
                {status === 'loading' ? 'Saving brief…' : 'Send brief →'}
              </button>
              {status === 'error' && (
                <p style={{ fontSize: '0.72rem', color: '#c0392b', textAlign: 'center', fontFamily: 'var(--font-dm-mono)' }}>
                  Something went wrong — please try again or email hello@foundy.studio
                </p>
              )}
              <p style={{ fontSize: '0.7rem', color: 'var(--faint)', textAlign: 'center', fontFamily: 'var(--font-dm-mono)' }}>
                We respond within 24 hours · No payment until you approve
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════════ */

function Footer() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref, '.ft-row > *', { y: 12, stagger: 0.06 }, 'top 92%')

  return (
    <footer ref={ref} style={{ borderTop: '1px solid var(--border)', background: 'var(--paper-deep)', padding: '2.75rem 0' }}>
      <div className="max-w-content mx-auto px-6">
        <div className="ft-row flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit', marginBottom: '0.35rem' }} aria-label="Foundy home">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="32" height="32" rx="5" fill="#0A0A0B"/>
                <rect x="8" y="6.5" width="3.5" height="18.5" fill="#F5F4F0"/>
                <rect x="8" y="6.5" width="16" height="3" fill="#F5F4F0"/>
                <rect x="8" y="13.5" width="11" height="2.75" fill="#F5F4F0"/>
                <rect x="12.5" y="26.5" width="9.5" height="2" rx="1" fill="#6366F1"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.15rem', letterSpacing: '-0.04em', fontWeight: 400 }}>Foundy.</span>
            </a>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>Turnkey websites for UK B2B professionals</span>
          </div>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {[['#process', 'Process'], ['#genomes', 'Genomes'], ['#pricing', 'Pricing'], ['#faq', 'FAQ'], ['mailto:hello@foundy.studio', 'Contact']].map(([href, label]) => (
              <a key={label} href={href} style={{ fontSize: '0.875rem', color: 'var(--mid)', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--mid)' }}
              >{label}</a>
            ))}
          </nav>
          <p style={{ fontSize: '0.7rem', color: 'var(--faint)', fontFamily: 'var(--font-dm-mono)' }}>© 2026 Foundy · UK</p>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <ForWho />
        <Comparison />
        <Process />
        <Genomes />
        <SocialProof />
        <Pricing />
        <FAQ />
        <CTABand />
        <Intake />
      </main>
      <Footer />
    </>
  )
}


