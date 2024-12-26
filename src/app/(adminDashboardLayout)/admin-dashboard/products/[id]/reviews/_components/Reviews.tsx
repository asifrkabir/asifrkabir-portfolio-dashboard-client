import ReviewCardLoadingSkeleton from "@/app/(mainLayout)/products/[id]/components/Review/ReviewCardLoadingSkeleton";
import { useGetAllReviews } from "@/hooks/review.hook";
import { IQueryParam, IReview } from "@/types";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

interface IProps {
  productId: string;
  allowDelete?: boolean;
  allowReply?: boolean;
}

const Reviews = ({ productId, allowDelete, allowReply }: IProps) => {
  const [params] = useState<IQueryParam[]>([
    { name: "product", value: productId },
  ]);

  const { data, isLoading, isError } = useGetAllReviews(params);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <ReviewCardLoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Something went wrong while fetching reviews.
      </p>
    );
  }

  const reviews: IReview[] = data?.data || [];

  if (reviews.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
          allowDelete={allowDelete}
          allowReply={allowReply}
        />
      ))}
    </div>
  );
};

export default Reviews;
