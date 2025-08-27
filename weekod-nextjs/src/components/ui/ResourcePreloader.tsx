'use client';

import { useEffect } from 'react';

const ResourcePreloader = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = [
      // Preload the hero video
      {
        href: 'https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4',
        as: 'video',
        type: 'video/mp4'
      },
      // Preload favicon
      {
        href: '/favicon.svg',
        as: 'image',
        type: 'image/svg+xml'
      }
    ];

    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      document.head.appendChild(link);
    });

    // Prefetch next page components when idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Prefetch about page component
        import('@/components/pages/AboutPage');
        // Prefetch services page component  
        import('@/components/pages/ServicesPage');
      });
    }
  }, []);

  return null;
};

export default ResourcePreloader;