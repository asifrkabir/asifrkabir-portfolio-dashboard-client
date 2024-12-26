"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTotalRevenue } from "@/hooks/payment.hook";
import { Loader2 } from "lucide-react";

interface IProps {
  shopId?: string;
}

const TotalRevenueCard = ({ shopId }: IProps) => {
  const filters = shopId ? [{ name: "shop", value: shopId }] : [];

  const { data, isLoading } = useGetTotalRevenue(filters);

  const totalRevenue = data?.data || 0;

  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalRevenue);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span>{formattedRevenue}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalRevenueCard;
