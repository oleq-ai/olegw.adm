import { Metadata } from "next";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { getPermissions } from "@/lib/permissions/permissions";
import { getSession } from "@/lib/session/session";

import CreateUserForm from "./create-user-form";

export const metadata: Metadata = {
  title: "Create User",
};

export default async function CreateUserPage() {
  const session = await getSession();
  const { hasPermission } = getPermissions(session);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <BreadcrumbNav
          title="New User"
          items={[{ title: "Users", href: "/users" }]}
        />
      </div>

      <PermissionGate session={session} permissions={["users:manage"]}>
        <CreateUserForm canUpdate={hasPermission("users:manage")} />
      </PermissionGate>
    </div>
  );
}
