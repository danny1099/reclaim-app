import { cn } from "@/shared/utils";
import { Icon, IconName } from "@/shared/components/icon";
import { Title } from "@/shared/components/title";
import { P } from "@/shared/components/text";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  icon?: IconName;
  ctaButton?: React.ReactNode;
  className?: string;
}

export const EmptyData = ({ title, subtitle, icon = "file", ctaButton, className }: EmptyStateProps) => {
  return (
    <div className={cn("flex size-full flex-col items-center justify-center", className)}>
      <div className="bg-tertiary/10 text-tertiary flex size-14 items-center justify-center rounded-full p-3">
        <Icon name={icon} className="text-tertiary size-6" />
      </div>
      <Title className="text-foreground mt-3 text-sm">{title}</Title>
      <P className="text-2xs max-w-68 text-center text-pretty">{subtitle}</P>
      {ctaButton && <div className="mt-3">{ctaButton}</div>}
    </div>
  );
};
