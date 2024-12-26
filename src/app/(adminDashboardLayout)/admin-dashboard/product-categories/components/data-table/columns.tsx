import { DataTableColumnHeader } from "@/components/Shared/DataTable/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IProductCategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import DeleteProductCategoryDropdownItem from "../DeleteProductCategory/DeleteProductCategoryDropdownItem";
import { UpdateProductCategoryModal } from "../UpdateProductCategory/UpdateProductCategoryModal";

export const columns: ColumnDef<IProductCategory>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("_id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const productCategory = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <UpdateProductCategoryModal id={productCategory._id} />
            <DropdownMenuSeparator />
            <DeleteProductCategoryDropdownItem id={productCategory._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
