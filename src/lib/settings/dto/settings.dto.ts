import { z } from "zod";

export const settingsSchema = z.object({
  country: z.string().min(1, "Required"),
  operator: z.string().min(1, "Required"),
  lang: z.string().min(1, "Required"),
  currency: z.string().min(1, "Required"),
  allowedAge: z
    .string()
    .min(1, "Required")
    .refine((val) => /^\d+$/.test(val), { message: "Invalid" }),
});

export type SettingsDto = z.infer<typeof settingsSchema>;
