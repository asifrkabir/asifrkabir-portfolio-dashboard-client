import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

const UpdateProductCategoryDropdownItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  return (
    <DropdownMenuItem
      {...props}
      ref={ref}
      onSelect={(e) => {
        e.preventDefault();
      }}
    >
      Edit
    </DropdownMenuItem>
  );
});

UpdateProductCategoryDropdownItem.displayName =
  "UpdateProductCategoryDropdownItem";

export default UpdateProductCategoryDropdownItem;
