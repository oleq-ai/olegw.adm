"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  hour: string;
  totalbets: number;
  uniqueusers: number;
  totalbetamount: number;
};

export default function UserActivityChart({ data }: { data: Props[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <CardTitle>Betting Activity Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="hour"
              className="text-muted-foreground"
              tick={{ fill: "currentColor" }}
              label={{ value: "Time", position: "insideBottom", offset: -10 }}
            />
            <YAxis
              className="text-muted-foreground"
              tick={{ fill: "currentColor" }}
              label={{ value: "Count", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              formatter={(value, name) => {
                switch (name) {
                  case "totalbets":
                    return [`${value.toLocaleString()}`, "Total Bets"];
                  case "uniqueusers":
                    return [`${value.toLocaleString()}`, "Unique Users"];
                  case "totalbetamount":
                    return [`${value.toLocaleString()}`, "Total Bet Amount"];
                  default:
                    return [value, name];
                }
              }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
                borderRadius: "8px",
                padding: "10px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ paddingTop: "16px" }}
            />
            <Line
              type="monotone"
              dataKey="uniqueusers"
              name="Unique Users"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{
                stroke: "hsl(var(--primary))",
                strokeWidth: 2,
                r: 4,
                fill: "hsl(var(--background))",
              }}
            />
            <Line
              type="monotone"
              dataKey="totalbets"
              name="Total Bets"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{
                stroke: "hsl(var(--chart-2))",
                strokeWidth: 2,
                r: 4,
                fill: "hsl(var(--background))",
              }}
            />
            <Line
              type="monotone"
              dataKey="totalbetamount"
              name="Total Bet Amount"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{
                stroke: "hsl(var(--chart-1))",
                strokeWidth: 2,
                r: 4,
                fill: "hsl(var(--background))",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
