import { Fetcher } from "@/lib/api/api.service";

import { LeaderboardParams, LeaderboardResponse } from "./leaderboard.types";

export class LeaderboardService {
  constructor(private fetcher = new Fetcher()) {}

  async getLeaderboard({
    type,
    startdate,
    enddate,
  }: LeaderboardParams): Promise<LeaderboardResponse> {
    const res = await this.fetcher.request<LeaderboardResponse>("/", {
      data: {
        operation: "getbleaderboard",
        type,
        ...(startdate && { startdate }),
        ...(enddate && { enddate }),
      },
    });

    return res;
  }
}
