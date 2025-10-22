"use client";

import { format } from "date-fns";
import { CalendarIcon, Info } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea, ScrollBar } from "./scroll-area";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  minuteInterval?: 1 | 5 | 10 | 15 | 30 | 60;
  format?: string;
};

export default function FormDateTimePicker<T extends FieldValues>({
  name,
  label,
  className,
  control,
  description,
  required,
  disabled,
  placeholder = "Select date and time",
  minuteInterval = 5,
  format: dateFormat = "MM/dd/yyyy HH:mm",
}: Props<T>) {
  return (
    <FormField
      disabled={disabled}
      control={control}
      name={name}
      render={({ field }) => {
        const selectedDate = field.value ? new Date(field.value) : null;

        const handleDateSelect = (date: Date | undefined) => {
          if (!date) return;

          // Keep the time when changing date
          if (selectedDate) {
            date.setHours(
              selectedDate.getHours(),
              selectedDate.getMinutes(),
              0,
              0
            );
          }

          field.onChange(date.toISOString());
        };

        const handleTimeChange = (type: "hour" | "minute", value: string) => {
          const currentDate = selectedDate || new Date();
          const newDate = new Date(currentDate);

          if (type === "hour") {
            newDate.setHours(parseInt(value, 10));
          } else if (type === "minute") {
            newDate.setMinutes(parseInt(value, 10));
          }

          field.onChange(newDate.toISOString());
        };

        // Generate array of minutes based on interval
        const getMinuteOptions = () => {
          const options = [];
          for (let i = 0; i < 60; i += minuteInterval) {
            options.push(i);
          }
          return options;
        };

        return (
          <FormItem className={cn(className)}>
            {!!label && (
              <FormLabel>
                {label}
                {required && <span className="text-destructive"> *</span>}
              </FormLabel>
            )}

            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                    disabled={disabled}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate
                      ? format(selectedDate, dateFormat)
                      : placeholder}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="sm:flex">
                    <Calendar
                      mode="single"
                      selected={selectedDate || undefined}
                      onSelect={handleDateSelect}
                      initialFocus
                      disabled={disabled}
                    />
                    <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
                      {/* Hours selection */}
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex p-2 sm:flex-col">
                          {Array.from({ length: 24 }, (_, i) => i)
                            .reverse()
                            .map((hour) => (
                              <Button
                                key={hour}
                                size="icon"
                                variant={
                                  selectedDate &&
                                  selectedDate.getHours() === hour
                                    ? "default"
                                    : "ghost"
                                }
                                className="aspect-square shrink-0 sm:w-full"
                                onClick={() =>
                                  handleTimeChange("hour", hour.toString())
                                }
                                disabled={disabled}
                              >
                                {hour.toString().padStart(2, "0")}
                              </Button>
                            ))}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>

                      {/* Minutes selection */}
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex p-2 sm:flex-col">
                          {getMinuteOptions().map((minute) => (
                            <Button
                              key={minute}
                              size="icon"
                              variant={
                                selectedDate &&
                                selectedDate.getMinutes() === minute
                                  ? "default"
                                  : "ghost"
                              }
                              className="aspect-square shrink-0 sm:w-full"
                              onClick={() =>
                                handleTimeChange("minute", minute.toString())
                              }
                              disabled={disabled}
                            >
                              {minute.toString().padStart(2, "0")}
                            </Button>
                          ))}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>

            {!!description && (
              <FormDescription>
                <Info className="mr-2 inline-block size-4" />
                {description}
              </FormDescription>
            )}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
