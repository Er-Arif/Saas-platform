import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@company/ui", "@company/types"]
};

export default nextConfig;

