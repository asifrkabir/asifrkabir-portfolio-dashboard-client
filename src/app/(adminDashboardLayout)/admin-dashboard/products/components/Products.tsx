"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllProducts } from "@/hooks/product.hook";
import { IProduct } from "@/types";
import { columns } from "./data-table/columns";
import { ProductDataTable } from "./data-table/data-table";

const Products = () => {
  const { data, isLoading, isError } = useGetAllProducts([
    { name: "limit", value: 10000 },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching products.</p>;
  }

  const products: IProduct[] = data?.data || [];

  return (
    <>
      <ProductDataTable data={products} columns={columns} />
    </>
  );
};

export default Products;
