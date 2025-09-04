'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion, useMotionConfig } from '@/hooks/useReducedMotion';
import { services } from '@/data';
import ServiceIcon from './ServiceIcons';

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isHovered, onHover }) => {
  const { shouldReduceMotion, spring } = useMotionConfig();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [15, -15]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-15, 15]), spring);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onHover(null);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? {} : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Card Background */}
      <motion.div
        className="relative h-full bg-gradient-to-br from-background-light/80 to-background-dark/80 backdrop-blur-sm border border-primary-main/20 rounded-xl p-8 overflow-hidden"
        animate={isHovered && !shouldReduceMotion ? {
          borderColor: ['rgba(0, 243, 255, 0.2)', 'rgba(0, 243, 255, 0.6)', 'rgba(0, 243, 255, 0.2)'],
          boxShadow: [
            '0 0 20px rgba(0, 243, 255, 0.1)',
            '0 0 40px rgba(0, 243, 255, 0.3)',
            '0 0 20px rgba(0, 243, 255, 0.1)',
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-20 h-20 border border-primary-main/30 rounded-full" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border border-secondary-main/30 rounded-lg rotate-45" />
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-main/5 to-secondary-main/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={shouldReduceMotion ? {} : { transform: 'translateZ(10px)' }}
        />

        <div className="relative z-10">
          {/* Icon with Enhanced Animation */}
          <motion.div
            className="mb-6 flex justify-center"
            animate={isHovered && !shouldReduceMotion ? {
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
          >
            <div className="relative">
              <motion.div
                className={`w-16 h-16 rounded-xl flex items-center justify-center ${service.bgColor} group-hover:shadow-lg transition-all duration-300`}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
                style={shouldReduceMotion ? {} : { transform: 'translateZ(20px)' }}
              >
                <ServiceIcon 
                  type={service.icon as any} 
                  className={`w-8 h-8 ${service.textColor}`} 
                />
              </motion.div>
              
              {/* Floating particles around icon */}
              {!shouldReduceMotion && isHovered && (
                <div className="absolute inset-0">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary-main rounded-full"
                      style={{
                        left: `${50 + Math.cos(i * Math.PI / 3) * 30}%`,
                        top: `${50 + Math.sin(i * Math.PI / 3) * 30}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-xl font-space-grotesk font-bold mb-4 text-center text-white group-hover:text-primary-main transition-colors duration-300"
            style={shouldReduceMotion ? {} : { transform: 'translateZ(15px)' }}
            animate={isHovered && !shouldReduceMotion ? {
              textShadow: [
                '0 0 10px rgba(255, 255, 255, 0.5)',
                '0 0 20px rgba(0, 243, 255, 0.8)',
                '0 0 10px rgba(255, 255, 255, 0.5)',
              ],
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {service.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-text-secondary mb-6 text-center leading-relaxed"
            style={shouldReduceMotion ? {} : { transform: 'translateZ(10px)' }}
          >
            {service.description}
          </motion.p>

          {/* Features List */}
          <motion.ul
            className="space-y-2 mb-6"
            style={shouldReduceMotion ? {} : { transform: 'translateZ(5px)' }}
          >
            {service.features?.slice(0, 3).map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                className="flex items-center text-sm text-text-tertiary"
                initial={{ opacity: 0, x: -20 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                transition={{ delay: featureIndex * 0.1 }}
              >
                <motion.div
                  className="w-2 h-2 bg-secondary-main rounded-full mr-3 flex-shrink-0"
                  animate={isHovered && !shouldReduceMotion ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 5px rgba(57, 255, 20, 0.3)',
                      '0 0 15px rgba(57, 255, 20, 0.8)',
                      '0 0 5px rgba(57, 255, 20, 0.3)',
                    ],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, delay: featureIndex * 0.2 }}
                />
                {feature}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.button
            className="w-full bg-transparent border border-primary-main/50 hover:border-primary-main text-primary-main hover:bg-primary-main/10 py-3 px-6 rounded-lg transition-all duration-300 group/btn"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
            style={shouldReduceMotion ? {} : { transform: 'translateZ(25px)' }}
          >
            <span className="flex items-center justify-center font-medium">
              Learn More
              <motion.svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={isHovered && !shouldReduceMotion ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </motion.svg>
            </span>
          </motion.button>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 243, 255, 0.1) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export const EnhancedServicesSection: React.FC = () => {
  const { shouldReduceMotion, variants } = useMotionConfig();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
        delayChildren: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, y: 60, rotateX: -15 },
    visible: shouldReduceMotion ? {} : {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section className="py-section bg-background-main relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background-main via-background-light to-background-main" />
        {!shouldReduceMotion && (
          <>
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 bg-primary-main/5 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-main/5 rounded-full blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-main/10 border border-primary-main/30 text-primary-main font-medium text-sm mb-6"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
          >
            <span className="w-2 h-2 bg-primary-main rounded-full mr-2 animate-pulse" />
            Our Services
          </motion.div>

          <h2 className="text-fluid-3xl md:text-fluid-4xl font-space-grotesk font-bold mb-6 text-white">
            AI-Enhanced Solutions for
            <motion.span
              className="block text-primary-main text-glow"
              animate={shouldReduceMotion ? {} : {
                textShadow: [
                  '0 0 20px rgba(0, 243, 255, 0.5)',
                  '0 0 40px rgba(0, 243, 255, 0.8)',
                  '0 0 20px rgba(0, 243, 255, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Modern Businesses
            </motion.span>
          </h2>

          <p className="text-fluid-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We combine artificial intelligence with human creativity to deliver exceptional web solutions 
            that drive growth and exceed expectations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full"
            >
              <ServiceCard
                service={service}
                index={index}
                isHovered={hoveredCard === index}
                onHover={setHoveredCard}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-Action */}
        <motion.div
          className="text-center mt-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: shouldReduceMotion ? 0 : 1, duration: 0.8 }}
        >
          <motion.button
            className="bg-secondary-main hover:bg-secondary-dark text-background-main font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-glow-secondary group"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
          >
            <span className="flex items-center justify-center">
              Get Custom Quote
              <motion.svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={shouldReduceMotion ? {} : { x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};