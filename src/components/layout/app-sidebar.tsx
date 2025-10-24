import { ComponentProps } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site.config";
import { getPermissionsAsync } from "@/lib/permissions/permissions";
import { Session } from "@/lib/session/session.types";
import { cn } from "@/lib/utils";

import { sidebarNavGroups } from "./data/sidebar-data";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import filterNavGroups from "./utils/nav";

interface Props extends ComponentProps<typeof Sidebar> {
  user: Pick<Session, "name" | "email" | "modules" | "role">;
}

export async function AppSidebar({ user, ...props }: Props) {
  const { hasAnyPermission } = await getPermissionsAsync({
    role: user.role,
    modules: user.modules,
  });
  const filteredNavGroups = filterNavGroups(sidebarNavGroups, hasAnyPermission);

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      {...props}
      className="border-r border-sidebar-border"
      style={{
        backgroundColor: "hsl(240 5.9% 10%)",
        color: "hsl(0 0% 98%)",
      }}
    >
      <SidebarHeader className="relative border-b border-sidebar-border p-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="relative p-0">
              <div className="flex items-center space-x-3">
                <div className="relative h-8 w-8 flex-shrink-0 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 p-1.5">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ fill: "currentColor" }}
                  >
                    <path d="M4 6h16v2H4V6zm0 4h16v2H4v-2zm0 4h16v2H4v-2zm0 4h16v2H4v-2zM6 8h2v8H6V8zm10 0h2v8h-2V8z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <span className="overflow-hidden whitespace-nowrap text-lg font-bold text-white group-data-[collapsible=icon]:hidden">
                    {siteConfig.name}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarTrigger className="absolute -right-3 top-6 z-50 hidden">
          <Button
            size="icon"
            className="h-6 w-6 rounded-full border-2 border-background shadow-lg transition-all hover:scale-110"
          >
            <ChevronLeft className="h-3 w-3 group-data-[state=collapsed]:hidden" />
            <ChevronRight className="h-3 w-3 group-data-[state=expanded]:hidden" />
          </Button>
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto px-4 py-6 pr-2">
        {filteredNavGroups.map((group, groupIndex) => (
          <div key={group.title} className={cn(groupIndex > 0 && "mt-2")}>
            <NavGroup {...group} />
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-sidebar-border p-4">
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
