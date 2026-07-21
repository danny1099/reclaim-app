"use client";
import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { cn } from "@/shared/utils";
import { Icon, IconName } from "@/shared/components/icon";

interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  size?: "default" | "xs" | "sm" | "md" | "lg" | "xl";
  url?: string;
  ring?: boolean;
  fallback?: string;
  defaultImage?: string;
  className?: string;
  withDot?: boolean;
  withIcon?: {
    icon: string;
    className?: string;
  };
}

export function BaseAvatar({ className, ring = false, withDot = false, withIcon, size = "default", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-ring={ring}
      data-badge={withDot || withIcon ? "true" : "false"}
      className={cn(
        "group/avatar data-[ring=true]:ring-offset-background relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[ring=true]:ring-1 data-[ring=true]:ring-blue-600 data-[ring=true]:ring-offset-2 data-[size=default]:size-8 data-[size=lg]:size-12 data-[size=md]:size-10 data-[size=sm]:size-7 data-[size=xl]:size-16 data-[size=xs]:size-5",
        className
      )}
      {...props}
    />
  );
}

export function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("bg-background aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "dark:bg-accent bg-primary text-primary-foreground flex size-full items-center justify-center rounded-full text-lg font-semibold group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  );
}

export function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-90 inline-flex items-center justify-center rounded-full ring-2 select-none",
        "group-data-[size=xs]/avatar:size-2 group-data-[size=xs]/avatar:[&>svg]:hidden",
        "group-data-[size=sm]/avatar:size-2.5 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  );
}

export function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:transition-transform *:data-[slot=avatar]:duration-200 *:data-[slot=avatar]:ease-in-out *:data-[slot=avatar]:hover:z-10 *:data-[slot=avatar]:hover:scale-110",
        className
      )}
      {...props}
    />
  );
}

export function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "bg-muted text-muted-foreground ring-background text-2xs relative flex size-8 shrink-0 items-center justify-center rounded-full font-semibold ring-2 group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-7 group-has-data-[size=xs]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  );
}

export function Avatar({ url, defaultImage, fallback, withDot = false, withIcon, className, ...props }: AvatarProps) {
  return (
    <BaseAvatar {...props}>
      <AvatarImage src={url || defaultImage} alt="Image used for avatar display" className="aspect-square object-cover" />
      {fallback && <AvatarFallback>{fallback}</AvatarFallback>}
      {withDot ? (
        <AvatarBadge />
      ) : (
        withIcon && (
          <AvatarBadge>
            <Icon name={withIcon.icon as IconName} className={cn("size-3 shrink-0", withIcon.className)} />
          </AvatarBadge>
        )
      )}
    </BaseAvatar>
  );
}
