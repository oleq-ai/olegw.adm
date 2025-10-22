import { useEffect, useState } from "react";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Country } from "react-phone-number-input";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { PhoneInput, PhoneInputProps } from "./phone-input";

type Props<T extends FieldValues> = PhoneInputProps & {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: string;
};

// phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),

export default function FormPhoneInput<T extends FieldValues>({
  name,
  control,
  label,
  description,
  required,
  className,
  placeholder,
}: Props<T>) {
  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data: { country: Country }) => setCountry(() => data.country))
      .catch(() => setCountry(() => "KE"));
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          {!!label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
          )}

          <FormControl>
            <PhoneInput
              placeholder={placeholder}
              defaultCountry={country}
              {...field}
            />
          </FormControl>

          {!!description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
