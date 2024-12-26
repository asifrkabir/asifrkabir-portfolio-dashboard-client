/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSkill,
  deleteSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
} from "@/services/SkillService";
import {
  IApiResponse,
  IQueryParam,
  ISkill,
  IUpdateSkillFormData,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

export const getAllSkillsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["SKILLS", params],
  queryFn: async () => await getAllSkills(params),
});

export const useGetAllSkills = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllSkillsQuery(params),
  });
};

export const getSkillByIdQuery = (id: string) => ({
  queryKey: ["SKILL", id],
  queryFn: async () => await getSkillById(id),
});

export const useGetSkillById = (id: string) => {
  return useQuery({
    ...getSkillByIdQuery(id),
  });
};

export const useCreateSkill = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: createSkill,
  });
};

export const useUpdateSkill = () => {
  return useMutation<any, Error, IUpdateSkillFormData>({
    mutationFn: updateSkill,
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteSkill,
    onSuccess: (res: IApiResponse<ISkill>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Skill deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["SKILLS"],
        });
      } else {
        console.error(res);
        toast.error(res.message || "Failed to delete skill. Please try again.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to delete skill. Please try again.");
    },
  });
};
