import { IconType } from "react-icons";
import {
  MdOutlineMilitaryTech,
  MdOutlineShield,
  MdOutlineStars,
  MdOutlineWorkspacePremium,
} from "react-icons/md";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DashboardSummary } from "@/lib/reports/types/reports.types";
import { cn, formatAmount, formatNumber } from "@/lib/utils";

type TierType = DashboardSummary["tiers"][number];

type TierData = TierType & {
  icon: IconType;
  color: string;
  bgColor: string;
  progressColor: string;
  order: number;
};

const tierConfig: Record<
  TierType["tier"],
  {
    icon: IconType;
    color: string;
    bgColor: string;
    progressColor: string;
    order: number;
  }
> = {
  Platinum: {
    icon: MdOutlineWorkspacePremium,
    color: "text-slate-300",
    bgColor: "bg-slate-300/10",
    progressColor: "*:bg-slate-300",
    order: 1,
  },
  Gold: {
    icon: MdOutlineStars,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    progressColor: "*:bg-amber-400",
    order: 2,
  },
  Silver: {
    icon: MdOutlineMilitaryTech,
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    progressColor: "*:bg-gray-400",
    order: 3,
  },
  Bronze: {
    icon: MdOutlineShield,
    color: "text-amber-700",
    bgColor: "bg-amber-700/10",
    progressColor: "*:bg-amber-700",
    order: 4,
  },
};

type Props = {
  data: DashboardSummary["tiers"];
};

export default function TierDistributionChart({ data }: Props) {
  const totalUsers = data.reduce((acc, tier) => {
    const users = Number(tier.users);
    return acc + (isNaN(users) ? 0 : users);
  }, 0);

  const tiers: TierData[] = data
    .map((tier) => {
      const tierName = tier.tier;

      const config = tierConfig[tierName] || {
        icon: MdOutlineWorkspacePremium,
        color: "text-slate-300",
        bgColor: "bg-slate-300/10",
      };

      return {
        ...tier,
        ...config,
      };
    })
    .sort((a, b) => a.order - b.order);

  return (
    <Card>
      <CardHeader className="">
        <CardTitle className="">Customer Segmentation</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {tiers.map((tier) => {
            const percentage =
              totalUsers > 0 ? (tier.users / totalUsers) * 100 : 0;

            return (
              <div key={tier.tier} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("rounded-full p-1", tier.bgColor)}>
                      <tier.icon className={cn("h-4 w-4", tier.color)} />
                    </div>
                    <span className="text-sm font-medium">{tier.tier}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">
                      {formatNumber(tier.users)} users
                    </span>
                    <span className="text-xs font-semibold">
                      {formatNumber(percentage)}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={percentage}
                  className={cn("h-2 bg-secondary", tier.progressColor)}
                />

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-muted-foreground">
                  <div>Total Bets: {formatNumber(tier.totalBets)}</div>
                  <div className="text-right">
                    Avg Bet: {formatAmount(tier.averageBet)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
