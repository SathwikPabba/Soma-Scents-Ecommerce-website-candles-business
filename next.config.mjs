/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure proper routing
  trailingSlash: false,
  // Disable static HTML export
  output: 'standalone',
  // Ensure proper static file handling
  distDir: '.next',
}

export default nextConfig
