"use client";
import { format } from "date-fns";
import { Button } from "@/shared/components/button";
import { Calendar } from "@/shared/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/popover";
import { Icon } from "@/shared/components/icon";

interface DatePickerProps {
  value?: Date;
  onChange?: () => void;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="data-[empty=true]:text-muted-foreground w-70 justify-start text-left font-normal"
        >
          <Icon name="calendar" className="size-4 shrink-0" />
          {value ? format(value, "PPP") : <span>{placeholder || "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}
