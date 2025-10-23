import "server-only";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { JWTPayload, SignJWT, jwtVerify } from "jose";

import env from "@/config/server.env";

import { SESSION_OPTIONS } from "./session.constants";
import { SessionStore } from "./session.store";
import { Session } from "./session.types";

const secretKey = env.AUTH_SECRET;
const encodedSecretKey = new TextEncoder().encode(secretKey);

export async function encrypt<T extends JWTPayload>(
  payload: T,
  expirationTime: string
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: SESSION_OPTIONS.ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedSecretKey);
}

export async function decrypt<T>(session?: string) {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify<T>(session, encodedSecretKey, {
      algorithms: [SESSION_OPTIONS.ALGORITHM],
    });
    return payload as T;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to verify session", error);
    return null;
  }
}

export async function createSession(payload: Session) {
  // @ts-expect-error - TODO: fix this
  const session = await encrypt<Session>(
    payload,
    SESSION_OPTIONS.EXPIRATION_TIME
  );

  const sessionStore = await SessionStore.create(SESSION_OPTIONS.NAME);
  const chunks = sessionStore.chunk(session);

  try {
    const cookieStore = await cookies();
    Object.entries(chunks).forEach(([name, value]) => {
      cookieStore.set(name, value, {
        httpOnly: SESSION_OPTIONS.HTTP_ONLY,
        secure: SESSION_OPTIONS.SECURE,
        // expires: SESSION_OPTIONS.EXPIRES,
        maxAge: SESSION_OPTIONS.ONE_DAY_S,
        sameSite: SESSION_OPTIONS.SAME_SITE,
        path: SESSION_OPTIONS.PATH,
      });
    });
  } catch {
    // Handle static export mode where cookies are not available
    // console.warn("Cookies not available in static export mode");
  }
}

export async function destroySession() {
  const sessionStore = await SessionStore.create(SESSION_OPTIONS.NAME);
  sessionStore.clean();
}

export async function getStoredSession(cookie?: NextRequest["cookies"]) {
  try {
    const sessionStore = await SessionStore.create(
      SESSION_OPTIONS.NAME,
      cookie
    );
    const session = await decrypt<Session>(sessionStore.value);
    if (!session) return null;

    return session;
  } catch {
    // Handle static export mode where cookies are not available
    // console.warn("Session not available in static export mode");
    return null;
  }
}

export async function getSession(cookie?: NextRequest["cookies"]) {
  return getStoredSession(cookie);
}
