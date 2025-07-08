/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Image optimization
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },

  // Compression
  compress: true,

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config;
  },

  // Redirects
  async redirects() {
    return [
      // Add any redirects here
    ];
  },

  // Rewrites
  async rewrites() {
    return [
      // Add any rewrites here
    ];
  },

  // Output configuration for deployment
  output: 'standalone',

  // Disable x-powered-by header
  poweredByHeader: false,

  // Trailing slash
  trailingSlash: false,

  // ESLint configuration
  eslint: {
    dirs: ['pages', 'components', 'lib', 'hooks'],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;