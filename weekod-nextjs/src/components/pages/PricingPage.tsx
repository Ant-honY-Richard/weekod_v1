'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { pricingPackages } from '@/data/index';
import { PageType } from '@/types';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface PricingPageProps {
  setCurrentPage?: (page: PageType) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ setCurrentPage }) => {
  const { scrollToTop } = useSmoothScroll();
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  const handlePageChange = (page: PageType) => {
    setCurrentPage?.(page);
    scrollToTop();
  };

  // Inactivity timer - show popup after 40 seconds of inactivity
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      if (!hasShownPopup) {
        inactivityTimer = setTimeout(() => {
          setShowHelpPopup(true);
          setHasShownPopup(true);
        }, 40000); // 40 seconds
      }
    };

    const handleActivity = () => {
      resetTimer();
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    resetTimer();
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [hasShownPopup]);

  const closeHelpPopup = () => {
    setShowHelpPopup(false);
  };

  return (
    <div className="bg-[#0A0A12]">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#0F0F1A] to-[#0A0A12]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ textShadow: "0 0 15px rgba(0, 243, 255, 0.5)" }}>
              Transparent Pricing. Premium Quality.
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              International-level delivery at Indian market-friendly rates — with AI + human craft.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="px-4 py-2 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-full flex items-center">
                <span className="w-2 h-2 bg-[#39FF14] rounded-full mr-2 animate-pulse"></span>
                <span className="text-[#39FF14] text-sm font-medium">50–70% lower than international agencies</span>
              </div>
              <div className="px-4 py-2 bg-[#00F3FF]/10 border border-[#00F3FF]/30 rounded-full flex items-center">
                <span className="w-2 h-2 bg-[#00F3FF] rounded-full mr-2 animate-pulse"></span>
                <span className="text-[#00F3FF] text-sm font-medium">No hidden fees</span>
              </div>
              <div className="px-4 py-2 bg-[#FF00FF]/10 border border-[#FF00FF]/30 rounded-full flex items-center">
                <span className="w-2 h-2 bg-[#FF00FF] rounded-full mr-2 animate-pulse"></span>
                <span className="text-[#FF00FF] text-sm font-medium">Plans that scale with your needs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Choose Your Perfect Plan
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Flexible pricing designed to grow with your business. All plans include our signature AI-enhanced approach.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-[#0F0F1A] rounded-2xl p-8 border ${
                  pkg.popular
                    ? 'border-[#00F3FF] shadow-[0_0_30px_rgba(0,243,255,0.3)]'
                    : 'border-[#00F3FF]/30 hover:border-[#00F3FF]/60'
                } transition-all hover:transform hover:scale-105`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#00F3FF] to-[#39FF14] text-[#0A0A12] px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#00F3FF]">{pkg.price}</span>
                    {pkg.originalPrice !== pkg.price && (
                      <span className="text-lg text-gray-400 line-through ml-2">{pkg.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{pkg.bestFor}</p>
                  <p className="text-[#39FF14] text-sm font-medium">Delivery: {pkg.deliveryTime}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-[#00F3FF] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <motion.a
                    href="https://wa.me/918088310013"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-6 rounded-lg font-bold text-center transition-all inline-flex items-center justify-center ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-[#00F3FF] to-[#39FF14] text-[#0A0A12] hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]'
                        : 'bg-[#00F3FF] text-[#0A0A12] hover:bg-[#00D1E0]'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                    </svg>
                    Get Started
                  </motion.a>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-2">Payment Options:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {pkg.paymentOptions?.map((option, optionIndex) => (
                        <span key={optionIndex} className="text-xs bg-[#00F3FF]/10 text-[#00F3FF] px-2 py-1 rounded">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Popup */}
      <AnimatePresence>
        {showHelpPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={closeHelpPopup}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            >
              <div className="bg-[#0F0F1A] border border-[#00F3FF]/30 rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Need Help Choosing?</h3>
                    <p className="text-gray-300 text-sm">
                      Our team is ready to help you find the perfect solution for your project.
                    </p>
                  </div>
                  <button
                    onClick={closeHelpPopup}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-col gap-2">
                  <motion.a
                    href="https://wa.me/918088310013"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeHelpPopup}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#39FF14] text-[#0A0A12] px-4 py-3 rounded-lg font-bold text-sm hover:bg-[#2ecc0f] transition-all inline-flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                    </svg>
                    WhatsApp Chat
                  </motion.a>
                  <motion.button
                    onClick={() => {
                      closeHelpPopup();
                      handlePageChange('contact');
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-transparent border border-[#00F3FF] text-[#00F3FF] px-4 py-3 rounded-lg font-bold text-sm hover:bg-[#00F3FF]/10 transition-all"
                  >
                    Schedule Consultation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PricingPage;