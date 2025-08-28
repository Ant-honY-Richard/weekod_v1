'use client';

import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToTop = useCallback((behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior
    });
  }, []);

  const scrollToElement = useCallback((elementId: string, offset: number = 0, behavior: ScrollBehavior = 'smooth') => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        left: 0,
        behavior
      });
    }
  }, []);

  const scrollToPosition = useCallback((position: number, behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
      top: position,
      left: 0,
      behavior
    });
  }, []);

  return {
    scrollToTop,
    scrollToElement,
    scrollToPosition
  };
};