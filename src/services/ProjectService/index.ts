/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse, IQueryParam } from "@/types";
import { IProject, IUpdateProjectFormData } from "@/types/project.type";

export const getAllProjects = async (params?: IQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      params.forEach((item) => {
        queryParams.append(item.name, item.value as string);
      });
    }

    const { data } = await axiosInstance.get<IApiResponse<IProject[]>>(
      "/projects",
      { params: queryParams }
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;
      const statusCode = error.response.status;

      console.error(`API Error (${statusCode}):`, responseData);

      return {
        ...responseData,
        statusCode,
      };
    }

    throw new Error(
      error.message || "Something went wrong. Please try again later."
    );
  }
};

export const getProjectById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IProject>>(
      `/projects/${id}`
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;
      const statusCode = error.response.status;

      console.error(`API Error (${statusCode}):`, responseData);

      return {
        ...responseData,
        statusCode,
      };
    }

    throw new Error(
      error.message || "Something went wrong. Please try again later."
    );
  }
};

export const createProject = async (projectData: FormData) => {
  try {
    const { data } = await axiosInstance.post<IApiResponse<IProject>>(
      "/projects",
      projectData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;
      const statusCode = error.response.status;

      console.error(`API Error (${statusCode}):`, responseData);

      return {
        ...responseData,
        statusCode,
      };
    }

    throw new Error(
      error.message || "Something went wrong. Please try again later."
    );
  }
};

export const updateProject = async (projectData: IUpdateProjectFormData) => {
  try {
    const { data } = await axiosInstance.put<IApiResponse<IProject>>(
      `/projects/${projectData.id}`,
      projectData.formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;
      const statusCode = error.response.status;

      console.error(`API Error (${statusCode}):`, responseData);

      return {
        ...responseData,
        statusCode,
      };
    }

    throw new Error(
      error.message || "Something went wrong. Please try again later."
    );
  }
};

export const deleteProject = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponse<IProject>>(
      `/projects/${id}`
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;
      const statusCode = error.response.status;

      console.error(`API Error (${statusCode}):`, responseData);

      return {
        ...responseData,
        statusCode,
      };
    }

    throw new Error(
      error.message || "Something went wrong. Please try again later."
    );
  }
};
