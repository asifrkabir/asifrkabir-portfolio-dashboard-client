import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface IProps {
  id: string;
}

const ViewDetailsDropdownItem = ({ id }: IProps) => {
  return (
    <DropdownMenuItem>
      <Link href={`/admin-dashboard/orders/${id}`}>View Details</Link>
    </DropdownMenuItem>
  );
};

export default ViewDetailsDropdownItem;
