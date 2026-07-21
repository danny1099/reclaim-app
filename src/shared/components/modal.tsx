"use client";
import { useState } from "react";
import { useIsMobile } from "@/shared/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/drawer";

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/* prettier-ignore */
export const Modal = ({ children, title, description, trigger, open, onOpenChange }: Props) => {
  const isMobile = useIsMobile();
  const [internalOpen, setInternalOpen] = useState(false);

  // Usa estado externo si se provee, si no usa interno
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  if (!isMobile) {  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title || ""}</DialogTitle>
            {description && <DialogDescription className="-mt-1.5">{description}</DialogDescription>}
          </DialogHeader>
          <div className="p-1">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title || ""}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
        <div className="h-fit py-2 px-4 overflow-y-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
