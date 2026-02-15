import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Increase timeout for static page generation (default is 60s)
  staticPageGenerationTimeout: 300,
  // Reduce concurrency to prevent resource exhaustion on free tier CI
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
