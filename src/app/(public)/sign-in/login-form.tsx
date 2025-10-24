"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import FormButton from "@/components/ui/form-button";
import FormInput from "@/components/ui/form-input";
import FormPhoneInput from "@/components/ui/form-phone-input";
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
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

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
            className="[&_input]:focus:border-blue-500 [&_input]:focus:ring-blue-500/20 [&_input]:focus-visible:border-blue-500 [&_input]:focus-visible:ring-blue-500/20"
          />
          <div className="space-y-1">
            <FormInput
              control={control}
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              className="[&_button]:text-blue-600 [&_button]:hover:text-blue-700 [&_input]:focus:border-blue-500 [&_input]:focus:ring-blue-500/20 [&_input]:focus-visible:border-blue-500 [&_input]:focus-visible:ring-blue-500/20"
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <FormButton
            isLoading={isPending}
            className="w-full border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:from-blue-700 hover:to-indigo-700"
          >
            Sign In
          </FormButton>
        </form>
      </Form>
    </div>
  );
}
