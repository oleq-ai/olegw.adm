import { Metadata } from "next";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { getPermissions } from "@/lib/permissions/permissions";
import { getSession } from "@/lib/session/session";

import PlayersDetails from "./players-details";

export const metadata: Metadata = {
  title: "Player Details",
};

// Generate static params for export mode
export async function generateStaticParams() {
  // Return empty array for dynamic routes in export mode
  // The actual pages will be generated at runtime
  return [];
}

type Props = {
  params: Promise<{ publickey: string }>;
};

export default async function PlayersPage({ params }: Props) {
  const { publickey } = await params;
  const session = await getSession();

  const { hasPermission } = getPermissions(session);

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <BreadcrumbNav
          title="Player Details"
          items={[{ href: "/players", title: "Players" }]}
        />
      </div>

      <div className="flex flex-1 rounded-lg border border-dashed p-2 shadow-sm md:p-8">
        <div className="w-full space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">Player Details</h3>

          <PermissionGate session={session} permissions={["players:view"]}>
            <PlayersDetails
              publickey={publickey}
              canAwardBonus={hasPermission("bonuses:manage")}
              canDeposit={hasPermission("payments:manage")}
              canConfig={hasPermission("players:config")}
              canViewTransactions={hasPermission("transactions:view")}
            />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
