import { titleFont } from "@/config/fonts";
import { cn } from "@/shared/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  underline?: boolean;
}

/* prettier-ignore */
export const Title = ({ children, type = "h1", ...props }: Props) => {
  const Tag: keyof React.JSX.IntrinsicElements = type;

  return (
    <Tag {...props} className={cn("scroll-m-20 text-4xl font-bold tracking-tight text-balance", props.className, titleFont.className)}>
      {children}
    </Tag>
  );
};

/* prettier-ignore */
export const Heading = ({ children, type = "h2", underline = false, ...props }: Props) => {
  const Tag: keyof React.JSX.IntrinsicElements = type;

  return (
    <Tag {...props} className={cn("scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",underline && "border-b pb-2",  props.className, titleFont.className)}>
      {children}
    </Tag>
  );
};
