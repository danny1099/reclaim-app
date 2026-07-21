import { Brand } from "@/shared/components/brand";
import { cn } from "@/shared/utils";

interface Props {
  className?: string;
  classNamePicture?: string;
  withText?: boolean;
}

export const Logo = ({ withText, className }: Props) => {
  return (
    <div className="flex size-fit items-center gap-1.5">
      <picture className={cn("size-8 shrink-0", className)}>
        <source srcSet="/images/app-logo-dark.svg" media="(prefers-color-scheme: dark)" />
        <img src="/images/app-logo.svg" alt="Logo of reclaim" className="size-full object-contain" loading="eager" />
      </picture>
      {withText && <Brand />}
    </div>
  );
};
