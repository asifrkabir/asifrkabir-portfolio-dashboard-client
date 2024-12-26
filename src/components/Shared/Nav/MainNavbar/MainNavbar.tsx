import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./MainNavbar.module.css";

export default function MainNavbar() {
  return (
    <div className="hidden md:flex">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image src={logo} alt="logo" width={40} height={40} priority />
      </Link>
      <nav className="flex items-center gap-3 lg:gap-4 ml-8">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/sale" className={styles.animatedGradientText}>
          Flash Sale!
        </Link>
        <Link href="/orders">My Orders</Link>
        <Link href="/recent-products">Recently Viewed</Link>
      </nav>
    </div>
  );
}
