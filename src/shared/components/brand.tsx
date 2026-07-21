import { brandFont } from "@/config/fonts";
import { cn } from "@/shared/utils";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

export const Brand = ({ className, ...props }: Props) => {
  return (
    <span {...props} className={cn("text-foreground text-xl font-semibold", brandFont.className, className)}>
      Reclaim
    </span>
  );
};
