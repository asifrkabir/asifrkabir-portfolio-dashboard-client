import { DataTableColumnHeader } from "@/components/Shared/DataTable/data-table-column-header";
import { IOrderProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IOrderProduct>[] = [
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      const productName = row.original.product?.name || "Unknown";

      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{productName}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price ($)" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{row.getValue("price")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{row.getValue("quantity")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
