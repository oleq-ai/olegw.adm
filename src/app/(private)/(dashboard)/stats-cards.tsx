import { ComponentProps } from "react";

import type { IconType } from "react-icons";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
  MdOutlineGroup,
  MdOutlineGroups,
  MdOutlineHowToReg,
  MdOutlineListAlt,
  MdOutlinePersonAdd,
  MdOutlineSportsEsports,
  MdOutlineTrendingUp,
} from "react-icons/md";

import PermissionGate from "@/components/permissions/permission-gate";
import { Card, CardContent } from "@/components/ui/card";
import { Permission } from "@/data/modules";
import { Session } from "@/lib/session/session.types";
import { cn, formatAmount, formatNumber } from "@/lib/utils";

type Props = {
  data: {
    deposits: number;
    withdrawals: number;
    clients: number;
    allclients: number;
    games: number;
    activeClients: number;
    avDeposits: number;
    avDepositsNewUsers: number;
    depositsCount: number;
  };
  session: Session | null;
};

type StatCardProps = {
  icon: IconType;
  label: string;
  value: string;
  valueDesc?: string;
  iconColor: ComponentProps<"svg">["className"];
  iconBgColor: ComponentProps<"div">["className"];
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  iconColor,
  iconBgColor,
  valueDesc,
}: StatCardProps) => (
  <Card>
    <CardContent className="flex items-center p-2 sm:p-4">
      <div className={cn("mr-2 rounded-full p-2 sm:mr-4 sm:p-3", iconBgColor)}>
        <Icon className={cn("h-4 w-4 sm:h-6 sm:w-6", iconColor)} />
      </div>
      <div className="">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="flex items-end gap-2">
          <p className="text-sm font-bold sm:text-xl">{value}</p>
          {valueDesc && <p className="font-mono text-sm">({valueDesc})</p>}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function StatsCards({ data, session }: Props) {
  const {
    deposits,
    withdrawals,
    clients,
    allclients,
    games,
    activeClients,
    avDeposits,
    avDepositsNewUsers,
    depositsCount,
  } = data;

  const cardConfigs: {
    permission: Permission[];
    icon: IconType;
    label: string;
    value: string;
    valueDesc?: string;
    iconColor: string;
    iconBgColor: string;
  }[] = [
    {
      permission: ["transactions:view"],
      icon: MdOutlineListAlt,
      label: "Deposit Count",
      value: formatNumber(depositsCount),
      iconColor: "text-red-500",
      iconBgColor: "bg-red-500/10",
    },
    {
      permission: ["transactions:view"],
      icon: MdOutlineAttachMoney,
      label: "Deposit Amount",
      value: formatAmount(deposits),
      iconColor: "text-green-500",
      iconBgColor: "bg-green-500/10",
    },
    {
      permission: ["transactions:view"],
      icon: MdOutlineTrendingUp,
      label: "Average Deposit",
      value: formatAmount(avDeposits),
      iconColor: "text-blue-500",
      iconBgColor: "bg-blue-500/10",
    },
    {
      permission: ["transactions:view"],
      icon: MdOutlinePersonAdd,
      label: "Average Deposit (New Users)",
      value: formatAmount(avDepositsNewUsers),
      iconColor: "text-indigo-500",
      iconBgColor: "bg-indigo-500/10",
      valueDesc: `${formatAmount((Number(avDepositsNewUsers) / Number(avDeposits)) * 100)}%`,
    },
    {
      permission: ["transactions:view"],
      icon: MdOutlineAccountBalanceWallet,
      label: "Withdrawal Amount",
      value: formatAmount(withdrawals),
      iconColor: "text-pink-500",
      iconBgColor: "bg-pink-500/10",
    },
    {
      permission: ["users:view"],
      icon: MdOutlineGroups,
      label: "All Time Users",
      value: formatNumber(allclients),
      iconColor: "text-yellow-500",
      iconBgColor: "bg-yellow-500/10",
    },
    {
      permission: ["users:view"],
      icon: MdOutlineGroup,
      label: "All Users",
      value: formatNumber(clients),
      iconColor: "text-purple-500",
      iconBgColor: "bg-purple-500/10",
      valueDesc: `${formatAmount((Number(clients) / Number(allclients)) * 100)}%`,
    },
    {
      permission: ["dashboard:view"],
      icon: MdOutlineHowToReg,
      label: "Active Users",
      value: formatNumber(activeClients),
      iconColor: "text-teal-500",
      iconBgColor: "bg-teal-500/10",
      valueDesc: `${formatAmount((Number(activeClients) / Number(clients)) * 100)}%`,
    },
    {
      permission: ["dashboard:view"],
      icon: MdOutlineSportsEsports,
      label: "Total Games",
      value: formatNumber(games),
      iconColor: "text-orange-500",
      iconBgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
      {cardConfigs.map(({ permission, ...rest }, index) => (
        <PermissionGate key={index} session={session} permissions={permission}>
          <StatCard {...rest} />
        </PermissionGate>
      ))}
    </div>
  );
}
