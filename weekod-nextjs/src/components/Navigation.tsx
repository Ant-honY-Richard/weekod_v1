'use client';

import { memo, useMemo } from 'react';
import Image from 'next/image';
import { PageType } from '@/types';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface NavigationProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  scrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = memo(({
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
        scrolled ? 'bg-[#0A0A12]/90 backdrop-blur-md py-2 sm:py-3 shadow-[0_0_30px_rgba(0,243,255,0.2)]' : 'bg-transparent py-3 sm:py-4'
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
              className={`font-medium relative text-sm xl:text-base transition-transform hover:scale-105 ${
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
              className={`font-medium relative text-xs transition-transform hover:scale-105 ${
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
          className="lg:hidden bg-[#0A0A12]/95 backdrop-blur-md shadow-xl border-t border-[#00F3FF]/20"
        >
          <div className="container mx-auto px-4 sm:px-6 py-6">
            {/* Navigation Links */}
            <div className="space-y-2 mb-6">
              {navItems.map((item) => (
                <button 
                  key={item.value} 
                  onClick={() => handlePageChange(item.value)}
                  className={`w-full text-left py-4 px-4 font-medium rounded-xl border transition-all text-base sm:text-lg hover:scale-[1.01] hover:shadow-sm ${
                    currentPage === item.value 
                      ? 'text-[#00F3FF] bg-[#00F3FF]/10 border-[#00F3FF]/40 shadow-[0_0_15px_rgba(0,243,255,0.2)]' 
                      : 'text-gray-200 bg-[#0F0F1A]/80 border-[#00F3FF]/15 hover:text-[#00F3FF] hover:border-[#00F3FF]/30 hover:bg-[#0F0F1A]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {currentPage === item.value && (
                      <svg className="w-5 h-5 text-[#00F3FF]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* CTA Button */}
            <button 
              onClick={() => handlePageChange('contact')}
              className="w-full bg-gradient-to-r from-[#39FF14] to-[#2ecc0f] text-[#0A0A12] font-bold py-4 px-6 rounded-xl relative overflow-hidden text-base sm:text-lg hover:scale-[1.01] transition-all shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Book Consultation</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"/>
            </button>
            
            {/* Quick Contact Info */}
            <div className="mt-6 pt-4 border-t border-[#00F3FF]/20">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <a href="tel:+918151018502" className="hover:text-[#00F3FF] transition-colors">
                  📞 +91 8151018502
                </a>
                <a href="https://wa.me/918151018502" className="hover:text-[#25D366] transition-colors">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
