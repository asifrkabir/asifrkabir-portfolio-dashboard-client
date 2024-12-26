"use client";

import AppForm from "@/components/form/AppForm";
import { Button } from "@/components/ui/button";
import { useDeleteShop } from "@/hooks/shop.hook";
import { IApiResponse, IShop } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  id: string;
  closeModal: () => void;
}

const DeleteShopForm = ({ id, closeModal }: IProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteShop, isPending } = useDeleteShop();

  const handleSubmit: SubmitHandler<FieldValues> = () => {
    deleteShop(id, {
      onSuccess: (res: IApiResponse<IShop>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Shop deleted successfully");

          queryClient.invalidateQueries({
            queryKey: ["SHOPS"],
          });

          queryClient.invalidateQueries({
            queryKey: ["SHOP_BY_OWNER"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to delete shop. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to delete shop. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm onSubmit={handleSubmit}>
          <h2 className="mb-4">
            Are you sure? This will also delete all products under this shop.
          </h2>

          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
};

export default DeleteShopForm;
