"use client";

import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { AdminDashboardSidebarMenu } from "./AdminDashboardSidebarMenu";

const AdminDashboardSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <AdminDashboardSidebarMenu />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminDashboardSidebar;
