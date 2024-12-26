import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllOrders } from "@/hooks/order.hook";
import { IQueryParam } from "@/types";
import { CircleUser, Loader2 } from "lucide-react";

interface IProps {
  shopId?: string;
}

const RecentOrdersCard = ({ shopId }: IProps) => {
  const filters: IQueryParam[] = shopId
    ? [{ name: "shop", value: shopId }]
    : [];

  filters.push({ name: "limit", value: 6 });
  filters.push({ name: "sort", value: "-createdAt" });

  const { data, isLoading } = useGetAllOrders(filters);

  const orders = data?.data || [];

  return (
    <Card className="col-span-4 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            orders.map((order, index) => (
              <div className="flex items-center" key={index}>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={order?.user?.profilePicture} alt="Avatar" />
                  <AvatarFallback>
                    <CircleUser />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {order?.user?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order?.user?.email || "Unknown"}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  +$
                  {parseFloat(
                    (order?.totalPrice - (order?.discount || 0)).toFixed(2)
                  ) || "Unknown"}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersCard;
