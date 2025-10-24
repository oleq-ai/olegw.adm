"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  ArrowLeft,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Loader2,
  RotateCcw,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getMerchantAction,
  getMerchantPerformanceAction,
} from "@/lib/merchants/merchant.actions";

interface MerchantPerformancePageProps {
  params: Promise<{ merchantid: string }>;
}

export default function MerchantPerformancePage({
  params,
}: MerchantPerformancePageProps) {
  const router = useRouter();
  const [merchantid, setMerchantid] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [merchant, setMerchant] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");

  const resetFilters = () => {
    setStartDate("2024-01-01");
    setEndDate("2025-12-31");
    setCurrentPage(1);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadParams = async () => {
      const { merchantid: id } = await params;
      setMerchantid(id);
    };
    loadParams();
  }, [params]);

  const fetchMerchantData = useCallback(async () => {
    if (!merchantid) return;

    setLoading(true);
    setError(null);
    try {
      const merchantResult = await getMerchantAction(merchantid);
      if (!merchantResult.success || !merchantResult.data) {
        setError("Merchant not found");
        return;
      }
      setMerchant(merchantResult.data);
    } catch {
      setError("Failed to load merchant data");
    } finally {
      setLoading(false);
    }
  }, [merchantid]);

  const fetchPerformanceData = useCallback(async () => {
    if (!merchantid) return;

    setLoading(true);
    setError(null);
    try {
      const result = await getMerchantPerformanceAction({
        merchantid,
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
    } finally {
      setLoading(false);
    }
  }, [merchantid, startDate, endDate, currentPage, pageSize]);

  useEffect(() => {
    if (merchantid) {
      fetchMerchantData();
    }
  }, [merchantid, fetchMerchantData]);

  useEffect(() => {
    if (merchantid) {
      fetchPerformanceData();
    }
  }, [merchantid, fetchPerformanceData]);

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

  if (!merchant || !performanceData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-6xl">
          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
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

  const transactions = performanceData.transactions || [];
  const totalRecords =
    parseInt(performanceData.pagination?.totalrecords || "0") ||
    transactions.length;
  const totalPages =
    parseInt(performanceData.pagination?.totalpages || "1") ||
    Math.ceil(totalRecords / pageSize);
  const currentTransactions = transactions; // API already returns the correct page data

  // Chart data with proper number parsing
  const statusData = [
    {
      name: "Completed",
      value: parseInt(performanceData.summary.completedcount || "0") || 0,
      color: "#10B981",
      badgeColor: "bg-green-100 text-green-800",
      percentage: 0,
    },
    {
      name: "Failed",
      value: parseInt(performanceData.summary.failedcount || "0") || 0,
      color: "#EF4444",
      badgeColor: "bg-red-100 text-red-800",
      percentage: 0,
    },
    {
      name: "Pending",
      value: parseInt(performanceData.summary.pendingcount || "0") || 0,
      color: "#F59E0B",
      badgeColor: "bg-yellow-100 text-yellow-800",
      percentage: 0,
    },
  ];

  // Calculate percentages with safe math
  const totalTransactions = statusData.reduce((sum, item) => {
    const value = Number(item.value) || 0;
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const statusDataWithPercentages = statusData.map((item) => {
    const value = Number(item.value) || 0;
    const safeValue = isNaN(value) ? 0 : value;
    return {
      ...item,
      value: safeValue,
      percentage:
        totalTransactions > 0
          ? Math.round((safeValue / totalTransactions) * 100)
          : 0,
    };
  });

  // Filter out zero values for better display
  const filteredStatusData = statusDataWithPercentages.filter(
    (item) => item.value > 0
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const revenueChartData = currentTransactions.map((transaction: any) => {
    const amount = parseFloat(transaction.amount || "0");
    return {
      name: transaction.transactionid || "Unknown",
      amount: isNaN(amount) ? 0 : amount,
      date: transaction.transactiondate || "",
    };
  });

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading performance data...</p>
          </div>
        </div>
      )}
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
                  Performance Report
                </h1>
                <p className="text-gray-600">
                  {merchant.name} ({merchant.merchantcode})
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Merchant
            </Button>
          </div>
        </div>

        {/* Date Filters */}
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              Date Range Filter
              {(startDate !== "2024-01-01" || endDate !== "2025-12-31") && (
                <span className="ml-2 text-sm text-blue-600">(Filtered)</span>
              )}
            </CardTitle>
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
              <div className="flex items-end">
                <Button
                  onClick={fetchPerformanceData}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Apply Date Filter"
                  )}
                </Button>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">
                Total Revenue
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                KES{" "}
                {parseFloat(
                  performanceData.summary.totalrevenue
                ).toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Total revenue generated</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">
                Total Transactions
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {performanceData.summary.totaltransactions}
              </div>
              <p className="text-xs text-gray-500">
                All transactions processed
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">
                Success Rate
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {parseFloat(performanceData.summary.successrate).toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">Transaction success rate</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-teal-600">
                Completed
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100">
                <Users className="h-4 w-4 text-teal-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {performanceData.summary.completedcount}
              </div>
              <p className="text-xs text-gray-500">Completed transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Breakdown */}
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Transaction Status Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {statusDataWithPercentages.map((status) => (
                <div
                  key={status.name}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                    <span className="font-medium text-gray-900">
                      {status.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {status.value}
                    </div>
                    <div className="text-sm text-gray-500">
                      {status.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Transaction Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={filteredStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percentage }) =>
                        `${name}: ${value} (${percentage}%)`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {filteredStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [
                        `${value} transactions (${props.payload.percentage}%)`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[300px] items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm">
                      No transaction data available
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Transaction Amounts
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
                      "Amount",
                    ]}
                  />
                  <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="rounded-xl border border-blue-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Transaction ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Method
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {currentTransactions.map((transaction: any) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {transaction.transactionid}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                          {transaction.transactionmethod}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-medium text-gray-900">
                          KES {parseFloat(transaction.amount).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {transaction.msisdn}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {transaction.transactiondate}{" "}
                          {transaction.transactiontime}
                        </div>
                      </td>
                    </tr>
                  ))}
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
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, totalRecords)} of{" "}
                {totalRecords} transactions
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1 || loading}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="h-8 w-8 p-0"
                        disabled={
                          pageNum < 1 || pageNum > totalPages || loading
                        }
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
                  disabled={currentPage === totalPages || loading}
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
