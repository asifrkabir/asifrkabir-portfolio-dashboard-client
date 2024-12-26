import { DataTableColumnHeader } from "@/components/Shared/DataTable/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import DeleteProductDropdownItem from "../DeleteProduct/DeleteProductDropdownItem";
import ViewReviewsDropdownItem from "../ViewReviews/ViewReviewsDropdownItem";

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{row.getValue("name")}</span>
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
      const shopName = row.original?.shop?.name || "Unknown";

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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.original?.category || "Unknown";

      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{category.name}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "inventoryCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inventory Remaining" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{row.getValue("inventoryCount")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      let renderedStatus = (
        <div className="flex space-x-2">
          <span className="w-[150px]">{row.getValue("status")}</span>
        </div>
      );

      switch (status) {
        case "suspended":
          renderedStatus = (
            <Badge className="uppercase bg-red-500">{status}</Badge>
          );
          break;
        case "available":
          renderedStatus = (
            <Badge className="uppercase bg-emerald-500">{status}</Badge>
          );
          break;

        default:
          break;
      }

      return renderedStatus;
    },
    filterFn: (row, columnId, filterValue) => {
      const cellValue = row.getValue(columnId);
      // Check for exact match
      return filterValue.includes(cellValue);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ViewReviewsDropdownItem id={product._id as string} />
            <DropdownMenuSeparator />
            <DeleteProductDropdownItem id={product._id as string} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
