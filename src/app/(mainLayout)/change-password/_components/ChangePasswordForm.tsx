"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/user.provider";
import { useChangePassword } from "@/hooks/auth.hook";
import { changePasswordValidationSchema } from "@/schemas/auth.schema";
import { logout } from "@/services/AuthService";
import { IApiResponse } from "@/types";
import { IChangePassword } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function ChangePasswordForm() {
  const { mutate: changePassword, isPending } = useChangePassword();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isLoading: isUserLoading, setIsLoading: setUserLoading } = useUser();

  // Track if logout is in progress
  const [isLogoutInitiated, setIsLogoutInitiated] = useState(false);

  const handleLogout = () => {
    logout(); // Perform logout
    setUserLoading(true);
    setIsLogoutInitiated(true); // Indicate logout process has started

    // Clear local storage and cache
    localStorage.setItem("cart", "");
    localStorage.setItem("recentProducts", "");
    queryClient.clear();
  };

  // Observe `isUserLoading` and redirect to login only if logout has started
  useEffect(() => {
    if (isLogoutInitiated && !isUserLoading) {
      router.push("/login");
    }
  }, [isLogoutInitiated, isUserLoading, router]);

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const changePasswordData: IChangePassword = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    changePassword(changePasswordData, {
      onSuccess: (res: IApiResponse<null>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success(
            "Password changed successfully. Please login with new password"
          );

          handleLogout();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to change password. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to change password. Please try again."
        );
      },
    });
  };

  return (
    <>
      <Card className="mx-auto max-w-lg w-full m-4">
        <CardHeader>
          <CardTitle className="text-2xl">Change Password</CardTitle>
          <CardDescription>Enter old and new password</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <AppForm
              onSubmit={handleSubmit}
              resolver={zodResolver(changePasswordValidationSchema)}
            >
              <AppInput
                label="Old Password"
                name="oldPassword"
                type="password"
                placeholder="Enter your old password"
                required
              />

              <AppInput
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                required
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </AppForm>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
