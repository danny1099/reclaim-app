import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

interface Props extends VariantProps<typeof dividerVariants> {
  text?: string;
  className?: string;
}

const dividerVariants = cva("shrink-0 flex", {
  variants: {
    type: {
      vertical: "w-[1px] h-10 border-r border-border",
      horizontal: "h-[1px] w-10 border-t border-border",
    },
  },
  defaultVariants: {
    type: "vertical",
  },
});

export const Divider = ({ type, className }: Props) => {
  return <span className={cn(dividerVariants({ type, className }))} />;
};

export const Separator = ({ text, className }: Props) => {
  return (
    <span className={cn("flex items-center justify-center space-x-3", className)}>
      <Divider type="horizontal" className="flex-1" />
      <span className="text-muted-foreground text-2xs font-medium">{text}</span>
      <Divider type="horizontal" className="flex-1" />
    </span>
  );
};
