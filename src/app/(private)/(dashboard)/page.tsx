"use client";

import { useState } from "react";

import { ShoppingCart, TrendingDown, TrendingUp, Users } from "lucide-react";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Types
interface DashboardData {
  todayMoney: number;
  todayMoneyChange: number;
  todayUsers: number;
  todayUsersChange: number;
  newAgents: number;
  newAgentsChange: number;
  totalSales: number;
  totalSalesChange: number;
  satisfaction: number;
  referralInvited: number;
  referralBonus: number;
  safetyScore: number;
  activeUsers: number;
  activeUsersChange: number;
  clicks: number;
  sales: number;
  items: number;
  salesOverview: Array<{ month: string; value1: number; value2: number }>;
  activeUsersChart: Array<{ value: number }>;
  gameDistribution: Array<{ name: string; value: number; color: string }>;
  playerStatus: Array<{ name: string; value: number; color: string }>;
  revenueByCategory: Array<{
    category: string;
    revenue: number;
    percentage: number;
  }>;
  monthlyGrowth: Array<{ month: string; growth: number; revenue: number }>;
}

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  positive?: boolean;
}

// Utility functions - removed random generation to fix hydration issues

const getStaticData = (): DashboardData => {
  return {
    todayMoney: 65000,
    todayMoneyChange: 12,
    todayUsers: 2516,
    todayUsersChange: 7,
    newAgents: 3420,
    newAgentsChange: -3,
    totalSales: 125000,
    totalSalesChange: 8,
    satisfaction: 92,
    referralInvited: 156,
    referralBonus: 1850,
    safetyScore: 8.7,
    activeUsers: 32500,
    activeUsersChange: 22,
    clicks: 2.8,
    sales: 2750,
    items: 320,
    salesOverview: [
      { month: "Jan", value1: 320, value2: 450 },
      { month: "Feb", value1: 380, value2: 520 },
      { month: "Mar", value1: 420, value2: 580 },
      { month: "Apr", value1: 350, value2: 480 },
      { month: "May", value1: 480, value2: 620 },
      { month: "Jun", value1: 520, value2: 680 },
      { month: "Jul", value1: 450, value2: 590 },
      { month: "Aug", value1: 380, value2: 510 },
      { month: "Sep", value1: 420, value2: 560 },
      { month: "Oct", value1: 480, value2: 640 },
      { month: "Nov", value1: 520, value2: 680 },
      { month: "Dec", value1: 580, value2: 720 },
    ],
    activeUsersChart: [
      { value: 180 },
      { value: 220 },
      { value: 190 },
      { value: 250 },
      { value: 280 },
      { value: 320 },
      { value: 290 },
      { value: 350 },
      { value: 380 },
      { value: 420 },
      { value: 450 },
      { value: 480 },
    ],
    gameDistribution: [
      { name: "Credit Card", value: 45, color: "#8B5CF6" },
      { name: "Bank Transfer", value: 30, color: "#06B6D4" },
      { name: "Mobile Money", value: 15, color: "#10B981" },
      { name: "Cryptocurrency", value: 10, color: "#F59E0B" },
    ],
    playerStatus: [
      { name: "Active", value: 75, color: "#10B981" },
      { name: "Inactive", value: 15, color: "#EF4444" },
      { name: "Suspended", value: 10, color: "#F59E0B" },
    ],
    revenueByCategory: [
      { category: "E-commerce", revenue: 45000, percentage: 45 },
      { category: "Retail", revenue: 30000, percentage: 30 },
      { category: "Services", revenue: 15000, percentage: 15 },
      { category: "Digital", revenue: 10000, percentage: 10 },
    ],
    monthlyGrowth: [
      { month: "Jan", growth: 12, revenue: 45000 },
      { month: "Feb", growth: 18, revenue: 52000 },
      { month: "Mar", growth: 15, revenue: 48000 },
      { month: "Apr", growth: 22, revenue: 58000 },
      { month: "May", growth: 25, revenue: 62000 },
      { month: "Jun", growth: 20, revenue: 55000 },
    ],
  };
};

// Components
function StatCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 text-sm font-medium text-gray-600">
              {title}
            </div>
            <div className="flex items-end gap-3">
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div
                className={`mb-1 flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  positive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {positive ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(change)}%
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <Icon className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function GameDistributionChart({ data }: { data: DashboardData }) {
  return (
    <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Payment Methods
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Transaction breakdown by payment method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <ResponsiveContainer width="60%" height={200}>
            <PieChart>
              <Pie
                data={data.gameDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.gameDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  color: "#374151",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`${value}%`, "Percentage"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col space-y-3">
            {data.gameDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>
                <span className="text-sm text-gray-500">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PlayerStatusChart({ data }: { data: DashboardData }) {
  return (
    <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Merchant Status
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Current merchant distribution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <ResponsiveContainer width="50%" height={200}>
            <PieChart>
              <Pie
                data={data.playerStatus}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {data.playerStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  color: "#374151",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`${value}%`, "Percentage"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col space-y-4">
            {data.playerStatus.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-700">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.value}% of total
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueChart({ data }: { data: DashboardData }) {
  return (
    <Card className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-6">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Revenue by Business Type
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Monthly revenue breakdown by merchant category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.revenueByCategory}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f3f4f6"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  color: "#374151",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Revenue",
                ]}
              />
              <Bar dataKey="revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {data.revenueByCategory.map((item, index) => (
            <div key={index} className="rounded-lg bg-gray-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {item.category}
                </span>
                <span className="text-xs font-bold text-purple-600">
                  {item.percentage}%
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                ${item.revenue.toLocaleString()}
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
  const [data] = useState<DashboardData>(getStaticData());

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
            title="Total Merchants"
            value={data.todayUsers.toLocaleString()}
            change={data.todayUsersChange}
            icon={Users}
          />
          <StatCard
            title="Active"
            value={data.todayUsers.toLocaleString()}
            change={data.todayUsersChange}
            icon={Users}
          />
          <StatCard
            title="Inactive"
            value={data.newAgents.toLocaleString()}
            change={data.newAgentsChange}
            icon={Users}
            positive={false}
          />
          <StatCard
            title="This Month"
            value={data.newAgents.toLocaleString()}
            change={data.newAgentsChange}
            icon={ShoppingCart}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GameDistributionChart data={data} />
          <PlayerStatusChart data={data} />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 gap-6">
          <RevenueChart data={data} />
        </div>
      </div>
    </div>
  );
}
