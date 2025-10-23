import { Metadata } from "next";
import Link from "next/link";

import { PlusIcon, Users } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      User Management
                    </h1>
                    <p className="text-gray-600">
                      Manage user accounts, permissions, and access control
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <PermissionGate
                  session={session}
                  permissions={["users:manage"]}
                >
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Link href="/users/create">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add User
                    </Link>
                  </Button>
                </PermissionGate>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="from-blue-500/3 via-purple-500/3 to-indigo-500/3 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <PermissionGate session={session} permissions={["users:view"]}>
              <UsersTable />
            </PermissionGate>
          </div>
        </div>
      </div>
    </div>
  );
}
