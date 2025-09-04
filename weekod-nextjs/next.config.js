/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'videos.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Simplified configuration to avoid conflicts
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Basic experimental features
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Webpack configuration for OGL compatibility
  webpack: (config, { dev, isServer }) => {
    // Handle OGL module properly
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    // Ensure consistent module resolution
    if (dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'ogl': require.resolve('ogl'),
      };
    }

    return config;
  },
};

module.exports = nextConfig;