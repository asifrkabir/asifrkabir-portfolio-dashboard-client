import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteBlog } from "@/hooks/blog.hook";

interface IProps {
  id: string;
}

const DeleteBlogDropdownItem = ({ id }: IProps) => {
  const { mutate: deleteBlog, isPending } = useDeleteBlog();

  const handleDeleteBlog = () => {
    deleteBlog(id);
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteBlog()}
      className="text-red-500"
      disabled={isPending}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteBlogDropdownItem;
