import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 259200,
    unoptimized: true,
  },
  allowedDevOrigins: ["http://192.168.10.103:3000"],
};

export default nextConfig;
