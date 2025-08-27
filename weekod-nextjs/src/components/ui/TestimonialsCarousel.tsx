'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  intervalSeconds?: number;
  className?: string;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  intervalSeconds = 4,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [currentIndex, intervalSeconds, testimonials.length, isAutoPlaying]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    goToTestimonial(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    goToTestimonial(newIndex);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Testimonial Display */}
      <div className="relative h-48 md:h-40 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ 
              opacity: 0, 
              x: 50,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              x: -50,
              scale: 0.95
            }}
            transition={{ 
              duration: 0.6,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          >
            <div 
              className="h-full bg-[#0F0F1A]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#00F3FF]/20 shadow-lg relative overflow-hidden"
              style={{
                boxShadow: '0 0 30px rgba(0, 243, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Soft glow effect for active card */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#00F3FF]/5 via-transparent to-[#39FF14]/5 rounded-2xl"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(0, 243, 255, 0.08) 0%, transparent 50%)'
                }}
              />
              
              {/* Quote Icon */}
              <div className="absolute top-4 left-4 text-[#00F3FF]/30">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

              {/* Testimonial Content */}
              <div className="relative z-10 h-full flex flex-col justify-center pl-12">
                <motion.blockquote 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-white text-lg md:text-xl font-medium mb-4 leading-relaxed font-manrope"
                >
                  "{testimonials[currentIndex].quote}"
                </motion.blockquote>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-center"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00F3FF] to-[#39FF14] rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#0A0A12] font-bold text-lg font-space-grotesk">
                      {testimonials[currentIndex].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold font-space-grotesk">
                      {testimonials[currentIndex].author}
                    </div>
                    <div className="text-[#00F3FF] text-sm">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Previous/Next Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 bg-[#0F0F1A]/80 backdrop-blur-sm border border-[#00F3FF]/30 rounded-full flex items-center justify-center text-[#00F3FF] hover:bg-[#00F3FF]/10 hover:border-[#00F3FF]/50 transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="w-10 h-10 bg-[#0F0F1A]/80 backdrop-blur-sm border border-[#00F3FF]/30 rounded-full flex items-center justify-center text-[#00F3FF] hover:bg-[#00F3FF]/10 hover:border-[#00F3FF]/50 transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#00F3FF] w-6 shadow-lg'
                  : 'bg-[#00F3FF]/30 hover:bg-[#00F3FF]/50'
              }`}
              style={{
                boxShadow: index === currentIndex ? '0 0 10px rgba(0, 243, 255, 0.5)' : 'none'
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`w-10 h-10 bg-[#0F0F1A]/80 backdrop-blur-sm border rounded-full flex items-center justify-center transition-all duration-300 ${
              isAutoPlaying 
                ? 'border-[#39FF14]/50 text-[#39FF14] hover:bg-[#39FF14]/10' 
                : 'border-[#00F3FF]/30 text-[#00F3FF]/50 hover:bg-[#00F3FF]/10'
            }`}
            aria-label={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
          >
            {isAutoPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-1 bg-[#0F0F1A]/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00F3FF] to-[#39FF14] rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            boxShadow: '0 0 10px rgba(0, 243, 255, 0.5)'
          }}
        />
      </div>
    </div>
  );
};

export default TestimonialsCarousel;