"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetOrderById } from "@/hooks/order.hook";
import { IOrderProduct } from "@/types";
import { columns } from "./data-table/columns";
import { OrderProductDataTable } from "./data-table/data-table";

interface IProps {
  orderId: string;
}

const OrderProducts = ({ orderId }: IProps) => {
  const { data, isLoading, isError } = useGetOrderById(orderId);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching order details.</p>;
  }

  const orderProducts: IOrderProduct[] = data?.data?.products || [];

  return (
    <>
      <OrderProductDataTable data={orderProducts} columns={columns} />
    </>
  );
};

export default OrderProducts;
