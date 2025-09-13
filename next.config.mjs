/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Ensure proper routing
  trailingSlash: false,
  // Disable static HTML export
  output: 'standalone',
  // Ensure proper static file handling
  distDir: '.next',
}

export default nextConfig
