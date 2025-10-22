"use server";

import { getErrorMessage } from "../get-error-message";
import { Response } from "../shared/types";
import { PullPaymentQuery, SummaryQuery } from "./dto/reports.dto";
import { ReportService } from "./reports.service";
import { DashboardSummary } from "./types/reports.types";

const reportService = new ReportService();

export async function getPaymentInAction(query: PullPaymentQuery) {
  try {
    const data = await reportService.pullPaymentsIn(query);
    return { success: true as const, data };
  } catch (error) {
    return { success: false as const, error: getErrorMessage(error) };
  }
}

export async function getPaymentOutAction(query: PullPaymentQuery) {
  try {
    const data = await reportService.pullPaymentsOut(query);
    return { success: true as const, data };
  } catch (error) {
    return { success: false as const, error: getErrorMessage(error) };
  }
}

export async function retryWithdrawalAction(transactionRef: string) {
  try {
    await reportService.retryWithdrawal(transactionRef);
    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: getErrorMessage(error) };
  }
}

export async function getSummaryAction(
  query: SummaryQuery
): Promise<Response<DashboardSummary>> {
  try {
    const data = await reportService.getSummary(query);

    return { success: true, data };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
