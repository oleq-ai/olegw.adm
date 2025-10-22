"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { ChevronRight } from "lucide-react";
import { IconType } from "react-icons/lib";
import {
  MdAutoGraph,
  MdOutlineAccountBalance,
  MdOutlineAdd,
  MdOutlineAddBox,
  MdOutlineAddCircle,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
  MdOutlineAttachMoney,
  MdOutlineCalculate,
  MdOutlineCalendarToday,
  MdOutlineCardGiftcard,
  MdOutlineCategory,
  MdOutlineCreditCard,
  MdOutlineDashboard,
  MdOutlineEvent,
  MdOutlineGamepad,
  MdOutlineGroup,
  MdOutlineGroups3,
  MdOutlineHealthAndSafety,
  MdOutlineInsertChart,
  MdOutlineListAlt,
  MdOutlineMoneyOff,
  MdOutlinePayments,
  MdOutlinePerson,
  MdOutlineReceiptLong,
  MdOutlineSecurity,
  MdOutlineSettings,
  MdOutlineShield,
  MdOutlineSync,
  MdOutlineTune,
  MdOutlineVerified,
  MdOutlineWarning,
  MdOutlineWifiTethering,
} from "react-icons/md";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  NavCollapsible,
  type NavGroup,
  NavIcon,
  NavItem,
  NavLink,
} from "./types";

const Icon: Record<NavIcon, IconType> = {
  MdOutlineDashboard,
  MdOutlineAttachMoney,
  MdOutlineListAlt,
  MdOutlineSync,
  MdOutlineCategory,
  MdOutlineEvent,
  MdOutlineCalendarToday,
  MdOutlineSettings,
  MdOutlineWifiTethering,
  MdOutlineCalculate,
  MdOutlineWarning,
  MdOutlineShield,
  MdOutlineMoneyOff,
  MdOutlineVerified,
  MdOutlineHealthAndSafety,
  MdOutlineAccountBalance,
  MdOutlineReceiptLong,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
  MdOutlineCreditCard,
  MdOutlinePayments,
  MdOutlineAdd,
  MdOutlineCardGiftcard,
  MdOutlineAddCircle,
  MdOutlineGroup,
  MdOutlineSecurity,
  MdOutlineInsertChart,
  MdOutlineGamepad,
  MdOutlineAddBox,
  MdOutlineTune,
  MdOutlinePerson,
  MdAutoGraph,
  MdOutlineGroups3,
} as const;

export function NavGroup({ title, items }: NavGroup) {
  const { state } = useSidebar();

  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          if (!item.items)
            return <SidebarMenuLink key={key} item={item} href={pathname} />;

          if (state === "collapsed")
            return (
              <SidebarMenuCollapsedDropdown
                key={key}
                item={item}
                href={pathname}
              />
            );

          return (
            <SidebarMenuCollapsible key={key} item={item} href={pathname} />
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const NavBadge = ({ children }: { children: ReactNode }) => (
  <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>
);

const SidebarMenuLink = ({ item, href }: { item: NavLink; href: string }) => {
  const { setOpenMobile } = useSidebar();
  const ItemIcon = item.icon ? Icon[item.icon] : null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(href, item)}
        tooltip={item.title}
      >
        <Link href={item.url} onClick={() => setOpenMobile(false)}>
          {ItemIcon && <ItemIcon />}
          <span>{item.title}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SidebarMenuCollapsible = ({
  item,
  href,
}: {
  item: NavCollapsible;
  href: string;
}) => {
  const { setOpenMobile } = useSidebar();
  const ItemIcon = item.icon ? Icon[item.icon] : null;

  return (
    <Collapsible
      asChild
      defaultOpen={checkIsActive(href, item, true)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {ItemIcon && <ItemIcon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items.map((subItem) => {
              const SubItemIcon = subItem.icon ? Icon[subItem.icon] : null;
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={checkIsActive(href, subItem)}
                  >
                    <Link
                      href={subItem.url}
                      onClick={() => setOpenMobile(false)}
                    >
                      {SubItemIcon && <SubItemIcon />}
                      <span>{subItem.title}</span>
                      {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const SidebarMenuCollapsedDropdown = ({
  item,
  href,
}: {
  item: NavCollapsible;
  href: string;
}) => {
  const ItemIcon = item.icon ? Icon[item.icon] : null;

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={checkIsActive(href, item)}
          >
            {ItemIcon && <ItemIcon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>
            {item.title} {item.badge ? `(${item.badge})` : ""}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((sub) => {
            const SubItemIcon = sub.icon ? Icon[sub.icon] : null;
            return (
              <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
                <Link
                  href={sub.url}
                  className={`${checkIsActive(href, sub) ? "bg-secondary" : ""}`}
                >
                  {SubItemIcon && <SubItemIcon />}
                  <span className="max-w-52 text-wrap">{sub.title}</span>
                  {sub.badge && (
                    <span className="ml-auto text-xs">{sub.badge}</span>
                  )}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url || // /endpint?search=param
    href.split("?")[0] === item.url || // endpoint
    !!item?.items?.filter((i) => i.url === href).length || // if child nav is active
    (mainNav &&
      href.split("/")[1] !== "" &&
      // @ts-expect-error href is a string
      href.split("/")[1] === item?.url?.split("/")[1])
  );
}
