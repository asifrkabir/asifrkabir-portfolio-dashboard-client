import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumns?: string[];
}

export function ProductCategoryDataTableToolbar<TData>({
  table,
  searchColumns = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {searchColumns.map((item, idx) => (
          <Input
            key={idx}
            placeholder={`Filter ${item}...`}
            value={(table.getColumn(item)?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn(item)?.setFilterValue(event.target.value);
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}
      </div>
    </div>
  );
}
