import { useSearchParams } from "next/navigation";
import React from "react";

import { format, startOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export default function DataTableDatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();
  const { setSearchParams } = useUpdateSearchParams();

  const start =
    searchParams.get("start") ?? format(startOfMonth(new Date()), "yyyy-MM-dd");
  const end = searchParams.get("end") ?? format(new Date(), "yyyy-MM-dd");

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: start ? new Date(start) : undefined,
    to: end ? new Date(end) : undefined,
  });

  function onDateChange(range: DateRange | undefined) {
    setSearchParams({
      start: range?.from ? format(range.from, "yyyy-MM-dd") : undefined,
      end: range?.to ? format(range.to, "yyyy-MM-dd") : undefined,
    });
    setDate(range);
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Filter by date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range?: DateRange) => onDateChange(range)}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
