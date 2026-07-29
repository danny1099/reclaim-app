import { ReactNode } from "react";
import { Icon } from "@/shared/components";

interface LegalArticleProps {
  title: string;
  children: ReactNode;
}

export const LegalArticle = ({ title, children }: LegalArticleProps) => {
  return (
    <article className="flex flex-col gap-2 pl-1">
      <h3 className="text-foreground/90 flex items-center gap-2 text-[13px] leading-snug font-medium">
        <Icon name="chevron_right" className="text-tertiary size-3 shrink-0" />
        {title}
      </h3>
      <div className="text-foreground/80 flex flex-col gap-2 pl-5 text-[13.5px] leading-[1.7] text-pretty">{children}</div>
    </article>
  );
};
