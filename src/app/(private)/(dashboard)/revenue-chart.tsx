"use client";

import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    // color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type Props = {
  label: string;
  revenue: string;
};

export default function RevenueChart({ data }: { data: Props[] }) {
  const chartData = data.map(({ label, ...rest }) => ({
    label: label.substring(0, 3),
    ...rest,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="revenue">
              <LabelList position="top" dataKey="label" fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.label}
                  fill={
                    Number(item.revenue ?? "0") > 0
                      ? "hsl(var(--primary))"
                      : "hsl(var(--destructive))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
