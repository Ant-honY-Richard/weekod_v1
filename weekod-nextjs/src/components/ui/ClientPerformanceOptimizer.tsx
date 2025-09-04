'use client';

import dynamic from 'next/dynamic';

// Dynamically import PerformanceOptimizer to avoid SSR issues
const PerformanceOptimizer = dynamic(
  () => import('./PerformanceOptimizer'),
  { 
    ssr: false,
    loading: () => null
  }
);

export default function ClientPerformanceOptimizer() {
  return <PerformanceOptimizer />;
}