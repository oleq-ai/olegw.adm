import { Suspense } from "react";

import PermissionGate from "@/components/permissions/permission-gate";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/lib/session/session";

import LeaderboardTable from "./leaderboard-tale";

export default async function LeaderboardPage() {
  const session = await getSession();
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">
          Track top performers across different categories
        </p>
      </div>

      <PermissionGate session={session} permissions={["leaderboard:view"]}>
        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-[400px] w-full" />
            </div>
          }
        >
          <LeaderboardTable />
        </Suspense>
      </PermissionGate>
    </div>
  );
}
