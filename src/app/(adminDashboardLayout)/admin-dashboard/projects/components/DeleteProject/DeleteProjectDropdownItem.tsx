import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteProject } from "@/hooks/project.hook";

interface IProps {
  id: string;
}

const DeleteProjectDropdownItem = ({ id }: IProps) => {
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const handleDeleteProject = () => {
    deleteProject(id);
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteProject()}
      className="text-red-500"
      disabled={isPending}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteProjectDropdownItem;
