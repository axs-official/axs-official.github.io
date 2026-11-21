/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  pageExtensions: ['tsx'],
  images: { remotePatterns: [{ hostname: 'avatars.githubusercontent.com' }] },
  trailingSlash: false,
  poweredByHeader: false,
};
module.exports = nextConfig;
