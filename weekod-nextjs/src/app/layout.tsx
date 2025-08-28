import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Manrope } from 'next/font/google'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import PerformanceOptimizer from '@/components/ui/PerformanceOptimizer'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optimize font loading for LCP
  preload: true
})
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap'
})
const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap'
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00F3FF',
  colorScheme: 'dark',
}

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
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          media="print"
          onLoad={(e) => {
            const target = e.target as HTMLLinkElement;
            target.media = 'all';
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          />
        </noscript>
        
        {/* Critical inline CSS for instant LCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            body {
              background: #0A0A12;
              color: #ffffff;
              font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
              margin: 0;
              padding: 0;
              overflow-x: hidden;
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
            /* Navigation critical styles */
            nav {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 50;
              background: rgba(10, 10, 18, 0.95);
              backdrop-filter: blur(10px);
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
      <body className={`${inter.className} ${spaceGrotesk.variable} ${manrope.variable}`}>
        {/* Performance Optimizer */}
        <PerformanceOptimizer />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {children}
      </body>
    </html>
  )
}