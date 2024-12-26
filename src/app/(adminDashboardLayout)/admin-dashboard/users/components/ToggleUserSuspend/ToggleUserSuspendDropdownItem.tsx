import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToggleUserSuspend } from "@/hooks/user.hook";
import { ISuspendUserToggle } from "@/types";

interface IProps {
  id: string;
  isSuspended?: boolean;
}

const ToggleUserSuspendDropdownItem = ({ id, isSuspended }: IProps) => {
  const { mutate: toggleUser, isPending } = useToggleUserSuspend();

  const handleToggleUser = () => {
    const toggleUserStatusData: ISuspendUserToggle = {
      id,
      payload: {
        isSuspended: !isSuspended,
      },
    };

    toggleUser(toggleUserStatusData);
  };

  return (
    <DropdownMenuItem onClick={() => handleToggleUser()} disabled={isPending}>
      {isSuspended ? "Unsuspend" : "Suspend"}
    </DropdownMenuItem>
  );
};

export default ToggleUserSuspendDropdownItem;
