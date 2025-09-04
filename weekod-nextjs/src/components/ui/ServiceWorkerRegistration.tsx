'use client';

import { useEffect } from 'react';

const ServiceWorkerRegistration: React.FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
          .then(reg => console.log('Service worker registered'))
          .catch(err => console.error('Service worker registration failed:', err));
      });
    }
  }, []);
  
  return null;
};

export default ServiceWorkerRegistration;