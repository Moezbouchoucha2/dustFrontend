/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcMinify: false,
  },
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
