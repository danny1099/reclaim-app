import { ReactNode } from "react";
import { cn } from "@/shared/utils";

interface LegalSectionProps {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export const LegalSection = ({ id, number, title, children, className }: LegalSectionProps) => {
  return (
    <section
      id={id}
      className={cn("border-border/60 scroll-mt-24 border-t pt-8 pb-2 first:border-t-0 first:pt-0", className)}
    >
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-2xs text-tertiary font-medium tabular-nums">{number}</span>
        <h2 className="text-foreground text-lg font-semibold text-balance">{title}</h2>
      </div>
      <div className="text-foreground/85 flex flex-col gap-3 text-xs leading-[1.7] text-pretty">{children}</div>
    </section>
  );
};
