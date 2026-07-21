import { Logo } from "@/shared/components";
import { cn } from "@/shared/utils";

interface MenuHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MenuHeader = ({ className, ...props }: MenuHeaderProps) => {
  return (
    <div {...props} className={cn("bg-background flex h-20 w-full items-center px-4 md:px-12", className)}>
      <Logo className="size-7 shrink-0" />
    </div>
  );
};
