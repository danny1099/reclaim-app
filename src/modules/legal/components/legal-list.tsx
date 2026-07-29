import { ReactNode } from "react";
import { Icon } from "@/shared/components";

interface LegalListProps {
  items: readonly string[];
  variant?: "disc" | "check";
}

export const LegalList = ({ items, variant = "disc" }: LegalListProps) => {
  return (
    <ul className="flex flex-col gap-1.5 pl-1">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="text-foreground/80 flex items-start gap-2.5 text-[13.5px] leading-[1.7] text-pretty"
        >
          {variant === "check" ? (
            <Icon name="check" className="text-foreground/70 mt-1.5 size-3 shrink-0" />
          ) : (
            <span className="text-foreground/80 mt-2 inline-block size-1 shrink-0 rounded-full bg-current" />
          )}
          <span className="text-2xs text-foreground/80 text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
};

interface LegalNoteProps {
  children: ReactNode;
}

export const LegalNote = ({ children }: LegalNoteProps) => {
  return (
    <aside className="bg-accent border-border/60 my-2 flex items-start gap-3 rounded-lg border px-4 py-3 leading-[1.65] text-pretty">
      <Icon name="info" className="text-tertiary mt-0.5 size-3.5 shrink-0" />
      <p className="text-muted-foreground text-3xs">{children}</p>
    </aside>
  );
};
