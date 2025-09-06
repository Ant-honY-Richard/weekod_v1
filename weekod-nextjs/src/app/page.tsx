'use client';

import { useState, useEffect, Suspense } from 'react';
import { PageType } from '@/types';
import { pageVariants, pageTransition } from '@/data';
import { useOptimizedScroll } from '@/hooks/useOptimizedScroll';

// Import critical components immediately
import Footer from '@/components/Footer';
import HomePage from '@/components/pages/HomePage';
import NavigationFixed from '@/components/NavigationFixed';
import dynamic from 'next/dynamic';

const ServiceWorkerRegistration = dynamic(() => import('@/components/ui/ServiceWorkerRegistration'), { ssr: false });
const ResourcePreloader = dynamic(() => import('@/components/ui/ResourcePreloader'), { ssr: false });
const PerformanceMonitor = dynamic(() => import('@/components/ui/PerformanceMonitor'), { ssr: false });

// Use Next.js dynamic imports instead of React lazy for better SSR support
const AboutPage = dynamic(() => import('@/components/pages/AboutPage'), { 
  loading: () => <PageLoader />,
  ssr: true 
});
const ServicesPage = dynamic(() => import('@/components/pages/ServicesPage'), { 
  loading: () => <PageLoader />,
  ssr: true 
});
const ProcessPage = dynamic(() => import('@/components/pages/ProcessPage'), { 
  loading: () => <PageLoader />,
  ssr: true 
});
const PortfolioPage = dynamic(() => import('@/components/pages/PortfolioPage'), { 
  loading: () => <PageLoader />,
  ssr: true 
});
const PricingPage = dynamic(() => import('@/components/pages/PricingPage'), { 
  loading: () => <PageLoader />,
  ssr: true 
});
const ContactPage = dynamic(() => import('@/components/pages/ContactPage'), { 
  loading: () => <PageLoader />,
  ssr: true 
});

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-[#0A0A12] flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-[#00F3FF] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#00F3FF] text-lg font-medium">Loading...</p>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrolled = useOptimizedScroll(50);
  const [helpersReady, setHelpersReady] = useState(false);

  useEffect(() => {
    const schedule = (cb: () => void) => {
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        requestIdleCallback(cb, { timeout: 2000 });
      } else {
        setTimeout(cb, 1200);
      }
    };
    schedule(() => setHelpersReady(true));
  }, []);

  const renderPage = () => {
    const pageComponents = {
      home: <HomePage setCurrentPage={setCurrentPage} />,
      about: <AboutPage setCurrentPage={setCurrentPage} />,
      services: <ServicesPage setCurrentPage={setCurrentPage} />,
      process: <ProcessPage setCurrentPage={setCurrentPage} />,
      portfolio: <PortfolioPage setCurrentPage={setCurrentPage} />,
      pricing: <PricingPage setCurrentPage={setCurrentPage} />,
      contact: <ContactPage setCurrentPage={setCurrentPage} />,
    };

    return pageComponents[currentPage];
  };

  return (
    <div className="min-h-screen">
      {helpersReady && (
        <>
          <ServiceWorkerRegistration />
          <ResourcePreloader />
          <PerformanceMonitor />
        </>
      )}
      <NavigationFixed 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <main className="pt-14 sm:pt-16 lg:pt-20">
        <div>
          {renderPage()}
        </div>
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}