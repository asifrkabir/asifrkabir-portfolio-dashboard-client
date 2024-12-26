/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createShop,
  deleteShop,
  getAllShops,
  getShopById,
  getShopByOwnerId,
  toggleShopBlacklistStatus,
  updateShop,
} from "@/services/ShopService";
import { IQueryParam, IToggleShopBlacklistStatus, IUpdateShop } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getAllShopsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["SHOPS", params],
  queryFn: async () => await getAllShops(params),
});

export const useGetAllShops = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllShopsQuery(params),
  });
};

export const getShopByIdQuery = (id: string) => ({
  queryKey: ["SHOP", id],
  queryFn: async () => await getShopById(id),
});

export const useGetShopById = (id: string) => {
  return useQuery({
    ...getShopByIdQuery(id),
  });
};

export const useCreateShop = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: createShop,
  });
};

export const useUpdateShop = () => {
  return useMutation<any, Error, IUpdateShop>({
    mutationFn: updateShop,
  });
};

export const useDeleteShop = () => {
  return useMutation<any, Error, string>({
    mutationFn: deleteShop,
  });
};

export const useToggleShopBlacklistStatus = () => {
  return useMutation<any, Error, IToggleShopBlacklistStatus>({
    mutationFn: toggleShopBlacklistStatus,
  });
};

export const getShopByOwnerIdQuery = () => ({
  queryKey: ["SHOP_BY_OWNER"],
  queryFn: async () => await getShopByOwnerId(),
});

export const useGetShopByOwnerId = () => {
  return useQuery({
    ...getShopByOwnerIdQuery(),
    staleTime: 5 * 60 * 1000,
  });
};
