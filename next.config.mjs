/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
  images: {
    domains: ['api.varzik.ir'], // Add the hostname here
  },
};

export default nextConfig;
