"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import UpdateProjectDropdownItem from "./UpdateProjectDropdownItem";
import { UpdateProjectForm } from "./UpdateProjectForm";

interface IProps {
  id: string;
}

export function UpdateProjectModal({ id }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UpdateProjectDropdownItem />
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Update Project Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <UpdateProjectForm id={id} closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
