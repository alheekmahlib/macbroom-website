import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/macbroom-website',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
