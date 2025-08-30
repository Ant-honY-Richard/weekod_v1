'use client';

import { useMemo, useState, useEffect, memo } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { services } from '@/data';
import { PageType } from '@/types';
import ServiceIcon from '@/components/ui/ServiceIcons';

interface ServicesPageProps {
  setCurrentPage?: (page: PageType) => void;
}

// Accent color per service key
const accentFor = (key: string) => {
  switch (key) {
    case 'website-design':
      return { hex: '#00F3FF', bg: 'from-[#00F3FF]/10 to-transparent' };
    case 'ai-solutions':
      return { hex: '#FF00FF', bg: 'from-[#FF00FF]/10 to-transparent' };
    case 'app-development':
      return { hex: '#39FF14', bg: 'from-[#39FF14]/10 to-transparent' };
    case 'maintenance-support':
      return { hex: '#FFD700', bg: 'from-[#FFD700]/15 to-transparent' };
    default:
      return { hex: '#00F3FF', bg: 'from-[#00F3FF]/10 to-transparent' };
  }
};

// Feature bullets shown in the detail panel and modal
const featureMap: Record<string, string[]> = {
  'website-design': [
    'Responsive & mobile-first',
    'SEO-ready structure',
    'Brand-aligned UI/UX',
    'Lightning-fast performance',
  ],
  'ai-solutions': [
    'AI-assisted wireframing',
    'Smart content generation',
    'Personalized UX flows',
    'Automation & insights',
  ],
  'app-development': [
    'Cross-platform builds',
    'Rapid MVP prototyping',
    'Scalable architecture',
    'Modern stacks & tooling',
  ],
  'maintenance-support': [
    'Regular updates & backups',
    'Security & monitoring',
    'Performance tuning',
    'Content & SEO upkeep',
  ],
};

// Simple, performant stagger for the grid
const gridItemVariants = {
  initial: { opacity: 0, y: 12 },
  in: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.25, delay: i * 0.05 } }),
};

const ServicesPage: React.FC<ServicesPageProps> = ({ setCurrentPage }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [visualsReady, setVisualsReady] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const schedule = (cb: () => void) => {
      // Defer heavier visual box until after first paint to reduce TTI
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        requestIdleCallback(cb, { timeout: 1200 });
      } else {
        setTimeout(cb, 400);
      }
    };
    schedule(() => setVisualsReady(true));
  }, []);

  const active = services[activeStep];
  const accent = accentFor(active.icon);
  const features = useMemo(() => featureMap[active.icon] || featureMap['website-design'], [active.icon]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="bg-[#0A0A12] relative overflow-hidden">
        {/* Subtle static background accents (no blur filters during animation) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full"
               style={{ background: 'radial-gradient(closest-side, rgba(0,243,255,0.10), transparent)' }} />
          <div className="absolute -bottom-24 -right-16 w-64 h-64 rounded-full"
               style={{ background: 'radial-gradient(closest-side, rgba(255,0,255,0.08), transparent)' }} />
        </div>

        {/* Header */}
        <section className="py-20 bg-gradient-to-b from-[#0F0F1A] to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <m.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00F3FF]/30 bg-[#0A0A12]/40 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#00F3FF]" />
                <span className="text-xs font-semibold tracking-wider text-[#00F3FF]">Services</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">What We Build For You</h1>
              <p className="text-lg md:text-xl text-gray-300">AI-enhanced, skillfully crafted solutions that drive real results</p>
            </m.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-8 md:pb-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10 md:mb-16">
              {services.map((service, index) => {
                const isActive = activeStep === index;
                const a = accentFor(service.icon);
                return (
                  <m.button
                    key={service.title}
                    custom={index}
                    variants={gridItemVariants}
                    initial={prefersReducedMotion ? undefined : 'initial'}
                    animate={prefersReducedMotion ? undefined : 'in'}
                    whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.005 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStep(index)}
                    className={`group relative p-5 md:p-6 rounded-2xl border transition-all text-left overflow-hidden ${
                      isActive
                        ? 'border-[#00F3FF]/50 bg-[#0F0F1A]'
                        : 'border-[#00F3FF]/15 bg-[#0F0F1A]/80 hover:border-[#00F3FF]/35 hover:bg-[#111425]'
                    }`}
                  >
                    {/* Soft gradient glow on hover only */}
                    <div className={`pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-br ${a.bg}`} />

                    <div className="relative flex items-start gap-4">
                      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${
                        isActive ? 'border-[#00F3FF]/40 bg-[#0A0A12]/80' : 'border-[#00F3FF]/20 bg-[#0A0A12]/70'
                      } text-[#00F3FF]`}>
                        <ServiceIcon type={service.icon} className="w-6 h-6" color="currentColor" />
                      </div>
                      <div className="min-w-0">
                        <h3 className={`font-bold text-base md:text-lg mb-1 ${isActive ? 'text-[#00F3FF]' : 'text-white group-hover:text-[#00F3FF]'}`}>{service.title}</h3>
                        <p className={`text-sm leading-relaxed ${isActive ? 'text-gray-200' : 'text-gray-400'}`}>{service.description}</p>
                      </div>
                    </div>
                  {/* Removed active indicator line */}
                  </m.button>
                );
              })}
            </div>

            {/* Details Panel */}
            <AnimatePresence mode="wait">
              <m.div
                key={activeStep}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-[#0A0A12] rounded-2xl shadow-xl p-7 md:p-10 border border-[#00F3FF]/20"
              >
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  {/* Text side */}
                  <div>
                    <m.h2 
                      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                      transition={{ delay: 0.05 }}
                      className="text-2xl md:text-3xl font-bold mb-3 text-white"
                    >
                      {active.title}
                    </m.h2>
                    <m.p 
                      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-lg text-gray-300 mb-4"
                    >
                      {active.description}
                    </m.p>
                    <m.p 
                      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-gray-300 mb-6"
                    >
                      {active.details}
                    </m.p>

                    {/* Feature pills */}
                    <m.ul 
                      initial={prefersReducedMotion ? undefined : 'hidden'}
                      animate={prefersReducedMotion ? undefined : 'show'}
                      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
                      className="flex flex-wrap gap-2.5 mb-7"
                    >
                      {features.map((f) => (
                        <m.li
                          key={f}
                          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 6 }}
                          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                          className="px-3.5 py-2 rounded-full border border-[#00F3FF]/25 text-xs md:text-sm text-gray-200 bg-[#0F0F1A]/70"
                        >
                          {f}
                        </m.li>
                      ))}
                    </m.ul>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <m.button 
                        onClick={() => setCurrentPage?.('contact')}
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center bg-[#00F3FF] hover:bg-[#00D1E0] text-[#0A0A12] font-bold px-6 py-3 rounded-full transition-all"
                      >
                        Get Started
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </m.button>

                      {/* Learn More opens centered modal */}
                      <m.button
                        onClick={() => setModalOpen(true)}
                        whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                        className="inline-flex items-center justify-center text-[#00F3FF] font-bold px-6 py-3"
                      >
                        Learn More
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </m.button>
                    </div>
                  </div>

                  {/* Visual side (deferred until idle) */}
                  <div className="hidden lg:flex items-center justify-center">
                    {visualsReady && (
                      <div className="relative w-full max-w-[480px] aspect-[4/3]">
                        {/* Static gradient card */}
                        <div className={`absolute inset-0 rounded-2xl border border-[#00F3FF]/25 bg-gradient-to-br ${accent.bg}`} />

                        {/* Central icon with subtle glow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-28 h-28 rounded-2xl bg-[#0F0F1A] border border-[#00F3FF]/30 flex items-center justify-center"
                          >
                            <ServiceIcon type={active.icon} className="w-16 h-16" color={accent.hex} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Centered Modal for Learn More */}
        <AnimatePresence>
          {modalOpen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
              onClick={closeModal}
            >
              <m.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="relative w-full max-w-3xl bg-[#0A0A12] border border-[#00F3FF]/25 rounded-2xl shadow-2xl p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#00F3FF]/30 text-[#00F3FF]">
                    <ServiceIcon type={active.icon} className="w-6 h-6" color="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{active.title}</h3>
                    <p className="text-gray-300 mt-1">{active.description}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">What you get</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      {features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-[#00F3FF] shrink-0 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Details</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{active.details}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded-full border border-[#00F3FF]/30 text-white hover:bg-[#111425]"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => { setCurrentPage?.('contact'); setModalOpen(false); }}
                    className="px-6 py-2.5 rounded-full font-bold bg-[#00F3FF] text-[#0A0A12] hover:bg-[#00D1E0]"
                  >
                    Talk to Us
                  </button>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
};

export default memo(ServicesPage);
