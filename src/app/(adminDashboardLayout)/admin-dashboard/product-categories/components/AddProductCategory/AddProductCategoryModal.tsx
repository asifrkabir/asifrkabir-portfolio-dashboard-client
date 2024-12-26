"use client";

import { Button } from "@/components/ui/button";
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
import AddProductCategoryForm from "./AddProductCategoryForm";

export function AddProductCategoryModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product Category</Button>
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg"}>
        <DialogHeader>
          <DialogTitle>Add Product Category</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Add Product Category Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AddProductCategoryForm closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
