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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.bonet.rw',
        port: '',
        pathname: '/**',
      },
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
