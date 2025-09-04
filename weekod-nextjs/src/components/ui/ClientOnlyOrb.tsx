'use client';

import { lazy, Suspense, useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';

// Error boundary for catching Orb-related errors
class OrbErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn('Orb component error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Lazy load the heavy Orb component with error boundary
const Orb = lazy(() => 
  import('@/components/ui/Orb').catch((error) => {
    console.warn('Failed to load Orb component, falling back to CSS orb:', error);
    // Return a fallback component instead of throwing
    return {
      default: () => (
        <div className="w-full h-full bg-gradient-to-br from-[#00F3FF]/5 via-[#FF00FF]/3 to-[#39FF14]/5 rounded-full opacity-50 animate-pulse" />
      )
    };
  })
);

// Enhanced fallback for Orb during loading
const OrbFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#00F3FF]/5 via-[#FF00FF]/3 to-[#39FF14]/5 rounded-full opacity-50 animate-pulse" />
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
  delay = 300 
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
    <OrbErrorBoundary fallback={<OrbFallback />}>
      <Suspense fallback={<OrbFallback />}>
        <Orb
          hoverIntensity={hoverIntensity}
          rotateOnHover={rotateOnHover}
          hue={hue}
          forceHoverState={forceHoverState}
        />
      </Suspense>
    </OrbErrorBoundary>
  ) : (
    <OrbFallback />
  );
};

export default ClientOnlyOrb;