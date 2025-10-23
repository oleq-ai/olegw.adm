import { Metadata } from "next";
import Link from "next/link";

import { PlusIcon } from "lucide-react";

import PermissionGate from "@/components/permissions/permission-gate";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session/session";

import UsersTable from "./users-table";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-gray-900">Users</h1>
              <p className="text-gray-600">Manage and monitor user accounts</p>
            </div>
            <div className="hidden md:block">
              <PermissionGate session={session} permissions={["users:manage"]}>
                <Button asChild>
                  <Link href="/users/create">
                    <PlusIcon className="size-4" />
                    Add User
                  </Link>
                </Button>
              </PermissionGate>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <PermissionGate session={session} permissions={["users:view"]}>
            <UsersTable />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
