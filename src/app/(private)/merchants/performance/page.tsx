import { BarChart3, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllMerchantsPerformanceAction } from "@/lib/merchants/merchant.actions";

interface AllMerchantsPerformancePageProps {
  searchParams: Promise<{
    startdate?: string;
    enddate?: string;
    page?: string;
    size?: string;
  }>;
}

export default async function AllMerchantsPerformancePage({
  searchParams,
}: AllMerchantsPerformancePageProps) {
  const { startdate, enddate, page = "1", size = "10" } = await searchParams;

  // Set default date range if not provided
  const defaultStartDate = startdate || "2024-01-01";
  const defaultEndDate = enddate || "2025-12-31";

  // Get all merchants performance data
  const performanceResult = await getAllMerchantsPerformanceAction({
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
                    "Failed to load all merchants performance data"}
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
                  No Performance Data
                </h3>
                <p className="mt-2 text-red-600">
                  No performance data available for the selected period
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const performanceData = performanceResult.data;
  const merchants = performanceData.merchants;

  // Calculate totals
  const totalRevenue = merchants.reduce(
    (sum, merchant) => sum + parseFloat(merchant.totalrevenue),
    0
  );
  const totalTransactions = merchants.reduce(
    (sum, merchant) => sum + parseInt(merchant.totaltransactions),
    0
  );
  const totalAccounts = merchants.reduce(
    (sum, merchant) => sum + parseInt(merchant.accountcount),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    All Merchants Performance
                  </h1>
                  <p className="mt-1 text-gray-600">
                    Performance overview for all merchants
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Merchants
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Users className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {merchants.length}
                </div>
                <p className="text-xs text-gray-500">
                  Active merchants in system
                </p>
              </CardContent>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Revenue
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  KES {totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">
                  Combined revenue across all merchants
                </p>
              </CardContent>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Transactions
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <BarChart3 className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {totalTransactions.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">
                  All transactions processed
                </p>
              </CardContent>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Accounts
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Users className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {totalAccounts.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">
                  Merchant accounts created
                </p>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Merchants Performance Table */}
        <Card className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-slate-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <CardHeader className="border-b border-gray-200/60 bg-gradient-to-r from-gray-50/50 to-slate-50/50 p-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
                Merchants Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200 bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Merchant
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Code
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                        Revenue
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                        Transactions
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                        Success Rate
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                        Accounts
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {merchants.map((merchant) => (
                      <tr
                        key={merchant.merchantid}
                        className="transition-colors hover:bg-gray-50/50"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">
                              {merchant.merchantname}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {merchant.merchantid}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                            {merchant.merchantcode}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="font-medium text-gray-900">
                            KES{" "}
                            {parseFloat(merchant.totalrevenue).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="font-medium text-gray-900">
                            {parseInt(
                              merchant.totaltransactions
                            ).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="font-medium text-gray-900">
                            {(parseFloat(merchant.successrate) * 100).toFixed(
                              1
                            )}
                            %
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="font-medium text-gray-900">
                            {parseInt(merchant.accountcount).toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
