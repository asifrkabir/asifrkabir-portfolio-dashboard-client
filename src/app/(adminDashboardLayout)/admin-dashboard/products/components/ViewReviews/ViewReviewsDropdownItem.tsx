import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface IProps {
  id: string;
}

const ViewReviewsDropdownItem = ({ id }: IProps) => {
  return (
    <DropdownMenuItem>
      <Link href={`/admin-dashboard/products/${id}/reviews`}>View Reviews</Link>
    </DropdownMenuItem>
  );
};

export default ViewReviewsDropdownItem;
