"use client";

import Link from "next/link";

import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
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
import { useUserLogin } from "@/hooks/auth.hook";
import { loginValidationSchema } from "@/schemas/auth.schema";
import { IApiResponse } from "@/types";
import { ILoginResponse } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import httpStatus from "http-status";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setIsLoading: setUserLoading } = useUser();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending } = useUserLogin();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data, {
      onSuccess: (res: IApiResponse<ILoginResponse>) => {
        if (res.statusCode === httpStatus.OK) {
          setLoginSuccess(true);
          setUserLoading(true);

          toast.success("Login successful!");
        } else {
          setLoginSuccess(false);

          toast.error(res.message);
        }
      },
      onError: (error) => {
        setLoginSuccess(false);

        toast.error(error.message || "Login failed. Please try again.");
      },
    });
  };

  useEffect(() => {
    if (!isPending && loginSuccess && user) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/admin-dashboard");
      }
    }
  }, [isPending, loginSuccess, redirect, router, user]);

  return (
    <>
      {isPending && <LoadingSpinner />}
      <Card className="mx-auto max-w-lg w-full m-4">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <AppForm
              onSubmit={handleSubmit}
              resolver={zodResolver(loginValidationSchema)}
            >
              <AppInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />

              <div className="mb-4">
                <AppInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />

                <Link href="/forgot-password" className="underline text-sm">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </AppForm>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
