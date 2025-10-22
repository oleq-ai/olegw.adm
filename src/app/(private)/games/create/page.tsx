import { Metadata } from "next";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { getPermissions } from "@/lib/permissions/permissions";
import { getSession } from "@/lib/session/session";

import CreateGameForm from "./create-game-form";

export const metadata: Metadata = {
  title: "Create Game",
};

export default async function CreateGamePage() {
  const session = await getSession();
  const { hasPermission } = getPermissions(session);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <BreadcrumbNav
          title="New Game"
          items={[{ title: "Games", href: "/games" }]}
        />
      </div>

      <PermissionGate session={session} permissions={["games:add"]}>
        <CreateGameForm canUpdate={hasPermission("games:add")} />
      </PermissionGate>
    </div>
  );
}
