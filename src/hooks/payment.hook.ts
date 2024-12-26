/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createPayment,
  createPaymentIntent,
  getAllPayments,
  getTotalRevenue,
} from "@/services/PaymentService";
import { ICreatePayment, IPaymentIntent, IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreatePaymentIntent = () => {
  return useMutation<any, Error, IPaymentIntent>({
    mutationFn: createPaymentIntent,
  });
};

export const useCreatePayment = () => {
  return useMutation<any, Error, ICreatePayment>({
    mutationFn: createPayment,
  });
};

export const getAllPaymentsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PAYMENTS", params],
  queryFn: async () => await getAllPayments(params),
});

export const useGetAllPayments = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllPaymentsQuery(params),
  });
};

export const getTotalRevenueQuery = (params?: IQueryParam[]) => ({
  queryKey: ["TOTAL_REVENUE", params],
  queryFn: async () => await getTotalRevenue(params),
});

export const useGetTotalRevenue = (params?: IQueryParam[]) => {
  return useQuery({
    ...getTotalRevenueQuery(params),
  });
};
