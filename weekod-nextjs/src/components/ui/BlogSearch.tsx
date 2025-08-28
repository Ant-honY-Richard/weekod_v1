'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

export default function BlogSearch({ onSearch }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-2xl mx-auto mb-8"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused 
              ? '0 0 0 2px rgba(0, 243, 255, 0.3)' 
              : '0 0 0 1px rgba(107, 114, 128, 0.3)'
          }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search topics or keywords..."
            className="w-full px-6 py-4 pl-14 bg-[#161B26] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00F3FF] transition-all duration-300"
          />
          
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg 
              className={`w-6 h-6 transition-colors duration-300 ${
                isFocused ? 'text-[#00F3FF]' : 'text-gray-400'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </motion.div>

        {/* Search suggestions or recent searches could go here */}
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#161B26] border border-gray-700 rounded-xl shadow-xl z-10"
          >
            <div className="p-4">
              <p className="text-sm text-gray-400">
                Searching for "{query}"...
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}