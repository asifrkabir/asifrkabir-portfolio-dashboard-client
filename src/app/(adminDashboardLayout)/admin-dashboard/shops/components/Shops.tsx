"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllShops } from "@/hooks/shop.hook";
import { IShop } from "@/types";
import { columns } from "./data-table/columns";
import { ShopDataTable } from "./data-table/data-table";

const Shops = () => {
  const { data, isLoading, isError } = useGetAllShops([
    { name: "limit", value: 10000 },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching shops.</p>;
  }

  const shops: IShop[] = data?.data || [];

  return (
    <>
      <ShopDataTable data={shops} columns={columns} />
    </>
  );
};

export default Shops;
