'use client';

import { useEffect } from 'react';

const ResourcePreloader = () => {
  useEffect(() => {
    const schedule = (cb: () => void) => {
      // Prefer idle time to avoid competing with critical rendering
      if ('requestIdleCallback' in window) {
        // @ts-ignore - requestIdleCallback not in TS DOM lib by default
        requestIdleCallback(cb, { timeout: 2000 });
      } else {
        // Fallback: run shortly after first paint
        setTimeout(cb, 1500);
      }
    };

    // Defer favicon preload (lightweight)
    schedule(() => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = '/favicon.svg';
      link.as = 'image';
      link.type = 'image/svg+xml';
      document.head.appendChild(link);
    });

    // HEAVY: hero video — fetch at low priority after idle instead of preloading
    schedule(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = 'https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4';
      link.as = 'video';
      link.type = 'video/mp4';
      document.head.appendChild(link);
    });

    // Prefetch next page components when idle
    schedule(() => {
      import('@/components/pages/AboutPage');
      import('@/components/pages/ServicesPage');
    });
  }, []);

  return null;
};

export default ResourcePreloader;