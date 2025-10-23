import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import ErrorAlert from "@/components/ui/error-alert";
import { getPermissions } from "@/lib/permissions/permissions";
import { getSession } from "@/lib/session/session";
import { PartialUserDto } from "@/lib/users/dto/user.dto";
import { getUserActions } from "@/lib/users/user.actions";

import CreateUserForm from "../create/create-user-form";

// Generate static params for export mode
export async function generateStaticParams() {
  // Return empty array for dynamic routes in export mode
  // The actual pages will be generated at runtime
  return [];
}

type Props = {
  params: Promise<{ ukey: string }>;
};

export default async function UserDetailsPage({ params }: Props) {
  const { ukey } = await params;
  const session = await getSession();
  const { hasPermission } = getPermissions(session);

  const res = await getUserActions(ukey);

  if (!res.success)
    return (
      <ErrorAlert
        message="Oops! Something went wrong"
        title="User Details"
        items={[{ title: "Users", href: "/users" }]}
      />
    );

  const { Firstname, Middlename, Lastname, ...rest } = res.data;

  const defaultValues: PartialUserDto = {
    firstname: Firstname,
    middlename: Middlename,
    lastname: Lastname,
    email: rest.Email,
    mobile: rest.Mobile,
    gender: rest.Gender,
    roleid: rest.RoleID,
    modules: rest.modules,
    userkey: rest.UKey,
    username: rest.Username,
    // Password fields are intentionally omitted for updates
  };

  const name = `${Firstname} ${Middlename ?? ""} ${Lastname}`.trim();

  return (
    <div className="space-y-4">
      <BreadcrumbNav
        title={name}
        items={[{ title: "Users", href: "/users" }]}
      />

      <div className="space-y-8 rounded-lg border border-dashed p-2 shadow-sm md:p-8">
        <div className="w-full space-y-6">
          <PermissionGate session={session} permissions={["users:manage"]}>
            <CreateUserForm
              initialValues={defaultValues}
              canUpdate={hasPermission("users:manage")}
            />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
