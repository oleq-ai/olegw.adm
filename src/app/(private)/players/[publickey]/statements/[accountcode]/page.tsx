import { Metadata } from "next";

import PermissionGate from "@/components/permissions/permission-gate";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import { accountType } from "@/lib/accounts/constants/constants.type";
import { getSession } from "@/lib/session/session";

import StatementTable from "./statement-table";

export const metadata: Metadata = {
  title: "Statement",
};

// Generate static params for export mode
export async function generateStaticParams() {
  // Return empty array for dynamic routes in export mode
  // The actual pages will be generated at runtime
  return [];
}

type Props = {
  params: Promise<{ accountcode: string; publickey: string }>;
};

export default async function StatementPage({ params }: Props) {
  const session = await getSession();
  const { accountcode, publickey } = await params;

  const type =
    accountType[accountcode.substring(0, 2) as keyof typeof accountType] ??
    "Unknown";

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <BreadcrumbNav
          title="Statement"
          items={[
            { title: "All Players", href: "/players" },
            { title: "Player", href: `/players/${publickey}` },
          ]}
        />
      </div>

      <div className="flex flex-1 rounded-lg border border-dashed p-2 shadow-sm md:p-8">
        <div className="w-full space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">
            {type} Statement
          </h3>

          <PermissionGate session={session} permissions={["players:view"]}>
            <StatementTable accountcode={accountcode} />
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}
