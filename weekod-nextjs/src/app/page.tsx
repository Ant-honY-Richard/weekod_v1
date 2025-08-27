'use client';

import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageType } from '@/types';
import { pageVariants, pageTransition } from '@/data';
import { useOptimizedScroll } from '@/hooks/useOptimizedScroll';

// Import critical components immediately
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomePage from '@/components/pages/HomePage';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import ResourcePreloader from '@/components/ui/ResourcePreloader';
import ServiceWorkerRegistration from '@/components/ui/ServiceWorkerRegistration';

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
      <ServiceWorkerRegistration />
      <ResourcePreloader />
      <PerformanceMonitor />
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <main className="pt-14 sm:pt-16 lg:pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}