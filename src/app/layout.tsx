import { Providers } from "@/lib/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | ShopSphere",
    default: "ShopSphere",
  },
  description:
    "ShopSphere is your go-to e-commerce platform for discovering and purchasing high-quality products from trusted shops. Enjoy seamless shopping with personalized recommendations, secure payments, and a user-friendly experience tailored for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
