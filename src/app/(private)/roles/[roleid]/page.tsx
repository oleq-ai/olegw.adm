import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { getPermissions } from "@/lib/permissions/permissions";
import { getRoleAction } from "@/lib/roles/role.actions";
import { getSession } from "@/lib/session/session";

import ErrorAlert from "../../../../components/ui/error-alert";
import CreateRoleForm from "../create/create-role-form";

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
    <div className="space-y-4">
      <BreadcrumbNav
        title={rolename}
        items={[{ title: "Roles", href: "/roles" }]}
      />

      <div className="space-y-8 rounded-lg border border-dashed p-2 shadow-sm md:p-8">
        <div className="w-full space-y-6">
          <PermissionGate session={session} permissions={["roles:manage"]}>
            <CreateRoleForm
              defaultValues={{ modules, rolename, description, roleid }}
              isUpdate
              canUpdate={hasPermission("roles:manage")}
            />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
