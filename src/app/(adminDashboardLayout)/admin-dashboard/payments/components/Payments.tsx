"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllPayments } from "@/hooks/payment.hook";
import { IPayment } from "@/types";
import { columns } from "./data-table/columns";
import { PaymentDataTable } from "./data-table/data-table";

const Payments = () => {
  const { data, isLoading, isError } = useGetAllPayments([
    { name: "limit", value: 10000 },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching payments.</p>;
  }

  const payments: IPayment[] = data?.data || [];

  return (
    <>
      <PaymentDataTable data={payments} columns={columns} />
    </>
  );
};

export default Payments;
