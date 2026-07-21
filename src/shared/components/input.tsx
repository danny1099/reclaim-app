"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon, IconName } from "@/shared/components/icon";
import { cn } from "@/shared/utils";

export const inputVariants = cva("min-w-32 text-xs flex items-center gap-1 px-2 rounded-lg autofill:bg-transparent", {
  variants: {
    variant: {
      ghost: "bg-transparent text-foreground",
      outline: "border border-input bg-background text-foreground",
      accent: "bg-accent text-accent-foreground placeholder:text-accent-foreground/50",
      secondary: "bg-secondary text-secondary-foreground",
    },
    sizes: {
      xs: "h-6 px-1.5 text-3xs placeholder:text-3xs",
      sm: "h-8 px-2 text-3xs placeholder:text-3xs",
      md: "h-9",
      lg: "h-11",
    },
  },
  defaultVariants: {
    variant: "outline",
    sizes: "md",
  },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  place?: "start" | "end";
  icon?: IconName;
  isBordered?: boolean;
  child?: React.ReactNode;
}

/* prettier-ignore */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, sizes, type, place = "end", icon, isBordered = false, child, ...props }, ref) => {
    return (
      <div className={cn(inputVariants({ variant, sizes }), place === "end" ? "flex-row" : "flex-row-reverse", isBordered && "border border-input", className )}>
        <input
          {...props}
          ref={ref}
          type={type}
          autoComplete="off"
          className={cn("bg-transparent flex h-full w-full px-1.5 outline-none placeholder:text-muted-foreground placeholder:text-xs autofill:bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-70")}
        />
        {icon && (
          <div className="flex size-7 items-center justify-center">
            {!child 
                ? (<Icon name={icon!} className="h-4 w-4 text-muted-foreground" />)
                : (child)
            }
          </div>
        )}
      </div>
    );
  }
);
