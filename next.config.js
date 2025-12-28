/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/PurlesTools',
  assetPrefix: '/PurlesTools/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
