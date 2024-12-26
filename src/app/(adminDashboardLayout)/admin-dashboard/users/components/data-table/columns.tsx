import { DataTableColumnHeader } from "@/components/Shared/DataTable/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import DeleteUserDropdownItem from "../DeleteUser/DeleteUserDropdownItem";
import ToggleUserSuspendDropdownItem from "../ToggleUserSuspend/ToggleUserSuspendDropdownItem";

export const columns: ColumnDef<IUser>[] = [
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[150px]">{row.getValue("email")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role");
      let renderedRole = (
        <div className="flex space-x-2">
          <span className="w-[150px]">{row.getValue("role")}</span>
        </div>
      );

      switch (role) {
        case "admin":
          renderedRole = <Badge className="uppercase bg-red-500">{role}</Badge>;
          break;
        case "vendor":
          renderedRole = (
            <Badge className="uppercase bg-blue-500">{role}</Badge>
          );
          break;
        case "user":
          renderedRole = (
            <Badge className="uppercase bg-emerald-500">{role}</Badge>
          );
          break;

        default:
          break;
      }

      return renderedRole;
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
    accessorKey: "isSuspended",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isSuspended = row.getValue("isSuspended");
      let renderedRole = (
        <div className="flex space-x-2">
          <span className="w-[150px]">{row.getValue("isSuspended")}</span>
        </div>
      );

      switch (isSuspended) {
        case true:
          renderedRole = (
            <Badge className="uppercase bg-red-500">Suspended</Badge>
          );
          break;
        case false:
          renderedRole = (
            <Badge className="uppercase bg-emerald-500">Active</Badge>
          );
          break;

        default:
          break;
      }

      return renderedRole;
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
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ToggleUserSuspendDropdownItem
              id={user._id as string}
              isSuspended={user?.isSuspended as boolean}
            />
            <DropdownMenuSeparator />
            <DeleteUserDropdownItem id={user._id as string} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
