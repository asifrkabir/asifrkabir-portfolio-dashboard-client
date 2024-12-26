/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import {
  IApiResponse,
  ICreatePayment,
  IPayment,
  IPaymentIntent,
  IQueryParam,
} from "@/types";

export const createPaymentIntent = async (
  paymentIntentData: IPaymentIntent
) => {
  try {
    const { data } = await axiosInstance.post(
      "/payments/create-payment-intent",
      paymentIntentData
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

export const createPayment = async (paymentData: ICreatePayment) => {
  try {
    const { data } = await axiosInstance.post<IApiResponse<IPayment>>(
      "/payments",
      paymentData
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

export const getAllPayments = async (params?: IQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      params.forEach((item) => {
        queryParams.append(item.name, item.value as string);
      });
    }

    const { data } = await axiosInstance.get<IApiResponse<IPayment[]>>(
      "/payments",
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

export const getTotalRevenue = async (params?: IQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      params.forEach((item) => {
        queryParams.append(item.name, item.value as string);
      });
    }

    const { data } = await axiosInstance.get<IApiResponse<number>>(
      "/payments/total-revenue",
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
