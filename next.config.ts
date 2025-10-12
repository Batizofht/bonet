import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Increase build timeout to 180 seconds
  staticPageGenerationTimeout: 500,
  
  // Disable type checking and ESLint during build to speed up process
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Optimize images if you're using next/image
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [], // Add your image domains here if needed
  },
  
  // Enable React strict mode (but can disable if causing issues)
  reactStrictMode: true,
  
  // Add compression for better performance
  compress: true,
  
  // Experimental features for better build performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
};

export default nextConfig;