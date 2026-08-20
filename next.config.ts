import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow loading doctor avatars from the Liara avatar host used in production/dev.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
