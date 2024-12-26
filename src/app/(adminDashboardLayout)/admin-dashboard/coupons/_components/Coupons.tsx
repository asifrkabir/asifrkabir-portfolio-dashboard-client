"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllCoupons } from "@/hooks/coupon.hook";
import { ICoupon } from "@/types";
import { columns } from "./data-table/columns";
import { CouponDataTable } from "./data-table/data-table";

const Coupons = () => {
  const { data, isLoading, isError } = useGetAllCoupons([
    { name: "limit", value: 10000 },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching coupons.</p>;
  }

  const coupons: ICoupon[] = data?.data || [];

  return (
    <>
      <CouponDataTable data={coupons} columns={columns} />
    </>
  );
};

export default Coupons;
