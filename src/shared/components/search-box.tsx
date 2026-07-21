"use client";
import { Input } from "@/shared/components/input";
import { cn } from "@/shared/utils";

interface Props {
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  value?: string;
}

export const SearchBox = ({ placeholder, className, onChange, defaultValue, value }: Props) => {
  return (
    <div className="flex h-fit w-full flex-row items-center">
      <Input
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        slot="end"
        sizes="md"
        icon="search"
        variant="accent"
        className={cn("w-full md:w-96", className)}
      />
    </div>
  );
};
