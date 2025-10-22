"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import FormButton from "@/components/ui/form-button";
import FormInput from "@/components/ui/form-input";
import FormPhoneInput from "@/components/ui/form-phone-input";
import { Separator } from "@/components/ui/separator";
import { signInAction } from "@/lib/auth/auth.actions";
import { type SignInDto, signInSchema } from "@/lib/auth/dto/sign-in.dto";

type Props = {
  username?: string;
  password?: string;
};

export default function LoginForm({ username = "", password = "" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() || "";
  const callbackUrl =
    new URLSearchParams(searchParamsString).get("callbackUrl") || "/";

  const otherParams = new URLSearchParams(searchParamsString);
  otherParams.delete("callbackUrl");
  otherParams.delete("msisdn");
  const dashboardUrl = otherParams.toString()
    ? `${callbackUrl}?${otherParams.toString()}`
    : callbackUrl;

  const form = useForm<SignInDto>({
    resolver: zodResolver(signInSchema),
    defaultValues: { username, password },
  });

  const {
    control,
    formState: { isSubmitting: isPending },
    handleSubmit,
    reset,
  } = form;

  async function onSubmit(data: SignInDto) {
    const result = await signInAction(data);

    if (!result.success) {
      toast.error(result.error);
      return;
    }
    reset();
    toast.success("Please wait...");
    router.replace(dashboardUrl);
  }

  return (
    <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <Separator className="my-4" />

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <FormPhoneInput
              control={control}
              name="username"
              label="Phone Number"
              placeholder="07000000000"
            />
            <div className="space-y-1">
              <FormInput
                control={control}
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
              />
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <FormButton isLoading={isPending} className="w-full">
              Sign In
            </FormButton>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Protected by enterprise-grade security</p>
        </div>
      </CardContent>
    </Card>
  );
}
