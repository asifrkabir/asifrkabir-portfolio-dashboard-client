/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getTotalOrders,
  getWeeklySales,
} from "@/services/OrderService";
import { ICreateOrder, IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getOrderByIdQuery = (id: string) => ({
  queryKey: ["ORDER", id],
  queryFn: async () => await getOrderById(id),
});

export const useGetOrderById = (id: string) => {
  return useQuery({
    ...getOrderByIdQuery(id),
  });
};

export const getAllOrdersQuery = (params?: IQueryParam[]) => ({
  queryKey: ["ORDERS", params],
  queryFn: async () => await getAllOrders(params),
});

export const useGetAllOrders = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllOrdersQuery(params),
  });
};

export const useCreateOrder = () => {
  return useMutation<any, Error, ICreateOrder>({
    mutationFn: createOrder,
  });
};

export const getTotalOrdersQuery = (params?: IQueryParam[]) => ({
  queryKey: ["TOTAL_ORDERS", params],
  queryFn: async () => await getTotalOrders(params),
});

export const useGetTotalOrders = (params?: IQueryParam[]) => {
  return useQuery({
    ...getTotalOrdersQuery(params),
  });
};

export const getWeeklySalesQuery = (params?: IQueryParam[]) => ({
  queryKey: ["WEEKLY_SALES", params],
  queryFn: async () => await getWeeklySales(params),
});

export const useGetWeeklySales = (params?: IQueryParam[]) => {
  return useQuery({
    ...getWeeklySalesQuery(params),
  });
};
