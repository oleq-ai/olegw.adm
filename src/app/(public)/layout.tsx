import { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";

import { Shield } from "lucide-react";

import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]" />

      <div className="container relative mx-auto flex min-h-svh flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center space-y-4">
            <div className="relative h-16 w-48">
              <Image
                src="/icons/logo.png"
                alt={`${siteConfig.name} Logo`}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 backdrop-blur-sm">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Admin Portal
              </span>
            </div>
          </div>

          {/* Auth Card */}
          <div className="rounded-lg border border-border/50 bg-card/50 p-8 shadow-sm backdrop-blur-sm">
            {children}
          </div>

          {/* Footer */}
          <div className="mt-8 space-y-2 text-center">
            <p className="text-xs text-muted-foreground">
              Secure authentication powered by Oleq
            </p>
            <p className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
