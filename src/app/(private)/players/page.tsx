import { Metadata } from "next";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { getSession } from "@/lib/session/session";

import PlayersTable from "./players-table";

export const metadata: Metadata = {
  title: "Players",
};

export default async function PlayersPage() {
  const session = await getSession();

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <BreadcrumbNav title="Players" />
      </div>

      <div className="flex flex-1 rounded-lg border border-dashed p-2 shadow-sm md:p-8">
        <div className="w-full space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">Players</h3>

          <PermissionGate session={session} permissions={["players:view"]}>
            <PlayersTable />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
