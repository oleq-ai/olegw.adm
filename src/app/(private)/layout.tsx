import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/layout/profile-dropdown";
import SkipToMain from "@/components/layout/skip-to-main";
import { ThemeSwitch } from "@/components/layout/theme-switch";
import { SearchInput } from "@/components/ui/search-input";
import { SidebarProvider } from "@/components/ui/sidebar";
import env from "@/config/server.env";
import { SearchProvider } from "@/context/search-context";
import { getSession } from "@/lib/session/session";
import { cn } from "@/lib/utils";

import SessionManager from "./session-manager";

export default async function PrivateLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getSession();

  if (!session) redirect("/sign-in");

  const { name, email, modules, role } = session;

  const user = { name, email, modules, role };
  const profile = { name, email };

  return (
    <SessionManager timeout={env.SESSION_TIMEOUT}>
      <SearchProvider>
        <SidebarProvider defaultOpen>
          <SkipToMain />
          <AppSidebar user={{ ...user }} />
          <div className="w-full">
            <Header className="bg-primary">
              <div className="ml-auto flex items-center md:space-x-4">
                <SearchInput className="text-primary-foreground" />
                <ThemeSwitch />
                <ProfileDropdown user={{ ...profile }} />
              </div>
            </Header>

            <main
              className={cn("peer-[.header-fixed]/header:mt-16", "px-4 py-6")}
            >
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
      </SearchProvider>
    </SessionManager>
  );
}
