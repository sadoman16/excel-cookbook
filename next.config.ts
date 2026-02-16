import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removing output: 'export' to allow API routes (Serverless Functions) to work on Vercel.
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
