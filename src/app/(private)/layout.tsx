import { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import SkipToMain from "@/components/layout/skip-to-main";
import { SidebarProvider } from "@/components/ui/sidebar";
import env from "@/config/server.env";
import { cn } from "@/lib/utils";

import SessionManager from "./session-manager";

export default function PrivateLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // For static export mode, we'll use client-side session management
  // Create a mock user object for static generation
  const user = {
    name: "Admin User",
    email: "admin@oleqgw.com",
    modules: [],
    role: "admin",
  };

  return (
    <SessionManager timeout={env.SESSION_TIMEOUT}>
      <SidebarProvider defaultOpen>
        <SkipToMain />
        <AppSidebar user={{ ...user }} />
        <div className="w-full">
          <main className={cn("px-4 py-6")}>
            <div
              id="content"
              className={cn(
                "ml-auto w-full max-w-full",
                "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
                "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
                "transition-[width] duration-200 ease-linear",
                "flex h-svh flex-col",
                "group-data-[scroll-locked=1]/body:h-full",
                "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
              )}
            >
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </SessionManager>
  );
}
