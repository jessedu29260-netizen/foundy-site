import type { Metadata } from 'next'
import { Fraunces, DM_Sans, DM_Mono } from 'next/font/google'
import { LenisProvider } from '@/providers/lenis-provider'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Foundy — Your website, managed.',
  description:
    'Turnkey B2B websites for UK consultants. Domain, DNS, design, build, and everything after. £90 per month.',
  metadataBase: new URL('https://foundy.studio'),
  openGraph: {
    title: 'Foundy — Your website, managed.',
    description: 'Turnkey B2B websites for UK consultants. One brief. We handle the rest. £90/month.',
    url: 'https://foundy.studio',
    siteName: 'Foundy',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foundy — Your website, managed.',
    description: 'One brief. We handle domain, DNS, design, build, and everything after. £90/month.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}

