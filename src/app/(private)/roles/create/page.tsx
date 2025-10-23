import { Metadata } from "next";

import PermissionGate from "@/components/permissions/permission-gate";
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="mb-1 text-2xl font-bold text-gray-900">
              Create New Role
            </h1>
            <p className="text-gray-600">
              Define a new role with specific permissions
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <PermissionGate session={session} permissions={["roles:manage"]}>
            <CreateRoleForm canUpdate={hasPermission("roles:manage")} />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
