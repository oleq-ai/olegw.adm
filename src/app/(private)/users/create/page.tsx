import { Metadata } from "next";

import { Plus, User } from "lucide-react";

import PermissionGate from "@/components/permissions/permission-gate";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="mx-auto max-w-5xl space-y-8 p-6">
        {/* Modern Header */}
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Create New User
                  </h1>
                  <p className="mt-1 text-gray-600">
                    Add a new user to your platform with proper permissions and
                    access control
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Plus className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <PermissionGate session={session} permissions={["users:manage"]}>
          <CreateUserForm canUpdate={hasPermission("users:manage")} />
        </PermissionGate>
      </div>
    </div>
  );
}
