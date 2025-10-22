export interface LeaderboardEntry {
  username: string;
  bet: string;
  won: string;
}

export interface LeaderboardResponse {
  status: number;
  message: string;
  data: LeaderboardEntry[];
  totalrows: number;
}

export type LeaderboardType = "topcashout" | "topdeposits";

export interface LeaderboardParams {
  type: LeaderboardType;
  startdate?: string;
  enddate?: string;
}
