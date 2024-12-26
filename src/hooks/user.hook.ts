/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteUser,
  getAllUsers,
  getTotalUsers,
  toggleUserSuspend,
} from "@/services/UserService";
import { IApiResponse, IQueryParam, ISuspendUserToggle, IUser } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

export const getAllUsersQuery = (params?: IQueryParam[]) => ({
  queryKey: ["USERS", params],
  queryFn: async () => await getAllUsers(params),
});

export const useGetAllUsers = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllUsersQuery(params),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteUser,
    onSuccess: (res: IApiResponse<IUser>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("User deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["USERS"],
        });
      } else {
        console.error(res);
        toast.error(res.message || "Failed to delete User. Please try again.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to delete User. Please try again.");
    },
  });
};

export const useToggleUserSuspend = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, ISuspendUserToggle>({
    mutationFn: toggleUserSuspend,
    onSuccess: (res: IApiResponse<IUser>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("User status updated successfully");

        queryClient.invalidateQueries({
          queryKey: ["USERS"],
        });
      } else {
        console.error(res);
        toast.error(
          res.message || "Failed to update user status. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.message || "Failed to update user status. Please try again."
      );
    },
  });
};

export const getTotalUsersQuery = (params?: IQueryParam[]) => ({
  queryKey: ["TOTAL_USERS", params],
  queryFn: async () => await getTotalUsers(params),
});

export const useGetTotalUsers = (params?: IQueryParam[]) => {
  return useQuery({
    ...getTotalUsersQuery(params),
  });
};
