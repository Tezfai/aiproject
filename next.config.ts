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
    ],
  },
};

export default nextConfig;
