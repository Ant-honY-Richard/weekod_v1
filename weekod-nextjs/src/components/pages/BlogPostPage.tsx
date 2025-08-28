'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import NavigationRouter from '@/components/NavigationRouter';
import Footer from '@/components/Footer';
import BlogSharePanel from '@/components/ui/BlogSharePanel';
import BlogAuthorBio from '@/components/ui/BlogAuthorBio';
import BlogNewsletter from '@/components/ui/BlogNewsletter';
import { BlogPost } from '@/types';
import { format as formatDate } from 'date-fns';
import { pageVariants, pageTransition } from '@/data';
import { analytics } from '@/lib/analytics';

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const formattedDate = formatDate(new Date(post.publishedAt), 'MMMM dd, yyyy');
  const updatedDate = post.updatedAt ? formatDate(new Date(post.updatedAt), 'MMMM dd, yyyy') : null;

  // Track blog post view
  useEffect(() => {
    analytics.trackBlogPostView(
      post.slug, 
      post.title, 
      post.categories[0]
    );
  }, [post.slug, post.title, post.categories]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-[#0A0A12] via-[#1a1a2e] to-[#16213E] text-white"
    >
      <NavigationRouter />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F3FF] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#FF00FF] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse delay-1000" />
      </div>

      <main className="relative z-10 pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#00F3FF] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#00F3FF] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-gray-300 truncate">
                {post.title}
              </li>
            </ol>
          </motion.nav>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-[#00F3FF]/10 text-[#00F3FF] text-sm font-medium rounded-full border border-[#00F3FF]/20"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {post.subtitle}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-3">
                {post.author.image && (
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="text-white font-medium">{post.author.name}</p>
                  <p className="text-xs">Author</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-white">{formattedDate}</p>
                  <p className="text-xs">Published</p>
                </div>
                
                {updatedDate && updatedDate !== formattedDate && (
                  <div>
                    <p className="text-white">{updatedDate}</p>
                    <p className="text-xs">Updated</p>
                  </div>
                )}
                
                <div>
                  <p className="text-white">{post.readTime} min</p>
                  <p className="text-xs">Read time</p>
                </div>

                {post.views && (
                  <div>
                    <p className="text-white">{post.views.toLocaleString()}</p>
                    <p className="text-xs">Views</p>
                  </div>
                )}
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          {post.featuredImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  className="w-full h-64 md:h-96 object-cover"
                />
                {post.featuredImage.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-sm text-gray-300">{post.featuredImage.caption}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1"
            >
              <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mb-6 text-white">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mb-4 mt-8 text-white">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold mb-3 mt-6 text-white">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-[#00F3FF] hover:text-[#FF00FF] transition-colors underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-[#00F3FF] pl-6 my-6 italic text-gray-300 bg-[#161B26] p-4 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-[#161B26] px-2 py-1 rounded text-[#00F3FF] text-sm">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-[#161B26] p-4 rounded-lg overflow-x-auto my-6 border border-gray-700">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#161B26] text-gray-300 text-sm rounded-full border border-gray-700 hover:border-[#00F3FF]/50 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:w-80"
            >
              <div className="sticky top-24 space-y-8">
                <BlogSharePanel post={post} />
                <BlogAuthorBio author={post.author} />
              </div>
            </motion.aside>
          </div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <BlogNewsletter />
          </motion.div>
        </article>
      </main>

      <Footer />
    </motion.div>
  );
}