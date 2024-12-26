/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "@/services/BlogService";
import { IApiResponse, IQueryParam } from "@/types";
import { IBlog, IUpdateBlogFormData } from "@/types/blog.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

export const getAllBlogsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["BLOGS", params],
  queryFn: async () => await getAllBlogs(params),
});

export const useGetAllBlogs = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllBlogsQuery(params),
  });
};

export const getBlogByIdQuery = (id: string) => ({
  queryKey: ["BLOG", id],
  queryFn: async () => await getBlogById(id),
});

export const useGetBlogById = (id: string) => {
  return useQuery({
    ...getBlogByIdQuery(id),
  });
};

export const useCreateBlog = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: createBlog,
  });
};

export const useUpdateBlog = () => {
  return useMutation<any, Error, IUpdateBlogFormData>({
    mutationFn: updateBlog,
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteBlog,
    onSuccess: (res: IApiResponse<IBlog>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Blog deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["BLOGS"],
        });
      } else {
        console.error(res);
        toast.error(res.message || "Failed to delete blog. Please try again.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to delete blog. Please try again.");
    },
  });
};
