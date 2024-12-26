"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTotalOrders } from "@/hooks/order.hook";
import { Loader2 } from "lucide-react";

interface IProps {
  shopId?: string;
}

const TotalOrdersCard = ({ shopId }: IProps) => {
  const filters = shopId ? [{ name: "shop", value: shopId }] : [];

  const { data, isLoading } = useGetTotalOrders(filters);

  const totalOrders = data?.data || 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
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
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span>{totalOrders}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalOrdersCard;
