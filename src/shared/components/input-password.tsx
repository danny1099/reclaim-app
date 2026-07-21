"use client";
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { inputVariants } from "@/shared/components/input";
import { Icon } from "@/shared/components/icon";
import { cn } from "@/shared/utils";

export interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  place?: "start" | "end";
  isBordered?: boolean;
}

/* prettier-ignore */
export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, variant, sizes, place = "end", isBordered = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState("password");

    const handleShowPassword = () => {
      setShowPassword(showPassword === "password" ? "text" : "password");
    };

    return (
      <div className={cn(inputVariants({ variant, sizes }), place === "end" ? "flex-row" : "flex-row-reverse", isBordered && "border-input border", className )}>
        <input
          {...props}
          ref={ref}
          type={showPassword}
          autoComplete="new-password"
          className={cn("placeholder:text-muted-foreground flex h-full w-full bg-transparent px-1.5 text-xs outline-none placeholder:text-xs autofill:bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-70")}
        />
        <div className="flex size-8 items-center justify-center">
          <button type="button" onClick={handleShowPassword} className="flex h-full w-7 items-center justify-center bg-transparent">
            <Icon name={showPassword === "password" ? "eye_close" : "eye_open"} className="size-4" />
          </button>
        </div>
      </div>
    );
  }
);
