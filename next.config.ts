import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/event-management-system' : undefined
};

export default nextConfig;

