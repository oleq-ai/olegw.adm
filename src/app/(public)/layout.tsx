import { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute left-10 top-20 h-32 w-32 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-300/30 blur-xl" />
        <div className="absolute right-20 top-40 h-24 w-24 rounded-full bg-gradient-to-br from-sky-200/30 to-blue-300/30 blur-xl" />
        <div className="absolute bottom-32 left-1/4 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-200/30 to-blue-300/30 blur-xl" />
        <div className="absolute bottom-20 right-1/3 h-28 w-28 rounded-full bg-gradient-to-br from-blue-200/30 to-sky-300/30 blur-xl" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Diagonal lines */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_50%,transparent_52%)] bg-[size:60px_60px]" />
      </div>

      <div className="container relative mx-auto flex min-h-svh flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center space-y-4">
            {/* Custom logo */}
            <div className="relative h-20 w-20">
              <Image
                src="/icons/credit.png"
                alt="OleqGW Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Brand name */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">OleqGW</h1>
            </div>
          </div>

          {/* Auth Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
            {children}
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} OleqGW. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
