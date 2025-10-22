import { z } from "zod";

export const queryPaymentDto = z.object({
  payreference: z.string().min(1, "Payment reference is required"),
});

export type QueryPaymentDto = z.infer<typeof queryPaymentDto>;
