'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Float, Text3D, OrbitControls } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion, useMotionConfig } from '@/hooks/useReducedMotion';
import { PageType } from '@/types';
import ClientOnlyOrb from './ClientOnlyOrb';

interface EnhancedHeroSectionProps {
  setCurrentPage?: (page: PageType) => void;
}

// 3D Text Component - Simplified for now
function AnimatedText3D() {
  return (
    <div className="text-6xl font-bold text-primary-main animate-float">
      AI-POWERED
    </div>
  );
}

// Particle System Component - Fixed hydration issue
function ParticleField() {
  const [particles] = useState(() => 
    Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  );

  return (
    <div className="absolute inset-0">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-main rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + (i * 0.1),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Typing Animation Component
function TypingAnimation({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      return;
    }

    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, delay + 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, shouldReduceMotion]);

  return <>{displayText}<span className="animate-pulse">|</span></>;
}

export const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({ setCurrentPage }) => {
  const { shouldReduceMotion, variants, spring } = useMotionConfig();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Magnetic cursor effect for CTA buttons
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  const childVariants = {
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    animate: shouldReduceMotion ? {} : { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    },
  };

  return (
    <motion.section 
      ref={heroRef}
      id="hero" 
      className="min-h-screen relative flex items-center overflow-hidden"
      style={{ y: backgroundY }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Primary gradient background */}
        <motion.div 
          className="absolute inset-0 gradient-background"
          animate={{
            background: shouldReduceMotion ? undefined : [
              'linear-gradient(to bottom right, #0A0A12, #1A1A2E, #16213E)',
              'linear-gradient(to bottom right, #16213E, #1A1A2E, #0A0A12)',
              'linear-gradient(to bottom right, #0A0A12, #1A1A2E, #16213E)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Particle Field - Enhanced CSS version */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 hidden lg:block opacity-50">
            <ParticleField />
          </div>
        )}

        {/* Enhanced Orb Component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full relative md:block hidden">
            <ClientOnlyOrb
              hoverIntensity={0.4}
              rotateOnHover={true}
              hue={180}
              forceHoverState={false}
              delay={shouldReduceMotion ? 0 : 1500}
            />
          </div>
          <div className="w-80 h-80 relative md:hidden">
            <ClientOnlyOrb
              hoverIntensity={0.3}
              rotateOnHover={false}
              hue={180}
              forceHoverState={false}
              delay={shouldReduceMotion ? 0 : 1500}
            />
          </div>
        </div>
        
        {/* Animated particles overlay */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-main rounded-full"
                style={{
                  left: `${20 + (i * 8)}%`,
                  top: `${30 + (i % 4) * 15}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + (i * 0.2),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5 + (i * 0.1),
                }}
              />
            ))}
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background-main/70 via-background-main/40 to-background-main/70 md:from-background-main/60 md:via-background-main/30 md:to-background-main/60" />
      </div>
      
      {/* Content Container */}
      <motion.div 
        ref={ref}
        className="container mx-auto px-4 sm:px-6 relative z-10 text-white"
        style={{ y: textY }}
        variants={staggerChildren}
        initial="initial"
        animate={inView ? "animate" : "initial"}
      >
        <div className="flex flex-col items-center justify-center min-h-screen py-20">
          
          {/* Enhanced Badge */}
          <motion.div 
            variants={childVariants}
            className="mb-6 md:mb-4"
          >
            <motion.span 
              className="inline-flex items-center px-6 py-3 rounded-full bg-secondary-main/10 border border-secondary-main/30 text-secondary-main font-bold text-sm tracking-wider backdrop-blur-sm shadow-glow-secondary"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              <motion.span 
                className="w-2 h-2 bg-secondary-main rounded-full mr-3"
                animate={{ scale: shouldReduceMotion ? 1 : [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              AI + HUMAN CREATIVITY
            </motion.span>
          </motion.div>

          {/* Enhanced Main Heading with Text Reveal Animation */}
          <motion.div 
            variants={childVariants}
            className="text-center mb-6 md:mb-8"
          >
            <h1 className="text-fluid-4xl md:text-fluid-5xl font-space-grotesk font-bold leading-tight tracking-tight">
              {shouldReduceMotion ? (
                <>
                  <span className="block mb-2">AI-Powered</span>
                  <span className="block mb-2">Web Development</span>
                  <span className="block text-primary-main text-glow">2x Faster</span>
                </>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {['AI-Powered', 'Web Development', '2x Faster'].map((line, index) => (
                    <motion.span
                      key={index}
                      className={`block mb-2 ${index === 2 ? 'text-primary-main text-glow' : ''}`}
                      variants={{
                        hidden: { opacity: 0, y: 50, rotateX: -90 },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          rotateX: 0,
                          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                        },
                      }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </h1>
          </motion.div>

          {/* Enhanced Problem-Solution Statement with Typing Effect */}
          <motion.div 
            variants={childVariants}
            className="text-fluid-lg md:text-fluid-xl mb-8 md:mb-10 max-w-3xl mx-auto text-text-secondary text-center px-4 leading-relaxed"
          >
            <p>
              {shouldReduceMotion ? (
                <>
                  <span className="md:hidden">Transform your digital presence with AI-enhanced web development. Fast, innovative, and stunning results.</span>
                  <span className="hidden md:inline">Frustrated with slow, expensive web development? Our AI-enhanced approach combines cutting-edge technology with human creativity to deliver stunning websites in half the time at competitive rates.</span>
                </>
              ) : (
                <>
                  <span className="md:hidden">
                    <TypingAnimation 
                      text="Transform your digital presence with AI-enhanced web development. Fast, innovative, and stunning results." 
                      delay={800}
                    />
                  </span>
                  <span className="hidden md:inline">
                    <TypingAnimation 
                      text="Frustrated with slow, expensive web development? Our AI-enhanced approach combines cutting-edge technology with human creativity to deliver stunning websites in half the time at competitive rates." 
                      delay={800}
                    />
                  </span>
                </>
              )}
            </p>
          </motion.div>

          {/* Enhanced CTA Buttons with Magnetic Effect */}
          <motion.div 
            variants={childVariants}
            className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md sm:max-w-none px-4"
          >
            {/* Primary CTA with Pulsing Glow */}
            <motion.button 
              onClick={() => setCurrentPage?.('contact')}
              className="relative bg-secondary-main hover:bg-secondary-dark text-background-main text-fluid-base font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-glow-secondary overflow-hidden group"
              whileHover={{ 
                scale: shouldReduceMotion ? 1 : 1.05,
                x: shouldReduceMotion ? 0 : mousePosition.x * 10,
                y: shouldReduceMotion ? 0 : mousePosition.y * 5,
              }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              animate={shouldReduceMotion ? {} : { 
                boxShadow: [
                  '0 0 20px rgba(57, 255, 20, 0.5)',
                  '0 0 40px rgba(57, 255, 20, 0.8)',
                  '0 0 20px rgba(57, 255, 20, 0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <motion.svg 
                  className="w-5 h-5 mr-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: shouldReduceMotion ? 0 : 15 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </motion.svg>
                Get Free Consultation
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-secondary-main to-secondary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={shouldReduceMotion ? {} : { 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.button>
            
            {/* Secondary CTA with Enhanced Hover */}
            <motion.button 
              onClick={() => setCurrentPage?.('portfolio')}
              className="relative bg-transparent border-2 border-primary-main hover:bg-primary-main/10 text-white text-fluid-base font-bold px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300 group shadow-glow-sm"
              whileHover={{ 
                scale: shouldReduceMotion ? 1 : 1.05,
                borderColor: shouldReduceMotion ? undefined : "#39FFFF",
              }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              <span className="flex items-center justify-center">
                <motion.svg 
                  className="w-5 h-5 mr-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.1, rotate: shouldReduceMotion ? 0 : 12 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </motion.svg>
                <span className="hidden sm:inline">See Our Work</span>
                <span className="sm:hidden">Our Work</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Enhanced Social Proof */}
          <motion.div
            variants={childVariants}
            className="mt-16 flex flex-col items-center"
          >
            <p className="text-text-tertiary text-sm mb-6">Trusted by startups and businesses worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {[
                { number: '25+', label: 'Projects Delivered', color: 'text-secondary-main' },
                { number: '100%', label: 'Satisfaction Rate', color: 'text-primary-main' },
                { number: '24/7', label: 'Support Available', color: 'text-accent-main' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center"
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                >
                  <motion.div 
                    className={`text-3xl font-bold ${stat.color} mb-2`}
                    animate={shouldReduceMotion ? {} : { 
                      textShadow: [
                        '0 0 10px rgba(255, 255, 255, 0.5)',
                        `0 0 20px ${stat.color.includes('secondary') ? 'rgba(57, 255, 20, 0.8)' : 
                                    stat.color.includes('primary') ? 'rgba(0, 243, 255, 0.8)' : 
                                    'rgba(255, 0, 255, 0.8)'}`,
                        '0 0 10px rgba(255, 255, 255, 0.5)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xs text-text-tertiary text-center">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced Scroll Indicator with Path Drawing Animation */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldReduceMotion ? 0 : 2, duration: 0.5 }}
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.svg 
            className="w-8 h-8 text-primary-main" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ filter: "drop-shadow(0 0 12px rgba(0, 243, 255, 0.8))" }}
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.2 }}
          >
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
              initial={shouldReduceMotion ? {} : { pathLength: 0 }}
              animate={shouldReduceMotion ? {} : { pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
            />
          </motion.svg>
        </motion.div>
        <p className="text-xs text-text-tertiary mt-2 font-medium">Scroll to explore</p>
      </motion.div>
    </motion.section>
  );
};