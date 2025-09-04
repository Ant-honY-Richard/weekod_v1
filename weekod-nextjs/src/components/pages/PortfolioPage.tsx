'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { portfolio as portfolioData } from '@/data';
import { PageType } from '@/types';

interface PortfolioPageProps {
  setCurrentPage?: (page: PageType) => void;
}

// Simple slug generator (must match the details page)
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const PortfolioPage: React.FC<PortfolioPageProps> = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPortfolio = useMemo(() => {
    const list = Array.isArray(portfolioData) ? portfolioData : [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.industry.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="bg-[#0A0A12] relative overflow-hidden">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-[#0F0F1A] to-transparent">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Portfolio</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Showcasing our latest projects and client success stories
          </p>
          <p className="text-gray-400 max-w-3xl mx-auto mb-12">
            From startups to established businesses, we&apos;ve helped clients across various industries transform their digital presence with our AI-powered solutions.
          </p>
          
          {/* Search Bar (with icon) */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by keyword or industry (e.g., gym, boutique)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-[#0F0F1A] border border-[#00F3FF]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#00F3FF]/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="bg-[#0F0F1A] rounded-2xl overflow-hidden border border-[#00F3FF]/20 hover:border-[#00F3FF]/40 transition-all"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1.5 text-white line-clamp-1">{item.title}</h3>
                  <p className="text-gray-400 mb-3 text-sm line-clamp-2">{item.description}</p>
                  <p className="text-xs text-gray-500 mb-4">Industry: {item.industry}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/portfolio/${slugify(item.title)}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#00F3FF] text-[#0A0A12] text-sm font-semibold hover:bg-[#00D1E0] transition"
                    >
                      View Details
                    </Link>
                    <a
                      href={item.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 border border-[#00F3FF] text-[#00F3FF] rounded-full text-sm font-semibold hover:bg-[#00F3FF]/10 transition"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {filteredPortfolio.length === 0 && (
            <p className="text-center text-gray-400 mt-12">No projects found matching your criteria.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
