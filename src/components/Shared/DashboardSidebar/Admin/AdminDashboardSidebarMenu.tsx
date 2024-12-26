"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ListTodo,
  type LucideIcon,
  Newspaper,
  Presentation,
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
    title: "Dashboard",
    url: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Experiences",
    url: "/admin-dashboard/experiences",
    icon: ListTodo,
  },
  {
    title: "Skills",
    url: "/admin-dashboard/skills",
    icon: ListTodo,
  },
  {
    title: "Projects",
    url: "/admin-dashboard/projects",
    icon: Presentation,
  },
  {
    title: "Blogs",
    url: "/admin-dashboard/blogs",
    icon: Newspaper,
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
