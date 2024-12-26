"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable
} from "@tanstack/react-table";
import * as React from "react";

import { DataTable } from "@/components/Shared/DataTable/data-table";
import { CouponDataTableToolbar } from "./toolbar";
import { DataTablePagination } from "./data-table-pagination";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationProps;
}

export function CouponDataTable<TData, TValue>({
  columns,
  data,
  pagination,
}: DataTableProps<TData, TValue>) {
  const searchColumns = ["code"];
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <CouponDataTableToolbar table={table} searchColumns={searchColumns} />
      <DataTable table={table} noDataMessage="No records found." />
      {pagination && (
        <DataTablePagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          totalRows={pagination.totalRows}
          onPageChange={pagination.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      )}
    </div>
  );
}
