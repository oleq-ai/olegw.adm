import { Permission } from "@/data/modules";

import { NavGroup, NavItem } from "../types";

function filterNavItemsByPermissions(
  items: NavItem[],
  checkPermissions: (permissions: Permission[]) => boolean
): NavItem[] {
  // @ts-expect-error items may not be defined
  return items
    ?.filter((item) => {
      // Allow if permission is "*"
      if (item.permissions && item.permissions.includes("*")) return true;

      // Check main item permissions
      if (item.permissions && !checkPermissions(item.permissions)) return false;

      // If it has subitems, check if at least one subitem is accessible
      if (item.items) {
        const accessibleSubitems = item.items.filter(
          (item) =>
            !item.permissions ||
            item.permissions.includes("*") ||
            checkPermissions(item.permissions)
        );
        return accessibleSubitems.length > 0;
      }

      return true;
    })
    .map((item) => ({
      ...item,
      // Filter subitems if they exist
      items: item.items?.filter(
        (item) =>
          !item.permissions ||
          item.permissions.includes("*") ||
          checkPermissions(item.permissions)
      ),
    }));
}

export default function filterNavGroups(
  navGroups: NavGroup[],
  checkPermissions: (permissions: Permission[]) => boolean
): NavGroup[] {
  return navGroups
    .map((group) => ({
      ...group,
      items: filterNavItemsByPermissions(group.items, checkPermissions),
    }))
    .filter((group) => group.items.length > 0);
}
