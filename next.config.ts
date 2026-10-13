import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'astera-stil.vercel.app' },
      { protocol: 'https', hostname: 'argentum-stil.vercel.app' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
