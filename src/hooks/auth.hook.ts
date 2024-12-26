/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  changePassword,
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../services/AuthService";
import {
  IChangePassword,
  IForgotPassword,
  IResetPassword,
} from "@/types/auth.type";

export const useUserRegistration = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: registerUser,
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationFn: loginUser,
  });
};

export const useForgotPassword = () => {
  return useMutation<any, Error, IForgotPassword>({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, IResetPassword>({
    mutationFn: resetPassword,
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, IChangePassword>({
    mutationFn: changePassword,
  });
};
