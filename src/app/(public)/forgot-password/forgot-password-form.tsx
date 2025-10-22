"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import FormButton from "@/components/ui/form-button";
import FormInput from "@/components/ui/form-input";
import FormPhoneInput from "@/components/ui/form-phone-input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  changePasswordAction,
  requestOtpAction,
} from "@/lib/auth/auth.actions";
import {
  ChangePasswordDto,
  changePasswordSchema,
} from "@/lib/auth/dto/sign-in.dto";
import { cn } from "@/lib/utils";

const phoneSchema = z.object({
  username: z.string().min(1, { message: "Required" }),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"phone" | "otp" | "password">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);

  const searchParamsString = searchParams?.toString() || "";
  const callbackUrl =
    new URLSearchParams(searchParamsString).get("callbackUrl") || "/";

  const otherParams = new URLSearchParams(searchParamsString);
  otherParams.delete("callbackUrl");
  otherParams.delete("msisdn");
  const dashboardUrl = otherParams.toString()
    ? `${callbackUrl}?${otherParams.toString()}`
    : callbackUrl;

  // Phone form
  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { username: "" },
  });

  // Password form
  const passwordForm = useForm<ChangePasswordDto>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      username: "",
      otp: "",
      oldpassword: "",
      newpassword: "",
    },
  });

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Request OTP
  async function onRequestOtp(data: PhoneFormData) {
    const result = await requestOtpAction(data.username);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    setPhoneNumber(data.username);
    setStep("otp");
    setCountdown(60); // 60 second countdown
    toast.success("OTP sent successfully");
  }

  // Handle OTP change
  function handleOtpChange(value: string) {
    setOtp(value);
  }

  // Verify OTP and move to password step
  async function onVerifyOtp() {
    if (otp.length < 4) {
      toast.error("Please enter a valid OTP");
      return;
    }

    passwordForm.setValue("username", phoneNumber);
    passwordForm.setValue("otp", otp);
    setStep("password");
  }

  // Submit password change
  async function onSubmitPassword(data: ChangePasswordDto) {
    const result = await changePasswordAction(data);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Password changed successfully");
    router.replace(dashboardUrl);
  }

  // Edit phone number
  function handleEditPhone() {
    setStep("phone");
    setOtp("");
    phoneForm.reset();
  }

  // Resend OTP
  async function handleResendOtp() {
    if (countdown > 0) return;

    const result = await requestOtpAction(phoneNumber);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    setCountdown(60);
    toast.success("OTP resent successfully");
  }

  return (
    <div className="grid gap-6">
      {/* Step 1: Phone Number */}
      {step === "phone" && (
        <Form {...phoneForm}>
          <form onSubmit={phoneForm.handleSubmit(onRequestOtp)}>
            <div className="grid gap-4">
              <FormPhoneInput
                control={phoneForm.control}
                name="username"
                label="Phone Number"
                placeholder="Enter your phone number"
                required
              />

              <FormButton
                className="mt-2"
                isLoading={phoneForm.formState.isSubmitting}
              >
                Request OTP
              </FormButton>

              <div className="flex justify-end">
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-muted-foreground hover:opacity-75"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </form>
        </Form>
      )}

      {/* Step 2: OTP Verification */}
      {step === "otp" && (
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="flex items-center justify-between rounded-md border border-input bg-muted px-3 py-2">
              <span className="text-sm">{phoneNumber}</span>
              <button
                type="button"
                onClick={handleEditPhone}
                className="text-sm font-medium text-primary hover:opacity-75"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Enter OTP</Label>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={countdown > 0}
              className={cn(
                "font-medium",
                countdown > 0
                  ? "cursor-not-allowed text-muted-foreground"
                  : "text-primary hover:opacity-75"
              )}
            >
              Resend OTP
            </button>
            {countdown > 0 && (
              <span className="text-muted-foreground">
                Resend in {countdown}s
              </span>
            )}
          </div>

          <FormButton
            onClick={onVerifyOtp}
            disabled={otp.length < 4}
            className="mt-2"
          >
            Verify OTP
          </FormButton>

          <div className="flex justify-end">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-muted-foreground hover:opacity-75"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      )}

      {/* Step 3: Change Password */}
      {step === "password" && (
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
            <div className="grid gap-4">
              <FormInput
                control={passwordForm.control}
                name="oldpassword"
                label="Old Password"
                type="password"
                placeholder="Enter your old password"
                required
              />

              <FormInput
                control={passwordForm.control}
                name="newpassword"
                label="New Password"
                type="password"
                placeholder="Enter your new password"
                required
              />

              <FormButton
                className="mt-2"
                isLoading={passwordForm.formState.isSubmitting}
              >
                Change Password
              </FormButton>

              <div className="flex justify-end">
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-muted-foreground hover:opacity-75"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
