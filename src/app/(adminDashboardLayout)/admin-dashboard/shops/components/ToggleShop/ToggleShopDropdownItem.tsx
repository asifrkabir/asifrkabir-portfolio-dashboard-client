import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

const ToggleShopDropdownItem = React.forwardRef<
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
      Toggle Blacklist Status
    </DropdownMenuItem>
  );
});

ToggleShopDropdownItem.displayName = "ToggleShopDropdownItem";

export default ToggleShopDropdownItem;
