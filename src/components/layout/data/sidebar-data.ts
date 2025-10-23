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
    title: "Merchant Management",
    items: [
      {
        title: "Accounts",
        url: "/accounts",
        icon: "MdOutlineAccountBalance",
      },
      {
        title: "Payments",
        url: "/payments",
        icon: "MdOutlinePayments",
        permissions: ["payments:view"],
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
    title: "User Management",
    items: [
      {
        title: "Users",
        url: "/users",
        icon: "MdOutlineBusiness",
        permissions: ["users:view"],
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
