import { DataTableColumnHeader } from "@/components/Shared/DataTable/data-table-column-header";
import { IPayment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => {
      const customerName = row.original.user?.name || "Unknown";

      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{customerName}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "shop",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shop Name" />
    ),
    cell: ({ row }) => {
      const orderId = row.original.shop?.name || "Unknown";

      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{orderId}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "order",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => {
      const orderId = row.original?.order?._id || "Unknown";

      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{orderId}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount ($)" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{row.getValue("amount")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Date Time" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue<string>("createdAt");
      return (
        <div className="flex space-x-2">
          <span className="w-[250px]">
            {createdAt ? format(new Date(createdAt), "PPPpp") : "N/A"}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
