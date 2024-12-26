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
import ToggleShopDropdownItem from "./ToggleShopDropdownItem";
import ToggleShopForm from "./ToggleShopForm";

interface IProps {
  id: string;
  isBlacklisted: boolean;
}

export function ToggleShopModal({ id, isBlacklisted }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ToggleShopDropdownItem />
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg"}>
        <DialogHeader>
          <DialogTitle>Toggle Shop Status</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Toggle Shop Status Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ToggleShopForm
            id={id}
            isBlacklisted={isBlacklisted}
            closeModal={handleClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
