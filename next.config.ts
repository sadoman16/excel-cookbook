import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Use export only when building on GitHub Actions to keep the build green.
  // Vercel will skip this and use the default serverless mode for the API.
  output: isGithubActions ? 'export' : undefined,
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
