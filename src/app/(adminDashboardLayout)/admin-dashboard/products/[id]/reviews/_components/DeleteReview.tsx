import { Button } from "@/components/ui/button";
import { useDeleteReview } from "@/hooks/review.hook";
import { IApiResponse, IReview } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface IProps {
  id: string;
}

const DeleteReview = ({ id }: IProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteReview, isPending } = useDeleteReview();

  const handleDeleteReview = () => {
    deleteReview(id, {
      onSuccess: (res: IApiResponse<IReview>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Review deleted successfully");

          queryClient.invalidateQueries({
            queryKey: ["REVIEWS"],
          });
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to delete review. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to delete review. Please try again."
        );
      },
    });
  };

  return (
    <Button
      variant="destructive"
      className="p-3"
      onClick={() => handleDeleteReview()}
      disabled={isPending}
    >
      <Trash2 className="text-white w-5 h-5" />
    </Button>
  );
};

export default DeleteReview;
