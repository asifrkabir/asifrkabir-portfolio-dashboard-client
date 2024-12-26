import { CartModal } from "@/components/cart/CartModal";
import { DarkModeToggle } from "../../DarkModeToggle/DarkModeToggle";
import NavbarUser from "../../NavbarUser/NavbarUser";
import MainMobileNavbar from "../MainMobileNavbar/MainMobileNavbar";
import MainNavbar from "../MainNavbar/MainNavbar";

export default function MainHeader() {
  return (
    <header className="sticky z-10 top-0 w-full border-b bg-background px-4">
      <div className="h-14 flex items-center">
        {/* Desktop */}
        <MainNavbar />

        {/* Mobile */}
        <MainMobileNavbar />

        {/* Desktop & mobile */}
        <div className="flex items-center justify-end flex-1 gap-2">
          <CartModal />
          <DarkModeToggle />
          <NavbarUser />
        </div>
      </div>
    </header>
  );
}
