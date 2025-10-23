"use client";

import { useState } from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TransactionDateFilterProps {
  onDateChange: (startDate?: string, endDate?: string) => void;
  startDate?: string;
  endDate?: string;
}

export default function TransactionDateFilter({
  onDateChange,
  startDate,
  endDate,
}: TransactionDateFilterProps) {
  const [start, setStart] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  );
  const [end, setEnd] = useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined
  );

  const handleApply = () => {
    onDateChange(
      start ? format(start, "yyyy-MM-dd") : undefined,
      end ? format(end, "yyyy-MM-dd") : undefined
    );
  };

  const handleClear = () => {
    setStart(undefined);
    setEnd(undefined);
    onDateChange(undefined, undefined);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !start && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {start ? format(start, "PPP") : "Start date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={start}
            onSelect={setStart}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !end && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {end ? format(end, "PPP") : "End date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={end}
            onSelect={setEnd}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Button onClick={handleApply} size="sm">
        Apply
      </Button>
      <Button onClick={handleClear} variant="outline" size="sm">
        Clear
      </Button>
    </div>
  );
}
