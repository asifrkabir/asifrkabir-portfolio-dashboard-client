"use client";

import AppForm from "@/components/form/AppForm";
import { Button } from "@/components/ui/button";
import { useToggleShopBlacklistStatus } from "@/hooks/shop.hook";
import { IApiResponse, IShop, IToggleShopBlacklistStatus } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  id: string;
  isBlacklisted: boolean;
  closeModal: () => void;
}

const ToggleShopForm = ({ id, isBlacklisted, closeModal }: IProps) => {
  const queryClient = useQueryClient();
  const productChangeType = isBlacklisted ? "un-suspend" : "suspend";

  const { mutate: toggleShop, isPending } = useToggleShopBlacklistStatus();

  const handleSubmit: SubmitHandler<FieldValues> = () => {
    const toggleShopData: IToggleShopBlacklistStatus = {
      id,
      payload: {
        isBlacklisted: !isBlacklisted,
      },
    };

    toggleShop(toggleShopData, {
      onSuccess: (res: IApiResponse<IShop>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Shop status updated successfully");

          queryClient.invalidateQueries({
            queryKey: ["SHOPS"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to update shop. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to update shop. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm onSubmit={handleSubmit}>
          <h2 className="mb-4">
            Are you sure? This will also {productChangeType} all products under
            this shop.
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

export default ToggleShopForm;
