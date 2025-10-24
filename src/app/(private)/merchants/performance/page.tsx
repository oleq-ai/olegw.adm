"use client";

import { useCallback, useEffect, useState } from "react";

import {
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllMerchantsPerformanceAction } from "@/lib/merchants/merchant.actions";

export default function AllMerchantsPerformancePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPerformanceData = useCallback(async () => {
    setError(null);
    try {
      const result = await getAllMerchantsPerformanceAction({
        startdate: startDate,
        enddate: endDate,
        pagenumber: currentPage.toString(),
        pagesize: pageSize.toString(),
      });

      if (result.success) {
        setPerformanceData(result.data);
      } else {
        setError(result.error || "Failed to load performance data");
      }
    } catch {
      setError("An error occurred while loading data");
    }
  }, [startDate, endDate, currentPage, pageSize]);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      await fetchPerformanceData();
    };
    loadData();
  }, [fetchPerformanceData]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-6xl">
          <Card className="rounded-xl border border-red-200 bg-red-50/50 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-900">
                  Error Loading Performance Data
                </h3>
                <p className="mt-2 text-red-600">{error}</p>
                <Button onClick={fetchPerformanceData} className="mt-4">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!performanceData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-6xl">
          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Loading Performance Data...
                </h3>
                <p className="mt-2 text-gray-600">
                  Please wait while we fetch the data
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const merchants = performanceData.merchants || [];
  const totalPages = Math.ceil(merchants.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMerchants = merchants.slice(startIndex, endIndex);

  // Calculate totals
  const totalRevenue = merchants.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, merchant: any) => sum + parseFloat(merchant.totalrevenue),
    0
  );
  const totalTransactions = merchants.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, merchant: any) => sum + parseInt(merchant.totaltransactions),
    0
  );
  const totalAccounts = merchants.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sum: number, merchant: any) => sum + parseInt(merchant.accountcount),
    0
  );

  // Chart data
  const revenueChartData = currentMerchants.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (merchant: any) => ({
      name: merchant.merchantname,
      revenue: parseFloat(merchant.totalrevenue),
      transactions: parseInt(merchant.totaltransactions),
    })
  );

  const successRateData = currentMerchants.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (merchant: any) => ({
      name: merchant.merchantname,
      successRate: parseFloat(merchant.successrate) * 100,
    })
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Merchants Performance
                </h1>
                <p className="text-gray-600">
                  Performance analytics and insights
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="pageSize">Page Size</Label>
                <Input
                  id="pageSize"
                  type="number"
                  value={pageSize}
                  onChange={(e) => setPageSize(parseInt(e.target.value))}
                  min="5"
                  max="50"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={fetchPerformanceData} className="w-full">
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                Total Merchants
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {merchants.length}
              </div>
              <p className="text-xs text-gray-500">Active merchants</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                Total Revenue
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                KES {totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Combined revenue</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                Total Transactions
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {totalTransactions.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">All transactions</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                Total Accounts
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {totalAccounts.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Merchant accounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Revenue by Merchant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => [
                      `KES ${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Success Rate Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={successRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => [
                      `${Number(value).toFixed(1)}%`,
                      "Success Rate",
                    ]}
                  />
                  <Bar
                    dataKey="successRate"
                    fill="#60A5FA"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Merchants Table */}
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Merchants Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
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
                  {currentMerchants.map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (merchant: any) => (
                      <tr
                        key={merchant.merchantid}
                        className="hover:bg-gray-50"
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
                          <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
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
                    )
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, merchants.length)} of {merchants.length}{" "}
                merchants
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="h-8 w-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
