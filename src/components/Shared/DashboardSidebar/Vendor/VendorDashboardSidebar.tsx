"use client";

import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { VendorDashboardSidebarMenu } from "./VendorDashboardSidebarMenu";

const VendorDashboardSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <VendorDashboardSidebarMenu />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default VendorDashboardSidebar;
