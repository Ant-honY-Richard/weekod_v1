'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import NavigationFixed from '@/components/NavigationFixed';
import Footer from '@/components/Footer';
import BlogCard from '@/components/ui/BlogCard';
import BlogSearch from '@/components/ui/BlogSearch';
import BlogFilters from '@/components/ui/BlogFilters';
import BlogNewsletter from '@/components/ui/BlogNewsletter';
import { BlogPost, BlogCategory, BlogPagination } from '@/types';
import { pageVariants, pageTransition } from '@/data';

interface BlogPageState {
  posts: BlogPost[];
  categories: BlogCategory[];
  featuredPost: BlogPost | null;
  pagination: BlogPagination | null;
  loading: boolean;
  error: string | null;
  filters: {
    query: string;
    categories: string[];
    tags: string[];
  };
}

export default function BlogPage() {
  const [state, setState] = useState<BlogPageState>({
    posts: [],
    categories: [],
    featuredPost: null,
    pagination: null,
    loading: true,
    error: null,
    filters: {
      query: '',
      categories: [],
      tags: []
    }
  });

  // Fetch blog data
  const fetchBlogData = useCallback(async (page = 1) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12'
      });

      if (state.filters.query) {
        params.append('query', state.filters.query);
      }
      if (state.filters.categories.length > 0) {
        params.append('categories', state.filters.categories.join(','));
      }
      if (state.filters.tags.length > 0) {
        params.append('tags', state.filters.tags.join(','));
      }

      // Fetch posts and categories
      const [postsResponse, categoriesResponse, featuredResponse] = await Promise.all([
        fetch(`/api/blog/posts?${params}`),
        fetch('/api/blog/categories'),
        fetch('/api/blog/posts?featured=true&limit=1')
      ]);

      if (!postsResponse.ok || !categoriesResponse.ok || !featuredResponse.ok) {
        throw new Error('Failed to fetch blog data');
      }

      const postsData = await postsResponse.json();
      const categoriesData = await categoriesResponse.json();
      const featuredData = await featuredResponse.json();

      setState(prev => ({
        ...prev,
        posts: postsData.data.posts,
        categories: categoriesData.data,
        featuredPost: featuredData.data.posts[0] || null,
        pagination: postsData.data.pagination,
        loading: false
      }));

    } catch (error) {
      console.error('Error fetching blog data:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load blog posts. Please try again later.'
      }));
    }
  }, [state.filters]);

  // Handle search
  const handleSearch = (query: string) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, query }
    }));
  };

  // Handle category filter
  const handleCategoryFilter = (categories: string[]) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, categories }
    }));
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchBlogData(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch data on component mount and filter changes
  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-[#0A0A12] via-[#1a1a2e] to-[#16213E] text-white"
    >
      <NavigationFixed 
        currentPage="home"
        setCurrentPage={() => {}}
        scrolled={false}
        isMenuOpen={false}
        setIsMenuOpen={() => {}}
      />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F3FF] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#FF00FF] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000" />
      </div>

      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-[#00F3FF] to-[#FF00FF] rounded-xl">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00F3FF] to-[#FF00FF] bg-clip-text text-transparent">
              Insights & Resources
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay ahead with the latest in AI-powered web development, startup growth, and digital product building.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <BlogSearch onSearch={handleSearch} />
            <BlogFilters 
              categories={state.categories}
              selectedCategories={state.filters.categories}
              onCategoryChange={handleCategoryFilter}
            />
          </motion.div>

          {/* Featured Post */}
          {state.featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <BlogCard post={state.featuredPost} featured />
            </motion.div>
          )}

          {/* Error State */}
          {state.error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-400">{state.error}</p>
                <button
                  onClick={() => fetchBlogData()}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {state.loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#00F3FF]"></div>
              <p className="mt-4 text-gray-400">Loading blog posts...</p>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          {!state.loading && !state.error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {state.posts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {state.posts.map((post, index) => (
                      <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                      >
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {state.pagination && state.pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4">
                      <button
                        onClick={() => handlePageChange(state.pagination!.page - 1)}
                        disabled={!state.pagination.hasPrev}
                        className="px-4 py-2 bg-[#161B26] border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1F2937] transition-colors"
                      >
                        Previous
                      </button>
                      
                      <span className="text-gray-400">
                        Page {state.pagination.page} of {state.pagination.totalPages}
                      </span>
                      
                      <button
                        onClick={() => handlePageChange(state.pagination!.page + 1)}
                        disabled={!state.pagination.hasNext}
                        className="px-4 py-2 bg-[#161B26] border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1F2937] transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No blog posts found.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20"
          >
            <BlogNewsletter />
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}