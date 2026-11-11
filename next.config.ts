import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/booknow',
        destination: '/Reservations',
        permanent: true,
      },
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
