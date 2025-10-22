import { Permission } from "@/data/modules";
import { ADMIN_ROLES } from "@/lib/roles/dto/roles.dto";

export function isSuperAdmin({
  role,
  permissions,
}: {
  role?: string;
  permissions?: Permission[];
}): boolean {
  return (
    (role && ADMIN_ROLES.includes(role.toLowerCase())) ||
    permissions?.includes("*") ||
    false
  );
}

export function hasPermission(
  userPermissions: Permission[],
  requiredPermission: Permission,
  role?: string
): boolean {
  if (
    (role && ADMIN_ROLES.includes(role.toLowerCase())) ||
    userPermissions.includes("*")
  )
    return true;
  return userPermissions.includes(requiredPermission);
}

export function hasAnyPermission(
  userPermissions: Permission[],
  requiredPermissions: Permission[],
  role?: string
): boolean {
  if (
    (role && ADMIN_ROLES.includes(role.toLowerCase())) ||
    userPermissions.includes("*")
  )
    return true;
  return requiredPermissions.some((permission) =>
    hasPermission(userPermissions, permission)
  );
}

export function hasAllPermissions(
  userPermissions: Permission[],
  requiredPermissions: Permission[],
  role?: string
): boolean {
  if (
    (role && ADMIN_ROLES.includes(role.toLowerCase())) ||
    userPermissions.includes("*")
  )
    return true;
  return requiredPermissions.every((permission) =>
    hasPermission(userPermissions, permission)
  );
}
