import { SidebarTrigger } from "@/components/ui/sidebar";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";
import NavbarUser from "../NavbarUser/NavbarUser";

const DashboardNavbar = () => {
  return (
    <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-1">
      <div className="w-full flex-1">
        <SidebarTrigger />
      </div>
      <DarkModeToggle />
      <NavbarUser />
    </header>
  );
};

export default DashboardNavbar;
