import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Enable static exports for Vercel
  output: 'standalone',
};

export default withNextIntl(nextConfig);
