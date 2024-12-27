/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/cdd-demo-frontend',
  assetPrefix: '/cdd-demo-frontend',
}

module.exports = nextConfig
