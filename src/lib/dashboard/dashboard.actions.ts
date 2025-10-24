"use server";

import { getErrorMessage } from "../get-error-message";
import { Response } from "../shared/types";
import { DashboardService } from "./dashboard.service";
import { DashboardData } from "./types/dashboard.types";

const dashboardService = new DashboardService();

export async function getPaymentDashboardAction(
  startDate: string,
  endDate: string,
  recentLimit: number = 15
): Promise<Response<DashboardData>> {
  try {
    const res = await dashboardService.getPaymentDashboard(
      startDate,
      endDate,
      recentLimit
    );
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
