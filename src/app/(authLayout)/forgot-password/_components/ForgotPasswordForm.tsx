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
import { useForgotPassword } from "@/hooks/auth.hook";
import { forgotPasswordValidationSchema } from "@/schemas/auth.schema";
import { IApiResponse } from "@/types";
import { IForgotPassword } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const forgotPasswordData: IForgotPassword = {
      email: data.email,
    };

    forgotPassword(forgotPasswordData, {
      onSuccess: (res: IApiResponse<null>) => {
        if (res.statusCode === httpStatus.OK) {
          setIsSuccess(true);
        } else {
          console.error(res);
          toast.error(
            res.message ||
              "Failed to submit forgot password request. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message ||
            "Failed to submit forgot password request. Please try again."
        );
      },
    });
  };

  return (
    <>
      <Card className="mx-auto max-w-lg w-full m-4">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            {!isSuccess
              ? "Enter your email associated with this account to receive a reset password link."
              : null}
          </CardDescription>
        </CardHeader>

        {!isSuccess ? (
          <div className="p-6">
            <AppForm
              onSubmit={handleSubmit}
              resolver={zodResolver(forgotPasswordValidationSchema)}
            >
              <AppInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
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
              A password reset link has been sent to your email.
            </p>
            <p className="text-sm mt-2">
              Please check your inbox and follow the instructions to reset your
              password. If you don&apos;t see the email, check your spam folder.
            </p>
          </div>
        )}
      </Card>
    </>
  );
}
