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
  ListTodo,
  Logs,
  type LucideIcon,
  Store,
  Users,
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
    url: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Product Categories",
    url: "/admin-dashboard/product-categories",
    icon: ListTodo,
  },
  {
    title: "Users",
    url: "/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Shops",
    url: "/admin-dashboard/shops",
    icon: Store,
  },
  {
    title: "Products",
    url: "/admin-dashboard/products",
    icon: Boxes,
  },
  {
    title: "Payments",
    url: "/admin-dashboard/payments",
    icon: CircleDollarSign,
  },
  {
    title: "Orders",
    url: "/admin-dashboard/orders",
    icon: Logs,
  },
  {
    title: "Coupons",
    url: "/admin-dashboard/coupons",
    icon: Gem,
  },
];

export function AdminDashboardSidebarMenu() {
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
