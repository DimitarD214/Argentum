import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // Serve modern formats (AVIF first, WebP fallback) for every <Image>
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'astera-stil.vercel.app' },
      { protocol: 'https', hostname: 'argentum-stil.vercel.app' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  }
};

export default nextConfig;
