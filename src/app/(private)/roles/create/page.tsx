import { Metadata } from "next";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { getPermissions } from "@/lib/permissions/permissions";
import { getSession } from "@/lib/session/session";

import CreateRoleForm from "./create-role-form";

export const metadata: Metadata = {
  title: "Create Role",
};

export default async function CreateRolePage() {
  const session = await getSession();
  const { hasPermission } = getPermissions(session);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <BreadcrumbNav
          title="New Role"
          items={[{ title: "Roles", href: "/roles" }]}
        />
      </div>

      <PermissionGate session={session} permissions={["roles:manage"]}>
        <CreateRoleForm canUpdate={hasPermission("roles:manage")} />
      </PermissionGate>
    </div>
  );
}
