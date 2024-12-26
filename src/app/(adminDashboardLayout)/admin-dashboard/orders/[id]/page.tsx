"use client";

import { useParams } from "next/navigation";
import OrderProducts from "./components/OrderProducts";

const OrderDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Order Details</h1>
      </div>
      <OrderProducts orderId={id as string} />
    </div>
  );
};

export default OrderDetailsPage;
