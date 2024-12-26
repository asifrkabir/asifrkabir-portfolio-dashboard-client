import { ListTodo, type LucideIcon, Users } from "lucide-react";

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

export const adminDashboardMenuItems: IMenuItem[] = [
  {
    title: "Categories",
    url: "/admin-dashboard/categories",
    icon: ListTodo,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
];
