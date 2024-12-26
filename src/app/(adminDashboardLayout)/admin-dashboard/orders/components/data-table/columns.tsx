import { DataTableColumnHeader } from "@/components/Shared/DataTable/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IOrder } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import ViewDetailsDropdownItem from "../ViewDetails/ViewDetailsDropdownItem";

export const columns: ColumnDef<IOrder>[] = [
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
      const shopName = row.original.shop?.name || "Unknown";

      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{shopName}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price ($)" />
    ),
    cell: ({ row }) => {
      const totalPrice = parseFloat(row.original?.totalPrice.toFixed(2));

      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{totalPrice}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount ($)" />
    ),
    cell: ({ row }) => {
      const discount = parseFloat((row.original?.discount || 0).toFixed(2));

      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{discount}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "finalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Final Price ($)" />
    ),
    cell: ({ row }) => {
      const totalPrice = parseFloat(row.original?.totalPrice.toFixed(2));
      const discount = parseFloat((row.original?.discount || 0).toFixed(2));
      const finalPrice = parseFloat((totalPrice - discount).toFixed(2));

      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{finalPrice}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date Time" />
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
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ViewDetailsDropdownItem id={order._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
