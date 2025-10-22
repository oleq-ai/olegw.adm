import { ReactNode } from "react";

import { Permission } from "@/data/modules";
import { getPermissions } from "@/lib/permissions/permissions";
import { Session } from "@/lib/session/session.types";

type Props = {
  session?: Session | null;
  children: ReactNode;
  permissions: Permission[];
  superAdmin?: boolean;
  fallback?: ReactNode;
  requireAll?: boolean;
};

export default function PermissionGate({
  children,
  permissions,
  superAdmin = false,
  fallback = null,
  requireAll = false,
  session,
}: Props) {
  const { hasAnyPermission, hasAllPermissions, isSuperAdmin } =
    getPermissions(session);

  if (superAdmin) return isSuperAdmin() ? children : fallback;

  if (!permissions.length) return children;

  const hasAccess = requireAll
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions);

  return hasAccess ? children : fallback;
}
