import type { NextConfig } from 'next';

const isCapacitorBuild = process.env.CAPACITOR_BUILD === 'true';

const nextConfig: NextConfig = {
  ...(isCapacitorBuild ? { output: 'export' as const } : {}),
  images: isCapacitorBuild ? { unoptimized: true } : undefined,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
