import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Manrope, JetBrains_Mono } from 'next/font/google'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import PerformanceOptimizer from '@/components/ui/PerformanceOptimizer'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'
import ServiceWorkerRegistration from '@/components/ui/ServiceWorkerRegistration'
import './globals.css'

// Primary font - Inter for body text
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif']
})

// Secondary font - Space Grotesk for headings
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  fallback: ['sans-serif']
})

// Supporting font - Manrope for UI elements
const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  fallback: ['sans-serif']
})

// Monospace font - JetBrains Mono for code
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  fallback: ['Monaco', 'Consolas', 'monospace']
})

export const metadata: Metadata = {
  title: 'Weekod - AI-Powered Web Development',
  description: 'Transform your digital presence with AI-powered web development, custom design, and innovative solutions.',
  keywords: 'web development, AI, custom websites, app development, digital solutions',
  authors: [{ name: 'Weekod Team' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  robots: 'index, follow',
  themeColor: '#00F3FF',
  viewport: 'width=device-width, initial-scale=1',
}

// Viewport configuration moved to metadata in Next.js 13
// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   themeColor: '#00F3FF',
//   colorScheme: 'dark',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Critical performance optimization hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Weekod",
              "description": "AI-Enhanced Web Development for Startups",
              "url": "https://weekod.com",
              "logo": "https://weekod.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              }
            })
          }}
        />
        
        {/* Critical inline CSS for instant LCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            body {
              background: linear-gradient(to bottom right, #0A0A12, #1A1A2E, #16213E);
              color: #ffffff;
              font-family: var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif;
              margin: 0;
              padding: 0;
              overflow-x: hidden;
              font-feature-settings: "kern" 1, "liga" 1;
            }
            .hero-text-instant {
              opacity: 1 !important;
              visibility: visible !important;
              display: block !important;
              transform: none !important;
              animation: none !important;
              transition: none !important;
              will-change: auto !important;
              contain: none !important;
            }
            .hero-critical {
              opacity: 1;
              background: #0A0A12;
              transform: translateZ(0);
              min-height: 100vh;
              display: flex;
              align-items: center;
              position: relative;
            }
            .text-critical {
              opacity: 1 !important;
              animation: none !important;
              visibility: visible !important;
              display: block !important;
            }
                        /* Prevent layout shift */
            .container {
              max-width: 1200px;
              margin: 0 auto;
              padding: 0 1rem;
            }
            /* Prevent browser extension interference */
            #coupon-birds-embed-div,
            [id*="coupon"],
            [id*="extension"] {
              display: none !important;
              visibility: hidden !important;
            }
            /* Optimize font loading */
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: local('Inter Regular'), local('Inter-Regular');
            }
          `
        }} />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
        {/* Performance Optimizer */}
        <PerformanceOptimizer />
        
        {/* Service Worker Registration */}
        <ServiceWorkerRegistration />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {children}
        <ExitIntentPopup />
      </body>
    </html>
  )
}