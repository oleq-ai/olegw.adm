import { Metadata } from "next";
import Link from "next/link";

import { Plus, Settings, Shield, Users } from "lucide-react";

import PermissionGate from "@/components/permissions/permission-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/session/session";
import { getUsersActions } from "@/lib/users/user.actions";

import UsersTable from "./users-table";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const session = await getSession();

  // Fetch users data for stats
  const usersResult = await getUsersActions({ page: 1, pageSize: 1000 });
  const users = usersResult.success ? usersResult.data?.data || [] : [];

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.Active === "True").length;
  const inactiveUsers = users.filter((user) => user.Active === "False").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Clean Header */}
        <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Users</h1>
              </div>
            </div>
            <PermissionGate session={session} permissions={["users:manage"]}>
              <Button asChild>
                <Link href="/users/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create User
                </Link>
              </Button>
            </PermissionGate>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-sm font-medium text-blue-600">
                  Total Users
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {totalUsers}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-sm font-medium text-blue-600">
                  Active Users
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {activeUsers}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Settings className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-sm font-medium text-blue-600">
                  Inactive Users
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {inactiveUsers}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <PermissionGate session={session} permissions={["users:view"]}>
            <UsersTable />
          </PermissionGate>
        </Card>
      </div>
    </div>
  );
}
