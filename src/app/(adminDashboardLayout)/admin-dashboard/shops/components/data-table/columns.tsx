import { DataTableColumnHeader } from "@/components/Shared/DataTable/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IShop } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { DeleteShopModal } from "../DeleteShop/DeleteShopModal";
import { ToggleShopModal } from "../ToggleShop/ToggleShopModal";

export const columns: ColumnDef<IShop>[] = [
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
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor" />
    ),
    cell: ({ row }) => {
      const owner = row.original.owner;
      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{owner?.name || "Unknown"}</span>{" "}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "isBlacklisted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isBlacklisted = row.getValue("isBlacklisted");

      return isBlacklisted === true ? (
        <Badge className="uppercase bg-red-500">Blacklisted</Badge>
      ) : (
        <Badge className="uppercase bg-emerald-500">Active</Badge>
      );
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
      const shop = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ToggleShopModal id={shop._id} isBlacklisted={shop.isBlacklisted} />
            <DropdownMenuSeparator />
            <DeleteShopModal id={shop._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
