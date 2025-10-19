/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/history-of-cryptography',
  assetPrefix: '/history-of-cryptography/',
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig