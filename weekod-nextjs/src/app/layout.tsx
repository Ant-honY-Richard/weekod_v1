import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Manrope } from 'next/font/google'
import GoogleAnalytics from '@/components/GoogleAnalytics'
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
        {/* Performance optimization hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        
        {/* Critical inline CSS for instant LCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
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
            }
            .text-critical {
              opacity: 1 !important;
              animation: none !important;
              visibility: visible !important;
              display: block !important;
            }
            /* Prevent browser extension interference */
            #coupon-birds-embed-div,
            [id*="coupon"],
            [id*="extension"] {
              display: none !important;
              visibility: hidden !important;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable} ${manrope.variable}`}>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {children}
      </body>
    </html>
  )
}