import Image from "next/image";
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
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className="relative">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="relative data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="relative h-8 w-8 flex-shrink-0">
                <Image
                  src={`/icons/logo.png`}
                  alt={`${siteConfig.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="overflow-hidden whitespace-nowrap group-data-[collapsible=icon]:hidden">
                {siteConfig.name}
              </span>
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

      <SidebarContent className="overflow-y-auto">
        {filteredNavGroups.map((group, groupIndex) => (
          <div key={group.title} className={cn(groupIndex > 0 && "mt-8")}>
            <NavGroup {...group} />
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-border">
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
