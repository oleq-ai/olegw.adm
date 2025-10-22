import { Metadata } from "next";
import Link from "next/link";

import { PlusIcon } from "lucide-react";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session/session";

import RolesTable from "./roles-table";

export const metadata: Metadata = {
  title: "Roles",
};

export default async function RolesPage() {
  const session = await getSession();

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <BreadcrumbNav title="Roles" />

        <div className="flex justify-end">
          <PermissionGate session={session} permissions={["roles:manage"]}>
            <Button asChild>
              <Link href="/roles/create">
                <PlusIcon className="size-4" />
                Add Role
              </Link>
            </Button>
          </PermissionGate>
        </div>
      </div>

      <PermissionGate session={session} permissions={["roles:view"]}>
        <RolesTable />
      </PermissionGate>
    </div>
  );
}
