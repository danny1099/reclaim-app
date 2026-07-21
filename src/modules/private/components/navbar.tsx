"use client";
import { ThemeToggle, LangToggle, Button, Divider } from "@/shared/components";
import { MenuButton } from "@/modules/private/components";

export const Navbar = () => {
  return (
    <header className="bg-background col-span-2 col-start-2 flex h-20 w-full flex-row items-center px-4 md:px-12">
      <MenuButton />
      <nav className="flex size-full flex-row items-center justify-end gap-3">
        <Button variant="ghost" size="icon" icon="bell" className="hover:bg-secondary shrink-0" />
        <Divider type="vertical" className="h-8" />
        <LangToggle />
        <ThemeToggle />
      </nav>
    </header>
  );
};
