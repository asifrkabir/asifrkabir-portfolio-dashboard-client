"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import { Button } from "@/components/ui/button";
import {
  useGetProductCategoryById,
  useUpdateProductCategory,
} from "@/hooks/productCategory.hook";
import { updateProductCategoryValidationSchema } from "@/schemas/productCategory.schema";
import {
  IApiResponse,
  IProductCategory,
  IUpdateProductCategory,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  id: string;
  closeModal: () => void;
}

const UpdateProductCategoryForm = ({ id, closeModal }: IProps) => {
  const {
    data: productCategoryData,
    isLoading,
    isError,
  } = useGetProductCategoryById(id);
  const { mutate: updateProductCategory, isPending } =
    useUpdateProductCategory();
  const queryClient = useQueryClient();

  if (isLoading || !productCategoryData) {
    return <p>Loading product category...</p>;
  }

  if (isError) {
    return <p>Something went wrong while fetching product category</p>;
  }

  const productCategory = productCategoryData.data as IProductCategory;

  const existingProductCategoryValues = {
    name: productCategory.name,
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const productCategoryData: IUpdateProductCategory = {
      id: productCategory._id,
      payload: {
        name: data.name,
      },
    };

    updateProductCategory(productCategoryData, {
      onSuccess: (res: IApiResponse<IProductCategory>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Product category updated successfully");

          queryClient.invalidateQueries({
            queryKey: ["PRODUCT_CATEGORIES"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message ||
              "Failed to update product category. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message ||
            "Failed to update product category. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(updateProductCategoryValidationSchema)}
          defaultValues={existingProductCategoryValues}
        >
          <AppInput
            name="name"
            label="Name"
            type="text"
            placeholder="Enter product category name"
            required
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
};

export default UpdateProductCategoryForm;
