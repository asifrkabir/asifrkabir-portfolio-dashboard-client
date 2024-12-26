import DashboardNavbar from "@/components/Shared/DashboardNavbar/DashboardNavbar";
import AdminDashboardSidebar from "@/components/Shared/DashboardSidebar/Admin/AdminDashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AdminDashboardSidebar />
        <main className="w-full">
          <DashboardNavbar />
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
