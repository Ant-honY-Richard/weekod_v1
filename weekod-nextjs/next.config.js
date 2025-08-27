/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co', 'videos.pexels.com', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Turbopack configuration (updated for Next.js 15.5+)
  turbopack: {
    resolveAlias: {
      // Add any aliases you need
      '@': './src',
    },
    // Set the root directory to silence the warning
    root: '.',
  },
  // Webpack configuration (fallback for non-Turbopack builds)
  webpack: (config, { dev, isServer }) => {
    // Only apply webpack optimizations when not using Turbopack
    if (process.env.TURBOPACK !== '1') {
      // Optimize bundle size
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
    }
    return config;
  },
  // Headers for caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/favicon.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig