"use client";

import { useEffect, useState } from "react";

import {
  DollarSign,
  MousePointer,
  Package,
  ShoppingCart,
  Smile,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CircularProgress } from "@/components/circular-progress";
import { CircularScore } from "@/components/circular-score";
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
}

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  positive?: boolean;
}

// Utility functions
const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFloat = (min: number, max: number, decimals = 1): number =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const generateData = (): DashboardData => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return {
    todayMoney: randomInt(40000, 80000),
    todayMoneyChange: randomInt(1, 15),
    todayUsers: randomInt(1500, 3500),
    todayUsersChange: randomInt(1, 10),
    newAgents: randomInt(2000, 5000),
    newAgentsChange: randomInt(-5, -1),
    totalSales: randomInt(80000, 150000),
    totalSalesChange: randomInt(1, 12),
    satisfaction: randomInt(85, 98),
    referralInvited: randomInt(100, 200),
    referralBonus: randomInt(1000, 2000),
    safetyScore: randomFloat(7.5, 9.9),
    activeUsers: randomInt(25000, 40000),
    activeUsersChange: randomInt(15, 30),
    clicks: randomFloat(1.5, 3.5, 2),
    sales: randomInt(2000, 3000),
    items: randomInt(250, 400),
    salesOverview: months.map((month) => ({
      month,
      value1: randomInt(200, 500),
      value2: randomInt(300, 700),
    })),
    activeUsersChart: Array.from({ length: 12 }, () => ({
      value: randomInt(100, 500),
    })),
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
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="absolute right-4 top-4 rounded-lg bg-primary p-2.5">
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </div>
        <div className="flex items-end gap-2">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div
            className={`mb-0.5 flex items-center text-xs font-medium ${
              positive ? "text-chart-1" : "text-destructive"
            }`}
          >
            {positive ? (
              <TrendingUp className="mr-0.5 h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="mr-0.5 h-3.5 w-3.5" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SalesOverviewChart({ data }: { data: DashboardData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription className="text-chart-1">
          +{data.totalSalesChange}% more in 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={224}>
          <LineChart data={data.salesOverview}>
            <CartesianGrid
              strokeDasharray="4 4"
              className="stroke-border"
              strokeOpacity={0.3}
            />
            <XAxis
              dataKey="month"
              className="text-xs text-muted-foreground"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              className="text-xs text-muted-foreground"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickLine={{ stroke: "hsl(var(--border))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                color: "hsl(var(--foreground))",
              }}
            />
            <Line
              type="monotone"
              dataKey="value1"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--primary))", r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="value2"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--chart-1))", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function SatisfactionCard({ satisfaction }: { satisfaction: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Satisfaction Rate</CardTitle>
        <CardDescription>From all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <CircularProgress
            value={satisfaction}
            max={100}
            size={160}
            strokeWidth={12}
            label="Based on likes"
            icon={Smile}
            showPercentage={true}
            color="hsl(var(--primary))"
            backgroundColor="hsl(var(--muted))"
          />
          <div className="mt-3 flex w-full max-w-[160px] justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReferralCard({ data }: { data: DashboardData }) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-4">
        <CardTitle>Referral Tracking</CardTitle>
        <button className="text-primary hover:text-primary/80">•••</button>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div>
            <div className="mb-1 text-xs text-muted-foreground">Invited</div>
            <div className="text-2xl font-bold text-foreground">
              {data.referralInvited} people
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs text-muted-foreground">Bonus</div>
            <div className="text-2xl font-bold text-foreground">
              ${data.referralBonus.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <CircularScore
            score={data.safetyScore}
            maxScore={10}
            size={120}
            strokeWidth={10}
            label="Safety Score"
            showMaxScore={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ActiveUsersCard({ data }: { data: DashboardData }) {
  return (
    <Card className="md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
        <CardDescription className="text-chart-1">
          (+{data.activeUsersChange}%) than last week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex h-40 items-end justify-between gap-1.5">
          {data.activeUsersChart.map((d, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-primary transition-all hover:opacity-80"
              style={{ height: `${(d.value / 500) * 100}%` }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard
            icon={Users}
            label="Users"
            value={data.activeUsers.toLocaleString()}
          />
          <MetricCard
            icon={MousePointer}
            label="Clicks"
            value={`${data.clicks}M`}
          />
          <MetricCard
            icon={DollarSign}
            label="Sales"
            value={`$${data.sales}`}
          />
          <MetricCard
            icon={Package}
            label="Items"
            value={data.items.toString()}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-muted p-3">
      <div className="mb-2 flex items-center gap-2">
        <div className="rounded-md bg-primary p-1.5">
          <Icon className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Today's Money"
          value={`$${data.todayMoney.toLocaleString()}`}
          change={data.todayMoneyChange}
          icon={DollarSign}
        />
        <StatCard
          title="Today's Users"
          value={data.todayUsers.toLocaleString()}
          change={data.todayUsersChange}
          icon={Users}
        />
        <StatCard
          title="New Agents"
          value={`+${data.newAgents.toLocaleString()}`}
          change={data.newAgentsChange}
          icon={Users}
          positive={false}
        />
        <StatCard
          title="Total Sales"
          value={`$${data.totalSales.toLocaleString()}`}
          change={data.totalSalesChange}
          icon={ShoppingCart}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesOverviewChart data={data} />
        <SatisfactionCard satisfaction={data.satisfaction} />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ReferralCard data={data} />
        <ActiveUsersCard data={data} />
      </div>
    </div>
  );
}
