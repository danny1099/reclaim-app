import { Badge, Heading, P, Reveal } from "@/shared/components";
import { cn } from "@/shared/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export const SectionHeader = ({ eyebrow, title, subtitle, align = "center" }: SectionHeaderProps) => {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left"
      )}
    >
      <Badge variant="tertiary" className="tracking-widest uppercase">
        {eyebrow}
      </Badge>
      <Heading className="text-3xl tracking-[-0.03em] text-balance md:text-[2.75rem] md:leading-[1.08]">{title}</Heading>
      {subtitle && <P className="text-sm leading-relaxed text-pretty">{subtitle}</P>}
    </Reveal>
  );
};
