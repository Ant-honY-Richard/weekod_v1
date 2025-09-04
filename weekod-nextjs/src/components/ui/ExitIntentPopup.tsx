'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse moves to top of the page
      if (e.clientY <= 5 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        // Save to session storage to prevent multiple popups
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };
    
    // Check if already shown in this session
    if (sessionStorage.getItem('exitIntentShown') !== 'true') {
      // Add delay to prevent immediate triggering
      const timer = setTimeout(() => {
        document.addEventListener('mouseleave', handleMouseLeave);
      }, 5000);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [hasShown]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, replace with actual API call
      // const response = await fetch('/api/lead-capture', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      setIsSuccess(true);
      
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_capture', {
          'event_category': 'engagement',
          'event_label': 'exit_intent_popup'
        });
      }
    } catch (error) {
      console.error('Lead capture error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0F0F1A] p-8 rounded-2xl max-w-md w-full border border-[#00F3FF]/30 relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setIsVisible(false)}
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-4">Before You Go!</h3>
            <p className="text-gray-300 mb-6">Get our free guide: &ldquo;10 Essential Features Every Startup Website Needs&rdquo;</p>
            
            {!isSuccess ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email" 
                  className="w-full p-3 bg-[#0A0A12] border border-gray-700 rounded-lg focus:border-[#00F3FF] text-white"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#00F3FF] to-[#0A0A12] text-white font-bold rounded-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Get Free Guide'}
                </button>
              </form>
            ) : (
              <div className="text-center p-4 bg-[#00F3FF]/10 rounded-lg border border-[#00F3FF]/30">
                <p className="text-[#00F3FF] font-bold mb-2">Thank you!</p>
                <p className="text-white">Check your email for your download link.</p>
              </div>
            )}
            
            <button 
              className="mt-4 text-sm text-gray-400 hover:text-white w-full text-center"
              onClick={() => setIsVisible(false)}
            >
              No thanks, I&apos;ll pass
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;