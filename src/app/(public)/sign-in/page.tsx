import { Metadata } from "next";
import { Suspense } from "react";

import env from "@/config/server.env";

import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  const autoLogin = env.AUTO_LOGIN;
  const [username, password] = autoLogin?.split(":") ?? [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm username={username} password={password} />
    </Suspense>
  );
}
