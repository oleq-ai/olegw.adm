import { Metadata } from "next";
import Link from "next/link";

import { Wallet } from "lucide-react";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { getPermissions } from "@/lib/permissions/permissions";
import { getSession } from "@/lib/session/session";

import WithdrawalsTable from "./withdrawals-table";

export const metadata: Metadata = {
  title: "Withdrawals",
};

export default async function WithdrawalsPage() {
  const session = await getSession();

  const { hasPermission } = getPermissions(session);

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <BreadcrumbNav title="Deposits" />

        <PermissionGate
          session={session}
          permissions={["transactions:deposits"]}
        >
          <div className="flex items-center justify-end gap-2">
            <Button asChild>
              <Link href="/transactions/deposits">
                <Wallet className="size-4" />
                Deposits
              </Link>
            </Button>
          </div>
        </PermissionGate>
      </div>

      <div className="flex flex-1 rounded-lg border border-dashed p-2 shadow-sm md:p-8">
        <div className="w-full space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">
            Withdrawal History
          </h3>

          <PermissionGate
            session={session}
            permissions={["transactions:withdrawals"]}
          >
            <WithdrawalsTable
              canRetryPayment={hasPermission("transactions:retry")}
            />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
