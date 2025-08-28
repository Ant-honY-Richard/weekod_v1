'use client';

import { motion } from 'framer-motion';
import { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NavigationRouter: React.FC = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Process', href: '/#process' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href === '/blog') {
      return pathname.startsWith('/blog');
    }
    return false;
  };

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
        <Link href="/" className="flex items-center cursor-pointer group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 mr-3 flex items-center justify-center">
            <Image 
              src="/favicon.svg" 
              alt="Weekod Logo" 
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority={true}
            />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            Weekod
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8">
          {navItems.slice(0, -1).map((item) => (
            <motion.div key={item.href}>
              <Link
                href={item.href}
                className={`font-medium relative text-sm xl:text-base transition-colors ${
                  isActive(item.href)
                    ? 'text-[#00F3FF]' 
                    : scrolled ? 'text-gray-300 hover:text-[#00F3FF]' : 'text-white hover:text-[#00F3FF]'
                }`}
              >
                <motion.span
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 0 10px rgba(0, 243, 255, 0.7)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="block"
                >
                  {item.label}
                </motion.span>
                {isActive(item.href) && (
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
              </Link>
            </motion.div>
          ))}
        </nav>
        
        {/* Contact Button */}
        <motion.div
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(57, 255, 20, 0.7)"
          }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:block"
        >
          <Link
            href="/#contact"
            className="bg-[#39FF14] hover:bg-[#2ecc0f] text-[#0A0A12] font-bold py-2 px-4 xl:py-2.5 xl:px-6 rounded-full transition-all relative overflow-hidden group text-sm xl:text-base"
          >
            <span className="relative z-10">Book Consultation</span>
            <motion.div 
              className="absolute inset-0 bg-[#00F3FF] opacity-0 group-hover:opacity-10 transition-opacity"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          </Link>
        </motion.div>
        
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
                <motion.div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-center py-3 px-2 font-medium rounded-lg border transition-all text-base sm:text-lg ${
                      isActive(item.href)
                        ? 'text-[#00F3FF] bg-[#00F3FF]/10 border-[#00F3FF]/30' 
                        : 'text-gray-300 bg-[#0F0F1A] border-[#00F3FF]/20 hover:text-[#00F3FF] hover:border-[#00F3FF]/40'
                    }`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block"
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(57, 255, 20, 0.7)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-[#39FF14] text-[#0A0A12] font-bold py-3 px-6 rounded-full relative overflow-hidden text-base sm:text-lg text-center"
              >
                <span className="relative z-10">Book Consultation</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
});

NavigationRouter.displayName = 'NavigationRouter';

export default NavigationRouter;