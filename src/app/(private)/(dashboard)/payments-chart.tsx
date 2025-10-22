"use client";

import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  paymentsin: {
    label: "Payments In",
    color: "hsl(var(--primary))",
  },
  paymentsout: {
    label: "Payments Out",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

type Props = {
  label: string;
  paymentsin: number;
  paymentsout: number;
};

export default function PaymentsChart({ data }: { data: Props[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(new Date(value), "P")}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="paymentsin"
              type="monotone"
              stroke="var(--color-paymentsin)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="paymentsout"
              type="monotone"
              stroke="var(--color-paymentsout)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
