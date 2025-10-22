import { LucideIcon, WalletIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount, formatNumber } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
};

function StatCard({ title, value, subValue, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subValue && (
          <div className="text-sm text-muted-foreground">{subValue}</div>
        )}
      </CardContent>
    </Card>
  );
}

type Props = {
  totaldeposits: string;
  totalwithdrawals: string;
  bets: string;
  bettotal: string;
  betwinnings: string;
  totalbalance: string;
};

export default function PlayerOverview({
  totaldeposits,
  totalwithdrawals,
  bets,
  bettotal,
  betwinnings,
  totalbalance,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Deposits"
        value={formatAmount(totaldeposits)}
        subValue={`Total Withdrawals: ${formatNumber(totalwithdrawals)}`}
        icon={WalletIcon}
      />
      <StatCard
        title="Bets Placed"
        value={`${formatNumber(bets)}`}
        subValue={`Won: ${formatNumber(bets)}`}
        icon={WalletIcon}
      />
      <StatCard
        title="Bet Amount"
        value={formatAmount(bettotal)}
        subValue={`Winnings: ${formatAmount(betwinnings)}`}
        icon={WalletIcon}
      />
      <StatCard
        title="Total Balance"
        value={formatAmount(totalbalance)}
        icon={WalletIcon}
      />
    </div>
  );
}
