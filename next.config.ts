import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // don't advertise the framework
  poweredByHeader: false,
  // never ship original source via source maps
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // stops other sites from embedding / iframe-cloning this one
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
