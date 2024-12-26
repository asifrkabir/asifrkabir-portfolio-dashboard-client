import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteExperience } from "@/hooks/experience.hook";

interface IProps {
  id: string;
}

const DeleteExperienceDropdownItem = ({ id }: IProps) => {
  const { mutate: deleteExperience, isPending } = useDeleteExperience();

  const handleDeleteExperience = () => {
    deleteExperience(id);
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteExperience()}
      className="text-red-500"
      disabled={isPending}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteExperienceDropdownItem;
