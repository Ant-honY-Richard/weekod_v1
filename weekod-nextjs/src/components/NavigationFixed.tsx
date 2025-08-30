'use client';

import { memo, useMemo } from 'react';
import Image from 'next/image';
import { PageType } from '@/types';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface NavigationFixedProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  scrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const NavigationFixed: React.FC<NavigationFixedProps> = memo(({
  currentPage,
  setCurrentPage,
  scrolled,
  isMenuOpen,
  setIsMenuOpen
}) => {
  const { scrollToTop } = useSmoothScroll();
  
  const navItems = useMemo(() => [
    { label: 'Home', value: 'home' as PageType },
    { label: 'About', value: 'about' as PageType },
    { label: 'Services', value: 'services' as PageType },
    { label: 'Process', value: 'process' as PageType },
    { label: 'Portfolio', value: 'portfolio' as PageType },
    { label: 'Pricing', value: 'pricing' as PageType },
    { label: 'Contact', value: 'contact' as PageType }
  ], []);

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    scrollToTop();
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A0A12]/90 backdrop-blur-md py-2 sm:py-3' : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => handlePageChange('home')}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 flex items-center justify-center">
            <Image 
              src="/favicon.svg" 
              alt="Weekod Logo" 
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority={true}
              quality={100}
            />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            Weekod
          </span>
        </div>
                
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8">
          {navItems.map((item) => (
            <button 
              key={item.value} 
              onClick={() => handlePageChange(item.value)}
              className={`font-medium relative text-sm xl:text-base transition-colors hover:scale-105 ${
                currentPage === item.value 
                  ? 'text-[#00F3FF]' 
                  : scrolled ? 'text-gray-300 hover:text-[#00F3FF]' : 'text-white hover:text-[#00F3FF]'
              }`}
            >
              {item.label}
              {currentPage === item.value && (
                <div 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00F3FF]/60 rounded-full"
                />
              )}
            </button>
          ))}
        </nav>
        
        {/* Tablet Navigation */}
        <nav className="hidden md:flex lg:hidden space-x-4">
          {navItems.slice(0, 4).map((item) => (
            <button 
              key={item.value} 
              onClick={() => handlePageChange(item.value)}
              className={`font-medium relative text-xs transition-colors hover:scale-105 ${
                currentPage === item.value 
                  ? 'text-[#00F3FF]' 
                  : scrolled ? 'text-gray-300 hover:text-[#00F3FF]' : 'text-white hover:text-[#00F3FF]'
              }`}
            >
              {item.label}
              {currentPage === item.value && (
                <div 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00F3FF]/60 rounded-full"
                />
              )}
            </button>
          ))}
        </nav>
        
        <button 
          onClick={() => handlePageChange('contact')}
          className="hidden lg:block bg-[#39FF14] hover:bg-[#2ecc0f] text-[#0A0A12] font-bold py-2 px-4 xl:py-2.5 xl:px-6 rounded-full transition-all relative overflow-hidden group text-sm xl:text-base"
        >
          <span className="relative z-10">Book Consultation</span>
          <div 
            className="absolute inset-0 bg-[#00F3FF] opacity-0 group-hover:opacity-10 transition-opacity"
          />
        </button>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white p-1 hover:scale-110 transition-transform"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className="lg:hidden bg-[#0A0A12]/95 shadow-lg overflow-hidden border-t border-[#00F3FF]/30"
        >
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
              {navItems.map((item) => (
                <button 
                  key={item.value} 
                  onClick={() => handlePageChange(item.value)}
                  className={`text-center py-3 px-2 font-medium rounded-lg border transition-all text-base sm:text-lg hover:scale-[1.02] ${
                    currentPage === item.value 
                      ? 'text-[#00F3FF] bg-[#00F3FF]/10 border-[#00F3FF]/30' 
                      : 'text-gray-300 bg-[#0F0F1A] border-[#00F3FF]/20 hover:text-[#00F3FF] hover:border-[#00F3FF]/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handlePageChange('contact')}
              className="w-full bg-[#39FF14] text-[#0A0A12] font-bold py-3 px-6 rounded-full relative overflow-hidden text-base sm:text-lg hover:scale-[1.02] transition-transform"
            >
              <span className="relative z-10">Book Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
});

NavigationFixed.displayName = 'NavigationFixed';

export default NavigationFixed;