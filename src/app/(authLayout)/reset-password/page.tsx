import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "./_components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Suspense fallback={<LoadingSpinner />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ForgotPasswordPage;
