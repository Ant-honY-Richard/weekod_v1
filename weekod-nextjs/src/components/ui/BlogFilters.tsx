'use client';

import { motion } from 'framer-motion';
import { BlogCategory } from '@/types';

interface BlogFiltersProps {
  categories: BlogCategory[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const defaultCategories = [
  'AI in Web Design',
  'Startup Tips',
  'App Prototyping',
  'Process & Culture',
  'Case Studies',
  'SEO & Marketing'
];

export default function BlogFilters({ 
  categories, 
  selectedCategories, 
  onCategoryChange 
}: BlogFiltersProps) {
  const displayCategories = categories.length > 0 ? categories : 
    defaultCategories.map((name, index) => ({
      _id: index.toString(),
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      postCount: 0
    }));

  const handleCategoryToggle = (categorySlug: string) => {
    if (selectedCategories.includes(categorySlug)) {
      onCategoryChange(selectedCategories.filter(c => c !== categorySlug));
    } else {
      onCategoryChange([...selectedCategories, categorySlug]);
    }
  };

  const handleClearAll = () => {
    onCategoryChange([]);
  };

  const handleShowAll = () => {
    onCategoryChange([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto"
    >
      {/* All Categories Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShowAll}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          selectedCategories.length === 0
            ? 'bg-gradient-to-r from-[#00F3FF] to-[#FF00FF] text-white shadow-lg'
            : 'bg-[#161B26] text-gray-300 border border-gray-700 hover:border-[#00F3FF]/50 hover:text-white'
        }`}
      >
        All
      </motion.button>

      {/* Category Filter Buttons */}
      {displayCategories.map((category, index) => (
        <motion.button
          key={category.slug}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategoryToggle(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategories.includes(category.slug)
              ? 'bg-gradient-to-r from-[#00F3FF] to-[#FF00FF] text-white shadow-lg'
              : 'bg-[#161B26] text-gray-300 border border-gray-700 hover:border-[#00F3FF]/50 hover:text-white'
          }`}
        >
          {category.name}
          {category.postCount !== undefined && category.postCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
              {category.postCount}
            </span>
          )}
        </motion.button>
      ))}

      {/* Clear Filters Button */}
      {selectedCategories.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClearAll}
          className="px-4 py-2 rounded-full text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:text-red-300 transition-all duration-300"
        >
          Clear Filters
          <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
}