"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IMenuItem {
  item: {
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
  };
}

const DashboardSidebarMenuItemSingle = ({ item }: IMenuItem) => {
  const pathname = usePathname();

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        tooltip={item.title}
        asChild
        isActive={item.url === pathname}
      >
        <Link href={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default DashboardSidebarMenuItemSingle;
