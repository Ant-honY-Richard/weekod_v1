'use client';

import { lazy, Suspense, useState, useEffect } from 'react';

// Lazy load the heavy Orb component
const Orb = lazy(() => import('@/components/ui/Orb'));

// Minimal fallback for Orb during loading
const OrbFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#00F3FF]/5 via-[#FF00FF]/3 to-[#39FF14]/5 rounded-full opacity-50" />
);

interface ClientOnlyOrbProps {
  hoverIntensity: number;
  rotateOnHover: boolean;
  hue: number;
  forceHoverState: boolean;
  delay?: number;
}

const ClientOnlyOrb: React.FC<ClientOnlyOrbProps> = ({ 
  hoverIntensity, 
  rotateOnHover, 
  hue, 
  forceHoverState,
  delay = 1500 
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!isMounted) {
    return <OrbFallback />;
  }

  return shouldLoad ? (
    <Suspense fallback={<OrbFallback />}>
      <Orb
        hoverIntensity={hoverIntensity}
        rotateOnHover={rotateOnHover}
        hue={hue}
        forceHoverState={forceHoverState}
      />
    </Suspense>
  ) : (
    <OrbFallback />
  );
};

export default ClientOnlyOrb;