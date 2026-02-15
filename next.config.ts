import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/excel-cookbook',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
