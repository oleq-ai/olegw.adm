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
        title: "Merchants",
        url: "/merchants",
        icon: "MdOutlineStore",
        permissions: ["users:view"],
      },
      {
        title: "Accounts",
        url: "/accounts",
        icon: "MdOutlineAccountBalance",
      },
      {
        title: "Transactions",
        url: "/transactions",
        icon: "MdOutlinePayments",
        permissions: ["transactions:view"],
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
        permissions: ["dashboard:view"],
      },
    ],
  },
];
