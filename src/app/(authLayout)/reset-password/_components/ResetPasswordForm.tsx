"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useResetPassword } from "@/hooks/auth.hook";
import { resetPasswordValidationSchema } from "@/schemas/auth.schema";
import { IApiResponse } from "@/types";
import { IResetPassword } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const { mutate: resetPassword, isPending } = useResetPassword();
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!id || !token) {
      toast.error("Invalid reset link. Please request a new one.");
      return;
    }

    const resetPasswordData: IResetPassword = {
      token,
      payload: {
        id,
        newPassword: data.newPassword,
      },
    };

    resetPassword(resetPasswordData, {
      onSuccess: (res: IApiResponse<null>) => {
        if (res.statusCode === httpStatus.OK) {
          setIsSuccess(true);
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to reset password. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to reset password. Please try again."
        );
      },
    });
  };

  return (
    <>
      <Card className="mx-auto max-w-lg w-full m-4">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            {!isSuccess
              ? "Please set a new secured password for your account."
              : null}
          </CardDescription>
        </CardHeader>

        {!isSuccess ? (
          <div className="p-6">
            <AppForm
              onSubmit={handleSubmit}
              resolver={zodResolver(resetPasswordValidationSchema)}
            >
              <AppInput
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                required
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </AppForm>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-lg font-semibold">
              Your password has been reset successfully.
            </p>
            <p className="text-sm mt-2">
              Please{" "}
              <Link href="/login" className="underline">
                login
              </Link>{" "}
              with your new password.
            </p>
          </div>
        )}
      </Card>
    </>
  );
}
