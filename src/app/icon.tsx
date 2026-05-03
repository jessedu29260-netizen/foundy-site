import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/**
 * Next.js App Router icon — auto-served as /icon.png (favicon).
 * Renders the Foundy F mark at 32×32 as a PNG for browser tab.
 * Overrides any SVG favicon with a reliably-rendered raster icon.
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
        position: 'relative',
      }}
    >
      {/* Vertical stem */}
      <div style={{ position: 'absolute', left: 8, top: 7, width: 3, height: 18, background: '#F5F4F0' }} />
      {/* Top bar */}
      <div style={{ position: 'absolute', left: 8, top: 7, width: 14, height: 3, background: '#F5F4F0' }} />
      {/* Mid bar */}
      <div style={{ position: 'absolute', left: 8, top: 14, width: 10, height: 2.5, background: '#F5F4F0' }} />
      {/* Indigo accent */}
      <div style={{ position: 'absolute', left: 12, bottom: 4, width: 9, height: 2, borderRadius: 1, background: '#6366F1' }} />
    </div>,
    { ...size }
  )
}
