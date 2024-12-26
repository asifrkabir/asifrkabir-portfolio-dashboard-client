import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import { Button } from "@/components/ui/button";
import { useCreateProductCategory } from "@/hooks/productCategory.hook";
import { createProductCategoryValidationSchema } from "@/schemas/productCategory.schema";
import {
  IApiResponse,
  ICreateProductCategory,
  IProductCategory,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
}

const AddProductCategoryForm = ({ closeModal }: IProps) => {
  const { mutate: createProductCategory, isPending } =
    useCreateProductCategory();
  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const productCategoryData: ICreateProductCategory = {
      name: data.name,
    };

    createProductCategory(productCategoryData, {
      onSuccess: (res: IApiResponse<IProductCategory>) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Product Category created successfully");

          queryClient.invalidateQueries({
            queryKey: ["PRODUCT_CATEGORIES"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to add product category. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to add product category. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(createProductCategoryValidationSchema)}
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
              "Submit"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
};

export default AddProductCategoryForm;
