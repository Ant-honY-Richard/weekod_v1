'use client';

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useReducedMotion, useMotionConfig } from '@/hooks/useReducedMotion';
import { useInView } from 'react-intersection-observer';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  projectType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO",
    company: "TechStart Inc.",
    image: "/api/placeholder/100/100",
    content: "Weekod transformed our vision into reality with their AI-enhanced approach. The development speed was incredible, and the final product exceeded our expectations.",
    rating: 5,
    projectType: "E-commerce Platform"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Founder",
    company: "GreenTech Solutions",
    image: "/api/placeholder/100/100",
    content: "Working with Weekod was a game-changer. Their combination of AI tools and human expertise delivered a stunning website that converted 40% better than our old one.",
    rating: 5,
    projectType: "Corporate Website"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Product Manager",
    company: "InnovateLab",
    image: "/api/placeholder/100/100",
    content: "The attention to detail and innovative solutions provided by Weekod are unmatched. They delivered our complex web application ahead of schedule.",
    rating: 5,
    projectType: "Web Application"
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO",
    company: "DataFlow Systems",
    image: "/api/placeholder/100/100",
    content: "Exceptional work quality and professional service. The AI-powered development process was fascinating to watch, and the results speak for themselves.",
    rating: 5,
    projectType: "SaaS Platform"
  },
  {
    id: 5,
    name: "Rachel Thompson",
    role: "Marketing Director",
    company: "BrandBoost",
    image: "/api/placeholder/100/100",
    content: "Weekod's team understood our brand perfectly. The website they created not only looks amazing but also performs excellently across all metrics.",
    rating: 5,
    projectType: "Marketing Website"
  }
];

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  activeIndex: number;
  totalItems: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index, activeIndex, totalItems }) => {
  const { shouldReduceMotion } = useMotionConfig();
  
  const offset = (index - activeIndex + totalItems) % totalItems;
  const isActive = offset === 0;
  const isNext = offset === 1 || offset === -totalItems + 1;
  const isPrev = offset === -1 || offset === totalItems - 1;
  
  let rotateY = 0;
  let translateZ = 0;
  let translateX = 0;
  let scale = 0.8;
  let opacity = 0.6;

  if (!shouldReduceMotion) {
    if (isActive) {
      rotateY = 0;
      translateZ = 0;
      translateX = 0;
      scale = 1;
      opacity = 1;
    } else if (isNext) {
      rotateY = -45;
      translateZ = -200;
      translateX = 200;
      scale = 0.8;
      opacity = 0.7;
    } else if (isPrev) {
      rotateY = 45;
      translateZ = -200;
      translateX = -200;
      scale = 0.8;
      opacity = 0.7;
    } else {
      rotateY = offset > 0 ? -90 : 90;
      translateZ = -400;
      translateX = offset > 0 ? 400 : -400;
      scale = 0.6;
      opacity = 0.3;
    }
  } else {
    // Reduced motion: simple opacity and scale changes
    if (isActive) {
      scale = 1;
      opacity = 1;
    } else if (isNext || isPrev) {
      scale = 0.9;
      opacity = 0.5;
    } else {
      scale = 0.8;
      opacity = 0.2;
    }
  }

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={shouldReduceMotion ? {} : {
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateY: shouldReduceMotion ? 0 : rotateY,
        translateZ: shouldReduceMotion ? 0 : translateZ,
        translateX: shouldReduceMotion ? 0 : translateX,
        scale,
        opacity,
      }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          className="bg-gradient-to-br from-background-light/90 to-background-dark/90 backdrop-blur-xl border border-primary-main/20 rounded-2xl p-8 shadow-glow-md"
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Quote Icon */}
          <motion.div
            className="flex justify-center mb-6"
            animate={shouldReduceMotion ? {} : {
              y: [0, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-12 h-12 bg-primary-main/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-main" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </div>
          </motion.div>

          {/* Content */}
          <blockquote className="text-lg md:text-xl text-center text-text-primary mb-8 leading-relaxed font-light">
            "{testimonial.content}"
          </blockquote>

          {/* Rating */}
          <div className="flex justify-center mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.svg
                key={i}
                className="w-5 h-5 text-secondary-main mx-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                transition={{ delay: isActive ? i * 0.1 : 0, duration: 0.3 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Avatar with Progress Ring */}
              <div className="relative w-16 h-16 mx-auto mb-4">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary-main/30"
                  animate={isActive && !shouldReduceMotion ? {
                    rotate: [0, 360],
                  } : {}}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-1 rounded-full border-2 border-secondary-main/50"
                  animate={isActive && !shouldReduceMotion ? {
                    rotate: [360, 0],
                  } : {}}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary-main/20 to-secondary-main/20 flex items-center justify-center text-2xl font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>
              </div>

              <div className="text-center">
                <h4 className="font-space-grotesk font-bold text-lg text-white mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-text-secondary mb-1">
                  {testimonial.role} at {testimonial.company}
                </p>
                <motion.span
                  className="inline-block text-xs text-primary-main bg-primary-main/10 px-3 py-1 rounded-full border border-primary-main/30"
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                >
                  {testimonial.projectType}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const EnhancedTestimonialsSection: React.FC = () => {
  const { shouldReduceMotion } = useMotionConfig();
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-200, 200], [1, -1]);

  // Auto-rotation
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (shouldReduceMotion) return;
    
    const threshold = 50;
    if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    } else if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  return (
    <section className="py-section bg-gradient-to-br from-background-main via-background-light to-background-main relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {!shouldReduceMotion && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-main/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary-main/5 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-main/10 border border-secondary-main/30 text-secondary-main font-medium text-sm mb-6"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
          >
            <span className="w-2 h-2 bg-secondary-main rounded-full mr-2 animate-pulse" />
            Client Stories
          </motion.div>

          <h2 className="text-fluid-3xl md:text-fluid-4xl font-space-grotesk font-bold mb-6 text-white">
            What Our Clients Say About
            <motion.span
              className="block text-secondary-main text-glow-secondary"
              animate={shouldReduceMotion ? {} : {
                textShadow: [
                  '0 0 20px rgba(57, 255, 20, 0.5)',
                  '0 0 40px rgba(57, 255, 20, 0.8)',
                  '0 0 20px rgba(57, 255, 20, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Our Work
            </motion.span>
          </h2>

          <p className="text-fluid-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients have to say about their experience with Weekod.
          </p>
        </motion.div>

        {/* 3D Testimonials Carousel */}
        <div className="relative h-[600px] mb-12">
          <motion.div
            className="relative w-full h-full"
            style={shouldReduceMotion ? {} : {
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
            drag={shouldReduceMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={shouldReduceMotion ? {} : { x: dragX }}
          >
            <AnimatePresence mode="sync">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                  activeIndex={activeIndex}
                  totalItems={testimonials.length}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-8">
          {/* Previous Button */}
          <motion.button
            className="w-12 h-12 rounded-full border border-primary-main/30 bg-primary-main/10 text-primary-main hover:bg-primary-main/20 transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.9 }}
            onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary-main shadow-glow-sm' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.2 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.8 }}
                onClick={() => setActiveIndex(index)}
                animate={index === activeIndex && !shouldReduceMotion ? {
                  scale: [1, 1.3, 1],
                } : {}}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            className="w-12 h-12 rounded-full border border-primary-main/30 bg-primary-main/10 text-primary-main hover:bg-primary-main/20 transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.9 }}
            onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Statistics */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[
            { number: '50+', label: 'Happy Clients' },
            { number: '95%', label: 'Project Success Rate' },
            { number: '4.9', label: 'Average Rating' },
            { number: '24h', label: 'Response Time' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-primary-main mb-2"
                animate={shouldReduceMotion ? {} : {
                  textShadow: [
                    '0 0 10px rgba(0, 243, 255, 0.5)',
                    '0 0 20px rgba(0, 243, 255, 0.8)',
                    '0 0 10px rgba(0, 243, 255, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-text-tertiary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};