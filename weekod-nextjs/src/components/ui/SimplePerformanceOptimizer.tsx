'use client';

import { useEffect } from 'react';

/**
 * Simple Performance Optimizer Component
 * A lightweight version that focuses on essential optimizations
 */
const SimplePerformanceOptimizer = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Basic performance optimizations
    const initOptimizations = () => {
      try {
        // Optimize animations for users who prefer reduced motion
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          document.documentElement.style.setProperty('--animation-duration', '0.01ms');
          document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        }

        // Basic image lazy loading for images with data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                  imageObserver.unobserve(img);
                }
              }
            });
          }, {
            rootMargin: '50px 0px',
            threshold: 0.01
          });

          lazyImages.forEach(img => imageObserver.observe(img));
        }

        // Basic performance monitoring (optional)
        if ('PerformanceObserver' in window) {
          try {
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach(entry => {
                if (entry.entryType === 'largest-contentful-paint') {
                  console.log('LCP:', entry.startTime);
                }
              });
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (error) {
            console.warn('Performance monitoring not available:', error);
          }
        }
      } catch (error) {
        console.warn('Performance optimizations failed:', error);
      }
    };

    // Initialize optimizations after a short delay
    const timeoutId = setTimeout(initOptimizations, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SimplePerformanceOptimizer;