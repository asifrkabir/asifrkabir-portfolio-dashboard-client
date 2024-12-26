/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
} from "@/services/ExperienceService";
import {
  IApiResponse,
  ICreateExperience,
  IExperience,
  IQueryParam,
  IUpdateExperience,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

export const getAllExperiencesQuery = (params?: IQueryParam[]) => ({
  queryKey: ["EXPERIENCES", params],
  queryFn: async () => await getAllExperiences(params),
});

export const useGetAllExperiences = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllExperiencesQuery(params),
  });
};

export const getExperienceByIdQuery = (id: string) => ({
  queryKey: ["EXPERIENCE", id],
  queryFn: async () => await getExperienceById(id),
});

export const useGetExperienceById = (id: string) => {
  return useQuery({
    ...getExperienceByIdQuery(id),
  });
};

export const useCreateExperience = () => {
  return useMutation<any, Error, ICreateExperience>({
    mutationFn: createExperience,
  });
};

export const useUpdateExperience = () => {
  return useMutation<any, Error, IUpdateExperience>({
    mutationFn: updateExperience,
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteExperience,
    onSuccess: (res: IApiResponse<IExperience>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Experience deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["EXPERIENCES"],
        });
      } else {
        console.error(res);
        toast.error(
          res.message || "Failed to delete experience. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.message || "Failed to delete experience. Please try again."
      );
    },
  });
};
