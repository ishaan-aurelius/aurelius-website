import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // emit static HTML/CSS/JS into ./out (no Node server needed)
  images: { unoptimized: true }, // GitHub Pages can't run Next's image optimizer
  basePath: "/aurelius-website", // site is served from github.io/aurelius-website
  assetPrefix: "/aurelius-website/", // make asset URLs resolve under the subpath
  trailingSlash: true, // GitHub Pages serves /route/ as /route/index.html
};

export default nextConfig;
