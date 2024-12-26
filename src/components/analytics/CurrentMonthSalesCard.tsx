"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetWeeklySales } from "@/hooks/order.hook";
import { IQueryParam } from "@/types";

const chartConfig = {
  total: {
    label: "Total Sales",
    color: "rgb(16 185 129)",
  },
} satisfies ChartConfig;

interface IProps {
  shopId?: string;
}

export function CurrentMonthSalesCard({ shopId }: IProps) {
  const filters: IQueryParam[] = shopId
    ? [{ name: "shop", value: shopId }]
    : [];

  const { data, isLoading } = useGetWeeklySales(filters);

  const weeklySales = data?.data || [];
  const chartData = isLoading
    ? Array.from({ length: 5 }, (_, i) => ({
        week: `Week ${i + 1}`,
        total: 0,
      }))
    : weeklySales.map((item) => ({
        week: item.week,
        total: item.totalOrders,
      }));

  const now = new Date();
  const currentMonth = now.toLocaleString("default", { month: "long" });
  const currentYear = now.getFullYear();

  return (
    <Card className="col-span-4 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>
          Weekly Sales - {currentMonth} {currentYear}
        </CardTitle>
        <CardDescription>
          Sales trend for {currentMonth} {currentYear}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <Legend />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing weekly breakdown of sales for {currentMonth} {currentYear}
        </div>
      </CardFooter>
    </Card>
  );
}
