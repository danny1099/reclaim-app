import { Badge, Heading, P, Reveal } from "@/shared/components";

interface LegalPageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdatedLabel: string;
  lastUpdatedValue: string;
  effectiveDateLabel: string;
  effectiveDateValue: string;
  version: string;
}

export const LegalPageHeader = ({
  eyebrow,
  title,
  subtitle,
  lastUpdatedLabel,
  lastUpdatedValue,
  effectiveDateLabel,
  effectiveDateValue,
  version,
}: LegalPageHeaderProps) => {
  return (
    <header className="border-border/60 relative border-b">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] opacity-60" />
      </div>
      <Reveal className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-16 pb-10 md:px-6 md:pt-20 md:pb-12">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="tertiary">{eyebrow}</Badge>
          <span className="text-3xs text-muted-foreground font-mono tabular-nums">v{version}</span>
        </div>
        <Heading type="h1" className="text-3xl leading-[1.05] tracking-[-0.04em] text-balance md:text-5xl md:leading-[1.04]">
          {title}
        </Heading>
        <P className="max-w-2xl text-xs leading-relaxed text-pretty md:text-sm">{subtitle}</P>
        <dl className="text-2xs text-muted-foreground flex flex-wrap gap-x-8 gap-y-1.5 pt-2">
          <div className="flex items-center gap-2">
            <dt className="text-3xs font-semibold tracking-widest uppercase">{lastUpdatedLabel}</dt>
            <dd className="text-foreground/80 font-mono tabular-nums">{lastUpdatedValue}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-3xs font-semibold tracking-widest uppercase">{effectiveDateLabel}</dt>
            <dd className="text-foreground/80 font-mono tabular-nums">{effectiveDateValue}</dd>
          </div>
        </dl>
      </Reveal>
    </header>
  );
};
