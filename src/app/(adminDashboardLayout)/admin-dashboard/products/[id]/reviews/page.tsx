"use client";

import { useParams } from "next/navigation";
import Reviews from "./_components/Reviews";

const ProductReviewsPage = () => {
  const { id } = useParams();

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Product Reviews</h1>
      </div>
      <Reviews productId={id as string} allowDelete={true} />
    </div>
  );
};

export default ProductReviewsPage;
