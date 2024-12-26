import { DataTableColumnHeader } from "@/components/Shared/DataTable/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICoupon } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import DeleteCouponDropdownItem from "../DeleteCoupon/DeleteCouponDropdownItem";

export const columns: ColumnDef<ICoupon>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{row.getValue("code")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "discountPercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount Percentage" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">
            {row.getValue("discountPercentage")}
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
      const coupon = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DeleteCouponDropdownItem id={coupon._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
