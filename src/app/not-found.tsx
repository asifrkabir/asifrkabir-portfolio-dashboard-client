"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../assets/images/logo.png";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image src={logo} alt="Cat's Paw" width={100} height={100} />
      <h1 className="text-6xl font-bold mt-4">404</h1>
      <p className="mt-4 text-xl">Oops! This page does not seem to exist.</p>
      <p className="mt-2 text-lg">
        Looks like you&apos;ve taken a wrong turn; don&apos;t worry, it happens
        to the best of us!
      </p>
      <div className="mt-8 space-x-4">
        <Button onClick={handleGoBack}>Go Back</Button>
        <Button onClick={handleGoHome}>Go Home</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
