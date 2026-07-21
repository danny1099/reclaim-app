"use client";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/shared/components/sheet";
import { Button } from "@/shared/components";

export const MenuButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" icon="sidebar" className="shrink-0 md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" aria-describedby="">
        <SheetTitle />
      </SheetContent>
    </Sheet>
  );
};
