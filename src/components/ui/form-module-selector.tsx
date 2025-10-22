import { HTMLAttributes } from "react";

import { Control, FieldPath, FieldValues } from "react-hook-form";

import { ModuleItem } from "@/data/modules";
import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { ModuleSelector } from "./module-selector";

interface FormModuleSelectorProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  options: ModuleItem[];
  label?: string;
  required?: boolean;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  height?: string;
  disabled?: boolean;
}

export default function FormModuleSelector<T extends FieldValues>({
  name,
  control,
  options,
  label,
  required = false,
  className,
  height = "400px",
  disabled,
}: FormModuleSelectorProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {!!label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
          )}

          <FormControl>
            <ModuleSelector
              value={field.value || []}
              onChange={field.onChange}
              options={options}
              height={height}
              disabled={disabled}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
