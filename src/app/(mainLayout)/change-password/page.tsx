import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import { Metadata } from "next";
import { Suspense } from "react";
import { ChangePasswordForm } from "./_components/ChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password",
};

const ChangePasswordPage = () => {
  return (
    <div className="mt-32 flex justify-center items-center">
      <Suspense fallback={<LoadingSpinner />}>
        <ChangePasswordForm />
      </Suspense>
    </div>
  );
};

export default ChangePasswordPage;
