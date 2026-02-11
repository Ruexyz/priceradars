import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { WebVitalsReporter } from '@/components/analytics/web-vitals-reporter'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF6B00',
}

export const metadata: Metadata = {
  title: {
    default: 'PriceRadars - Compare Prices Across 50+ Stores',
    template: '%s | PriceRadars',
  },
  description:
    'Find the best prices for electronics, appliances, and more. Compare prices from 50+ online stores across 6 countries.',
  keywords: [
    'price comparison',
    'compare prices',
    'best deals',
    'online shopping',
    'electronics',
    'price tracker',
    'deals',
    'discounts',
    'cheapest price',
  ],
  authors: [{ name: 'PriceRadars' }],
  creator: 'PriceRadars',
  publisher: 'PriceRadars',
  metadataBase: new URL('https://priceradars.com'),
  alternates: {
    canonical: 'https://priceradars.com',
    languages: {
      'it': 'https://priceradars.com/it',
      'en-GB': 'https://priceradars.com/en/uk',
      'en-US': 'https://priceradars.com/en/us',
      'de': 'https://priceradars.com/en/de',
      'fr': 'https://priceradars.com/en/fr',
      'es': 'https://priceradars.com/en/es',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://priceradars.com',
    siteName: 'PriceRadars',
    title: 'PriceRadars - Compare Prices Across 50+ Stores',
    description:
      'Find the best prices for electronics, appliances, and more. Compare prices from 50+ online stores across 6 countries.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PriceRadars - Price Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PriceRadars - Compare Prices Across 50+ Stores',
    description:
      'Find the best prices for electronics, appliances, and more. Compare prices from 50+ online stores.',
    images: ['/og-image.png'],
    creator: '@priceradars',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual
  },
  category: 'shopping',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for common affiliate domains */}
        <link rel="dns-prefetch" href="https://www.amazon.it" />
        <link rel="dns-prefetch" href="https://www.amazon.co.uk" />
        <link rel="dns-prefetch" href="https://www.amazon.com" />
        <link rel="dns-prefetch" href="https://www.amazon.de" />
        <link rel="dns-prefetch" href="https://www.amazon.fr" />
        <link rel="dns-prefetch" href="https://www.amazon.es" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
        <WebVitalsReporter />
      </body>
    </html>
  )
}
