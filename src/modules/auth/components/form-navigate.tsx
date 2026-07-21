"use client";
import Link from "next/link";

interface FormNavigateProps {
  redirectTo: string;
  text: string;
  link: string;
}

export const FormNavigate = ({ redirectTo, text, link }: FormNavigateProps) => {
  return (
    <div className="-mt-1 flex h-fit w-full items-center justify-center gap-2 text-center">
      <span className="text-muted-foreground text-2xs inline-flex items-center gap-1 py-1">
        {text}
        <Link href={redirectTo} className="text-primary text-2xs h-fit w-auto p-0 font-semibold dark:text-white">
          {link}
        </Link>
      </span>
    </div>
  );
};
