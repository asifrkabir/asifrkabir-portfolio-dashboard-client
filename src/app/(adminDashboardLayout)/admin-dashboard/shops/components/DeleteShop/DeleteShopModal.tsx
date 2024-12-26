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
import DeleteShopDropdownItem from "./DeleteShopDropdownItem";
import DeleteShopForm from "./DeleteShopForm";
import { Button } from "@/components/ui/button";

interface IProps {
  id: string;
  renderType?: "button" | "dropdown";
}

export function DeleteShopModal({ id, renderType }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {renderType && renderType === "button" ? (
          <Button className="bg-red-500 hover:bg-red-700">Delete Shop</Button>
        ) : (
          <DeleteShopDropdownItem />
        )}
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg"}>
        <DialogHeader>
          <DialogTitle>Delete Shop</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Delete Shop Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DeleteShopForm id={id} closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
