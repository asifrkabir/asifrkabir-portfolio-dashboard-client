import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteCoupon } from "@/hooks/coupon.hook";

interface IProps {
  id: string;
}

const DeleteCouponDropdownItem = ({ id }: IProps) => {
  const { mutate: deleteCoupon, isPending } = useDeleteCoupon();

  const handleDeleteCoupon = () => {
    deleteCoupon(id);
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteCoupon()}
      className="text-red-500"
      disabled={isPending}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteCouponDropdownItem;
