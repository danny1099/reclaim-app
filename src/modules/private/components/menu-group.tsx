import { cn } from "@/shared/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const MenuGroup = ({ children, title, className, ...props }: Props) => {
  return (
    <div {...props} className={cn("flex h-fit w-full flex-col", className)}>
      {title && <p className="text-2xs text-muted-foreground mb-1 ml-3">{title}</p>}
      {children}
    </div>
  );
};
