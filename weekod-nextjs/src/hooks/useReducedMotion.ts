'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect user's motion preferences
 * Respects the prefers-reduced-motion media query
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
};

/**
 * Custom hook for Framer Motion that returns animation variants
 * that respect reduced motion preferences
 */
export const useMotionConfig = () => {
  const shouldReduceMotion = useReducedMotion();

  return {
    shouldReduceMotion,
    spring: shouldReduceMotion 
      ? { type: 'tween', duration: 0.01 }
      : { type: 'spring', stiffness: 300, damping: 30 },
    transition: shouldReduceMotion 
      ? { duration: 0.01 }
      : { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    variants: {
      visible: shouldReduceMotion 
        ? { opacity: 1, transform: 'none' }
        : { opacity: 1, y: 0, scale: 1 },
      hidden: shouldReduceMotion 
        ? { opacity: 0, transform: 'none' }
        : { opacity: 0, y: 20, scale: 0.95 },
    },
  };
};