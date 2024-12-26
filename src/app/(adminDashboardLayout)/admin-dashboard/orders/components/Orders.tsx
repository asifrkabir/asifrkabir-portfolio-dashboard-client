"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllOrders } from "@/hooks/order.hook";
import { IOrder } from "@/types";
import { columns } from "./data-table/columns";
import { OrderDataTable } from "./data-table/data-table";

const Orders = () => {
  const { data, isLoading, isError } = useGetAllOrders([
    { name: "limit", value: 10000 },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching orders.</p>;
  }

  const orders: IOrder[] = data?.data || [];

  return (
    <>
      <OrderDataTable data={orders} columns={columns} />
    </>
  );
};

export default Orders;
