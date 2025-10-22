import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const ONE_MINUTE = 60 * 1000;

const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    SESSION_TIMEOUT: z
      .string()
      .default("15")
      .transform((val) => parseInt(val, 10) * ONE_MINUTE),
    AUTH_SECRET: z.string(),
    API_URL: z.string(),
    AUTO_LOGIN: z.string().optional(),
  },
  // onValidationError: (error: ZodError) => {
  //   // eslint-disable-next-line no-console
  //   console.error(
  //     "❌ Invalid environment variables:",
  //     error.flatten().fieldErrors
  //   );
  //   process.exit(1);
  // },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});

export default env;
