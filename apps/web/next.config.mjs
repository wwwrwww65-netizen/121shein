/** @type {import('next').NextConfig} */
const nextConfig = {
  // (Optional) Enable React's Strict Mode for highlighting potential problems in an application
  reactStrictMode: true,

  // (Optional) Transpile packages from the monorepo
  transpilePackages: ['@repo/ui'],
};

export default nextConfig;
