import { useQuery } from "@tanstack/react-query";

import { getLeaderboardAction } from "@/lib/accounts/leaderboard/leaderboard.actions";
import { LeaderboardParams } from "@/lib/accounts/leaderboard/leaderboard.types";
import { TAGS } from "@/lib/shared/constants";

export const useLeaderboard = (params: LeaderboardParams) => {
  return useQuery({
    queryKey: [TAGS.LEADERBOARD, params],
    queryFn: async () => {
      const res = await getLeaderboardAction(params);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });
};
