'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
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

// Lazy load non-critical page components
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/components/pages/ServicesPage'));
const ProcessPage = lazy(() => import('@/components/pages/ProcessPage'));
const PortfolioPage = lazy(() => import('@/components/pages/PortfolioPage'));
const PricingPage = lazy(() => import('@/components/pages/PricingPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));

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
      about: (
        <Suspense fallback={<PageLoader />}>
          <AboutPage setCurrentPage={setCurrentPage} />
        </Suspense>
      ),
      services: (
        <Suspense fallback={<PageLoader />}>
          <ServicesPage setCurrentPage={setCurrentPage} />
        </Suspense>
      ),
      process: (
        <Suspense fallback={<PageLoader />}>
          <ProcessPage setCurrentPage={setCurrentPage} />
        </Suspense>
      ),
      portfolio: (
        <Suspense fallback={<PageLoader />}>
          <PortfolioPage setCurrentPage={setCurrentPage} />
        </Suspense>
      ),
      pricing: (
        <Suspense fallback={<PageLoader />}>
          <PricingPage setCurrentPage={setCurrentPage} />
        </Suspense>
      ),
      contact: (
        <Suspense fallback={<PageLoader />}>
          <ContactPage setCurrentPage={setCurrentPage} />
        </Suspense>
      )
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