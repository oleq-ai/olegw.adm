import "server-only";

import { Fetcher } from "../api/api.service";
import { Meta } from "../shared/types";
import { PullPaymentQuery, SummaryQuery } from "./dto/reports.dto";
import {
  DashboardSummary,
  PullPaymentsIn,
  PullPaymentsOut,
} from "./types/reports.types";

export class ReportService {
  constructor(private fetcher = new Fetcher()) {}

  async pullPaymentsIn({ page = 1, pageSize = 10, ...rest }: PullPaymentQuery) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: PullPaymentsIn[];
      totalrows: number;
    }>("/", {
      data: {
        operation: "pullpaymentsin",
        page: page - 1,
        rows: pageSize,
        ...rest,
      },
    });

    const { data, totalrows } = res;

    const pageCount = Math.ceil(Number(totalrows) / Number(pageSize));

    const meta: Meta = {
      pageCount,
      currentPage: page,
      itemCount: totalrows,
      pageSize,
    };

    return { data, meta };
  }

  async pullPaymentsOut({
    page = 1,
    pageSize = 10,
    ...rest
  }: PullPaymentQuery) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: PullPaymentsOut[];
      totalrows: number;
    }>("/", {
      data: {
        operation: "pullpaymentsout",
        page: page - 1,
        rows: pageSize,
        ...rest,
      },
    });

    const { data, totalrows } = res;

    const pageCount = Math.ceil(Number(totalrows) / Number(pageSize));

    const meta: Meta = {
      pageCount,
      currentPage: page,
      itemCount: totalrows,
      pageSize,
    };

    return { data, meta };
  }

  async retryWithdrawal(transactionRef: string) {
    const res = await this.fetcher.request<{ status: number; message: string }>(
      "/",
      {
        data: {
          operation: "retrywithdrawal",
          transaction_reference: transactionRef,
        },
      }
    );

    return { res };
  }

  async getSummary(query: SummaryQuery) {
    const res = await this.fetcher.request<{
      status: number;
      message: string;
      data: Omit<
        DashboardSummary,
        "gamedata" | "paymentschart" | "revenuechart"
      > & {
        gamedata: Record<string, string> | Record<string, string>[] | string;
        useractivity:
          | Record<string, string>
          | Record<string, string>[]
          | string;
        tiers: Record<string, string> | Record<string, string>[] | string;
        paymentschart:
          | Record<string, string>
          | Record<string, string>[]
          | string;
        revenuechart:
          | Record<string, string>
          | Record<string, string>[]
          | string;
      };
    }>("/", { data: { operation: "getdashboard", ...query } });

    const {
      gamedata,
      paymentschart,
      revenuechart,
      useractivity,
      tiers,
      ...rest
    } = res.data;

    const gameData:
      | DashboardSummary["gamedata"][number]
      | DashboardSummary["gamedata"] =
      typeof gamedata === "string" ? JSON.parse(gamedata) : gamedata;

    const paymentsChart:
      | DashboardSummary["paymentschart"][number]
      | DashboardSummary["paymentschart"] =
      typeof paymentschart === "string"
        ? JSON.parse(paymentschart)
        : paymentschart;

    const revenueChart:
      | DashboardSummary["revenuechart"][number]
      | DashboardSummary["revenuechart"] =
      typeof revenuechart === "string"
        ? JSON.parse(revenuechart)
        : revenuechart;

    const userActivity:
      | DashboardSummary["useractivity"][number]
      | DashboardSummary["useractivity"] =
      typeof useractivity === "string"
        ? JSON.parse(useractivity)
        : useractivity;

    const tiersData:
      | DashboardSummary["tiers"][number]
      | DashboardSummary["tiers"] =
      typeof tiers === "string" ? JSON.parse(tiers) : tiers;

    const gamedataArray = Array.isArray(gameData) ? gameData : [gameData];

    const paymentschartArray = Array.isArray(paymentsChart)
      ? paymentsChart
      : [paymentsChart];

    const revenuechartArray = Array.isArray(revenueChart)
      ? revenueChart
      : [revenueChart];
    const useractivityArray = Array.isArray(userActivity)
      ? userActivity
      : [userActivity];
    const tiersArray = (Array.isArray(tiersData) ? tiersData : [tiersData]).map(
      // @ts-expect-error keys exist
      ({ Tier, Total }) => ({
        tier: Tier,
        users: Total,
        totalBets: 0,
        averageBet: 0,
      })
    );

    return {
      ...rest,
      gamedata: gamedataArray,
      paymentschart: paymentschartArray,
      revenuechart: revenuechartArray,
      useractivity: useractivityArray,
      tiers: tiersArray,
    };
  }
}
