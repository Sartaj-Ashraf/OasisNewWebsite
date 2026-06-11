/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'standalone',
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
