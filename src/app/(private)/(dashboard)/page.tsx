"use client";

import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPaymentDashboardAction } from "@/lib/dashboard/dashboard.actions";
import { DashboardData } from "@/lib/dashboard/types/dashboard.types";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  positive?: boolean;
  description?: string;
  color?: string;
}

// Enhanced StatCard with better styling and animations
function StatCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
  description,
  color = "blue",
}: StatCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  return (
    <Card className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      />
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <div className="text-sm font-medium text-gray-600">{title}</div>
              {change !== 0 && (
                <div
                  className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    positive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {positive ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {Math.abs(change)}%
                </div>
              )}
            </div>
            <div className="mb-1 text-2xl font-bold text-gray-900">{value}</div>
            {description && (
              <div className="text-xs text-gray-500">{description}</div>
            )}
          </div>
          <div
            className={`rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} p-3 text-white shadow-lg`}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentMethodsChart({ data }: { data: DashboardData }) {
  const colors = [
    "#8B5CF6",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#6366F1",
    "#F97316",
  ];

  return (
    <Card className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Payment Methods
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Transaction breakdown by payment method
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {data.paymentmethods.length} methods
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <ResponsiveContainer width="60%" height={220}>
            <PieChart>
              <Pie
                data={data.paymentmethods}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={3}
                dataKey="percentage"
              >
                {data.paymentmethods.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  color: "#374151",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  fontSize: "14px",
                }}
                formatter={(value: number, _name, props) => [
                  `${value}% (${props.payload.count} transactions)`,
                  props.payload.method,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex max-h-60 flex-col space-y-3 overflow-y-auto">
            {data.paymentmethods.map((item, index) => (
              <div
                key={index}
                className="group/item flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="h-4 w-4 rounded-full shadow-sm"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-700">
                      {item.method}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.count} transactions
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TransactionStatusChart({ data }: { data: DashboardData }) {
  const statusData = [
    {
      name: "Completed",
      value: data.completedcount,
      color: "#10B981",
      icon: CheckCircle,
    },
    {
      name: "Failed",
      value: data.failedcount,
      color: "#EF4444",
      icon: XCircle,
    },
    {
      name: "Pending",
      value: data.pendingcount,
      color: "#F59E0B",
      icon: Clock,
    },
  ];

  const totalTransactions =
    data.completedcount + data.failedcount + data.pendingcount;

  return (
    <Card className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Activity className="h-5 w-5 text-green-600" />
              Transaction Status
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Current transaction distribution
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {totalTransactions} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <ResponsiveContainer width="50%" height={220}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  color: "#374151",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  fontSize: "14px",
                }}
                formatter={(value: number, name, props) => [
                  `${value} transactions (${((value / totalTransactions) * 100).toFixed(1)}%)`,
                  props.payload.name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col space-y-4">
            {statusData.map((item, index) => {
              const Icon = item.icon;
              const percentage =
                totalTransactions > 0
                  ? ((item.value / totalTransactions) * 100).toFixed(1)
                  : 0;

              return (
                <div
                  key={index}
                  className="group/item flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.value} transactions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-sm font-bold"
                      style={{ color: item.color }}
                    >
                      {percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TopMerchantsChart({ data }: { data: DashboardData }) {
  return (
    <Card className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Building2 className="h-5 w-5 text-purple-600" />
              Top Merchants
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Revenue breakdown by top performing merchants
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            {data.topmerchants.length} merchants
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data.topmerchants}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f3f4f6"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="merchantname"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `KES ${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  color: "#374151",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  fontSize: "14px",
                }}
                formatter={(value: number) => [
                  `KES ${value.toLocaleString()}`,
                  "Revenue",
                ]}
                labelFormatter={(label) => `Merchant: ${label}`}
              />
              <Bar
                dataKey="revenue"
                fill="url(#merchantGradient)"
                radius={[6, 6, 0, 0]}
                className="transition-opacity hover:opacity-80"
              />
              <defs>
                <linearGradient
                  id="merchantGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.topmerchants.map((merchant, index) => (
            <div
              key={index}
              className="group/item rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-4 transition-all duration-300 hover:border-purple-200 hover:from-purple-50 hover:to-purple-100"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {merchant.merchantname}
                  </span>
                </div>
                <Badge variant="outline" className="bg-white text-xs">
                  {merchant.transactioncount} txns
                </Badge>
              </div>
              <div className="mb-1 text-xl font-bold text-gray-900">
                KES {merchant.revenue.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                {((merchant.revenue / data.totalrevenue) * 100).toFixed(1)}% of
                total revenue
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  // Get date range for the last 30 days
  const { endDate, startDate } = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return {
      endDate: format(now, "yyyy-MM-dd"),
      startDate: format(thirtyDaysAgo, "yyyy-MM-dd"),
    };
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", startDate, endDate],
    queryFn: async () => {
      const res = await getPaymentDashboardAction(startDate, endDate, 15);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="animate-pulse">
              <div className="mb-2 h-8 w-48 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
              <div className="h-4 w-96 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
            </div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="animate-pulse">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-4 w-24 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300"></div>
                  </div>
                  <div className="mb-2 h-8 w-32 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
                  <div className="h-4 w-20 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="animate-pulse">
                  <div className="mb-4 h-6 w-32 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
                  <div className="h-48 rounded bg-gradient-to-r from-gray-200 to-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Error Loading Dashboard
            </h1>
            <p className="text-gray-600">
              {error?.message || "Unable to load dashboard data"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="mb-1 text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Monitor your merchant platform performance and analytics
            </p>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={`KES ${data.totalrevenue.toLocaleString()}`}
            change={data.revenuechange}
            icon={DollarSign}
            positive={data.revenuechange >= 0}
            description="Last 30 days"
            color="green"
          />
          <StatCard
            title="Total Transactions"
            value={data.totaltransactions.toLocaleString()}
            change={data.transactionchange}
            icon={BarChart3}
            positive={data.transactionchange >= 0}
            description="All time"
            color="blue"
          />
          <StatCard
            title="Success Rate"
            value={`${data.successrate}%`}
            change={data.successratechange}
            icon={Zap}
            positive={data.successratechange >= 0}
            description="Transaction success"
            color="purple"
          />
          <StatCard
            title="Active Merchants"
            value={data.activemerchants.toLocaleString()}
            change={0}
            icon={Building2}
            positive={true}
            description="Currently active"
            color="orange"
          />
        </div>

        {/* Trends Chart */}
        <Card className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Transaction Trends
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Transaction volume over time
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className="bg-indigo-100 text-indigo-700"
              >
                {data.trends.length} months
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data.trends}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  strokeOpacity={0.5}
                />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.75rem",
                    color: "#374151",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    fontSize: "14px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  name="Completed"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                  name="Failed"
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                  name="Pending"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PaymentMethodsChart data={data} />
          <TransactionStatusChart data={data} />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 gap-6">
          <TopMerchantsChart data={data} />
        </div>
      </div>
    </div>
  );
}
