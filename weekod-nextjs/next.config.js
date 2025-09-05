/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
    // Only fail on errors, not warnings
    dirs: ['src'],
  },
  images: {
    domains: ['placehold.co', 'videos.pexels.com', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  // Experimental features for better performance
  experimental: {
    // Temporarily disabled optimizeCss to fix critters dependency issue
    // optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'date-fns', 'fuse.js'],
  },
  // Bundle analyzer in development
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          })
        );
      }
      return config;
    },
  }),
  // Webpack configuration for optimizations
  webpack: (config, { dev, isServer }) => {
    // Keep Next.js default devtool in development to avoid performance regressions

    // Optimize bundle size in production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
  // Headers for security and performance
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    // Always-on security headers
    const securityHeaders = {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    };

    // Ensure HTML is not cached to avoid stale/blank pages
    const htmlNoCache = {
      source: '/((?:index)?(?:/)?|(?:[^.]+))', // matches root and any non-file path
      headers: [
        { key: 'Cache-Control', value: 'no-store, must-revalidate' },
      ],
    };

    // Long-term caching (production only) for immutable build assets
    const prodCachingHeaders = isProd
      ? [
          {
            source: '/favicon.svg',
            headers: [
              { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
            ],
          },
          {
            source: '/_next/static/(.*)',
            headers: [
              { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
            ],
          },
          {
            source: '/(.*)\\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?)$',
            headers: [
              { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
            ],
          },
        ]
      : [];

    return [securityHeaders, htmlNoCache, ...prodCachingHeaders];
  },
}

module.exports = nextConfig