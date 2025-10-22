import { Permission } from "@/data/modules";

import {
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
  isSuperAdmin,
} from "../auth/utils/permission.utils";
import { getSession } from "../session/session";
import { Session } from "../session/session.types";

export function getPermissions(session?: Session | null) {
  let userRole: string | undefined;
  let userModules: Permission[] = [];

  if (session) {
    const { role, modules } = session;
    userRole = role;
    userModules = modules ?? [];
  }

  return {
    hasPermission: (permission: Permission) =>
      hasPermission(userModules, permission, userRole),
    hasAnyPermission: (permissions: Permission[]) =>
      hasAnyPermission(userModules, permissions, userRole),
    hasAllPermissions: (permissions: Permission[]) =>
      hasAllPermissions(userModules, permissions, userRole),
    isSuperAdmin: () =>
      isSuperAdmin({ role: userRole, permissions: userModules }),
    permissions: userModules,
    roleType: userRole,
  };
}

type Props = {
  role?: string;
  modules?: Permission[];
};

export async function getPermissionsAsync({ role, modules }: Props = {}) {
  let userRole = role ?? undefined;
  let userModules = modules ?? [];

  const session = await getSession();
  if (session) {
    const { role, modules } = session;
    userRole = role;
    userModules = modules ?? [];
  }

  return {
    hasPermission: (permission: Permission) =>
      hasPermission(userModules, permission, userRole),
    hasAnyPermission: (permissions: Permission[]) =>
      hasAnyPermission(userModules, permissions, userRole),
    hasAllPermissions: (permissions: Permission[]) =>
      hasAllPermissions(userModules, permissions, userRole),
    isSuperAdmin: () =>
      isSuperAdmin({ role: userRole, permissions: userModules }),
    permissions: userModules,
    roleType: userRole,
  };
}

export async function withPermission(permission: Permission): Promise<boolean> {
  const { hasPermission } = await getPermissionsAsync();
  return hasPermission(permission);
}

export async function withAnyPermission(
  permissions: Permission[]
): Promise<boolean> {
  const { hasAnyPermission } = await getPermissionsAsync();
  return hasAnyPermission(permissions);
}

export async function withAllPermissions(
  permissions: Permission[]
): Promise<boolean> {
  const { hasAllPermissions } = await getPermissionsAsync();
  return hasAllPermissions(permissions);
}

export async function withSuperAdminPermissions({
  role,
  permissions,
}: {
  role?: string;
  permissions?: Permission[];
}): Promise<boolean> {
  return isSuperAdmin({ role, permissions });
}
