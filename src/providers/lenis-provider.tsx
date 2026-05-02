'use client'
import { ReactLenis, useLenis } from 'lenis/react'
import { ScrollTrigger } from '@/lib/gsap'

function LenisScrollSync() {
  useLenis(ScrollTrigger.update)
  return null
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.4, smoothWheel: true, touchMultiplier: 1.5 }}>
      <LenisScrollSync />
      {children}
    </ReactLenis>
  )
}
