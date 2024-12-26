/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsForFeed,
  getProductById,
  updateProduct,
} from "@/services/ProductService";
import { IApiResponse, IProduct, IQueryParam, IUpdateProduct } from "@/types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

export const getAllProductsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PRODUCTS", params],
  queryFn: async () => await getAllProducts(params),
});

export const useGetAllProducts = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllProductsQuery(params),
  });
};

export const getAllProductsForFeedQuery = (params?: IQueryParam[]) => ({
  queryKey: ["PRODUCTS", params],
  queryFn: async () => await getAllProductsForFeed(params),
});

export const useGetAllProductsForFeed = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllProductsForFeedQuery(params),
  });
};

export const getProductByIdQuery = (id: string) => ({
  queryKey: ["PRODUCT", id],
  queryFn: async () => await getProductById(id),
});

export const useGetProductById = (id: string) => {
  return useQuery({
    ...getProductByIdQuery(id),
  });
};

export const useCreateProduct = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: createProduct,
  });
};

export const useUpdateProduct = () => {
  return useMutation<any, Error, IUpdateProduct>({
    mutationFn: updateProduct,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteProduct,
    onSuccess: (res: IApiResponse<IProduct>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Product deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["PRODUCTS"],
        });
      } else {
        console.error(res);
        toast.error(
          res.message || "Failed to delete product. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.message || "Failed to delete product. Please try again."
      );
    },
  });
};

export const getAllProductsForFeedInfiniteQuery = (
  params: IQueryParam[] = []
) => ({
  queryKey: ["PRODUCTS_FEED", params],
  queryFn: async ({ pageParam = 1 }) => {
    const paginationParams = [...params, { name: "page", value: pageParam }];
    return await getAllProductsForFeed(paginationParams);
  },
  getNextPageParam: (lastPage: IApiResponse<IProduct[]>) => {
    if (lastPage.meta!.page < lastPage.meta!.totalPage) {
      return lastPage.meta!.page + 1;
    }
    return undefined;
  },
  initialPageParam: 1,
});

export const useGetAllProductsForFeedInfinite = (params: IQueryParam[]) => {
  return useInfiniteQuery({ ...getAllProductsForFeedInfiniteQuery(params) });
};
