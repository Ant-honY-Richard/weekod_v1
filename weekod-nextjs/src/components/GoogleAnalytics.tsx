'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
            // Enhanced ecommerce and engagement tracking
            send_page_view: true,
            anonymize_ip: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: false
          });
          
          // Track page views for SPA navigation
          window.gtag = gtag;
        `}
      </Script>
    </>
  );
}