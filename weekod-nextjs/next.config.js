/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable build tracing to prevent EPERM errors on Windows
  outputFileTracing: false,
  
  // Generate simple build ID to avoid trace file issues
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },
  // Disable source maps in production to avoid Windows permission issues
  productionBrowserSourceMaps: false,
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
  // Minimal experimental features
  experimental: {},
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Headers for better SEO and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ]
      }
    ]
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