"use client";
import { usePathname } from "next/navigation";
import { Navlink, IconName } from "@/shared/components";
import { cn } from "@/shared/utils";

interface Props {
  children: React.ReactNode;
  route: string;
  icon: IconName;
  className?: string;
}

/* prettier-ignore */
export const MenuLink = ({ children, route, icon, className }: Props) => {
  const pathname = usePathname();
  const isSelected = pathname.includes(route);

  return (
      <Navlink
        href={route}
        icon={icon}
        placement="start"
        variant="navlink"
        className={cn("w-full font-normal pl-4", isSelected &&  "bg-tertiary/10 dark:bg-tertiary/15 text-tertiary font-medium",className)}
      >
        {children}
      </Navlink>
  );
};
