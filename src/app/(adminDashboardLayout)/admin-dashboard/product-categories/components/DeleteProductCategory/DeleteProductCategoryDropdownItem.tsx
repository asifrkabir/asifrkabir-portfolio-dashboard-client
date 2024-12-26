import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteProductCategory } from "@/hooks/productCategory.hook";

interface IProps {
  id: string;
}

const DeleteProductCategoryDropdownItem = ({ id }: IProps) => {
  const { mutate: deleteProductCategory, isPending } =
    useDeleteProductCategory();

  const handleDeleteProductCategory = () => {
    deleteProductCategory(id);
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteProductCategory()}
      className="text-red-500"
      disabled={isPending}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteProductCategoryDropdownItem;
