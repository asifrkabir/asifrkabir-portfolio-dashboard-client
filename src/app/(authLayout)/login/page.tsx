import { Metadata } from "next";
import { LoginForm } from "./components/LoginForm";
import { Suspense } from "react";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Suspense fallback={<LoadingSpinner />}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
