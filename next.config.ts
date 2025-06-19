import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images:{
  remotePatterns:[
    {
      hostname:'images.unsplash.com',
    }
  ]
  }
};

export default nextConfig;
