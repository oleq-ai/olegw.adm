import { Metadata } from "next";
import Link from "next/link";

import { Plus, Settings, Shield, Users } from "lucide-react";

import PermissionGate from "@/components/permissions/permission-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { moduleItems } from "@/data/modules";
import { getRolesAction } from "@/lib/roles/role.actions";
import { getSession } from "@/lib/session/session";

import RolesTable from "./roles-table";

export const metadata: Metadata = {
  title: "Roles",
};

export default async function RolesPage() {
  const session = await getSession();

  // Fetch roles data for stats
  const rolesResult = await getRolesAction({ page: 1, pageSize: 1000 });
  const roles = rolesResult.success ? rolesResult.data?.data || [] : [];

  // Calculate stats
  const totalRoles = roles.length;
  const totalPermissions = moduleItems.reduce(
    (count, module) => count + (module.children?.length || 0),
    0
  );
  const totalModules = moduleItems.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Modern Header */}
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Role Management
                  </h1>
                  <p className="mt-1 text-gray-600">
                    Manage user roles and system permissions
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PermissionGate
                  session={session}
                  permissions={["roles:manage"]}
                >
                  <Button
                    asChild
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  >
                    <Link href="/roles/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Role
                    </Link>
                  </Button>
                </PermissionGate>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="group relative overflow-hidden rounded-xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Roles
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {totalRoles}
                </div>
                <div className="text-sm text-gray-500">Active roles</div>
              </CardContent>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Permissions
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {totalPermissions}
                </div>
                <div className="text-sm text-gray-500">
                  Available permissions
                </div>
              </CardContent>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <Settings className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Modules
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {totalModules}
                </div>
                <div className="text-sm text-gray-500">System modules</div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Enhanced Table */}
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-slate-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <PermissionGate session={session} permissions={["roles:view"]}>
              <RolesTable />
            </PermissionGate>
          </div>
        </div>
      </div>
    </div>
  );
}
