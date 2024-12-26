import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteProduct } from "@/hooks/product.hook";

interface IProps {
  id: string;
}

const DeleteProductDropdownItem = ({ id }: IProps) => {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDeleteProduct = () => {
    deleteProduct(id);
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteProduct()}
      className="text-red-500"
      disabled={isPending}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteProductDropdownItem;
