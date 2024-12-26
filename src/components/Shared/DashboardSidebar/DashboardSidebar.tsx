"use client";

import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { DashboardSidebarMenu } from "./DashboardSidebarMenu";

const DashboardSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <DashboardSidebarMenu />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
