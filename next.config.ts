import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Development performance optimizations
  ...(process.env.NODE_ENV === 'development' && {
    // Disable source maps in development for faster builds
    productionBrowserSourceMaps: false,
    
    // Reduce webpack processing overhead
    webpack: (config, { dev }) => {
      if (dev) {
        config.watchOptions = {
          poll: false,
          aggregateTimeout: 300,
        };
      }
      return config;
    },
  }),
  
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
    domains: ['api.bonet.rw'], // Add your image domains here if needed
  },
  
  // Disable React strict mode in development for faster re-renders
  reactStrictMode: process.env.NODE_ENV === 'production',
  
  // Add compression for better performance
  compress: true,
  
  // Experimental features for better build performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ['lucide-react', '@ant-design/icons'],
  }
};

export default nextConfig;