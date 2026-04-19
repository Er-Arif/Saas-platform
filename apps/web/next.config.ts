import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@company/ui", "@company/sdk", "@company/types"],
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.COMPANY_API_PROXY_URL ?? "http://localhost:8000"}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;

