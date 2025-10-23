import { Metadata } from "next";

import PermissionGate from "@/components/permissions/permission-gate";
import { getPermissions } from "@/lib/permissions/permissions";
import { getSession } from "@/lib/session/session";

import CreateUserForm from "./create-user-form";

export const metadata: Metadata = {
  title: "Create Merchant",
};

export default async function CreateUserPage() {
  const session = await getSession();
  const { hasPermission } = getPermissions(session);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="mb-1 text-2xl font-bold text-gray-900">
              Create New Merchant
            </h1>
            <p className="text-gray-600">Add a new merchant to your platform</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <PermissionGate session={session} permissions={["users:manage"]}>
            <CreateUserForm canUpdate={hasPermission("users:manage")} />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
