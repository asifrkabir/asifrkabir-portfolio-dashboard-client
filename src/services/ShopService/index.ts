/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import {
  IApiResponse,
  IQueryParam,
  IShop,
  IToggleShopBlacklistStatus,
  IUpdateShop,
} from "@/types";

export const getAllShops = async (params?: IQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      params.forEach((item) => {
        queryParams.append(item.name, item.value as string);
      });
    }

    const { data } = await axiosInstance.get<IApiResponse<IShop[]>>("/shops", {
      params: queryParams,
    });

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

export const getShopById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IShop>>(
      `/shops/${id}`
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

export const createShop = async (shopData: FormData) => {
  try {
    const { data } = await axiosInstance.post<IApiResponse<IShop>>(
      "/shops",
      shopData,
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

export const updateShop = async (shopData: IUpdateShop) => {
  try {
    const { data } = await axiosInstance.put<IApiResponse<IShop>>(
      `/shops/${shopData.id}`,
      shopData.formData,
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

export const deleteShop = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponse<IShop>>(
      `/shops/${id}`
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

export const toggleShopBlacklistStatus = async (
  postData: IToggleShopBlacklistStatus
) => {
  try {
    const { data } = await axiosInstance.patch<IApiResponse<IShop>>(
      `/shops/blacklist/${postData.id}`,
      postData.payload
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

export const getShopByOwnerId = async () => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IShop>>(
      `/shops/by-owner`
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
