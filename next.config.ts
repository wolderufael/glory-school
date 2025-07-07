import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    PORT: process.env.PORT || "3001",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Set the port for the development server
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // async rewrites() {
  //   const env = process.env.NODE_ENV;
  //   return [
  //     {
  //       source: "/:path*",
  //       destination:
  //         env === "production"
  //           ? "https://168.231.80.15/:path*" // Use HTTPS in production if your backend supports it
  //           : "http://168.231.80.15/:path*", // Use HTTP in development
  //     },
  //   ];
  // },
};

export default nextConfig;
