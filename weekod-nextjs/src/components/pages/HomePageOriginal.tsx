'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import { PageType } from '@/types';
import ServiceIcon from '@/components/ui/ServiceIcons';
import { services } from '@/data';
import ClientOnlyOrb from '@/components/ui/ClientOnlyOrb';
import { EnhancedHeroSection } from '@/components/ui/EnhancedHeroSection';
import { EnhancedServicesSection } from '@/components/ui/EnhancedServicesSection';
import { EnhancedTestimonialsSection } from '@/components/ui/EnhancedTestimonialsSection';

interface HomePageProps {
  setCurrentPage?: (page: PageType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="gradient-background" suppressHydrationWarning>
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection setCurrentPage={setCurrentPage} />
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Primary gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A12] via-[#1a1a2e] to-[#16213e]"></div>
          
          {/* Mobile-optimized Orb - client-only for better LCP */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative md:block hidden">
              <ClientOnlyOrb
                hoverIntensity={0.3}
                rotateOnHover={true}
                hue={180}
                forceHoverState={false}
                delay={1500}
              />
            </div>
            {/* Mobile orb - smaller and more subtle */}
            <div className="w-80 h-80 relative md:hidden">
              <ClientOnlyOrb
                hoverIntensity={0.2}
                rotateOnHover={false}
                hue={180}
                forceHoverState={false}
                delay={1500}
              />
            </div>
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A12]/70 via-[#0A0A12]/40 to-[#0A0A12]/70 md:from-[#0A0A12]/60 md:via-[#0A0A12]/30 md:to-[#0A0A12]/60"></div>
          
          {/* Mobile floating particles - delayed for LCP optimization */}
          <div className="absolute inset-0 md:hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#00F3FF] rounded-full opacity-0"
                style={{
                  left: `${25 + (i * 12)}%`,
                  top: `${35 + (i % 3) * 15}%`,
                }}
                animate={{
                  y: [-8, 8, -8],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2.5 + (i * 0.3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1 + (i * 0.2), // Delay particles to not block LCP
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-white">
          {/* Mobile-first layout */}
          <div className="flex flex-col items-center justify-center min-h-screen py-20">
            
            {/* Badge - optimized for LCP */}
            <div className="mb-6 md:mb-4 animate-fade-in-fast">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] font-bold text-xs sm:text-sm tracking-wider backdrop-blur-sm">
                <span className="w-2 h-2 bg-[#39FF14] rounded-full mr-2 animate-pulse"></span>
                AI + HUMAN CRAFT
              </span>
            </div>

            {/* Main Heading - Ultra-critical LCP optimization */}
            <div className="text-center mb-6 md:mb-8 hero-text-instant">
              {/* Attention - Bold claim with contrast */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight hero-text-instant">
                <span className="block mb-2 hero-text-instant">AI-Powered</span>
                <span className="block mb-2 hero-text-instant">Web Development</span>
                <span className="block text-[#00F3FF] hero-text-instant">2x Faster</span>
              </h1>
            </div>

            {/* Interest - Problem-solution statement */}
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 max-w-2xl mx-auto text-[#E0E0E0] text-center px-4 leading-relaxed text-critical">
              <p>
                <span className="md:hidden">Tired of slow, expensive web development? Our AI-powered approach delivers quality websites in half the time.</span>
                <span className="hidden md:inline">Frustrated with slow, expensive web development? Our AI-enhanced approach combines cutting-edge technology with human creativity to deliver stunning websites in half the time at competitive rates.</span>
              </p>
            </div>

            {/* CTA Buttons - Desire + Action */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md sm:max-w-none px-4 animate-fade-in-fast" style={{ animationDelay: '0.3s' }}>
              {/* Primary CTA - Clear value proposition */}
              <motion.button 
                onClick={() => setCurrentPage?.('contact')}
                className="bg-[#39FF14] hover:bg-[#2ecc0f] text-[#0A0A12] text-base sm:text-lg font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Free Consultation
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14] to-[#2ecc0f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              {/* Secondary CTA - Risk reversal */}
              <motion.button 
                onClick={() => setCurrentPage?.('portfolio')}
                className="bg-transparent border-2 border-[#00F3FF] hover:bg-[#00F3FF]/10 text-white text-base sm:text-lg font-bold px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">See Our Work</span>
                  <span className="sm:hidden">Our Work</span>
                </span>
              </motion.button>
            </div>

            {/* Social Proof Section - Trust building */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="mt-12 flex flex-col items-center"
            >
              <p className="text-gray-400 text-sm mb-4">Trusted by startups and businesses</p>
              <div className="flex flex-wrap justify-center gap-6 items-center">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-[#39FF14] mb-1">15+</div>
                  <div className="text-xs text-gray-400">Projects Delivered</div>
                </div>
                <div className="h-8 w-px bg-gray-700 hidden sm:block"></div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-[#00F3FF] mb-1">100%</div>
                  <div className="text-xs text-gray-400">Satisfaction Rate</div>
                </div>
                <div className="h-8 w-px bg-gray-700 hidden sm:block"></div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-[#FF00FF] mb-1">24/7</div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00F3FF] to-[#0A0A12] border border-[#00F3FF]/30 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="ml-3 text-sm text-gray-400">
                  <span className="text-white font-medium">4.9/5</span> from 12+ reviews
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator - enhanced */}
        <motion.div 
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-6 h-6 text-[#00F3FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 8px rgba(0, 243, 255, 0.7))" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* About Preview */}
      <section id="about" className="py-12 sm:py-16 relative overflow-hidden">
        {/* Full section background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/djxoeyk1a/image/upload/v1756818082/bb4458ac-3f68-4f75-9056-f9c6c5c9b508_hixkeh.jpg"
            alt="Weekod Team - A Young Team With Big Dreams" 
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          {/* Gradient overlays for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A12]/80 via-[#0A0A12]/60 to-[#0A0A12]/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12]/70 via-transparent to-[#0A0A12]/30"></div>
        </div>

        {/* Content overlay */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white">
                A Young Team With Big Dreams
              </h2>
              <p className="text-xl sm:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto">
                A passionate team of developers & AI experts dedicated to crafting your online presence with speed and precision.
              </p>
              <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
                We&apos;re not just another agency. We&apos;re a tight-knit team of four energetic individuals who believe in the power of combining cutting-edge AI with human creativity. Our process is built on transparency, collaboration, and a genuine passion for turning your vision into reality.
              </p>
              <div>
                <motion.button 
                  onClick={() => setCurrentPage?.('about')}
                  className="inline-flex items-center text-[#00F3FF] font-bold hover:text-[#00D1E0] transition-colors text-lg bg-[#0A0A12]/60 backdrop-blur-sm px-6 py-3 rounded-full border border-[#00F3FF]/30 hover:border-[#00F3FF]/50"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 0 10px rgba(0, 243, 255, 0.5)",
                    boxShadow: "0 0 20px rgba(0, 243, 255, 0.3)"
                  }}
                >
                  Learn More About Weekod
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-12 sm:py-16 bg-[#0F0F1A]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#00F3FF]/10 border border-[#00F3FF]/30 text-[#00F3FF] font-bold text-xs sm:text-sm tracking-wider mb-4">OUR SOLUTIONS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Problems We Solve</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Turning your digital challenges into competitive advantages
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0A0A12] p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-[#00F3FF]/10 relative overflow-hidden group hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F3FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 flex items-center justify-center rounded-xl bg-[#0F0F1A] group-hover:bg-[#00F3FF] transition-colors duration-300 text-[#00F3FF] group-hover:text-[#0A0A12]">
                  <ServiceIcon 
                    type={service.icon} 
                    className="w-6 h-6 sm:w-8 sm:h-8" 
                    color="currentColor"
                  />
                </div>
                {/* Problem-focused heading */}
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-[#00F3FF] transition-colors duration-300">
                  {service.title}
                </h3>
                {/* Solution-focused description */}
                <p className="text-sm sm:text-base text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
                {/* Benefit-focused CTA */}
                <button 
                  onClick={() => setCurrentPage?.('services')}
                  className="text-[#00F3FF] font-bold hover:text-[#00D1E0] transition-all duration-300 flex items-center text-sm sm:text-base group/btn"
                >
                  See How We Help
                  <svg className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <div className="inline-block bg-[#0F0F1A] p-1 rounded-full border border-[#00F3FF]/20 mb-6">
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="animate-pulse w-2 h-2 bg-[#FF00FF] rounded-full"></span>
                <span className="text-sm text-gray-300">Limited slots available for Q3 2024</span>
              </div>
            </div>
            <button 
              onClick={() => setCurrentPage?.('services')}
              className="inline-flex items-center bg-[#00F3FF] hover:bg-[#00D1E0] text-[#0A0A12] font-bold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base"
            >
              Explore All Solutions
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section id="process" className="py-12 sm:py-16 bg-[#0A0A12]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] font-bold text-xs sm:text-sm tracking-wider mb-4">YOUR JOURNEY</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">From Idea to Launch in Weeks, Not Months</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI-enhanced process saves you time, money, and frustration
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent transform -translate-y-1/2"></div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-8 md:space-y-0">
              {[
                { 
                  title: "Discovery & Strategy", 
                  description: "We understand your goals and create a roadmap that aligns with your business objectives and timeline.",
                  icon: "ideation-planning",
                  benefit: "Save weeks of planning time"
                },
                { 
                  title: "AI-Accelerated Development", 
                  description: "Our AI tools handle repetitive tasks while our team focuses on creative aspects and quality assurance.",
                  icon: "ai-development",
                  benefit: "50% faster development"
                },
                { 
                  title: "Launch & Growth Support", 
                  description: "We deploy your solution and provide ongoing optimization to ensure it continues to perform and evolve.",
                  icon: "launch-optimize",
                  benefit: "Continuous improvement"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative bg-[#0F0F1A] rounded-2xl p-6 sm:p-8 border border-[#00F3FF]/20 max-w-sm mx-auto md:mx-0 text-center group hover:border-[#00F3FF]/40 transition-all"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#00F3FF] rounded-full flex items-center justify-center text-[#0A0A12] font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center rounded-xl bg-[#0A0A12] group-hover:bg-[#00F3FF] transition-colors text-[#00F3FF] group-hover:text-[#0A0A12]">
                    <ServiceIcon 
                      type={step.icon} 
                      className="w-8 h-8" 
                      color="currentColor"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-[#00F3FF] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <motion.button 
              onClick={() => setCurrentPage?.('process')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(57, 255, 20, 0.5)"
              }}
              className="inline-flex items-center bg-[#39FF14] hover:bg-[#2ecc0f] text-[#0A0A12] font-bold px-6 py-3 rounded-full transition-all hover:shadow-lg text-sm sm:text-base"
            >
              See Full Process
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default memo(HomePage);