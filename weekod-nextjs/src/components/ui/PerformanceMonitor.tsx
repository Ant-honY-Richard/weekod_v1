'use client';

import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'development') {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const anyEntry = entry as any;
          if ('value' in entry) {
            console.log(`${anyEntry.name}: ${anyEntry.value}ms`);
          } else if ('duration' in entry) {
            console.log(`${anyEntry.name}: ${anyEntry.duration}ms`);
          } else {
            console.log(`${anyEntry.name}: ${anyEntry.startTime}ms`);
          }
        });
      });

      // Observe paint and layout shift metrics
      observer.observe({ entryTypes: ['paint', 'layout-shift', 'largest-contentful-paint'] });

      // Log initial page load time
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in: ${loadTime.toFixed(2)}ms`);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;