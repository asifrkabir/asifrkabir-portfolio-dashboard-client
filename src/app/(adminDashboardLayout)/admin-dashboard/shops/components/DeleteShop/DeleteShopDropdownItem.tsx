import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

const DeleteShopDropdownItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  return (
    <DropdownMenuItem
      className="text-red-500"
      {...props}
      ref={ref}
      onSelect={(e) => {
        e.preventDefault();
      }}
    >
      Delete
    </DropdownMenuItem>
  );
});

DeleteShopDropdownItem.displayName = "DeleteShopDropdownItem";

export default DeleteShopDropdownItem;
