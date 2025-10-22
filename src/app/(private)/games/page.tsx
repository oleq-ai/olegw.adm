import { Metadata } from "next";
import Link from "next/link";

import { PlusIcon } from "lucide-react";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session/session";

import GamesTable from "./games-table";

export const metadata: Metadata = {
  title: "Games",
};

export default async function GamesPage() {
  const session = await getSession();

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <BreadcrumbNav title="Games" />

        <div className="flex justify-end">
          <PermissionGate session={session} permissions={["games:add"]}>
            <Button asChild>
              <Link href="/games/create">
                <PlusIcon className="size-4" />
                New Game
              </Link>
            </Button>
          </PermissionGate>
        </div>
      </div>

      <PermissionGate session={session} permissions={["games:view"]}>
        <GamesTable />
      </PermissionGate>
    </div>
  );
}
