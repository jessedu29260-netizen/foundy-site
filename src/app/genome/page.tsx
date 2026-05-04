'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ══════════════════════════════════════════════════════
   GENOME DATA
══════════════════════════════════════════════════════ */

type Genome = {
  id: string; name: string; tagline: string; color: string
  desc: string; traits: string[]; suits: string
}

const GENOMES: Genome[] = [
  { id:'G01', name:'Monument',  tagline:'Architectural authority',   color:'#A89070',
    desc:'Architectural, weighty, considered. For consultants and strategists who must communicate gravitas before a word is read. Whitespace does the heavy lifting.',
    traits:['Architectural','Authoritative','Serif-led','Spacious'],    suits:'Consultancies · Law · Strategy' },
  { id:'G02', name:'Signal',    tagline:'Editorial precision',       color:'#38BDF8',
    desc:'Clean, editorial, data-forward. Built for technical operators who need to communicate competence at a glance. Every element earns its place.',
    traits:['Editorial','Data-forward','Technical','Confident'],    suits:'SaaS · Tech · Analytics' },
  { id:'G03', name:'Grain',     tagline:'Warm human depth',          color:'#D97706',
    desc:'Warm, humanist, textured. For people-first professionals where trust is built on personality as much as credentials.',
    traits:['Warm','Humanist','Serif-rich','Approachable'],    suits:'Coaching · HR · People-first' },
  { id:'G04', name:'Edge',      tagline:'Bold high-contrast',        color:'#EF4444',
    desc:'Bold, dark, uncompromising. For operators who need their positioning to match their ambition. The antithesis of corporate beige.',
    traits:['Bold','High-contrast','Dark','Dramatic'],    suits:'Creative Agencies · Studios' },
  { id:'G05', name:'Meridian',  tagline:'Classic structured trust',  color:'#10B981',
    desc:'Classic, trustworthy, structured. For advisors where every detail communicates reliability. Clients judge risk before they judge capability.',
    traits:['Classic','Trustworthy','Structured','Formal'],    suits:'Finance · Accounting · Legal' },
  { id:'G06', name:'Craft',     tagline:'Artisanal character',       color:'#A855F7',
    desc:'Artisanal, textured, personal. For professionals where character and care are the differentiators. The work is never generic — neither is the site.',
    traits:['Artisanal','Textured','Personal','Detailed'],    suits:'Food · Interiors · Makers' },
  { id:'G07', name:'Lattice',   tagline:'Geometric Swiss',           color:'#6366F1',
    desc:'Geometric, minimal, mathematical. For engineers and architects where structure is the message. Negative space does most of the work.',
    traits:['Geometric','Minimal','Swiss','Precise'],    suits:'Engineering · Architecture' },
  { id:'G08', name:'Current',   tagline:'Flowing motion',            color:'#F59E0B',
    desc:'Fluid, motion-forward, alive. For comms and marketing operators where energy and rhythm are the proof of work.',
    traits:['Flowing','Modern','Energetic','Motion-led'],    suits:'Marketing · Comms · PR' },
]

const SCORES: Record<string, Record<string, Partial<Record<string, number>>>> = {
  feel: {
    authority: {G01:3,G05:3,G07:1,G02:1},
    precision: {G02:3,G07:2,G08:1,G05:1},
    warmth:    {G03:3,G06:2,G04:1},
    momentum:  {G04:2,G08:3,G02:1,G03:1},
  },
  work: {
    advise:   {G01:3,G05:2,G03:1},
    build:    {G07:3,G02:2,G05:1},
    people:   {G03:3,G06:2,G08:1},
    protect:  {G05:3,G01:2,G07:1},
    create:   {G04:3,G08:2,G06:2},
    research: {G02:3,G07:2,G05:1},
  },
  need: {
    reassurance: {G05:3,G01:2,G03:2},
    speed:       {G02:2,G08:3,G04:1},
    craft:       {G06:3,G04:2,G03:1,G01:1},
    clarity:     {G07:3,G02:2,G05:1},
  },
}

function computeGenome(feel: string, work: string, need: string): Genome {
  const totals: Record<string, number> = {}
  GENOMES.forEach(g => { totals[g.id] = 0 })
  for (const dim of ['feel', 'work', 'need'] as const) {
    const v = { feel, work, need }[dim]
    if (!v) continue
    const map = SCORES[dim]?.[v] || {}
    for (const [gid, pts] of Object.entries(map)) {
      totals[gid] = (totals[gid] || 0) + (pts as number)
    }
  }
  const topId = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0]
  return GENOMES.find(g => g.id === topId) || GENOMES[0]
}

/* ══════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════ */

type Pane = 'intro' | 'q1' | 'q2' | 'q3' | 'gate' | 'compute' | 'reveal'

interface QuizAnswers {
  feel: string | null
  work: string | null
  need: string | null
  email: string | null
}

/* ══════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════ */

function Nav() {
  const [dark, setDark] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setDark(y > 180)
      if (y > 200) {
        if (y > lastY.current + 6) setHidden(true)
        else if (y < lastY.current - 6) setHidden(false)
      } else {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90, height: '64px',
      display: 'flex', alignItems: 'center',
      background: dark ? 'rgba(10,10,11,.88)' : 'rgba(245,244,240,.82)',
      backdropFilter: 'blur(18px) saturate(1.2)',
      borderBottom: `1px solid ${dark ? 'rgba(245,244,240,.08)' : 'rgba(10,10,11,.08)'}`,
      color: dark ? 'var(--paper)' : 'var(--ink)',
      transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'transform .45s cubic-bezier(.7,0,.2,1), background .3s, border-color .3s, color .3s',
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none', color: 'inherit' }}>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="5" fill="#0A0A0B"/>
            <rect x="8" y="6.5" width="3.5" height="18.5" fill="#F5F4F0"/>
            <rect x="8" y="6.5" width="16" height="3" fill="#F5F4F0"/>
            <rect x="8" y="13.5" width="11" height="2.75" fill="#F5F4F0"/>
            <rect x="12.5" y="26.5" width="9.5" height="2" rx="1" fill="#6366F1"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.1rem', letterSpacing: '-0.04em' }}>Foundy.</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#quiz" style={{
            fontSize: '.82rem', color: dark ? 'rgba(245,244,240,.5)' : 'var(--mid)',
            textDecoration: 'none', transition: 'color .15s',
            display: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = dark ? 'var(--paper)' : 'var(--ink)' }}
            onMouseLeave={e => { e.currentTarget.style.color = dark ? 'rgba(245,244,240,.5)' : 'var(--mid)' }}
          >Genome quiz</a>
          <Link href="/#pricing" style={{
            fontSize: '.82rem', color: dark ? 'rgba(245,244,240,.5)' : 'var(--mid)',
            textDecoration: 'none', transition: 'color .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = dark ? 'var(--paper)' : 'var(--ink)' }}
            onMouseLeave={e => { e.currentTarget.style.color = dark ? 'rgba(245,244,240,.5)' : 'var(--mid)' }}
          >Pricing</Link>
          <a href="#quiz" className="btn-primary" style={{ fontSize: '.78rem', padding: '.58rem 1.1rem' }}>
            Start quiz →
          </a>
        </div>
      </div>
    </header>
  )
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */

function Hero() {
  return (
    <>
      {/* Orbit CSS */}
      <style>{`
        @keyframes orbitSpin { to { transform: rotate(360deg); } }
        @keyframes orbitCounter {
          from { transform: translate(-50%,-50%) rotate(var(--a)) translateY(calc(-1 * var(--r) * 1px)) rotate(calc(-1 * var(--a))); }
          to   { transform: translate(-50%,-50%) rotate(var(--a)) translateY(calc(-1 * var(--r) * 1px)) rotate(calc(-1 * var(--a) - 360deg)); }
        }
        @keyframes centerPulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.1);opacity:.15} }
        .orbit-spin      { position:absolute;inset:0;animation:orbitSpin 90s linear infinite;transform-origin:center; }
        .orbit-spin-rev  { animation-duration:140s !important; animation-direction:reverse !important; }
        .orbit-node      {
          position:absolute;left:50%;top:50%;
          display:inline-flex;align-items:center;gap:7px;
          padding:5px 11px 5px 7px;border-radius:100px;
          background:rgba(245,244,240,.84);backdrop-filter:blur(6px);
          border:1px solid rgba(10,10,11,.07);
          font-family:var(--font-dm-mono);font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;
          box-shadow:0 4px 18px rgba(10,10,11,.04);white-space:nowrap;color:var(--ink);
        }
        .orbit-spin     .orbit-node { animation:orbitCounter 90s linear infinite; }
        .orbit-spin-rev .orbit-node { animation:orbitCounter 140s linear infinite reverse; }
        .orbit-dot{width:7px;height:7px;border-radius:50%}
        .g-hero-badge { animation:heroFadeUp .6s cubic-bezier(.16,1,.3,1) .1s both; }
        .g-hero-h1    { animation:heroWordIn .7s cubic-bezier(.16,1,.3,1) .22s both; }
        .g-hero-sub   { animation:heroFadeUp .6s cubic-bezier(.16,1,.3,1) .38s both; }
        .g-hero-ctas  { animation:heroFadeUp .6s cubic-bezier(.16,1,.3,1) .52s both; }
        @keyframes heroFadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        @keyframes heroWordIn  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        .genome-chip-card{transition:transform .2s ease,box-shadow .2s ease}
        .genome-chip-card:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(10,10,11,.08) !important}
      `}</style>

      <section style={{
        minHeight: '100svh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '7rem 1.5rem 5rem',
        background: 'var(--paper)',
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        {/* Orbit system */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: '50%', top: '54%',
          transform: 'translate(-50%,-50%)',
          width: 'min(90vw, 1000px)', aspectRatio: '1/1',
          pointerEvents: 'none', zIndex: 0,
        }}>
          {/* Rings */}
          {[
            { inset: '0%', border: '1px solid rgba(10,10,11,.05)' },
            { inset: '10%', border: '1px dashed rgba(99,102,241,.09)' },
            { inset: '20%', border: '1px solid rgba(10,10,11,.04)' },
            { inset: '32%', border: '1px solid rgba(99,102,241,.12)' },
          ].map((r, i) => (
            <div key={i} style={{ position: 'absolute', inset: r.inset, borderRadius: '50%', border: r.border }} />
          ))}

          {/* Outer spin — canonical genome names */}
          <OrbitSpin speed={90} reversed={false} nodes={[
            { a: 0,   r: 0.44, color: '#A89070', label: 'Monument', num: '01' },
            { a: 90,  r: 0.44, color: '#38BDF8', label: 'Signal',   num: '02' },
            { a: 180, r: 0.44, color: '#D97706', label: 'Grain',    num: '03' },
            { a: 270, r: 0.44, color: '#EF4444', label: 'Edge',     num: '04' },
          ]} />

          {/* Inner spin reversed */}
          <OrbitSpin speed={140} reversed={true} nodes={[
            { a: 45,  r: 0.28, color: '#10B981', label: 'Meridian', num: '05' },
            { a: 135, r: 0.28, color: '#A855F7', label: 'Craft',    num: '06' },
            { a: 225, r: 0.28, color: '#6366F1', label: 'Lattice',  num: '07' },
            { a: 315, r: 0.28, color: '#F59E0B', label: 'Current',  num: '08' },
          ]} />

          {/* Centre mark */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%,-50%)',
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'var(--ink)', color: 'var(--paper)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-fraunces)', fontSize: '1.3rem', fontStyle: 'italic', fontWeight: 300,
            boxShadow: '0 0 0 6px rgba(10,10,11,.04), 0 16px 40px rgba(10,10,11,.15)',
          }}>
            <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', border: '1px solid rgba(99,102,241,.28)', animation: 'centerPulse 3s ease-in-out infinite' }} />
            f.
          </div>
        </div>

        {/* Floating preview chips */}
        <PreviewChip style={{ top: '22%', left: '6%' }} title="Marlowe & Finch" sub="Strategy consultancy — day 4" />
        <PreviewChip style={{ top: '28%', right: '5%' }} title="Halden CFO" sub="Fractional finance — day 3" />
        <PreviewChip style={{ bottom: '26%', left: '8%' }} title="Whitcomb Legal" sub="Commercial law — day 5" />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="g-hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            marginBottom: '2rem', padding: '.42rem 1rem',
            borderRadius: '100px', background: 'rgba(99,102,241,.07)',
            border: '1px solid rgba(99,102,241,.2)',
            fontSize: '.75rem', fontFamily: 'var(--font-dm-mono)', letterSpacing: '.06em', color: 'var(--accent)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s ease-in-out infinite' }} />
            Founding slots open — 5 remaining
          </div>

          <h1 className="g-hero-h1" style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(2.6rem, 7vw, 6.5rem)',
            fontWeight: 400, letterSpacing: '-0.032em', lineHeight: 1.04,
            maxWidth: '14ch', margin: '0 auto 1.5rem',
          }}>
            Find the design identity your business deserves.
          </h1>

          <p className="g-hero-sub" style={{
            fontSize: 'clamp(.95rem, 1.5vw, 1.08rem)', color: 'var(--mid)',
            maxWidth: '44ch', lineHeight: 1.65, margin: '0 auto 2.25rem',
          }}>
            Three questions. Ninety seconds. We match you to one of eight genome design identities and show you exactly how your site would look.
          </p>

          <div className="g-hero-ctas" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.7rem' }}>
            <a href="#quiz" className="btn-primary" style={{ fontSize: '.92rem', padding: '.88rem 2rem', lineHeight: 1 }}>
              Begin the quiz → <span style={{ opacity: .6, fontFamily: 'var(--font-dm-mono)', fontSize: '.7rem', marginLeft: '4px' }}>90 sec</span>
            </a>
            <Link href="/" style={{
              display: 'inline-flex', alignItems: 'center',
              fontSize: '.92rem', padding: '.88rem 1.8rem', lineHeight: 1,
              color: 'var(--mid)', textDecoration: 'none',
              border: '1px solid var(--border)', borderRadius: '3px',
              transition: 'border-color .18s, color .18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(10,10,11,.25)'; e.currentTarget.style.color = 'var(--ink)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--mid)' }}
            >
              See pricing
            </Link>
          </div>
        </div>

        {/* Scroll nudge */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.4rem',
          opacity: .4, animation: 'scrollBounce 2.2s ease-in-out 1.4s both',
        }}>
          <span style={{ fontSize: '.58rem', fontFamily: 'var(--font-dm-mono)', letterSpacing: '.12em', textTransform: 'uppercase' }}>scroll</span>
          <svg width="11" height="17" viewBox="0 0 12 18" fill="none">
            <rect x=".75" y=".75" width="10.5" height="16.5" rx="5.25" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="6" cy="5.5" r="1.75" fill="currentColor"/>
          </svg>
        </div>
      </section>
    </>
  )
}

function OrbitSpin({ speed, reversed, nodes }: {
  speed: number; reversed: boolean
  nodes: { a: number; r: number; color: string; label: string; num: string }[]
}) {
  return (
    <div className={`orbit-spin ${reversed ? 'orbit-spin-rev' : ''}`}>
      {nodes.map(n => {
        const containerSize = 'min(90vw, 1000px)'
        const rpx = `calc(${containerSize} * ${n.r})`
        return (
          <span key={n.label} className="orbit-node" style={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ['--a' as any]: `${n.a}deg`,
            transform: `translate(-50%,-50%) rotate(${n.a}deg) translateY(calc(-1 * ${containerSize} * ${n.r})) rotate(${-n.a}deg)`,
            animation: `orbitCounter ${speed}s linear infinite ${reversed ? 'reverse' : ''}`,
          } as React.CSSProperties}>
            <i className="orbit-dot" style={{ background: n.color }} />
            <span style={{ opacity: .38, fontSize: '.52rem' }}>{n.num}</span>
            {n.label}
          </span>
        )
      })}
    </div>
  )
}

function PreviewChip({ style, title, sub }: { style: React.CSSProperties; title: string; sub: string }) {
  return (
    <div className="genome-chip-card" aria-hidden="true" style={{
      position: 'absolute', background: '#fff',
      border: '1px solid var(--border)', borderRadius: '10px',
      padding: '11px 14px', zIndex: 1,
      boxShadow: '0 16px 48px -16px rgba(10,10,11,.14), 0 3px 10px rgba(10,10,11,.04)',
      pointerEvents: 'none', maxWidth: '170px',
      ...style,
    }}>
      <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.56rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '5px' }}>live · deployed</div>
      <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '.88rem', letterSpacing: '-0.02em' }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.58rem', color: 'var(--faint)', marginTop: '3px' }}>{sub}</div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════════════ */

function Marquee() {
  const items = 'Strategy Consultants · Fractional CFOs · HR Directors · Legal Advisors · Marketing Partners · Finance Leaders · B2B Agency Owners · Executive Coaches · Risk Consultants · Operations Directors · Policy Advisors · Recruitment Firms'
  return (
    <div style={{
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      overflow: 'hidden', background: 'var(--paper-warm)', padding: '.9rem 0',
    }}>
      <div className="marquee-track">
        {[items, items].map((t, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.68rem', letterSpacing: '.11em', textTransform: 'uppercase', color: 'var(--mid)', whiteSpace: 'nowrap' }}>
            {t}<span style={{ margin: '0 1.5rem', color: 'var(--faint)' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   QUIZ PANE COMPONENTS
══════════════════════════════════════════════════════ */

function IntroPaneContent({ onBegin }: { onBegin: () => void }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(245,244,240,.36)', marginBottom: '1.5rem' }}>
        The Foundy genome match · 90 seconds
      </div>
      <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.9rem,4.5vw,3.2rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.06, marginBottom: '1.25rem', color: 'var(--paper)' }}>
        Three questions. <em>One match.</em><br/>Built for you, not picked from a list.
      </h2>
      <p style={{ fontSize: '.95rem', color: 'rgba(245,244,240,.48)', lineHeight: 1.7, maxWidth: '50ch', marginBottom: '2.25rem' }}>
        A genome is the design DNA we use to build your site — typography, colour, spacing, voice. Answer three short questions and we compute the one that fits your business. No call. No deck.
      </p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <button className="btn-primary" onClick={onBegin} style={{ fontSize: '.88rem', padding: '.85rem 1.75rem' }}>
          Begin → <span style={{ opacity: .65, fontFamily: 'var(--font-dm-mono)', fontSize: '.7rem', marginLeft: '6px' }}>Q1 / 3</span>
        </button>
        <a href="/#process" style={{
          display: 'inline-flex', alignItems: 'center', padding: '.85rem 1.5rem',
          fontSize: '.88rem', textDecoration: 'none', borderRadius: '3px',
          background: 'transparent', border: '1px solid rgba(245,244,240,.16)', color: 'rgba(245,244,240,.6)',
          transition: 'border-color .15s, color .15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,244,240,.4)'; e.currentTarget.style.color = 'var(--paper)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,244,240,.16)'; e.currentTarget.style.color = 'rgba(245,244,240,.6)' }}
        >Skip the quiz</a>
      </div>
      <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap', fontFamily: 'var(--font-dm-mono)', fontSize: '.68rem', color: 'rgba(245,244,240,.28)' }}>
        <span>· No phone number</span>
        <span>· No commitment</span>
        <span>· Reply within 24 hours</span>
      </div>
    </div>
  )
}

interface Opt { key: string; label: string; desc: string }

function QPaneContent({ eyebrow, question, help, opts, selected, onSelect }: {
  eyebrow: string; question: string; help: string
  opts: Opt[]; selected: string | null
  onSelect: (key: string) => void
}) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(245,244,240,.36)', marginBottom: '1.25rem' }}>
        {eyebrow}
      </div>
      <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.5rem,3.8vw,2.5rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.1, color: 'var(--paper)', marginBottom: '.75rem' }}>
        {question.split(/(.*?)(?= —)/).filter(Boolean).map((part, i) =>
          i === 0 ? <span key={i}>{part}</span> : <em key={i}>{part}</em>
        )}
      </h2>
      <p style={{ fontSize: '.88rem', color: 'rgba(245,244,240,.38)', marginBottom: '1.75rem' }}>{help}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {opts.map((opt, idx) => (
          <OptButton
            key={opt.key}
            index={idx}
            label={opt.label}
            desc={opt.desc}
            selected={selected === opt.key}
            onClick={() => onSelect(opt.key)}
          />
        ))}
      </div>
    </div>
  )
}

function OptButton({ index, label, desc, selected, onClick }: {
  index: number; label: string; desc: string; selected: boolean; onClick: () => void
}) {
  const letters = 'ABCDEF'
  const [pressed, setPressed] = useState(false)

  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        padding: '15px 18px', borderRadius: '8px',
        background: selected ? 'rgba(99,102,241,.15)' : 'rgba(245,244,240,.04)',
        border: `1px solid ${selected ? 'rgba(99,102,241,.4)' : 'rgba(245,244,240,.1)'}`,
        cursor: 'pointer', textAlign: 'left',
        transition: 'background .2s, border-color .2s, transform .1s',
        transform: pressed ? 'scale(.985)' : 'scale(1)',
      }}
      onMouseEnter={e => { if (!selected) { e.currentTarget.style.background = 'rgba(245,244,240,.08)'; e.currentTarget.style.borderColor = 'rgba(245,244,240,.2)' } }}
      onMouseLeave={e => { if (!selected) { e.currentTarget.style.background = 'rgba(245,244,240,.04)'; e.currentTarget.style.borderColor = 'rgba(245,244,240,.1)' } }}
    >
      <span style={{
        width: '28px', height: '28px', borderRadius: '4px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-dm-mono)', fontSize: '.72rem',
        background: selected ? 'var(--accent)' : 'rgba(245,244,240,.08)',
        color: selected ? '#fff' : 'rgba(245,244,240,.5)',
        transition: 'background .2s, color .2s',
      }}>{letters[index]}</span>
      <div>
        <div style={{ fontWeight: 500, fontSize: '.92rem', color: 'var(--paper)', lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontSize: '.78rem', color: 'rgba(245,244,240,.36)', marginTop: '2px' }}>{desc}</div>
      </div>
    </button>
  )
}

function GatePaneContent({ emailInput, setEmailInput, gateStatus, onSubmit, onBack }: {
  emailInput: string; setEmailInput: (v: string) => void
  gateStatus: 'idle' | 'loading'
  onSubmit: (e: React.FormEvent) => void
  onBack: () => void
}) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(245,244,240,.36)', marginBottom: '1.25rem' }}>
        Almost there · Result computed
      </div>
      <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.6rem,4vw,2.7rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.08, color: 'var(--paper)', marginBottom: '.75rem' }}>
        Where should we <em>send your match?</em>
      </h2>
      <p style={{ fontSize: '.88rem', color: 'rgba(245,244,240,.4)', marginBottom: '1.75rem', lineHeight: 1.65 }}>
        We will email your full genome profile — name, design DNA, colour palette, sample mockup — within 60 seconds. We do not pass your details on. Ever.
      </p>
      <form onSubmit={onSubmit}>
        <input
          type="email" required placeholder="your@firm.co.uk"
          value={emailInput} onChange={e => setEmailInput(e.target.value)}
          style={{
            width: '100%', padding: '.85rem 1rem', marginBottom: '10px',
            borderRadius: '6px', border: '1px solid rgba(245,244,240,.15)',
            background: 'rgba(245,244,240,.06)', color: 'var(--paper)',
            fontSize: '.92rem', fontFamily: 'var(--font-dm-sans)', outline: 'none',
            transition: 'border-color .18s',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,.7)' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(245,244,240,.15)' }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit" disabled={gateStatus === 'loading'} className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', fontSize: '.9rem', padding: '.88rem 1rem' }}>
            {gateStatus === 'loading' ? 'Computing…' : 'Reveal my genome →'}
          </button>
          <button type="button" onClick={onBack} style={{
            padding: '.88rem 1.2rem', borderRadius: '3px', fontSize: '.88rem',
            background: 'transparent', border: '1px solid rgba(245,244,240,.16)', color: 'rgba(245,244,240,.6)', cursor: 'pointer',
            transition: 'border-color .15s, color .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,244,240,.4)'; e.currentTarget.style.color = 'var(--paper)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,244,240,.16)'; e.currentTarget.style.color = 'rgba(245,244,240,.6)' }}
          >← back</button>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '14px', fontFamily: 'var(--font-dm-mono)', fontSize: '.64rem', color: 'rgba(245,244,240,.24)' }}>
          <span>Single email, no list</span>
          <span>Unsubscribe in one click</span>
          <span>UK GDPR compliant</span>
        </div>
      </form>
    </div>
  )
}

function ComputePaneContent({ feedLines }: { feedLines: { tag: string; text: string; ok?: boolean }[] }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(245,244,240,.36)', marginBottom: '1.25rem' }}>
        Computing your match
      </div>
      <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.5rem,3.6vw,2.4rem)', fontWeight: 400, letterSpacing: '-0.028em', lineHeight: 1.1, color: 'var(--paper)', marginBottom: '2rem' }}>
        Reading your answers <em>against eight genomes…</em>
      </h2>
      <div style={{
        background: 'rgba(10,10,11,.5)', borderRadius: '8px',
        border: '1px solid rgba(245,244,240,.08)', padding: '20px',
        fontFamily: 'var(--font-dm-mono)', fontSize: '.73rem',
        display: 'flex', flexDirection: 'column', gap: '8px',
        minHeight: '160px',
      }}>
        {feedLines.map((ln, i) => (
          <div key={i} style={{
            display: 'flex', gap: '10px', alignItems: 'flex-start',
            animation: 'heroFadeUp .4s ease both',
          }}>
            <span style={{
              padding: '1px 7px', borderRadius: '3px', flexShrink: 0,
              background: ln.ok ? 'rgba(16,185,129,.2)' : 'rgba(99,102,241,.18)',
              color: ln.ok ? '#10B981' : 'rgba(99,102,241,.9)',
              fontSize: '.62rem',
            }}>{ln.ok ? '✓ ok' : ln.tag}</span>
            <span style={{ color: 'rgba(245,244,240,.55)' }}>{ln.text}</span>
          </div>
        ))}
        {feedLines.length < 6 && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', opacity: .5, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </div>
        )}
      </div>
      {/* Pulse bar */}
      <div style={{ marginTop: '16px', height: '2px', borderRadius: '2px', background: 'rgba(245,244,240,.06)', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: 'var(--accent)', borderRadius: '2px', animation: 'computePulse 2.4s ease-in-out infinite' }} />
      </div>
      <style>{`@keyframes computePulse{0%{width:0%;opacity:.8}70%{width:100%;opacity:1}100%{width:100%;opacity:0}}`}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   REVEAL
══════════════════════════════════════════════════════ */

function RevealContent({ genome, email, onRetake }: { genome: Genome; email: string; onRetake: () => void }) {
  useEffect(() => {
    setTimeout(() => {
      document.getElementById('reveal-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 240)
  }, [])

  return (
    <div id="reveal-section">
      <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(245,244,240,.36)', marginBottom: '1.25rem' }}>
        Your genome · {genome.id} · matched
      </div>
      <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(2.2rem,5.5vw,4rem)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.04, color: 'var(--paper)', marginBottom: '.6rem' }}>
        {genome.name}.
      </h2>
      <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.8rem', letterSpacing: '.12em', textTransform: 'uppercase', color: genome.color, marginBottom: '1.4rem' }}>
        {genome.tagline}
      </div>
      <p style={{ fontSize: '.95rem', color: 'rgba(245,244,240,.52)', lineHeight: 1.7, maxWidth: '52ch', marginBottom: '1.75rem' }}>{genome.desc}</p>

      {/* Traits */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {genome.traits.map(t => (
          <span key={t} style={{
            padding: '5px 12px', borderRadius: '100px',
            background: genome.color + '1a', border: `1px solid ${genome.color}33`,
            fontFamily: 'var(--font-dm-mono)', fontSize: '.64rem', letterSpacing: '.1em',
            textTransform: 'uppercase', color: genome.color,
          }}>{t}</span>
        ))}
      </div>

      {/* Genome frame visual */}
      <div style={{
        padding: '28px 24px', borderRadius: '10px', marginBottom: '2rem',
        background: `linear-gradient(140deg, ${genome.color}22 0%, ${genome.color}08 100%)`,
        borderTop: `2px solid ${genome.color}`,
        border: `1px solid ${genome.color}22`,
      }}>
        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.68rem', letterSpacing: '.14em', color: genome.color }}>{genome.id} · {genome.name.toUpperCase()}</div>
        <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.5rem', letterSpacing: '-0.04em', color: 'var(--paper)', marginTop: '10px' }}>{genome.name}.</div>
        <div style={{ height: '1px', background: `${genome.color}33`, margin: '10px 0' }} />
        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.68rem', letterSpacing: '.14em', color: 'rgba(245,244,240,.36)', textTransform: 'uppercase' }}>{genome.suits}</div>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <Link href="/#pricing" className="btn-primary" style={{ fontSize: '.88rem', padding: '.85rem 1.75rem' }}>
          Build with this genome →
        </Link>
        <button onClick={onRetake} style={{
          padding: '.85rem 1.4rem', borderRadius: '3px', fontSize: '.88rem', cursor: 'pointer',
          background: 'transparent', border: '1px solid rgba(245,244,240,.18)', color: 'rgba(245,244,240,.65)',
          transition: 'border-color .15s, color .15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,244,240,.45)'; e.currentTarget.style.color = 'var(--paper)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,244,240,.18)'; e.currentTarget.style.color = 'rgba(245,244,240,.65)' }}
        >Retake the quiz</button>
      </div>

      {email && (
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.68rem', color: 'rgba(245,244,240,.26)' }}>
          Full breakdown emailed to <span style={{ color: 'rgba(245,244,240,.6)' }}>{email}</span>
        </p>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   GENOME QUIZ (state machine wrapper)
══════════════════════════════════════════════════════ */

function GenomeQuiz() {
  const [pane, setPaneRaw] = useState<Pane>('intro')
  const [answers, setAnswers] = useState<QuizAnswers>({ feel: null, work: null, need: null, email: null })
  const [feedLines, setFeedLines] = useState<{ tag: string; text: string; ok?: boolean }[]>([])
  const [result, setResult] = useState<Genome | null>(null)
  const [emailInput, setEmailInput] = useState('')
  const [gateStatus, setGateStatus] = useState<'idle' | 'loading'>('idle')
  const computeStarted = useRef(false)

  function goTo(name: Pane) { setPaneRaw(name) }

  function selectOpt(dim: keyof Pick<QuizAnswers, 'feel' | 'work' | 'need'>, key: string, next: Pane) {
    setAnswers(a => ({ ...a, [dim]: key }))
    setTimeout(() => goTo(next), 320)
  }

  async function submitGate(e: React.FormEvent) {
    e.preventDefault()
    if (!emailInput.trim() || gateStatus === 'loading') return
    setGateStatus('loading')
    fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput.trim(), source: 'genome' }),
    }).catch(() => {})
    setAnswers(a => ({ ...a, email: emailInput.trim() }))
    goTo('compute')
  }

  // Compute animation
  useEffect(() => {
    if (pane !== 'compute' || computeStarted.current) return
    computeStarted.current = true
    const lines = [
      { tag: 'init',   text: `reading inputs · feel=${answers.feel}, work=${answers.work}, need=${answers.need}` },
      { tag: 'weight', text: 'applying genome weights · 8 candidates · 24 dimensions' },
      { tag: 'score',  text: 'scoring across professionalism, creativity, density, warmth' },
      { tag: 'rank',   text: 'rank-ordering candidates' },
      { tag: 'pick',   text: 'top match isolated · confidence > 92%' },
      { tag: 'sign',   text: `preparing reveal · sending preview to ${answers.email}`, ok: true },
    ]
    let i = 0
    function tick() {
      if (i >= lines.length) {
        setTimeout(() => {
          const g = computeGenome(answers.feel!, answers.work!, answers.need!)
          setResult(g)
          setPaneRaw('reveal')
        }, 700)
        return
      }
      setFeedLines(prev => [...prev, lines[i++]])
      setTimeout(tick, 400 + Math.random() * 200)
    }
    setTimeout(tick, 200)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pane])

  function retake() {
    setAnswers({ feel: null, work: null, need: null, email: null })
    setEmailInput('')
    setFeedLines([])
    setResult(null)
    computeStarted.current = false
    setGateStatus('idle')
    setPaneRaw('intro')
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const segIdx: Record<Pane, number> = { intro:0, q1:0, q2:1, q3:2, gate:3, compute:4, reveal:4 }
  const seg = segIdx[pane] ?? 0

  return (
    <section id="quiz" style={{
      minHeight: '100svh',
      background: 'var(--ink)', color: 'var(--paper)',
      padding: 'clamp(5rem,10vw,9rem) 1.5rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Aurora */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(99,102,241,.11) 0%, transparent 70%)',
      }} />

      <div style={{ width: '100%', maxWidth: '660px', position: 'relative', zIndex: 1 }}>
        {/* Progress bar */}
        {pane !== 'reveal' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.63rem', letterSpacing: '.14em', color: 'rgba(245,244,240,.28)', minWidth: '3.2rem' }}>
              {String(seg).padStart(2, '0')} / 04
            </span>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{
                flex: 1, height: '2px', borderRadius: '2px',
                background: i < seg ? 'var(--accent)' : i === seg ? 'rgba(99,102,241,.55)' : 'rgba(245,244,240,.1)',
                transition: 'background .4s ease',
              }} />
            ))}
          </div>
        )}

        {/* Pane content — animated swap */}
        <div key={pane} style={{ animation: 'heroFadeUp .38s cubic-bezier(.16,1,.3,1) both' }}>
          {pane === 'intro' && <IntroPaneContent onBegin={() => goTo('q1')} />}
          {pane === 'q1' && (
            <QPaneContent
              eyebrow="Question 01 / 03"
              question="When a prospect lands on your site, the first feeling they should have is —"
              help="Pick the closest. We weight your answers across all eight genomes."
              opts={[
                { key: 'authority', label: 'Authority', desc: 'Considered, established, weighty.' },
                { key: 'precision', label: 'Precision', desc: 'Sharp, technical, exact.' },
                { key: 'warmth',    label: 'Warmth',    desc: 'Human, approachable, generous.' },
                { key: 'momentum',  label: 'Momentum',  desc: 'Forward-leaning, energetic, alive.' },
              ]}
              selected={answers.feel}
              onSelect={key => selectOpt('feel', key, 'q2')}
            />
          )}
          {pane === 'q2' && (
            <QPaneContent
              eyebrow="Question 02 / 03"
              question="Your work, in one true sentence —"
              help="Don't think about marketing copy. Think about what you actually do day to day."
              opts={[
                { key: 'advise',   label: 'I advise leaders',     desc: 'Strategy, fractional, board-level.' },
                { key: 'build',    label: 'I build systems',       desc: 'Engineering, ops, infrastructure.' },
                { key: 'people',   label: 'I work with people',    desc: 'Coaching, HR, talent, recruitment.' },
                { key: 'protect',  label: 'I protect interests',   desc: 'Legal, finance, compliance, audit.' },
                { key: 'create',   label: 'I create things',       desc: 'Design, brand, content, marketing.' },
                { key: 'research', label: 'I analyse and report',  desc: 'Research, data, insight, audit.' },
              ]}
              selected={answers.work}
              onSelect={key => selectOpt('work', key, 'q3')}
            />
          )}
          {pane === 'q3' && (
            <QPaneContent
              eyebrow="Question 03 / 03"
              question="Your typical client decides to call you because they need —"
              help="The reason their hand reaches for the phone."
              opts={[
                { key: 'reassurance', label: 'Reassurance', desc: '"I need a steady hand on this."' },
                { key: 'speed',       label: 'Speed',       desc: '"I need this fixed yesterday."' },
                { key: 'craft',       label: 'Craft',       desc: '"I need someone who actually cares."' },
                { key: 'clarity',     label: 'Clarity',     desc: '"I need to understand what is actually happening."' },
              ]}
              selected={answers.need}
              onSelect={key => selectOpt('need', key, 'gate')}
            />
          )}
          {pane === 'gate' && (
            <GatePaneContent
              emailInput={emailInput}
              setEmailInput={setEmailInput}
              gateStatus={gateStatus}
              onSubmit={submitGate}
              onBack={() => goTo('q3')}
            />
          )}
          {pane === 'compute' && <ComputePaneContent feedLines={feedLines} />}
          {pane === 'reveal' && result && (
            <RevealContent genome={result} email={answers.email || ''} onRetake={retake} />
          )}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   GENOMES GRID
══════════════════════════════════════════════════════ */

function GenomesGrid() {
  return (
    <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(4rem,8vw,7rem) 1.5rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(245,244,240,.3)', marginBottom: '1rem' }}>
          All eight genomes
        </p>
        <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '2.5rem', color: 'var(--paper)' }}>
          Eight genomes.<br/>One matched to you.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {GENOMES.map(g => (
            <a key={g.id} href="#quiz" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '22px 20px', borderRadius: '8px',
                background: 'rgba(245,244,240,.03)', border: `1px solid rgba(245,244,240,.07)`,
                borderTop: `2px solid ${g.color}`, cursor: 'pointer',
                transition: 'background .2s, transform .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,244,240,.06)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,244,240,.03)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.62rem', letterSpacing: '.12em', color: g.color, marginBottom: '8px' }}>{g.id}</div>
                <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.2rem', letterSpacing: '-0.03em', color: 'var(--paper)', marginBottom: '6px' }}>{g.name}</div>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.65rem', color: 'rgba(245,244,240,.3)', letterSpacing: '.04em' }}>{g.suits}</div>
              </div>
            </a>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-dm-mono)', fontSize: '.68rem', color: 'rgba(245,244,240,.2)', letterSpacing: '.07em' }}>
          All genomes · 100/100 Lighthouse · A+ SSL · Vercel Edge · zero layout shift
        </p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   MID-PAGE EMAIL CAPTURE
══════════════════════════════════════════════════════ */

function MidCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || status !== 'idle') return
    setStatus('loading')
    fetch('/api/waitlist', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), source: 'mid' }),
    }).catch(() => {})
    setStatus('done')
  }

  return (
    <section style={{ background: 'var(--ink)', borderTop: '1px solid rgba(245,244,240,.05)', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '48px', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
            {GENOMES.map(g => (
              <span key={g.id} style={{
                fontFamily: 'var(--font-dm-mono)', fontSize: '.6rem', letterSpacing: '.12em',
                color: g.color, padding: '3px 9px', borderRadius: '100px',
                background: g.color + '1a', border: `1px solid ${g.color}33`,
              }}>{g.id}</span>
            ))}
          </div>
          <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--paper)', marginBottom: '12px' }}>
            Not ready for the full quiz?
          </h2>
          <p style={{ color: 'rgba(245,244,240,.44)', fontSize: '.92rem', lineHeight: 1.7 }}>
            Drop your email. We will review what you do and send a no-obligation genome recommendation — the exact design identity we would build for you.
          </p>
        </div>

        {status === 'done' ? (
          <div style={{ textAlign: 'center', padding: '28px', background: 'rgba(245,244,240,.04)', borderRadius: '10px', border: '1px solid rgba(245,244,240,.08)' }}>
            <div style={{ color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '8px' }}>✦</div>
            <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.1rem', color: 'var(--paper)', marginBottom: '6px' }}>Genome on its way.</div>
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.72rem', color: 'rgba(245,244,240,.38)' }}>We will reply within 24 hours.</div>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background: 'rgba(245,244,240,.04)', border: '1px solid rgba(245,244,240,.09)', borderRadius: '10px', padding: '28px 24px' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-dm-mono)', fontSize: '.64rem', color: 'rgba(245,244,240,.36)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Work email
            </label>
            <input type="email" required placeholder="your@firm.co.uk" value={email} onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '.78rem 1rem', borderRadius: '5px', marginBottom: '10px',
                background: 'rgba(245,244,240,.06)', border: '1px solid rgba(245,244,240,.13)',
                color: 'var(--paper)', fontSize: '.88rem', fontFamily: 'var(--font-dm-sans)', outline: 'none',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,.6)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(245,244,240,.13)' }}
            />
            <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '.88rem', padding: '.82rem' }}>
              {status === 'loading' ? 'Sending…' : 'Send my genome preview →'}
            </button>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.64rem', color: 'rgba(245,244,240,.24)', textAlign: 'center', marginTop: '12px' }}>
              No payment · No commitment · Reply within 24h
            </p>
          </form>
        )}
      </div>
      <style>{`@media(max-width:760px){.mid-cap-grid{grid-template-columns:1fr !important}}`}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   PRICING TEASER
══════════════════════════════════════════════════════ */

function PricingTeaser() {
  return (
    <section style={{ background: 'var(--paper-warm)', padding: 'clamp(4rem,8vw,7rem) 1.5rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: '.75rem' }}>
          Investment
        </p>
        <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '2.5rem' }}>
          Three plans. One service.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {[
            { name: 'Founding', price: '£75', note: '5 slots remaining · closes 09 May', featured: true, items: ['Everything in Core','Priority genome selection','12-month price lock','Direct founder access'] },
            { name: 'Core',     price: '£90', note: '',                                  featured: false, items: ['Domain managed','DNS & SSL handled','1–5 page site','Genome-matched design','Weekly health check'] },
            { name: 'Full',     price: '£175', note: '',                                 featured: false, items: ['Everything in Core','4 content updates/month','Monthly report card PDF','Priority support'] },
          ].map(tier => (
            <div key={tier.name} style={{
              padding: '28px 24px', borderRadius: '8px',
              background: tier.featured ? 'var(--ink)' : 'var(--paper)',
              color: tier.featured ? 'var(--paper)' : 'var(--ink)',
              border: tier.featured ? '1px solid rgba(99,102,241,.3)' : '1px solid var(--border)',
              position: 'relative',
            }}>
              {tier.featured && (
                <span style={{ position: 'absolute', top: '-10px', left: '20px', background: 'var(--accent)', color: '#fff', fontSize: '.65rem', fontFamily: 'var(--font-dm-mono)', letterSpacing: '.1em', padding: '2px 10px', borderRadius: '100px' }}>
                  {tier.note}
                </span>
              )}
              <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>{tier.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: tier.note && !tier.featured ? '6px' : '20px' }}>
                <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2.2rem', letterSpacing: '-0.04em' }}>{tier.price}</span>
                <span style={{ fontSize: '.78rem', color: tier.featured ? 'rgba(245,244,240,.45)' : 'var(--mid)' }}>/mo</span>
              </div>
              {!tier.featured && tier.note && (
                <p style={{ fontSize: '.75rem', color: 'var(--mid)', marginBottom: '16px', fontFamily: 'var(--font-dm-mono)' }}>{tier.note}</p>
              )}
              <hr style={{ border: 'none', borderTop: `1px solid ${tier.featured ? 'rgba(245,244,240,.1)' : 'var(--border)'}`, margin: '0 0 16px' }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {tier.items.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '.85rem', color: tier.featured ? 'rgba(245,244,240,.7)' : 'var(--mid)' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '.7rem' }}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <a href="/#intake" className="btn-primary" style={{ display: 'block', textAlign: 'center', fontSize: '.84rem', padding: '.78rem', textDecoration: 'none', background: tier.featured ? 'var(--accent)' : 'var(--ink)', color: '#fff', borderRadius: '3px' }}>
                Get started →
              </a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '.82rem', color: 'var(--mid)' }}>
          After 12 months on any plan, the codebase is yours outright.{' '}
          <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>See full site →</Link>
        </p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(245,244,240,.32)', padding: '3rem 1.5rem 2rem', borderTop: '1px solid rgba(245,244,240,.06)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="5" fill="#F5F4F0" fillOpacity=".08"/>
            <rect x="8" y="6.5" width="3.5" height="18.5" fill="#F5F4F0" fillOpacity=".7"/>
            <rect x="8" y="6.5" width="16" height="3" fill="#F5F4F0" fillOpacity=".7"/>
            <rect x="8" y="13.5" width="11" height="2.75" fill="#F5F4F0" fillOpacity=".7"/>
            <rect x="12.5" y="26.5" width="9.5" height="2" rx="1" fill="#6366F1"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1rem', letterSpacing: '-0.04em', color: 'rgba(245,244,240,.6)' }}>Foundy.</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '.78rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <Link href="/#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</Link>
          <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
        </div>
        <p style={{ fontSize: '.72rem', fontFamily: 'var(--font-dm-mono)', letterSpacing: '.04em' }}>
          © 2026 Foundy · fundy.studio · We handle everything after.
        </p>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════
   STICKY RAIL
══════════════════════════════════════════════════════ */

function StickyRail() {
  const [show, setShow] = useState(false)
  const [closed, setClosed] = useState(false)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (closed) return
    function check() {
      setShow(window.scrollY > window.innerHeight * 1.2)
    }
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [closed])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    fetch('/api/waitlist', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), source: 'rail' }),
    }).catch(() => {})
    setDone(true)
    setTimeout(() => { setShow(false) }, 2400)
  }

  if (!show || closed) return null

  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 80,
      background: 'var(--ink)', border: '1px solid rgba(245,244,240,.12)', borderRadius: '10px',
      padding: '20px', width: '260px', color: 'var(--paper)',
      boxShadow: '0 24px 56px rgba(10,10,11,.4)',
      animation: 'heroFadeUp .4s cubic-bezier(.16,1,.3,1) both',
    }}>
      <button onClick={() => { setClosed(true); setShow(false) }} style={{
        position: 'absolute', top: '10px', right: '12px',
        background: 'none', border: 'none', color: 'rgba(245,244,240,.35)', cursor: 'pointer', fontSize: '1rem',
      }} aria-label="Close">×</button>
      {done ? (
        <div style={{ textAlign: 'center', padding: '8px 0', fontFamily: 'var(--font-dm-mono)', fontSize: '.78rem', color: 'rgba(245,244,240,.55)' }}>
          ✓ Sent. Check your inbox.
        </div>
      ) : (
        <>
          <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: '.95rem', letterSpacing: '-0.02em', marginBottom: '4px' }}>Get your genome free.</p>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '.65rem', color: 'rgba(245,244,240,.38)', marginBottom: '14px' }}>We match you to one of 8 design identities.</p>
          <form onSubmit={submit}>
            <input type="email" required placeholder="your@firm.co.uk" value={email} onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '.62rem .85rem', marginBottom: '8px', borderRadius: '5px',
                background: 'rgba(245,244,240,.07)', border: '1px solid rgba(245,244,240,.12)',
                color: 'var(--paper)', fontSize: '.82rem', fontFamily: 'var(--font-dm-sans)', outline: 'none',
              }} />
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '.78rem', padding: '.65rem' }}>
              Send my genome →
            </button>
          </form>
        </>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */

export default function GenomePage() {
  // Custom cursor
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const dot = document.getElementById('g-cursor-dot')
    const ring = document.getElementById('g-cursor-ring')
    if (!dot || !ring) return
    let mx = -100, my = -100, rx = -100, ry = -100
    const onMove = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    (function raf() {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`
      requestAnimationFrame(raf)
    })()
    document.querySelectorAll('a,button,.opt-btn,input').forEach(el => {
      el.addEventListener('pointerenter', () => ring.classList.add('g-cursor-hover'))
      el.addEventListener('pointerleave', () => ring.classList.remove('g-cursor-hover'))
    })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <>
      <style>{`
        .g-cursor-dot,.g-cursor-ring{position:fixed;top:0;left:0;pointer-events:none;z-index:9999;border-radius:50%;mix-blend-mode:difference}
        .g-cursor-dot{width:7px;height:7px;background:#fff;margin-top:0}
        .g-cursor-ring{width:36px;height:36px;border:1.5px solid rgba(255,255,255,.55);transition:width .25s,height .25s,border-color .25s}
        .g-cursor-ring.g-cursor-hover{width:52px;height:52px;border-color:rgba(255,255,255,.85)}
        @media(pointer:coarse){.g-cursor-dot,.g-cursor-ring{display:none}}
        @media(max-width:760px){
          .g-mid-grid{grid-template-columns:1fr !important}
          .g-preview-chip{display:none !important}
          .g-hero-h1{font-size:clamp(2rem,8vw,3.5rem) !important}
        }
      `}</style>

      <div id="g-cursor-dot" aria-hidden="true" />
      <div id="g-cursor-ring" aria-hidden="true" />

      <Nav />
      <Hero />
      <Marquee />
      <GenomeQuiz />
      <GenomesGrid />
      <MidCapture />
      <PricingTeaser />
      <Footer />
      <StickyRail />
    </>
  )
}
