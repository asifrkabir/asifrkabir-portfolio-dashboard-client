import logo from "@/assets/images/logo.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MainMobileNavbar.module.css";

export default function MainMobileNavbar() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Nav</SheetTitle>
            <SheetDescription>Nav</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>

        <SheetContent side="left">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Image src={logo} alt="logo" width={40} height={40} priority />
          </Link>
          <nav className="flex flex-col gap-3 lg:gap-4 mt-6">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/sale" className={styles.animatedGradientText}>
              Flash Sale!
            </Link>
            <Link href="/orders">My Orders</Link>
            <Link href="/recent-products">Recently Viewed</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
