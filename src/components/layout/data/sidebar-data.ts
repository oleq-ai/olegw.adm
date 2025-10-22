import { NavGroup } from "../types";

export const sidebarNavGroups: NavGroup[] = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: "MdOutlineDashboard",
        permissions: ["dashboard:view"],
      },
    ],
  },
  {
    title: "Analytics & Reports",
    items: [
      {
        title: "Reports",
        url: "/reports",
        icon: "MdOutlineInsertChart",
        permissions: ["reports:view"],
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        url: "/users",
        icon: "MdOutlineGroup",
        permissions: ["users:view"],
      },
      {
        title: "Roles",
        url: "/roles",
        icon: "MdOutlineSecurity",
        permissions: ["roles:view"],
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "General Settings",
        url: "/settings",
        icon: "MdOutlineSettings",
        permissions: ["settings:view"],
      },
    ],
  },
];
