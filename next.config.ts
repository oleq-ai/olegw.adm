import type { NextConfig } from "next";

import { withBetterStack } from "@logtail/next";

// import { createJiti } from "jiti";
// import { fileURLToPath } from "node:url";

// const jiti = createJiti(fileURLToPath(import.meta.url));

// jiti("./src/config/server.env.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Use export for Windows to avoid symlink issues
  output: process.platform === "win32" ? "export" : "standalone",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withBetterStack(nextConfig);
