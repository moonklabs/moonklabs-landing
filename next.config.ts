import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Each route is exported as a folder (/company/index.html), which static hosts serve without rewrites.
  trailingSlash: true,
};

export default nextConfig;
