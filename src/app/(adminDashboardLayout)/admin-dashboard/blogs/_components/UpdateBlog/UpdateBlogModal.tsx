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
import UpdateBlogDropdownItem from "./UpdateBlogDropdownItem";
import { UpdateBlogForm } from "./UpdateBlogForm";

interface IProps {
  id: string;
}

export function UpdateBlogModal({ id }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UpdateBlogDropdownItem />
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Update Blog</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Update Blog Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <UpdateBlogForm id={id} closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
