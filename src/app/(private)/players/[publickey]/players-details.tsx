"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, PhoneIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPlayerDetailActions } from "@/lib/players/players.actions";
import { TAGS } from "@/lib/shared/constants";

import Accounts from "./accounts";
import BettingHistory from "./betting-history";
import DepositDialogue from "./deposit-dialogue";
import IssueBonusDialogue from "./issue-bonus-dialogue";
import PlayerOverview from "./overview";
import PlayerDetailsError from "./player-details-error";
import PlayerDetailsSkeleton from "./player-details-skeleton";
import PlayerSettingsDialog from "./player-settings-dialogue";

type Props = {
  publickey: string;
  canAwardBonus: boolean;
  canDeposit: boolean;
  canConfig: boolean;
  canViewTransactions: boolean;
};

export default function PlayersDetails({
  publickey,
  canAwardBonus,
  canDeposit,
  canConfig,
  canViewTransactions,
}: Props) {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: [TAGS.PLAYERS, { publickey }],
    queryFn: async () => {
      const res = await getPlayerDetailActions(publickey);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  if (isLoading) return <PlayerDetailsSkeleton />;
  if (isError) return <PlayerDetailsError error={error.message} />;

  if (!data) return <PlayerDetailsError error="No player data found" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">{data.username}</h2>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <PhoneIcon className="h-4 w-4" />
            <span>{data.msisdn}</span>
            <span>•</span>
            <CalendarIcon className="h-4 w-4" />
            <span>Joined {format(new Date(data.createdon), "PPP")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {canConfig && (
            <PlayerSettingsDialog
              publickey={publickey}
              username={data.username}
              currentSettings={{
                withdrawal: true,
                deposit: true,
                play: true,
                login: true,
                testmodedisabled: false,
              }}
            />
          )}
          {data && canAwardBonus && (
            <IssueBonusDialogue
              username={data.username}
              privatekey={data.privatekey}
              publickey={publickey}
            />
          )}
          {data && canDeposit && (
            <DepositDialogue
              username={data.username}
              privatekey={data.privatekey}
              publickey={publickey}
            />
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="betting">Betting History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <PlayerOverview
            totaldeposits={data.totaldeposits}
            totalwithdrawals={data.totalwithdrawals}
            bets={data.bets}
            bettotal={data.bettotal}
            betwinnings={data.betwinnings}
            totalbalance={data.totalbalance.toString()}
          />
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Accounts
            accounts={data.accounts}
            publickey={publickey}
            canViewTransactions={canViewTransactions}
          />
        </TabsContent>

        <TabsContent value="betting" className="space-y-4">
          <BettingHistory
            bets={data.bets}
            bettotal={data.bettotal}
            won={data.won}
            betwinnings={data.betwinnings}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
