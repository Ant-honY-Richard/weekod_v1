'use client';

import { useEffect } from 'react';

/**
 * Performance Optimizer Component
 * Implements various performance optimizations to improve Core Web Vitals
 */
const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      fontLink.as = 'style';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);

      // Preload critical images (if any)
      const criticalImages = [
        // Add any critical images here
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Delay non-critical third-party scripts
      const delayedScripts = document.querySelectorAll('script[data-delay]');
      
      const loadDelayedScripts = () => {
        delayedScripts.forEach(script => {
          const newScript = document.createElement('script');
          newScript.src = script.getAttribute('data-src') || '';
          newScript.async = true;
          document.head.appendChild(newScript);
        });
      };

      // Load delayed scripts after user interaction or 3 seconds
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      const loadScripts = () => {
        loadDelayedScripts();
        events.forEach(event => {
          document.removeEventListener(event, loadScripts);
        });
      };

      events.forEach(event => {
        document.addEventListener(event, loadScripts, { passive: true });
      });

      // Fallback: load after 3 seconds
      setTimeout(loadDelayedScripts, 3000);
    };

    // Optimize images with Intersection Observer
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || '';
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Reduce layout shifts
    const preventLayoutShifts = () => {
      // Add aspect ratio containers for images
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.style.aspectRatio = '16/9'; // Default aspect ratio
        wrapper.style.overflow = 'hidden';
        img.parentNode?.insertBefore(wrapper, img);
        wrapper.appendChild(img);
      });
    };

    // Optimize animations
    const optimizeAnimations = () => {
      // Reduce motion for users who prefer it
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
      }
    };

    // Clean up unused CSS (basic implementation)
    const removeUnusedCSS = () => {
      // This is a simplified version - in production, use tools like PurgeCSS
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach(stylesheet => {
        if (stylesheet.getAttribute('href')?.includes('unused')) {
          stylesheet.remove();
        }
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    optimizeThirdPartyScripts();
    optimizeImages();
    preventLayoutShifts();
    optimizeAnimations();
    removeUnusedCSS();

    // Performance monitoring
    if ('PerformanceObserver' in window) {
      // Monitor LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor FID
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor CLS
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Cleanup function
    return () => {
      // Clean up observers if needed
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;