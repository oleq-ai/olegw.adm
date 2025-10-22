"use server";

import { getErrorMessage } from "@/lib/get-error-message";
import { Response } from "@/lib/shared/types";

import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardParams, LeaderboardResponse } from "./leaderboard.types";

const leaderboardService = new LeaderboardService();

export async function getLeaderboardAction(
  params: LeaderboardParams
): Promise<Response<LeaderboardResponse>> {
  try {
    const leaderboard = await leaderboardService.getLeaderboard(params);
    return { success: true, data: leaderboard };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
