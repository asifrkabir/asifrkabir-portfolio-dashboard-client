"use client";

import DataTableLoadingSkeleton from "@/components/Shared/DataTable/DataTableLoadingSkeleton";
import { useGetAllProductCategories } from "@/hooks/productCategory.hook";
import { IProductCategory } from "@/types";
import { columns } from "./data-table/columns";
import { ProductCategoryDataTable } from "./data-table/data-table";

const ProductCategories = () => {
  const { data, isLoading, isError } = useGetAllProductCategories([
    { name: "limit", value: 10000 },
  ]);

  if (isLoading) {
    return <DataTableLoadingSkeleton rows={10} columns={1} />;
  }

  if (isError) {
    return <p>Something went wrong while fetching product categories.</p>;
  }

  const productCategories: IProductCategory[] = data?.data || [];

  return (
    <>
      <ProductCategoryDataTable data={productCategories} columns={columns} />
    </>
  );
};

export default ProductCategories;
