'use client';

import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
import { PageType } from '@/types';

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
  const navItems = useMemo(() => [
    { label: 'Home', value: 'home' as PageType },
    { label: 'About', value: 'about' as PageType },
    { label: 'Services', value: 'services' as PageType },
    { label: 'Process', value: 'process' as PageType },
    { label: 'Portfolio', value: 'portfolio' as PageType },
    { label: 'Pricing', value: 'pricing' as PageType },
    { label: 'Contact', value: 'contact' as PageType }
  ], []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A0A12]/90 backdrop-blur-md py-2 sm:py-3 shadow-[0_0_30px_rgba(0,243,255,0.2)]' : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => {
            setCurrentPage('home');
            setIsMenuOpen(false);
          }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 flex items-center justify-center">
            <img 
              src="/favicon.svg" 
              alt="Weekod Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            Weekod
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8">
          {navItems.map((item) => (
            <motion.button 
              key={item.value} 
              onClick={() => setCurrentPage(item.value)}
              className={`font-medium relative text-sm xl:text-base ${
                currentPage === item.value 
                  ? 'text-[#00F3FF]' 
                  : scrolled ? 'text-gray-300 hover:text-[#00F3FF]' : 'text-white hover:text-[#00F3FF]'
              }`}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 10px rgba(0, 243, 255, 0.7)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {currentPage === item.value && (
                <motion.div 
                  layoutId="nav-underline" 
                  className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-[#00F3FF]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    boxShadow: "0 0 8px rgba(0, 243, 255, 0.8)"
                  }}
                />
              )}
            </motion.button>
          ))}
        </nav>
        
        {/* Tablet Navigation */}
        <nav className="hidden md:flex lg:hidden space-x-4">
          {navItems.slice(0, 4).map((item) => (
            <motion.button 
              key={item.value} 
              onClick={() => setCurrentPage(item.value)}
              className={`font-medium relative text-xs ${
                currentPage === item.value 
                  ? 'text-[#00F3FF]' 
                  : scrolled ? 'text-gray-300 hover:text-[#00F3FF]' : 'text-white hover:text-[#00F3FF]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {currentPage === item.value && (
                <motion.div 
                  layoutId="nav-underline-tablet" 
                  className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-[#00F3FF]"
                />
              )}
            </motion.button>
          ))}
        </nav>
        
        <motion.button 
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(57, 255, 20, 0.7)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentPage('contact');
            setIsMenuOpen(false);
          }}
          className="hidden lg:block bg-[#39FF14] hover:bg-[#2ecc0f] text-[#0A0A12] font-bold py-2 px-4 xl:py-2.5 xl:px-6 rounded-full transition-all relative overflow-hidden group text-sm xl:text-base"
        >
          <span className="relative z-10">Book Consultation</span>
          <motion.div 
            className="absolute inset-0 bg-[#00F3FF] opacity-0 group-hover:opacity-10 transition-opacity"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{ originX: 0 }}
          />
        </motion.button>
        
        {/* Mobile Menu Button */}
        <motion.button 
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 15px rgba(255, 0, 255, 0.5)"
          }}
          className="lg:hidden text-white p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        </motion.button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-[#0A0A12]/95 shadow-lg overflow-hidden border-t border-[#00F3FF]/30"
        >
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
              {navItems.map((item) => (
                <motion.button 
                  key={item.value} 
                  onClick={() => {
                    setCurrentPage(item.value);
                    setIsMenuOpen(false);
                  }}
                  className={`text-center py-3 px-2 font-medium rounded-lg border transition-all text-base sm:text-lg ${
                    currentPage === item.value 
                      ? 'text-[#00F3FF] bg-[#00F3FF]/10 border-[#00F3FF]/30' 
                      : 'text-gray-300 bg-[#0F0F1A] border-[#00F3FF]/20 hover:text-[#00F3FF] hover:border-[#00F3FF]/40'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(57, 255, 20, 0.7)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentPage('contact');
                setIsMenuOpen(false);
              }}
              className="w-full bg-[#39FF14] text-[#0A0A12] font-bold py-3 px-6 rounded-full relative overflow-hidden text-base sm:text-lg"
            >
              <span className="relative z-10">Book Consultation</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;