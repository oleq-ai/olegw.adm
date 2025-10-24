import type { NextConfig } from "next";

import { withBetterStack } from "@logtail/next";

// import { createJiti } from "jiti";
// import { fileURLToPath } from "node:url";

// const jiti = createJiti(fileURLToPath(import.meta.url));

// jiti("./src/config/server.env.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Use standalone output only on non-Windows platforms to avoid symlink issues
  ...(process.platform !== "win32" && { output: "standalone" }),
};

export default withBetterStack(nextConfig);
