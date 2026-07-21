import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { Icon, IconName } from "@/shared/components/icon";
import { cn } from "@/shared/utils";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-2xs font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50  disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-action text-action-foreground [a]:hover:bg-action/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input  dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/80 aria-expanded:bg-accent aria-expanded:text-accent-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        navlink: "border-none text-foreground justify-start [&_svg]:size-4 hover:text-tertiary",
        tertiary:
          "bg-tertiary text-tertiary-foreground hover:bg-tertiary/80 aria-expanded:bg-tertiary aria-expanded:text-tertiary-foreground",
        item: "bg-transparent border-none text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  placement?: "start" | "end";
  icon?: IconName;
}

/* prettier-ignore */
export const Button = ({ children, className, variant, size, asChild = false, icon, placement = "end", isLoading , ...props }: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp data-slot="button" {...props} className={cn(buttonVariants({ variant, size, className }))}>
      {placement === "start" && icon && (<Icon name={isLoading ? "refresh" : icon } className={cn("size-4", isLoading && "animate-spin")}/>)}
      {children}
      {placement === "end" && icon && (<Icon name={isLoading ? "refresh" : icon } className={cn("size-4", isLoading && "animate-spin")}/>)}
    </Comp>
  );
};
