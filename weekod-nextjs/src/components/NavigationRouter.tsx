'use client';

import { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NavigationRouter: React.FC = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
    if (href === '/') return pathname === '/';
    if (href === '/blog') return pathname.startsWith('/blog');
    return false;
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A0A12]/90 backdrop-blur-md py-2 sm:py-3' : 'bg-transparent py-3 sm:py-4'
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
          <span className="text-xl sm:text-2xl font-bold text-white">Weekod</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-8">
          {navItems.slice(0, -1).map((item) => (
            <div key={item.href} className="relative">
              <Link
                href={item.href}
                className={`font-medium relative text-sm xl:text-base transition-colors ${
                  isActive(item.href)
                    ? 'text-[#00F3FF]'
                    : scrolled ? 'text-gray-300 hover:text-[#00F3FF]' : 'text-white hover:text-[#00F3FF]'
                }`}
              >
                <span className="block hover:scale-105 transition-transform">{item.label}</span>
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00F3FF]/60 rounded-full" />
                )}
              </Link>
            </div>
          ))}
        </nav>
        
        {/* Contact Button */}
        <div className="hidden lg:block">
          <Link
            href="/#contact"
            className="bg-[#39FF14] hover:bg-[#2ecc0f] text-[#0A0A12] font-bold py-2 px-4 xl:py-2.5 xl:px-6 rounded-full transition-all relative overflow-hidden group text-sm xl:text-base"
          >
            <span className="relative z-10">Book Consultation</span>
            <div className="absolute inset-0 bg-[#00F3FF] opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>
        </div>
        
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
        <div className="lg:hidden bg-[#0A0A12]/95 shadow-lg overflow-hidden border-t border-[#00F3FF]/30">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-center py-3 px-2 font-medium rounded-lg border transition-all text-base sm:text-lg ${
                      isActive(item.href)
                        ? 'text-[#00F3FF] bg-[#00F3FF]/10 border-[#00F3FF]/30'
                        : 'text-gray-300 bg-[#0F0F1A] border-[#00F3FF]/20 hover:text-[#00F3FF] hover:border-[#00F3FF]/40'
                    }`}
                  >
                    <span className="block hover:scale-105 transition-transform">{item.label}</span>
                  </Link>
                </div>
              ))}
            </div>
            <div>
              <Link
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-[#39FF14] text-[#0A0A12] font-bold py-3 px-6 rounded-full relative overflow-hidden text-base sm:text-lg text-center hover:scale-[1.02] transition-transform"
              >
                <span className="relative z-10">Book Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

NavigationRouter.displayName = 'NavigationRouter';

export default NavigationRouter;