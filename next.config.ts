import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', 'localhost:3000', 'localhost:5249'], // thêm domain của backend
  },
};

export default nextConfig;
