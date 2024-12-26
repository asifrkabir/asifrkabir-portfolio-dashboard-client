/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "@/services/ProjectService";
import { IApiResponse, IQueryParam } from "@/types";
import { IProject, IUpdateProjectFormData } from "@/types/project.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

export const getAllProjectsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PROJECTS", params],
  queryFn: async () => await getAllProjects(params),
});

export const useGetAllProjects = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllProjectsQuery(params),
  });
};

export const getProjectByIdQuery = (id: string) => ({
  queryKey: ["PROJECT", id],
  queryFn: async () => await getProjectById(id),
});

export const useGetProjectById = (id: string) => {
  return useQuery({
    ...getProjectByIdQuery(id),
  });
};

export const useCreateProject = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: createProject,
  });
};

export const useUpdateProject = () => {
  return useMutation<any, Error, IUpdateProjectFormData>({
    mutationFn: updateProject,
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteProject,
    onSuccess: (res: IApiResponse<IProject>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Project deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["PROJECTS"],
        });
      } else {
        console.error(res);
        toast.error(
          res.message || "Failed to delete Project. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.message || "Failed to delete Project. Please try again."
      );
    },
  });
};
