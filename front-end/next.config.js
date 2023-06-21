/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'firebasestorage.googleapis.com'],
  },
  experimental: {
    esmExternals: true,
  },
};

module.exports = nextConfig;
