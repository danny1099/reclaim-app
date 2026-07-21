"use client";
import Link from "next/link";
import { Logo, LangToggle, ThemeToggle, Divider } from "@/shared/components";
import { cn } from "@/shared/utils";

interface Props {
  child?: React.ReactNode;
  className?: string;
  options?: {
    logo: boolean;
    brand: boolean;
    redirect: boolean;
  };
}

export const Navbar = ({ child, className, options }: Props) => {
  const { logo = true, brand = true, redirect = true } = options ?? {};

  return (
    <header className={cn("bg-background flex h-20 w-full flex-row items-center px-4 py-2 md:px-24", className)}>
      {logo && (
        <Link href={redirect ? "/" : ""}>
          <Logo showBrand={brand} />
        </Link>
      )}
      <nav className="flex size-full flex-row items-center justify-end gap-4">
        <LangToggle />
        <ThemeToggle />
        {child && <Divider type="vertical" className="h-9" />}
        {child}
      </nav>
    </header>
  );
};
