"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  CircleDollarSign,
  Landmark,
  LayoutDashboard,
  ListTodo,
  type LucideIcon,
  TestTubeDiagonal,
  Users,
} from "lucide-react";
import DashboardSidebarMenuItemDropdown from "./DashboardSidebarMenuItemDropdown";
import DashboardSidebarMenuItemSingle from "./DashboardSidebarMenuItemSingle";

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
    title: "Todos",
    url: "/todos",
    icon: ListTodo,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,

    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
      },
      {
        title: "Test",
        url: "/dashboard/test",
        icon: TestTubeDiagonal,
      },
    ],
  },
  {
    title: "Payments",
    url: "/payments",
    icon: CircleDollarSign,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: Landmark,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
];

export function DashboardSidebarMenu() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Todos</SidebarGroupLabel>
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
