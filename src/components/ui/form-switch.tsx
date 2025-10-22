import { Control, FieldPath, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./form";
import { Switch, SwitchProps } from "./switch";

type Props<T extends FieldValues> = SwitchProps & {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: string;
};

export default function FormSwitch<T extends FieldValues>({
  name,
  control,
  className,
  label,
  description,
  required,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center justify-between rounded-lg border p-4",
            className
          )}
        >
          <div className="space-y-0.5">
            {!!label && (
              <FormLabel className="text-base">
                {label}
                {required && <span className="text-destructive"> *</span>}
              </FormLabel>
            )}
            {!!description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
