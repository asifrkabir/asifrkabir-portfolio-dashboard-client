"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  Boxes,
  CircleDollarSign,
  Gem,
  House,
  LayoutDashboard,
  Logs,
  type LucideIcon,
  Store,
} from "lucide-react";
import DashboardSidebarMenuItemDropdown from "../DashboardSidebarMenuItemDropdown";
import DashboardSidebarMenuItemSingle from "../DashboardSidebarMenuItemSingle";

interface IMenuItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}

const items: IMenuItem[] = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Dashboard",
    url: "/vendor-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Shop",
    url: "/vendor-dashboard/shop",
    icon: Store,
  },
  {
    title: "Products",
    url: "/vendor-dashboard/products",
    icon: Boxes,
  },
  {
    title: "Payments",
    url: "/vendor-dashboard/payments",
    icon: CircleDollarSign,
  },
  {
    title: "Orders",
    url: "/vendor-dashboard/orders",
    icon: Logs,
  },
  {
    title: "Coupons",
    url: "/vendor-dashboard/coupons",
    icon: Gem,
  },
];

export function VendorDashboardSidebarMenu() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? (
            <DashboardSidebarMenuItemDropdown key={item.title} item={item} />
          ) : (
            <DashboardSidebarMenuItemSingle key={item.title} item={item} />
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
