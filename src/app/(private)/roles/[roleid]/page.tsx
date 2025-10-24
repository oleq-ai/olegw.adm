import { Edit, Shield } from "lucide-react";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { getPermissions } from "@/lib/permissions/permissions";
import { getRoleAction } from "@/lib/roles/role.actions";
import { getSession } from "@/lib/session/session";

import ErrorAlert from "../../../../components/ui/error-alert";
import CreateRoleForm from "../create/create-role-form";

// Generate static params for export mode
export async function generateStaticParams() {
  // Return empty array for dynamic routes in export mode
  // The actual pages will be generated at runtime
  return [];
}

type Props = {
  params: Promise<{ roleid: string }>;
};

export default async function RolePage({ params }: Props) {
  const { roleid } = await params;
  const session = await getSession();
  const { hasPermission } = getPermissions(session);

  const res = await getRoleAction(roleid);

  if (!res.success)
    return (
      <ErrorAlert
        message="Oops! Something went wrong"
        title="Role Details"
        items={[{ title: "Roles", href: "/roles" }]}
      />
    );

  const { modules, rolename, description } = res.data;

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
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {rolename}
                  </h1>
                  <p className="mt-1 text-gray-600">{description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Edit className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <BreadcrumbNav
          title={rolename}
          items={[{ title: "Roles", href: "/roles" }]}
        />

        {/* Form Content */}
        <PermissionGate session={session} permissions={["roles:manage"]}>
          <CreateRoleForm
            defaultValues={{ modules, rolename, description, roleid }}
            isUpdate
            canUpdate={hasPermission("roles:manage")}
          />
        </PermissionGate>
      </div>
    </div>
  );
}
