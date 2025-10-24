import "server-only";

import { Fetcher } from "../api/api.service";
import { DashboardResponse } from "./types/dashboard.types";

export class DashboardService {
  constructor(private fetcher = new Fetcher()) {}

  async getPaymentDashboard(
    startDate: string,
    endDate: string,
    recentLimit: number = 15
  ): Promise<DashboardResponse> {
    const res = await this.fetcher.request<DashboardResponse>("/", {
      data: {
        operation: "getpaymentdashboard",
        startdate: startDate,
        enddate: endDate,
        recentlimit: recentLimit.toString(),
      },
    });

    return res;
  }
}
