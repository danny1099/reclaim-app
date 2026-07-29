import { ReactNode } from "react";
import { TableOfContents, type TocSection } from "@/shared/components";
import { cn } from "@/shared/utils";

interface LegalLayoutProps {
  toc: TocSection[];
  tocLabel: string;
  onThisPageLabel: string;
  children: ReactNode;
}

export const LegalLayout = ({ toc, tocLabel, onThisPageLabel, children }: LegalLayoutProps) => {
  return (
    <div className="border-border/60 border-b">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[220px_1fr] lg:gap-16 lg:py-20">
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="hidden lg:block">
            <TableOfContents sections={toc} ariaLabel={tocLabel} onThisPage={onThisPageLabel} />
          </div>
          <details className="border-border/60 group bg-card rounded-lg border lg:hidden">
            <summary className="text-2xs text-foreground flex cursor-pointer items-center justify-between px-4 py-3 font-semibold">
              <span>{onThisPageLabel}</span>
              <span className="text-muted-foreground text-3xs font-mono tabular-nums">
                {toc.length} {toc.length === 1 ? "section" : "sections"}
              </span>
            </summary>
            <div className="border-border/60 border-t p-3">
              <TableOfContents sections={toc} ariaLabel={tocLabel} onThisPage={onThisPageLabel} />
            </div>
          </details>
        </aside>
        <div className={cn("max-w-2xl min-w-0")}>{children}</div>
      </div>
    </div>
  );
};
