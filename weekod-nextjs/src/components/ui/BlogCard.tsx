'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types';
// Simple date formatting utility to avoid date-fns import issues
const formatDate = (date: Date, format: string): string => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  if (format === 'MMM dd, yyyy') {
    return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()}`;
  }
  
  return date.toLocaleDateString();
};

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = formatDate(new Date(post.publishedAt), 'MMM dd, yyyy');

  if (featured) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#161B26] to-[#1F2937] border border-gray-700/50 hover:border-[#00F3FF]/30 transition-all duration-300"
      >
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-[#00F3FF] to-[#FF00FF] text-white text-sm font-medium rounded-full">
            Featured
          </span>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-1/2 relative h-64 lg:h-auto">
            {post.featuredImage ? (
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                width={600}
                height={256}
                className="w-full h-full object-cover"
                quality={85}
                priority={true}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#00F3FF]/20 to-[#FF00FF]/20 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
          </div>

          {/* Content */}
          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="px-2 py-1 bg-[#00F3FF]/10 text-[#00F3FF] text-xs font-medium rounded-md border border-[#00F3FF]/20"
                >
                  {category}
                </span>
              ))}
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-[#00F3FF] transition-colors">
              {post.title}
            </h2>

            {post.subtitle && (
              <p className="text-gray-300 mb-4 text-lg">
                {post.subtitle}
              </p>
            )}

            <p className="text-gray-400 mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>{post.author.name}</span>
                <span>•</span>
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00F3FF] to-[#FF00FF] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#00F3FF]/25 transition-all duration-300"
                aria-label={`Read more about ${post.title}`}
              >
                Read More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link 
        href={`/blog/${post.slug}`} 
        className="block"
        aria-label={`Read article: ${post.title}`}
      >
        <div className="bg-[#161B26] rounded-xl overflow-hidden border border-gray-700/50 hover:border-[#00F3FF]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00F3FF]/10">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            {post.featuredImage ? (
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                width={400}
                height={192}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                quality={80}
                priority={featured}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#00F3FF]/20 to-[#FF00FF]/20 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="px-2 py-1 bg-[#00F3FF]/10 text-[#00F3FF] text-xs font-medium rounded-md border border-[#00F3FF]/20"
                >
                  {category}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00F3FF] transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-gray-400 mb-4 line-clamp-3 text-sm">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <span>{post.author.name}</span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}