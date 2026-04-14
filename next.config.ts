import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Force static export for ALL environments to save Vercel ISR/Server resources.
  // This turns the site into a high-performance static website (0 ISR Reads).
  output: 'export',
  typescript: {
    ignoreBuildErrors: isGithubActions,
  },
  images: {
    unoptimized: true,
  },
  // Increase timeout for static page generation (default is 60s)
  staticPageGenerationTimeout: 600,
  // Optimization: Remove low-concurrency limits to use full Vercel build power
};

export default nextConfig;
