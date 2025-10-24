import { notFound } from "next/navigation";

import { ArrowLeft, BarChart3, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getMerchantAction,
  getMerchantPerformanceAction,
} from "@/lib/merchants/merchant.actions";

interface MerchantPerformancePageProps {
  params: Promise<{ merchantid: string }>;
  searchParams: Promise<{
    startdate?: string;
    enddate?: string;
    page?: string;
    size?: string;
  }>;
}

export default async function MerchantPerformancePage({
  params,
  searchParams,
}: MerchantPerformancePageProps) {
  const { merchantid } = await params;
  const { startdate, enddate, page = "1", size = "20" } = await searchParams;

  // Get merchant details
  const merchantResult = await getMerchantAction(merchantid);
  if (!merchantResult.success || !merchantResult.data) {
    notFound();
  }

  const merchant = merchantResult.data;

  // Set default date range if not provided
  const defaultStartDate = startdate || "2024-01-01";
  const defaultEndDate = enddate || "2025-12-31";

  // Get performance data
  const performanceResult = await getMerchantPerformanceAction({
    merchantid,
    startdate: defaultStartDate,
    enddate: defaultEndDate,
    pagenumber: page,
    pagesize: size,
  });

  if (!performanceResult.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <div className="mx-auto max-w-6xl">
          <Card className="rounded-xl border border-red-200 bg-red-50/50 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-900">
                  Error Loading Performance Data
                </h3>
                <p className="mt-2 text-red-600">
                  {performanceResult.error ||
                    "Failed to load merchant performance data"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!performanceResult.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <div className="mx-auto max-w-6xl">
          <Card className="rounded-xl border border-red-200 bg-red-50/50 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-900">
                  Error Loading Performance Data
                </h3>
                <p className="mt-2 text-red-600">
                  No performance data available
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const performanceData = performanceResult.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Performance Report
                </h1>
                <p className="text-gray-600">
                  {merchant.name} ({merchant.merchantcode})
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Merchant
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Revenue
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                KES{" "}
                {parseFloat(
                  performanceData.summary.totalrevenue
                ).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Transactions
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {performanceData.summary.totaltransactions}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Success Rate
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {parseFloat(performanceData.summary.successrate).toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">
                  Completed
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {performanceData.summary.completedcount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Status Breakdown */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Transaction Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Completed
                </span>
                <span className="text-sm font-bold text-green-600">
                  {performanceData.summary.completedcount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Failed
                </span>
                <span className="text-sm font-bold text-red-600">
                  {performanceData.summary.failedcount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Pending
                </span>
                <span className="text-sm font-bold text-yellow-600">
                  {performanceData.summary.pendingcount}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Date Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    From:
                  </span>
                  <p className="text-sm text-gray-900">{defaultStartDate}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">To:</span>
                  <p className="text-sm text-gray-900">{defaultEndDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Pagination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Total Records:
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {performanceData.pagination.totalrecords}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Page:
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {performanceData.pagination.currentpage} of{" "}
                    {performanceData.pagination.totalpages}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.transactions.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {transaction.transactionid}
                      </p>
                      <p className="text-sm text-gray-600">
                        {transaction.transactionmethod} • {transaction.msisdn}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      KES {parseFloat(transaction.amount).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {transaction.transactiondate}{" "}
                      {transaction.transactiontime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
