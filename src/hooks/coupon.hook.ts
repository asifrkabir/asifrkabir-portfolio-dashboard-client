/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponByCodeAndShop,
  getCouponById,
  updateCoupon,
} from "@/services/CouponService";
import {
  IApiResponse,
  ICheckCoupon,
  ICoupon,
  ICreateCoupon,
  IQueryParam,
  IUpdateCoupon,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

export const getAllCouponsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["COUPONS", params],
  queryFn: async () => await getAllCoupons(params),
});

export const useGetAllCoupons = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllCouponsQuery(params),
  });
};

export const getCouponByIdQuery = (id: string) => ({
  queryKey: ["COUPON", id],
  queryFn: async () => await getCouponById(id),
});

export const useGetCouponById = (id: string) => {
  return useQuery({
    ...getCouponByIdQuery(id),
  });
};

export const getCouponByCodeAndShopQuery = (payload: ICheckCoupon) => ({
  queryKey: ["COUPON", payload.code, payload.shopId],
  queryFn: async () => await getCouponByCodeAndShop(payload),
});

export const useGetCouponByCodeAndShop = (payload: ICheckCoupon) => {
  return useQuery({
    ...getCouponByCodeAndShopQuery(payload),
  });
};

export const useCreateCoupon = () => {
  return useMutation<any, Error, ICreateCoupon>({
    mutationFn: createCoupon,
  });
};

export const useUpdateCoupon = () => {
  return useMutation<any, Error, IUpdateCoupon>({
    mutationFn: updateCoupon,
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteCoupon,
    onSuccess: (res: IApiResponse<ICoupon>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Coupon deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["COUPONS"],
        });
      } else {
        console.error(res);
        toast.error(
          res.message || "Failed to delete coupon. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.message || "Failed to delete coupon. Please try again."
      );
    },
  });
};
