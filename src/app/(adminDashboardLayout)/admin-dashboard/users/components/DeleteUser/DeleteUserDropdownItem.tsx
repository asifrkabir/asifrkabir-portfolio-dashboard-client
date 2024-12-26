import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteUser } from "@/hooks/user.hook";

interface IProps {
  id: string;
}

const DeleteUserDropdownItem = ({ id }: IProps) => {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleDeleteUser = () => {
    deleteUser(id);
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteUser()}
      className="text-red-500"
      disabled={isPending}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteUserDropdownItem;
