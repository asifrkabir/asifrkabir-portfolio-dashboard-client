import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteSkill } from "@/hooks/skill.hook";

interface IProps {
  id: string;
}

const DeleteSkillDropdownItem = ({ id }: IProps) => {
  const { mutate: deleteSkill, isPending } = useDeleteSkill();

  const handleDeleteSkill = () => {
    deleteSkill(id);
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteSkill()}
      className="text-red-500"
      disabled={isPending}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteSkillDropdownItem;
