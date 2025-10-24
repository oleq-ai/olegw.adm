import { Edit, User } from "lucide-react";

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
                  <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                  <p className="mt-1 text-gray-600">
                    User details and settings
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Edit className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <BreadcrumbNav
          title={name}
          items={[{ title: "Users", href: "/users" }]}
        />

        {/* Form Content */}
        <PermissionGate session={session} permissions={["users:manage"]}>
          <CreateUserForm
            initialValues={defaultValues}
            canUpdate={hasPermission("users:manage")}
          />
        </PermissionGate>
      </div>
    </div>
  );
}
