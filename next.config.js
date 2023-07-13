/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  ssr: true,
  publicRuntimeConfig: {
    app: {
      baseUrl: process.env.BASE_URL,
    },
  },
};

module.exports = nextConfig;
