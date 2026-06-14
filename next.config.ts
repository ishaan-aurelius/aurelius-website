import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true, // serve /route/ — preserves existing URL style
};

export default nextConfig;
