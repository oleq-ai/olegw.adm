import { Control, FieldPath, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Textarea, TextareaProps } from "./textarea";

type Props<T extends FieldValues> = TextareaProps & {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
};

export default function FormTextArea<T extends FieldValues>({
  name,
  label,
  control,
  className,
  ...props
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {!!label && (
            <FormLabel>
              {label}
              {props.required && <span className="text-destructive"> *</span>}
            </FormLabel>
          )}

          <FormControl className="relative">
            <Textarea {...field} {...props} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
