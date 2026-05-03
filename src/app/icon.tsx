import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/**
 * Next.js App Router icon — auto-served as /icon.png (favicon).
 * Pure flexbox layout — Satori renders this reliably (absolute positioning can fail).
 * Dark #0A0A0B tile · #F5F4F0 F letterform · #6366F1 accent bar
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: '#0A0A0B',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '7px 8px',
        gap: 0,
      }}
    >
      {/* Top bar of F */}
      <div style={{ width: 14, height: 3, background: '#F5F4F0', borderRadius: 1, display: 'flex' }} />
      {/* Mid bar of F */}
      <div style={{ width: 10, height: 2.5, background: '#F5F4F0', borderRadius: 1, marginTop: 4, display: 'flex' }} />
      {/* Indigo accent bottom bar */}
      <div style={{ width: 9, height: 2, background: '#6366F1', borderRadius: 1, marginTop: 6, display: 'flex' }} />
    </div>,
    { ...size }
  )
}
