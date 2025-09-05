'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface BlogAuthorBioProps {
  author: {
    name: string;
    image?: string;
    bio?: string;
  };
}

export default function BlogAuthorBio({ author }: BlogAuthorBioProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#161B26] rounded-xl p-6 border border-gray-700/50"
    >
      <h3 className="text-lg font-semibold mb-4 text-white">About the Author</h3>
      
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00F3FF] to-[#FF00FF] flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {author.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-2">{author.name}</h4>
          
          {author.bio ? (
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {author.bio}
            </p>
          ) : (
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              A passionate writer and developer at Weekod, focused on sharing insights about AI-powered web development and startup growth strategies.
            </p>
          )}
          
          <div className="flex space-x-3">
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00F3FF] to-[#FF00FF] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-[#00F3FF]/25 transition-all duration-300"
            >
              Get in Touch
            </Link>
            
            <button className="inline-flex items-center px-4 py-2 bg-[#1F2937] border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:border-[#00F3FF] hover:text-[#00F3FF] transition-all duration-300">
              Follow
            </button>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">
            Need help with your project?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00F3FF]/10 to-[#FF00FF]/10 border border-[#00F3FF]/30 text-[#00F3FF] text-sm font-medium rounded-lg hover:bg-gradient-to-r hover:from-[#00F3FF]/20 hover:to-[#FF00FF]/20 transition-all duration-300"
          >
            Book a Consultation
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}