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
import UpdateProductCategoryForm from "./UpdateProductCategoryForm";
import UpdateProductCategoryDropdownItem from "./UpdateProductCategoryDropdownItem";

interface IProps {
  id: string;
}

export function UpdateProductCategoryModal({ id }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UpdateProductCategoryDropdownItem />
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg"}>
        <DialogHeader>
          <DialogTitle>Update Product Category</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Update Product Category Details
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <UpdateProductCategoryForm id={id} closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
