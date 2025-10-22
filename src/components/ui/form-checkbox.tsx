import { HTMLAttributes } from "react";

import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  labelClassName?: HTMLAttributes<HTMLDivElement>["className"];
  description?: string;
};

export default function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  className,
  labelClassName,
  description,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex items-center gap-2", className)}>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>

          <FormLabel
            className={cn("cursor-pointer leading-none", labelClassName)}
          >
            {label}
            {required && <span className="text-destructive"> *</span>}
            {description && <FormDescription>{description}</FormDescription>}
          </FormLabel>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
