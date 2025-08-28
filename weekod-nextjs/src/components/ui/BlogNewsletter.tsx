'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { analytics } from '@/lib/analytics';

export default function BlogNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');
    
    try {
      // TODO: Implement newsletter subscription API
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
      
      // Track newsletter signup
      analytics.trackNewsletterSignup('blog');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00F3FF]/10 to-[#FF00FF]/10 border border-gray-700/50 p-8 md:p-12"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00F3FF]/5 to-[#FF00FF]/5" />
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#00F3FF] rounded-full mix-blend-multiply filter blur-xl opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#FF00FF] rounded-full mix-blend-multiply filter blur-xl opacity-10" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#00F3FF] to-[#FF00FF] bg-clip-text text-transparent">
            Want More Growth Insights?
          </h3>
          <p className="text-gray-300 mb-8 text-lg">
            Get actionable tips and AI web trends delivered to your inbox. Join 500+ startup founders and developers.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={status === 'loading'}
              className="w-full px-4 py-3 bg-[#161B26] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00F3FF] transition-all duration-300 disabled:opacity-50"
            />
          </div>
          
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: status === 'loading' ? 1 : 1.05 }}
            whileTap={{ scale: status === 'loading' ? 1 : 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#00F3FF] to-[#FF00FF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#00F3FF]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Subscribing...
              </div>
            ) : (
              'Subscribe'
            )}
          </motion.button>
        </motion.form>

        {/* Status Messages */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg text-sm ${
              status === 'success'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {message}
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-gray-500 mt-4"
        >
          No spam, unsubscribe at any time. We respect your privacy.
        </motion.p>
      </div>
    </motion.div>
  );
}