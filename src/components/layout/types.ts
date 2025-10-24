import { LinkProps } from "next/link";

import { Permission } from "@/data/modules";

type NavIcon =
  | "MdOutlineDashboard"
  | "MdOutlineAttachMoney"
  | "MdOutlineListAlt"
  | "MdOutlineSync"
  | "MdOutlineCategory"
  | "MdOutlineEvent"
  | "MdOutlineCalendarToday"
  | "MdOutlineSettings"
  | "MdOutlineWifiTethering"
  | "MdOutlineCalculate"
  | "MdOutlineWarning"
  | "MdOutlineShield"
  | "MdOutlineMoneyOff"
  | "MdOutlineVerified"
  | "MdOutlineHealthAndSafety"
  | "MdOutlineAccountBalance"
  | "MdOutlineReceiptLong"
  | "MdOutlineArrowDownward"
  | "MdOutlineArrowUpward"
  | "MdOutlineCreditCard"
  | "MdOutlinePayments"
  | "MdOutlineAdd"
  | "MdOutlineCardGiftcard"
  | "MdOutlineAddCircle"
  | "MdOutlineGroup"
  | "MdOutlineSecurity"
  | "MdOutlineInsertChart"
  | "MdOutlineBarChart"
  | "MdOutlineGamepad"
  | "MdOutlineAddBox"
  | "MdOutlineTune"
  | "MdOutlinePerson"
  | "MdAutoGraph"
  | "MdOutlineGroups3"
  | "MdOutlineBusiness"
  | "MdOutlineStore";

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: NavIcon;
  permissions?: Permission[];
}

type NavLink = BaseNavItem & {
  url: LinkProps["href"];
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps["href"] })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
  title: string;
  items: NavItem[];
  permissions?: Permission[];
}

export type { NavCollapsible, NavGroup, NavIcon, NavItem, NavLink };
