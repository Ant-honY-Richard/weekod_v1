'use client';

import { useState, useEffect, useCallback } from 'react';

export const useOptimizedScroll = (threshold: number = 50) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const isScrolled = scrollY > threshold;
    
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled, threshold]);

  useEffect(() => {
    let ticking = false;
    
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScrollHandler, { 
      passive: true,
      capture: false 
    });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
    };
  }, [handleScroll]);

  return scrolled;
};