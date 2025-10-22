import env from "@/config/server.env";

const oneDay = 24 * 60 * 60 * 1000;

export const ONE_DAY_S = 60 * 60 * 24;

export const SESSION_OPTIONS = {
  NAME: "uytrdfhjuyt",
  PATH: "/",
  // DOMAIN: "localhost",
  HTTP_ONLY: true,
  SECURE: env.NODE_ENV !== "development",
  SAME_SITE: "lax" as const,
  EXPIRES: new Date(Date.now() + oneDay),
  ALGORITHM: "HS256" as const,
  EXPIRATION_TIME: "1d",
  ONE_DAY_S,
} as const;

export const CHUNK_SIZE = 3000;
