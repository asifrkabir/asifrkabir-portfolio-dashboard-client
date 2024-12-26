/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  checkIfUserFollowsShop,
  follow,
  unfollow,
} from "@/services/FollowService";
import { ICreateFollow, ICreateUnfollow } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const checkIfUserFollowsShopQuery = (shopId: string) => ({
  queryKey: ["FOLLOW", shopId],
  queryFn: async () => await checkIfUserFollowsShop(shopId),
});

export const useCheckIfUserFollowsShop = (shopId: string) => {
  return useQuery({
    ...checkIfUserFollowsShopQuery(shopId),
  });
};

export const useFollow = () => {
  return useMutation<any, Error, ICreateFollow>({
    mutationFn: follow,
  });
};

export const useUnfollow = () => {
  return useMutation<any, Error, ICreateUnfollow>({
    mutationFn: unfollow,
  });
};
