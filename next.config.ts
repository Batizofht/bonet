import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/booknow',
        destination: '/Reservations',
        permanent: true,
      },
      // Duplicate service pages merged into one page each (explicit 301,
      // not Next's default 308 for permanent redirects)
      { source: '/hrsupport', destination: '/hr-recruitment', statusCode: 301 },
      { source: '/travel', destination: '/executive-travel', statusCode: 301 },
      // Retired blog category pages
      {
        source: '/blog-business',
        destination: '/blog/how-to-register-a-company-in-rwanda-2026-guide-for-foreign-investors',
        statusCode: 301,
      },
      { source: '/blog-investment', destination: '/blogs', statusCode: 301 },
      { source: '/blog-travel-tips', destination: '/blogs', statusCode: 301 },
    ]
  },

  staticPageGenerationTimeout: 500,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    formats: ['image/webp', 'image/avif'],
    qualities: [70, 72, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.bonet.rw',
        port: '',
        pathname: '/**',
      },
      // Partner logos (TrustIndicators) — resized instead of decoding 1000px+ originals
      { protocol: 'https', hostname: 'pbs.twimg.com', pathname: '/profile_images/**' },
      { protocol: 'https', hostname: 'www.gov.rw', pathname: '/fileadmin/**' },
      { protocol: 'https', hostname: 'cdn-bal.nba.com', pathname: '/manage/**' },
      { protocol: 'https', hostname: 'www.rura.rw', pathname: '/fileadmin/**' },
    ],
  },

  reactStrictMode: process.env.NODE_ENV === 'production',

  compress: true,

  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['lucide-react', 'react-i18next'],
  }
};

export default nextConfig;
