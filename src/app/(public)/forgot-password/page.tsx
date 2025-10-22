import { Metadata } from "next/types";
import { Suspense } from "react";

import { Card } from "@/components/ui/card";

import ChangePasswordForm from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Change Password",
};

export default function ForgotPasswordPage() {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your phone number to receive an OTP
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ChangePasswordForm />
      </Suspense>
    </Card>
  );
}
